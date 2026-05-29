"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addDaysLocal,
  formatYmdMedium,
  normalizeYmdRange,
  startOfYearLocal,
  toLocalYmd,
} from "@/lib/date-local";
import { cn } from "@/lib/utils";
import type { InvestmentDateRange } from "../types";

type InvestmentDateRangeFilterProps = Readonly<{
  dateRange: InvestmentDateRange | null;
  onChange: (value: InvestmentDateRange | null) => void;
  onClear: () => void;
  className?: string;
}>;

function CalendarIcon({ className }: Readonly<{ className?: string }>) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

const PANEL_WIDTH = 360;

function rangesEqual(
  a: InvestmentDateRange | null,
  b: InvestmentDateRange,
): boolean {
  return a !== null && a.from === b.from && a.to === b.to;
}

export function InvestmentDateRangeFilter({
  dateRange,
  onChange,
  onClear,
  className,
}: InvestmentDateRangeFilterProps) {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [rangeError, setRangeError] = useState<string | null>(null);
  const [draftFrom, setDraftFrom] = useState("");
  const [draftTo, setDraftTo] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    setRangeError(null);
    if (dateRange) {
      setDraftFrom(dateRange.from);
      setDraftTo(dateRange.to);
    } else {
      setDraftFrom("");
      setDraftTo("");
    }
  }, [open, dateRange]);

  useLayoutEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const margin = 8;
    let left = rect.right - PANEL_WIDTH;
    if (left < margin) left = margin;
    if (left + PANEL_WIDTH > window.innerWidth - margin) {
      left = Math.max(margin, window.innerWidth - margin - PANEL_WIDTH);
    }

    const panelHeight = panelRef.current?.offsetHeight ?? 320;
    let top = rect.bottom + margin;
    if (top + panelHeight > window.innerHeight - margin) {
      top = Math.max(margin, rect.top - margin - panelHeight);
    }

    setPanelPos({ top, left });
  }, [open, dateRange, draftFrom, draftTo]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const root = rootRef.current;
      const panel = panelRef.current;
      const target = event.target as Node;
      if (root?.contains(target) || panel?.contains(target)) return;
      setOpen(false);
    };

    const handleReposition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const margin = 8;
      let left = rect.right - PANEL_WIDTH;
      if (left < margin) left = margin;
      if (left + PANEL_WIDTH > window.innerWidth - margin) {
        left = Math.max(margin, window.innerWidth - margin - PANEL_WIDTH);
      }
      const panelHeight = panelRef.current?.offsetHeight ?? 320;
      let top = rect.bottom + margin;
      if (top + panelHeight > window.innerHeight - margin) {
        top = Math.max(margin, rect.top - margin - panelHeight);
      }
      setPanelPos({ top, left });
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("scroll", handleReposition, true);
    window.addEventListener("resize", handleReposition);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("scroll", handleReposition, true);
      window.removeEventListener("resize", handleReposition);
    };
  }, [open]);

  const now = new Date();
  const today = toLocalYmd(now);

  const presets: ReadonlyArray<{
    label: string;
    range: InvestmentDateRange;
  }> = [
    { label: "Hoy", range: { from: today, to: today } },
    {
      label: "Ayer",
      range: {
        from: toLocalYmd(addDaysLocal(now, -1)),
        to: toLocalYmd(addDaysLocal(now, -1)),
      },
    },
    {
      label: "Últimos 7 días",
      range: { from: toLocalYmd(addDaysLocal(now, -7)), to: today },
    },
    {
      label: "Últimos 30 días",
      range: { from: toLocalYmd(addDaysLocal(now, -30)), to: today },
    },
    {
      label: "Año en curso",
      range: { from: toLocalYmd(startOfYearLocal(now)), to: today },
    },
  ];

  const summaryLabel =
    dateRange === null
      ? "Rango de fechas"
      : `${formatYmdMedium(dateRange.from)} – ${formatYmdMedium(dateRange.to)}`;

  const applyDraftRange = () => {
    if (!draftFrom || !draftTo) {
      setRangeError("Indica fecha inicial y final.");
      return;
    }
    setRangeError(null);
    const normalized = normalizeYmdRange(draftFrom, draftTo);
    onChange(normalized);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        aria-expanded={open}
        aria-controls={panelId}
        className="h-10 w-full justify-start gap-2 sm:w-auto sm:min-w-[12rem]"
        onClick={() => setOpen((current) => !current)}
      >
        <CalendarIcon className="shrink-0 text-zinc-500" />
        <span className="min-w-0 truncate text-left text-sm font-medium text-zinc-800">
          {summaryLabel}
        </span>
        {dateRange !== null ? (
          <span className="ml-auto shrink-0 rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
            Activo
          </span>
        ) : null}
      </Button>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-label="Elegir rango de fechas"
          style={{
            position: "fixed",
            top: panelPos.top,
            left: panelPos.left,
            width: PANEL_WIDTH,
            maxWidth: "min(100vw - 1rem, 360px)",
          }}
          className="z-[100] rounded-xl border border-zinc-200 bg-white p-4 shadow-lg"
        >
          <p className="mb-3 text-xs text-zinc-500">
            Filtra inversiones entre dos fechas (inclusive). El API debe aceptar{" "}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[10px]">
              date_from
            </code>{" "}
            y{" "}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[10px]">
              date_to
            </code>{" "}
            como{" "}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[10px]">
              AAAA-MM-DD
            </code>
            .
          </p>

          <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            Atajos
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setRangeError(null);
                  onChange(preset.range);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  rangesEqual(dateRange, preset.range)
                    ? "border-blue-500 bg-blue-50 text-blue-800"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            Rango personalizado
          </p>
          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${panelId}-from`} className="text-xs">
                Desde
              </Label>
              <Input
                id={`${panelId}-from`}
                type="date"
                value={draftFrom}
                onChange={(event) => {
                  setDraftFrom(event.target.value);
                  setRangeError(null);
                }}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${panelId}-to`} className="text-xs">
                Hasta
              </Label>
              <Input
                id={`${panelId}-to`}
                type="date"
                value={draftTo}
                min={draftFrom || undefined}
                onChange={(event) => {
                  setDraftTo(event.target.value);
                  setRangeError(null);
                }}
                className="font-mono text-sm"
              />
            </div>
          </div>
          {rangeError ? (
            <p className="mb-3 text-xs text-red-600">{rangeError}</p>
          ) : null}
          <Button
            type="button"
            variant="outline"
            className="mb-4 w-full"
            onClick={applyDraftRange}
          >
            Aplicar rango personalizado
          </Button>

          <div className="flex flex-col gap-2 border-t border-zinc-100 pt-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                onClear();
                setOpen(false);
              }}
            >
              Sin filtro de fechas
            </Button>
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
