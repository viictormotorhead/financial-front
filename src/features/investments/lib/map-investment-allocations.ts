import { colorForTagId } from "./tag-colors";
import { colorForDistributionIndex } from "./distribution-colors";
import { growthAmountFromPercent } from "./growth-math";
import type {
  InvestmentDistribution,
  InvestmentGrowthItem,
  InvestmentTag,
} from "../types";

export type ApiInvestmentAllocation = Readonly<{
  id?: number;
  investment: string;
  amount: number;
  percentage: number;
  percentageGrowing: number;
  tags: string[];
}>;

export function parseApiInvestmentAllocation(
  value: unknown,
): ApiInvestmentAllocation | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;

  if (typeof row.investment !== "string" || typeof row.amount !== "number") {
    return null;
  }

  const id = typeof row.id === "number" && Number.isFinite(row.id) ? row.id : undefined;

  if (typeof row.percentage !== "number") return null;

  if (!Array.isArray(row.tags) || !row.tags.every((tag) => typeof tag === "string")) {
    return null;
  }

  const rawGrowing = row["percentage-growing"] ?? row.percentageGrowing;
  const percentageGrowing =
    typeof rawGrowing === "number" && Number.isFinite(rawGrowing)
      ? rawGrowing
      : 0;

  return {
    id,
    investment: row.investment,
    amount: row.amount,
    percentage: row.percentage,
    percentageGrowing,
    tags: row.tags,
  };
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function tickerFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "—";
  if (parts.length === 1) {
    const word = parts[0];
    return word.length <= 6 ? word.toUpperCase() : word.slice(0, 5).toUpperCase();
  }
  return parts
    .slice(0, 3)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function resolveTagDisplay(
  tagNames: string[],
  catalogTags: readonly InvestmentTag[],
): Pick<InvestmentGrowthItem, "tagName" | "tagColor"> {
  const primary = tagNames[0]?.trim();
  if (!primary) {
    return { tagName: "Sin tag", tagColor: "default" };
  }

  const fromCatalog = catalogTags.find(
    (tag) => tag.name.toLowerCase() === primary.toLowerCase(),
  );

  if (fromCatalog) {
    return {
      tagName: fromCatalog.name,
      tagColor: fromCatalog.color,
    };
  }

  return {
    tagName: primary,
    tagColor: colorForTagId(primary),
  };
}

function growthTrend(growthPercent: number): readonly number[] {
  const value = Math.max(Math.abs(growthPercent), 0.1);
  return Array.from({ length: 10 }, () => value);
}

export function mapAllocationsToGrowthItems(
  allocations: readonly ApiInvestmentAllocation[],
  catalogTags: readonly InvestmentTag[] = [],
): InvestmentGrowthItem[] {
  const sorted = [...allocations].sort(
    (a, b) => b.percentageGrowing - a.percentageGrowing,
  );

  return sorted.map((item, index) => {
    const tagDisplay = resolveTagDisplay(item.tags ?? [], catalogTags);

    return {
      id:
        item.id !== undefined
          ? String(item.id)
          : slugify(item.investment) || `investment-${index}`,
      rank: index + 1,
      name: item.investment,
      ticker: tickerFromName(item.investment),
      tagName: tagDisplay.tagName,
      tagColor: tagDisplay.tagColor,
      growthPercent: item.percentageGrowing,
      growthAmount: growthAmountFromPercent(
        item.amount,
        item.percentageGrowing,
      ),
      currentValue: item.amount,
      trend: growthTrend(item.percentageGrowing),
    };
  });
}

export function mapAllocationsToDistribution(
  allocations: readonly ApiInvestmentAllocation[],
): InvestmentDistribution[] {
  return allocations.map((item, index) => ({
    label: item.investment,
    percentage: item.percentage,
    color: colorForDistributionIndex(index),
  }));
}

export function sumAllocationAmounts(
  allocations: readonly ApiInvestmentAllocation[],
): number {
  return allocations.reduce((total, item) => total + item.amount, 0);
}

export function formatInvestmentsUpdatedAt(date = new Date()): string {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
