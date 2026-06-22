import { formatCurrency } from "../../../lib/format";
import type { LoanSummary } from "../../../lib/types";

export function ScenarioMetrics({ summary }: { summary: Pick<LoanSummary, "emi" | "totalInterest" | "totalPayable"> }) {
  return (
    <div className="flex flex-col gap-2 py-3 border-t border-black/5 dark:border-white/5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-muted-foreground">Monthly EMI</span>
        <span className="text-lg font-bold text-foreground">{formatCurrency(summary.emi)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-muted-foreground">Total Interest</span>
        <span className="text-sm font-bold text-rose-500">{formatCurrency(summary.totalInterest)}</span>
      </div>
      <div className="flex justify-between items-center pt-2 mt-1 border-t border-black/5 dark:border-white/5">
        <span className="text-sm font-bold text-foreground">Total Payable</span>
        <span className="text-lg font-extrabold text-foreground">{formatCurrency(summary.totalPayable)}</span>
      </div>
    </div>
  );
}
