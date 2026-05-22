import { Badge } from "@/components/ui/badge";
import type { InvestmentGrowthItem } from "../types";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

import { InvestmentSparkline } from "./investment-sparkline";

type InvestmentGrowthRowProps = Readonly<{
  item: InvestmentGrowthItem;
  className?: string;
}>;

export function InvestmentGrowthRow({ item, className }: InvestmentGrowthRowProps) {
  const isPositive = item.valuationPercent >= 0;

  return (
    <li
      className={cn(
        "grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-0 border-b border-zinc-100 py-3.5 last:border-b-0 sm:grid-cols-[1.75rem_minmax(0,1fr)_4.5rem_auto] sm:gap-x-4",
        className,
      )}
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
        <p
          className={cn(
            "text-sm font-semibold tabular-nums",
            isPositive ? "text-emerald-600" : "text-red-600",
          )}
        >
          {formatPercent(item.valuationPercent)}
        </p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-zinc-400">
          Valor actual
        </p>
        <p className="text-sm font-medium tabular-nums text-zinc-900">
          {formatCurrency(item.currentValue)}
        </p>
      </div>
    </li>
  );
}
