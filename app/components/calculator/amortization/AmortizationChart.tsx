"use client";

import { useMemo, useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCompactCurrency, formatCurrency } from "../../../lib/format";
import type { ScheduleRow } from "../../../lib/types";

interface AmortizationChartProps {
  rows: ScheduleRow[];
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: number }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="clay-card p-3 rounded-2xl text-sm flex flex-col gap-1 min-w-[160px]">
      <p className="font-extrabold text-foreground mb-1">Month {label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex justify-between gap-4 font-semibold" style={{ color: entry.color }}>
          <span>{entry.name}</span>
          <span>{formatCurrency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function AmortizationChart({ rows }: AmortizationChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const chartData = useMemo(() => {
    return rows.map((row) => ({
      month: row.month,
      Principal: Math.round(row.principalPaid + row.prepaymentApplied),
      Interest: Math.round(row.interestPaid),
    }));
  }, [rows]);

  return (
    <div className="w-full h-[280px] sm:h-[320px] md:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barSize={rows.length > 36 && isMobile ? 4 : rows.length > 24 ? 6 : 12} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fontWeight: 600, fill: "currentColor" }}
            tickLine={false}
            axisLine={false}
            label={{ value: "Month", position: "insideBottom", offset: -2, fontSize: 11 }}
          />
          <YAxis
            tickFormatter={formatCompactCurrency}
            tick={{ fontSize: 11, fontWeight: 600, fill: "currentColor" }}
            tickLine={false}
            axisLine={false}
            width={isMobile ? 44 : 60}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Legend
            wrapperStyle={{ fontSize: 12, fontWeight: 700, paddingTop: 12 }}
          />
          <Bar dataKey="Principal" stackId="a" fill="#7286C9" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Interest" stackId="a" fill="#61CA97" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
