import { EmiCalculator } from "./components/calculator/EmiCalculator";

export default async function Home(props: { searchParams: Promise<{ tab?: string }> }) {
  const params = await props.searchParams;
  const tab = params.tab || "single";

  return (
    <main className="flex flex-col items-center p-4 md:p-6 pb-12 pt-24 xl:pt-28 w-full max-w-[1500px] mx-auto min-h-screen">
      <div className="w-full flex flex-col items-center justify-start">
        {tab === "single" && <EmiCalculator />}
        {tab === "compare" && (
          <div className="clay-card p-12 rounded-[2rem] w-full text-center flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">Compare Mode</h2>
            <p className="text-muted-foreground text-lg">Compare multiple loan options side-by-side. Coming soon.</p>
          </div>
        )}
        {tab === "prepayment" && (
          <div className="clay-card p-12 rounded-[2rem] w-full text-center flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">Prepayment Analysis</h2>
            <p className="text-muted-foreground text-lg">Analyze how extra payments affect your loan tenure. Coming soon.</p>
          </div>
        )}
      </div>
    </main>
  );
}
