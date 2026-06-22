export const LOAN_LIMITS = {
  amount: { min: 10_000, max: 5_000_000, step: 1_000 },
  annualRate: { min: 1, max: 36, step: 0.1 },
  tenureMonths: { min: 1, max: 84, step: 1 },
} as const;

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function roundTo(value: number, digits = 2) {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
