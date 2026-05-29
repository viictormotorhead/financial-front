/**
 * Saldo inicial implícito cuando el % viene de
 * `(actual - inicial) / inicial * 100` (`percentage-growing` del API).
 */
export function initialValueFromGrowthPercent(
  currentValue: number,
  growthPercent: number,
): number {
  if (currentValue === 0) return 0;
  const factor = 1 + growthPercent / 100;
  if (factor === 0) return currentValue;
  return currentValue / factor;
}

/** Ganancia o pérdida absoluta en moneda (actual − inicial). */
export function growthAmountFromPercent(
  currentValue: number,
  growthPercent: number,
): number {
  const initial = initialValueFromGrowthPercent(currentValue, growthPercent);
  return Math.round(currentValue - initial);
}
