import type { InvestmentDistribution } from "../types";

export const MOCK_PORTFOLIO_TOTAL = 36_020.7;

export const MOCK_DISTRIBUTION: InvestmentDistribution[] = [
  { label: "ETF", percentage: 42, color: "#3b82f6" },
  { label: "Acciones", percentage: 28, color: "#10b981" },
  { label: "Tecnología", percentage: 15, color: "#8b5cf6" },
  { label: "Renta Fija", percentage: 10, color: "#f59e0b" },
  { label: "Criptomonedas", percentage: 5, color: "#f97316" },
];

export const MOCK_DISTRIBUTION_UPDATED_AT = "Hoy, 09:30 a.m.";
