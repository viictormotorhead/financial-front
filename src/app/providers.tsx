"use client";

import type { ReactNode } from "react";

import { ToastProvider } from "@/components/ui/toast";
import { InvestmentUpdateProvider } from "@/features/investments/context/investment-update-context";

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ToastProvider>
      <InvestmentUpdateProvider>{children}</InvestmentUpdateProvider>
    </ToastProvider>
  );
}
