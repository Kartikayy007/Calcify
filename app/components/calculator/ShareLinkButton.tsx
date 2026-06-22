"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function ShareLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 p-2 px-4 rounded-full clay-btn transition-colors duration-300 ${
        copied ? "text-emerald-500" : "text-muted-foreground hover:text-emerald-500"
      }`}
      title="Copy shareable link"
    >
      {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      <span className="text-sm font-bold">{copied ? "Copied!" : "Share"}</span>
    </button>
  );
}
