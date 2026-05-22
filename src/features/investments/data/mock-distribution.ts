import type { InvestmentDistribution } from "../types";

export const MOCK_PORTFOLIO_TOTAL = 36_020.7;

/** Vista estándar (5 categorías) */
export const MOCK_DISTRIBUTION: InvestmentDistribution[] = [
  { label: "ETF", percentage: 42, color: "#3b82f6" },
  { label: "Acciones", percentage: 28, color: "#10b981" },
  { label: "Tecnología", percentage: 15, color: "#8b5cf6" },
  { label: "Renta Fija", percentage: 10, color: "#f59e0b" },
  { label: "Criptomonedas", percentage: 5, color: "#f97316" },
];

/**
 * Preview con 15 inversiones / categorías (suma 100%).
 * Útil para probar donut + leyenda con muchos segmentos.
 */
export const MOCK_DISTRIBUTION_FIFTEEN: InvestmentDistribution[] = [
  { label: "ETF S&P 500", percentage: 18, color: "#3b82f6" },
  { label: "Acciones US", percentage: 14, color: "#10b981" },
  { label: "Tecnología", percentage: 12, color: "#8b5cf6" },
  { label: "Renta Fija", percentage: 10, color: "#f59e0b" },
  { label: "Criptomonedas", percentage: 8, color: "#f97316" },
  { label: "REITs", percentage: 7, color: "#06b6d4" },
  { label: "Dividendos", percentage: 6, color: "#22c55e" },
  { label: "Mercados emergentes", percentage: 5, color: "#ec4899" },
  { label: "Commodities", percentage: 4, color: "#a855f7" },
  { label: "Salud", percentage: 4, color: "#14b8a6" },
  { label: "Energía", percentage: 3, color: "#eab308" },
  { label: "Oro", percentage: 3, color: "#facc15" },
  { label: "Bonos corporativos", percentage: 2, color: "#6366f1" },
  { label: "Efectivo", percentage: 2, color: "#94a3b8" },
  { label: "Otros", percentage: 2, color: "#78716c" },
];

export const MOCK_DISTRIBUTION_UPDATED_AT = "Hoy, 09:30 a.m.";

export function isDenseDistribution(count: number) {
  return count > 6;
}
