"use client";

import { useEffect, useState } from "react";
import { clamp, roundTo } from "../../lib/finance";

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
        <label className="text-sm font-bold text-foreground tracking-wider uppercase">
          {label}
        </label>
        <div className="flex items-center relative w-full sm:w-1/2 sm:max-w-[150px]">
          {prefix && <span className="absolute left-3 text-lg font-bold text-foreground">{prefix}</span>}
          <input
            type="number"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`w-full bg-transparent border-b-2 border-foreground/20 focus:border-emerald-500 transition-colors text-right text-xl sm:text-2xl font-bold text-foreground py-1 outline-none ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-8' : ''} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
          />
          {suffix && <span className="absolute right-0 text-lg sm:text-xl font-bold text-foreground">{suffix}</span>}
        </div>
      </div>

      <div className="relative pt-2 pb-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500 outline-none shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
        />
        <div className="flex justify-between text-xs font-semibold text-muted-foreground mt-2">
          <span>{displayMinLabel}</span>
          <span>{displayMaxLabel}</span>
        </div>
      </div>
    </div>
  );
}
