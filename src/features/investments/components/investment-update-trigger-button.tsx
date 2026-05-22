"use client";

import type { PointerEvent } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { openInvestmentUpdateModal } from "../lib/open-investment-update-modal";

type InvestmentUpdateTriggerButtonProps = Readonly<{
  className?: string;
}>;

function PlusIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
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

export function InvestmentUpdateTriggerButton({
  className,
}: InvestmentUpdateTriggerButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleOpen}
      className={cn(
        "relative z-10 min-h-11 shrink-0 cursor-pointer touch-manipulation",
        className,
      )}
      aria-label="Actualizar valor de inversión"
    >
      <PlusIcon />
      <span className="hidden sm:inline">Actualizar valor</span>
      <span className="sm:hidden">Actualizar</span>
    </Button>
  );
}
