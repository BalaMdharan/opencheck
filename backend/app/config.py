from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import List


def _split(value: str) -> List[str]:
    return [part.strip() for part in value.split(",") if part.strip()]


@dataclass(frozen=True)
class Settings:
    """Runtime configuration. Everything is env-driven; nothing is persisted."""

    allowed_origins: List[str] = field(
        default_factory=lambda: _split(
            os.getenv("OPENCHECK_ALLOWED_ORIGINS", "http://localhost:8080")
        )
    )
    # Web-search provider used to find candidate sources. Without a key the
    # engine falls back to the local corpus only (and says so in /health).
    serper_api_key: str = os.getenv("SERPER_API_KEY", "")
    corpus_dir: str = os.getenv("OPENCHECK_CORPUS_DIR", "corpus")

    min_words: int = int(os.getenv("OPENCHECK_MIN_WORDS", "50"))
    max_words: int = int(os.getenv("OPENCHECK_MAX_WORDS", "5000"))
    max_upload_bytes: int = int(os.getenv("OPENCHECK_MAX_UPLOAD_BYTES", str(5 * 1024 * 1024)))

    # A sentence is only reported when it clears this similarity threshold.
    match_threshold: float = float(os.getenv("OPENCHECK_MATCH_THRESHOLD", "0.55"))
    # Cap on how many sentences are sent to the web-search provider per check.
    max_queried_sentences: int = int(os.getenv("OPENCHECK_MAX_QUERIED_SENTENCES", "25"))
    request_timeout_seconds: float = float(os.getenv("OPENCHECK_REQUEST_TIMEOUT", "20"))


settings = Settings()
