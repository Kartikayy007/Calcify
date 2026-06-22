"use client";

import { useEffect, useState } from "react";
import { useWorkspace } from "../../providers/WorkspaceProvider";

export function ThemeToggle() {
  const { state, dispatchWorkspace } = useWorkspace();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    dispatchWorkspace({ type: "TOGGLE_THEME" });
  };

  if (!mounted) {
    return (
      <button className="clay-btn px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 text-foreground/80 opacity-0 cursor-default">
        🌙
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="clay-btn px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 text-foreground/80 hover:text-foreground cursor-pointer"
      title="Toggle Theme"
    >
      {state.theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
