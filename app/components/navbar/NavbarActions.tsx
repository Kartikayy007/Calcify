"use client";

import { useWorkspace } from "../../providers/WorkspaceProvider";
import { ThemeToggle } from "./ThemeToggle";

export function NavbarActions() {
  const { tabLabel, activeTabs } = useWorkspace();

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="clay-btn px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold text-muted-foreground flex items-center cursor-pointer whitespace-nowrap">
        {tabLabel}
      </div>
      <div className="clay-btn px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold text-muted-foreground flex items-center cursor-pointer whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 sm:mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
        {activeTabs} active {activeTabs === 1 ? 'tab' : 'tabs'}
      </div>
      <ThemeToggle />
    </div>
  );
}
