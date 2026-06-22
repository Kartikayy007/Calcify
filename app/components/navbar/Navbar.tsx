import { NavbarLogo } from "./NavbarLogo";
import { NavbarTabs } from "./NavbarTabs";
import { NavbarActions } from "./NavbarActions";
import { Suspense } from "react";

export function Navbar() {
  return (
    <div className="fixed top-4 left-0 w-full z-40 px-4 md:px-6 flex justify-center pointer-events-none">
      <nav className="clay-card relative w-full max-w-7xl rounded-[2rem] flex items-center justify-between px-5 py-3 pointer-events-auto transition-all duration-300">
        <div className="flex items-center gap-3">
          <NavbarLogo />
          <span className="font-extrabold text-xl tracking-tight text-foreground/90">Calcify</span>
        </div>

        <Suspense fallback={<div className="hidden md:flex w-[402px] h-[36px]"></div>}>
          <NavbarTabs />
        </Suspense>

        <NavbarActions />
      </nav>
    </div>
  );
}
