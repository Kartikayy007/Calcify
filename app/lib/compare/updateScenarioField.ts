import type { ComparisonScenario, LoanInput } from "../types";
import { LOAN_LIMITS, clamp } from "../finance/limits";

export function updateScenarioField(
  scenarios: ComparisonScenario[],
  id: string,
  field: keyof LoanInput,
  value: number
): ComparisonScenario[] {
  return scenarios.map((scenario) => {
    if (scenario.id !== id) return scenario;
    
    const limit = LOAN_LIMITS[field];
    const clampedValue = clamp(value, limit.min, limit.max);
    
    return {
      ...scenario,
      input: {
        ...scenario.input,
        [field]: clampedValue,
      },
    };
  });
}
