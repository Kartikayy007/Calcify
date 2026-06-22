import { useMemo } from "react";
import { generateSensitivityGrid } from "../lib/finance";
import type { LoanInput, SensitivityGrid } from "../lib/types";

export function useSensitivityGrid(loan: LoanInput): SensitivityGrid {
  return useMemo(() => generateSensitivityGrid(loan), [loan]);
}
