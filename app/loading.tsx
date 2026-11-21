import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container aria-busy="true" aria-live="polite" className="py-section lg:py-section-lg">
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-md bg-surface-alt" />
        <div className="h-4 w-96 max-w-full animate-pulse rounded-md bg-surface-alt" />
        <div className="grid gap-6 pt-4 md:grid-cols-2">
          <div className="h-48 animate-pulse rounded-xl border border-border bg-surface" />
          <div className="h-48 animate-pulse rounded-xl border border-border bg-surface" />
        </div>
      </div>
    </Container>
  );
}
