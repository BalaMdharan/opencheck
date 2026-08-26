"""The similarity engine: sentences in, structured matches out.

The engine is stateless. Submitted text lives only in the function arguments
for the duration of one request; nothing is written to disk or a database.
"""

from __future__ import annotations

import asyncio
import hashlib
from datetime import datetime, timezone
from typing import List, Sequence

from ..config import settings
from ..schemas import CheckResult, MatchedSource, SentenceMatch
from .providers import CandidateDocument, SourceProvider, build_providers
from .similarity import similarity, split_sentences, tokens


class EngineUnavailableError(RuntimeError):
    """No candidate-source provider is configured, so no check can be honest."""


class DetectionEngine:
    def __init__(self, providers: Sequence[SourceProvider] | None = None) -> None:
        self.providers = list(providers) if providers is not None else build_providers()

    @property
    def available(self) -> bool:
        return bool(self.providers)

    async def check(self, text: str) -> CheckResult:
        if not self.available:
            raise EngineUnavailableError(
                "No source provider is configured. Set SERPER_API_KEY or supply a local corpus."
            )

        spans = split_sentences(text)
        sentences = [span[0] for span in spans]
        documents = await self._gather(sentences)

        matches: List[SentenceMatch] = []
        used: dict[str, MatchedSource] = {}

        for index, (sentence, start, end) in enumerate(spans):
            scored = [
                (document, similarity(sentence, document.text)) for document in documents
            ]
            hits = [
                (document, score)
                for document, score in scored
                if score >= settings.match_threshold
            ]
            if not hits:
                continue
            hits.sort(key=lambda pair: pair[1], reverse=True)

            source_ids: List[str] = []
            for document, score in hits[:5]:
                source_id = _source_id(document)
                source_ids.append(source_id)
                existing = used.get(source_id)
                percent = _percent(score)
                if existing is None or percent > existing.similarity:
                    used[source_id] = MatchedSource(
                        id=source_id,
                        title=document.title,
                        url=document.url,
                        similarity=percent,
                    )

            matches.append(
                SentenceMatch(
                    id=f"m{index}",
                    sentence=sentence,
                    start_offset=start,
                    end_offset=end,
                    similarity=_percent(hits[0][1]),
                    source_ids=source_ids,
                )
            )

        return CheckResult(
            overall_similarity=_overall(spans, matches),
            matches=matches,
            sources=sorted(used.values(), key=lambda s: s.similarity, reverse=True),
            checked_at=datetime.now(timezone.utc).isoformat(),
        )

    async def _gather(self, sentences: Sequence[str]) -> List[CandidateDocument]:
        batches = await asyncio.gather(
            *(provider.candidates(sentences) for provider in self.providers),
            return_exceptions=True,
        )
        documents: dict[str, CandidateDocument] = {}
        for batch in batches:
            if isinstance(batch, BaseException):
                continue
            for document in batch:
                documents.setdefault(document.key, document)
        return list(documents.values())


def _source_id(document: CandidateDocument) -> str:
    return "s" + hashlib.sha1(document.key.encode("utf-8")).hexdigest()[:10]


def _percent(score: float) -> float:
    return round(min(max(score, 0.0), 1.0) * 100, 1)


def _overall(spans, matches: List[SentenceMatch]) -> float:
    total_words = sum(len(tokens(sentence)) for sentence, _, _ in spans)
    if not total_words:
        return 0.0
    matched_words = sum(
        len(tokens(match.sentence)) * (match.similarity / 100) for match in matches
    )
    return round(min(matched_words / total_words, 1.0) * 100, 1)
