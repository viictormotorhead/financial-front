import Link from "next/link";
import type { ReactNode } from "react";

import {
  ChartBarIcon,
  MAIN_NAV_ITEMS,
  SettingsIcon,
  isNavActive,
} from "@/lib/navigation";

type SidebarNavLinkProps = Readonly<{
  href: string;
  label: string;
  icon: ReactNode;
  active: boolean;
  onNavigate?: () => void;
}>;

function SidebarNavLink({
  href,
  label,
  icon,
  active,
  onNavigate,
}: SidebarNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-blue-50 text-blue-600"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span className={active ? "text-blue-600" : "text-zinc-400"}>{icon}</span>
      {label}
    </Link>
  );
}

type SidebarProps = Readonly<{
  activePath: string;
  onNavigate?: () => void;
  className?: string;
}>;

export function Sidebar({ activePath, onNavigate, className = "" }: SidebarProps) {
  return (
    <aside
      className={`flex w-56 shrink-0 flex-col border-r border-zinc-200/80 bg-white ${className}`}
    >
      <div className="flex items-center gap-2.5 border-b border-zinc-100 px-4 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <ChartBarIcon />
        </span>
        <span className="text-sm font-semibold tracking-tight text-zinc-900">
          Mi Finanzas
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Main">
        {MAIN_NAV_ITEMS.map((item) => (
          <SidebarNavLink
            key={item.href}
            {...item}
            active={isNavActive(activePath, item.href)}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="border-t border-zinc-100 px-3 py-4">
        <SidebarNavLink
          href="/settings"
          label="Configuración"
          icon={<SettingsIcon />}
          active={isNavActive(activePath, "/settings")}
          onNavigate={onNavigate}
        />
      </div>
    </aside>
  );
}
