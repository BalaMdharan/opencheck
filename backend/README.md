# OpenCheck Detection API

A standalone Python/FastAPI service that powers the OpenCheck frontend. It is
completely separate from the web app: the frontend only speaks to it over HTTP.

## Privacy contract

- Submitted text and uploaded files are held in memory for one request only.
- Nothing is written to disk, a database, or the logs.
- Errors log the exception class, never the submission.
- Only the derived JSON result leaves the service.

## Run locally

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # set SERPER_API_KEY to enable web source matching
uvicorn app.main:app --reload --port 8000
```

Then point the frontend at it:

```bash
VITE_PLAGIARISM_API_URL=http://localhost:8000
```

## Endpoints

| Method | Path                | Body                                | Returns       |
| ------ | ------------------- | ----------------------------------- | ------------- |
| GET    | `/api/health`       | –                                   | `HealthResult`|
| POST   | `/api/check`        | JSON `{ text, filename? }`          | `CheckResult` |
| POST   | `/api/check/upload` | multipart `file` (TXT / DOCX / PDF) | `CheckResult` |

`CheckResult` matches `src/lib/plagiarism/types.ts` exactly (camelCase):

```json
{
  "overallSimilarity": 12.4,
  "matches": [
    {
      "id": "m3",
      "sentence": "…",
      "startOffset": 210,
      "endOffset": 288,
      "similarity": 74.0,
      "sourceIds": ["sa1b2c3d4e5"]
    }
  ],
  "sources": [
    { "id": "sa1b2c3d4e5", "title": "…", "url": "https://…", "similarity": 74.0 }
  ],
  "checkedAt": "2026-08-26T05:00:00+00:00"
}
```

Error responses use `{ "detail": "…" }`:

- `413` file too large, `415` unsupported file type
- `422` submission shorter than 50 or longer than 5000 words
- `503` no source provider configured (no API key, no corpus) — the service
  refuses to invent results
- `502` the provider failed

## How detection works

1. `similarity.split_sentences` splits the submission, keeping character offsets.
2. Providers (`detection/providers.py`) return candidate documents:
   - `SerperWebProvider` — exact-phrase Google search per sentence via serper.dev
   - `LocalCorpusProvider` — `.txt` files under `OPENCHECK_CORPUS_DIR`
3. Each sentence is scored against each candidate with a blend of bag-of-words
   cosine (40%) and verbatim 4-gram containment (60%).
4. Sentences over `OPENCHECK_MATCH_THRESHOLD` become matches; overall
   similarity is the word-weighted share of matched text.

Add a provider by implementing the `SourceProvider` protocol and returning it
from `build_providers()`.

## Deploy

```bash
docker build -t opencheck-api .
docker run -p 8000:8000 --env-file .env opencheck-api
```

Any container host works (Fly.io, Render, Railway, Cloud Run). Set
`OPENCHECK_ALLOWED_ORIGINS` to your published frontend origin.
