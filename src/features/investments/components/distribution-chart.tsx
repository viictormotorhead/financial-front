type DistributionChartProps = Readonly<{
  className?: string;
}>;

export function DistributionChart({ className = "" }: DistributionChartProps) {
  return (
    <div
      className={className}
      data-slot="distribution-chart"
      aria-label="Investment distribution"
    />
  );
}
