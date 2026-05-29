import { apiGet } from "@/lib/api/client";

import { buildInvestmentDetailQuery } from "../lib/investment-api-query";
import { parseInvestmentDetail } from "../lib/map-investment-detail";
import type { InvestmentDateRange, InvestmentDetail } from "../types";

export async function fetchInvestmentDetail(
  investmentId: string,
  dateRange?: InvestmentDateRange | null,
  signal?: AbortSignal,
): Promise<InvestmentDetail> {
  const query = buildInvestmentDetailQuery(dateRange);
  const path = `/v1/investments/${encodeURIComponent(investmentId)}${query}`;
  const data = await apiGet<unknown>(path, { signal });

  const detail = parseInvestmentDetail(data, investmentId);
  if (!detail) {
    throw new Error("No se pudo interpretar el detalle de la inversión.");
  }

  return detail;
}
