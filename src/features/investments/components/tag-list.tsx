"use client";

import type { InvestmentTag } from "../types";
import { cn } from "@/lib/utils";

import { TagChip } from "./tag-chip";

type TagListProps = Readonly<{
  tags: InvestmentTag[];
  onRemove?: (id: string) => void;
  onAddClick?: () => void;
  addLabel?: string;
  className?: string;
}>;

function PlusIcon({ className }: Readonly<{ className?: string }>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export function TagList({
  tags,
  onRemove,
  onAddClick,
  addLabel = "Agregar tag",
  className,
}: TagListProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        className,
      )}
    >
      {tags.map((tag) => (
        <TagChip key={tag.id} tag={tag} onRemove={onRemove} />
      ))}
      {onAddClick ? (
        <button
          type="button"
          onClick={onAddClick}
          className="inline-flex items-center gap-1 rounded-full border border-dashed border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-900"
        >
          <PlusIcon />
          {addLabel}
        </button>
      ) : null}
    </div>
  );
}
