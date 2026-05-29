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
  /**
   * Segunda acción en la cabecera (ej. nueva inversión), alineada con
   * `titleAction` (ej. actualizar valor).
   */
  manageTagsAction?: ReactNode;
  titleAction?: ReactNode;
  growthRanking?: ReactNode;
  distribution?: ReactNode;
  tags?: ReactNode;
  /** Nombres de tags activos (para depuración / futura llamada al API) */
  activeFilterNames?: string[];
  /** Muchas categorías: la card de distribución ocupa todo el ancho */
  distributionDense?: boolean;
}>;

export function InvestmentsPageLayout({
  filters,
  manageTagsAction,
  titleAction,
  growthRanking,
  distribution,
  tags,
  activeFilterNames = [],
  distributionDense = false,
}: InvestmentsPageLayoutProps) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <header className="relative z-10 mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end lg:mb-6 lg:justify-between">
          <h1 className="hidden text-2xl font-semibold tracking-tight text-zinc-900 lg:block">
            Inversiones
          </h1>
          <div
            className="flex w-full flex-wrap items-stretch justify-end gap-2 sm:items-center lg:w-auto"
            aria-label="Acciones de cartera"
          >
            {titleAction}
            {manageTagsAction}
          </div>
        </header>

        <section className="mb-4 lg:mb-6" aria-label="Filtros de inversiones">
          <p className="mb-2 text-xs font-medium text-zinc-600 lg:mb-3 lg:uppercase lg:tracking-wide lg:text-zinc-500">
            Vista y filtros
          </p>
          <div className="flex flex-col gap-4">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                Tags
              </p>
              {filters ?? <TagManager variant="filters" />}
              {activeFilterNames.length > 0 ? (
                <p className="sr-only" aria-live="polite">
                  Filtros activos: {activeFilterNames.join(", ")}
                </p>
              ) : null}
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
            subtitle="Ranking por % de crecimiento"
            contentClassName="px-4 py-2 sm:px-5 sm:py-3"
          >
            {growthRanking ?? (
              <p className="py-6 text-sm text-zinc-500">Sin datos de inversiones.</p>
            )}
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
      </div>
    </main>
  );
}
