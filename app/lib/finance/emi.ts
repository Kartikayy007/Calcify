import type { LoanInput, LoanSummary } from "../types";
import { LOAN_LIMITS, clamp, roundTo } from "./limits";

export function clampLoanInput(input: LoanInput): LoanInput {
  return {
    amount: clamp(Math.round(input.amount), LOAN_LIMITS.amount.min, LOAN_LIMITS.amount.max),
    annualRate: roundTo(clamp(input.annualRate, LOAN_LIMITS.annualRate.min, LOAN_LIMITS.annualRate.max), 2),
    tenureMonths: clamp(Math.round(input.tenureMonths), LOAN_LIMITS.tenureMonths.min, LOAN_LIMITS.tenureMonths.max),
  };
}

export function monthlyRate(annualRate: number) {
  return annualRate / 12 / 100;
}

export function calculateEmi(input: LoanInput): number {
  const loan = clampLoanInput(input);
  const rate = monthlyRate(loan.annualRate);

  if (rate === 0) {
    return loan.amount / loan.tenureMonths;
  }

  const growth = (1 + rate) ** loan.tenureMonths;
  return (loan.amount * rate * growth) / (growth - 1);
}

export function calculateLoanSummary(input: LoanInput): LoanSummary {
  const loan = clampLoanInput(input);
  const emi = calculateEmi(loan);
  const totalPayable = emi * loan.tenureMonths;
  const totalInterest = totalPayable - loan.amount;

  return {
    emi,
    totalInterest,
    totalPayable,
    principalShare: (loan.amount / totalPayable) * 100,
    interestShare: (totalInterest / totalPayable) * 100,
  };
}
