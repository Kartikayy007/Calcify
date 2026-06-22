import { CalculatorShell } from "./components/calculator/CalculatorShell";

export default async function Home(props: { searchParams: Promise<{ tab?: string }> }) {
  const params = await props.searchParams;
  const tab = params.tab || "single";

  return (
    <main className="flex flex-col items-center p-4 md:p-6 pb-12 pt-24 xl:pt-28 w-full max-w-[1500px] mx-auto min-h-screen">
      <div className="w-full flex flex-col items-center justify-start">
        <CalculatorShell tab={tab} />
      </div>
    </main>
  );
}
