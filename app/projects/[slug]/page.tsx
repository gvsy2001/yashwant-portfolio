import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { formatDate } from "@/lib/utils";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      images: [{ url: project.cover, alt: project.title }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-section lg:py-section-lg">
      <Container className="max-w-4xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Projects</span>
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
            <time dateTime={project.date}>{formatDate(project.date)}</time>
            <span>·</span>
            <span>{project.readingTimeMinutes} min read</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button href={project.liveUrl} size="sm">
                <span>Live Demo</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            )}
            {project.repoUrl && (
              <Button href={project.repoUrl} variant="outline" size="sm">
                <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Repository</span>
              </Button>
            )}
          </div>
        </header>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
          <Image
            src={project.cover}
            alt={`${project.title} architecture diagram`}
            width={960}
            height={540}
            sizes="(max-width: 896px) 100vw, 896px"
            className="h-auto w-full object-cover"
          />
        </div>

        <section
          aria-label="Technology stack"
          className="mt-8 rounded-xl border border-border bg-surface p-5"
        >
          <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            Technology Stack
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <Badge key={item}>{item}</Badge>
            ))}
          </div>
        </section>

        <div className="prose mt-10 max-w-none">
          <MDXRemote source={project.content} components={mdxComponents} />
        </div>
      </Container>
    </article>
  );
}
