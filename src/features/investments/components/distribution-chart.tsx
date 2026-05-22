"use client";

import {
  MOCK_DISTRIBUTION,
  MOCK_DISTRIBUTION_UPDATED_AT,
  MOCK_PORTFOLIO_TOTAL,
} from "../data/mock-distribution";
import type { InvestmentDistribution } from "../types";
import { formatCurrency, formatCurrencyCompact, cn } from "@/lib/utils";

import { DistributionDonut } from "./distribution-donut";
import { DistributionLegend } from "./distribution-legend";

type DistributionChartProps = Readonly<{
  className?: string;
  data?: InvestmentDistribution[];
  total?: number;
  lastUpdated?: string;
}>;

export function DistributionChart({
  className = "",
  data = MOCK_DISTRIBUTION,
  total = MOCK_PORTFOLIO_TOTAL,
  lastUpdated = MOCK_DISTRIBUTION_UPDATED_AT,
}: DistributionChartProps) {
  return (
    <div
      className={cn("flex min-w-0 flex-col gap-4", className)}
      data-slot="distribution-chart"
      aria-label="Distribución de inversiones"
    >
      <div className="flex min-w-0 flex-col items-stretch gap-6 lg:gap-5 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
        <div className="flex shrink-0 justify-center xl:justify-start">
          <DistributionDonut
            data={data}
            totalLabel="Total"
            totalValue={formatCurrencyCompact(total)}
            title={formatCurrency(total)}
          />
        </div>

        <DistributionLegend
          items={data}
          className="min-w-0 w-full xl:w-auto xl:min-w-[168px] xl:max-w-[200px] xl:shrink-0"
        />
      </div>

      <p className="text-center text-xs text-zinc-400 xl:text-left">
        Última actualización: {lastUpdated}
      </p>
    </div>
  );
}
