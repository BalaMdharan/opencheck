import { useMemo, useRef, useState } from "react";
import { FileUp, Loader2, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";
import { ResultsPanel } from "@/components/checker/ResultsPanel";
import { getTextStats, MAX_WORDS, MIN_WORDS } from "@/lib/plagiarism/text-stats";
import {
  DetectionEngineUnavailableError,
  isDetectionEngineConfigured,
  runPlagiarismCheck,
} from "@/lib/plagiarism/client";
import type { CheckResult } from "@/lib/plagiarism/types";

export function CheckerWorkspace() {
  const [text, setText] = useState("");
  const [filename, setFilename] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stats = useMemo(() => getTextStats(text), [text]);
  const tooShort = stats.words > 0 && stats.words < MIN_WORDS;
  const tooLong = stats.words > MAX_WORDS;
  const canSubmit = stats.words >= MIN_WORDS && !tooLong && !isChecking;

  async function handleCheck() {
    setNotice(null);
    setIsChecking(true);
    try {
      const data = await runPlagiarismCheck(filename ? { text, filename } : { text });
      setResult(data);
    } catch (error) {
      setResult(null);
      setNotice(
        error instanceof DetectionEngineUnavailableError
          ? "The detection engine couldn't be reached. Please try again in a moment."
          : error instanceof Error && error.message
            ? error.message
            : "The check couldn't be completed. Please try again later.",
      );
    } finally {
      setIsChecking(false);
    }
  }

  function handleFile(file: File | undefined) {
    if (!file) return;
    setFilename(file.name);
    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      file.text().then((content) => setText(content));
      setNotice(null);
    } else {
      setNotice(
        `“${file.name}” isn't a plain-text file. Copy its text into the box below to run the check.`,
      );
    }
  }

  function handleReset() {
    setText("");
    setFilename(null);
    setResult(null);
    setNotice(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
      <section aria-labelledby="input-heading" className="space-y-4">
        <div className="rounded-xl border border-border bg-card p-4 shadow-card sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 id="input-heading" className="text-lg font-semibold">
              Your text
            </h2>
            {filename && (
              <span className="truncate rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
                {filename}
              </span>
            )}
          </div>

          <label htmlFor="submission" className="sr-only">
            Text to check for similarity
          </label>
          <textarea
            id="submission"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste your essay, article, thesis chapter, or report here…"
            rows={16}
            aria-describedby="submission-stats"
            className="mt-4 w-full resize-y rounded-lg border border-input bg-background p-4 text-sm leading-relaxed outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />

          <div
            id="submission-stats"
            className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
            aria-live="polite"
          >
            <Stat label="Words" value={stats.words} />
            <Stat label="Characters" value={stats.characters} />
            <Stat label="No spaces" value={stats.charactersNoSpaces} />
            <Stat label="Sentences" value={stats.sentences} />
          </div>

          {(tooShort || tooLong) && (
            <p className="mt-3 text-sm text-destructive">
              {tooShort
                ? `Add at least ${MIN_WORDS} words for a meaningful comparison.`
                : `Please keep submissions under ${MAX_WORDS.toLocaleString()} words for now.`}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={handleCheck} disabled={!canSubmit} size="lg">
              {isChecking ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Checking…
                </>
              ) : (
                "Check plagiarism"
              )}
            </Button>
            <Button variant="ghost" onClick={handleReset} disabled={!text && !filename}>
              {result ? (
                <RotateCcw className="size-4" aria-hidden="true" />
              ) : (
                <Trash2 className="size-4" aria-hidden="true" />
              )}
              Clear
            </Button>
            <span className="text-xs text-muted-foreground">
              Your text is compared in memory and never stored.
            </span>
          </div>

          {notice && (
            <p
              role="status"
              className="mt-4 rounded-lg border border-border bg-surface p-3 text-sm text-muted-foreground"
            >
              {notice}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-dashed border-border bg-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <FileUp className="mt-0.5 size-5 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-semibold">Upload a document</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  TXT files load straight into the box. For DOCX or PDF, paste the text.
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              Choose file
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.docx,.pdf"
              className="sr-only"
              aria-label="Upload a TXT, DOCX, or PDF document"
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <ResultsPanel result={result} isChecking={isChecking} />
        <DisclaimerNote />
      </aside>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-mono text-base">{value.toLocaleString()}</p>
    </div>
  );
}
