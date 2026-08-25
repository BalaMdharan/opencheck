import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Lock, Quote, ScanSearch, Scale, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OpenCheck — Free plagiarism & similarity checker for students" },
      {
        name: "description",
        content:
          "Paste an essay, chapter, or article and see which sentences overlap with existing sources, next to the sources themselves — free, no account, nothing archived.",
      },
      {
        property: "og:title",
        content: "See where your writing overlaps with existing work",
      },
      {
        property: "og:description",
        content:
          "Review matching sentences beside their possible sources and fix your citations before anyone else reads your draft.",
      },
      { property: "og:url", content: "https://open-text-check.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://open-text-check.lovable.app/" }],
  }),
  component: HomePage,
});


const FEATURES = [
  {
    icon: Lock,
    title: "Privacy first",
    body: "Your draft is yours. No selling submissions, no silent archiving into a reuse database.",
  },
  {
    icon: Wallet,
    title: "Free to use",
    body: "Built for people on a student budget. No trial countdowns, no paywalled word limits.",
  },
  {
    icon: Quote,
    title: "Context over scores",
    body: "Matched sentences are shown next to their potential sources so you can judge each one.",
  },
  {
    icon: Scale,
    title: "Honest about limits",
    body: "We never call a document plagiarised. We show overlap and let a human decide.",
  },
  {
    icon: FileText,
    title: "Documents, later",
    body: "TXT, DOCX, and PDF uploads are planned alongside plain pasted text.",
  },
  {
    icon: ScanSearch,
    title: "Similarity only",
    body: "No paraphrasing, rewriting, humanizing, or AI-content detection. One job, done clearly.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Add your text",
    body: "Paste a draft or (soon) upload a document. Word and character counts update as you type.",
  },
  {
    n: "02",
    title: "Run the check",
    body: "Your text is sent to the OpenCheck detection service, which compares it against indexed sources.",
  },
  {
    n: "03",
    title: "Review matches",
    body: "You get an overall similarity figure, the matching sentences, and the sources they resemble.",
  },
  {
    n: "04",
    title: "Decide in context",
    body: "Cite what needs citing, quote properly, and ignore the false alarms. The judgement stays human.",
  },
];

function HomePage() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Free · Privacy-focused · In development
            </p>
            <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">
              See where your writing overlaps with existing work.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              OpenCheck is a plagiarism and similarity checker for students, writers, and
              researchers. Paste your text, review the sentences that match other sources, and fix
              your citations before anyone else reads it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/checker">Check plagiarism</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/how-it-works">How it works</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              The detection engine is still being built — the checker interface is available to
              explore now.
            </p>
          </div>

          <CheckerPreview />
        </div>
      </section>

      <section className="container-page py-16" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-2xl sm:text-3xl">
          Built around a few firm principles
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-lg border border-border bg-card p-5 shadow-card"
            >
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface" aria-labelledby="how-heading">
        <div className="container-page py-16">
          <h2 id="how-heading" className="text-2xl sm:text-3xl">
            How a check will work
          </h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li key={step.n}>
                <span className="font-mono text-sm text-primary">{step.n}</span>
                <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16" aria-labelledby="indicator-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <h2 id="indicator-heading" className="text-2xl sm:text-3xl">
              Why a similarity score is only an indicator
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Similarity software compares strings of text. It cannot read intent, check whether a
              quotation is attributed, or know that a methods section has to describe a standard
              procedure in standard words. A high score can be perfectly honest writing; a low score
              can still hide uncredited ideas.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Use OpenCheck as a proofreading aid for attribution — not as a verdict on a person.
            </p>
          </div>
          <div className="space-y-4">
            <DisclaimerNote />
            <div className="rounded-lg border border-border bg-card p-5 shadow-card">
              <h3 className="text-base font-semibold">Common causes of legitimate overlap</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Correctly quoted and cited passages</li>
                <li>• Reference lists and bibliographies</li>
                <li>• Standard definitions, formulas, and legal wording</li>
                <li>• Repeated methods descriptions in scientific writing</li>
                <li>• Your own earlier draft indexed elsewhere</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CheckerPreview() {
  return (
    <div
      className="rounded-xl border border-border bg-card p-4 shadow-card"
      aria-label="Preview of the OpenCheck checker interface"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <p className="text-sm font-semibold">Checker preview</p>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
          Interface only
        </span>
      </div>
      <div className="mt-4 rounded-lg border border-dashed border-border bg-surface p-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Paste your essay, article, or chapter here. OpenCheck will highlight the sentences that
          closely resemble text it finds elsewhere…
        </p>
      </div>
      <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
        {[
          ["Words", "—"],
          ["Characters", "—"],
          ["Similarity", "—"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-surface p-3">
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="mt-1 font-mono text-lg">{value}</dd>
          </div>
        ))}
      </dl>
      <Button asChild className="mt-4 w-full">
        <Link to="/checker">Open the checker</Link>
      </Button>
    </div>
  );
}
