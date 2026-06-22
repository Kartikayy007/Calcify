import type { LoanSummary } from "../types";

export function pickBestScenario(
  items: { id: string; summary: Pick<LoanSummary, "emi" | "totalInterest" | "totalPayable"> }[]
): string | null {
  if (items.length === 0) return null;
  
  let bestId = items[0].id;
  let minPayable = items[0].summary.totalPayable;

  for (let i = 1; i < items.length; i++) {
    if (items[i].summary.totalPayable < minPayable) {
      minPayable = items[i].summary.totalPayable;
      bestId = items[i].id;
    }
  }

  return bestId;
}
