import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { INTRO_DURATION_MS } from "../config/motion";
import { introTimings } from "../config/siteContent";

type IntroOverlayProps = {
  skip: boolean;
  onComplete: () => void;
};

export function IntroOverlay({ skip, onComplete }: IntroOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const container = containerRef.current;
    const logo = logoRef.current;
    const top = topRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!container || !logo || !top || !left || !right) return;

    if (skip) {
      onComplete();
      return;
    }

    root.classList.add("is-scroll-blocked");
    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      root.classList.remove("is-scroll-blocked");
      onComplete();
    };

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });
    const hardTimeout = window.setTimeout(
      finish,
      Math.min(Math.max(INTRO_DURATION_MS, introTimings.minDurationMs), introTimings.maxDurationMs),
    );

    tl.fromTo(
      [top, left, right],
      { scaleX: 0, scaleY: 0, transformOrigin: "center center" },
      { scaleX: 1, scaleY: 1, duration: 0.5, stagger: 0.06 },
    )
      .fromTo(
        logo,
        { opacity: 0, scale: 0.8, rotate: -6 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.5 },
        "-=0.2",
      )
      .to(container, { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "+=0.05");

    return () => {
      window.clearTimeout(hardTimeout);
      tl.kill();
      root.classList.remove("is-scroll-blocked");
    };
  }, [skip, onComplete]);

  if (skip) return null;

  return (
    <div ref={containerRef} className="signature-intro" aria-hidden="true">
      <div ref={logoRef} className="signature-intro__logo">
        <span>HA</span>
      </div>
      <div ref={topRef} className="signature-intro__border signature-intro__border--top" />
      <div ref={leftRef} className="signature-intro__border signature-intro__border--left" />
      <div ref={rightRef} className="signature-intro__border signature-intro__border--right" />
    </div>
  );
}
