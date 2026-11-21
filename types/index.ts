export type ContentType = "project" | "post";

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  summary: string;
  date: string;
  tags: string[];
  stack: string[];
  featured: boolean;
  cover: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface PostFrontmatter {
  title: string;
  slug: string;
  summary: string;
  date: string;
  tags: string[];
  draft: boolean;
  cover?: string;
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ProjectItem extends ProjectFrontmatter {
  content: string;
  readingTimeMinutes: number;
  headings: TocHeading[];
}

export interface PostItem extends PostFrontmatter {
  content: string;
  readingTimeMinutes: number;
  headings: TocHeading[];
}

export interface SearchDocument {
  id: string;
  type: ContentType;
  slug: string;
  href: string;
  title: string;
  summary: string;
  tags: string[];
  date: string;
}

export interface ExperienceEntry {
  role: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  validity: string;
}
