import { ReactNode } from "react";

export interface CurtainLayerProps {
  bgColor: string;
  isAnimating: boolean;
  delay: number;
  zIndex: number;
  children?: ReactNode;
}

export type PreloaderStage = "loading" | "animatingOut" | "hidden";
