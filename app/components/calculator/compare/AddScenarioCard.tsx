interface AddScenarioCardProps {
  onClick: () => void;
}

export function AddScenarioCard({ onClick }: AddScenarioCardProps) {
  return (
    <div
      onClick={onClick}
      className="h-full mt-4 p-5 rounded-3xl flex flex-col items-center justify-center cursor-pointer bg-black/5 dark:bg-transparent hover:bg-black/10 dark:hover:bg-white/5 transition-all duration-300 border-[3px] border-dashed border-black/20 dark:border-white/10 group"
    >
      <div className="w-14 h-14 rounded-full clay-btn flex items-center justify-center text-2xl text-foreground mb-4 group-hover:scale-110 transition-transform">
        +
      </div>
      <p className="font-bold text-muted-foreground group-hover:text-foreground transition-colors">Add Scenario</p>
    </div>
  );
}
