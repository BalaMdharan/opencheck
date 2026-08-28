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
const MAX_QUERIED_SENTENCES = 6;
const RESULTS_PER_QUERY = 4;
const MAX_DOCUMENTS = 20;
const MAX_RETRIES = 3;

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
  const data = (await callApi({
    action: "query",
    list: "search",
    srsearch: `"${query.slice(0, 290)}"`,
    srlimit: String(RESULTS_PER_QUERY),
  })) as { query?: { search?: Array<{ pageid: number }> } };
  return (data.query?.search ?? []).map((hit) => hit.pageid);
}

async function fetchExtracts(pageIds: number[]): Promise<CandidateDocument[]> {
  if (pageIds.length === 0) return [];
  const data = (await callApi({
    action: "query",
    prop: "extracts|info",
    inprop: "url",
    explaintext: "1",
    exlimit: "20",
    exsectionformat: "plain",
    pageids: pageIds.join("|"),
  })) as {
    query?: {
      pages?: Record<
        string,
        { pageid?: number; title?: string; fullurl?: string; extract?: string }
      >;
    };
  };

  const pages = Object.values(data.query?.pages ?? {});
  return pages
    .filter((page) => page.extract && page.title)
    .map((page) => ({
      key: `wikipedia:${page.pageid}`,
      title: page.title as string,
      url: page.fullurl ?? `https://en.wikipedia.org/?curid=${page.pageid}`,
      text: (page.extract as string).slice(0, 40_000),
    }));
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
    await sleep(400);
  }

  try {
    return await fetchExtracts(pageIds);
  } catch {
    return [];
  }
}
