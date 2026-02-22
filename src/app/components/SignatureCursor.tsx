import { Hand, MousePointer2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CURSOR_ENABLED } from "../config/motion";
import { usePowerMode } from "../hooks/usePowerMode";
import { useReducedMotionSafe } from "../hooks/useReducedMotionSafe";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, [role='button'], [data-cursor='pointer']";

export function SignatureCursor() {
  const { reducedMotion } = useReducedMotionSafe();
  const { shouldReduceEffects } = usePowerMode();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const pointerStateRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const sync = () => {
      const allow = CURSOR_ENABLED && mediaQuery.matches && !reducedMotion && !shouldReduceEffects;
      setEnabled(allow);
    };

    sync();
    mediaQuery.addEventListener("change", sync);

    return () => mediaQuery.removeEventListener("change", sync);
  }, [reducedMotion, shouldReduceEffects]);

  useEffect(() => {
    const root = document.documentElement;
    const shouldHideNativeCursor = enabled && visible;
    root.classList.toggle("cursor-enabled", shouldHideNativeCursor);
    return () => {
      root.classList.remove("cursor-enabled");
    };
  }, [enabled, visible]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      if (!visible) {
        setVisible(true);
      }

      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
      const nextPointer = Boolean(target);
      if (nextPointer !== pointerStateRef.current) {
        pointerStateRef.current = nextPointer;
        setIsPointer(nextPointer);
      }
    };

    const handleLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        setVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
    };
  }, [enabled, visible]);

  if (!enabled || !visible) return null;

  return (
    <div ref={cursorRef} className={`signature-cursor ${isPointer ? "is-pointer" : ""}`} aria-hidden="true">
      <span className="signature-cursor__glyph">
        {isPointer ? <Hand size={28} /> : <MousePointer2 size={28} />}
      </span>
    </div>
  );
}
