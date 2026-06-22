import { useMemo } from "react";
import { calculateLoanSummary } from "../lib/finance";
import type { LoanInput, LoanSummary } from "../lib/types";

export function useLoanSummary(loan: LoanInput): LoanSummary {
  return useMemo(() => calculateLoanSummary(loan), [loan]);
}
