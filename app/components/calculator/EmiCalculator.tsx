"use client";

import { useState } from "react";
import { useLoanSummary } from "../../hooks/useLoanSummary";
import { useSensitivityGrid } from "../../hooks/useSensitivityGrid";
import { LoanDetailsPanel } from "./loan-details/LoanDetailsPanel";
import { SummaryCards } from "./summary/SummaryCards";
import { PrincipalInterestBar } from "./summary/PrincipalInterestBar";
import { SensitivityTable } from "./sensitivity/SensitivityTable";
import { AmortizationSection } from "./amortization/AmortizationSection";
import type { LoanInput } from "../../lib/types";

const DEFAULT_LOAN: LoanInput = {
  amount: 1500000,
  annualRate: 11,
  tenureMonths: 48,
};

export function EmiCalculator() {
  const [loan, setLoan] = useState<LoanInput>(DEFAULT_LOAN);
  const summary = useLoanSummary(loan);
  const sensitivity = useSensitivityGrid(loan);

  return (
    <div className="flex flex-col gap-6 w-full">
      <section className="grid xl:grid-cols-[minmax(320px,400px)_1fr] gap-6 w-full items-stretch">
        <LoanDetailsPanel loan={loan} onLoanChange={setLoan} />
        <div className="flex flex-col gap-4 lg:gap-6 w-full">
          <div className="flex flex-col gap-4 w-full shrink-0">
            <SummaryCards summary={summary} />
            <PrincipalInterestBar summary={summary} principal={loan.amount} />
          </div>
          <SensitivityTable grid={sensitivity} />
        </div>
      </section>
      <AmortizationSection loan={loan} />
    </div>
  );
}

