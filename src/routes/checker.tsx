import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CheckerWorkspace } from "@/components/checker/CheckerWorkspace";

const FAQS = [
  {
    q: "Is this plagiarism checker really free?",
    a: "Yes. OpenCheck is free to use, with no account, no trial countdown, and no paywalled word limit.",
  },
  {
    q: "Do you store or share the text I check?",
    a: "No. Your text is compared in memory and discarded when the check finishes. It is not archived, sold, or added to any reuse database.",
  },
  {
    q: "Do I need to sign up?",
    a: "No sign-up is required. Paste your text and run the check straight away.",
  },
  {
    q: "What similarity score is acceptable?",
    a: "There is no universal threshold. Many institutions treat scores under about 15% as normal, but quoted passages, references, and standard phrasing all raise the number legitimately. Read the matched sentences instead of trusting the percentage.",
  },
  {
    q: "Can I upload a document?",
    a: "TXT files load directly into the checker. For DOCX or PDF, paste the text and it is checked the same way.",
  },
];

export const Route = createFileRoute("/checker")({
  head: () => ({
    meta: [
      { title: "Free Plagiarism Checker — No Sign-Up, Nothing Stored | OpenCheck" },
      {
        name: "description",
        content:
          "Free plagiarism checker for students and writers. Paste your text, see which sentences match existing sources, and fix citations. No account, no cost, nothing stored.",
      },
      { property: "og:title", content: "Free Plagiarism Checker — No Sign-Up, Nothing Stored" },
      {
        property: "og:description",
        content:
          "Check your essay or article for similarity against public sources. Free, private, no account needed.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://openchecknow.lovable.app/checker" },
    ],
    links: [{ rel: "canonical", href: "https://openchecknow.lovable.app/checker" }],
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
  component: CheckerPage,
});

function CheckerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free · No sign-up · Nothing stored"
        title="Free plagiarism checker"
        description="Paste your essay, chapter, or article and run a free similarity check. OpenCheck returns an overall similarity figure, the matching sentences, and the public sources they resemble — with no account to create and nothing kept after the check."
      />
      <div className="container-page py-10">
        <CheckerWorkspace />
      </div>

      <section className="border-t border-border bg-surface" aria-labelledby="faq-heading">
        <div className="container-page py-14">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl">
            Frequently asked questions
          </h2>
          <dl className="mt-8 grid gap-5 md:grid-cols-2">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-lg border border-border bg-card p-5 shadow-card">
                <dt className="text-base font-semibold">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-muted-foreground">
            Studying? See the{" "}
            <Link
              to="/free-plagiarism-checker-for-students"
              className="text-primary hover:underline"
            >
              free plagiarism checker for students
            </Link>{" "}
            or read{" "}
            <Link to="/how-it-works" className="text-primary hover:underline">
              how a check works
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
