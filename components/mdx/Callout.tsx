import type { ReactNode } from "react";
import { AlertCircle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutTone = "info" | "tip" | "warning";

interface CalloutProps {
  title?: string;
  tone?: CalloutTone;
  children: ReactNode;
}

const TONE_STYLES: Record<
  CalloutTone,
  { container: string; icon: typeof Info; iconClass: string }
> = {
  info: {
    container: "border-accent/40 bg-accent/5 text-ink",
    icon: Info,
    iconClass: "text-accent",
  },
  tip: {
    container: "border-emerald-500/40 bg-emerald-500/5 text-ink",
    icon: Lightbulb,
    iconClass: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    container: "border-amber-500/40 bg-amber-500/5 text-ink",
    icon: AlertCircle,
    iconClass: "text-amber-600 dark:text-amber-400",
  },
};

export function Callout({ title, tone = "info", children }: CalloutProps) {
  const config = TONE_STYLES[tone];
  const Icon = config.icon;

  return (
    <aside
      aria-label={title ?? `${tone} note`}
      className={cn("not-prose my-6 rounded-lg border p-4", config.container)}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconClass)} aria-hidden="true" />
        <div className="min-w-0 flex-1 text-sm leading-relaxed">
          {title && <p className="mb-1 font-semibold text-ink">{title}</p>}
          <div className="text-muted">{children}</div>
        </div>
      </div>
    </aside>
  );
}
