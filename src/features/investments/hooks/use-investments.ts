"use client";

import { useCallback, useEffect, useState } from "react";

import { useInvestmentTags } from "../context/investment-tags-context";
import { formatInvestmentsUpdatedAt } from "../lib/map-investment-allocations";
import { fetchInvestmentsSnapshot } from "../services/investments-service";
import type {
  InvestmentDistribution,
  InvestmentGrowthItem,
} from "../types";

type UseInvestmentsResult = Readonly<{
  growthItems: InvestmentGrowthItem[];
  distribution: InvestmentDistribution[];
  portfolioTotal: number;
  lastUpdated: string;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}>;

export function useInvestments(
  tagNames: readonly string[],
): UseInvestmentsResult {
  const { tags: catalogTags } = useInvestmentTags();
  const [growthItems, setGrowthItems] = useState<InvestmentGrowthItem[]>([]);
  const [distribution, setDistribution] = useState<InvestmentDistribution[]>(
    [],
  );
  const [portfolioTotal, setPortfolioTotal] = useState(0);
  const [lastUpdated, setLastUpdated] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const tagKey = tagNames.join("\u0000");
  const refetch = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const snapshot = await fetchInvestmentsSnapshot(
          tagNames,
          catalogTags,
          controller.signal,
        );
        setGrowthItems(snapshot.growthItems);
        setDistribution(snapshot.distribution);
        setPortfolioTotal(snapshot.portfolioTotal);
        setLastUpdated(formatInvestmentsUpdatedAt());
      } catch (err) {
        if (controller.signal.aborted) return;
        const message =
          err instanceof Error
            ? err.message
            : "No se pudieron cargar las inversiones";
        setError(message);
        setGrowthItems([]);
        setDistribution([]);
        setPortfolioTotal(0);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void load();

    return () => controller.abort();
  }, [tagKey, catalogTags, reloadKey]);

  return {
    growthItems,
    distribution,
    portfolioTotal,
    lastUpdated,
    isLoading,
    error,
    refetch,
  };
}
