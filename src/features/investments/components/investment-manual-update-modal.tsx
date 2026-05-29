"use client";

import { Modal } from "@/components/ui/modal";
import type { ManualInvestmentUpdate } from "../types";

import { InvestmentManualUpdateForm } from "./investment-manual-update-form";

type InvestmentManualUpdateModalProps = Readonly<{
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: ManualInvestmentUpdate) => void | Promise<void>;
  isSubmitting?: boolean;
}>;

export function InvestmentManualUpdateModal({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
}: InvestmentManualUpdateModalProps) {
  const handleSubmit = (payload: ManualInvestmentUpdate) => {
    void onSubmit(payload);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Actualizar inversión"
      description="Registra un movimiento o actualiza el valor manualmente."
    >
      <InvestmentManualUpdateForm
        open={open}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
