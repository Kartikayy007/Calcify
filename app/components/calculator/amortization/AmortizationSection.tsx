"use client";

import { useState, useEffect } from "react";
import { useAmortization } from "../../../hooks/useAmortization";
import { AmortizationTable } from "./AmortizationTable";
import { AmortizationChart } from "./AmortizationChart";
import type { LoanInput, ScheduleView } from "../../../lib/types";

interface AmortizationSectionProps {
  loan: LoanInput;
}

export function AmortizationSection({ loan }: AmortizationSectionProps) {
  const { rows, breakEvenMonth } = useAmortization(loan);
  const [view, setView] = useState<ScheduleView>("table");
  const [page, setPage] = useState(0);

  useEffect(() => { setPage(0); }, [loan]);

  return (
    <div className="clay-card p-6 md:p-8 rounded-[2rem] w-full flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground mb-1">Amortization Schedule</h2>
          <p className="text-muted-foreground font-semibold">Month-by-month principal &amp; interest breakdown</p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center p-1.5 rounded-full clay-pill relative">
            <div
              className="absolute top-1.5 bottom-1.5 w-[72px] clay-btn rounded-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"
              style={{ transform: `translateX(${view === "table" ? 0 : 72}px)` }}
            />
            <button
              onClick={() => setView("table")}
              className={`relative z-10 w-[72px] text-center py-1.5 text-sm font-bold rounded-full transition-colors duration-300 ${view === "table" ? "text-emerald-500" : "text-muted-foreground"}`}
            >
              Table
            </button>
            <button
              onClick={() => setView("chart")}
              className={`relative z-10 w-[72px] text-center py-1.5 text-sm font-bold rounded-full transition-colors duration-300 ${view === "chart" ? "text-emerald-500" : "text-muted-foreground"}`}
            >
              Chart
            </button>
          </div>
        </div>
      </div>

      {view === "table" ? (
        <AmortizationTable
          rows={rows}
          breakEvenMonth={breakEvenMonth}
          page={page}
          onPageChange={setPage}
        />
      ) : (
        <AmortizationChart rows={rows} />
      )}
    </div>
  );
}
