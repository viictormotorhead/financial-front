import type { ReactNode } from "react";

import { LayoutCard } from "./layout-card";

type SlotProps = Readonly<{
  children?: ReactNode;
}>;

function ContentSlot({
  children,
  className = "",
}: SlotProps & Readonly<{ className?: string }>) {
  return (
    <div
      className={`min-h-[120px] rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50 ${className}`}
    >
      {children}
    </div>
  );
}

type InversionesPageLayoutProps = Readonly<{
  filters?: ReactNode;
  manageTagsAction?: ReactNode;
  growthRanking?: ReactNode;
  distribution?: ReactNode;
  tags?: ReactNode;
}>;

export function InversionesPageLayout({
  filters,
  manageTagsAction,
  growthRanking,
  distribution,
  tags,
}: InversionesPageLayoutProps) {
  return (
    <main className="flex-1 overflow-auto">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <header className="mb-4 hidden lg:mb-6 lg:block">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Inversiones
          </h1>
        </header>

        <section className="mb-4 lg:mb-6" aria-label="Filtros por tags">
          <p className="mb-2 text-xs font-medium text-zinc-600 lg:mb-3 lg:uppercase lg:tracking-wide lg:text-zinc-500">
            Filtros por tags
          </p>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <ContentSlot className="min-h-[44px] flex-1 lg:min-h-[120px]">
              {filters}
            </ContentSlot>
            <div className="hidden shrink-0 lg:block">
              {manageTagsAction ?? (
                <div
                  className="h-9 min-w-[140px] rounded-lg border border-dashed border-zinc-200 bg-zinc-50/50"
                  data-slot="manage-tags-action"
                />
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <LayoutCard
            title="Crecimiento por inversión"
            subtitle="Ranking por % de valorización"
            footer={
              <p className="text-center text-xs text-zinc-500" data-slot="view-all-link" />
            }
          >
            <ContentSlot>{growthRanking}</ContentSlot>
          </LayoutCard>

          <LayoutCard
            title="Distribución de inversiones"
            subtitle="Porcentaje del valor total"
            footer={
              <p className="text-xs text-zinc-400" data-slot="last-updated" />
            }
          >
            <ContentSlot>{distribution}</ContentSlot>
          </LayoutCard>
        </div>

        <section className="mt-4 hidden lg:block">
          <LayoutCard title="Mis tags">
            <ContentSlot>{tags}</ContentSlot>
          </LayoutCard>
        </section>
      </div>
    </main>
  );
}
