import { ReactNode } from "react";

export interface AppConfig {
  preloader: {
    colors: {
      frontLayer: string;
      curtains: string[];
    };
    timing: {
      waitTimeMs: number;
      animationDurationMs: number;
      staggerDelayMs: number;
    };
    assets: {
      logoSrc: string;
    };
    sizes: {
      logoWrapper: string;
      layerHeight: string;
      bodyHeight: string;
      curveHeight: string;
    };
    typography: {
      loadingTextSize: string;
      loadingFontWeight: string;
    };
  };
}
