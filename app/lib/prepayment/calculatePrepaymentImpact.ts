import type { Prepayment, LoanInput, ScheduleRow } from "../types";
import { generateAmortizationSchedule, analyzeSchedule } from "../finance/amortization";
import { sanitizePrepayments } from "./sanitizePrepayment";

export type PrepaymentImpact = {
  baseSchedule: ScheduleRow[];
  adjustedSchedule: ScheduleRow[];
  newTenure: number;
  tenureReduced: number;
  interestSaved: number;
  baseTotalInterest: number;
  adjustedTotalInterest: number;
};

export function calculatePrepaymentImpact(loan: LoanInput, prepayments: Prepayment[]): PrepaymentImpact {
  const baseSchedule = generateAmortizationSchedule(loan, []);
  const sanitized = sanitizePrepayments(prepayments, loan.tenureMonths);
  const adjustedSchedule = generateAmortizationSchedule(loan, sanitized);
  
  const baseAnalysis = analyzeSchedule(baseSchedule);
  const adjustedAnalysis = analyzeSchedule(adjustedSchedule);

  return {
    baseSchedule,
    adjustedSchedule,
    newTenure: adjustedSchedule.length,
    tenureReduced: Math.max(0, loan.tenureMonths - adjustedSchedule.length),
    interestSaved: Math.max(0, baseAnalysis.totalInterest - adjustedAnalysis.totalInterest),
    baseTotalInterest: baseAnalysis.totalInterest,
    adjustedTotalInterest: adjustedAnalysis.totalInterest
  };
}
