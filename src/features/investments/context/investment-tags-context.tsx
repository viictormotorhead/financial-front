"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

import { useTagFilters } from "../hooks/use-tag-filters";
import { useTags } from "../hooks/use-tags";
import type { InvestmentTag } from "../types";

type InvestmentTagsContextValue = Readonly<{
  tags: InvestmentTag[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  activeFilterTags: InvestmentTag[];
  activeFilterNames: string[];
  addFilter: (tagId: string) => void;
  addFilters: (tagIds: string[]) => void;
  removeFilter: (tagId: string) => void;
  availableTagsForPicker: InvestmentTag[];
}>;

const InvestmentTagsContext =
  createContext<InvestmentTagsContextValue | null>(null);

export function InvestmentTagsProvider({
  children,
  onActiveFilterNamesChange,
}: Readonly<{
  children: ReactNode;
  onActiveFilterNamesChange?: (names: string[]) => void;
}>) {
  const { tags, isLoading, error, refetch } = useTags();
  const filterState = useTagFilters({ allTags: tags });

  useEffect(() => {
    onActiveFilterNamesChange?.(filterState.activeFilterNames);
  }, [filterState.activeFilterNames, onActiveFilterNamesChange]);

  const value: InvestmentTagsContextValue = {
    tags,
    isLoading,
    error,
    refetch,
    activeFilterTags: filterState.activeFilterTags,
    activeFilterNames: filterState.activeFilterNames,
    addFilter: filterState.addFilter,
    addFilters: filterState.addFilters,
    removeFilter: filterState.removeFilter,
    availableTagsForPicker: filterState.availableTagsForPicker,
  };

  return (
    <InvestmentTagsContext.Provider value={value}>
      {children}
    </InvestmentTagsContext.Provider>
  );
}

export function useInvestmentTags(): InvestmentTagsContextValue {
  const context = useContext(InvestmentTagsContext);
  if (!context) {
    throw new Error(
      "useInvestmentTags must be used within InvestmentTagsProvider",
    );
  }
  return context;
}
