import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CheckerWorkspace } from "@/components/checker/CheckerWorkspace";
import { Button } from "@/components/ui/button";
import { SITE_URL, breadcrumbLd } from "@/lib/seo";

const PATH = "/plagiarism-checker-for-bloggers";
const URL = `${SITE_URL}${PATH}`;

const FAQS = [
  {
    q: "Why should a blogger check content for plagiarism?",
    a: "Two reasons: to confirm a writer you commissioned did not copy anything, and to see whether your own phrasing duplicates a page that already ranks. Both cost you credibility and search visibility.",
  },
  {
    q: "Does duplicate content get a site penalised?",
    a: "Search engines usually filter duplicate pages rather than penalise them, which still means your version may not be the one that ranks. Original wording is the practical fix.",
  },
  {
    q: "Is my client's draft stored anywhere?",
    a: "No. The text is compared in memory and discarded once the result is returned. Nothing is archived or reused.",
  },
  {
    q: "Can I check content before publishing it?",
    a: "Yes, and that is the point. Screening a draft before it goes live is far easier than issuing a correction afterwards.",
  },
];

export const Route = createFileRoute("/plagiarism-checker-for-bloggers")({
  head: () => ({
    meta: [
      { title: "Plagiarism Checker for Bloggers & Writers — Free | OpenCheck" },
      {
        name: "description",
        content:
          "Check blog posts, client drafts, and freelance work for duplicate content before publishing. Free, no account, and nothing you paste is stored.",
      },
      { property: "og:title", content: "Plagiarism Checker for Bloggers and Writers" },
      {
        property: "og:description",
        content:
          "Screen posts and client drafts for duplicate content before publishing. Free and nothing is stored.",
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
          { name: "Plagiarism checker for bloggers", path: PATH },
        ]),
      },
    ],
  }),
  component: BloggersPage,
});

const REASONS = [
  {
    title: "Vet commissioned work",
    body: "Freelance and agency drafts arrive finished. A quick screen tells you whether the wording is actually original before it carries your byline.",
  },
  {
    title: "Avoid duplicate content",
    body: "If your phrasing matches a page that already ranks, search engines may show theirs instead of yours. Rewrite before publishing.",
  },
  {
    title: "Client drafts stay private",
    body: "Unpublished client content is not archived here. It is compared in memory and discarded.",
  },
  {
    title: "No word limit paywall",
    body: "Run a full long-form post, not a 300-word preview that stops at the interesting part.",
  },
];

function BloggersPage() {
  return (
    <>
      <PageHeader
        eyebrow="For bloggers and writers"
        title="Plagiarism checker for bloggers and writers"
        description="Screen posts, client drafts, and freelance submissions for duplicate content before you publish. Free, no account, and nothing you paste is stored."
      />

      <div className="container-page py-10">
        <CheckerWorkspace />
      </div>

      <section className="border-y border-border bg-surface" aria-labelledby="why-heading">
        <div className="container-page py-14">
          <h2 id="why-heading" className="text-2xl sm:text-3xl">
            Why writers check before publishing
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
              A pre-publish routine
            </h2>
            <ol className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>1. Paste the finished draft, quotes included.</li>
              <li>2. Read each matched sentence instead of judging the percentage.</li>
              <li>3. Link or attribute anywhere you drew on a specific source.</li>
              <li>4. Rewrite close paraphrase in your own voice.</li>
              <li>5. Re-check, then publish.</li>
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
            <h2 className="text-2xl sm:text-3xl">Questions writers ask</h2>
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
