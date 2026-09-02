import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CheckerWorkspace } from "@/components/checker/CheckerWorkspace";
import { Button } from "@/components/ui/button";

const URL = "https://open-text-check.lovable.app/free-plagiarism-checker-for-students";

const FAQS = [
  {
    q: "Is OpenCheck free for students?",
    a: "Yes. There is no cost, no trial period, and no account. Paste your assignment and run a check.",
  },
  {
    q: "Will my essay be saved or submitted anywhere?",
    a: "No. Your text is compared in memory and discarded immediately. It is never archived into a database that a future check could match against.",
  },
  {
    q: "Is this the same as Turnitin?",
    a: "No. Turnitin compares against a private repository of student papers your institution contributes to. OpenCheck compares against public sources, so results will differ. Use it before submission to catch missing citations, not to predict a Turnitin score.",
  },
  {
    q: "What counts as a bad similarity score?",
    a: "There is no fixed rule. Quotes, references, and standard method wording all add legitimate overlap. Read each matched sentence and ask whether it is credited.",
  },
];

export const Route = createFileRoute("/free-plagiarism-checker-for-students")({
  head: () => ({
    meta: [
      { title: "Free Plagiarism Checker for Students — No Account | OpenCheck" },
      {
        name: "description",
        content:
          "Check your essay, assignment, or thesis for plagiarism free. Built for students: no account, no fees, no word paywall, and your document is never stored.",
      },
      {
        property: "og:title",
        content: "Free Plagiarism Checker for Students — No Account Needed",
      },
      {
        property: "og:description",
        content:
          "Check an essay or assignment for similarity before you submit it. Free, private, and nothing is archived.",
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
    ],
  }),
  component: StudentsPage,
});

const REASONS = [
  {
    title: "No account, no card",
    body: "Nothing to sign up for and nothing to cancel. Open the page, paste the assignment, run the check.",
  },
  {
    title: "Your draft is not archived",
    body: "Unpublished coursework should not end up in someone else's database. OpenCheck compares in memory and forgets it.",
  },
  {
    title: "Sentences, not just a number",
    body: "You see each matching sentence beside the source it resembles, so you know exactly which citation to add.",
  },
  {
    title: "No word paywall",
    body: "Full essays and chapters, not a 300-word teaser that asks for payment at the useful part.",
  },
];

function StudentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="For students"
        title="Free plagiarism checker for students"
        description="Check an essay, assignment, or thesis chapter before you hand it in. Free, no account, and your document is never stored or added to any reuse database."
      />

      <div className="container-page py-10">
        <CheckerWorkspace />
      </div>

      <section className="border-y border-border bg-surface" aria-labelledby="why-heading">
        <div className="container-page py-14">
          <h2 id="why-heading" className="text-2xl sm:text-3xl">
            Why students use OpenCheck
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
              What to do before you submit
            </h2>
            <ol className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>1. Run the finished draft, including quotes, through the checker.</li>
              <li>2. Read every matched sentence — ignore the percentage first.</li>
              <li>3. Add a citation anywhere an idea or phrasing came from a source.</li>
              <li>4. Turn close paraphrases into either proper quotations or genuinely your own wording.</li>
              <li>5. Re-check, then submit through your institution&apos;s system.</li>
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
            <h2 className="text-2xl sm:text-3xl">Questions students ask</h2>
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
