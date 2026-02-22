import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { IntroOverlay } from "./components/IntroOverlay";
import { SignatureHeader } from "./components/SignatureHeader";
import { HeroSignature } from "./components/HeroSignature";
import { WorkSignature } from "./components/WorkSignature";
import { SignatureCursor } from "./components/SignatureCursor";
import { SignatureScrollbar } from "./components/SignatureScrollbar";
import { ContrastMaskLayer } from "./components/ContrastMaskLayer";
import { navItems } from "./config/siteContent";
import { ENABLE_HEAVY_MOTION, FILM_GRAIN_ENABLED, LENIS_ENABLED } from "./config/motion";
import { useCinematicCapability } from "./hooks/useCinematicCapability";
import { useSectionProgress } from "./hooks/useSectionProgress";

const AboutSection = lazy(() =>
  import("./components/AboutSection").then((module) => ({ default: module.AboutSection })),
);
const ExperienceSection = lazy(() =>
  import("./components/ExperienceSection").then((module) => ({ default: module.ExperienceSection })),
);
const SkillsSection = lazy(() =>
  import("./components/SkillsSection").then((module) => ({ default: module.SkillsSection })),
);
const EducationSection = lazy(() =>
  import("./components/EducationSection").then((module) => ({ default: module.EducationSection })),
);
const CertificatesSection = lazy(() =>
  import("./components/CertificatesSection").then((module) => ({ default: module.CertificatesSection })),
);
const ContactSection = lazy(() =>
  import("./components/ContactSection").then((module) => ({ default: module.ContactSection })),
);
const Footer = lazy(() =>
  import("./components/Footer").then((module) => ({ default: module.Footer })),
);

export default function App() {
  const {
    reducedMotion,
    shouldReduceEffects,
    isCinematicDesktop,
    isCinematicMobile,
    isStaticMode,
    parallaxIntensity,
  } =
    useCinematicCapability();
  const [introComplete, setIntroComplete] = useState(false);
  const [deferredContentReady, setDeferredContentReady] = useState(false);
  const [isContrasted, setIsContrasted] = useState(false);
  const [maskAnimating, setMaskAnimating] = useState(false);
  const sectionHrefs = useMemo(() => navItems.map((item) => item.href), []);
  const { progress } = useSectionProgress(sectionHrefs);

  const heavyMotion = ENABLE_HEAVY_MOTION && !reducedMotion && !shouldReduceEffects;
  const lenisEnabled = LENIS_ENABLED && !reducedMotion && !shouldReduceEffects;
  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  useEffect(() => {
    const persisted = localStorage.getItem("ha-contrast");
    if (persisted === "1") {
      document.documentElement.classList.add("theme-contrasted");
      setIsContrasted(true);
    }
  }, []);

  useEffect(() => {
    if (!introComplete) return;
    const activateDeferredContent = () => setDeferredContentReady(true);

    if ("requestIdleCallback" in window) {
      const id = (
        window as Window & {
          requestIdleCallback: (cb: () => void, options?: { timeout: number }) => number;
          cancelIdleCallback: (id: number) => void;
        }
      ).requestIdleCallback(activateDeferredContent, { timeout: 900 });
      return () =>
        (
          window as Window & {
            cancelIdleCallback: (id: number) => void;
          }
        ).cancelIdleCallback(id);
    }

    const timeoutId = window.setTimeout(activateDeferredContent, 220);
    return () => window.clearTimeout(timeoutId);
  }, [introComplete]);

  useEffect(() => {
    if (!lenisEnabled) return;

    const lenis = new Lenis({ smoothWheel: true, syncTouch: false, lerp: 0.12 });
    (window as Window & { lenis?: Lenis }).lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as Window & { lenis?: Lenis }).lenis;
    };
  }, [lenisEnabled]);

  const toggleContrast = () => {
    setMaskAnimating(true);
    const next = !isContrasted;
    setIsContrasted(next);
    localStorage.setItem("ha-contrast", next ? "1" : "0");

    if (next) {
      document.documentElement.classList.add("theme-contrasted");
    } else {
      document.documentElement.classList.remove("theme-contrasted");
    }

    window.setTimeout(() => setMaskAnimating(false), 700);
  };

  return (
    <div
      className={`signature-site ${isStaticMode ? "is-static-mode" : "is-cinematic-mode"} ${
        isCinematicDesktop ? "is-cinematic-desktop" : ""
      } ${isCinematicMobile ? "is-cinematic-mobile" : ""} ${FILM_GRAIN_ENABLED ? "" : "is-grain-disabled"}`}
    >
      <IntroOverlay skip={reducedMotion || shouldReduceEffects} onComplete={handleIntroComplete} />
      <ContrastMaskLayer isAnimating={maskAnimating} isContrasted={isContrasted} />
      <SignatureScrollbar progress={progress} />
      <SignatureCursor />

      <div className={`site-shell ${introComplete ? "is-ready" : ""}`}>
        <SignatureHeader
          introComplete={introComplete}
          isContrasted={isContrasted}
          onToggleContrast={toggleContrast}
        />
        <HeroSignature
          introComplete={introComplete}
          heavyMotion={heavyMotion}
          isCinematicDesktop={isCinematicDesktop}
          isCinematicMobile={isCinematicMobile}
          isStaticMode={isStaticMode}
          parallaxIntensity={parallaxIntensity}
        />
        <Suspense fallback={<section id="about" className="signature-section signature-section--placeholder" aria-hidden="true" />}>
          <AboutSection />
        </Suspense>
        <WorkSignature isStaticMode={isStaticMode} />

        <Suspense fallback={null}>
          {deferredContentReady && (
            <>
              <ExperienceSection />
              <SkillsSection />
              <EducationSection />
              <CertificatesSection />
              <ContactSection />
              <Footer />
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
}
