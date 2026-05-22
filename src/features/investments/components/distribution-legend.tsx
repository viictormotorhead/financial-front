import type { InvestmentDistribution } from "../types";
import { cn } from "@/lib/utils";

type DistributionLegendProps = Readonly<{
  items: InvestmentDistribution[];
  className?: string;
  compact?: boolean;
  maxHeight?: boolean;
}>;

export function DistributionLegend({
  items,
  className,
  compact = false,
  maxHeight = false,
}: DistributionLegendProps) {
  return (
    <ul
      className={cn(
        "flex min-w-0 flex-col",
        compact ? "gap-1.5" : "gap-2.5",
        maxHeight &&
          "max-h-[min(220px,40vh)] overflow-y-auto overscroll-contain pr-1 [scrollbar-gutter:stable]",
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.label}
          className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2.5 gap-y-0.5 sm:gap-x-3"
        >
          <span
            className={cn(
              "flex min-w-0 items-center gap-1.5 text-zinc-700 sm:gap-2",
              compact ? "text-xs" : "text-sm",
            )}
          >
            <span
              className={cn(
                "shrink-0 rounded-full",
                compact ? "h-2 w-2" : "h-2.5 w-2.5",
              )}
              style={{ backgroundColor: item.color }}
              aria-hidden
            />
            <span className="min-w-0 break-words leading-snug">{item.label}</span>
          </span>
          <span
            className={cn(
              "shrink-0 font-medium tabular-nums text-zinc-900",
              compact ? "text-xs" : "text-sm",
            )}
          >
            {item.percentage}%
          </span>
        </li>
      ))}
    </ul>
  );
}
