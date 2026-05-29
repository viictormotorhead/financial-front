import { CURRENCY_CODE, CURRENCY_LOCALE } from "./currency";

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(
  amount: number,
  locale = CURRENCY_LOCALE,
  currency = CURRENCY_CODE,
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}

/** Shorter currency for tight UI (e.g. donut center). */
export function formatPercent(value: number, options?: { showSign?: boolean }) {
  const { showSign = true } = options ?? {};
  const sign = showSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

/** Variación monetaria con signo explícito (+ / −). */
export function formatCurrencyDelta(amount: number) {
  if (amount === 0) return formatCurrency(0);
  const sign = amount > 0 ? "+" : "−";
  return `${sign}${formatCurrency(Math.abs(amount))}`;
}

export function formatCurrencyCompact(
  amount: number,
  locale = CURRENCY_LOCALE,
  currency = CURRENCY_CODE,
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
