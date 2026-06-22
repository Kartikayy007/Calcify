import { useMemo } from "react";
import { generateAmortizationSchedule, findBreakEvenMonth } from "../lib/finance";
import type { LoanInput, ScheduleRow, Prepayment } from "../lib/types";

export function useAmortization(loan: LoanInput, prepayments: Prepayment[] = []): {
  rows: ScheduleRow[];
  breakEvenMonth: number | null;
} {
  const rows = useMemo(() => generateAmortizationSchedule(loan, prepayments), [loan, prepayments]);
  const breakEvenMonth = useMemo(() => findBreakEvenMonth(rows), [rows]);
  return { rows, breakEvenMonth };
}
