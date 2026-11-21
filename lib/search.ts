import { getAllPosts, getAllProjects } from "./content";
import type { SearchDocument } from "@/types";

export function buildSearchIndex(): SearchDocument[] {
  const projectDocs: SearchDocument[] = getAllProjects().map((project) => ({
    id: `project-${project.slug}`,
    type: "project",
    slug: project.slug,
    href: `/projects/${project.slug}`,
    title: project.title,
    summary: project.summary,
    tags: project.tags,
    date: project.date,
  }));

  const postDocs: SearchDocument[] = getAllPosts().map((post) => ({
    id: `post-${post.slug}`,
    type: "post",
    slug: post.slug,
    href: `/blog/${post.slug}`,
    title: post.title,
    summary: post.summary,
    tags: post.tags,
    date: post.date,
  }));

  return [...projectDocs, ...postDocs];
}
