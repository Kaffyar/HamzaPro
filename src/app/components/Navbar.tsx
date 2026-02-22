import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const CV_FILE_PATH = "/Hamzah_Alkaff_CV.pdf";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setIsReady(true));
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/50 shadow-[0_0_20px_rgba(245, 158, 11,0.1)]"
          : "bg-transparent"
      } ${isReady ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#hero"
            className="font-display text-xl text-foreground hover:text-amber-300 transition-transform transition-colors duration-200 hover:scale-105"
          >
            Hamzah<span className="text-amber-300">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-slate-400 hover:text-amber-300 transition-transform transition-colors duration-200 hover:scale-105"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CV_FILE_PATH}
              download
              className="ml-2 px-3 py-2 text-xs border border-slate-700/70 rounded-lg text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="ml-3 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm hover:bg-amber-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245, 158, 11,0.4)] hover:scale-105 active:scale-[0.98]"
            >
              Contact
            </a>
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`md:hidden bg-slate-950/95 backdrop-blur-lg border-b border-slate-800/50 overflow-hidden transition-[max-height,opacity] duration-300 ${
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-5 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-slate-400 hover:text-amber-300 transition-colors py-1.5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CV_FILE_PATH}
            download
            onClick={() => setMobileOpen(false)}
            className="px-4 py-2.5 border border-slate-700/70 rounded-lg text-sm text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors text-center"
          >
            Download CV
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-4 py-2.5 bg-amber-500 text-slate-950 rounded-lg text-sm text-center hover:bg-amber-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245, 158, 11,0.4)]"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
