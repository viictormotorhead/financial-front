"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrencyInputValue } from "@/lib/currency";
import { useInvestmentTags } from "../context/investment-tags-context";
import type { CreateInvestmentPayload, InvestmentTag } from "../types";

import { TagList } from "./tag-list";
import { TagPickerModal } from "./tag-picker-modal";

type InvestmentCreateFormProps = Readonly<{
  open: boolean;
  onSubmit: (payload: CreateInvestmentPayload) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}>;

const EMPTY_FORM = {
  name: "",
  balance: null as number | null,
} as const;

export function InvestmentCreateForm({
  open,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: InvestmentCreateFormProps) {
  const { tags: catalogTags } = useInvestmentTags();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<InvestmentTag[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);

  const availableTagsForPicker = useMemo(
    () =>
      catalogTags.filter(
        (tag) => !selectedTags.some((selected) => selected.id === tag.id),
      ),
    [catalogTags, selectedTags],
  );

  useEffect(() => {
    if (!open) {
      setName(EMPTY_FORM.name);
      setBalance(EMPTY_FORM.balance);
      setSelectedTags([]);
      setPickerOpen(false);
    }
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName || balance === null || balance < 0) {
      return;
    }

    onSubmit({
      name: trimmedName,
      balance,
      tags: selectedTags.map((tag) => tag.name),
    });
  };

  const handleAddTags = (tags: InvestmentTag[]) => {
    setSelectedTags((current) => {
      const existingIds = new Set(current.map((tag) => tag.id));
      const next = [...current];
      for (const tag of tags) {
        if (!existingIds.has(tag.id)) next.push(tag);
      }
      return next;
    });
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags((current) => current.filter((tag) => tag.id !== tagId));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="investment-name">Nombre</Label>
          <Input
            id="investment-name"
            required
            disabled={isSubmitting}
            placeholder="uWatt"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="investment-balance">Saldo inicial</Label>
          <CurrencyInput
            id="investment-balance"
            required
            disabled={isSubmitting}
            placeholder={formatCurrencyInputValue(251_040)}
            value={balance}
            onValueChange={setBalance}
          />
          <p className="text-xs text-zinc-500">
            Valor actual de la inversión en tu moneda.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Tags</Label>
          <TagList
            tags={selectedTags}
            onRemove={handleRemoveTag}
            onAddClick={
              availableTagsForPicker.length > 0
                ? () => setPickerOpen(true)
                : undefined
            }
            addLabel="Agregar tags"
          />
          {selectedTags.length === 0 ? (
            <p className="text-xs text-zinc-500">
              Opcional. Clasifica la inversión para filtrarla después.
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
          {onCancel ? (
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              Cancelar
            </Button>
          ) : null}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:min-w-[120px]"
          >
            {isSubmitting ? "Creando…" : "Crear"}
          </Button>
        </div>
      </form>

      <TagPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        tags={availableTagsForPicker}
        onConfirm={handleAddTags}
        title="Tags de la inversión"
        description="Elige uno o más tags del catálogo. Puedes buscar por nombre, descripción o ID."
      />
    </>
  );
}
