import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface-alt px-2.5 py-0.5 font-mono text-xs font-medium text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}
