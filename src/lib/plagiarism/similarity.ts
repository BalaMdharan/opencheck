/**
 * Pure text-similarity primitives. No I/O, no state.
 * Mirrors the reference implementation in backend/app/detection/similarity.py
 * so the hosted and self-hosted engines score identically.
 */

const SENTENCE_END = /(?<=[.!?])[\s\n]+/;
const WORD = /[A-Za-z0-9']+/g;

export type SentenceSpan = { sentence: string; start: number; end: number };

export function splitSentences(text: string): SentenceSpan[] {
  const spans: SentenceSpan[] = [];
  let offset = 0;

  for (const piece of text.split(SENTENCE_END)) {
    if (!piece) continue;
    let start = text.indexOf(piece, offset);
    if (start === -1) start = offset;
    const end = start + piece.length;
    const stripped = piece.trim();
    if (tokens(stripped).length >= 5) {
      const lead = piece.length - piece.trimStart().length;
      spans.push({ sentence: stripped, start: start + lead, end });
    }
    offset = end;
  }

  return spans;
}

export function tokens(text: string): string[] {
  return text.toLowerCase().match(WORD) ?? [];
}

function counter(items: string[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const item of items) map.set(item, (map.get(item) ?? 0) + 1);
  return map;
}

export function cosine(a: string[], b: string[]): number {
  const ca = counter(a);
  const cb = counter(b);
  if (ca.size === 0 || cb.size === 0) return 0;

  let dot = 0;
  for (const [token, count] of ca) {
    const other = cb.get(token);
    if (other) dot += count * other;
  }
  if (dot === 0) return 0;

  let na = 0;
  for (const value of ca.values()) na += value * value;
  let nb = 0;
  for (const value of cb.values()) nb += value * value;

  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

function ngrams(items: string[], size: number): Set<string> {
  if (items.length < size) return items.length ? new Set([items.join(" ")]) : new Set();
  const result = new Set<string>();
  for (let i = 0; i <= items.length - size; i += 1) {
    result.add(items.slice(i, i + size).join(" "));
  }
  return result;
}

/** Fraction of the candidate's word n-grams that also occur in the reference. */
export function containment(candidate: string[], reference: string[], size = 4): number {
  const a = ngrams(candidate, size);
  const b = ngrams(reference, size);
  if (a.size === 0) return 0;
  let shared = 0;
  for (const gram of a) if (b.has(gram)) shared += 1;
  return shared / a.size;
}

/** Blend of bag-of-words cosine and verbatim n-gram containment (0..1). */
export function similarity(sentence: string, sourceText: string): number {
  const s = tokens(sentence);
  const r = tokens(sourceText);
  if (s.length < 5 || r.length === 0) return 0;
  return 0.4 * cosine(s, r) + 0.6 * containment(s, r);
}
