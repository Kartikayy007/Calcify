"use client";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
  className?: string;
}

export function Slider({ value, min, max, step, onChange, className = "" }: SliderProps) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className={`clay-slider w-full ${className}`}
      style={{
        background: `linear-gradient(to right, #10b981 ${pct}%, var(--clay-track) ${pct}%)`,
      }}
    />
  );
}
