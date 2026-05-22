"use client";

import { useEffect } from "react";

import {
  OPEN_INVESTMENT_UPDATE_MODAL_EVENT,
  openInvestmentUpdateModal,
} from "../lib/open-investment-update-modal";

export function useOpenInvestmentUpdateModalListener(onOpen: () => void) {
  useEffect(() => {
    const handler = () => onOpen();

    window.addEventListener(OPEN_INVESTMENT_UPDATE_MODAL_EVENT, handler);
    return () =>
      window.removeEventListener(OPEN_INVESTMENT_UPDATE_MODAL_EVENT, handler);
  }, [onOpen]);
}

export { openInvestmentUpdateModal };
