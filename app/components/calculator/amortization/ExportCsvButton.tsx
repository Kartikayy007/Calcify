"use client";

import type { ScheduleRow } from "../../../lib/types";
import { exportScheduleCsv } from "../../../lib/export";

interface ExportCsvButtonProps {
  rows: ScheduleRow[];
  filename?: string;
  breakEvenMonth?: number | null;
}

export function ExportCsvButton({ rows, filename, breakEvenMonth }: ExportCsvButtonProps) {
  return (
    <button
      onClick={() => exportScheduleCsv(rows, filename, breakEvenMonth)}
      className="flex items-center gap-2 p-1.5 px-4 rounded-full clay-btn transition-colors duration-300 text-muted-foreground hover:text-emerald-500 hover:dark:text-emerald-400"
      title="Export schedule as CSV"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
      <span className="text-sm font-bold">Export CSV</span>
    </button>
  );
}
