import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-border bg-surface p-6 shadow-sm transition-colors duration-150 hover:border-accent/50",
        className
      )}
    >
      {children}
    </article>
  );
}
