import { AppConfig } from "./types";

export const CONFIG: AppConfig = {
  preloader: {
    colors: {
      frontLayer: "#0F172A",
      curtains: ["#F5090D", "#FBD306", "#31F689", "#82F2EB"],
    },
    timing: {
      waitTimeMs: 3000,
      animationDurationMs: 1400,
      staggerDelayMs: 150,
    },
    assets: {
      logoSrc: "/Preloader/Money.lottie",
    },
    sizes: {
      logoWrapper: "relative w-48 h-48 sm:w-64 sm:h-64 drop-shadow-2xl",
      layerHeight: "120vh",
      bodyHeight: "100vh",
      curveHeight: "20vh",
    },
    typography: {
      loadingTextSize: "text-2xl sm:text-4xl",
      loadingFontWeight: "font-bold",
    },
  },
};
