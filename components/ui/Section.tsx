import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
  containerClassName,
}: SectionProps) {
  const headingId = `${id ?? "section"}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("py-section lg:py-section-lg", className)}
    >
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <div className="mb-8 max-w-2xl">
            {title && (
              <h2
                id={headingId}
                className="text-2xl font-bold tracking-tight text-ink sm:text-3xl"
              >
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-2 text-base text-muted">{subtitle}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
