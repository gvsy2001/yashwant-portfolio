import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { postFrontmatterSchema, projectFrontmatterSchema } from "./schemas";
import { computeReadingTimeMinutes, extractHeadings } from "./utils";
import type { PostItem, ProjectItem } from "@/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");
const BLOG_DIR = path.join(CONTENT_ROOT, "blog");

function readMdxFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .sort();
}

export function getAllProjects(): ProjectItem[] {
  const files = readMdxFiles(PROJECTS_DIR);

  const projects = files.map((fileName) => {
    const fullPath = path.join(PROJECTS_DIR, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);

    const validation = projectFrontmatterSchema.safeParse(parsed.data);
    if (!validation.success) {
      const details = validation.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      throw new Error(`Invalid frontmatter in project "${fileName}": ${details}`);
    }

    const data = validation.data;
    return {
      ...data,
      content: parsed.content,
      readingTimeMinutes: computeReadingTimeMinutes(parsed.content),
      headings: extractHeadings(parsed.content),
    };
  });

  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getAllPosts(): PostItem[] {
  const files = readMdxFiles(BLOG_DIR);
  const isProduction = process.env.NODE_ENV === "production";

  const posts = files.map((fileName) => {
    const fullPath = path.join(BLOG_DIR, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);

    const validation = postFrontmatterSchema.safeParse(parsed.data);
    if (!validation.success) {
      const details = validation.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
      throw new Error(`Invalid frontmatter in blog post "${fileName}": ${details}`);
    }

    const data = validation.data;
    return {
      ...data,
      content: parsed.content,
      readingTimeMinutes: computeReadingTimeMinutes(parsed.content),
      headings: extractHeadings(parsed.content),
    };
  });

  const filtered = isProduction ? posts.filter((post) => !post.draft) : posts;

  return filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): PostItem | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  previous: PostItem | null;
  next: PostItem | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}

export function getAllTags(): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();

  for (const project of getAllProjects()) {
    for (const tag of project.tags) {
      const normalized = tag.toLowerCase();
      counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
    }
  }

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const normalized = tag.toLowerCase();
      counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
