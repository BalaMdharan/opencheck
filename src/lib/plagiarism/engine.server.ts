/**
 * Built-in similarity engine. Stateless: text lives only in the arguments of
 * one request and is never written to disk, a database, or the logs.
 */

import { similarity, splitSentences, tokens } from "./similarity";
import { gatherCandidates, type CandidateDocument } from "./sources.server";
import type { CheckResult, MatchedSource, SentenceMatch } from "./types";

const MATCH_THRESHOLD = 0.55;
const MAX_SOURCES_PER_SENTENCE = 5;

function sourceId(document: CandidateDocument): string {
  let hash = 0;
  for (let i = 0; i < document.key.length; i += 1) {
    hash = (hash * 31 + document.key.charCodeAt(i)) | 0;
  }
  return `s${Math.abs(hash).toString(36)}`;
}

function percent(score: number): number {
  return Math.round(Math.min(Math.max(score, 0), 1) * 1000) / 10;
}

export async function runCheck(text: string): Promise<CheckResult> {
  const spans = splitSentences(text);
  const documents = await gatherCandidates(spans.map((span) => span.sentence));

  const matches: SentenceMatch[] = [];
  const used = new Map<string, MatchedSource>();

  spans.forEach((span, index) => {
    const hits = documents
      .map((document) => ({ document, score: similarity(span.sentence, document.text) }))
      .filter((hit) => hit.score >= MATCH_THRESHOLD)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SOURCES_PER_SENTENCE);

    if (hits.length === 0) return;

    const sourceIds: string[] = [];
    for (const { document, score } of hits) {
      const id = sourceId(document);
      sourceIds.push(id);
      const value = percent(score);
      const existing = used.get(id);
      if (!existing || value > existing.similarity) {
        used.set(id, {
          id,
          title: document.title,
          url: document.url,
          similarity: value,
        });
      }
    }

    matches.push({
      id: `m${index}`,
      sentence: span.sentence,
      startOffset: span.start,
      endOffset: span.end,
      similarity: percent(hits[0]!.score),
      sourceIds,
    });
  });

  const totalWords = spans.reduce((sum, span) => sum + tokens(span.sentence).length, 0);
  const matchedWords = matches.reduce(
    (sum, match) => sum + tokens(match.sentence).length * (match.similarity / 100),
    0,
  );

  return {
    overallSimilarity: totalWords
      ? Math.round(Math.min(matchedWords / totalWords, 1) * 1000) / 10
      : 0,
    matches,
    sources: [...used.values()].sort((a, b) => b.similarity - a.similarity),
    checkedAt: new Date().toISOString(),
  };
}
