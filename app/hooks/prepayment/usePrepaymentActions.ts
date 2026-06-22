import { useMemo } from "react";
import { useWorkspace } from "../../providers/WorkspaceProvider";
import type { LoanInput, Prepayment } from "../../lib/types";

export function usePrepaymentActions() {
  const { dispatchWorkspace } = useWorkspace();

  return useMemo(
    () => ({
      onLoanChange: (loan: LoanInput) => dispatchWorkspace({ type: "SET_LOAN", loan }),
      onAddPrepayment: () => dispatchWorkspace({ type: "ADD_PREPAYMENT" }),
      onUpdatePrepayment: (id: string, patch: Partial<Prepayment>) =>
        dispatchWorkspace({ type: "UPDATE_PREPAYMENT", id, prepayment: patch }),
      onRemovePrepayment: (id: string) => dispatchWorkspace({ type: "REMOVE_PREPAYMENT", id }),
    }),
    [dispatchWorkspace],
  );
}
