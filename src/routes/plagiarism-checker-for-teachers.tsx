import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CheckerWorkspace } from "@/components/checker/CheckerWorkspace";
import { Button } from "@/components/ui/button";
import { SITE_URL, breadcrumbLd } from "@/lib/seo";

const PATH = "/plagiarism-checker-for-teachers";
const URL = `${SITE_URL}${PATH}`;

const FAQS = [
  {
    q: "Can I check student work without an institutional licence?",
    a: "Yes. OpenCheck is free and needs no account, so you can screen a draft the moment a passage reads differently from the student's usual voice.",
  },
  {
    q: "Is student text stored after the check?",
    a: "No. Text is compared in memory and discarded when the result is returned. Nothing is archived or added to a corpus that later submissions could match against.",
  },
  {
    q: "Does a high similarity score prove plagiarism?",
    a: "No. Similarity shows overlap, not intent. Quotations, reference lists, and standard phrasing all raise the score. Read the matched sentences before drawing any conclusion.",
  },
  {
    q: "Can students use the same tool before submitting?",
    a: "Yes, and many teachers prefer it. Students who can check their own drafts learn to fix citation problems before they become integrity cases.",
  },
];

export const Route = createFileRoute("/plagiarism-checker-for-teachers")({
  head: () => ({
    meta: [
      { title: "Plagiarism Checker for Teachers — Free, No Account | OpenCheck" },
      {
        name: "description",
        content:
          "Screen student essays and drafts for uncited overlap without an institutional licence. Free, no sign-up, and submitted text is never stored.",
      },
      { property: "og:title", content: "Plagiarism Checker for Teachers — Free and Private" },
      {
        property: "og:description",
        content:
          "Check student work for uncited overlap without a licence or an account. Nothing is stored.",
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
          { name: "Plagiarism checker for teachers", path: PATH },
        ]),
      },
    ],
  }),
  component: TeachersPage,
});

const REASONS = [
  {
    title: "No licence to negotiate",
    body: "No procurement, no per-seat pricing, no waiting for IT. Paste a draft and read the report.",
  },
  {
    title: "Student work stays private",
    body: "Submissions are compared in memory and discarded. You are not feeding minors' writing into a commercial database.",
  },
  {
    title: "Evidence, not accusations",
    body: "Every match is shown next to its source, so a conversation with a student starts from a passage, not a percentage.",
  },
  {
    title: "Teach with it",
    body: "Point students at the same free checker before deadlines. Self-screening turns citation problems into learning moments.",
  },
];

function TeachersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For teachers"
        title="Plagiarism checker for teachers"
        description="Screen student essays and drafts for uncited overlap — free, no account, and nothing submitted is stored."
      />

      <div className="container-page py-10">
        <CheckerWorkspace />
      </div>

      <section className="border-y border-border bg-surface" aria-labelledby="why-heading">
        <div className="container-page py-14">
          <h2 id="why-heading" className="text-2xl sm:text-3xl">
            Why teachers use OpenCheck
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

      <section className="container-page py-14" aria-labelledby="how-heading">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 id="how-heading" className="text-2xl sm:text-3xl">
              A fair screening routine
            </h2>
            <ol className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>1. Screen the draft when a passage breaks a student&apos;s usual voice.</li>
              <li>2. Read each matched sentence alongside its source.</li>
              <li>3. Discount quotations, reference lists, and standard phrasing.</li>
              <li>4. Raise remaining matches as a conversation, showing the evidence.</li>
              <li>5. Keep similarity as a pointer to look closer — never a verdict.</li>
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/checker">Open the checker</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/free-plagiarism-checker-for-students">Share with students</Link>
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl">Questions teachers ask</h2>
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
