export type InvestmentTag = Readonly<{
  id: string;
  name: string;
  description?: string;
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

export type ManualInvestmentMovementType =
  | "value_update"
  | "deposit"
  | "withdrawal";

export type ManualInvestmentMovementTypeOption = Readonly<{
  value: ManualInvestmentMovementType;
  label: string;
}>;

export type InvestmentListItem = Readonly<{
  id: number;
  name: string;
  amount: number;
}>;

export type ManualInvestmentUpdate = Readonly<{
  investmentId: string;
  investmentName: string;
  movementType: ManualInvestmentMovementType;
  /** Pesos COP enteros (sin decimales). */
  amount: number;
}>;

export type CreateInvestmentPayload = Readonly<{
  name: string;
  /** Pesos COP enteros (sin decimales). */
  balance: number;
  tags: string[];
}>;

/** Rango inclusive `YYYY-MM-DD` para filtros de inversiones. */
export type InvestmentDateRange = Readonly<{
  from: string;
  to: string;
}>;

export type InvestmentGrowthItem = Readonly<{
  id: string;
  rank: number;
  name: string;
  ticker: string;
  tagName: string;
  tagColor?: InvestmentTag["color"];
  /** % de crecimiento desde el saldo inicial (`percentage-growing` del API). */
  growthPercent: number;
  /** Ganancia o pérdida en moneda (derivada de `growthPercent` + `currentValue`). */
  growthAmount: number;
  currentValue: number;
  /** Points for the sparkline (oldest → newest) */
  trend: readonly number[];
}>;

export type InvestmentDistribution = Readonly<{
  label: string;
  percentage: number;
  color: string;
}>;

export type InvestmentValuePoint = Readonly<{
  date: string;
  value: number;
}>;

export type InvestmentMovementRecord = Readonly<{
  id?: number;
  date: string;
  type: string;
  amount?: number;
  balanceAfter?: number;
}>;

export type InvestmentDetail = Readonly<{
  id: string;
  name: string;
  tags: string[];
  currentValue: number;
  growthPercent: number;
  growthAmount: number;
  series: InvestmentValuePoint[];
  movements: InvestmentMovementRecord[];
}>;
