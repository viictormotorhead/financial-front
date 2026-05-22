import Link from "next/link";

import { MAIN_NAV_ITEMS, isNavActive } from "./nav-config";

type BottomNavProps = Readonly<{
  activePath: string;
}>;

export function BottomNav({ activePath }: BottomNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-zinc-200/80 bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Navegación principal"
    >
      {MAIN_NAV_ITEMS.map((item) => {
        const active = isNavActive(activePath, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center gap-1 px-2 py-2.5 text-xs font-medium transition-colors ${
              active ? "text-blue-600" : "text-zinc-500"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <span className={active ? "text-blue-600" : "text-zinc-400"}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
