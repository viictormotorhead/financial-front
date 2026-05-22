"use client";

import { DistributionChart } from "./distribution-chart";
import { InvestmentsPageLayout } from "./investments-page-layout";
import { TagManager } from "./tag-manager";

export function InvestmentsPage() {
  return (
    <InvestmentsPageLayout
      filters={<TagManager variant="filters" />}
      manageTagsAction={<TagManager variant="manage" />}
      distribution={<DistributionChart />}
      tags={<TagManager variant="list" />}
    />
  );
}
