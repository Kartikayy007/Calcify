"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { EmiCalculator } from "./EmiCalculator";
import { CompareModeView } from "./compare/CompareModeView";
import { PrepaymentModeView } from "./prepayment/PrepaymentModeView";
import { useWorkspace } from "../../providers/WorkspaceProvider";
import { useCompareActions } from "../../hooks/compare/useCompareActions";
import { usePrepaymentActions } from "../../hooks/prepayment/usePrepaymentActions";
import { encodeWorkspaceUrl } from "../../lib/url/workspaceUrl";

export function CalculatorShell() {
  const { state, dispatchWorkspace } = useWorkspace();
  const router = useRouter();
  const isFirstMount = useRef(true);

  const compareActions = useCompareActions();
  const prepaymentActions = usePrepaymentActions();

  const onLoanChange = useCallback(
    (loan: typeof state.loan) => dispatchWorkspace({ type: "SET_LOAN", loan }),
    [dispatchWorkspace],
  );
  const onScheduleViewChange = useCallback(
    (view: typeof state.scheduleView) => dispatchWorkspace({ type: "SET_SCHEDULE_VIEW", view }),
    [dispatchWorkspace],
  );
  const onSchedulePageChange = useCallback(
    (page: number) => dispatchWorkspace({ type: "SET_SCHEDULE_PAGE", page }),
    [dispatchWorkspace],
  );

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const handler = setTimeout(() => {
      const query = encodeWorkspaceUrl(state);
      const url = query ? `/?${query}` : "/";
      router.replace(url, { scroll: false });
    }, 300);

    return () => clearTimeout(handler);
  }, [state.mode, state.loan, state.prepayments, router]);

  return (
    <>
      {state.mode === "single" && (
        <EmiCalculator 
          loan={state.loan} 
          onLoanChange={onLoanChange} 
          scheduleView={state.scheduleView}
          schedulePage={state.schedulePage}
          onScheduleViewChange={onScheduleViewChange}
          onSchedulePageChange={onSchedulePageChange}
        />
      )}
      {state.mode === "compare" && (
        <CompareModeView
          scenarios={state.scenarios}
          activeScenarioId={state.activeScenarioId}
          {...compareActions}
        />
      )}
      {state.mode === "prepayment" && (
        <PrepaymentModeView
          loan={state.loan}
          prepayments={state.prepayments}
          scheduleView={state.scheduleView}
          schedulePage={state.schedulePage}
          onScheduleViewChange={onScheduleViewChange}
          onSchedulePageChange={onSchedulePageChange}
          {...prepaymentActions}
        />
      )}
    </>
  );
}

