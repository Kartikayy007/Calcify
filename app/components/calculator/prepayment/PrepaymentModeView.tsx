import type { LoanInput, Prepayment, ScheduleView } from "../../../lib/types";
import { LoanDetailsPanel } from "../loan-details/LoanDetailsPanel";
import { PrepaymentPlanner } from "./PrepaymentPlanner";
import { AmortizationSection } from "../amortization/AmortizationSection";
import { usePrepaymentImpact } from "../../../hooks/prepayment/usePrepaymentImpact";

interface PrepaymentModeViewProps {
  loan: LoanInput;
  onLoanChange: (loan: LoanInput) => void;
  prepayments: Prepayment[];
  onAddPrepayment: () => void;
  onUpdatePrepayment: (id: string, patch: Partial<Prepayment>) => void;
  onRemovePrepayment: (id: string) => void;
  scheduleView: ScheduleView;
  schedulePage: number;
  onScheduleViewChange: (view: ScheduleView) => void;
  onSchedulePageChange: (page: number) => void;
}

export function PrepaymentModeView({
  loan,
  onLoanChange,
  prepayments,
  onAddPrepayment,
  onUpdatePrepayment,
  onRemovePrepayment,
  scheduleView,
  schedulePage,
  onScheduleViewChange,
  onSchedulePageChange
}: PrepaymentModeViewProps) {
  const impact = usePrepaymentImpact(loan, prepayments);

  return (
    <div className="flex flex-col gap-6 w-full">
      <section className="grid xl:grid-cols-[minmax(320px,400px)_1fr] gap-6 items-stretch min-w-0">
        <div className="min-w-0">
          <LoanDetailsPanel loan={loan} onLoanChange={onLoanChange} />
        </div>
        <div className="min-w-0">
          <PrepaymentPlanner
            loan={loan}
            prepayments={prepayments}
            impact={impact}
            onAdd={onAddPrepayment}
            onUpdate={onUpdatePrepayment}
            onRemove={onRemovePrepayment}
          />
        </div>
      </section>
      <AmortizationSection 
        loan={loan} 
        prepayments={prepayments} 
        view={scheduleView}
        page={schedulePage}
        onViewChange={onScheduleViewChange}
        onPageChange={onSchedulePageChange}
      />
    </div>
  );
}
