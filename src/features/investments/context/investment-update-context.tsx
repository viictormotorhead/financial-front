"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useToast } from "@/components/ui/toast";
import { MOCK_GROWTH_RANKING } from "../data/mock-investments";
import { MOVEMENT_TYPE_OPTIONS } from "../data/movement-types";
import { useOpenInvestmentUpdateModalListener } from "../hooks/use-open-investment-update-modal";
import { submitManualInvestmentUpdate } from "../services/investments-service";
import type { ManualInvestmentUpdate } from "../types";
import { formatCurrency } from "@/lib/utils";
import { InvestmentManualUpdateModal } from "../components/investment-manual-update-modal";

type InvestmentUpdateContextValue = Readonly<{
  openModal: () => void;
}>;

const InvestmentUpdateContext =
  createContext<InvestmentUpdateContextValue | null>(null);

function buildSuccessMessage(payload: ManualInvestmentUpdate) {
  const investment = MOCK_GROWTH_RANKING.find(
    (item) => item.id === payload.investmentId,
  );
  const movement = MOVEMENT_TYPE_OPTIONS.find(
    (option) => option.value === payload.movementType,
  );

  const name = investment?.name ?? "la inversión";
  const movementLabel = movement?.label ?? "Movimiento";

  return `${movementLabel} de ${formatCurrency(payload.amount)} registrado en ${name}.`;
}

export function InvestmentUpdateProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const isInvestmentsRoute = pathname.startsWith("/investments");
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ignoreBackdropCloseRef = useRef(false);

  const openModal = useCallback(() => {
    setOpen(true);
    ignoreBackdropCloseRef.current = true;
    window.setTimeout(() => {
      ignoreBackdropCloseRef.current = false;
    }, 400);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  const handleRequestClose = useCallback(() => {
    if (ignoreBackdropCloseRef.current) return;
    closeModal();
  }, [closeModal]);

  useOpenInvestmentUpdateModalListener(openModal);

  useEffect(() => {
    if (!isInvestmentsRoute) setOpen(false);
  }, [isInvestmentsRoute]);

  const handleSubmit = useCallback(
    async (payload: ManualInvestmentUpdate) => {
      setIsSubmitting(true);
      try {
        await submitManualInvestmentUpdate(payload);
        toast.success(buildSuccessMessage(payload));
        setOpen(false);
      } catch {
        toast.error("No se pudo guardar la actualización. Intenta de nuevo.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [toast],
  );

  const value = useMemo(() => ({ openModal }), [openModal]);

  return (
    <InvestmentUpdateContext.Provider value={value}>
      {children}
      <InvestmentManualUpdateModal
        open={open}
        onClose={handleRequestClose}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </InvestmentUpdateContext.Provider>
  );
}

export function useInvestmentUpdate() {
  const context = useContext(InvestmentUpdateContext);
  if (!context) {
    throw new Error(
      "useInvestmentUpdate debe usarse dentro de InvestmentUpdateProvider",
    );
  }
  return context;
}
