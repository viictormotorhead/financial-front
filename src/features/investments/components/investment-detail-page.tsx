"use client";

import Link from "next/link";

import { LayoutCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, formatCurrencyDelta, formatPercent } from "@/lib/utils";
import { colorForTagId } from "../lib/tag-colors";
import { useInvestmentDateRange } from "../hooks/use-investment-date-range";
import { useInvestmentDetail } from "../hooks/use-investment-detail";

import { InvestmentDateRangeFilter } from "./investment-date-range-filter";
import { InvestmentMovementsTable } from "./investment-movements-table";
import { InvestmentValueLineChart } from "./investment-value-line-chart";

type InvestmentDetailPageProps = Readonly<{
  investmentId: string;
}>;

function BackIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function DetailLoading() {
  return (
    <div
      className="flex min-h-[16rem] items-center justify-center"
      aria-busy="true"
      aria-label="Cargando detalle"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-blue-600" />
    </div>
  );
}

export function InvestmentDetailPage({ investmentId }: InvestmentDetailPageProps) {
  const { dateRange, setDateRange, clearDateRange } = useInvestmentDateRange();
  const { detail, isLoading, error, refetch } = useInvestmentDetail(
    investmentId,
    dateRange,
  );

  const growthPositive = (detail?.growthPercent ?? 0) >= 0;
  const growthTone = growthPositive ? "text-emerald-600" : "text-red-600";
  const primaryTag = detail?.tags[0];

  return (
    <main className="flex-1 overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <header className="mb-4 lg:mb-6">
          <Link
            href="/investments"
            className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <BackIcon />
            Inversiones
          </Link>

          {isLoading && !detail ? (
            <div className="h-8 w-48 animate-pulse rounded-lg bg-zinc-100" />
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-semibold tracking-tight text-zinc-900">
                  {detail?.name ?? "Inversión"}
                </h1>
                {primaryTag ? (
                  <Badge
                    variant={colorForTagId(primaryTag)}
                    className="mt-2"
                  >
                    {primaryTag}
                  </Badge>
                ) : null}
              </div>
            </div>
          )}
        </header>

        <section className="mb-4 lg:mb-6" aria-label="Filtro de fechas">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
            Rango de fechas
          </p>
          <InvestmentDateRangeFilter
            dateRange={dateRange}
            onChange={setDateRange}
            onClear={clearDateRange}
          />
        </section>

        {isLoading ? (
          <DetailLoading />
        ) : error ? (
          <div className="space-y-2 py-8 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Reintentar
            </button>
          </div>
        ) : detail ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="rounded-xl border border-zinc-200/80 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Valor actual
                </p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-900">
                  {formatCurrency(detail.currentValue)}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Crecimiento %
                </p>
                <p className={cn("mt-1 text-lg font-semibold tabular-nums", growthTone)}>
                  {formatPercent(detail.growthPercent)}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Crecimiento $
                </p>
                <p className={cn("mt-1 text-lg font-semibold tabular-nums", growthTone)}>
                  {formatCurrencyDelta(detail.growthAmount)}
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200/80 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Movimientos
                </p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-900">
                  {detail.movements.length}
                </p>
              </div>
            </div>

            <LayoutCard
              title="Evolución del valor"
              subtitle="Eje X: tiempo · Eje Y: valor de la inversión"
              contentClassName="px-2 py-4 sm:px-4"
            >
              <InvestmentValueLineChart
                series={detail.series}
                currentValue={detail.currentValue}
                positive={growthPositive}
              />
            </LayoutCard>

            <LayoutCard
              title="Movimientos"
              subtitle="Historial en el periodo seleccionado"
            >
              <InvestmentMovementsTable movements={detail.movements} />
            </LayoutCard>
          </div>
        ) : null}
      </div>
    </main>
  );
}
