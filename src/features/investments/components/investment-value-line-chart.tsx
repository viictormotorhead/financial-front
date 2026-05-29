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

type InvestmentValueLineChartProps = Readonly<{
  series: readonly InvestmentValuePoint[];
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

export function InvestmentValueLineChart({
  series,
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

  const data = series.map((point) => ({
    date: point.date,
    value: point.value,
    label: formatAxisDate(point.date),
  }));

  const stroke = positive ? "#059669" : "#dc2626";

  return (
    <div className={className} aria-label="Gráfico de evolución del valor">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#71717a" }}
            tickLine={false}
            axisLine={{ stroke: "#e4e4e7" }}
            minTickGap={24}
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
              const row = payload[0].payload as { date: string; value: number };
              return (
                <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs shadow-md">
                  <p className="font-medium text-zinc-900">
                    {formatYmdMedium(row.date)}
                  </p>
                  <p className="mt-0.5 tabular-nums text-zinc-600">
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
