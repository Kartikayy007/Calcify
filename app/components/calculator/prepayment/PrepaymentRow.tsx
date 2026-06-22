import type { Prepayment } from "../../../lib/types";

interface PrepaymentRowProps {
  prepayment: Prepayment;
  maxMonth: number;
  onChange: (patch: Partial<Pick<Prepayment, "month" | "amount">>) => void;
  onRemove: () => void;
}

export function PrepaymentRow({ prepayment, maxMonth, onChange, onRemove }: PrepaymentRowProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4 w-full bg-black/[0.03] dark:bg-white/5 p-2 sm:p-3 rounded-2xl">
      <div className="flex flex-col gap-1 w-20 sm:w-24">
        <label className="text-xs font-bold text-muted-foreground px-1">Month</label>
        <input
          type="number"
          min={1}
          max={maxMonth}
          value={prepayment.month}
          onChange={(e) => onChange({ month: Number(e.target.value) })}
          onBlur={(e) => onChange({ month: Math.max(1, Math.min(maxMonth, Math.round(Number(e.target.value)))) })}
          className="clay-input w-full bg-transparent p-2 rounded-xl text-sm font-bold text-foreground text-center"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <label className="text-xs font-bold text-muted-foreground px-1">Amount (₹)</label>
        <input
          type="number"
          min={0}
          value={prepayment.amount}
          onChange={(e) => onChange({ amount: Number(e.target.value) })}
          className="clay-input w-full bg-transparent p-2 rounded-xl text-sm font-bold text-foreground"
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="clay-btn w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-500/10 mt-5 transition-colors shrink-0"
        aria-label="Remove prepayment"
      >
        ✕
      </button>
    </div>
  );
}
