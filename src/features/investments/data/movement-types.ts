import type { InvestmentMovementTypeOption } from "../types";

export const MOVEMENT_TYPE_OPTIONS: InvestmentMovementTypeOption[] = [
  { value: "contribution", label: "Aporte" },
  { value: "withdrawal", label: "Retiro" },
  { value: "purchase", label: "Compra" },
  { value: "sale", label: "Venta" },
  { value: "value_update", label: "Actualización de valor" },
  { value: "dividend", label: "Dividendo" },
];
