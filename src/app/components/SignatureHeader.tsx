import { useEffect, useMemo, useState } from "react";
import { Github, Linkedin, Mail, Menu, MoonStar, X } from "lucide-react";
import { consoleLines, navItems, socialLinks } from "../config/siteContent";
import { useSectionProgress } from "../hooks/useSectionProgress";

type SignatureHeaderProps = {
  introComplete: boolean;
  isContrasted: boolean;
  onToggleContrast: () => void;
};

type LenisLike = { scrollTo: (target: string) => void };

function scrollToHref(href: `#${string}`) {
  const lenis = (window as Window & { lenis?: LenisLike }).lenis;
  if (lenis) {
    lenis.scrollTo(href);
    return;
  }
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function SignatureHeader({ introComplete, isContrasted, onToggleContrast }: SignatureHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const sectionHrefs = useMemo(() => navItems.map((item) => item.href), []);
  const { activeHref } = useSectionProgress(sectionHrefs);

  useEffect(() => {
    if (!introComplete) return;
    const timer = window.setInterval(() => {
      setLineIndex((prev) => (prev + 1) % consoleLines.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [introComplete]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1081px)");
    const syncDesktopState = () => {
      if (mediaQuery.matches) {
        setMobileOpen(false);
      }
    };
    syncDesktopState();
    mediaQuery.addEventListener("change", syncDesktopState);
    return () => mediaQuery.removeEventListener("change", syncDesktopState);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);

  return (
    <header className={`signature-header ${introComplete ? "is-ready" : ""}`}>
      <div className="signature-header__main">
        <a className="signature-brand" href="#hero" onClick={(event) => { event.preventDefault(); scrollToHref("#hero"); }}>
          <span className="signature-brand__mono">HA</span>
          <span className="u-sr-only">Hamzah Alkaff</span>
        </a>

        <div className="signature-console" aria-live="polite">
          <span className="signature-console__line">{consoleLines[lineIndex]}</span>
          <span className="signature-console__caret" />
        </div>

        <nav className="signature-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`signature-nav__link ${activeHref === item.href ? "is-active" : ""}`}
              aria-current={activeHref === item.href ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                scrollToHref(item.href);
                setMobileOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="signature-header__actions">
          <div className="signature-socials" aria-label="Social links">
            <a href={socialLinks[0].href} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href={socialLinks[1].href} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href={socialLinks[2].href} aria-label="Email">
              <Mail size={16} />
            </a>
          </div>

          <button
            type="button"
            className={`signature-contrast ${isContrasted ? "is-on" : ""}`}
            onClick={onToggleContrast}
            aria-label="Toggle contrast mode"
          >
            <MoonStar size={16} />
          </button>

          <button
            type="button"
            className="signature-menu-button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls="signature-mobile-nav"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className="signature-header__subline">
        <span>Coding globally from Jeddah.</span>
        <a href="mailto:hamzacerts@gmail.com">Available for freelance and security roles - Hire me</a>
      </div>

      <div id="signature-mobile-nav" className={`signature-mobile-nav ${mobileOpen ? "is-open" : ""}`}>
        <div className="signature-mobile-nav__inner">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`signature-mobile-nav__link ${activeHref === item.href ? "is-active" : ""}`}
              aria-current={activeHref === item.href ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                scrollToHref(item.href);
                setMobileOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <a className="signature-mobile-nav__cta" href="/Hamzah_Alkaff_CV.pdf" download onClick={() => setMobileOpen(false)}>
            Download CV
          </a>
        </div>
      </div>
    </header>
  );
}
