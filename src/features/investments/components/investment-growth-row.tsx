import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { InvestmentGrowthItem } from "../types";
import { cn, formatCurrency, formatCurrencyDelta, formatPercent } from "@/lib/utils";

import { InvestmentSparkline } from "./investment-sparkline";

type InvestmentGrowthRowProps = Readonly<{
  item: InvestmentGrowthItem;
  className?: string;
}>;

export function InvestmentGrowthRow({ item, className }: InvestmentGrowthRowProps) {
  const isPositive = item.growthPercent >= 0;
  const growthTone = isPositive ? "text-emerald-600" : "text-red-600";

  const href = `/investments/${encodeURIComponent(item.id)}`;

  return (
    <li className={cn("border-b border-zinc-100 last:border-b-0", className)}>
      <Link
        href={href}
        className={cn(
          "grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-0 py-3.5 transition-colors",
          "hover:bg-zinc-50 focus-visible:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/40",
          "sm:grid-cols-[1.75rem_minmax(0,1fr)_4.5rem_auto] sm:gap-x-4",
        )}
        aria-label={`Ver detalle de ${item.name}`}
      >
      <span
        className="text-sm font-semibold tabular-nums text-zinc-400"
        aria-hidden
      >
        {item.rank}
      </span>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-zinc-900">
          {item.name}{" "}
          <span className="font-normal text-zinc-500">({item.ticker})</span>
        </p>
        <Badge variant={item.tagColor ?? "default"} className="mt-1.5">
          {item.tagName}
        </Badge>
      </div>

      <InvestmentSparkline
        points={item.trend}
        positive={isPositive}
        className="hidden justify-self-center sm:block"
      />

      <div className="text-right">
        <p className={cn("text-sm font-semibold tabular-nums", growthTone)}>
          {formatPercent(item.growthPercent)}
        </p>
        <p className={cn("text-xs font-medium tabular-nums", growthTone)}>
          {formatCurrencyDelta(item.growthAmount)}
        </p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
          Crecimiento
        </p>
        <p className="text-sm font-medium tabular-nums text-zinc-900">
          {formatCurrency(item.currentValue)}
        </p>
      </div>
      </Link>
    </li>
  );
}
