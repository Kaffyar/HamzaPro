import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Business Development & IT Coordinator",
    company: "Kanz Industry",
    subtitle: "Full-time",
    location: "Jeddah, Makkah, Saudi Arabia | On-site",
    period: "Jan 2026 - Present",
    achievements: [],
    tech: [],
  },
  {
    title: "Cyber Security Specialist Intern",
    company: "Kanz Advanced Trading Company",
    subtitle: "E-Commerce Platform for MRO Tools",
    location: "Jeddah, Saudi Arabia",
    period: "Sep 2024 - Feb 2025",
    achievements: [
      "Worked hands-on with Next-Generation Firewalls (NGFW) and endpoint protection systems - configuring rules, blocking threats, and ensuring network security held up in practice.",
      "Set up and maintained physical access control systems including fingerprint authentication for on-premise security.",
      "Handled user and access management in Microsoft environments: account provisioning, permissions, the usual stuff that needs to be done right.",
      "Monitored email, device, and security logs daily to catch potential incidents early.",
      "Supported security practices aligned with the NCA Essential Cybersecurity Controls (ECC) framework.",
    ],
    tech: ["NGFW", "Endpoint Protection", "SIEM", "Access Control", "Microsoft", "NCA ECC"],
  },
  {
    title: "SOC Analyst (Tier 1)",
    company: "TECFORTE | Asia Pacific University",
    subtitle: "SOC ELITE Programme",
    location: "Malaysia",
    period: "Mar 2024 - Jul 2024",
    achievements: [
      "Completed 50+ hours of real SOC shift duty over 4 months as a Tier 1 analyst.",
      "Used SIEM (MSSGard) for log analysis, alert correlation, and generating actionable reports.",
      "Helped with SIEM content creation and process improvements for the SOC team.",
      "Worked directly with SOC Team Leads and the SOC Manager on active monitoring operations.",
    ],
    tech: ["SIEM", "MSSGard", "Log Analysis", "Alert Correlation", "SOC Operations"],
  },
];

export function ExperienceSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="experience" className="signature-section relative py-24 overflow-hidden bg-slate-900/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-amber-300/70 text-sm tracking-wide mb-3 block">
            Experience
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            Where I've worked
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/50 mt-4" />
        </motion.div>

        <div className="space-y-8 max-w-4xl">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: 0.15 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="p-6 md:p-8 rounded-xl bg-slate-900/60 border border-slate-800/50 hover:border-amber-500/30 transition-all duration-500 backdrop-blur-sm hover:shadow-[0_0_30px_rgba(245, 158, 11,0.1)]"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm">
                <span className="flex items-center gap-1.5 text-amber-300/80">
                  <Calendar size={14} />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <MapPin size={14} />
                  {exp.location}
                </span>
              </div>

              <h3 className="text-foreground text-lg mb-1">{exp.title}</h3>
              <p className="text-amber-300/70 text-sm mb-1">{exp.company}</p>
              {exp.subtitle && (
                <p className="text-slate-500 text-xs mb-5">{exp.subtitle}</p>
              )}

              {exp.achievements.length > 0 && (
                <ul className="space-y-2.5 mb-5">
                  {exp.achievements.map((achievement, ai) => (
                    <motion.li
                      key={ai}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.2 + ai * 0.1, duration: 0.5 }}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-500/50 mt-2 shrink-0" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              )}

              {exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, techIndex) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.2 + techIndex * 0.05, duration: 0.3 }}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/30 hover:border-amber-500/40 hover:text-amber-300 transition-all duration-300"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
