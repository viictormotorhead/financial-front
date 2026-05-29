import { growthAmountFromPercent } from "./growth-math";
import type {
  InvestmentDetail,
  InvestmentMovementRecord,
  InvestmentValuePoint,
} from "../types";

function parseValuePoint(value: unknown): InvestmentValuePoint | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;

  const date =
    typeof row.date === "string"
      ? row.date
      : typeof row.recorded_at === "string"
        ? row.recorded_at
        : typeof row.recordedAt === "string"
          ? row.recordedAt
          : null;

  const amount =
    typeof row.value === "number"
      ? row.value
      : typeof row.amount === "number"
        ? row.amount
        : typeof row.current_value === "number"
          ? row.current_value
          : typeof row.currentValue === "number"
            ? row.currentValue
            : Number.NaN;

  if (!date || !Number.isFinite(amount)) return null;
  return { date: date.slice(0, 10), value: amount };
}

function parseSeries(value: unknown): InvestmentValuePoint[] {
  if (!Array.isArray(value)) return [];
  return value
    .map(parseValuePoint)
    .filter((point): point is InvestmentValuePoint => point !== null)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function parseMovement(value: unknown): InvestmentMovementRecord | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;

  const date =
    typeof row.date === "string"
      ? row.date
      : typeof row.created_at === "string"
        ? row.created_at
        : null;

  const type =
    typeof row.type === "string"
      ? row.type
      : typeof row.movement_type === "string"
        ? row.movement_type
        : "unknown";

  if (!date) return null;

  const id =
    typeof row.id === "number" && Number.isFinite(row.id) ? row.id : undefined;
  const amount =
    typeof row.amount === "number" && Number.isFinite(row.amount)
      ? row.amount
      : undefined;
  const balanceAfter =
    typeof row.balance_after === "number"
      ? row.balance_after
      : typeof row.balanceAfter === "number"
        ? row.balanceAfter
        : undefined;

  return {
    id,
    date: date.slice(0, 10),
    type,
    amount,
    balanceAfter,
  };
}

function parseMovements(value: unknown): InvestmentMovementRecord[] {
  if (!Array.isArray(value)) return [];
  return value
    .map(parseMovement)
    .filter((row): row is InvestmentMovementRecord => row !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

function readGrowingPercent(row: Record<string, unknown>): number {
  const raw = row["percentage-growing"] ?? row.percentageGrowing ?? row.growth_percent;
  return typeof raw === "number" && Number.isFinite(raw) ? raw : 0;
}

export function parseInvestmentDetail(
  data: unknown,
  fallbackId: string,
): InvestmentDetail | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;

  const nested =
    record.investment && typeof record.investment === "object"
      ? (record.investment as Record<string, unknown>)
      : record;

  const name =
    typeof nested.name === "string"
      ? nested.name
      : typeof nested.investment === "string"
        ? nested.investment
        : null;

  const currentValue =
    typeof nested.amount === "number"
      ? nested.amount
      : typeof nested.current_value === "number"
        ? nested.current_value
        : typeof nested.currentValue === "number"
          ? nested.currentValue
          : typeof nested.balance === "number"
            ? nested.balance
            : Number.NaN;

  if (!name || !Number.isFinite(currentValue)) return null;

  const idRaw = nested.id ?? record.id ?? fallbackId;
  const id = typeof idRaw === "number" ? String(idRaw) : String(idRaw);

  const tags = Array.isArray(nested.tags)
    ? nested.tags.filter((tag): tag is string => typeof tag === "string")
    : [];

  const growthPercent = readGrowingPercent(nested);
  const growthAmount =
    typeof nested.growth_amount === "number" && Number.isFinite(nested.growth_amount)
      ? Math.round(nested.growth_amount)
      : growthAmountFromPercent(currentValue, growthPercent);

  const series = parseSeries(
    record.series ?? record.valuations ?? record.history ?? nested.series,
  );
  const movements = parseMovements(record.movements ?? nested.movements);

  return {
    id,
    name,
    tags,
    currentValue,
    growthPercent,
    growthAmount,
    series,
    movements,
  };
}
