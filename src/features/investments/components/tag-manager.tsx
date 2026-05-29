"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { useInvestmentTags } from "../context/investment-tags-context";
import type { InvestmentTag } from "../types";

import { TagList } from "./tag-list";
import { TagPickerModal } from "./tag-picker-modal";

type TagManagerProps = Readonly<{
  className?: string;
  variant?: "filters" | "list";
  /** Override API tags (e.g. Storybook/tests) */
  allTags?: InvestmentTag[];
}>;

function TagFiltersSkeleton({ className }: Readonly<{ className?: string }>) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} aria-hidden>
      {[1, 2, 3].map((key) => (
        <span
          key={key}
          className="h-7 w-20 animate-pulse rounded-full bg-zinc-100"
        />
      ))}
    </div>
  );
}

export function TagManager({
  className = "",
  variant = "filters",
  allTags: allTagsOverride,
}: TagManagerProps) {
  const {
    tags: apiTags,
    isLoading,
    error,
    refetch,
    activeFilterTags,
    activeFilterNames,
    addFilters,
    removeFilter,
    availableTagsForPicker,
  } = useInvestmentTags();

  const allTags = allTagsOverride ?? apiTags;
  const [pickerOpen, setPickerOpen] = useState(false);

  if (isLoading && !allTagsOverride) {
    return <TagFiltersSkeleton className={className} />;
  }

  if (error && !allTagsOverride) {
    return (
      <div className={cn("space-y-2", className)}>
        <p className="text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={refetch}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <section id="investment-tags-catalog" className={className}>
        <TagList tags={allTags} />
        {allTags.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500">
            No hay tags en el catálogo.
          </p>
        ) : null}
      </section>
    );
  }

  return (
    <>
      <TagList
        tags={activeFilterTags}
        onRemove={removeFilter}
        onAddClick={
          availableTagsForPicker.length > 0
            ? () => setPickerOpen(true)
            : undefined
        }
        addLabel="Agregar filtros"
        className={cn("py-0.5", className)}
      />
      {activeFilterTags.length === 0 ? (
        <p className="mt-2 text-xs text-zinc-500">
          Sin filtros activos. Agrega uno para acotar inversiones por tag.
        </p>
      ) : (
        <p className="mt-2 text-xs text-zinc-500">
          Filtrando por:{" "}
          <span className="font-medium text-zinc-700">
            {activeFilterNames.join(", ")}
          </span>
        </p>
      )}
      <TagPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        tags={availableTagsForPicker}
        onConfirm={(selected) =>
          addFilters(selected.map((tag) => tag.id))
        }
      />
    </>
  );
}
