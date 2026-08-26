"""Pure text-similarity primitives. No I/O, no state."""

from __future__ import annotations

import math
import re
from collections import Counter
from typing import Iterable, List, Tuple

_SENTENCE_END = re.compile(r"(?<=[.!?])[\s\n]+")
_WORD = re.compile(r"[A-Za-z0-9']+")


def split_sentences(text: str) -> List[Tuple[str, int, int]]:
    """Split into (sentence, start_offset, end_offset), preserving offsets."""
    spans: List[Tuple[str, int, int]] = []
    cursor = 0
    for block in re.split(r"(\n{2,})", text):
        if not block or block.strip() == "":
            cursor += len(block)
            continue
        offset = cursor
        for piece in _SENTENCE_END.split(block):
            if not piece:
                continue
            start = text.find(piece, offset)
            if start == -1:
                start = offset
            end = start + len(piece)
            stripped = piece.strip()
            if len(_WORD.findall(stripped)) >= 5:
                lead = len(piece) - len(piece.lstrip())
                spans.append((stripped, start + lead, end))
            offset = end
        cursor += len(block)
    return spans


def tokens(text: str) -> List[str]:
    return _WORD.findall(text.lower())


def cosine(a: Iterable[str], b: Iterable[str]) -> float:
    ca, cb = Counter(a), Counter(b)
    if not ca or not cb:
        return 0.0
    shared = set(ca) & set(cb)
    dot = sum(ca[t] * cb[t] for t in shared)
    if dot == 0:
        return 0.0
    na = math.sqrt(sum(v * v for v in ca.values()))
    nb = math.sqrt(sum(v * v for v in cb.values()))
    return dot / (na * nb)


def ngrams(items: List[str], size: int) -> set[tuple[str, ...]]:
    if len(items) < size:
        return {tuple(items)} if items else set()
    return {tuple(items[i : i + size]) for i in range(len(items) - size + 1)}


def containment(candidate: List[str], reference: List[str], size: int = 4) -> float:
    """Fraction of the candidate's word n-grams that also occur in the reference."""
    a, b = ngrams(candidate, size), ngrams(reference, size)
    if not a:
        return 0.0
    return len(a & b) / len(a)


def similarity(sentence: str, source_text: str) -> float:
    """Blend of bag-of-words cosine and verbatim n-gram containment (0..1)."""
    s_tokens, r_tokens = tokens(sentence), tokens(source_text)
    if len(s_tokens) < 5 or not r_tokens:
        return 0.0
    return round(0.4 * cosine(s_tokens, r_tokens) + 0.6 * containment(s_tokens, r_tokens), 4)
