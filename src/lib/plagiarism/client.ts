import type { CheckRequest, CheckResult } from "./types";

/**
 * Thin client for the external detection service.
 * Set VITE_PLAGIARISM_API_URL once the Python/FastAPI backend is deployed.
 * Until then the UI stays in an explicit "not connected" state — it never
 * fabricates results.
 */
export const PLAGIARISM_API_URL: string | undefined = import.meta.env[
  "VITE_PLAGIARISM_API_URL"
] as string | undefined;

export const isDetectionEngineConfigured = Boolean(PLAGIARISM_API_URL);

export class DetectionEngineUnavailableError extends Error {
  constructor() {
    super("The OpenCheck detection engine is not connected yet.");
    this.name = "DetectionEngineUnavailableError";
  }
}

export async function runPlagiarismCheck(request: CheckRequest): Promise<CheckResult> {
  if (!PLAGIARISM_API_URL) throw new DetectionEngineUnavailableError();

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
