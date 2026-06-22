import type { LoanInput, Prepayment, ScheduleRow, ScheduleAnalysis } from "../types";
import { clampLoanInput, monthlyRate, calculateEmi } from "./emi";

export function normalizePrepayments(prepayments: Prepayment[], maxMonth: number) {
  return prepayments.reduce<Map<number, number>>((acc, item) => {
    const month = Math.round(item.month);
    const amount = Math.max(0, item.amount);

    if (month < 1 || month > maxMonth || amount <= 0) {
      return acc;
    }

    acc.set(month, (acc.get(month) ?? 0) + amount);
    return acc;
  }, new Map<number, number>());
}

export function generateAmortizationSchedule(input: LoanInput, prepayments: Prepayment[] = []): ScheduleRow[] {
  const loan = clampLoanInput(input);
  const emi = calculateEmi(loan);
  const rate = monthlyRate(loan.annualRate);
  const prepaymentByMonth = normalizePrepayments(prepayments, loan.tenureMonths);
  const rows: ScheduleRow[] = [];

  let balance = loan.amount;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;

  for (let month = 1; month <= loan.tenureMonths && balance > 0.005; month += 1) {
    const openingBalance = balance;
    const requestedPrepayment = prepaymentByMonth.get(month) ?? 0;
    const prepaymentApplied = Math.min(requestedPrepayment, balance);

    balance = Math.max(0, balance - prepaymentApplied);
    cumulativePrincipal += prepaymentApplied;

    if (balance <= 0.005) {
      rows.push({
        month,
        openingBalance,
        emi: 0,
        principalPaid: 0,
        interestPaid: 0,
        prepaymentApplied,
        balanceRemaining: 0,
        cumulativePrincipal,
        cumulativeInterest,
      });
      break;
    }

    const interestPaid = balance * rate;
    const scheduledEmi = Math.min(emi, balance + interestPaid);
    const principalPaid = Math.min(balance, scheduledEmi - interestPaid);

    balance = Math.max(0, balance - principalPaid);
    cumulativeInterest += interestPaid;
    cumulativePrincipal += principalPaid;

    rows.push({
      month,
      openingBalance,
      emi: scheduledEmi,
      principalPaid,
      interestPaid,
      prepaymentApplied,
      balanceRemaining: balance <= 0.005 ? 0 : balance,
      cumulativePrincipal,
      cumulativeInterest,
    });
  }

  return rows;
}

export function analyzeSchedule(rows: ScheduleRow[]): ScheduleAnalysis {
  return rows.reduce<ScheduleAnalysis>(
    (analysis, row) => ({
      totalEmiPaid: analysis.totalEmiPaid + row.emi,
      totalInterest: analysis.totalInterest + row.interestPaid,
      totalPrepaid: analysis.totalPrepaid + row.prepaymentApplied,
      breakEvenMonth:
        analysis.breakEvenMonth ?? (row.cumulativePrincipal > row.cumulativeInterest ? row.month : null),
    }),
    { totalEmiPaid: 0, totalInterest: 0, totalPrepaid: 0, breakEvenMonth: null },
  );
}

export function findBreakEvenMonth(rows: ScheduleRow[]) {
  return analyzeSchedule(rows).breakEvenMonth;
}

export function summarizeSchedule(rows: ScheduleRow[]) {
  const { totalEmiPaid, totalInterest, totalPrepaid } = analyzeSchedule(rows);
  return { totalEmiPaid, totalInterest, totalPrepaid };
}
