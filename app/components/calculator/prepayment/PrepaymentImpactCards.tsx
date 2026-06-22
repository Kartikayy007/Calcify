import { formatCurrency } from "../../../lib/format";
import NumberFlow from "@number-flow/react";

interface PrepaymentImpactCardsProps {
  newTenure: number;
  tenureReduced: number;
  interestSaved: number;
}

export function PrepaymentImpactCards({ newTenure, tenureReduced, interestSaved }: PrepaymentImpactCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <div className="clay-card p-5 rounded-2xl flex flex-col gap-1 items-center justify-center text-center bg-black/5 dark:bg-white/5">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">New Tenure</span>
        <span className="text-2xl font-black text-foreground">{newTenure} mo</span>
      </div>
      <div className="clay-card p-5 rounded-2xl flex flex-col gap-1 items-center justify-center text-center bg-black/5 dark:bg-white/5">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Tenure Reduced</span>
        <span className="text-2xl font-black text-emerald-500">{tenureReduced} mo</span>
      </div>
      <div className="clay-card p-5 rounded-2xl flex flex-col gap-1 items-center justify-center text-center bg-black/5 dark:bg-white/5">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Interest Saved</span>
        <span className="text-2xl font-black text-emerald-500">
          <NumberFlow value={interestSaved} format={{ style: "currency", currency: "INR", maximumFractionDigits: 0 }} />
        </span>
      </div>
    </div>
  );
}
