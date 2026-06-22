import type { ScheduleRow } from "../types";

export function scheduleRowsToCsv(rows: ScheduleRow[], breakEvenMonth?: number | null): string {
  const headers = ["Month", "EMI", "Principal Paid", "Interest Paid", "Prepayment", "Balance", "Break-Even"];
  
  const csvRows = rows.map((row) => {
    return [
      row.month,
      row.emi.toFixed(2),
      row.principalPaid.toFixed(2),
      row.interestPaid.toFixed(2),
      row.prepaymentApplied > 0 ? row.prepaymentApplied.toFixed(2) : "",
      row.balanceRemaining.toFixed(2),
      row.month === breakEvenMonth ? "Yes" : "",
    ].join(",");
  });

  return [headers.join(","), ...csvRows].join("\r\n");
}

export function exportScheduleCsv(rows: ScheduleRow[], filename?: string, breakEvenMonth?: number | null): void {
  if (typeof window === "undefined" || rows.length === 0) return;

  const csv = scheduleRowsToCsv(rows, breakEvenMonth);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const finalFilename = filename || `calcify-amortization-${rows.length}mo.csv`;

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", finalFilename);
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
