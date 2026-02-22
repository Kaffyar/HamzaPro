import { motion } from "motion/react";
import { Award, BadgeCheck } from "lucide-react";
import { useInView } from "./hooks/useInView";

const certificates = [
  {
    title: "CompTIA Security+",
    issuer: "CompTIA",
    accent: "from-red-500/30 to-red-500/10",
  },
  {
    title: "eJPTv2 (Junior Penetration Tester)",
    issuer: "INE Security",
    accent: "from-blue-500/30 to-blue-500/10",
  },
  {
    title: "PT1 (Penetration Testing)",
    issuer: "TryHackMe",
    accent: "from-green-500/30 to-green-500/10",
  },
  {
    title: "CompTIA CySA+",
    issuer: "CompTIA",
    accent: "from-violet-500/30 to-violet-500/10",
  },
  {
    title: "ICCA (Certified Cloud Associate)",
    issuer: "INE Security",
    accent: "from-indigo-500/30 to-indigo-500/10",
  },
  {
    title: "CompTIA Network+ (Training)",
    issuer: "40+ Hours Completed",
    accent: "from-amber-500/30 to-amber-500/10",
  },
];

export function CertificatesSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="certificates"
      className="signature-section relative py-24 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-amber-300/70 text-sm tracking-wide mb-3 block">
            Certifications
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            Credentials I've earned
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/50 mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.08,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              whileHover={{
                scale: 1.03,
                y: -3,
                transition: { duration: 0.3 },
              }}
              className="group relative p-5 rounded-xl bg-slate-900/60 border border-slate-800/50 hover:border-amber-500/40 transition-all duration-500 overflow-hidden backdrop-blur-sm hover:shadow-[0_0_20px_rgba(245,_158,_11,_0.15)]"
            >
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${cert.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <motion.div
                className="absolute top-3 right-3 text-amber-300/20 group-hover:text-amber-300/40"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Award size={18} />
              </motion.div>

              <div className="relative min-h-[7rem] flex flex-col justify-center">
                <div className="mb-3 flex items-center gap-2 text-amber-300/70">
                  <BadgeCheck size={16} />
                  <span className="text-[11px] tracking-wide uppercase">Certified</span>
                </div>
                <h4 className="text-foreground/90 mb-1.5 text-sm pr-6">
                  {cert.title}
                </h4>
                <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
