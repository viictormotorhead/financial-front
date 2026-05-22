import type { ReactNode } from "react";

import { LayoutCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  MOCK_DISTRIBUTION,
  MOCK_DISTRIBUTION_UPDATED_AT,
  MOCK_PORTFOLIO_TOTAL,
} from "../data/mock-distribution";
import { DistributionChart } from "./distribution-chart";
import { InvestmentGrowthList } from "./investment-growth-list";
import { TagManager } from "./tag-manager";

type InvestmentsPageLayoutProps = Readonly<{
  filters?: ReactNode;
  manageTagsAction?: ReactNode;
  growthRanking?: ReactNode;
  distribution?: ReactNode;
  tags?: ReactNode;
  /** Muchas categorías: la card de distribución ocupa todo el ancho */
  distributionDense?: boolean;
}>;

export function InvestmentsPageLayout({
  filters,
  manageTagsAction,
  growthRanking,
  distribution,
  tags,
  distributionDense = false,
}: InvestmentsPageLayoutProps) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <header className="mb-4 hidden lg:mb-6 lg:block">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Inversiones
          </h1>
        </header>

        <section className="mb-4 lg:mb-6" aria-label="Tag filters">
          <p className="mb-2 text-xs font-medium text-zinc-600 lg:mb-3 lg:uppercase lg:tracking-wide lg:text-zinc-500">
            Filtros por tags
          </p>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              {filters ?? <TagManager variant="filters" />}
            </div>
            <div className="hidden shrink-0 lg:block">
              {manageTagsAction ?? <TagManager variant="manage" />}
            </div>
          </div>
        </section>

        <div
          className={cn(
            "grid grid-cols-1 gap-4",
            distributionDense
              ? "lg:grid-cols-1"
              : "lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,1fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(480px,1fr)]",
          )}
        >
          <LayoutCard
            className="min-w-0"
            title="Crecimiento por inversión"
            subtitle="Ranking por % de valorización"
            contentClassName="px-4 py-2 sm:px-5 sm:py-3"
          >
            {growthRanking ?? <InvestmentGrowthList className="w-full" />}
          </LayoutCard>

          <LayoutCard
            title="Distribución de inversiones"
            subtitle="Porcentaje del valor total"
            className="min-w-0"
            contentClassName="overflow-hidden px-4 py-5 sm:px-5 lg:px-6"
          >
            {distribution ?? (
              <DistributionChart
                className="min-w-0 w-full"
                data={MOCK_DISTRIBUTION}
                total={MOCK_PORTFOLIO_TOTAL}
                lastUpdated={MOCK_DISTRIBUTION_UPDATED_AT}
              />
            )}
          </LayoutCard>
        </div>

        <section className="mt-4 hidden lg:block">
          <LayoutCard title="Mis tags">
            {tags ?? <TagManager variant="list" />}
          </LayoutCard>
        </section>
      </div>
    </main>
  );
}
