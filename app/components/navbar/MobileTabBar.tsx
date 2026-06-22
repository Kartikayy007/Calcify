"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

export function MobileTabBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  if (pathname !== "/") return null;

  const currentTab = searchParams.get("tab") || "single";

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] z-50 md:hidden bg-background/80 backdrop-blur-xl border-t border-black/5 dark:border-white/5">
      <div className="clay-card rounded-2xl p-1.5 flex gap-2 w-full max-w-sm mx-auto shadow-[8px_8px_16px_rgba(0,0,0,0.05),-8px_-8px_16px_rgba(255,255,255,0.8)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.4),-8px_-8px_16px_rgba(255,255,255,0.05)]">
        {[
          { id: "single", label: "Single" },
          { id: "compare", label: "Compare" },
          { id: "prepayment", label: "Prepay" }
        ].map((tab) => (
          <Link
            key={tab.id}
            href={`/?tab=${tab.id}`}
            className={`flex-1 py-3 text-center text-xs font-bold rounded-xl transition-all duration-300 tracking-wide ${
              currentTab === tab.id
                ? "clay-btn bg-black/5 dark:bg-white/10 text-emerald-600 dark:text-emerald-400"
                : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
