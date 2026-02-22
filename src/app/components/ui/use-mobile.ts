import * as React from "react";
import { addMediaQueryChangeListener, removeMediaQueryChangeListener } from "@/app/hooks/mediaQueryListener";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    addMediaQueryChangeListener(mql, onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => removeMediaQueryChangeListener(mql, onChange);
  }, []);

  return !!isMobile;
}
