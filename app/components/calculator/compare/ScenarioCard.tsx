import type { ComparisonScenario, LoanSummary, LoanInput } from "../../../lib/types";
import { ScenarioInputs } from "./ScenarioInputs";
import { ScenarioMetrics } from "./ScenarioMetrics";
import { BestScenarioBadge } from "./BestScenarioBadge";

interface ScenarioCardProps {
  scenario: ComparisonScenario;
  summary: Pick<LoanSummary, "emi" | "totalInterest" | "totalPayable">;
  isBest: boolean;
  isActive: boolean;
  onFocus: () => void;
  onInputChange: (field: keyof LoanInput, value: number) => void;
  onDelete?: () => void;
}

export function ScenarioCard({ scenario, summary, isBest, isActive, onFocus, onInputChange, onDelete }: ScenarioCardProps) {
  return (
    <div
      className={`clay-card h-full p-5 rounded-3xl flex flex-col gap-5 transition-all duration-500 ease-out cursor-default relative mt-4
        ${isBest ? "ring-2 ring-emerald-500/50" : ""}
      `}
      onClick={onFocus}
    >
      <BestScenarioBadge visible={isBest} />
      <div className="flex justify-between items-center">
        <div className="clay-btn px-4 py-2 rounded-xl text-sm font-bold text-foreground pointer-events-none">
          {scenario.name}
        </div>
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 text-muted-foreground hover:bg-rose-500 hover:text-white transition-colors"
            title="Delete scenario"
          >
            ✕
          </button>
        )}
      </div>

      <ScenarioInputs input={scenario.input} onChange={onInputChange} />
      <ScenarioMetrics summary={summary} />
    </div>
  );
}
