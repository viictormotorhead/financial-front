"use client";

import { useCallback, useRef, useState } from "react";

import { useToast } from "@/components/ui/toast";
import { formatCurrency } from "@/lib/utils";
import { createInvestment } from "../services/investments-service";
import type { CreateInvestmentPayload } from "../types";

import { CreateInvestmentButton } from "./create-investment-button";
import { InvestmentCreateModal } from "./investment-create-modal";

type CreateInvestmentTriggerProps = Readonly<{
  onCreated?: () => void;
  className?: string;
}>;

export function CreateInvestmentTrigger({
  onCreated,
  className,
}: CreateInvestmentTriggerProps) {
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
    if (ignoreBackdropCloseRef.current || isSubmitting) return;
    closeModal();
  }, [closeModal, isSubmitting]);

  const handleSubmit = useCallback(
    async (payload: CreateInvestmentPayload) => {
      setIsSubmitting(true);
      try {
        await createInvestment(payload);
        toast.success(
          `${payload.name} creada con saldo ${formatCurrency(payload.balance)}.`,
        );
        setOpen(false);
        onCreated?.();
      } catch (error) {
        const message =
          error instanceof Error && error.message
            ? error.message
            : "No se pudo crear la inversión. Intenta de nuevo.";
        toast.error(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onCreated, toast],
  );

  return (
    <>
      <CreateInvestmentButton onClick={openModal} className={className} />
      <InvestmentCreateModal
        open={open}
        onClose={handleRequestClose}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
