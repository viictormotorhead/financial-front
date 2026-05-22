export const OPEN_INVESTMENT_UPDATE_MODAL_EVENT =
  "mi-finanzas:open-investment-update-modal";

export function openInvestmentUpdateModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_INVESTMENT_UPDATE_MODAL_EVENT));
}
