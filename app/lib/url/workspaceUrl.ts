import type { LoanInput, Prepayment, WorkspaceMode, WorkspaceState } from "../types";
import { clampLoanInput } from "../finance/emi";
import { sanitizePrepayments } from "../prepayment/sanitizePrepayment";
import { DEFAULT_LOAN } from "../compare/defaults";

export interface UrlDecodedState {
  mode?: WorkspaceMode;
  loan?: LoanInput;
  prepayments?: Prepayment[];
}

export function encodeWorkspaceUrl(state: Pick<WorkspaceState, "mode" | "loan" | "prepayments">): string {
  const params = new URLSearchParams();

  if (state.mode && state.mode !== "single") {
    params.set("tab", state.mode);
  }

  params.set("amount", state.loan.amount.toString());
  params.set("rate", state.loan.annualRate.toString());
  params.set("tenure", state.loan.tenureMonths.toString());

  if (state.prepayments && state.prepayments.length > 0) {
    const prepStr = state.prepayments
      .map((p) => `${p.month}:${p.amount}`)
      .join(",");
    params.set("prep", prepStr);
  }

  return params.toString();
}

export function decodeWorkspaceUrl(search: string): UrlDecodedState {
  if (!search) return {};

  const params = new URLSearchParams(search);
  const result: UrlDecodedState = {};

  const tab = params.get("tab");
  if (tab === "single" || tab === "compare" || tab === "prepayment") {
    result.mode = tab as WorkspaceMode;
  }

  const amountStr = params.get("amount");
  const rateStr = params.get("rate");
  const tenureStr = params.get("tenure");

  if (amountStr || rateStr || tenureStr) {
    const amount = amountStr ? parseInt(amountStr, 10) : DEFAULT_LOAN.amount;
    const annualRate = rateStr ? parseFloat(rateStr) : DEFAULT_LOAN.annualRate;
    const tenureMonths = tenureStr ? parseInt(tenureStr, 10) : DEFAULT_LOAN.tenureMonths;

    if (!isNaN(amount) && !isNaN(annualRate) && !isNaN(tenureMonths)) {
      result.loan = clampLoanInput({ amount, annualRate, tenureMonths });
    }
  }

  const prepStr = params.get("prep");
  if (prepStr) {
    const pairs = prepStr.split(",");
    const parsedPreps: Prepayment[] = [];

    for (const pair of pairs) {
      const [monthStr, amountStr] = pair.split(":");
      const month = parseInt(monthStr, 10);
      const amount = parseInt(amountStr, 10);

      if (!isNaN(month) && !isNaN(amount)) {
        parsedPreps.push({
          id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
          month,
          amount,
        });
      }
    }

    if (parsedPreps.length > 0) {
      const tenureMonths = result.loan?.tenureMonths || DEFAULT_LOAN.tenureMonths;
      result.prepayments = sanitizePrepayments(parsedPreps, tenureMonths);
    }
  }

  return result;
}
