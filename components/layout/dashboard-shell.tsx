"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import { BottomNav } from "./bottom-nav";
import { MobileDrawer } from "./mobile-drawer";
import { MobileHeader } from "./mobile-header";
import { Sidebar } from "./sidebar";

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
        <MobileHeader
          activePath={activePath}
          onMenuOpen={() => setMenuOpen(true)}
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
