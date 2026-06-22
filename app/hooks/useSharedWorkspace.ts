"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { defaultWorkspaceState, sanitizeWorkspaceState, isDefaultWorkspaceState } from "../lib/workspace/workspace";
import { workspaceReducer, type WorkspaceAction } from "../lib/workspace/workspaceReducer";
import { decodeWorkspaceUrl } from "../lib/url/workspaceUrl";
import type { WorkspaceState } from "../lib/types";

const CHANNEL_NAME = "emi-shared-workspace";
const HEARTBEAT_MS = 2_000;
const STALE_AFTER_MS = 5_000;

type SyncMessage =
  | {
      type: "state";
      sourceTabId: string;
      updatedAt: number;
      state: WorkspaceState;
    }
  | {
      type: "heartbeat";
      sourceTabId: string;
      label: string;
      sentAt: number;
    }
  | {
      type: "leave";
      sourceTabId: string;
    }
  | {
      type: "request_state";
      sourceTabId: string;
      sentAt: number;
    }
  | {
      type: "state_offer";
      sourceTabId: string;
      updatedAt: number;
      state: WorkspaceState;
    };

type PresenceEntry = {
  label: string;
  seenAt: number;
};

function compareUpdate(a: { updatedAt: number; sourceTabId: string }, b: { updatedAt: number; sourceTabId: string }) {
  if (a.updatedAt !== b.updatedAt) return a.updatedAt - b.updatedAt;
  return a.sourceTabId.localeCompare(b.sourceTabId);
}

function createTabIdentity() {
  const stored = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("emi-tab-id") : null;
  const nextId =
    stored ??
    (typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("emi-tab-id", nextId);
  }

  return {
    id: nextId,
    label: `Tab ${nextId.slice(0, 4).toUpperCase()}`,
  };
}

export function useSharedWorkspace() {
  const [tabId, setTabId] = useState("");
  const [tabLabel, setTabLabel] = useState("Tab ...");
  const [state, setState] = useState<WorkspaceState>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("emi-theme");
        if (stored === "dark" || stored === "light") {
          return { ...defaultWorkspaceState, theme: stored };
        }
      } catch {}
    }
    return defaultWorkspaceState;
  });
  const [presence, setPresence] = useState<Record<string, PresenceEntry>>({});
  const channelRef = useRef<BroadcastChannel | null>(null);
  const lastUpdateRef = useRef({ updatedAt: 0, sourceTabId: "" });
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const tab = createTabIdentity();

    window.queueMicrotask(() => {
      setTabId(tab.id);
      setTabLabel(tab.label);
      setPresence({ [tab.id]: { label: tab.label, seenAt: Date.now() } });
    });

    if (typeof window !== "undefined") {
      const decoded = decodeWorkspaceUrl(window.location.search);
      if (decoded.mode || decoded.loan || decoded.prepayments) {
        lastUpdateRef.current = { updatedAt: Date.now(), sourceTabId: tab.id };
        setState((current) => workspaceReducer(current, { 
          type: "HYDRATE_FROM_URL", 
          mode: decoded.mode, 
          loan: decoded.loan, 
          prepayments: decoded.prepayments 
        }));
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
    try {
      localStorage.setItem("emi-theme", state.theme);
    } catch {}
  }, [state.theme]);

  useEffect(() => {
    if (!tabId) return;

    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    const markPresent = (sourceTabId: string, label: string, seenAt: number) => {
      setPresence((current) => ({
        ...current,
        [sourceTabId]: { label, seenAt },
      }));
    };

    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      const message = event.data;

      if (!message || message.sourceTabId === tabId) {
        return;
      }

      if (message.type === "heartbeat") {
        markPresent(message.sourceTabId, message.label, message.sentAt);
        return;
      }

      if (message.type === "leave") {
        setPresence((current) => {
          const next = { ...current };
          delete next[message.sourceTabId];
          return next;
        });
        return;
      }

      if (message.type === "request_state") {
        if (lastUpdateRef.current.updatedAt > 0 || !isDefaultWorkspaceState(stateRef.current)) {
          channel.postMessage({
            type: "state_offer",
            sourceTabId: tabId,
            updatedAt: lastUpdateRef.current.updatedAt,
            state: stateRef.current,
          } satisfies SyncMessage);
        }
        return;
      }

      if (message.type === "state_offer") {
        const incoming = { updatedAt: message.updatedAt, sourceTabId: message.sourceTabId };
        
        if (compareUpdate(incoming, lastUpdateRef.current) > 0) {
          lastUpdateRef.current = incoming;
          setState((current) =>
            workspaceReducer(current, { type: "HYDRATE_REMOTE_STATE", state: sanitizeWorkspaceState(message.state) }),
          );
        }
        return;
      }

      if (message.type === "state") {
        const incoming = { updatedAt: message.updatedAt, sourceTabId: message.sourceTabId };

        if (compareUpdate(incoming, lastUpdateRef.current) > 0) {
          lastUpdateRef.current = incoming;
          setState((current) =>
            workspaceReducer(current, { type: "HYDRATE_REMOTE_STATE", state: sanitizeWorkspaceState(message.state) }),
          );
        }
      }
    };

    const postHeartbeat = () => {
      const sentAt = Date.now();
      markPresent(tabId, tabLabel, sentAt);
      channel.postMessage({ type: "heartbeat", sourceTabId: tabId, label: tabLabel, sentAt } satisfies SyncMessage);
    };

    postHeartbeat();
    channel.postMessage({ type: "request_state", sourceTabId: tabId, sentAt: Date.now() } satisfies SyncMessage);

    const heartbeatId = window.setInterval(postHeartbeat, HEARTBEAT_MS);
    const pruneId = window.setInterval(() => {
      const cutoff = Date.now() - STALE_AFTER_MS;
      setPresence((current) =>
        Object.fromEntries(Object.entries(current).filter(([id, entry]) => id === tabId || entry.seenAt >= cutoff)),
      );
    }, HEARTBEAT_MS);

    const leave = () => {
      channel.postMessage({ type: "leave", sourceTabId: tabId } satisfies SyncMessage);
    };

    window.addEventListener("pagehide", leave);
    window.addEventListener("beforeunload", leave);

    return () => {
      leave();
      window.clearInterval(heartbeatId);
      window.clearInterval(pruneId);
      window.removeEventListener("pagehide", leave);
      window.removeEventListener("beforeunload", leave);
      channel.close();
      channelRef.current = null;
    };
  }, [tabId, tabLabel]);

  const dispatchWorkspace = useCallback(
    (action: WorkspaceAction) => {
      setState((current) => {
        const next = workspaceReducer(current, action);
        
        if (JSON.stringify(current) === JSON.stringify(next)) {
          return current;
        }

        const updatedAt = Date.now();

        lastUpdateRef.current = { updatedAt, sourceTabId: tabId };
        channelRef.current?.postMessage({
          type: "state",
          sourceTabId: tabId,
          updatedAt,
          state: next,
        } satisfies SyncMessage);

        return next;
      });
    },
    [tabId],
  );

  const dispatchLocal = useCallback(
    (action: WorkspaceAction) => {
      setState((current) => workspaceReducer(current, action));
    },
    [],
  );

  return {
    state,
    dispatchWorkspace,
    dispatchLocal,
    tabLabel,
    activeTabs: Object.keys(presence).length || 1,
    isConnected: !!tabId,
  };
}
