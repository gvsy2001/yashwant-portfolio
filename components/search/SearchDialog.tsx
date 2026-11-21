"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type FuseType from "fuse.js";
import type { FuseResultMatch } from "fuse.js";
import { FileText, FolderGit2, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { SearchDocument } from "@/types";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchHit {
  doc: SearchDocument;
  matches: readonly FuseResultMatch[];
}

function renderHighlightedText(
  text: string,
  matches: readonly FuseResultMatch[],
  fieldKey: string
): ReactNode {
  const fieldMatches = matches.filter((m) => m.key === fieldKey);
  if (fieldMatches.length === 0) {
    return text;
  }

  const ranges: Array<[number, number]> = [];
  for (const match of fieldMatches) {
    for (const [start, end] of match.indices) {
      ranges.push([start, end]);
    }
  }

  ranges.sort((a, b) => a[0] - b[0]);

  const merged: Array<[number, number]> = [];
  for (const [start, end] of ranges) {
    const prev = merged[merged.length - 1];
    if (prev && start <= prev[1] + 1) {
      prev[1] = Math.max(prev[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  const parts: ReactNode[] = [];
  let cursor = 0;

  merged.forEach(([start, end], idx) => {
    if (cursor < start) {
      parts.push(text.slice(cursor, start));
    }
    parts.push(
      <mark
        key={`${fieldKey}-${start}-${end}-${idx}`}
        className="rounded bg-accent/20 px-0.5 font-semibold text-ink"
      >
        {text.slice(start, end + 1)}
      </mark>
    );
    cursor = end + 1;
  });

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return parts;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [docs, setDocs] = useState<SearchDocument[]>([]);
  const [FuseConstructor, setFuseConstructor] = useState<typeof FuseType | null>(null);
  const [loadingIndex, setLoadingIndex] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    let cancelled = false;
    setLoadingIndex(true);

    Promise.all([
      import("fuse.js").then((mod) => mod.default),
      fetch("/api/search-index").then((res) => {
        if (!res.ok) throw new Error("Failed to load search index");
        return res.json() as Promise<SearchDocument[]>;
      }),
    ])
      .then(([FuseClass, loadedDocs]) => {
        if (cancelled) return;
        setFuseConstructor(() => FuseClass);
        setDocs(loadedDocs);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (!cancelled) {
          setLoadingIndex(false);
          inputRef.current?.focus();
        }
      });

    return () => {
      cancelled = true;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 150);
    return () => window.clearTimeout(timer);
  }, [query]);

  const fuseInstance = useMemo(() => {
    if (!FuseConstructor || docs.length === 0) return null;
    return new FuseConstructor(docs, {
      includeScore: true,
      includeMatches: true,
      threshold: 0.35,
      ignoreLocation: true,
      keys: [
        { name: "title", weight: 0.6 },
        { name: "tags", weight: 0.25 },
        { name: "summary", weight: 0.15 },
      ],
    });
  }, [FuseConstructor, docs]);

  const results: SearchHit[] = useMemo(() => {
    if (!fuseInstance) return [];
    if (!debouncedQuery) {
      return docs.slice(0, 6).map((doc) => ({ doc, matches: [] }));
    }
    return fuseInstance.search(debouncedQuery).map((item) => ({
      doc: item.item,
      matches: item.matches ?? [],
    }));
  }, [fuseInstance, docs, debouncedQuery]);

  useEffect(() => {
    setActiveIndex(0);
  }, [debouncedQuery, results.length]);

  const navigateToResult = useCallback(
    (hit: SearchHit) => {
      onClose();
      router.push(hit.doc.href);
    },
    [onClose, router]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) =>
          results.length === 0 ? 0 : (prev + 1) % results.length
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) =>
          results.length === 0
            ? 0
            : (prev - 1 + results.length) % results.length
        );
        return;
      }

      if (event.key === "Enter" && results[activeIndex]) {
        event.preventDefault();
        navigateToResult(results[activeIndex]);
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, results, activeIndex, navigateToResult]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/50 p-4 pt-16 backdrop-blur-xs sm:pt-24"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search projects and blog posts"
        className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-surface shadow-xl"
      >
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="mr-3 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          <label htmlFor="search-dialog-input" className="sr-only">
            Search projects and blog posts
          </label>
          <input
            id="search-dialog-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, posts, AWS, React, MongoDB..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search dialog"
            className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-alt hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="border-b border-border bg-surface-alt/60 px-4 py-1.5 text-xs text-muted">
          <span aria-live="polite">
            {loadingIndex
              ? "Loading search index..."
              : debouncedQuery
                ? `${results.length} ${results.length === 1 ? "result" : "results"} for "${debouncedQuery}"`
                : `Showing ${results.length} recent items`}
          </span>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 && !loadingIndex ? (
            <div className="px-4 py-8 text-center text-sm text-muted">
              No matching projects or posts found. Try another keyword or tag.
            </div>
          ) : (
            <ul role="listbox" aria-label="Search results" className="space-y-1">
              {results.map((hit, idx) => {
                const isSelected = idx === activeIndex;
                const Icon = hit.doc.type === "project" ? FolderGit2 : FileText;

                return (
                  <li
                    key={hit.doc.id}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <button
                      type="button"
                      onClick={() => navigateToResult(hit)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        isSelected
                          ? "bg-accent/10 text-ink"
                          : "text-ink hover:bg-surface-alt"
                      }`}
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-semibold">
                            {renderHighlightedText(hit.doc.title, hit.matches, "title")}
                          </p>
                          <Badge className="shrink-0 uppercase">{hit.doc.type}</Badge>
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                          {renderHighlightedText(hit.doc.summary, hit.matches, "summary")}
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {hit.doc.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[11px] text-muted"
                            >
                              {renderHighlightedText(tag, hit.matches, "tags")}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-surface-alt/50 px-4 py-2 text-[11px] text-muted">
          <span>↑↓ to navigate · Enter to open · Esc to close</span>
        </div>
      </div>
    </div>
  );
}
