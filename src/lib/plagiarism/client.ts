import { checkText } from "./check.functions";
import type { CheckRequest, CheckResult } from "./types";

/**
 * By default OpenCheck runs its own built-in similarity engine (a server
 * function in this app, comparing against public Wikipedia sources — no keys,
 * no cost, no storage). Set VITE_PLAGIARISM_API_URL to route checks to a
 * self-hosted Python/FastAPI engine instead (see backend/).
 */
export const PLAGIARISM_API_URL: string | undefined = import.meta.env[
  "VITE_PLAGIARISM_API_URL"
] as string | undefined;

export const isDetectionEngineConfigured = true;

export class DetectionEngineUnavailableError extends Error {
  constructor() {
    super("The OpenCheck detection engine is not reachable.");
    this.name = "DetectionEngineUnavailableError";
  }
}

export async function runPlagiarismCheck(request: CheckRequest): Promise<CheckResult> {
  if (PLAGIARISM_API_URL) {
    const response = await fetch(`${PLAGIARISM_API_URL.replace(/\/$/, "")}/api/check`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Detection service responded with ${response.status}`);
    }

    return (await response.json()) as CheckResult;
  }

  return checkText({ data: request });
}
