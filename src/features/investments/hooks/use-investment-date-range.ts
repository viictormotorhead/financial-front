"use client";

import { useCallback, useEffect, useState } from "react";

import type { InvestmentDateRange } from "../types";

const STORAGE_KEY = "financial-app:investment-date-range";
const LEGACY_STORAGE_KEY = "financial-app:investment-as-of-date";

const YMD = /^\d{4}-\d{2}-\d{2}$/;

function parseStoredRange(raw: string | null): InvestmentDateRange | null {
  if (!raw) return null;
  try {
    if (YMD.test(raw)) {
      return { from: raw, to: raw };
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as Record<string, unknown>;
    const from = record.from;
    const to = record.to;
    if (typeof from === "string" && typeof to === "string" && YMD.test(from) && YMD.test(to)) {
      return { from, to };
    }
    return null;
  } catch {
    return null;
  }
}

function readStoredRange(): InvestmentDateRange | null {
  if (typeof window === "undefined") return null;
  const primary = window.sessionStorage.getItem(STORAGE_KEY);
  const parsed = parseStoredRange(primary);
  if (parsed) return parsed;
  const legacy = window.sessionStorage.getItem(LEGACY_STORAGE_KEY);
  return parseStoredRange(legacy);
}

function writeStoredRange(value: InvestmentDateRange | null) {
  if (typeof window === "undefined") return;
  if (value === null) {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return;
  }
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

type UseInvestmentDateRangeResult = Readonly<{
  dateRange: InvestmentDateRange | null;
  setDateRange: (value: InvestmentDateRange | null) => void;
  clearDateRange: () => void;
}>;

export function useInvestmentDateRange(): UseInvestmentDateRangeResult {
  const [dateRange, setDateRangeState] = useState<InvestmentDateRange | null>(
    null,
  );

  useEffect(() => {
    setDateRangeState(readStoredRange());
  }, []);

  const setDateRange = useCallback((value: InvestmentDateRange | null) => {
    setDateRangeState(value);
    writeStoredRange(value);
  }, []);

  const clearDateRange = useCallback(() => {
    setDateRangeState(null);
    writeStoredRange(null);
  }, []);

  return { dateRange, setDateRange, clearDateRange };
}
