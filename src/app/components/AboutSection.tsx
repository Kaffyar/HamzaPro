import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";

export function AboutSection() {
  const { ref, isInView } = useInView();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-amber-300/70 text-sm tracking-wide mb-3 block">
            About
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">
            A bit about me
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/50 mt-4" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-5 gap-12"
        >
          {/* Bio - wider column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 space-y-5"
          >
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed"
            >
              I'm a Cybersecurity and Computer Science graduate from Asia Pacific University 
              with a strong foundation in information security, networking, systems, and programming.
              I did my internship at Kanz Advanced Trading Company in Jeddah where I got hands-on 
              with firewalls, endpoint protection, and security monitoring - the kind of work that 
              taught me more than any classroom could.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed"
            >
              Before that, I was part of the SOC ELITE Programme with TECFORTE, pulling real 
              SOC shifts as a Tier 1 analyst - doing log analysis, alert correlation, and working 
              alongside experienced SOC leads. It was intense but exactly what confirmed this 
              is what I want to do.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground leading-relaxed"
            >
              I'm now based in Jeddah and currently working as a Business Development & IT Coordinator
              at Kanz Industry while continuing to focus on cybersecurity growth. I'm detail-oriented,
              I pick things up fast, and I genuinely care about doing good security work - not
              just checking boxes.
            </motion.p>
          </motion.div>

          {/* Quick facts - narrower column */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <motion.div
              className="p-6 rounded-xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-500"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-foreground mb-5 text-sm tracking-wide uppercase text-slate-500">
                Quick Facts
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Degree", value: "BSc (Hons) Computer Science - Cyber Security" },
                  { label: "Current Role", value: "Business Development & IT Coordinator - Kanz Industry (Jan 2026 - Present)" },
                  { label: "Certifications", value: "CompTIA CySA+, Security+, eJPTv2, ICCA, and more" },
                  { label: "SOC Experience", value: "50+ hours of live shift duty (Tier 1)" },
                  { label: "Location", value: "Jeddah, Saudi Arabia" },
                  { label: "Languages", value: "English, Arabic" },
                ].map((fact, index) => (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="border-b border-slate-800/40 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-xs text-slate-500 block mb-1">{fact.label}</span>
                    <span className="text-sm text-foreground/90">{fact.value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
