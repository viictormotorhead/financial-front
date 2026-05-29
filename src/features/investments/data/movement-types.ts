import type { ManualInvestmentMovementTypeOption } from "../types";

export const MOVEMENT_TYPE_OPTIONS: ManualInvestmentMovementTypeOption[] = [
  { value: "value_update", label: "Actualización de valor" },
  { value: "deposit", label: "Depósito" },
  { value: "withdrawal", label: "Retiro" },
];
