"use client";

import {
  isDenseDistribution,
  MOCK_DISTRIBUTION_UPDATED_AT,
  MOCK_PORTFOLIO_TOTAL,
} from "../data/mock-distribution";
import type { InvestmentDistribution } from "../types";
import { formatCurrency, formatCurrencyCompact, cn } from "@/lib/utils";

import { DistributionDonut } from "./distribution-donut";
import { DistributionLegend } from "./distribution-legend";

type DistributionChartProps = Readonly<{
  className?: string;
  data: InvestmentDistribution[];
  total?: number;
  lastUpdated?: string;
}>;

export function DistributionChart({
  className = "",
  data,
  total = MOCK_PORTFOLIO_TOTAL,
  lastUpdated = MOCK_DISTRIBUTION_UPDATED_AT,
}: DistributionChartProps) {
  const dense = isDenseDistribution(data.length);

  return (
    <div
      className={cn("flex min-w-0 flex-col gap-4", className)}
      data-slot="distribution-chart"
      aria-label="Distribución de inversiones"
    >
      <div
        className={cn(
          "flex min-w-0 flex-col items-stretch gap-5",
          !dense && "lg:gap-5 xl:flex-row xl:items-start xl:justify-between xl:gap-6",
          dense &&
            "sm:flex-row sm:items-start sm:justify-center sm:gap-8 lg:justify-between",
        )}
      >
        <div
          className={cn(
            "flex shrink-0 justify-center",
            !dense && "xl:justify-start",
          )}
        >
          <DistributionDonut
            data={data}
            totalLabel="Total"
            totalValue={formatCurrencyCompact(total)}
            title={formatCurrency(total)}
            dense={dense}
          />
        </div>

        <div className={cn("min-w-0 flex-1", dense && "w-full sm:max-w-md")}>
          {dense ? (
            <p className="mb-2 text-xs font-medium text-zinc-500">
              {data.length} categorías
            </p>
          ) : null}
          <DistributionLegend
            items={data}
            compact={dense}
            maxHeight={dense}
            className={cn(
              "w-full",
              !dense && "xl:min-w-[168px] xl:max-w-[200px] xl:shrink-0",
            )}
          />
        </div>
      </div>

      <p className="text-center text-xs text-zinc-400 xl:text-left">
        Última actualización: {lastUpdated}
        {dense ? (
          <span className="block text-zinc-400 sm:mt-1 sm:inline">
            {" "}
            · En la dona, los segmentos menores al 3% son difíciles de distinguir
          </span>
        ) : null}
      </p>
    </div>
  );
}
