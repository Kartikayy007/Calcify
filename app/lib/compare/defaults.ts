import type { ComparisonScenario } from "../types";

export const DEFAULT_LOAN = { amount: 1500000, annualRate: 11, tenureMonths: 48 };

export const DEFAULT_SCENARIOS: ComparisonScenario[] = [
  { id: "A", name: "Scenario A", input: { ...DEFAULT_LOAN, tenureMonths: 24 } },
  { id: "B", name: "Scenario B", input: { ...DEFAULT_LOAN, tenureMonths: 48 } },
];

export const DEFAULT_ACTIVE_SCENARIO_ID = "B";
