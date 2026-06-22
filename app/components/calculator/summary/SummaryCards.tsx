import NumberFlow from "@number-flow/react";
import { formatCurrency } from "../../../lib/format";
import type { LoanSummary } from "../../../lib/types";

export function SummaryCards({ summary }: { summary: LoanSummary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="clay-card p-4 rounded-2xl flex flex-col justify-center items-start">
        <h3 className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-1">
          Monthly EMI
        </h3>
        <div className="text-xl lg:text-2xl font-extrabold text-emerald-500 tracking-tight flex items-center">
          <span>₹</span>
          <NumberFlow 
            value={summary.emi} 
            format={{ maximumFractionDigits: 0 }} 
          />
        </div>
      </div>

      <div className="clay-card p-4 rounded-2xl flex flex-col justify-center items-start">
        <h3 className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-1">
          Total Interest
        </h3>
        <div className="text-lg lg:text-xl font-extrabold text-foreground tracking-tight flex items-center">
          {formatCurrency(summary.totalInterest)}
        </div>
      </div>

      <div className="clay-card p-4 rounded-2xl flex flex-col justify-center items-start">
        <h3 className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-1">
          Total Payable
        </h3>
        <div className="text-lg lg:text-xl font-extrabold text-foreground tracking-tight flex items-center">
          {formatCurrency(summary.totalPayable)}
        </div>
      </div>
    </div>
  );
}
