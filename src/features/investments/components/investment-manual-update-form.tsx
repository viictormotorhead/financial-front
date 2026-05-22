"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { MOCK_GROWTH_RANKING } from "../data/mock-investments";
import { MOVEMENT_TYPE_OPTIONS } from "../data/movement-types";
import type { ManualInvestmentUpdate } from "../types";

type InvestmentManualUpdateFormProps = Readonly<{
  onSubmit: (payload: ManualInvestmentUpdate) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}>;

const EMPTY_FORM = {
  investmentId: "",
  movementType: "",
  amount: "",
} as const;

export function InvestmentManualUpdateForm({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: InvestmentManualUpdateFormProps) {
  const [investmentId, setInvestmentId] = useState("");
  const [movementType, setMovementType] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedAmount = Number.parseFloat(amount.replace(",", "."));
    if (!investmentId || !movementType || Number.isNaN(parsedAmount)) return;

    onSubmit({
      investmentId,
      movementType: movementType as ManualInvestmentUpdate["movementType"],
      amount: parsedAmount,
    });

    setInvestmentId(EMPTY_FORM.investmentId);
    setMovementType(EMPTY_FORM.movementType);
    setAmount(EMPTY_FORM.amount);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="investment-id">Inversión</Label>
        <Select
          id="investment-id"
          required
          disabled={isSubmitting}
          value={investmentId}
          onChange={(event) => setInvestmentId(event.target.value)}
        >
          <option value="" disabled>
            Selecciona una inversión
          </option>
          {MOCK_GROWTH_RANKING.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.ticker})
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="movement-type">Tipo de movimiento</Label>
        <Select
          id="movement-type"
          required
          disabled={isSubmitting}
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
        <Label htmlFor="amount">Valor</Label>
        <Input
          id="amount"
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0"
          required
          disabled={isSubmitting}
          placeholder="1000.10"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
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
          disabled={isSubmitting}
          className="w-full sm:w-auto sm:min-w-[120px]"
        >
          {isSubmitting ? "Enviando…" : "Enviar"}
        </Button>
      </div>
    </form>
  );
}
