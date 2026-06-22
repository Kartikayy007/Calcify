export function BestScenarioBadge({ visible }: { visible: boolean }) {
  return (
    <div 
      className={`absolute -top-3 left-1/2 -translate-x-1/2 z-10 transition-all duration-500 ease-out origin-center
        ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2 pointer-events-none"}
      `}
    >
      <div className="inline-flex items-center justify-center px-4 py-1 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-xs font-extrabold tracking-wider uppercase rounded-full shadow-lg shadow-emerald-500/30">
        Lowest Total Payable
      </div>
    </div>
  );
}
