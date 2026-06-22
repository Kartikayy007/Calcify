import { useWorkspace } from "../../providers/WorkspaceProvider";
import type { LoanInput } from "../../lib/types";

export function useCompareActions() {
  const { dispatchWorkspace, state } = useWorkspace();
  
  return {
    onScenarioChange: (id: string, field: keyof LoanInput, value: number) => 
      dispatchWorkspace({ type: "UPDATE_SCENARIO_FIELD", id, field, value }),
      
    onScenarioFocus: (id: string) => 
      dispatchWorkspace({ type: "SET_ACTIVE_SCENARIO", id }),
      
    onAddScenario: state.scenarios.length < 3 
      ? () => dispatchWorkspace({ type: "ADD_SCENARIO" }) 
      : undefined,
      
    onDeleteScenario: state.scenarios.length > 1 
      ? (id: string) => dispatchWorkspace({ type: "REMOVE_SCENARIO", id }) 
      : undefined,
  };
}
