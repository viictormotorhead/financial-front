type InvestmentGrowthListProps = Readonly<{
  className?: string;
}>;

export function InvestmentGrowthList({ className = "" }: InvestmentGrowthListProps) {
  return (
    <div
      className={className}
      data-slot="investment-growth-list"
      aria-label="Investment growth ranking"
    />
  );
}
