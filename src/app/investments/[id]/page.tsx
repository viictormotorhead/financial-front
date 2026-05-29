"use client";

import { useParams } from "next/navigation";

import { InvestmentDetailPage } from "@/features/investments/components/investment-detail-page";

export default function InvestmentDetailRoutePage() {
  const params = useParams();
  const rawId = params.id;
  const investmentId = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!investmentId) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-sm text-zinc-500">Inversión no encontrada.</p>
      </main>
    );
  }

  return <InvestmentDetailPage investmentId={investmentId} />;
}
