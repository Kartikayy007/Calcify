"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

export function NavbarTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  if (pathname !== "/") return null;

  const tab = searchParams.get("tab") || "single";

  return (
    <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center p-1.5 rounded-full clay-pill">
      <div 
        className="absolute top-1.5 bottom-1.5 w-[130px] clay-btn rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" 
        style={{ 
          transform: `translateX(${tab === 'single' ? 0 : tab === 'compare' ? 130 : 260}px)` 
        }} 
      />
      <Link 
        href="/?tab=single" 
        className={`relative z-10 w-[130px] text-center py-2 text-sm font-bold rounded-full transition-colors duration-300 ${tab === "single" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
      >
        Single Mode
      </Link>
      <Link 
        href="/?tab=compare" 
        className={`relative z-10 w-[130px] text-center py-2 text-sm font-bold rounded-full transition-colors duration-300 ${tab === "compare" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
      >
        Compare Mode
      </Link>
      <Link 
        href="/?tab=prepayment" 
        className={`relative z-10 w-[130px] text-center py-2 text-sm font-bold rounded-full transition-colors duration-300 ${tab === "prepayment" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
      >
        Prepayment
      </Link>
    </div>
  );
}
