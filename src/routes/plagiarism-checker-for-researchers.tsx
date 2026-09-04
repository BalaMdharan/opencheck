import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CheckerWorkspace } from "@/components/checker/CheckerWorkspace";
import { Button } from "@/components/ui/button";
import { SITE_URL, breadcrumbLd } from "@/lib/seo";

const PATH = "/plagiarism-checker-for-researchers";
const URL = `${SITE_URL}${PATH}`;

const FAQS = [
  {
    q: "Is it safe to check unpublished research here?",
    a: "Your manuscript is compared in memory and discarded as soon as the result is returned. It is not archived, indexed, or added to any repository that later checks could match against.",
  },
  {
    q: "Will methods sections always show similarity?",
    a: "Often, yes. Standard protocols, instrument names, and statistical wording repeat across papers. Read the matched sentences rather than reacting to the percentage.",
  },
  {
    q: "Does this replace the journal's own screening?",
    a: "No. Publishers run their own screening against subscription databases. Use OpenCheck before submission to catch uncited overlap and accidental self-plagiarism.",
  },
  {
    q: "Can I check my own earlier paper against a new draft?",
    a: "Yes. Reusing your own published wording without citation is text recycling, and reviewers treat it as a problem. Check the draft and cite your prior work where it overlaps.",
  },
];

export const Route = createFileRoute("/plagiarism-checker-for-researchers")({
  head: () => ({
    meta: [
      { title: "Plagiarism Checker for Researchers — Free, Nothing Stored | OpenCheck" },
      {
        name: "description",
        content:
          "Screen a manuscript, thesis chapter, or grant draft for uncited overlap and text recycling before submission. Free, no account, and your text is never stored.",
      },
      { property: "og:title", content: "Plagiarism Checker for Researchers — Free and Private" },
      {
        property: "og:description",
        content:
          "Check a manuscript for uncited overlap and self-plagiarism before you submit it. Nothing is archived.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Plagiarism checker for researchers", path: PATH },
        ]),
      },
    ],
  }),
  component: ResearchersPage,
});

const REASONS = [
  {
    title: "Pre-submission screening",
    body: "Catch uncited paraphrase and copied phrasing before a desk rejection or an editorial integrity query does.",
  },
  {
    title: "Text recycling checks",
    body: "Reused wording from your own earlier papers still needs citation. Screen the draft and attribute it properly.",
  },
  {
    title: "Nothing is retained",
    body: "Unpublished results should not sit in a third-party database. OpenCheck compares in memory and forgets the text.",
  },
  {
    title: "Sentence-level evidence",
    body: "Each match is shown next to the source it resembles, so you can judge whether it is boilerplate or a real problem.",
  },
];

function ResearchersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For researchers"
        title="Plagiarism checker for researchers"
        description="Screen a manuscript, thesis chapter, or grant application for uncited overlap and text recycling before you submit. Free, and your draft is never stored."
      />

      <div className="container-page py-10">
        <CheckerWorkspace />
      </div>

      <section className="border-y border-border bg-surface" aria-labelledby="why-heading">
        <div className="container-page py-14">
          <h2 id="why-heading" className="text-2xl sm:text-3xl">
            Why researchers screen before submission
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {REASONS.map((r) => (
              <article
                key={r.title}
                className="rounded-lg border border-border bg-card p-5 shadow-card"
              >
                <h3 className="text-base font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14" aria-labelledby="before-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 id="before-heading" className="text-2xl sm:text-3xl">
              A pre-submission routine
            </h2>
            <ol className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>1. Screen the full draft, including the methods section.</li>
              <li>2. Separate boilerplate protocol wording from substantive overlap.</li>
              <li>3. Cite every source behind a paraphrased claim, including your own papers.</li>
              <li>4. Convert close paraphrase into quoted text or genuinely new wording.</li>
              <li>5. Re-check, then submit through the journal&apos;s system.</li>
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/checker">Open the checker</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/blog">Read the guides</Link>
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Questions researchers ask</h2>
            <dl className="mt-6 space-y-4">
              {FAQS.map((f) => (
                <div key={f.q} className="rounded-lg border border-border bg-card p-5 shadow-card">
                  <dt className="text-base font-semibold">{f.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
