export type ScheduleView = "table" | "chart";

export type Prepayment = {
  id: string;
  month: number;
  amount: number;
};

export type ScheduleRow = {
  month: number;
  openingBalance: number;
  emi: number;
  principalPaid: number;
  interestPaid: number;
  prepaymentApplied: number;
  balanceRemaining: number;
  cumulativePrincipal: number;
  cumulativeInterest: number;
};

export type ScheduleAnalysis = {
  totalEmiPaid: number;
  totalInterest: number;
  totalPrepaid: number;
  breakEvenMonth: number | null;
};
