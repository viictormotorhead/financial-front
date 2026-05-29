"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchTags } from "../services/tags-service";
import type { InvestmentTag } from "../types";

type UseTagsResult = Readonly<{
  tags: InvestmentTag[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}>;

export function useTags(): UseTagsResult {
  const [tags, setTags] = useState<InvestmentTag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchTags(controller.signal);
        setTags(result);
      } catch (err) {
        if (controller.signal.aborted) return;
        const message =
          err instanceof Error ? err.message : "No se pudieron cargar los tags";
        setError(message);
        setTags([]);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void load();

    return () => controller.abort();
  }, [reloadKey]);

  return { tags, isLoading, error, refetch };
}
