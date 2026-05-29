import type { InvestmentDateRange } from "../types";

type BuildInvestmentsQueryOptions = Readonly<{
  tagNames: readonly string[];
  /** Inclusive; query `date_from` y `date_to`. */
  dateRange?: InvestmentDateRange | null;
}>;

/**
 * Query para `GET /v1/investments/`.
 * - `tags`: nombres separados por coma.
 * - `date_from`, `date_to`: rango inclusive (requiere soporte en el API).
 */
export function buildInvestmentsListQuery(
  options: BuildInvestmentsQueryOptions,
): string {
  const names = options.tagNames
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  const range = options.dateRange;
  const from = range?.from.trim() ?? "";
  const to = range?.to.trim() ?? "";
  const hasRange = from.length > 0 && to.length > 0;

  if (names.length === 0 && !hasRange) return "";

  const params = new URLSearchParams();
  if (names.length > 0) params.set("tags", names.join(","));
  if (hasRange) {
    params.set("date_from", from);
    params.set("date_to", to);
  }

  return `?${params.toString()}`;
}

/** Query para `GET /v1/investments/:id` (detalle). */
export function buildInvestmentDetailQuery(
  dateRange?: InvestmentDateRange | null,
): string {
  const from = dateRange?.from.trim() ?? "";
  const to = dateRange?.to.trim() ?? "";
  if (from.length === 0 || to.length === 0) return "";

  const params = new URLSearchParams();
  params.set("date_from", from);
  params.set("date_to", to);
  return `?${params.toString()}`;
}
