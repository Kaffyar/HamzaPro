import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, BadgeCheck, BriefcaseBusiness, Github, Linkedin, Mail, MapPin, Shield } from "lucide-react";
import { SignatureSeparator } from "./SignatureSeparator";

type HeroSignatureProps = {
  introComplete: boolean;
  heavyMotion: boolean;
  isCinematicDesktop: boolean;
  isCinematicMobile: boolean;
  isStaticMode: boolean;
  parallaxIntensity: number;
};

type SplitResult = {
  chars?: HTMLElement[];
  revert: () => void;
};

type LenisLike = { scrollTo: (target: string) => void };

function scrollToSection(href: `#${string}`) {
  const lenis = (window as Window & { lenis?: LenisLike }).lenis;
  if (lenis) {
    lenis.scrollTo(href);
    return;
  }
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HeroSignature({
  introComplete,
  heavyMotion,
  isCinematicDesktop,
  isCinematicMobile,
  isStaticMode,
  parallaxIntensity,
}: HeroSignatureProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const waveWrapRef = useRef<SVGSVGElement>(null);
  const mediaCardRef = useRef<HTMLDivElement>(null);
  const pointerOffset = useRef(0);
  const scrollRatioRef = useRef(0);

  useEffect(() => {
    if (!introComplete || !contentRef.current) return;

    const root = contentRef.current;
    const badge = root.querySelector(".hero-signature__badge");
    const subtitleBlock = root.querySelectorAll(
      ".hero-signature__subtitle, .hero-signature__alias, .hero-signature__description",
    );
    const facts = root.querySelector(".hero-signature__facts");
    const ctaButtons = root.querySelectorAll(".hero-signature__actions a");
    const socials = root.querySelectorAll(".hero-signature__socials a");
    const mediaCard = root.querySelector(".hero-signature__media-card");

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: isCinematicDesktop ? 0.14 : 0.06,
    });

    tl.fromTo(badge, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 })
      .fromTo(
        subtitleBlock,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.05 },
        "-=0.08",
      )
      .fromTo(facts, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45 }, "-=0.24")
      .fromTo(
        ctaButtons,
        { opacity: 0, y: 14, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.48, stagger: 0.08 },
        "-=0.22",
      )
      .fromTo(
        socials,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 },
        "-=0.24",
      )
      .fromTo(
        mediaCard,
        { opacity: 0, y: 16, rotateX: -8 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.6 },
        "-=0.28",
      );

    let split: SplitResult | null = null;
    let isActive = true;
    const runSplit = async () => {
      if (!heavyMotion || isStaticMode || !headingRef.current) return;
      const splitModule = await import("split-type");
      if (!isActive || !headingRef.current) return;
      const SplitType = splitModule.default;
      split = new SplitType(headingRef.current, { types: "chars,words" }) as unknown as SplitResult;
      tl.fromTo(
        split.chars ?? [],
        { opacity: 0, yPercent: 115, rotateX: -38 },
        { opacity: 1, yPercent: 0, rotateX: 0, duration: 0.85, stagger: 0.014, ease: "expo.out" },
        0.04,
      );
    };

    void runSplit();

    return () => {
      isActive = false;
      tl.kill();
      split?.revert();
    };
  }, [introComplete, heavyMotion, isCinematicDesktop, isStaticMode]);

  useEffect(() => {
    if (!heavyMotion || !wavePathRef.current) return;

    let rafId = 0;
    let width = 1200;
    let height = 340;
    const segmentCount = 18;
    const baseAmplitude = (isCinematicDesktop ? 24 : isCinematicMobile ? 16 : 12) * parallaxIntensity;
    const baseSpeed = isCinematicDesktop ? 0.00125 : 0.00095;

    const onResize = () => {
      width = window.innerWidth;
      height = Math.max(250, Math.min(430, window.innerHeight * 0.46));
    };

    const onScroll = () => {
      const fold = Math.max(window.innerHeight * 1.4, 1);
      scrollRatioRef.current = Math.min(1, window.scrollY / fold);
    };

    const onMove = (event: MouseEvent) => {
      if (!isCinematicDesktop) return;
      const halfY = window.innerHeight / 2;
      pointerOffset.current = ((event.clientY - halfY) / halfY) * (26 * parallaxIntensity);

      const halfX = window.innerWidth / 2;
      const xRatio = (event.clientX - halfX) / halfX;
      const yRatio = (event.clientY - halfY) / halfY;

      if (gridRef.current) {
        gsap.to(gridRef.current, {
          x: xRatio * 8 * parallaxIntensity,
          y: yRatio * 10 * parallaxIntensity,
          duration: 0.45,
          overwrite: true,
        });
      }
      if (waveWrapRef.current) {
        gsap.to(waveWrapRef.current, {
          x: xRatio * 12 * parallaxIntensity,
          y: yRatio * 6 * parallaxIntensity,
          duration: 0.55,
          overwrite: true,
        });
      }
      if (mediaCardRef.current) {
        gsap.to(mediaCardRef.current, {
          x: xRatio * -10 * parallaxIntensity,
          y: yRatio * -8 * parallaxIntensity,
          rotateY: xRatio * -4 * parallaxIntensity,
          rotateX: yRatio * 4 * parallaxIntensity,
          duration: 0.5,
          overwrite: true,
        });
      }
    };

    const buildPath = (time: number) => {
      const points: string[] = [];
      const speed = baseSpeed * (1 + scrollRatioRef.current * 0.45);
      const influence = pointerOffset.current * (isCinematicDesktop ? 0.24 : 0.15) * parallaxIntensity;

      for (let i = 0; i <= segmentCount; i += 1) {
        const x = (i / segmentCount) * width;
        const noise = Math.sin(time * speed + i * 0.68 + scrollRatioRef.current * 2.2) * baseAmplitude;
        const y = height * 0.52 + noise + influence;
        points.push(`${x},${y}`);
      }

      return `M${points.join(" L")}`;
    };

    const draw = (time: number) => {
      if (!wavePathRef.current) return;
      wavePathRef.current.setAttribute("d", buildPath(time));
      rafId = requestAnimationFrame(draw);
    };

    onResize();
    onScroll();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (isCinematicDesktop) {
      window.addEventListener("mousemove", onMove);
    }
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, [heavyMotion, isCinematicDesktop, isCinematicMobile, parallaxIntensity]);

  const socials = useMemo(
    () => [
      { Icon: Linkedin, href: "https://www.linkedin.com/in/hamza-alkaff-5728b3305", label: "LinkedIn" },
      { Icon: Mail, href: "mailto:hamzacerts@gmail.com", label: "Email" },
      { Icon: Github, href: "https://github.com/hamzahalkaff", label: "GitHub" },
    ],
    [],
  );

  return (
    <section
      id="hero"
      className={`hero-signature ${isCinematicDesktop ? "is-cinematic" : ""} ${
        isCinematicMobile ? "is-cinematic-mobile" : ""
      }`}
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="alternateName" content="Hamza Alkaff" />
      <meta itemProp="gender" content="Male" />
      <meta itemProp="nationality" content="Saudi Arabian" />

      <div ref={gridRef} className="hero-signature__grid" aria-hidden="true" />
      <svg
        ref={waveWrapRef}
        className="hero-signature__wave"
        viewBox="0 0 1200 360"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path ref={wavePathRef} />
      </svg>
      <div className={`hero-signature__light-sweep ${introComplete && !isStaticMode ? "is-active" : ""}`} aria-hidden="true" />

      <div className="hero-signature__frame" ref={contentRef}>
        <SignatureSeparator />

        <div className="hero-signature__content">
          <div className="hero-signature__copy">
            <span className="hero-signature__badge">
              <Shield size={13} />
              Cybersecurity & SOC Operations
            </span>

            <h1 ref={headingRef} className="hero-signature__title" itemProp="name">
              Hamzah Alkaff
            </h1>

            <p className="hero-signature__subtitle" itemProp="jobTitle">
              Cybersecurity Specialist & SOC Analyst
            </p>
            <p className="hero-signature__alias">Also searchable as Hamza Alkaff</p>

            <p className="hero-signature__description" itemProp="description">
              Computer Science graduate with hands-on experience in SIEM operations,
              penetration testing, and network defense. Based in Jeddah, currently working as
              Business Development & IT Coordinator at Kanz Industry while continuing to build
              deep cybersecurity expertise.
            </p>

            <div className="hero-signature__facts">
              <span>
                <MapPin size={14} />
                Jeddah, Saudi Arabia
              </span>
              <span className="dot" />
              <span>CompTIA CySA+ Certified</span>
            </div>

            <div className="hero-signature__actions">
              <a href="#work" onClick={(event) => { event.preventDefault(); scrollToSection("#work"); }}>
                View My Work
              </a>
              <a className="ghost" href="#contact" onClick={(event) => { event.preventDefault(); scrollToSection("#contact"); }}>
                Get In Touch
              </a>
            </div>

            <div className="hero-signature__socials">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={label === "Email" ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  itemProp={label === "Email" ? "email" : "sameAs"}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-signature__media">
            <div ref={mediaCardRef} className="hero-signature__media-card">
              <h2>
                <Shield size={16} />
                Security Snapshot
              </h2>

              <ul>
                <li>
                  <BriefcaseBusiness size={14} />
                  <div>
                    <span>Current Role</span>
                    <strong>Business Development & IT Coordinator</strong>
                  </div>
                </li>
                <li>
                  <BadgeCheck size={14} />
                  <div>
                    <span>Latest Certification</span>
                    <strong>CompTIA CySA+</strong>
                  </div>
                </li>
                <li>
                  <MapPin size={14} />
                  <div>
                    <span>Location</span>
                    <strong>Jeddah, Saudi Arabia</strong>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <SignatureSeparator secondary />
      </div>

      <a
        className="hero-signature__scroll"
        href="#about"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection("#about");
        }}
        aria-label="Scroll to about section"
      >
        <ArrowDown size={18} />
      </a>
    </section>
  );
}
