import type { Prepayment } from "../types";

export function createPrepayment(month: number = 12, amount: number = 100000): Prepayment {
  return {
    id: crypto.randomUUID(),
    month,
    amount
  };
}
