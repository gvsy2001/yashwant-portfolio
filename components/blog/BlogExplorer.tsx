"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";
import type { PostItem } from "@/types";

interface BlogExplorerProps {
  posts: PostItem[];
}

export function BlogExplorer({ posts }: BlogExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tagsWithCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) {
        const key = tag.toLowerCase();
        map.set(key, (map.get(key) ?? 0) + 1);
      }
    }
    return Array.from(map.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesTag =
        !selectedTag ||
        post.tags.some((tag) => tag.toLowerCase() === selectedTag);

      if (!matchesTag) return false;
      if (!normalizedQuery) return true;

      const haystack = [post.title, post.summary, ...post.tags]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <label htmlFor="blog-filter-input" className="sr-only">
            Filter blog posts by keyword
          </label>
          <input
            id="blog-filter-input"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter posts by title or topic..."
            className="w-full rounded-md border border-border bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <p aria-live="polite" className="text-sm text-muted">
          {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
        </p>
      </div>

      <div
        role="group"
        aria-label="Filter blog posts by tag"
        className="mb-8 flex flex-wrap items-center gap-2"
      >
        <Tag
          label="all"
          count={posts.length}
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

      {filteredPosts.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-8 text-center text-sm text-muted">
          No articles match your current filter. Try clearing the search input or tag.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.slug}>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTimeMinutes} min read</span>
              </div>

              <h2 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">
                <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                  {post.title}
                </Link>
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {post.summary}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
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

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-accent hover:text-accent-hover"
                >
                  Read article →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
