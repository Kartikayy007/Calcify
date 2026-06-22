import { useMemo } from "react";
import { generateAmortizationSchedule, findBreakEvenMonth } from "../lib/finance";
import type { LoanInput, ScheduleRow } from "../lib/types";

export function useAmortization(loan: LoanInput): {
  rows: ScheduleRow[];
  breakEvenMonth: number | null;
} {
  const rows = useMemo(() => generateAmortizationSchedule(loan), [loan]);
  const breakEvenMonth = useMemo(() => findBreakEvenMonth(rows), [rows]);
  return { rows, breakEvenMonth };
}
