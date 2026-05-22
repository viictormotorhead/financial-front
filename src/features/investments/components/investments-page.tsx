"use client";

import {
  MOCK_DISTRIBUTION_FIFTEEN,
  MOCK_DISTRIBUTION_UPDATED_AT,
  MOCK_PORTFOLIO_TOTAL,
} from "../data/mock-distribution";
import { DistributionChart } from "./distribution-chart";
import { InvestmentGrowthList } from "./investment-growth-list";
import { InvestmentsPageLayout } from "./investments-page-layout";
import { TagManager } from "./tag-manager";

export function InvestmentsPage() {
  return (
    <InvestmentsPageLayout
      distributionDense
      filters={<TagManager variant="filters" />}
      manageTagsAction={<TagManager variant="manage" />}
      growthRanking={<InvestmentGrowthList />}
      distribution={
        <DistributionChart
          data={MOCK_DISTRIBUTION_FIFTEEN}
          total={MOCK_PORTFOLIO_TOTAL}
          lastUpdated={MOCK_DISTRIBUTION_UPDATED_AT}
        />
      }
      tags={<TagManager variant="list" />}
    />
  );
}
