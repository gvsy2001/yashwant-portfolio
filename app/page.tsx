import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { formatDate, getSiteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gannavarapu Venkata Sai Yashwant | Software Engineer",
  description:
    "Software Engineer in Hyderabad, India building full-stack React, Node.js, Java, MongoDB, and AWS cloud systems.",
  alternates: {
    canonical: "/",
  },
};

const CORE_SKILLS = [
  "React.js",
  "Redux",
  "TypeScript",
  "JavaScript (ES6+)",
  "Node.js",
  "Express.js",
  "Java",
  "MongoDB",
  "AWS (S3, Lambda, SQS, SNS, RDS, EC2)",
  "Datadog & Splunk",
  "Kibana & OpenSearch",
  "Jest & JUnit",
];

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const projects = getAllProjects();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);
  const latestPosts = getAllPosts().slice(0, 3);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gannavarapu Venkata Sai Yashwant",
    jobTitle: "Software Engineer",
    url: siteUrl,
    email: "mailto:gvsyashwant@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    worksFor: {
      "@type": "Organization",
      name: "Cognizant",
    },
    sameAs: ["https://github.com", "https://linkedin.com"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

     <section className="border-b border-border py-section lg:py-section-lg">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for opportunities</span>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Gannavarapu Venkata Sai Yashwant
            </h1>
            <p className="mt-2 font-mono text-sm font-semibold text-accent sm:text-base">
              Software Engineer · Cognizant · Hyderabad, India
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Full-stack software engineer with 3+ years of experience building scalable web
              applications, distributed backend services, and AWS cloud solutions using React,
              TypeScript, Node.js, Java, and MongoDB.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href="/projects" size="lg">
                <span>View Projects</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Me
              </Button>
              <Button href="/resume.pdf" variant="ghost" size="lg">
                <FileDown className="h-4 w-4" aria-hidden="true" />
                <span>Resume</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>
<section
        aria-label="Core technical skills"
        className="border-b border-border bg-surface py-9"
      >
        <Container>
          <p className="mb-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            Core Stack &amp; Tooling
          </p>
          <div className="flex flex-wrap gap-2.5">
            {CORE_SKILLS.map((skill) => (
              <Badge
                key={skill}
                className="px-3 py-1 transition-colors duration-150 hover:border-accent/60"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Container>
      </section>
      
      <Section
        id="featured-projects"
        title="Featured Projects"
        subtitle="Selected engineering systems covering cloud migrations, high-throughput services, and observability."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <Card key={project.slug} className="flex flex-col justify-between">
              <div>
                <div className="mb-4 overflow-hidden rounded-lg border border-border bg-surface-alt">
                  <Image
                    src={project.cover}
                    alt={`${project.title} architecture preview`}
                    width={960}
                    height={540}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-44 w-full object-cover"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-ink">
                  <Link href={`/projects/${project.slug}`} className="hover:text-accent">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.summary}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="font-mono text-xs text-muted">
                  {formatDate(project.date)}
                </span>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
                >
                  <span>Case study</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button href="/projects" variant="outline">
            All Projects
          </Button>
        </div>
      </Section>

      <Section
        id="latest-posts"
        title="Latest Writing"
        subtitle="Notes on AWS architectures, data migrations, microservices, and production triage."
        className="border-t border-border bg-surface/50"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <Card key={post.slug} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>{post.readingTimeMinutes} min read</span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-ink">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.summary}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button href="/blog" variant="outline">
            All Posts
          </Button>
        </div>
      </Section>
    </>
  );
}
