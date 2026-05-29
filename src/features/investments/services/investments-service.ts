import { apiGet, apiPost } from "@/lib/api/client";
import { toApiCurrencyInteger } from "@/lib/currency";

import { buildInvestmentsListQuery } from "../lib/investment-api-query";
import {
  mapAllocationsToDistribution,
  mapAllocationsToGrowthItems,
  parseApiInvestmentAllocation,
  sumAllocationAmounts,
  type ApiInvestmentAllocation,
} from "../lib/map-investment-allocations";
import type {
  CreateInvestmentPayload,
  InvestmentDateRange,
  InvestmentDistribution,
  InvestmentGrowthItem,
  InvestmentListItem,
  InvestmentTag,
  ManualInvestmentUpdate,
} from "../types";

export type InvestmentsSnapshot = Readonly<{
  growthItems: InvestmentGrowthItem[];
  distribution: InvestmentDistribution[];
  portfolioTotal: number;
}>;

function normalizeAllocationsPayload(data: unknown): ApiInvestmentAllocation[] {
  if (Array.isArray(data)) {
    return data
      .map(parseApiInvestmentAllocation)
      .filter((row): row is ApiInvestmentAllocation => row !== null);
  }

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    const investments = record.investments;
    if (Array.isArray(investments)) {
      return investments
        .map(parseApiInvestmentAllocation)
        .filter((row): row is ApiInvestmentAllocation => row !== null);
    }
  }

  return [];
}

export async function fetchInvestmentsAllocations(
  tagNames: readonly string[] = [],
  signal?: AbortSignal,
  dateRange?: InvestmentDateRange | null,
): Promise<ApiInvestmentAllocation[]> {
  const query = buildInvestmentsListQuery({ tagNames, dateRange });
  const data = await apiGet<unknown>(`/v1/investments/${query}`, { signal });
  return normalizeAllocationsPayload(data);
}

export async function fetchInvestmentListItems(
  signal?: AbortSignal,
): Promise<InvestmentListItem[]> {
  const allocations = await fetchInvestmentsAllocations([], signal);

  return allocations
    .filter((row) => row.id !== undefined)
    .map((row) => ({
      id: row.id as number,
      name: row.investment,
      amount: row.amount,
    }));
}

export async function fetchInvestmentsSnapshot(
  tagNames: readonly string[] = [],
  catalogTags: readonly InvestmentTag[] = [],
  signal?: AbortSignal,
  dateRange?: InvestmentDateRange | null,
): Promise<InvestmentsSnapshot> {
  const allocations = await fetchInvestmentsAllocations(
    tagNames,
    signal,
    dateRange,
  );

  return {
    growthItems: mapAllocationsToGrowthItems(allocations, catalogTags),
    distribution: mapAllocationsToDistribution(allocations),
    portfolioTotal: sumAllocationAmounts(allocations),
  };
}

export async function createInvestment(
  payload: CreateInvestmentPayload,
): Promise<void> {
  await apiPost("/v1/investments/", {
    name: payload.name,
    balance: toApiCurrencyInteger(payload.balance),
    tags: payload.tags,
  });
}

export async function submitManualInvestmentUpdate(
  payload: ManualInvestmentUpdate,
): Promise<void> {
  const investmentId = payload.investmentId;

  switch (payload.movementType) {
    case "value_update":
      await apiPost(`/v1/investments/${investmentId}/valuations`, {
        current_value: toApiCurrencyInteger(payload.amount),
      });
      return;
    case "deposit":
      await apiPost(`/v1/investments/${investmentId}/movements`, {
        type: "deposit",
        amount: toApiCurrencyInteger(payload.amount),
      });
      return;
    case "withdrawal":
      await apiPost(`/v1/investments/${investmentId}/movements`, {
        type: "withdrawal",
        amount: toApiCurrencyInteger(payload.amount),
      });
      return;
  }
}
