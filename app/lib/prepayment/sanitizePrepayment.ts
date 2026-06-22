import type { Prepayment } from "../types";

export function sanitizePrepayment(p: Prepayment, maxMonth: number): Prepayment {
  return {
    ...p,
    month: Math.min(Math.max(1, Math.round(p.month)), maxMonth),
    amount: Math.max(0, Math.round(p.amount))
  };
}

export function sanitizePrepayments(list: Prepayment[], maxMonth: number): Prepayment[] {
  return list
    .map(p => sanitizePrepayment(p, maxMonth))
    .filter(p => p.month <= maxMonth && p.amount > 0);
}
