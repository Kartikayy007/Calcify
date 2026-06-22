export type SensitivityGrid = {
  rates: number[];
  tenures: number[];
  values: Array<{
    tenure: number;
    cells: Array<{
      rate: number;
      emi: number;
      isCurrent: boolean;
    }>;
  }>;
};
