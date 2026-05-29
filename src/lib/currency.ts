export const CURRENCY_LOCALE = "es-CO";
export const CURRENCY_CODE = "COP";

/** Extrae solo dígitos y devuelve pesos enteros (COP sin decimales). */
export function parseCurrencyInputToInteger(input: string): number | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 0) return null;

  const value = Number.parseInt(digits, 10);
  if (!Number.isSafeInteger(value)) return null;

  return value;
}

/** Formato moneda para inputs (sin decimales). */
export function formatCurrencyInputValue(
  amount: number,
  locale = CURRENCY_LOCALE,
  currency = CURRENCY_CODE,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}

/** Valor entero listo para el API (pesos COP). */
export function toApiCurrencyInteger(amount: number): number {
  return Math.trunc(amount);
}
