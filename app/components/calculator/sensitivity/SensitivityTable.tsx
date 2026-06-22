import React, { memo } from "react";
import { formatCurrency, formatTenureLabel, formatPercent } from "../../../lib/format";
import type { SensitivityGrid } from "../../../lib/types";

export const SensitivityTable = memo(function SensitivityTable({ grid }: { grid: SensitivityGrid }) {
  return (
    <div className="clay-card p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] w-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">Sensitivity Analysis</h2>
        <p className="text-muted-foreground font-semibold">
          EMI across rate × tenure = current values highlighted.
        </p>
      </div>

      <div className="w-full overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 [scrollbar-width:thin]">
        <p className="text-xs text-muted-foreground md:hidden mb-2 font-medium">Swipe table to see more →</p>
        <div className="min-w-[500px] flex flex-col">
          <div className="grid" style={{ gridTemplateColumns: `100px repeat(${grid.rates.length}, 1fr)` }}>
            <div className="p-3 border-b border-r border-black/10 dark:border-white/10"></div>
            {grid.rates.map((rate, i) => (
              <div 
                key={`rate-${i}`} 
                className="p-3 font-bold text-sm text-center text-foreground border-b border-black/10 dark:border-white/10"
              >
                {formatPercent(rate)}
              </div>
            ))}

            {grid.values.map((row, i) => (
              <React.Fragment key={`row-${i}`}>
                <div className="p-3 font-bold text-sm flex items-center justify-start text-foreground border-r border-black/10 dark:border-white/10 whitespace-nowrap">
                  {formatTenureLabel(row.tenure)}
                </div>
                
                {row.cells.map((cell, j) => (
                  <div 
                    key={`cell-${i}-${j}`} 
                    className={`p-3 text-sm font-medium flex items-center justify-center transition-all ${
                      cell.isCurrent 
                        ? "clay-pill !bg-emerald-500/20 text-emerald-950 dark:text-emerald-300 rounded-md font-bold" 
                        : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-md"
                    }`}
                  >
                    {formatCurrency(cell.emi)}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
