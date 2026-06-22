"use client";

import { usePathname } from "next/navigation";
import { useWorkspace } from "../../providers/WorkspaceProvider";
import type { WorkspaceMode } from "../../lib/types";

export function NavbarTabs() {
  const pathname = usePathname();
  const { state, dispatchWorkspace } = useWorkspace();
  
  if (pathname !== "/") return null;

  const tab = state.mode;

  const setMode = (mode: WorkspaceMode) => {
    dispatchWorkspace({ type: "SET_MODE", mode });
  };

  return (
    <div className="hidden md:flex items-center p-1.5 rounded-full clay-pill w-[280px] lg:w-[390px] shrink-0 relative">
      <div className="absolute inset-y-1.5 left-1.5 right-1.5 z-0 flex">
        <div 
          className="h-full w-1/3 clay-btn rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" 
          style={{ 
            transform: `translateX(${tab === 'single' ? '0%' : tab === 'compare' ? '100%' : '200%'})` 
          }} 
        />
      </div>
      <button 
        onClick={() => setMode("single")}
        className={`relative z-10 flex-1 text-center py-1.5 lg:py-2 text-[11px] lg:text-sm font-bold rounded-full transition-colors duration-300 ${tab === "single" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
      >
        Single Mode
      </button>
      <button 
        onClick={() => setMode("compare")}
        className={`relative z-10 flex-1 text-center py-1.5 lg:py-2 text-[11px] lg:text-sm font-bold rounded-full transition-colors duration-300 ${tab === "compare" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
      >
        Compare Mode
      </button>
      <button 
        onClick={() => setMode("prepayment")}
        className={`relative z-10 flex-1 text-center py-1.5 lg:py-2 text-[11px] lg:text-sm font-bold rounded-full transition-colors duration-300 ${tab === "prepayment" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
      >
        Prepayment
      </button>
    </div>
  );
}
