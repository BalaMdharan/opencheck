import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — OpenCheck" },
      {
        name: "description",
        content:
          "The terms for using OpenCheck: acceptable use, the limits of similarity results, and no warranty of accuracy.",
      },
      { property: "og:title", content: "Terms of Service — OpenCheck" },
      {
        property: "og:description",
        content: "Acceptable use and the explicit limits of OpenCheck similarity results.",
      },
      { property: "og:url", content: "https://open-text-check.lovable.app/terms" },
    ],
    links: [{ rel: "canonical", href: "https://open-text-check.lovable.app/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="Plain-language terms for using the OpenCheck website and, in future, its similarity checking service."
      />
      <div className="container-page prose-page max-w-3xl py-14">
        <h2>Using OpenCheck</h2>
        <p>
          OpenCheck is provided free of charge for personal, educational, and research use. You may
          submit text you wrote or text you have the right to analyse.
        </p>

        <h2>Current status</h2>
        <p>
          This release is the user interface only. Plagiarism detection is not yet operational, and
          nothing on this site should be read as a claim that a check has been performed.
        </p>

        <h2>The limits of results</h2>
        <p>
          Similarity results, when available, are indicators of textual overlap. They are not
          evidence of plagiarism, academic misconduct, or copyright infringement, and must not be
          presented as such. Interpreting a report is your responsibility, and institutional
          policies always take precedence.
        </p>

        <h2>Acceptable use</h2>
        <ul>
          <li>Do not use OpenCheck to evade detection or disguise uncredited work.</li>
          <li>Do not submit content you are not permitted to share.</li>
          <li>Do not attempt to overload, scrape, or resell the service.</li>
        </ul>

        <h2>No warranty</h2>
        <p>
          The service is provided "as is", without guarantee of accuracy, completeness, or
          availability. To the extent permitted by law, OpenCheck is not liable for decisions made
          on the basis of its output.
        </p>

        <h2>Contact</h2>
        <p>Questions about these terms: hello@opencheck.app.</p>
      </div>
    </>
  );
}
