"use client";

import { useMemo, useState } from "react";

import {
  DEFAULT_ACTIVE_FILTER_IDS,
  MOCK_TAGS,
} from "../data/mock-tags";
import type { InvestmentTag } from "../types";
import { cn } from "@/lib/utils";

import { ManageTagsButton } from "./manage-tags-button";
import { TagList } from "./tag-list";

type TagManagerProps = Readonly<{
  className?: string;
  variant?: "filters" | "manage" | "list";
  allTags?: InvestmentTag[];
  initialFilterIds?: string[];
}>;

export function TagManager({
  className = "",
  variant = "filters",
  allTags = MOCK_TAGS,
  initialFilterIds = DEFAULT_ACTIVE_FILTER_IDS,
}: TagManagerProps) {
  const [tags, setTags] = useState(allTags);
  const [activeFilterIds, setActiveFilterIds] = useState(initialFilterIds);

  const filterTags = useMemo(
    () => tags.filter((tag) => activeFilterIds.includes(tag.id)),
    [tags, activeFilterIds],
  );

  const handleRemoveFilter = (id: string) => {
    setActiveFilterIds((current) => current.filter((tagId) => tagId !== id));
  };

  const handleRemoveTag = (id: string) => {
    setTags((current) => current.filter((tag) => tag.id !== id));
    setActiveFilterIds((current) => current.filter((tagId) => tagId !== id));
  };

  const handleAddFilter = () => {
    const next = tags.find((tag) => !activeFilterIds.includes(tag.id));
    if (next) setActiveFilterIds((current) => [...current, next.id]);
  };

  const handleAddTag = () => {
    const id = `tag-${Date.now()}`;
    setTags((current) => [
      ...current,
      { id, name: "Nuevo tag", color: "default" },
    ]);
  };

  const handleManage = () => {
    // Modal de gestión — próximo paso
    console.info("[TagManager] Abrir gestión de tags");
  };

  if (variant === "manage") {
    return (
      <ManageTagsButton onClick={handleManage} className={className} />
    );
  }

  if (variant === "list") {
    return (
      <TagList
        tags={tags}
        onRemove={handleRemoveTag}
        onAddClick={handleAddTag}
        addLabel="Nuevo tag"
        className={className}
      />
    );
  }

  return (
    <TagList
      tags={filterTags}
      onRemove={handleRemoveFilter}
      onAddClick={handleAddFilter}
      addLabel="Agregar tag"
      className={cn("py-0.5", className)}
    />
  );
}
