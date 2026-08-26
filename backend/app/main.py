"""OpenCheck detection API.

Privacy contract:
- Submitted text and uploaded files are processed in memory for one request.
- Nothing is written to disk, a database, or the application logs.
- Only the derived JSON result is returned to the caller.
"""

from __future__ import annotations

import logging

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .detection import DetectionEngine, EngineUnavailableError
from .detection.similarity import tokens
from .extraction import UnsupportedDocumentError, extract_text
from .schemas import CheckRequest, CheckResult, HealthResult

logger = logging.getLogger("opencheck")

app = FastAPI(
    title="OpenCheck Detection API",
    version="1.0.0",
    description="Similarity detection for the OpenCheck frontend. Stateless by design.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["content-type"],
)

engine = DetectionEngine()


@app.get("/api/health", response_model=HealthResult, response_model_by_alias=True)
async def health() -> HealthResult:
    return HealthResult(
        status="ok",
        engine="opencheck-similarity",
        sources_configured=engine.available,
    )


@app.post("/api/check", response_model=CheckResult, response_model_by_alias=True)
async def check(request: CheckRequest) -> CheckResult:
    return await _run(request.text)


@app.post("/api/check/upload", response_model=CheckResult, response_model_by_alias=True)
async def check_upload(
    file: UploadFile = File(...),
    text: str | None = Form(default=None),
) -> CheckResult:
    data = await file.read()
    if len(data) > settings.max_upload_bytes:
        raise HTTPException(
            status_code=413,
            detail=f"File exceeds {settings.max_upload_bytes // (1024 * 1024)} MB.",
        )
    try:
        extracted = extract_text(file.filename or "", data)
    except UnsupportedDocumentError as exc:
        raise HTTPException(status_code=415, detail=str(exc)) from exc
    finally:
        del data  # the raw bytes never outlive the request

    return await _run(extracted or (text or ""))


async def _run(text: str) -> CheckResult:
    word_count = len(tokens(text))
    if word_count < settings.min_words:
        raise HTTPException(
            status_code=422,
            detail=f"Add at least {settings.min_words} words for a meaningful comparison.",
        )
    if word_count > settings.max_words:
        raise HTTPException(
            status_code=422,
            detail=f"Submissions are limited to {settings.max_words} words.",
        )

    try:
        return await engine.check(text)
    except EngineUnavailableError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception:
        # Log the failure class only — never the submitted text.
        logger.exception("Detection failed")
        raise HTTPException(status_code=502, detail="The detection engine failed.") from None
