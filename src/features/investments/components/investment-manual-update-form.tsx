"use client";

import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/components/ui/currency-input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { formatCurrencyInputValue } from "@/lib/currency";
import { MOVEMENT_TYPE_OPTIONS } from "../data/movement-types";
import { fetchInvestmentListItems } from "../services/investments-service";
import type { InvestmentListItem, ManualInvestmentUpdate } from "../types";

type InvestmentManualUpdateFormProps = Readonly<{
  open: boolean;
  onSubmit: (payload: ManualInvestmentUpdate) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}>;

const EMPTY_FORM = {
  investmentId: "",
  movementType: "",
  amount: null as number | null,
} as const;

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

export function InvestmentManualUpdateForm({
  open,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: InvestmentManualUpdateFormProps) {
  const [investmentId, setInvestmentId] = useState("");
  const [movementType, setMovementType] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [investments, setInvestments] = useState<InvestmentListItem[]>([]);
  const [isLoadingInvestments, setIsLoadingInvestments] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    let cancelled = false;

    setIsLoadingInvestments(true);
    setLoadError(null);

    fetchInvestmentListItems(controller.signal)
      .then((items) => {
        if (cancelled) return;

        setInvestments(items);
        setInvestmentId((current) => {
          if (current && items.some((item) => String(item.id) === current)) {
            return current;
          }
          return "";
        });
      })
      .catch((error: unknown) => {
        if (cancelled || isAbortError(error)) return;

        setInvestments([]);
        setLoadError("No se pudieron cargar las inversiones.");
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoadingInvestments(false);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [open]);

  const selectedInvestment = investments.find(
    (item) => String(item.id) === investmentId,
  );

  const amountLabel =
    movementType === "value_update" ? "Valor actual" : "Monto";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !investmentId ||
      !movementType ||
      !selectedInvestment ||
      amount === null ||
      amount < 0
    ) {
      return;
    }

    onSubmit({
      investmentId,
      investmentName: selectedInvestment.name,
      movementType: movementType as ManualInvestmentUpdate["movementType"],
      amount,
    });

    setInvestmentId(EMPTY_FORM.investmentId);
    setMovementType(EMPTY_FORM.movementType);
    setAmount(EMPTY_FORM.amount);
  };

  const formDisabled = isSubmitting || isLoadingInvestments;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="investment-id">Inversión</Label>
        <Select
          id="investment-id"
          required
          disabled={formDisabled || investments.length === 0}
          value={investmentId}
          onChange={(event) => setInvestmentId(event.target.value)}
        >
          <option value="" disabled>
            {isLoadingInvestments
              ? "Cargando inversiones…"
              : "Selecciona una inversión"}
          </option>
          {investments.map((item) => (
            <option key={item.id} value={String(item.id)}>
              {item.name} 
            </option>
          ))}
        </Select>
        {loadError ? (
          <p className="text-sm text-red-600">{loadError}</p>
        ) : null}
        {!isLoadingInvestments && !loadError && investments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay inversiones registradas.
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="movement-type">Tipo de movimiento</Label>
        <Select
          id="movement-type"
          required
          disabled={formDisabled}
          value={movementType}
          onChange={(event) => setMovementType(event.target.value)}
        >
          <option value="" disabled>
            Selecciona un tipo
          </option>
          {MOVEMENT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">{amountLabel}</Label>
        <CurrencyInput
          id="amount"
          required
          disabled={formDisabled}
          placeholder={
            movementType === "value_update"
              ? formatCurrencyInputValue(130_500_000)
              : formatCurrencyInputValue(500)
          }
          value={amount}
          onValueChange={setAmount}
        />
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
          disabled={formDisabled || investments.length === 0}
          className="w-full sm:w-auto sm:min-w-[120px]"
        >
          {isSubmitting ? "Enviando…" : "Enviar"}
        </Button>
      </div>
    </form>
  );
}
