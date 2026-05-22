import type { ReactNode } from "react";

import {
  MenuIcon,
  TagIcon,
  getPageTitle,
  showMobileTagsAction,
} from "@/lib/navigation";

type HeaderProps = Readonly<{
  activePath: string;
  onMenuOpen: () => void;
  tagsAction?: ReactNode;
}>;

export function Header({ activePath, onMenuOpen, tagsAction }: HeaderProps) {
  const showTags = showMobileTagsAction(activePath);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-zinc-200/80 bg-white px-4 py-3 lg:hidden">
      <button
        type="button"
        onClick={onMenuOpen}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100"
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>

      <h1 className="flex-1 text-center text-base font-semibold text-zinc-900">
        {getPageTitle(activePath)}
      </h1>

      {showTags ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          {tagsAction ?? (
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100"
              aria-label="Manage tags"
              data-slot="mobile-manage-tags-action"
            >
              <TagIcon />
            </button>
          )}
        </div>
      ) : (
        <span className="h-10 w-10 shrink-0" aria-hidden />
      )}
    </header>
  );
}
