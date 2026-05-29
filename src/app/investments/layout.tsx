"use client";

import type { ReactNode } from "react";

import { InvestmentTagsProvider } from "@/features/investments/context/investment-tags-context";

export default function InvestmentsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <InvestmentTagsProvider>{children}</InvestmentTagsProvider>;
}
