import { useEffect, useMemo, useState } from "react";
import { CINEMATIC_MODE, HERO_PARALLAX_INTENSITY, MOBILE_MOTION_MULTIPLIER } from "../config/motion";
import { usePowerMode } from "./usePowerMode";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export function useCinematicCapability() {
  const { reducedMotion } = useReducedMotionSafe();
  const { shouldReduceEffects } = usePowerMode();
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const widthQuery = window.matchMedia("(min-width: 1024px)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const sync = () => {
      setIsDesktopViewport(widthQuery.matches);
      setIsFinePointer(pointerQuery.matches);
    };

    sync();
    widthQuery.addEventListener("change", sync);
    pointerQuery.addEventListener("change", sync);

    return () => {
      widthQuery.removeEventListener("change", sync);
      pointerQuery.removeEventListener("change", sync);
    };
  }, []);

  return useMemo(() => {
    const isStaticMode = reducedMotion || shouldReduceEffects;
    const isCinematicDesktop = CINEMATIC_MODE && !isStaticMode && isDesktopViewport && isFinePointer;
    const isCinematicMobile = CINEMATIC_MODE && !isStaticMode && !isCinematicDesktop;
    const parallaxIntensity = isCinematicDesktop
      ? HERO_PARALLAX_INTENSITY
      : MOBILE_MOTION_MULTIPLIER;

    return {
      isStaticMode,
      isCinematicDesktop,
      isCinematicMobile,
      parallaxIntensity,
      reducedMotion,
      shouldReduceEffects,
    };
  }, [reducedMotion, shouldReduceEffects, isDesktopViewport, isFinePointer]);
}
