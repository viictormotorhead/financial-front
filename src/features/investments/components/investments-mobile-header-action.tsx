"use client";

import type { PointerEvent } from "react";

import { cn } from "@/lib/utils";

import { openInvestmentUpdateModal } from "../lib/open-investment-update-modal";

function PlusIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function handleOpen(event: PointerEvent<HTMLButtonElement>) {
  event.stopPropagation();
  openInvestmentUpdateModal();
}

export function InvestmentsMobileHeaderAction() {
  return (
    <button
      type="button"
      onClick={handleOpen}
      className={cn(
        "flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg",
        "border border-zinc-200 bg-white text-zinc-700 touch-manipulation",
        "transition-colors hover:bg-zinc-50 active:bg-zinc-100",
      )}
      aria-label="Actualizar valor de inversión"
    >
      <PlusIcon />
    </button>
  );
}
