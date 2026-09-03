import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { getPostBySlug } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    const url = `https://openchecknow.lovable.app/blog/${params.slug}`;
    if (!post) return {};
    return {
      meta: [
        { title: `${post.title} — OpenCheck` },
        { name: "description", content: post.summary },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.summary,
            articleSection: post.category,
            mainEntityOfPage: url,
            author: { "@type": "Organization", name: "OpenCheck" },
            publisher: { "@type": "Organization", name: "OpenCheck" },
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();

  return (
    <>
      <PageHeader eyebrow={post.category} title={post.title} description={post.summary} />
      <article className="container-page prose-page max-w-3xl py-14">
        <p className="text-sm text-muted-foreground">{post.readingTime}</p>
        <p className="lead">{post.intro}</p>
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul>
                {section.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 40)}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        <p>
          <Link to="/blog">← Back to all articles</Link>
        </p>
      </article>
    </>
  );
}
