import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

export function EducationSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="education" className="signature-section relative py-24 overflow-hidden bg-slate-900/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-amber-300/70 text-sm tracking-wide mb-3 block">
            Education
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            Academic background
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/50 mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ 
            duration: 0.7, 
            delay: 0.2,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          whileHover={{ scale: 1.02 }}
          className="max-w-3xl"
        >
          <div className="p-6 md:p-8 rounded-xl bg-slate-900/60 border border-slate-800/50 hover:border-amber-500/30 transition-all duration-500 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(245, 158, 11,0.1)]">
            <div className="flex items-start gap-4 mb-5">
              <motion.div 
                className="w-11 h-11 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <GraduationCap size={22} className="text-amber-300/70" />
              </motion.div>
              <div>
                <h3 className="text-foreground text-lg">
                  BSc (Hons) in Computer Science
                </h3>
                <p className="text-sm text-amber-300/70">
                  Specialization in Cyber Security
                </p>
                <p className="text-sm text-slate-500 mt-0.5">
                  Asia Pacific University of Technology & Innovation
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-5">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                Nov 2022 - Oct 2025
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} />
                Malaysia
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Covered information security, networking, systems administration, programming, 
              penetration testing, and network defense. Participated in the SOC ELITE Programme
              during the program and developed SANA Toolkit as my final year project.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Cyber Security",
                "Networking",
                "Information Security",
                "Programming",
                "SOC ELITE Programme",
              ].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/30 hover:border-amber-500/40 hover:text-amber-300 transition-all duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
