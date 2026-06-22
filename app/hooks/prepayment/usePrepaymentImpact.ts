import { useMemo } from "react";
import type { LoanInput, Prepayment } from "../../lib/types";
import { calculatePrepaymentImpact } from "../../lib/prepayment";

export function usePrepaymentImpact(loan: LoanInput, prepayments: Prepayment[]) {
  return useMemo(
    () => calculatePrepaymentImpact(loan, prepayments),
    [loan, prepayments]
  );
}
