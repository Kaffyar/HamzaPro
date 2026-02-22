import { useEffect, useState } from "react";
import { addMediaQueryChangeListener, removeMediaQueryChangeListener } from "./mediaQueryListener";

export function useReducedMotionSafe() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    addMediaQueryChangeListener(mediaQuery, update);

    return () => removeMediaQueryChangeListener(mediaQuery, update);
  }, []);

  return { reducedMotion };
}
