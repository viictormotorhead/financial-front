export type InvestmentTag = Readonly<{
  id: string;
  name: string;
  color?: "blue" | "green" | "purple" | "yellow" | "default";
}>;

export type Investment = Readonly<{
  id: string;
  name: string;
  ticker: string;
  tagIds: string[];
  valuationPercent: number;
  currentValue: number;
}>;

export type InvestmentDistribution = Readonly<{
  label: string;
  percentage: number;
  color: string;
}>;
