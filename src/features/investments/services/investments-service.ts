import {
  MOCK_DISTRIBUTION,
  MOCK_DISTRIBUTION_FIFTEEN,
  MOCK_PORTFOLIO_TOTAL,
} from "../data/mock-distribution";

export { MOCK_DISTRIBUTION_FIFTEEN };
import { MOCK_GROWTH_RANKING } from "../data/mock-investments";
import { MOCK_TAGS } from "../data/mock-tags";
import type {
  Investment,
  InvestmentDistribution,
  InvestmentGrowthItem,
  InvestmentTag,
} from "../types";

// Placeholder service — connect to API / Server Actions
export async function getInvestments(): Promise<Investment[]> {
  return MOCK_GROWTH_RANKING.map(
    ({ id, name, ticker, valuationPercent, currentValue }) => ({
      id,
      name,
      ticker,
      tagIds: [],
      valuationPercent,
      currentValue,
    }),
  );
}

export async function getGrowthRanking(): Promise<InvestmentGrowthItem[]> {
  return MOCK_GROWTH_RANKING;
}

export async function getInvestmentTags(): Promise<InvestmentTag[]> {
  return MOCK_TAGS;
}

export async function getInvestmentDistribution(): Promise<
  InvestmentDistribution[]
> {
  return MOCK_DISTRIBUTION;
}

export async function getPortfolioTotal(): Promise<number> {
  return MOCK_PORTFOLIO_TOTAL;
}
