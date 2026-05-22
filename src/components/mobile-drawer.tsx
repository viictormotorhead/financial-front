"use client";

import { useEffect } from "react";

import { Sidebar } from "@/components/sidebar";

type MobileDrawerProps = Readonly<{
  activePath: string;
  open: boolean;
  onClose: () => void;
}>;

export function MobileDrawer({ activePath, open, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-zinc-900/40"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="relative flex h-full max-w-xs">
        <Sidebar
          activePath={activePath}
          onNavigate={onClose}
          className="h-full shadow-xl"
        />
      </div>
    </div>
  );
}
