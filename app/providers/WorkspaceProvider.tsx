"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSharedWorkspace } from "../hooks/useSharedWorkspace";
import type { WorkspaceAction } from "../lib/workspace";
import type { WorkspaceState } from "../lib/types";

interface WorkspaceContextType {
  state: WorkspaceState;
  dispatchWorkspace: (action: WorkspaceAction) => void;
  dispatchLocal: (action: WorkspaceAction) => void;
  tabLabel: string;
  activeTabs: number;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const workspace = useSharedWorkspace();

  return <WorkspaceContext.Provider value={workspace}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
