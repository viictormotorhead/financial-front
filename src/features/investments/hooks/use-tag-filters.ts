"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import type { InvestmentTag } from "../types";

const STORAGE_KEY = "financial-app:investment-tag-filter-ids";

function readStoredFilterIds(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function writeStoredFilterIds(ids: string[]) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

type UseTagFiltersOptions = Readonly<{
  allTags: InvestmentTag[];
}>;

type UseTagFiltersResult = Readonly<{
  activeFilterIds: string[];
  activeFilterTags: InvestmentTag[];
  activeFilterNames: string[];
  addFilter: (tagId: string) => void;
  addFilters: (tagIds: string[]) => void;
  removeFilter: (tagId: string) => void;
  availableTagsForPicker: InvestmentTag[];
}>;

export function useTagFilters({
  allTags,
}: UseTagFiltersOptions): UseTagFiltersResult {
  const [activeFilterIds, setActiveFilterIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setActiveFilterIds(readStoredFilterIds());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStoredFilterIds(activeFilterIds);
  }, [activeFilterIds, hydrated]);

  const validIds = useMemo(
    () => new Set(allTags.map((tag) => tag.id)),
    [allTags],
  );

  const normalizedActiveIds = useMemo(
    () => activeFilterIds.filter((id) => validIds.has(id)),
    [activeFilterIds, validIds],
  );

  const activeFilterTags = useMemo(
    () =>
      normalizedActiveIds
        .map((id) => allTags.find((tag) => tag.id === id))
        .filter((tag): tag is InvestmentTag => Boolean(tag)),
    [allTags, normalizedActiveIds],
  );

  const activeFilterNames = useMemo(
    () => activeFilterTags.map((tag) => tag.name),
    [activeFilterTags],
  );

  const availableTagsForPicker = useMemo(
    () => allTags.filter((tag) => !normalizedActiveIds.includes(tag.id)),
    [allTags, normalizedActiveIds],
  );

  const addFilter = useCallback((tagId: string) => {
    setActiveFilterIds((current) =>
      current.includes(tagId) ? current : [...current, tagId],
    );
  }, []);

  const addFilters = useCallback((tagIds: string[]) => {
    if (tagIds.length === 0) return;
    setActiveFilterIds((current) => {
      const next = [...current];
      for (const tagId of tagIds) {
        if (!next.includes(tagId)) next.push(tagId);
      }
      return next;
    });
  }, []);

  const removeFilter = useCallback((tagId: string) => {
    setActiveFilterIds((current) => current.filter((id) => id !== tagId));
  }, []);

  return {
    activeFilterIds: normalizedActiveIds,
    activeFilterTags,
    activeFilterNames,
    addFilter,
    addFilters,
    removeFilter,
    availableTagsForPicker,
  };
}
