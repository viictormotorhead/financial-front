/** Fecha local `YYYY-MM-DD` (día civil del navegador). */
export function toLocalYmd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDaysLocal(date: Date, deltaDays: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + deltaDays);
  return next;
}

export function startOfYearLocal(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

export function formatYmdMedium(ymd: string, locale = "es-CO"): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(y, m - 1, d));
}

/** Ordena `from` / `to` si el usuario los invierte. */
export function normalizeYmdRange(
  from: string,
  to: string,
): Readonly<{ from: string; to: string }> {
  if (from.localeCompare(to) <= 0) return { from, to };
  return { from: to, to: from };
}
