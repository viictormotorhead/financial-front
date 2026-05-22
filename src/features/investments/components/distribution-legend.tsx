import type { InvestmentDistribution } from "../types";
import { cn } from "@/lib/utils";

type DistributionLegendProps = Readonly<{
  items: InvestmentDistribution[];
  className?: string;
}>;

export function DistributionLegend({ items, className }: DistributionLegendProps) {
  return (
    <ul className={cn("flex min-w-0 flex-col gap-2.5", className)}>
      {items.map((item) => (
        <li
          key={item.label}
          className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-0.5"
        >
          <span className="flex min-w-0 items-center gap-2 text-sm text-zinc-700">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
              aria-hidden
            />
            <span className="min-w-0 break-words leading-snug">{item.label}</span>
          </span>
          <span className="shrink-0 text-sm font-medium tabular-nums text-zinc-900">
            {item.percentage}%
          </span>
        </li>
      ))}
    </ul>
  );
}
