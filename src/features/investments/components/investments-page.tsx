"use client";

import { useMemo } from "react";

import { useInvestmentTags } from "../context/investment-tags-context";
import { useInvestments } from "../hooks/use-investments";
import { isDenseDistribution } from "../data/mock-distribution";

import { DistributionChart } from "./distribution-chart";
import { InvestmentGrowthList } from "./investment-growth-list";
import { CreateInvestmentTrigger } from "./create-investment-trigger";
import { InvestmentUpdateTriggerButton } from "./investment-update-trigger-button";
import { InvestmentsPageLayout } from "./investments-page-layout";
import { TagManager } from "./tag-manager";

function CardLoadingState({ label }: Readonly<{ label: string }>) {
  return (
    <div
      className="flex min-h-[12rem] items-center justify-center"
      aria-busy="true"
      aria-label={label}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-blue-600" />
    </div>
  );
}

function CardErrorState({
  message,
  onRetry,
}: Readonly<{
  message: string;
  onRetry: () => void;
}>) {
  return (
    <div className="space-y-2 py-6 text-center">
      <p className="text-sm text-red-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Reintentar
      </button>
    </div>
  );
}

export function InvestmentsPage() {
  const { activeFilterNames } = useInvestmentTags();
  const {
    growthItems,
    distribution,
    portfolioTotal,
    lastUpdated,
    isLoading,
    error,
    refetch,
  } = useInvestments(activeFilterNames);

  const tagFilterKey = activeFilterNames.join("\u0000");

  const emptyMessage = useMemo(() => {
    if (activeFilterNames.length > 0) {
      return "No hay inversiones para los tags seleccionados.";
    }
    return "No hay inversiones registradas.";
  }, [tagFilterKey, activeFilterNames.length]);

  const hasData = growthItems.length > 0;

  let growthRanking = (
    <InvestmentGrowthList items={growthItems} showViewAll={false} />
  );

  if (isLoading) {
    growthRanking = <CardLoadingState label="Cargando inversiones" />;
  } else if (error) {
    growthRanking = <CardErrorState message={error} onRetry={refetch} />;
  } else if (!hasData) {
    growthRanking = <p className="py-6 text-sm text-zinc-500">{emptyMessage}</p>;
  }

  let distributionChart = (
    <DistributionChart
      data={distribution}
      total={portfolioTotal}
      lastUpdated={lastUpdated}
    />
  );

  if (isLoading) {
    distributionChart = <CardLoadingState label="Cargando distribución" />;
  } else if (error) {
    distributionChart = <CardErrorState message={error} onRetry={refetch} />;
  } else if (!hasData) {
    distributionChart = (
      <p className="py-6 text-sm text-zinc-500">{emptyMessage}</p>
    );
  }

  return (
    <InvestmentsPageLayout
      distributionDense={isDenseDistribution(distribution.length)}
      titleAction={<InvestmentUpdateTriggerButton />}
      filters={<TagManager variant="filters" />}
      manageTagsAction={<CreateInvestmentTrigger onCreated={refetch} />}
      growthRanking={growthRanking}
      distribution={distributionChart}
      tags={<TagManager variant="list" />}
      activeFilterNames={activeFilterNames}
    />
  );
}
