"""Candidate-source providers.

A provider takes the sentences of a submission and returns candidate documents
to compare against. Nothing here persists the submission: queries are sent,
responses are used, and both are discarded when the request ends.
"""

from __future__ import annotations

import asyncio
import re
from dataclasses import dataclass
from pathlib import Path
from typing import List, Protocol, Sequence

import httpx

from ..config import settings


@dataclass
class CandidateDocument:
    key: str
    title: str
    text: str
    url: str | None = None


class SourceProvider(Protocol):
    name: str

    async def candidates(self, sentences: Sequence[str]) -> List[CandidateDocument]: ...


class LocalCorpusProvider:
    """Compares against .txt files in a local corpus directory (optional)."""

    name = "local-corpus"

    def __init__(self, directory: str) -> None:
        self.directory = Path(directory)

    @property
    def available(self) -> bool:
        return self.directory.is_dir() and any(self.directory.glob("**/*.txt"))

    async def candidates(self, sentences: Sequence[str]) -> List[CandidateDocument]:
        if not self.available:
            return []
        return await asyncio.to_thread(self._read)

    def _read(self) -> List[CandidateDocument]:
        documents: List[CandidateDocument] = []
        for path in sorted(self.directory.glob("**/*.txt")):
            try:
                text = path.read_text(encoding="utf-8", errors="replace")
            except OSError:
                continue
            documents.append(
                CandidateDocument(key=f"local:{path.name}", title=path.stem, text=text)
            )
        return documents


class SerperWebProvider:
    """Finds candidate web pages via the Serper.dev Google Search API."""

    name = "serper-web"

    def __init__(self, api_key: str) -> None:
        self.api_key = api_key

    @property
    def available(self) -> bool:
        return bool(self.api_key)

    async def candidates(self, sentences: Sequence[str]) -> List[CandidateDocument]:
        if not self.available:
            return []

        queries = list(sentences)[: settings.max_queried_sentences]
        found: dict[str, CandidateDocument] = {}

        async with httpx.AsyncClient(timeout=settings.request_timeout_seconds) as client:
            results = await asyncio.gather(
                *(self._search(client, query) for query in queries),
                return_exceptions=True,
            )

        for result in results:
            if isinstance(result, BaseException):
                continue
            for document in result:
                found.setdefault(document.key, document)
        return list(found.values())

    async def _search(
        self, client: httpx.AsyncClient, sentence: str
    ) -> List[CandidateDocument]:
        query = " ".join(sentence.split())[:300]
        response = await client.post(
            "https://google.serper.dev/search",
            headers={"X-API-KEY": self.api_key, "content-type": "application/json"},
            json={"q": f'"{query}"', "num": 5},
        )
        response.raise_for_status()
        payload = response.json()

        documents: List[CandidateDocument] = []
        for item in payload.get("organic", [])[:5]:
            url = item.get("link")
            snippet = " ".join(
                filter(None, [item.get("title"), item.get("snippet")])
            )
            if not url or not snippet:
                continue
            documents.append(
                CandidateDocument(
                    key=url,
                    title=item.get("title") or url,
                    text=_clean(snippet),
                    url=url,
                )
            )
        return documents


def _clean(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def build_providers() -> List[SourceProvider]:
    providers: List[SourceProvider] = []
    web = SerperWebProvider(settings.serper_api_key)
    if web.available:
        providers.append(web)
    local = LocalCorpusProvider(settings.corpus_dir)
    if local.available:
        providers.append(local)
    return providers
