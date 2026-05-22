"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import { BottomNav } from "@/components/bottom-nav";
import { Header } from "@/components/header";
import { MobileDrawer } from "@/components/mobile-drawer";
import { Sidebar } from "@/components/sidebar";
import { InvestmentsMobileHeaderAction } from "@/features/investments/components/investments-mobile-header-action";

type DashboardShellProps = Readonly<{
  children: ReactNode;
}>;

export function DashboardShell({ children }: DashboardShellProps) {
  const activePath = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-zinc-900">
      <Sidebar activePath={activePath} className="hidden lg:flex" />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          activePath={activePath}
          onMenuOpen={() => setMenuOpen(true)}
          trailingAction={
            activePath.startsWith("/investments") ? (
              <InvestmentsMobileHeaderAction />
            ) : undefined
          }
        />

        <div className="flex min-h-0 flex-1 flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
          {children}
        </div>

        <BottomNav activePath={activePath} />
      </div>

      <MobileDrawer
        activePath={activePath}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </div>
  );
}
