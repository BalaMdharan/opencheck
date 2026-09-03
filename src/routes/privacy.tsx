import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — OpenCheck" },
      {
        name: "description",
        content:
          "How OpenCheck handles the text you submit, what we store, and the choices you have. Written in plain language.",
      },
      { property: "og:title", content: "Privacy Policy — OpenCheck" },
      {
        property: "og:description",
        content: "What OpenCheck does and does not do with your writing.",
      },
      { property: "og:url", content: "https://openchecknow.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://openchecknow.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated when this interface was published. This policy describes our commitments as the service is built."
      />
      <div className="container-page prose-page max-w-3xl py-14">
        <h2>Your submissions</h2>
        <p>
          The current version of this site does not send your text anywhere. Everything you type on
          the checker page stays in your browser until you leave or refresh.
        </p>
        <p>
          When the detection engine is connected, your text will be transmitted to the OpenCheck
          service solely to run the comparison you requested. We do not intend to add submissions to
          a reusable content database, sell them, or use them to train models.
        </p>

        <h2>What we store</h2>
        <ul>
          <li>Submitted text: processed for the check, not retained afterwards.</li>
          <li>Uploaded files: parsed for their text, then discarded.</li>
          <li>Operational logs: minimal request metadata for reliability and abuse prevention.</li>
        </ul>

        <h2>Accounts and tracking</h2>
        <p>
          No account is required to use the checker. We do not run advertising trackers or
          cross-site profiling scripts.
        </p>

        <h2>Third parties</h2>
        <p>
          Comparison may involve querying public sources and search indexes. Only the fragments
          needed for a lookup are used, never your full document as a published item.
        </p>

        <h2>Your choices</h2>
        <p>
          You can stop at any time by clearing the text box. For questions or a data request, email
          hello@opencheck.app.
        </p>

        <h2>Changes</h2>
        <p>
          As features ship, this policy will be updated and the change noted here. Nothing described
          above is a placeholder for a future broader use of your work.
        </p>
      </div>
    </>
  );
}
