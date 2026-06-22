import type { Prepayment } from "../../../lib/types";
import { PrepaymentRow } from "./PrepaymentRow";

interface PrepaymentListProps {
  prepayments: Prepayment[];
  maxMonth: number;
  onChange: (id: string, patch: Partial<Pick<Prepayment, "month" | "amount">>) => void;
  onRemove: (id: string) => void;
}

export function PrepaymentList({ prepayments, maxMonth, onChange, onRemove }: PrepaymentListProps) {
  if (prepayments.length === 0) {
    return (
      <div className="w-full h-32 flex items-center justify-center border-[3px] border-dashed border-black/10 dark:border-white/10 rounded-3xl text-muted-foreground font-semibold">
        No prepayments scheduled.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {prepayments.map(p => (
        <PrepaymentRow
          key={p.id}
          prepayment={p}
          maxMonth={maxMonth}
          onChange={(patch) => onChange(p.id, patch)}
          onRemove={() => onRemove(p.id)}
        />
      ))}
    </div>
  );
}
