import { useEffect, useRef, useState } from "react";
import { usePowerMode } from "../hooks/usePowerMode";
import { useReducedMotionSafe } from "../hooks/useReducedMotionSafe";

type SignatureScrollbarProps = {
  progress: number;
};

type LenisLike = { scrollTo: (target: number) => void };

export function SignatureScrollbar({ progress }: SignatureScrollbarProps) {
  const { reducedMotion } = useReducedMotionSafe();
  const { shouldReduceEffects } = usePowerMode();
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncDesktop = () => setDesktop(mediaQuery.matches);
    syncDesktop();
    mediaQuery.addEventListener("change", syncDesktop);
    return () => mediaQuery.removeEventListener("change", syncDesktop);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (event: MouseEvent) => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      const totalScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const targetY = ratio * totalScrollable;
      const lenis = (window as Window & { lenis?: LenisLike }).lenis;

      if (lenis) {
        lenis.scrollTo(targetY);
      } else {
        window.scrollTo({ top: targetY, behavior: "auto" });
      }
    };

    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  if (!desktop || reducedMotion || shouldReduceEffects) {
    return null;
  }

  return (
    <aside
      className={`signature-scrollbar ${dragging ? "is-dragging" : ""}`}
      style={{ ["--scroll-progress" as string]: `${progress}` }}
      aria-hidden="true"
    >
      <div ref={trackRef} className="signature-scrollbar__track">
        <button
          type="button"
          className="signature-scrollbar__thumb"
          style={{ top: `${progress * 100}%` }}
          onMouseDown={() => setDragging(true)}
          tabIndex={-1}
          aria-label="Scroll position"
        />
      </div>
    </aside>
  );
}
