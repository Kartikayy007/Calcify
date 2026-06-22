"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { CurtainLayer } from "./CurtainLayer";
import { CONFIG } from "@/app/config";
import { PreloaderStage } from "./types";
import { useWorkspace } from "@/app/providers/WorkspaceProvider";

export default function Preloader() {
  const [stage, setStage] = useState<PreloaderStage>("loading");
  const { isConnected } = useWorkspace();
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined" && document.readyState === "complete") {
      setWindowLoaded(true);
      return;
    }
    const onLoad = () => setWindowLoaded(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMinElapsed(true), CONFIG.preloader.timing.waitTimeMs);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (stage !== "loading") return;
    if (!(windowLoaded && isConnected && minElapsed)) return;

    setStage("animatingOut");

    const maxDelay =
      CONFIG.preloader.colors.curtains.length * CONFIG.preloader.timing.staggerDelayMs;
    const animationDuration = CONFIG.preloader.timing.animationDurationMs;
    const buffer = 500;

    const unmountTimer = setTimeout(() => {
      setStage("hidden");
    }, animationDuration + maxDelay + buffer);

    return () => clearTimeout(unmountTimer);
  }, [stage, windowLoaded, isConnected, minElapsed]);

  if (stage === "hidden") return null;

  const isAnimating = stage === "animatingOut";

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        stage === "loading" ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {CONFIG.preloader.colors.curtains.map((color, index) => {
        const layerDelay = (index + 1) * CONFIG.preloader.timing.staggerDelayMs;
        const layerZIndex = 100 - index;

        return (
          <CurtainLayer
            key={`${color}-${index}`}
            bgColor={color}
            isAnimating={isAnimating}
            delay={layerDelay}
            zIndex={layerZIndex}
          />
        );
      })}

      <CurtainLayer
        bgColor={CONFIG.preloader.colors.frontLayer}
        isAnimating={isAnimating}
        delay={0}
        zIndex={101}
      >
        <div className="absolute inset-0 flex items-center justify-center h-screen">
          <div className={CONFIG.preloader.sizes.logoWrapper}>
            {CONFIG.preloader.assets.logoSrc.endsWith(".lottie") ? (
              <DotLottieReact src={CONFIG.preloader.assets.logoSrc} autoplay />
            ) : (
              <Image
                src={CONFIG.preloader.assets.logoSrc}
                alt="Loading"
                fill
                priority
                className="object-contain"
              />
            )}
          </div>
        </div>
      </CurtainLayer>
    </div>
  );
}
