"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

import type { InvestmentTag } from "../types";

type TagPickerModalProps = Readonly<{
  open: boolean;
  onClose: () => void;
  tags: InvestmentTag[];
  onConfirm: (tags: InvestmentTag[]) => void;
  title?: string;
  description?: string;
}>;

function matchesQuery(tag: InvestmentTag, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [tag.name, tag.description ?? "", tag.id]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}

function CheckIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function TagPickerModal({
  open,
  onClose,
  tags,
  onConfirm,
  title = "Agregar filtros",
  description = "Puedes elegir varios tags a la vez. Usa la descripción y el ID para distinguir nombres parecidos.",
}: TagPickerModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredTags = useMemo(
    () => tags.filter((tag) => matchesQuery(tag, query)),
    [tags, query],
  );

  const selectedTags = useMemo(
    () => tags.filter((tag) => selectedIds.has(tag.id)),
    [tags, selectedIds],
  );

  const allFilteredSelected =
    filteredTags.length > 0 &&
    filteredTags.every((tag) => selectedIds.has(tag.id));

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIds(new Set());
    }
  }, [open]);

  const toggleTag = (tagId: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(tagId)) next.delete(tagId);
      else next.add(tagId);
      return next;
    });
  };

  const toggleAllFiltered = () => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (allFilteredSelected) {
        for (const tag of filteredTags) next.delete(tag.id);
      } else {
        for (const tag of filteredTags) next.add(tag.id);
      }
      return next;
    });
  };

  const handleConfirm = () => {
    if (selectedTags.length === 0) return;
    onConfirm(selectedTags);
    setQuery("");
    setSelectedIds(new Set());
    onClose();
  };

  const handleClose = () => {
    setQuery("");
    setSelectedIds(new Set());
    onClose();
  };

  const confirmLabel =
    selectedTags.length === 1
      ? "Agregar 1 filtro"
      : `Agregar ${selectedTags.length} filtros`;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      description={description}
      className="max-w-lg"
    >
      <div className="space-y-4">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nombre, descripción o ID…"
          aria-label="Buscar tags"
          autoFocus
        />

        {filteredTags.length > 0 ? (
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-zinc-500">
              {selectedIds.size > 0
                ? `${selectedIds.size} seleccionado${selectedIds.size === 1 ? "" : "s"}`
                : "Ninguno seleccionado"}
            </p>
            <button
              type="button"
              onClick={toggleAllFiltered}
              className="text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              {allFilteredSelected
                ? "Quitar todos los visibles"
                : "Seleccionar todos los visibles"}
            </button>
          </div>
        ) : null}

        <ul
          className="max-h-64 space-y-2 overflow-y-auto overscroll-contain pr-0.5"
          aria-label="Tags disponibles"
        >
          {filteredTags.length === 0 ? (
            <li className="rounded-lg border border-dashed border-zinc-200 px-3 py-6 text-center text-sm text-zinc-500">
              No hay tags que coincidan con tu búsqueda.
            </li>
          ) : (
            filteredTags.map((tag) => {
              const isSelected = selectedIds.has(tag.id);

              return (
                <li key={tag.id}>
                  <button
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex w-full gap-3 rounded-lg border px-3 py-3 text-left transition-colors",
                      isSelected
                        ? "border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20"
                        : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-zinc-300 bg-white",
                      )}
                      aria-hidden
                    >
                      {isSelected ? <CheckIcon /> : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start justify-between gap-3">
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-zinc-900">
                            {tag.name}
                          </span>
                          <span className="mt-0.5 line-clamp-2 block text-xs text-zinc-500">
                            {tag.description?.trim() ||
                              "Sin descripción en el catálogo"}
                          </span>
                        </span>
                        <span className="shrink-0 rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-600">
                          id {tag.id}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={selectedTags.length === 0}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
