import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import sanaToolkitDashboardImage from "../../assets/projects/sana-toolkit-dashboard.jpg";

const projects = [
  {
    title: "SANA Toolkit",
    label: "Final Year Project",
    period: "Feb 2025 - Sep 2025",
    description:
      "A web-based platform that brings together penetration testing, network scanning, and malware analysis into one place - built because I was tired of switching between a dozen different tools.",
    details: [
      "Integrated Nmap for host discovery, port scanning, and vulnerability enumeration with results visualized on a clean dashboard.",
      "Connected the VirusTotal API to scan files, hashes, URLs, and domains for malware and phishing threats.",
      "Added scan history tracking so you can actually see your security posture over time.",
      "Built the backend in Python with a SQLite database using encrypted storage, frontend in HTML/CSS/JS.",
      "Ran surveys with cybersecurity professionals and students to validate the UX and iterated based on real feedback.",
    ],
    tech: ["Python", "HTML/CSS/JS", "Nmap", "VirusTotal API", "SQLite"],
    image: sanaToolkitDashboardImage,
    github: "#",
    live: "#",
  },
];

export function ProjectsSection() {
  const { ref, isInView } = useInView();

  return (
    <section id="projects" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-amber-300/70 text-sm tracking-wide mb-3 block">
            Projects
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            What I've built
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/50 mt-4" />
        </motion.div>

        {projects.map((project) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            whileHover={{ scale: 1.01 }}
            className="rounded-xl overflow-hidden bg-slate-900/60 border border-slate-800/50 hover:border-amber-500/30 transition-all duration-500 backdrop-blur-sm hover:shadow-[0_0_40px_rgba(245,_158,_11,_0.15)]"
          >
            <div className="grid lg:grid-cols-2">
              <motion.div
                className="relative h-56 lg:h-auto overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/60" />
              </motion.div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="text-xs text-amber-300/90 uppercase tracking-wider px-2.5 py-1 bg-amber-500/10 rounded-md border border-amber-500/20"
                  >
                    {project.label}
                  </motion.span>
                  <span className="text-xs text-slate-500">{project.period}</span>
                </div>

                <h3 className="text-xl text-foreground mb-3 font-display">
                  {project.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                  {project.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {project.details.map((detail, di) => (
                    <motion.li
                      key={di}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + di * 0.1, duration: 0.4 }}
                      className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-500/50 mt-2 shrink-0" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, techIndex) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + techIndex * 0.05, duration: 0.3 }}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/30 hover:border-amber-500/40 hover:text-amber-300 transition-all duration-300"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700/50 text-sm text-slate-400 hover:text-foreground hover:border-amber-500/40 transition-all duration-300"
                  >
                    <Github size={15} />
                    Source Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-sm hover:bg-amber-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,_158,_11,_0.4)]"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
