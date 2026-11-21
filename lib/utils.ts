import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TocHeading } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    return "https://gvsyashwant.dev";
  }
  return raw.replace(/\/+$/, "");
}

export function formatDate(dateString: string): string {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) {
    return dateString;
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function computeReadingTimeMinutes(markdown: string): number {
  const cleaned = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_~\-[\]()!]/g, " ");
  const words = cleaned
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  return Math.max(1, Math.ceil(words.length / 200));
}

export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = markdown.split("\n");
  let insideFence = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) {
      continue;
    }

    const match = /^(##|###)\s+(.+)$/.exec(trimmed);
    if (match?.[1] && match[2]) {
      const level = match[1] === "##" ? 2 : 3;
      const cleanText = match[2].replace(/[#*_`]/g, "").trim();
      headings.push({
        id: slugifyHeading(cleanText),
        text: cleanText,
        level,
      });
    }
  }

  return headings;
}
