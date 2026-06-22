"use client";

import { useEffect, useState } from "react";
import { clamp, roundTo } from "../../lib/finance";
import { Slider } from "./Slider";

interface NumberSliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  formatValue?: (val: number) => string;
  onChange: (val: number) => void;
  minLabel?: string;
  maxLabel?: string;
  prefix?: string;
  suffix?: string;
  hint?: string;
}

export function NumberSliderField({
  label,
  value,
  min,
  max,
  step,
  formatValue,
  onChange,
  minLabel,
  maxLabel,
  prefix,
  suffix,
  hint,
}: NumberSliderFieldProps) {
  const [localValue, setLocalValue] = useState(value.toString());

  useEffect(() => {
    setLocalValue(value.toString());
  }, [value]);

  const handleBlur = () => {
    let num = parseFloat(localValue);
    if (isNaN(num)) num = min;
    const clamped = clamp(num, min, max);
    let snapped = Math.round(clamped / step) * step;
    
    const decimals = step.toString().includes('.') ? step.toString().split('.')[1].length : 0;
    snapped = roundTo(snapped, decimals);

    setLocalValue(snapped.toString());
    onChange(snapped);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "" || /^\d*\.?\d*$/.test(raw)) {
      setLocalValue(raw);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const displayMinLabel = minLabel || (formatValue ? formatValue(min) : min.toString());
  const displayMaxLabel = maxLabel || (formatValue ? formatValue(max) : max.toString());

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <label className="text-sm font-bold text-foreground tracking-wider uppercase flex items-center gap-2 flex-wrap">
          {label}
          {hint && (
            <span className="text-xs font-semibold text-muted-foreground normal-case tracking-normal">
              {hint}
            </span>
          )}
        </label>
        <div className="flex items-center relative w-full sm:w-1/2 sm:max-w-[150px]">
          {prefix && <span className="absolute left-3 text-lg font-bold text-foreground">{prefix}</span>}
          <input
            type="text"
            inputMode="decimal"
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`w-full bg-transparent border-b-2 border-foreground/20 focus:border-emerald-500 transition-colors text-right text-xl sm:text-2xl font-bold text-foreground py-1 outline-none ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-8' : ''}`}
          />
          {suffix && <span className="absolute right-0 text-lg sm:text-xl font-bold text-foreground">{suffix}</span>}
        </div>
      </div>

      <div className="relative pt-2 pb-1">
        <Slider min={min} max={max} step={step} value={value} onChange={onChange} />
        <div className="flex justify-between text-xs font-semibold text-muted-foreground mt-2">
          <span>{displayMinLabel}</span>
          <span>{displayMaxLabel}</span>
        </div>
      </div>
    </div>
  );
}
