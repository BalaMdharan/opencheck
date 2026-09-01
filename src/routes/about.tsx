import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About OpenCheck — why we built a free similarity checker" },
      {
        name: "description",
        content:
          "OpenCheck exists to make similarity checking free, transparent, and privacy-respecting for students, writers, and researchers.",
      },
      { property: "og:title", content: "About OpenCheck" },
      {
        property: "og:description",
        content:
          "Why OpenCheck is free, privacy-focused, and deliberately limited to plagiarism and similarity detection.",
      },
      { property: "og:url", content: "https://open-text-check.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://open-text-check.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A similarity checker that respects the person using it"
        description="OpenCheck is being built for people who care about citing properly and can't justify a subscription to find out whether they did."
      />
      <div className="container-page prose-page max-w-3xl py-14">
        <h2>Why OpenCheck exists</h2>
        <p>
          Most similarity checkers are sold to institutions, not to writers. Students often see a
          report only after submission, cannot re-check a revision, and have no say in whether their
          work is stored permanently in a commercial database. The free alternatives usually cap
          word counts, then upsell rewriting tools that make the underlying problem worse.
        </p>
        <p>
          OpenCheck flips that. The checker is for the author, before submission, at no cost, with a
          report designed to be read rather than feared.
        </p>

        <h2>What we believe</h2>
        <ul>
          <li>Attribution is a skill, and skills are learned with feedback.</li>
          <li>A percentage is evidence to interpret, never a judgement about a person.</li>
          <li>Your unpublished writing belongs to you, not to a training corpus.</li>
          <li>A tool should be honest about what it cannot do.</li>
        </ul>

        <h2>Deliberate limits</h2>
        <p>
          OpenCheck will not humanize AI text, paraphrase, rewrite, or claim to detect AI-generated
          writing. AI detection in particular is unreliable and has harmed innocent students. We
          would rather do one measurable thing well: show where your text overlaps with existing
          text.
        </p>

        <h2>Where the project is now</h2>
        <p>
          This is the first release of the OpenCheck interface. The detection engine — a separate
          Python service that does the indexing and comparison — is in development, and the checker
          page will connect to it once it is ready. Nothing on this site simulates results in the
          meantime.
        </p>
      </div>
    </>
  );
}
