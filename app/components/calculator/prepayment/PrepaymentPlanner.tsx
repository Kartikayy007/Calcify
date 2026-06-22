import type { Prepayment, LoanInput } from "../../../lib/types";
import type { PrepaymentImpact } from "../../../lib/prepayment";
import { PrepaymentList } from "./PrepaymentList";
import { PrepaymentImpactCards } from "./PrepaymentImpactCards";
import { AddPrepaymentButton } from "./AddPrepaymentButton";

interface PrepaymentPlannerProps {
  prepayments: Prepayment[];
  loan: LoanInput;
  impact: Pick<PrepaymentImpact, "newTenure" | "tenureReduced" | "interestSaved">;
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<Prepayment>) => void;
  onRemove: (id: string) => void;
}

export function PrepaymentPlanner({ prepayments, loan, impact, onAdd, onUpdate, onRemove }: PrepaymentPlannerProps) {
  return (
    <div className="clay-card p-6 md:p-8 rounded-[2rem] flex flex-col gap-8 w-full h-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">Prepayment Planner</h2>
        <p className="text-sm font-semibold text-muted-foreground">Schedule lump-sum payments and instantly see their impact.</p>
      </div>

      <PrepaymentImpactCards
        newTenure={impact.newTenure}
        tenureReduced={impact.tenureReduced}
        interestSaved={impact.interestSaved}
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-bold text-foreground">Scheduled Prepayments</h3>
          <AddPrepaymentButton onClick={onAdd} disabled={prepayments.length >= loan.tenureMonths} />
        </div>
        <PrepaymentList
          prepayments={prepayments}
          maxMonth={loan.tenureMonths}
          onChange={onUpdate}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
}
