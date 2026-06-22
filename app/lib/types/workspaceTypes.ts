import type { LoanInput } from "./loan";
import type { ComparisonScenario } from "./compare";
import type { Prepayment, ScheduleView } from "./schedule";

export type Theme = "light" | "dark";
export type WorkspaceMode = "single" | "compare" | "prepayment";

export type WorkspaceState = {
  theme: Theme;
  mode: WorkspaceMode;
  loan: LoanInput;
  scenarios: ComparisonScenario[];
  activeScenarioId: string;
  prepayments: Prepayment[];
  scheduleView: ScheduleView;
  schedulePage: number;
};
