import { cn } from "@/lib/utils";

type InvestmentSparklineProps = Readonly<{
  points: readonly number[];
  positive?: boolean;
  className?: string;
}>;

const WIDTH = 72;
const HEIGHT = 32;

export function InvestmentSparkline({
  points,
  positive = true,
  className,
}: InvestmentSparklineProps) {
  if (points.length < 2) return null;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const polylinePoints = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * WIDTH;
      const y = HEIGHT - ((value - min) / range) * (HEIGHT - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={cn("shrink-0 overflow-visible", className)}
      aria-hidden
    >
      <polyline
        points={polylinePoints}
        fill="none"
        stroke={positive ? "#10b981" : "#ef4444"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
