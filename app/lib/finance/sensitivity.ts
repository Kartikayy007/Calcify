import type { LoanInput, SensitivityGrid } from "../types";
import { LOAN_LIMITS, clamp, roundTo } from "./limits";
import { calculateEmi, clampLoanInput } from "./emi";

const RATE_OFFSETS = [-3, -2, -1, 0, 1, 2, 3];
const TENURE_OFFSETS = [-24, -12, -6, 0, 6, 12, 24];

function uniqueSorted(values: number[]) {
  return Array.from(new Set(values)).sort((a, b) => a - b);
}

export function generateSensitivityGrid(input: LoanInput): SensitivityGrid {
  const loan = clampLoanInput(input);
  const rates = uniqueSorted(
    RATE_OFFSETS.map((offset) =>
      roundTo(clamp(loan.annualRate + offset, LOAN_LIMITS.annualRate.min, LOAN_LIMITS.annualRate.max), 2)
    )
  );
  const tenures = uniqueSorted(
    TENURE_OFFSETS.map((offset) =>
      clamp(loan.tenureMonths + offset, LOAN_LIMITS.tenureMonths.min, LOAN_LIMITS.tenureMonths.max)
    )
  );

  return {
    rates,
    tenures,
    values: tenures.map((tenure) => ({
      tenure,
      cells: rates.map((rate) => ({
        rate,
        emi: calculateEmi({ amount: loan.amount, annualRate: rate, tenureMonths: tenure }),
        isCurrent: rate === loan.annualRate && tenure === loan.tenureMonths,
      })),
    })),
  };
}
