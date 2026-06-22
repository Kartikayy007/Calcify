"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

export function NavbarLogo() {
  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    if (dotLottie) {
      dotLottie.addEventListener("load", () => {
        const total = dotLottie.totalFrames;
        if (total > 0) {
          dotLottie.setFrame(total - 1);
        }
      });
    }
  };

  return (
    <div className="w-10 h-10 overflow-hidden flex items-center justify-center bg-transparent drop-shadow-md">
      <DotLottieReact
        src="/Preloader/Money.lottie"
        autoplay={false}
        loop={false}
        dotLottieRefCallback={dotLottieRefCallback}
      />
    </div>
  );
}
