/**
 * Contract shared with the future Python/FastAPI detection service.
 * No detection logic lives in the frontend — these are transport types only.
 */

export type CheckRequest = {
  text: string;
  /** Optional filename when the submission came from an uploaded document. */
  filename?: string;
};

export type MatchedSource = {
  id: string;
  title: string;
  url?: string;
  similarity: number;
};

export type SentenceMatch = {
  id: string;
  sentence: string;
  startOffset: number;
  endOffset: number;
  similarity: number;
  sourceIds: string[];
};

export type CheckResult = {
  overallSimilarity: number;
  matches: SentenceMatch[];
  sources: MatchedSource[];
  checkedAt: string;
};

export type CheckerStatus = "idle" | "unavailable";
