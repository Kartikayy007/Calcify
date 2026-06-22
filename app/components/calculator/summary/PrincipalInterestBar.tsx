import { formatCurrency } from "../../../lib/format";
import type { LoanSummary } from "../../../lib/types";

export function PrincipalInterestBar({ summary, principal }: { summary: LoanSummary; principal: number }) {
  return (
    <div className="clay-card p-4 rounded-[1.5rem] flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#7286C9] shadow-[0_0_8px_rgba(114,134,201,0.6)]"></span>
            <span className="text-xs font-bold tracking-wider text-foreground uppercase">Principal</span>
            <span className="text-xs font-bold text-muted-foreground">{summary.principalShare.toFixed(1)}%</span>
          </div>
          <span className="text-base sm:text-lg md:text-xl font-bold text-foreground mt-1 flex items-center">
            {formatCurrency(principal)}
          </span>
        </div>
        <div className="flex flex-col gap-1 sm:items-end sm:text-right">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">{summary.interestShare.toFixed(1)}%</span>
            <span className="text-xs font-bold tracking-wider text-foreground uppercase">Interest</span>
            <span className="w-3 h-3 rounded-full bg-[#61CA97] shadow-[0_0_8px_rgba(97,202,151,0.6)]"></span>
          </div>
          <span className="text-base sm:text-lg md:text-xl font-bold text-foreground mt-1 flex items-center sm:justify-end w-full">
            {formatCurrency(summary.totalInterest)}
          </span>
        </div>
      </div>

      <div className="w-full p-1.5 rounded-full flex clay-pill gap-1">
        <div 
          className="h-4 rounded-full bg-[#7286C9] shadow-[0_0_10px_rgba(114,134,201,0.4)] transition-all duration-500 ease-out"
          style={{ width: `${summary.principalShare}%` }}
        />
        <div 
          className="h-4 rounded-full bg-[#61CA97] shadow-[0_0_10px_rgba(97,202,151,0.4)] transition-all duration-500 ease-out"
          style={{ width: `${summary.interestShare}%` }}
        />
      </div>
    </div>
  );
}
