/**
 * Candidate-source lookup for the built-in detection engine.
 *
 * Uses the public Wikipedia API — no API key, no account, no cost — so the
 * checker works out of the box. Nothing is stored: pages are fetched, scored
 * in memory, and discarded when the request ends.
 */

export type CandidateDocument = {
  key: string;
  title: string;
  url: string;
  text: string;
};

const API = "https://en.wikipedia.org/w/api.php";
const USER_AGENT = "OpenCheck/1.0 (open-text-check.lovable.app; similarity checker)";
const MAX_QUERIED_SENTENCES = 5;
const RESULTS_PER_QUERY = 3;
const MAX_DOCUMENTS = 8;
const MAX_RETRIES = 2;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callApi(params: Record<string, string>): Promise<unknown> {
  const url = new URL(API);
  for (const [key, value] of Object.entries({ format: "json", origin: "*", ...params })) {
    url.searchParams.set(key, value);
  }
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const response = await fetch(url, { headers: { "user-agent": USER_AGENT } });
    if (response.ok) return response.json();
    // 429 (rate limited) and 5xx are transient — back off and retry.
    if (response.status === 429 || response.status >= 500) {
      if (attempt === MAX_RETRIES) break;
      await sleep(800 * 2 ** attempt);
      continue;
    }
    throw new Error(`Wikipedia API responded with ${response.status}`);
  }
  throw new Error("Wikipedia API rate limit exceeded after retries");
}

async function searchTitles(query: string): Promise<number[]> {
  // Quoted phrases with punctuation return no hits; a cleaned, truncated
  // full-text query reliably surfaces the page the wording came from.
  const cleaned = query
    .replace(/[^A-Za-z0-9' ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 14)
    .join(" ");
  if (!cleaned) return [];
  const data = (await callApi({
    action: "query",
    list: "search",
    srsearch: cleaned,
    srlimit: String(RESULTS_PER_QUERY),
  })) as { query?: { search?: Array<{ pageid: number }> } };
  return (data.query?.search ?? []).map((hit) => hit.pageid);
}

/**
 * The extracts API only returns plain-text content for ONE page per request,
 * so pages are fetched one at a time (with a small pause to stay under the
 * public API's burst limits).
 */
async function fetchExtracts(pageIds: number[]): Promise<CandidateDocument[]> {
  const documents: CandidateDocument[] = [];

  for (const pageId of pageIds) {
    try {
      const data = (await callApi({
        action: "query",
        prop: "extracts|info",
        inprop: "url",
        explaintext: "1",
        exsectionformat: "plain",
        pageids: String(pageId),
      })) as {
        query?: {
          pages?: Record<
            string,
            { pageid?: number; title?: string; fullurl?: string; extract?: string }
          >;
        };
      };

      for (const page of Object.values(data.query?.pages ?? {})) {
        if (!page.extract || !page.title) continue;
        documents.push({
          key: `wikipedia:${page.pageid}`,
          title: page.title,
          url: page.fullurl ?? `https://en.wikipedia.org/?curid=${page.pageid}`,
          text: page.extract.slice(0, 40_000),
        });
      }
    } catch {
      // One unavailable page shouldn't fail the whole check.
    }
    await sleep(300);
  }

  return documents;
}

/** Pick the most distinctive sentences so we spend few API calls well. */
function selectQueries(sentences: string[]): string[] {
  return [...sentences]
    .sort((a, b) => b.length - a.length)
    .slice(0, MAX_QUERIED_SENTENCES);
}

export async function gatherCandidates(sentences: string[]): Promise<CandidateDocument[]> {
  const queries = selectQueries(sentences);

  // Sequential with a small delay: the source API rate-limits bursts.
  const pageIds: number[] = [];
  for (const query of queries) {
    try {
      for (const id of await searchTitles(query)) {
        if (!pageIds.includes(id) && pageIds.length < MAX_DOCUMENTS) pageIds.push(id);
      }
    } catch {
      // A failed query just yields fewer candidates; keep going.
    }
    await sleep(600);
  }

  try {
    return await fetchExtracts(pageIds);
  } catch {
    return [];
  }
}
