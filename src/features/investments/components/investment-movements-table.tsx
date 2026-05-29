import { MOVEMENT_TYPE_OPTIONS } from "../data/movement-types";
import { formatYmdMedium } from "@/lib/date-local";
import { formatCurrency } from "@/lib/utils";
import type { InvestmentMovementRecord } from "../types";

type InvestmentMovementsTableProps = Readonly<{
  movements: readonly InvestmentMovementRecord[];
}>;

function movementLabel(type: string): string {
  const known = MOVEMENT_TYPE_OPTIONS.find((option) => option.value === type);
  if (known) return known.label;
  return type.replaceAll("_", " ");
}

export function InvestmentMovementsTable({
  movements,
}: InvestmentMovementsTableProps) {
  if (movements.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-zinc-500">
        No hay movimientos en este periodo.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-100 text-xs font-medium uppercase tracking-wide text-zinc-500">
            <th className="px-1 py-2 font-medium">Fecha</th>
            <th className="px-1 py-2 font-medium">Tipo</th>
            <th className="px-1 py-2 text-right font-medium">Monto</th>
            <th className="px-1 py-2 text-right font-medium">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement, index) => (
            <tr
              key={movement.id ?? `${movement.date}-${movement.type}-${index}`}
              className="border-b border-zinc-50 last:border-0"
            >
              <td className="px-1 py-3 tabular-nums text-zinc-700">
                {formatYmdMedium(movement.date)}
              </td>
              <td className="px-1 py-3 text-zinc-900">{movementLabel(movement.type)}</td>
              <td className="px-1 py-3 text-right tabular-nums text-zinc-700">
                {movement.amount !== undefined
                  ? formatCurrency(movement.amount)
                  : "—"}
              </td>
              <td className="px-1 py-3 text-right tabular-nums font-medium text-zinc-900">
                {movement.balanceAfter !== undefined
                  ? formatCurrency(movement.balanceAfter)
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
