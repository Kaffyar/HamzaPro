import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-lg border-b border-slate-800/50 shadow-[0_0_20px_rgba(245, 158, 11,0.1)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#hero"
            className="font-display text-xl text-foreground hover:text-amber-300 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Hamzah<span className="text-amber-300">.</span>
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ scale: 1.05, y: -1 }}
                className="px-3 py-2 text-sm text-slate-400 hover:text-amber-300 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href={CV_FILE_PATH}
              download
              className="ml-2 px-3 py-2 text-xs border border-slate-700/70 rounded-lg text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors"
            >
              Download CV
            </a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-sm hover:bg-amber-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245, 158, 11,0.4)]"
            >
              Contact
            </motion.a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-2"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-lg border-b border-slate-800/50 overflow-hidden"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
