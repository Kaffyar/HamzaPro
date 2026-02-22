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
  const rafRef = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const targetPosition = useRef({ x: 0, y: 0 });
  const easedPosition = useRef({ x: 0, y: 0 });

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

    const animate = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        easedPosition.current.x += (targetPosition.current.x - easedPosition.current.x) * 0.2;
        easedPosition.current.y += (targetPosition.current.y - easedPosition.current.y) * 0.2;
        cursor.style.transform = `translate3d(${easedPosition.current.x}px, ${easedPosition.current.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      targetPosition.current = { x: event.clientX, y: event.clientY };
      if (!visible) {
        easedPosition.current = { x: event.clientX, y: event.clientY };
      }
      setVisible(true);
      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE_SELECTOR) : null;
      setIsPointer(Boolean(target));
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
      <span className="signature-cursor__ring" />
    </div>
  );
}
