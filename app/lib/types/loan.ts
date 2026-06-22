export type LoanInput = {
  amount: number;
  annualRate: number;
  tenureMonths: number;
};

export type LoanSummary = {
  emi: number;
  totalInterest: number;
  totalPayable: number;
  principalShare: number;
  interestShare: number;
};
