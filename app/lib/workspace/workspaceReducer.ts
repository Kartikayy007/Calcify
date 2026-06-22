import { createPrepayment, sanitizeWorkspaceState } from "./workspace";
import type { LoanInput, Prepayment, ScheduleView, Theme, WorkspaceMode, WorkspaceState } from "../types";

export type WorkspaceAction =
  | { type: "SET_LOAN"; loan: LoanInput }
  | { type: "SET_MODE"; mode: WorkspaceMode }
  | { type: "SET_THEME"; theme: Theme }
  | { type: "TOGGLE_THEME" }
  | { type: "SET_ACTIVE_SCENARIO"; id: string }
  | { type: "UPDATE_SCENARIO_FIELD"; id: string; field: keyof LoanInput; value: number }
  | { type: "ADD_SCENARIO" }
  | { type: "REMOVE_SCENARIO"; id: string }
  | { type: "ADD_PREPAYMENT"; prepayment?: Prepayment }
  | { type: "REMOVE_PREPAYMENT"; id: string }
  | { type: "UPDATE_PREPAYMENT"; id: string; prepayment: Partial<Prepayment> }
  | { type: "SET_SCHEDULE_VIEW"; view: ScheduleView }
  | { type: "SET_SCHEDULE_PAGE"; page: number }
  | { type: "HYDRATE_REMOTE_STATE"; state: WorkspaceState }
  | { type: "HYDRATE_FROM_URL"; mode?: WorkspaceMode; loan?: LoanInput; prepayments?: Prepayment[] };

export function workspaceReducer(state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  switch (action.type) {
    case "SET_LOAN":
      return sanitizeWorkspaceState({ ...state, loan: action.loan, schedulePage: 0 });

    case "SET_MODE": {
      if (action.mode === "single" && state.mode === "compare") {
        const activeScenario =
          state.scenarios.find((scenario) => scenario.id === state.activeScenarioId) ?? state.scenarios[0];
        return sanitizeWorkspaceState({ ...state, mode: action.mode, loan: activeScenario.input, schedulePage: 0 });
      }

      return sanitizeWorkspaceState({ ...state, mode: action.mode, schedulePage: 0 });
    }

    case "SET_THEME":
      return sanitizeWorkspaceState({ ...state, theme: action.theme });

    case "TOGGLE_THEME":
      return sanitizeWorkspaceState({ ...state, theme: state.theme === "dark" ? "light" : "dark" });

    case "SET_ACTIVE_SCENARIO":
      return sanitizeWorkspaceState({ ...state, activeScenarioId: action.id });

    case "UPDATE_SCENARIO_FIELD":
      return sanitizeWorkspaceState({
        ...state,
        scenarios: state.scenarios.map((scenario) =>
          scenario.id === action.id ? { ...scenario, input: { ...scenario.input, [action.field]: action.value } } : scenario,
        ),
      });

    case "ADD_SCENARIO": {
      if (state.scenarios.length >= 3) return state;
      const usedIds = new Set(state.scenarios.map(s => s.id));
      let nextId = "A";
      for (let i = 0; i < 26; i++) {
        const char = String.fromCharCode(65 + i);
        if (!usedIds.has(char)) {
          nextId = char;
          break;
        }
      }
      const newScenario = {
        id: nextId,
        name: `Scenario ${nextId}`,
        input: state.loan,
      };
      return sanitizeWorkspaceState({
        ...state,
        scenarios: [...state.scenarios, newScenario],
        activeScenarioId: nextId,
      });
    }

    case "REMOVE_SCENARIO": {
      if (state.scenarios.length <= 1) return state;
      const nextScenarios = state.scenarios.filter((s) => s.id !== action.id);
      const activeId = state.activeScenarioId === action.id ? nextScenarios[0].id : state.activeScenarioId;
      return sanitizeWorkspaceState({
        ...state,
        scenarios: nextScenarios,
        activeScenarioId: activeId,
      });
    }

    case "ADD_PREPAYMENT":
      return sanitizeWorkspaceState({
        ...state,
        prepayments: [...state.prepayments, action.prepayment ?? createPrepayment(Math.min(state.loan.tenureMonths, 12))],
        schedulePage: 0,
      });

    case "REMOVE_PREPAYMENT":
      return sanitizeWorkspaceState({
        ...state,
        prepayments: state.prepayments.filter((item) => item.id !== action.id),
        schedulePage: 0,
      });

    case "UPDATE_PREPAYMENT":
      return sanitizeWorkspaceState({
        ...state,
        prepayments: state.prepayments.map((item) => (item.id === action.id ? { ...item, ...action.prepayment } as Prepayment : item)),
        schedulePage: 0,
      });

    case "SET_SCHEDULE_VIEW":
      return sanitizeWorkspaceState({ ...state, scheduleView: action.view });

    case "SET_SCHEDULE_PAGE":
      return sanitizeWorkspaceState({ ...state, schedulePage: action.page });

    case "HYDRATE_REMOTE_STATE":
      return sanitizeWorkspaceState(action.state);

    case "HYDRATE_FROM_URL":
      return sanitizeWorkspaceState({
        ...state,
        ...(action.mode ? { mode: action.mode } : {}),
        ...(action.loan ? { loan: action.loan } : {}),
        ...(action.prepayments ? { prepayments: action.prepayments } : {}),
      });

    default:
      return state;
  }
}
