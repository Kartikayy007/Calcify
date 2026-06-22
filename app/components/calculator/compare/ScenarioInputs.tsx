import { NumberSliderField } from "../../ui/NumberSliderField";
import { LOAN_LIMITS } from "../../../lib/finance/limits";
import type { LoanInput } from "../../../lib/types";

interface ScenarioInputsProps {
  input: LoanInput;
  onChange: (field: keyof LoanInput, value: number) => void;
}

export function ScenarioInputs({ input, onChange }: ScenarioInputsProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <NumberSliderField
        label="Loan Amount"
        value={input.amount}
        min={LOAN_LIMITS.amount.min}
        max={LOAN_LIMITS.amount.max}
        step={LOAN_LIMITS.amount.step}
        onChange={(val) => onChange("amount", val)}
        prefix="₹"
        minLabel="₹10K"
        maxLabel="₹50L"
      />
      <NumberSliderField
        label="Interest Rate (P.A.)"
        value={input.annualRate}
        min={LOAN_LIMITS.annualRate.min}
        max={LOAN_LIMITS.annualRate.max}
        step={LOAN_LIMITS.annualRate.step}
        onChange={(val) => onChange("annualRate", val)}
        suffix="%"
        minLabel="1%"
        maxLabel="36%"
      />
      <NumberSliderField
        label="Tenure"
        value={input.tenureMonths}
        min={LOAN_LIMITS.tenureMonths.min}
        max={LOAN_LIMITS.tenureMonths.max}
        step={LOAN_LIMITS.tenureMonths.step}
        onChange={(val) => onChange("tenureMonths", val)}
        suffix="mo"
        minLabel="1 mo"
        maxLabel="84 mo"
      />
    </div>
  );
}
