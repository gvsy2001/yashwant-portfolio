import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/content";
import { formatDate, getSiteUrl } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: ["Gannavarapu Venkata Sai Yashwant"],
      images: post.cover ? [{ url: post.cover, alt: post.title }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(slug);
  const siteUrl = getSiteUrl();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Gannavarapu Venkata Sai Yashwant",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <article className="py-section lg:py-section-lg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Container className="max-w-5xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Blog</span>
        </Link>

        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {post.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {post.headings.length > 0 && (
            <aside
              aria-label="Table of contents"
              className="lg:order-2 lg:col-span-4"
            >
              <div className="rounded-xl border border-border bg-surface p-5 lg:sticky lg:top-24">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
                  Table of Contents
                </h2>
                <nav aria-label="Article sections" className="mt-3">
                  <ul className="space-y-2 text-sm">
                    {post.headings.map((heading) => (
                      <li
                        key={heading.id}
                        className={heading.level === 3 ? "pl-3" : ""}
                      >
                        <a
                          href={`#${heading.id}`}
                          className="text-muted transition-colors hover:text-accent"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          )}

          <div
            className={
              post.headings.length > 0
                ? "prose max-w-none lg:order-1 lg:col-span-8"
                : "prose max-w-none lg:col-span-12"
            }
          >
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>

        {(previous || next) && (
          <nav
            aria-label="Previous and next articles"
            className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/blog/${previous.slug}`}
                className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
              >
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Previous Post
                </span>
                <p className="mt-1.5 text-sm font-semibold text-ink group-hover:text-accent">
                  {previous.title}
                </p>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:border-accent/50 sm:text-right"
              >
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted">
                  Next Post
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p className="mt-1.5 text-sm font-semibold text-ink group-hover:text-accent">
                  {next.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </Container>
    </article>
  );
}
