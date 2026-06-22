import { useMemo } from "react";
import { useWorkspace } from "../../providers/WorkspaceProvider";
import type { LoanInput } from "../../lib/types";

export function useCompareActions() {
  const { dispatchWorkspace, state } = useWorkspace();
  const scenarioCount = state.scenarios.length;

  return useMemo(
    () => ({
      onScenarioChange: (id: string, field: keyof LoanInput, value: number) =>
        dispatchWorkspace({ type: "UPDATE_SCENARIO_FIELD", id, field, value }),

      onScenarioFocus: (id: string) => dispatchWorkspace({ type: "SET_ACTIVE_SCENARIO", id }),

      onAddScenario: scenarioCount < 3 ? () => dispatchWorkspace({ type: "ADD_SCENARIO" }) : undefined,

      onDeleteScenario:
        scenarioCount > 1 ? (id: string) => dispatchWorkspace({ type: "REMOVE_SCENARIO", id }) : undefined,
    }),
    [dispatchWorkspace, scenarioCount],
  );
}
