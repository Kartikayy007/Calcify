import type { ComparisonScenario, LoanInput } from "../../../lib/types";
import { useCompareAnalysis } from "../../../hooks/compare/useCompareAnalysis";
import { ScenarioCard } from "./ScenarioCard";
import { AddScenarioCard } from "./AddScenarioCard";

interface CompareModeViewProps {
  scenarios: ComparisonScenario[];
  activeScenarioId: string;
  onScenarioChange: (id: string, field: keyof LoanInput, value: number) => void;
  onScenarioFocus: (id: string) => void;
  onAddScenario?: () => void;
  onDeleteScenario?: (id: string) => void;
}

export function CompareModeView({ scenarios, activeScenarioId, onScenarioChange, onScenarioFocus, onAddScenario, onDeleteScenario }: CompareModeViewProps) {
  const { items, bestId } = useCompareAnalysis(scenarios);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="px-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">Compare Loans</h2>
        <p className="text-muted-foreground font-semibold">See how tenure and rate affect total cost.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch auto-rows-fr">
        {items.map(({ scenario, summary }) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            summary={summary}
            isBest={scenario.id === bestId}
            isActive={scenario.id === activeScenarioId}
            onFocus={() => onScenarioFocus(scenario.id)}
            onInputChange={(field, value) => onScenarioChange(scenario.id, field, value)}
            onDelete={scenarios.length > 1 && onDeleteScenario ? () => onDeleteScenario(scenario.id) : undefined}
          />
        ))}
        {onAddScenario && scenarios.length < 3 && (
          <AddScenarioCard key="add-scenario-btn" onClick={onAddScenario} />
        )}
      </div>
    </div>
  );
}
