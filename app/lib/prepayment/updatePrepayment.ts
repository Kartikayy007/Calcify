import type { Prepayment } from "../types";
import { sanitizePrepayments } from "./sanitizePrepayment";

export function addPrepayment(list: Prepayment[], p: Prepayment, maxMonth: number): Prepayment[] {
  return sanitizePrepayments([...list, p], maxMonth);
}

export function updatePrepayment(list: Prepayment[], id: string, patch: Partial<Prepayment>, maxMonth: number): Prepayment[] {
  return sanitizePrepayments(list.map(p => p.id === id ? { ...p, ...patch } : p), maxMonth);
}

export function removePrepayment(list: Prepayment[], id: string): Prepayment[] {
  return list.filter(p => p.id !== id);
}
