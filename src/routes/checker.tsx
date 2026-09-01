import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { CheckerWorkspace } from "@/components/checker/CheckerWorkspace";

export const Route = createFileRoute("/checker")({
  head: () => ({
    meta: [
      { title: "Plagiarism Checker — OpenCheck" },
      {
        name: "description",
        content:
          "Paste text or prepare a document for OpenCheck's similarity check. Word counts, upload interface, and a results area for matches and sources.",
      },
      { property: "og:title", content: "Plagiarism Checker — OpenCheck" },
      {
        property: "og:description",
        content:
          "The OpenCheck checker workspace: paste your text, track word count, and see where similarity results will appear.",
      },
      { property: "og:url", content: "https://open-text-check.lovable.app/checker" },
    ],
    links: [{ rel: "canonical", href: "https://open-text-check.lovable.app/checker" }],
  }),
  component: CheckerPage,
});

function CheckerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Checker"
        title="Plagiarism checker"
        description="Paste your text below and run a check. OpenCheck returns an overall similarity figure, the matching sentences, and the public sources they resemble — nothing you submit is stored."
      />
      <div className="container-page py-10">
        <CheckerWorkspace />
      </div>
    </>
  );
}
