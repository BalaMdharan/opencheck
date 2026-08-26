"""Transport models. These mirror src/lib/plagiarism/types.ts on the frontend."""

from __future__ import annotations

from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)


class CheckRequest(CamelModel):
    text: str = Field(min_length=1, max_length=400_000)
    filename: Optional[str] = None


class MatchedSource(CamelModel):
    id: str
    title: str
    url: Optional[str] = None
    similarity: float


class SentenceMatch(CamelModel):
    id: str
    sentence: str
    start_offset: int
    end_offset: int
    similarity: float
    source_ids: List[str]


class CheckResult(CamelModel):
    overall_similarity: float
    matches: List[SentenceMatch]
    sources: List[MatchedSource]
    checked_at: str


class HealthResult(CamelModel):
    status: str
    engine: str
    sources_configured: bool
    stores_user_text: bool = False
