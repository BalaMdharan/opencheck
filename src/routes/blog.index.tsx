import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { BLOG_POSTS } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — OpenCheck on citation, similarity, and academic writing" },
      {
        name: "description",
        content:
          "Guides on reading similarity reports and citing paraphrased sources, plus engineering notes from the OpenCheck detection service.",
      },
      { property: "og:title", content: "OpenCheck Blog" },
      {
        property: "og:description",
        content:
          "Guides on similarity reports and citation practice, plus development notes from the OpenCheck project.",
      },
      { property: "og:url", content: "https://openchecknow.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://openchecknow.lovable.app/blog" }],
  }),
  component: BlogPage,
});

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
          {BLOG_POSTS.map((post) => (
            <li
              key={post.slug}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
                  {post.category}
                </span>
                <span className="text-muted-foreground">{post.readingTime}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="hover:text-primary"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                Read the article
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
