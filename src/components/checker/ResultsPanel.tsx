import { Loader2, ListChecks, Link2, Percent } from "lucide-react";
import type { CheckResult } from "@/lib/plagiarism/types";

export function ResultsPanel({
  result,
  isChecking,
}: {
  result: CheckResult | null;
  isChecking: boolean;
}) {
  return (
    <section
      aria-labelledby="results-heading"
      aria-live="polite"
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <h2 id="results-heading" className="text-lg font-semibold">
        Results
      </h2>

      {isChecking ? (
        <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Contacting the detection service…
        </div>
      ) : result ? (
        <div className="mt-5 space-y-5">
          <div className="rounded-lg bg-surface p-4">
            <p className="text-xs text-muted-foreground">Overall similarity</p>
            <p className="font-mono text-3xl">{result.overallSimilarity}%</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Matching sentences</h3>
            <ul className="mt-2 space-y-2">
              {result.matches.map((match) => (
                <li key={match.id} className="rounded-lg border border-border p-3 text-sm">
                  <p className="leading-relaxed">{match.sentence}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {match.similarity}% similar
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Potentially matching sources</h3>
            <ul className="mt-2 space-y-2 text-sm">
              {result.sources.map((source) => (
                <li key={source.id} className="rounded-lg border border-border p-3">
                  <span className="font-medium">{source.title}</span>
                  {source.url && (
                    <a
                      href={source.url}
                      className="mt-1 block break-all text-xs text-primary underline"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {source.url}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}

const PLACEHOLDERS = [
  { icon: Percent, title: "Overall similarity", body: "A single percentage, with its caveats." },
  {
    icon: ListChecks,
    title: "Matching sentences",
    body: "Each overlapping passage, quoted in full.",
  },
  {
    icon: Link2,
    title: "Potentially matching sources",
    body: "Where the similar wording appears to come from.",
  },
];

function EmptyState() {
  return (
    <div className="mt-4">
      <p className="text-sm text-muted-foreground">
        No results yet. Once a check has run, this panel will show:
      </p>
      <ul className="mt-4 space-y-3">
        {PLACEHOLDERS.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3"
          >
            <Icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
