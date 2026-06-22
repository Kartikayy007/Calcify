"use client";

import { useEffect } from "react";

interface CompareScrollHintProps {
  show: boolean;
  onDismiss: () => void;
}

export function CompareScrollHint({ show, onDismiss }: CompareScrollHintProps) {
  useEffect(() => {
    const handleScroll = () => {
      if (show) {
        onDismiss();
      }
    };
    
    if (show) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      const timeout = setTimeout(onDismiss, 2000);
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timeout);
      };
    }
  }, [show, onDismiss]);

  return (
    <div className={`fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
      <div 
        className="w-12 h-12 rounded-full clay-btn flex items-center justify-center text-foreground cursor-pointer shadow-xl shadow-black/20"
        onClick={() => {
          window.scrollBy({ top: 300, behavior: 'smooth' });
          onDismiss();
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </div>
  );
}
