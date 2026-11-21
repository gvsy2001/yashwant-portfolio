import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  displayLabel?: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
  className?: string;
}

export function Tag({
  label,
  displayLabel,
  active = false,
  count,
  onClick,
  className,
}: TagProps) {
  const text = displayLabel ?? label;

  const content = (
    <>
      <span>{text}</span>
      {typeof count === "number" && (
        <span className="ml-1.5 text-xs opacity-75">({count})</span>
      )}
    </>
  );

  const classes = cn(
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-150",
    active
      ? "border-accent bg-accent text-accent-foreground"
      : "border-border bg-surface text-muted hover:border-ink/40 hover:text-ink",
    className
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={classes}
      >
        {content}
      </button>
    );
  }

  return <span className={classes}>{content}</span>;
}