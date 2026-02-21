import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Hamzah Alkaff
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:hamzacerts@gmail.com"
              className="text-xs text-slate-500 hover:text-amber-300 transition-colors"
            >
              hamzacerts@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/hamza-alkaff-5728b3305"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-amber-300 transition-colors"
            >
              LinkedIn
            </a>
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-2 rounded-lg text-slate-600 hover:text-amber-300 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
