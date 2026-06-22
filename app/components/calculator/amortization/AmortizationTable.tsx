import { formatCurrency } from "../../../lib/format";
import type { ScheduleRow } from "../../../lib/types";

const ROWS_PER_PAGE = 12;

interface AmortizationTableProps {
  rows: ScheduleRow[];
  breakEvenMonth: number | null;
  page: number;
  onPageChange: (page: number) => void;
}

export function AmortizationTable({ rows, breakEvenMonth, page, onPageChange }: AmortizationTableProps) {
  const totalPages = Math.ceil(rows.length / ROWS_PER_PAGE);
  const start = page * ROWS_PER_PAGE;
  const pageRows = rows.slice(start, start + ROWS_PER_PAGE);

  return (
    <div className="flex flex-col gap-4">
      {breakEvenMonth !== null && (
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
          Break-even at month {breakEvenMonth} — cumulative principal exceeds cumulative interest
        </div>
      )}

      <div className="w-full overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 [scrollbar-width:thin]">
        <p className="text-xs text-muted-foreground md:hidden mb-2 font-medium">Swipe table to see more →</p>
        <table className="min-w-[760px] w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="border-b border-black/10 dark:border-white/10 py-3 px-4 text-left font-bold text-foreground/60 tracking-wider uppercase text-xs">Month</th>
              <th className="border-b border-black/10 dark:border-white/10 py-3 px-4 text-right font-bold text-foreground/60 tracking-wider uppercase text-xs">EMI</th>
              <th className="border-b border-black/10 dark:border-white/10 py-3 px-4 text-right font-bold text-[#7286C9] tracking-wider uppercase text-xs">Principal</th>
              <th className="border-b border-black/10 dark:border-white/10 py-3 px-4 text-right font-bold text-[#61CA97] tracking-wider uppercase text-xs">Interest</th>
              <th className="border-b border-black/10 dark:border-white/10 py-3 px-4 text-right font-bold text-foreground/60 tracking-wider uppercase text-xs">Prepayment</th>
              <th className="border-b border-black/10 dark:border-white/10 py-3 px-4 text-right font-bold text-foreground/60 tracking-wider uppercase text-xs">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr aria-hidden="true">
              <td colSpan={6} className="h-2"></td>
            </tr>
            {pageRows.map((row) => {
              const isBreakEven = row.month === breakEvenMonth;
              return (
                <tr
                  key={row.month}
                  className={`transition-colors group ${
                    isBreakEven
                      ? "relative z-10"
                      : "hover:bg-black/3 dark:hover:bg-white/3"
                  }`}
                >
                  <td className={`py-3 px-4 font-semibold text-foreground ${isBreakEven ? "bg-emerald-500/10 rounded-l-xl" : "border-b border-black/5 dark:border-white/5"}`}>
                    <div className="flex items-center gap-2">
                      {row.month}
                      {isBreakEven && (
                        <span className="text-[10px] font-extrabold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                          B/E
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={`py-3 px-4 text-right font-medium text-foreground ${isBreakEven ? "bg-emerald-500/10" : "border-b border-black/5 dark:border-white/5"}`}>{formatCurrency(row.emi)}</td>
                  <td className={`py-3 px-4 text-right font-semibold text-[#7286C9] ${isBreakEven ? "bg-emerald-500/10" : "border-b border-black/5 dark:border-white/5"}`}>{formatCurrency(row.principalPaid)}</td>
                  <td className={`py-3 px-4 text-right font-semibold text-[#61CA97] ${isBreakEven ? "bg-emerald-500/10" : "border-b border-black/5 dark:border-white/5"}`}>{formatCurrency(row.interestPaid)}</td>
                  <td className={`py-3 px-4 text-right font-medium text-muted-foreground ${isBreakEven ? "bg-emerald-500/10" : "border-b border-black/5 dark:border-white/5"}`}>
                    {row.prepaymentApplied > 0 ? formatCurrency(row.prepaymentApplied) : "—"}
                  </td>
                  <td className={`py-3 px-4 text-right font-medium text-foreground ${isBreakEven ? "bg-emerald-500/10 rounded-r-xl" : "border-b border-black/5 dark:border-white/5"}`}>{formatCurrency(row.balanceRemaining)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between pt-2">
        <span className="text-xs text-muted-foreground font-semibold text-center sm:text-left">
          Showing {start + 1}–{Math.min(start + ROWS_PER_PAGE, rows.length)} of {rows.length} months
        </span>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
            className="clay-btn px-4 py-1.5 rounded-full text-sm font-bold text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all w-full sm:w-auto"
          >
            ← Prev
          </button>
          <span className="text-sm font-bold text-foreground/60 whitespace-nowrap">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages - 1}
            className="clay-btn px-4 py-1.5 rounded-full text-sm font-bold text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all w-full sm:w-auto"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
