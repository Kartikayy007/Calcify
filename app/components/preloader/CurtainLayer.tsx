"use client";

import { ReactNode } from "react";
import { CONFIG } from "@/app/config";
import { CurtainLayerProps } from "./types";

export function CurtainLayer({
  bgColor,
  isAnimating,
  delay,
  zIndex,
  children,
}: CurtainLayerProps) {
  const transitionCSS = `transform ${CONFIG.preloader.timing.animationDurationMs}ms cubic-bezier(0.76, 0, 0.24, 1) ${delay}ms`;

  return (
    <div
      className="fixed top-0 left-0 w-full flex flex-col will-change-transform"
      style={{
        height: CONFIG.preloader.sizes.layerHeight,
        zIndex,
        transform: isAnimating
          ? `translateY(-${CONFIG.preloader.sizes.layerHeight})`
          : "translateY(0)",
        transition: transitionCSS,
      }}
    >
      <div
        className="w-full relative"
        style={{
          height: CONFIG.preloader.sizes.bodyHeight,
          backgroundColor: bgColor,
        }}
      >
        {children}
      </div>
      <svg
        className="w-full -mt-[1px]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          color: bgColor,
          height: CONFIG.preloader.sizes.curveHeight,
        }}
      >
        <path d="M 0 0 C 30 100 70 100 100 0 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
