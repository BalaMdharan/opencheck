import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { DisclaimerNote } from "@/components/site/DisclaimerNote";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How OpenCheck works — similarity checking explained" },
      {
        name: "description",
        content:
          "How OpenCheck compares your text against sources, what an overall similarity score means, and why every match needs human review.",
      },
      { property: "og:title", content: "How OpenCheck works" },
      {
        property: "og:description",
        content:
          "From pasted text to reviewed matches: the steps behind an OpenCheck similarity report, and its limits.",
      },
      { property: "og:url", content: "https://open-text-check.lovable.app/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "https://open-text-check.lovable.app/how-it-works" }],
  }),
  component: HowItWorksPage,
});

const STAGES = [
  {
    title: "1. You submit text",
    body: "Text is pasted or extracted from a document. Nothing is analysed in your browser beyond counting words — the comparison happens in the detection service.",
  },
  {
    title: "2. The text is segmented",
    body: "Your submission is split into sentences and overlapping fragments so that comparison happens at a readable, quotable level.",
  },
  {
    title: "3. Fragments are compared",
    body: "Each sentence is compared against public reference sources using wording-overlap and verbatim-phrase measures, looking for near-identical wording rather than shared ideas.",
  },
  {
    title: "4. A report is assembled",
    body: "Matches are grouped by source, scored, and combined into an overall similarity figure that reflects how much of your text overlaps with existing material.",
  },
  {
    title: "5. You review it",
    body: "You read each match with your citations in front of you and decide what needs a quotation mark, a reference, or a rewrite in your own words.",
  },
];

const NOT_DOING = [
  "AI humanization",
  "Paraphrasing or text rewriting",
  "AI-content detection",
  "Grading, verdicts, or misconduct reports",
];

function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="From your draft to a report you can actually act on"
        description="OpenCheck does one thing: it finds text in your writing that closely resembles text elsewhere, and shows you where."
      />
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div>
          <ol className="space-y-6">
            {STAGES.map((stage) => (
              <li key={stage.title} className="border-l-2 border-border pl-5">
                <h2 className="text-lg font-semibold">{stage.title}</h2>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{stage.body}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-12 text-2xl">Reading a similarity score</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            There is no universal "safe" percentage. A literature review that quotes generously may
            legitimately reach 25%, while a short reflective piece with 8% overlap may contain the
            one uncited sentence that matters. Read the matches, not the number.
          </p>
        </div>

        <aside className="space-y-4">
          <DisclaimerNote />
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h2 className="text-base font-semibold">What OpenCheck will never offer</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {NOT_DOING.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Tools that rewrite text to dodge detection undermine the point of academic writing.
              We stay on the side of attribution.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link to="/checker">Open the checker</Link>
          </Button>
        </aside>
      </div>
    </>
  );
}
