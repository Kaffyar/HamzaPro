import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";

const skillGroups = [
  {
    title: "Security & Defense",
    items: ["SIEM (MSSGard)", "Threat Detection", "Incident Response", "NGFW / Firewalls", "Endpoint Protection", "NCA ECC Framework", "SOC Operations", "Access Control"],
  },
  {
    title: "Offensive Security",
    items: ["Penetration Testing", "Nmap / Network Scanning", "Vulnerability Assessment", "VirusTotal / Threat Intel", "Malware Analysis"],
  },
  {
    title: "Programming & Tools",
    items: ["Python", "Bash Scripting", "SQL / SQLite", "HTML / CSS / JavaScript", "Linux", "Windows Server", "Microsoft Environments"],
  },
  {
    title: "Professional Skills",
    items: ["Team Collaboration", "Problem Solving", "Technical Writing", "Detail-Oriented", "Continuous Learning", "Communication"],
  },
];

export function SkillsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="skills" className="signature-section relative py-24 overflow-hidden bg-slate-900/20" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-amber-300/70 text-sm tracking-wide mb-3 block">
            Skills
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            What I work with
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/50 mt-4" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: 0.1 + gi * 0.15,
                ease: [0.25, 0.4, 0.25, 1]
              }}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/50 hover:border-amber-500/30 transition-all duration-500 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(245, 158, 11,0.1)]"
            >
              <h3 className="text-sm text-amber-300/90 mb-4 tracking-wide">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, itemIndex) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      delay: 0.2 + gi * 0.15 + itemIndex * 0.05, 
                      duration: 0.3 
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    className="px-3 py-1.5 text-sm rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700/30 hover:border-amber-500/40 hover:text-amber-300 hover:bg-amber-500/5 transition-all duration-300 cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
