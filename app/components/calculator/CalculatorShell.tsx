"use client";

import { useState, useRef } from "react";
import { EmiCalculator } from "./EmiCalculator";
import { CompareModeView } from "./compare/CompareModeView";
import { PrepaymentModeView } from "./prepayment/PrepaymentModeView";
import { DEFAULT_LOAN, DEFAULT_SCENARIOS, DEFAULT_ACTIVE_SCENARIO_ID, updateScenarioField } from "../../lib/compare";
import { addPrepayment, updatePrepayment, removePrepayment, sanitizePrepayments, createPrepayment } from "../../lib/prepayment";
import type { LoanInput, ComparisonScenario, Prepayment } from "../../lib/types";

interface CalculatorShellProps {
  tab: string;
}

export function CalculatorShell({ tab }: CalculatorShellProps) {
  const [loan, setLoan] = useState<LoanInput>(DEFAULT_LOAN);
  const [scenarios, setScenarios] = useState<ComparisonScenario[]>(DEFAULT_SCENARIOS);
  const [activeScenarioId, setActiveScenarioId] = useState<string>(DEFAULT_ACTIVE_SCENARIO_ID);
  const [prepayments, setPrepayments] = useState<Prepayment[]>([]);

  const prevTab = useRef(tab);
  if (prevTab.current === "compare" && tab === "single") {
    const active = scenarios.find(s => s.id === activeScenarioId) ?? scenarios[0];
    setLoan(active.input);
  }
  prevTab.current = tab;

  const handleLoanChange = (next: LoanInput) => {
    setLoan(next);
    setPrepayments(prev => sanitizePrepayments(prev, next.tenureMonths));
  };

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

  const handleAddPrepayment = () => {
    setPrepayments(prev => addPrepayment(prev, createPrepayment(Math.min(12, loan.tenureMonths)), loan.tenureMonths));
  };
  
  const handleUpdatePrepayment = (id: string, patch: Partial<Prepayment>) => {
    setPrepayments(prev => updatePrepayment(prev, id, patch, loan.tenureMonths));
  };

  const handleRemovePrepayment = (id: string) => {
    setPrepayments(prev => removePrepayment(prev, id));
  };

  return (
    <>
      {tab === "single" && <EmiCalculator loan={loan} onLoanChange={handleLoanChange} />}
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
        <PrepaymentModeView
          loan={loan}
          onLoanChange={handleLoanChange}
          prepayments={prepayments}
          onAddPrepayment={handleAddPrepayment}
          onUpdatePrepayment={handleUpdatePrepayment}
          onRemovePrepayment={handleRemovePrepayment}
        />
      )}
    </>
  );
}
