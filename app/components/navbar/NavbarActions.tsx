import { ThemeToggle } from "./ThemeToggle";

export function NavbarActions() {
  return (
    <div className="flex items-center gap-4">
      <div className="clay-btn px-4 py-2 rounded-full text-sm font-semibold text-muted-foreground hidden sm:flex items-center cursor-pointer">
        Tab A
      </div>
      <div className="clay-btn px-4 py-2 rounded-full text-sm font-semibold text-muted-foreground hidden md:flex items-center cursor-pointer">
        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
        2 active tabs
      </div>
      <ThemeToggle />
    </div>
  );
}
