"use client";

import { useLoanSummary } from "../../hooks/useLoanSummary";
import { useSensitivityGrid } from "../../hooks/useSensitivityGrid";
import { LoanDetailsPanel } from "./loan-details/LoanDetailsPanel";
import { SummaryCards } from "./summary/SummaryCards";
import { PrincipalInterestBar } from "./summary/PrincipalInterestBar";
import { SensitivityTable } from "./sensitivity/SensitivityTable";
import { AmortizationSection } from "./amortization/AmortizationSection";
import type { LoanInput, ScheduleView } from "../../lib/types";

interface EmiCalculatorProps {
  loan: LoanInput;
  onLoanChange: (loan: LoanInput) => void;
  scheduleView: ScheduleView;
  schedulePage: number;
  onScheduleViewChange: (view: ScheduleView) => void;
  onSchedulePageChange: (page: number) => void;
}

export function EmiCalculator({ loan, onLoanChange, scheduleView, schedulePage, onScheduleViewChange, onSchedulePageChange }: EmiCalculatorProps) {
  const summary = useLoanSummary(loan);
  const sensitivity = useSensitivityGrid(loan);

  return (
    <div className="flex flex-col gap-6 w-full">
      <section className="grid xl:grid-cols-[minmax(320px,400px)_1fr] gap-6 w-full items-stretch min-w-0">
        <div className="min-w-0">
          <LoanDetailsPanel loan={loan} onLoanChange={onLoanChange} />
        </div>
        <div className="flex flex-col gap-4 lg:gap-6 w-full min-w-0">
          <div className="flex flex-col gap-4 w-full shrink-0">
            <SummaryCards summary={summary} />
            <PrincipalInterestBar summary={summary} principal={loan.amount} />
          </div>
          <SensitivityTable grid={sensitivity} />
        </div>
      </section>
      <AmortizationSection 
        loan={loan} 
        view={scheduleView}
        page={schedulePage}
        onViewChange={onScheduleViewChange}
        onPageChange={onSchedulePageChange}
      />
    </div>
  );
}
