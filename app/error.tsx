"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-section lg:py-section-lg">
      <div className="max-w-xl rounded-xl border border-border bg-surface p-8">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          Application Error
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          Something went wrong while rendering this page.
        </h1>
        <p className="mt-3 text-sm text-muted">
          An unexpected error occurred. You can retry loading the view or return to the home page.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="outline">
            Go home
          </Button>
        </div>
      </div>
    </Container>
  );
}
