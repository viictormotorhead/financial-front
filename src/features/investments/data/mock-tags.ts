import type { InvestmentTag } from "../types";

export const MOCK_TAGS: InvestmentTag[] = [
  { id: "etf", name: "ETF", color: "blue" },
  { id: "tech", name: "Tecnología", color: "green" },
  { id: "long-term", name: "Largo Plazo", color: "purple" },
  { id: "stocks", name: "Acciones", color: "blue" },
  { id: "fixed-income", name: "Renta Fija", color: "yellow" },
  { id: "crypto", name: "Criptomonedas", color: "purple" },
  { id: "dividends", name: "Dividendos", color: "green" },
  { id: "emerging", name: "Mercados Emergentes", color: "yellow" },
];

export const DEFAULT_ACTIVE_FILTER_IDS = ["etf", "tech", "long-term"];
