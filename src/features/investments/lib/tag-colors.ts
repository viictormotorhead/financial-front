import type { InvestmentTag } from "../types";

const TAG_COLORS: NonNullable<InvestmentTag["color"]>[] = [
  "blue",
  "green",
  "purple",
  "yellow",
  "default",
];

export function colorForTagId(id: number | string): InvestmentTag["color"] {
  const numeric =
    typeof id === "number" ? id : Number.parseInt(String(id), 10) || 0;
  return TAG_COLORS[Math.abs(numeric) % TAG_COLORS.length];
}
