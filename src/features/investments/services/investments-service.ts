import {
  MOCK_DISTRIBUTION,
  MOCK_PORTFOLIO_TOTAL,
} from "../data/mock-distribution";
import { MOCK_TAGS } from "../data/mock-tags";
import type { Investment, InvestmentDistribution, InvestmentTag } from "../types";

// Placeholder service — connect to API / Server Actions
export async function getInvestments(): Promise<Investment[]> {
  return [];
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
