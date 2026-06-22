"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useSharedWorkspace } from "../hooks/useSharedWorkspace";
import type { WorkspaceAction } from "../lib/workspace";
import type { WorkspaceState } from "../lib/types";

interface WorkspaceContextType {
  state: WorkspaceState;
  dispatchWorkspace: (action: WorkspaceAction) => void;
  dispatchLocal: (action: WorkspaceAction) => void;
  tabLabel: string;
  activeTabs: number;
  isConnected: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { state, dispatchWorkspace, dispatchLocal, tabLabel, activeTabs, isConnected } = useSharedWorkspace();

  const value = useMemo(
    () => ({ state, dispatchWorkspace, dispatchLocal, tabLabel, activeTabs, isConnected }),
    [state, dispatchWorkspace, dispatchLocal, tabLabel, activeTabs, isConnected],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
