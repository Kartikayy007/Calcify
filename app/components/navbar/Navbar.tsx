"use client";

import { NavbarLogo } from "./NavbarLogo";
import { NavbarTabs } from "./NavbarTabs";
import { NavbarActions } from "./NavbarActions";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed left-0 w-full z-40 px-2 sm:px-4 md:px-6 flex justify-center pointer-events-none transition-all duration-500 ease-in-out ${isVisible ? 'top-2 sm:top-4 md:top-8 translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'}`}>
      <nav className="clay-card relative w-full max-w-[1500px] rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-between px-3 py-2.5 sm:px-5 sm:py-3 pointer-events-auto transition-all duration-300">
        <div className="flex items-center gap-3">
          <NavbarLogo />
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-foreground/90">Calcify</span>
        </div>

        <NavbarTabs />

        <NavbarActions />
      </nav>
    </div>
  );
}
