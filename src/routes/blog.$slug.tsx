import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { getPostBySlug } from "@/lib/blog";
import { breadcrumbLd } from "@/lib/seo";

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
        { property: "og:url", content: url, tagName: "meta" },
      ],
      links: [{ rel: "canonical", href: url, key: "canonical" }],
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
        {
          type: "application/ld+json",
          children: breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${params.slug}` },
          ]),
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
        <aside className="rounded-lg border bg-muted/40 p-6 not-prose">
          <h2 className="text-lg font-semibold text-foreground">Check your own text, free</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Paste your draft into OpenCheck to see where it overlaps with published sources. No
            sign-up, and your text is compared in memory and discarded — never stored.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <Link to="/checker" className="text-primary hover:underline">
              Run a free plagiarism check →
            </Link>
            <Link
              to="/free-plagiarism-checker-for-students"
              className="text-primary hover:underline"
            >
              For students →
            </Link>
          </div>
        </aside>
        <p>
          <Link to="/blog">← Back to all articles</Link>
        </p>
      </article>
    </>
  );
}
