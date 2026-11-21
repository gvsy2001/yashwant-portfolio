import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-section lg:py-section-lg">
      <div className="max-w-xl rounded-xl border border-border bg-surface p-8">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">404</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-muted">
          The page, project case study, or blog article you requested does not exist or may have moved.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/projects" variant="outline">
            Browse Projects
          </Button>
        </div>
      </div>
    </Container>
  );
}
