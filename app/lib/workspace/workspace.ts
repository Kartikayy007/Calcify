import { clampLoanInput } from "../finance/emi";
import { sanitizePrepayments } from "../prepayment/sanitizePrepayment";
import type { ComparisonScenario, Prepayment, WorkspaceMode, WorkspaceState } from "../types";
import { DEFAULT_LOAN, DEFAULT_SCENARIOS, DEFAULT_ACTIVE_SCENARIO_ID } from "../compare/defaults";

export const defaultWorkspaceState: WorkspaceState = {
  theme: "light",
  mode: "single",
  loan: DEFAULT_LOAN,
  scenarios: DEFAULT_SCENARIOS,
  activeScenarioId: DEFAULT_ACTIVE_SCENARIO_ID,
  prepayments: [],
  scheduleView: "table",
  schedulePage: 0,
};

export function createPrepayment(month: number, amount = 100000): Prepayment {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

  return {
    id,
    month: Math.round(month),
    amount,
  };
}

function sanitizeMode(mode: WorkspaceMode): WorkspaceMode {
  return mode === "compare" || mode === "prepayment" ? mode : "single";
}

function sanitizeScenarios(scenarios: ComparisonScenario[]) {
  if (!scenarios || scenarios.length === 0) {
    return DEFAULT_SCENARIOS;
  }
  
  return scenarios.map(scenario => ({
    ...scenario,
    input: clampLoanInput(scenario.input)
  }));
}

export function sanitizeWorkspaceState(state: WorkspaceState): WorkspaceState {
  const loan = clampLoanInput(state.loan ?? DEFAULT_LOAN);
  const scenarios = sanitizeScenarios(state.scenarios ?? DEFAULT_SCENARIOS);
  const activeScenarioId = scenarios.some((scenario) => scenario.id === state.activeScenarioId) ? state.activeScenarioId : scenarios[0].id;

  return {
    theme: state.theme === "dark" ? "dark" : "light",
    mode: sanitizeMode(state.mode),
    loan,
    scenarios,
    activeScenarioId,
    prepayments: sanitizePrepayments(state.prepayments ?? [], loan.tenureMonths),
    scheduleView: state.scheduleView === "chart" ? "chart" : "table",
    schedulePage: Math.max(0, Math.round(state.schedulePage ?? 0)),
  };
}

export function isDefaultWorkspaceState(state: WorkspaceState): boolean {
  return JSON.stringify(sanitizeWorkspaceState(state)) === JSON.stringify(sanitizeWorkspaceState(defaultWorkspaceState));
}
