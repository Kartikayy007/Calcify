import { useMemo } from "react";
import type { ComparisonScenario } from "../../lib/types";
import { calculateLoanSummary } from "../../lib/finance";
import { pickBestScenario } from "../../lib/compare";

export function useCompareAnalysis(scenarios: ComparisonScenario[]) {
  return useMemo(() => {
    const items = scenarios.map((scenario) => {
      const summary = calculateLoanSummary(scenario.input);
      return { id: scenario.id, scenario, summary };
    });

    const bestId = pickBestScenario(items);

    return { items, bestId };
  }, [scenarios]);
}
