"use client";

import Link from "next/link";

import { MOCK_GROWTH_RANKING } from "../data/mock-investments";
import type { InvestmentGrowthItem } from "../types";
import { cn } from "@/lib/utils";

import { InvestmentGrowthRow } from "./investment-growth-row";

type InvestmentGrowthListProps = Readonly<{
  items?: InvestmentGrowthItem[];
  className?: string;
  limit?: number;
  showViewAll?: boolean;
}>;

export function InvestmentGrowthList({
  items = MOCK_GROWTH_RANKING,
  className,
  limit = 5,
  showViewAll = true,
}: InvestmentGrowthListProps) {
  const visibleItems = items.slice(0, limit);

  return (
    <div
      className={cn("min-w-0", className)}
      data-slot="investment-growth-list"
    >
      <ol
        className="min-w-0 divide-y-0"
        aria-label="Ranking de crecimiento por inversión"
      >
        {visibleItems.map((item) => (
          <InvestmentGrowthRow key={item.id} item={item} />
        ))}
      </ol>

      {showViewAll ? (
        <div className="mt-1 border-t border-zinc-100 pt-3">
          <Link
            href="/investments"
            className="block text-center text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            Ver todas mis inversiones
          </Link>
        </div>
      ) : null}
    </div>
  );
}
