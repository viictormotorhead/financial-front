"use client";

import { Modal } from "@/components/ui/modal";
import type { CreateInvestmentPayload } from "../types";

import { InvestmentCreateForm } from "./investment-create-form";

type InvestmentCreateModalProps = Readonly<{
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateInvestmentPayload) => void | Promise<void>;
  isSubmitting?: boolean;
}>;

export function InvestmentCreateModal({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
}: InvestmentCreateModalProps) {
  const handleSubmit = (payload: CreateInvestmentPayload) => {
    void onSubmit(payload);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nueva inversión"
      description="Registra una inversión con su saldo inicial y tags opcionales."
    >
      <InvestmentCreateForm
        open={open}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
