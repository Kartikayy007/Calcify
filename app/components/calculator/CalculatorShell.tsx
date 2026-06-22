"use client";

import { useState, useRef } from "react";
import { EmiCalculator } from "./EmiCalculator";
import { CompareModeView } from "./compare/CompareModeView";
import { DEFAULT_LOAN, DEFAULT_SCENARIOS, DEFAULT_ACTIVE_SCENARIO_ID, updateScenarioField } from "../../lib/compare";
import type { LoanInput, ComparisonScenario } from "../../lib/types";

interface CalculatorShellProps {
  tab: string;
}

export function CalculatorShell({ tab }: CalculatorShellProps) {
  const [loan, setLoan] = useState<LoanInput>(DEFAULT_LOAN);
  const [scenarios, setScenarios] = useState<ComparisonScenario[]>(DEFAULT_SCENARIOS);
  const [activeScenarioId, setActiveScenarioId] = useState<string>(DEFAULT_ACTIVE_SCENARIO_ID);

  const prevTab = useRef(tab);
  if (prevTab.current === "compare" && tab === "single") {
    const active = scenarios.find(s => s.id === activeScenarioId) ?? scenarios[0];
    setLoan(active.input);
  }
  prevTab.current = tab;

  const handleScenarioChange = (id: string, field: keyof LoanInput, value: number) => {
    setScenarios(prev => updateScenarioField(prev, id, field, value));
  };

  const handleAddScenario = () => {
    const usedIds = new Set(scenarios.map(s => s.id));
    let nextId = "A";
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i);
      if (!usedIds.has(char)) {
        nextId = char;
        break;
      }
    }
    const lastInput = scenarios[scenarios.length - 1].input;
    setScenarios(prev => [...prev, { id: nextId, name: `Scenario ${nextId}`, input: { ...lastInput } }]);
  };

  const handleDeleteScenario = (id: string) => {
    if (scenarios.length <= 1) return;
    setScenarios(prev => {
      const filtered = prev.filter(s => s.id !== id);
      if (activeScenarioId === id && filtered.length > 0) {
        setActiveScenarioId(filtered[0].id);
      }
      return filtered;
    });
  };

  return (
    <>
      {tab === "single" && <EmiCalculator loan={loan} onLoanChange={setLoan} />}
      {tab === "compare" && (
        <CompareModeView
          scenarios={scenarios}
          activeScenarioId={activeScenarioId}
          onScenarioChange={handleScenarioChange}
          onScenarioFocus={setActiveScenarioId}
          onAddScenario={handleAddScenario}
          onDeleteScenario={handleDeleteScenario}
        />
      )}
      {tab === "prepayment" && (
        <div className="clay-card p-12 rounded-[2rem] w-full text-center flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Prepayment Analysis</h2>
          <p className="text-muted-foreground text-lg">Analyze how extra payments affect your loan tenure. Coming soon.</p>
        </div>
      )}
    </>
  );
}
