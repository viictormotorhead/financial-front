import type { InvestmentTag } from "../types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type TagChipProps = Readonly<{
  tag: InvestmentTag;
  onRemove?: (id: string) => void;
  className?: string;
}>;

function CloseIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function TagChip({ tag, onRemove, className }: TagChipProps) {
  const title = tag.description
    ? `${tag.name} · ${tag.description} (id ${tag.id})`
    : `${tag.name} (id ${tag.id})`;

  return (
    <Badge
      variant={tag.color ?? "default"}
      className={cn("gap-1 pr-1.5", className)}
      title={title}
    >
      <span>{tag.name}</span>
      {onRemove ? (
        <button
          type="button"
          onClick={() => onRemove(tag.id)}
          className="rounded-full p-0.5 opacity-70 transition-opacity hover:bg-black/5 hover:opacity-100"
          aria-label={`Quitar tag ${tag.name}`}
        >
          <CloseIcon />
        </button>
      ) : null}
    </Badge>
  );
}
