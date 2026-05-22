export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(
  amount: number,
  locale = "es-CO",
  currency = "USD",
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

/** Shorter currency for tight UI (e.g. donut center). */
export function formatCurrencyCompact(
  amount: number,
  locale = "es-CO",
  currency = "USD",
) {
  const formatted = formatCurrency(amount, locale, currency);
  if (formatted.length <= 14) return formatted;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(amount);
}
