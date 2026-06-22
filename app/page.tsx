
import { CalculatorShell } from "./components/calculator/CalculatorShell";
import { MobileTabBar } from "./components/navbar/MobileTabBar";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center p-3 sm:p-4 md:p-6 pb-24 md:pb-12 pt-24 sm:pt-28 md:pt-28 xl:pt-32 w-full max-w-[1500px] mx-auto min-h-screen">
        <div className="w-full flex flex-col items-center justify-start">
          <CalculatorShell />
        </div>
      </main>
      <MobileTabBar />
    </>
  );
}
