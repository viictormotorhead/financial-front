import type { InvestmentDistribution } from "../types";
import { cn } from "@/lib/utils";

type DistributionDonutProps = Readonly<{
  data: InvestmentDistribution[];
  totalLabel: string;
  totalValue: string;
  /** Full amount for tooltip when value is shown in compact form */
  title?: string;
  className?: string;
}>;

function buildConicGradient(items: InvestmentDistribution[]) {
  let cumulative = 0;
  const stops = items.map((item) => {
    const start = cumulative;
    cumulative += item.percentage;
    return `${item.color} ${start}% ${cumulative}%`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export function DistributionDonut({
  data,
  totalLabel,
  totalValue,
  title,
  className,
}: DistributionDonutProps) {
  const gradient = buildConicGradient(data);
  const ariaSummary = data
    .map((item) => `${item.label} ${item.percentage}%`)
    .join(", ");

  return (
    <div
      className={cn(
        "relative size-[188px] shrink-0 sm:size-[200px] lg:size-[220px] xl:size-[240px]",
        className,
      )}
    >
      <div
        className="h-full w-full rounded-full"
        style={{ background: gradient }}
        role="img"
        aria-label={`Distribución: ${ariaSummary}`}
      />
      <div
        className="absolute left-1/2 top-1/2 size-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-3 text-center sm:px-3.5 lg:px-4">
        <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-500 sm:text-[11px]">
          {totalLabel}
        </span>
        <span
          title={title}
          className={cn(
            "mt-0.5 w-[78%] font-semibold leading-tight tabular-nums text-zinc-900",
            "text-[clamp(0.75rem,2.8vw,0.875rem)] sm:text-sm",
            "lg:w-[80%] lg:text-[clamp(0.875rem,1.1vw,1.125rem)]",
            "xl:text-lg",
          )}
        >
          {totalValue}
        </span>
      </div>
    </div>
  );
}
