import { Github, Linkedin, Mail} from "lucide-react";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getUTCFullYear();

  return (
    <footer className="border-t border-border bg-surface py-10">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-sm font-semibold text-ink">
            Gannavarapu Venkata Sai Yashwant
          </p>
          <p className="mt-1 text-xs text-muted">
            Software Engineer · Hyderabad, India · © {year} All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="https://github.com/gvsy2001"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-150 hover:text-ink"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/gannavarapu-venkata-sai-yashwant-b798581a9/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-150 hover:text-ink"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:gvsyashwant@gmail.com"
            aria-label="Send email to gvsyashwant@gmail.com"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-150 hover:text-ink"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>Email</span>
          </a>

        </div>
      </Container>
    </footer>
  );
}
