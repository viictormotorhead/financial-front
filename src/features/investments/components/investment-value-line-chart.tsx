"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatYmdMedium } from "@/lib/date-local";
import { formatCurrency } from "@/lib/utils";
import type { InvestmentValuePoint } from "../types";

type ChartPoint = Readonly<{
  date: string;
  value: number;
  axisLabel: string;
  /** Índice único: evita que Recharts agrupe puntos del mismo día en el eje X. */
  xKey: string;
  isLatest: boolean;
}>;

type InvestmentValueLineChartProps = Readonly<{
  series: readonly InvestmentValuePoint[];
  /** Valor actual de la inversión (puede diferir del último punto si el API no sincroniza). */
  currentValue?: number;
  positive?: boolean;
  className?: string;
}>;

function formatAxisDate(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  if (!y || !m || !d) return ymd;
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
  }).format(new Date(y, m - 1, d));
}

function buildChartPoints(
  series: readonly InvestmentValuePoint[],
  currentValue?: number,
): ChartPoint[] {
  const points: ChartPoint[] = series.map((point, index) => ({
    date: point.date,
    value: point.value,
    axisLabel: formatAxisDate(point.date),
    xKey: String(index),
    isLatest: false,
  }));

  if (
    typeof currentValue === "number" &&
    Number.isFinite(currentValue) &&
    points.length > 0 &&
    points[points.length - 1].value !== currentValue
  ) {
    const lastDate = points[points.length - 1].date;
    points.push({
      date: lastDate,
      value: currentValue,
      axisLabel: formatAxisDate(lastDate),
      xKey: String(points.length),
      isLatest: false,
    });
  }

  if (points.length > 0) {
    const lastIndex = points.length - 1;
    points[lastIndex] = { ...points[lastIndex], isLatest: true };
  }

  return points;
}

export function InvestmentValueLineChart({
  series,
  currentValue,
  positive = true,
  className,
}: InvestmentValueLineChartProps) {
  if (series.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-zinc-500">
        No hay datos de evolución para el periodo seleccionado.
      </p>
    );
  }

  const data = buildChartPoints(series, currentValue);
  const stroke = positive ? "#059669" : "#dc2626";

  return (
    <div className={className} aria-label="Gráfico de evolución del valor">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
          <XAxis
            dataKey="xKey"
            tick={{ fontSize: 11, fill: "#71717a" }}
            tickLine={false}
            axisLine={{ stroke: "#e4e4e7" }}
            minTickGap={24}
            tickFormatter={(key) => data[Number(key)]?.axisLabel ?? String(key)}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#71717a" }}
            tickLine={false}
            axisLine={false}
            width={72}
            tickFormatter={(value: number) =>
              new Intl.NumberFormat("es-CO", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(value)
            }
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const row = payload[0].payload as ChartPoint;
              return (
                <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-md">
                  <p className="font-medium text-zinc-900">
                    {formatYmdMedium(row.date)}
                  </p>
                  <p className="mt-0.5 text-zinc-500">
                    {row.isLatest ? "Valor actual" : "Valor en la fecha"}
                  </p>
                  <p className="mt-0.5 tabular-nums font-medium text-zinc-900">
                    {formatCurrency(row.value)}
                  </p>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2}
            dot={{ r: 3, fill: stroke, strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
