"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchInvestmentDetail } from "../services/investment-detail-service";
import type { InvestmentDateRange, InvestmentDetail } from "../types";

type UseInvestmentDetailResult = Readonly<{
  detail: InvestmentDetail | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}>;

export function useInvestmentDetail(
  investmentId: string,
  dateRange: InvestmentDateRange | null,
): UseInvestmentDetailResult {
  const [detail, setDetail] = useState<InvestmentDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const dateKey =
    dateRange === null ? "" : `${dateRange.from}\u0000${dateRange.to}`;

  const refetch = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!investmentId) return;

    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchInvestmentDetail(
          investmentId,
          dateRange,
          controller.signal,
        );
        setDetail(result);
      } catch (err) {
        if (controller.signal.aborted) return;
        const message =
          err instanceof Error
            ? err.message
            : "No se pudo cargar el detalle de la inversión";
        setError(message);
        setDetail(null);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void load();

    return () => controller.abort();
  }, [investmentId, dateKey, reloadKey]);

  return { detail, isLoading, error, refetch };
}
