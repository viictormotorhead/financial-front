"use client";

import Link from "next/link";

import type { InvestmentGrowthItem } from "../types";
import { cn } from "@/lib/utils";

import { InvestmentGrowthRow } from "./investment-growth-row";

type InvestmentGrowthListProps = Readonly<{
  items: InvestmentGrowthItem[];
  className?: string;
  limit?: number;
  showViewAll?: boolean;
}>;

export function InvestmentGrowthList({
  items,
  className,
  limit,
  showViewAll = true,
}: InvestmentGrowthListProps) {
  const visibleItems = limit ? items.slice(0, limit) : items;

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
