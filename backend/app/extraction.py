"""Document text extraction. Files are parsed in memory and never written to disk."""

from __future__ import annotations

import io
import re
import zipfile
from xml.etree import ElementTree


class UnsupportedDocumentError(ValueError):
    pass


_W_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def extract_text(filename: str, data: bytes) -> str:
    name = (filename or "").lower()
    if name.endswith(".txt") or name.endswith(".md"):
        return _normalise(data.decode("utf-8", errors="replace"))
    if name.endswith(".docx"):
        return _normalise(_from_docx(data))
    if name.endswith(".pdf"):
        return _normalise(_from_pdf(data))
    raise UnsupportedDocumentError(
        "Unsupported file type. Upload a TXT, DOCX, or PDF document."
    )


def _from_docx(data: bytes) -> str:
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as archive:
            xml = archive.read("word/document.xml")
    except (zipfile.BadZipFile, KeyError) as exc:  # pragma: no cover - defensive
        raise UnsupportedDocumentError("That DOCX file could not be read.") from exc

    root = ElementTree.fromstring(xml)
    paragraphs: list[str] = []
    for paragraph in root.iter(f"{_W_NS}p"):
        runs = [node.text or "" for node in paragraph.iter(f"{_W_NS}t")]
        line = "".join(runs).strip()
        if line:
            paragraphs.append(line)
    return "\n\n".join(paragraphs)


def _from_pdf(data: bytes) -> str:
    try:
        from pypdf import PdfReader
    except ImportError as exc:  # pragma: no cover - dependency guard
        raise UnsupportedDocumentError("PDF support is not installed on this server.") from exc

    try:
        reader = PdfReader(io.BytesIO(data))
        pages = [page.extract_text() or "" for page in reader.pages]
    except Exception as exc:
        raise UnsupportedDocumentError("That PDF file could not be read.") from exc

    text = "\n\n".join(part.strip() for part in pages if part.strip())
    if not text:
        raise UnsupportedDocumentError(
            "No selectable text found in that PDF. Scanned images are not supported."
        )
    return text


def _normalise(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = re.sub(r"[ \t\u00a0]+", " ", text)
    return re.sub(r"\n{3,}", "\n\n", text).strip()
