import type { ReactNode } from "react";

import { LayoutCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { DistributionChart } from "./distribution-chart";
import { InvestmentGrowthList } from "./investment-growth-list";
import { TagManager } from "./tag-manager";

type SlotProps = Readonly<{
  children?: ReactNode;
  className?: string;
}>;

function ContentSlot({ children, className = "" }: SlotProps) {
  return (
    <div
      className={cn(
        "min-h-[120px] rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50",
        className,
      )}
    >
      {children}
    </div>
  );
}

type InvestmentsPageLayoutProps = Readonly<{
  filters?: ReactNode;
  manageTagsAction?: ReactNode;
  growthRanking?: ReactNode;
  distribution?: ReactNode;
  tags?: ReactNode;
}>;

export function InvestmentsPageLayout({
  filters,
  manageTagsAction,
  growthRanking,
  distribution,
  tags,
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

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,1fr)] xl:grid-cols-[minmax(0,1.2fr)_minmax(480px,1fr)]">
          <LayoutCard
            className="min-w-0"
            title="Crecimiento por inversión"
            subtitle="Ranking por % de valorización"
            footer={
              <p
                className="text-center text-xs text-zinc-500"
                data-slot="view-all-link"
              />
            }
          >
            <ContentSlot className="border-0 bg-transparent">
              {growthRanking ?? (
                <InvestmentGrowthList className="h-full min-h-[200px] w-full" />
              )}
            </ContentSlot>
          </LayoutCard>

          <LayoutCard
            title="Distribución de inversiones"
            subtitle="Porcentaje del valor total"
            className="min-w-0"
            contentClassName="overflow-hidden px-4 py-5 sm:px-5 lg:px-6"
          >
            {distribution ?? <DistributionChart className="min-w-0 w-full" />}
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
