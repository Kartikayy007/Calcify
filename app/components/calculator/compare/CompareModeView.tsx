import { useState, useEffect, useRef } from "react";
import type { ComparisonScenario, LoanInput } from "../../../lib/types";
import { useCompareAnalysis } from "../../../hooks/compare/useCompareAnalysis";
import { ScenarioCard } from "./ScenarioCard";

interface CompareModeViewProps {
  scenarios: ComparisonScenario[];
  activeScenarioId: string;
  onScenarioChange: (id: string, field: keyof LoanInput, value: number) => void;
  onScenarioFocus: (id: string) => void;
  onAddScenario?: () => void;
  onDeleteScenario?: (id: string) => void;
}

export function CompareModeView({ scenarios, activeScenarioId, onScenarioChange, onScenarioFocus, onAddScenario, onDeleteScenario }: CompareModeViewProps) {
  const { items, bestId } = useCompareAnalysis(scenarios);
  const [showIndicator, setShowIndicator] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>(null);
  const showIndicatorRef = useRef(false);
  showIndicatorRef.current = showIndicator;

  const handleAddClick = () => {
    if (onAddScenario) {
      onAddScenario();
      if (scenarios.length >= 2) {
        setShowIndicator(true);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          setShowIndicator(false);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (showIndicatorRef.current) {
        setShowIndicator(false);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="px-2">
        <h2 className="text-3xl font-extrabold text-foreground mb-2">Compare Loans</h2>
        <p className="text-muted-foreground font-semibold">See how tenure and rate affect total cost.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch auto-rows-fr">
        {items.map(({ scenario, summary }) => (
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            summary={summary}
            isBest={scenario.id === bestId}
            isActive={scenario.id === activeScenarioId}
            onFocus={() => onScenarioFocus(scenario.id)}
            onInputChange={(field, value) => onScenarioChange(scenario.id, field, value)}
            onDelete={scenarios.length > 1 && onDeleteScenario ? () => onDeleteScenario(scenario.id) : undefined}
          />
        ))}
        {onAddScenario && scenarios.length < 3 && (
          <div
            key="add-scenario-btn"
            onClick={handleAddClick}
            className="h-full mt-4 p-5 rounded-3xl flex flex-col items-center justify-center cursor-pointer bg-black/5 dark:bg-transparent hover:bg-black/10 dark:hover:bg-white/5 transition-all duration-300 border-[3px] border-dashed border-black/20 dark:border-white/10 group"
          >
            <div className="w-14 h-14 rounded-full clay-btn flex items-center justify-center text-2xl text-foreground mb-4 group-hover:scale-110 transition-transform">
              +
            </div>
            <p className="font-bold text-muted-foreground group-hover:text-foreground transition-colors">Add Scenario</p>
          </div>
        )}
      </div>

      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${showIndicator ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div 
          className="w-12 h-12 rounded-full clay-btn flex items-center justify-center text-foreground cursor-pointer shadow-xl shadow-black/20"
          onClick={() => window.scrollBy({ top: 300, behavior: 'smooth' })}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
        </div>
      </div>
    </div>
  );
}
