import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — OpenCheck on citation, similarity, and academic writing" },
      {
        name: "description",
        content:
          "Notes from the OpenCheck team on reading similarity reports, citing correctly, and building the detection engine.",
      },
      { property: "og:title", content: "OpenCheck Blog" },
      {
        property: "og:description",
        content:
          "Guides on similarity reports and citation practice, plus development notes from the OpenCheck project.",
      },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  {
    title: "What a 20% similarity score actually tells you",
    category: "Guides",
    summary:
      "Percentages are averages of very different things. A walkthrough of how to break a score down into quotations, references, and genuine problems.",
    status: "Coming soon",
  },
  {
    title: "Citing sources you paraphrased, not just the ones you quoted",
    category: "Guides",
    summary:
      "Rewording a passage does not remove the obligation to credit its author. How to attribute ideas as well as sentences.",
    status: "Coming soon",
  },
  {
    title: "Why OpenCheck will never add an AI detector",
    category: "Principles",
    summary:
      "AI-writing detectors produce false accusations at rates no student should have to accept. Our reasoning for staying out.",
    status: "Coming soon",
  },
  {
    title: "Designing a privacy-respecting detection pipeline",
    category: "Engineering",
    summary:
      "Notes on the Python service behind OpenCheck: fingerprinting, indexing, and keeping submissions out of any permanent store.",
    status: "Coming soon",
  },
];

function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Writing about citation, similarity, and building OpenCheck"
        description="Practical guides for people who have to hand something in, plus development notes from the project."
      />
      <div className="container-page py-14">
        <ul className="grid gap-4 md:grid-cols-2">
          {POSTS.map((post) => (
            <li
              key={post.title}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
                  {post.category}
                </span>
                <span className="text-muted-foreground">{post.status}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          Articles are being written now — no filler posts until they are ready.
        </p>
      </div>
    </>
  );
}
