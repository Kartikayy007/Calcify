import { AppConfig } from "./types";

export const CONFIG: AppConfig = {
  preloader: {
    colors: {
      frontLayer: "#171717",
      curtains: ["#7286C9", "#61CA97", "#10b981"],
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
