"use client";

import { NumberSliderField } from "../../ui/NumberSliderField";
import { LOAN_LIMITS } from "../../../lib/finance";
import type { LoanInput } from "../../../lib/types";

interface LoanDetailsPanelProps {
  loan: LoanInput;
  onLoanChange: (loan: LoanInput) => void;
}

export function LoanDetailsPanel({ loan, onLoanChange }: LoanDetailsPanelProps) {
  return (
    <div className="clay-card p-6 md:p-8 rounded-[2rem] w-full h-full flex flex-col gap-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">Loan Details</h2>
        <p className="text-muted-foreground font-semibold">Adjust and watch every tab update.</p>
      </div>

      <div className="flex flex-col gap-8">
        <NumberSliderField
          label="Loan Amount"
          value={loan.amount}
          min={LOAN_LIMITS.amount.min}
          max={LOAN_LIMITS.amount.max}
          step={LOAN_LIMITS.amount.step}
          onChange={(val) => onLoanChange({ ...loan, amount: val })}
          prefix="₹"
          minLabel="₹10K"
          maxLabel="₹50L"
        />

        <NumberSliderField
          label="Interest Rate (P.A.)"
          value={loan.annualRate}
          min={LOAN_LIMITS.annualRate.min}
          max={LOAN_LIMITS.annualRate.max}
          step={LOAN_LIMITS.annualRate.step}
          onChange={(val) => onLoanChange({ ...loan, annualRate: val })}
          suffix="%"
          minLabel="1%"
          maxLabel="36%"
        />

        <NumberSliderField
          label="Tenure"
          value={loan.tenureMonths}
          min={LOAN_LIMITS.tenureMonths.min}
          max={LOAN_LIMITS.tenureMonths.max}
          step={LOAN_LIMITS.tenureMonths.step}
          onChange={(val) => onLoanChange({ ...loan, tenureMonths: val })}
          minLabel="1 mo"
          maxLabel="84 mo"
          suffix="mo"
        />
      </div>
    </div>
  );
}
