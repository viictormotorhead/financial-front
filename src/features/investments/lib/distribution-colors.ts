const SLICE_COLORS = [
  "#3b82f6",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#f97316",
  "#06b6d4",
  "#22c55e",
  "#ec4899",
  "#a855f7",
  "#14b8a6",
  "#eab308",
  "#6366f1",
  "#94a3b8",
  "#78716c",
] as const;

export function colorForDistributionIndex(index: number): string {
  return SLICE_COLORS[Math.abs(index) % SLICE_COLORS.length];
}
