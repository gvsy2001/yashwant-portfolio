"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";
import type { ProjectItem } from "@/types";

interface ProjectsExplorerProps {
  projects: ProjectItem[];
}

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tagsWithCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const project of projects) {
      for (const tag of project.tags) {
        const key = tag.toLowerCase();
        map.set(key, (map.get(key) ?? 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((project) =>
      project.tags.some((t) => t.toLowerCase() === selectedTag)
    );
  }, [projects, selectedTag]);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by tag"
        className="mb-8 flex flex-wrap items-center gap-2"
      >
        <Tag
          label="all"
          count={projects.length}
          active={selectedTag === null}
          onClick={() => setSelectedTag(null)}
        />
        {tagsWithCounts.map(({ tag, count }) => (
          <Tag
            key={tag}
            label={tag}
            count={count}
            active={selectedTag === tag}
            onClick={() =>
              setSelectedTag((prev) => (prev === tag ? null : tag))
            }
          />
        ))}
      </div>

      <p aria-live="polite" className="mb-6 text-sm text-muted">
        Showing {filteredProjects.length}{" "}
        {filteredProjects.length === 1 ? "project" : "projects"}
        {selectedTag ? ` tagged ${selectedTag}` : ""}.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <Card key={project.slug} className="flex flex-col justify-between">
            <div>
              <div className="mb-4 overflow-hidden rounded-lg border border-border bg-surface-alt">
                <Image
                  src={project.cover}
                  alt={`${project.title} architecture preview`}
                  width={960}
                  height={540}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Tag
                    key={tag}
                    label={tag}
                    active={selectedTag === tag.toLowerCase()}
                    onClick={() =>
                      setSelectedTag((prev) =>
                        prev === tag.toLowerCase() ? null : tag.toLowerCase()
                      )
                    }
                  />
                ))}
              </div>
              <h2 className="mt-3 text-xl font-semibold text-ink">
                <Link href={`/projects/${project.slug}`} className="hover:text-accent">
                  {project.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 5).map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <span className="font-mono text-xs text-muted">
                {formatDate(project.date)}
              </span>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
              >
                <span>Read case study</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
