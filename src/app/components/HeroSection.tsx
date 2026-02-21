import { motion } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail, MapPin, Shield } from "lucide-react";
import profileImage from "../../assets/9be42925ae748c0e25f13b7378f1e73442501e8b.png";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      itemScope
      itemType="https://schema.org/Person"
    >
      <meta itemProp="alternateName" content="Hamza Alkaff" />
      <meta itemProp="gender" content="Male" />
      <meta itemProp="nationality" content="Saudi Arabian" />

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-amber-500/8 rounded-full blur-[120px]" />
        
        {/* Matrix-style grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Content - wider */}
          <div className="order-2 lg:order-1 lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 text-amber-300/90 text-sm tracking-wide border border-amber-500/20 px-3 py-1 rounded-full bg-amber-500/5">
                <Shield size={14} className="text-amber-300" />
                Cybersecurity & SOC Operations
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-5 !leading-[1.15]"
              itemProp="name"
            >
              Hamzah Alkaff
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-amber-300/90 mb-5"
              itemProp="jobTitle"
            >
              Cybersecurity Specialist & SOC Analyst
            </motion.p>
            <p className="text-xs text-slate-500 mb-4">Also searchable as Hamza Alkaff</p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground mb-5 max-w-xl leading-relaxed"
              itemProp="description"
            >
              Computer Science graduate with hands-on experience in SIEM operations,
              penetration testing, and network defense. Based in Jeddah, currently working as
              Business Development & IT Coordinator at Kanz Industry while continuing to build
              deep cybersecurity expertise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex items-center gap-4 text-muted-foreground mb-8"
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-amber-300/70" />
                <span className="text-sm">Jeddah, Saudi Arabia</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-sm">CompTIA CySA+ Certified</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <a
                href="#projects"
                className="px-7 py-3.5 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-300 transition-all duration-200 hover:shadow-[0_0_20px_rgba(245, 158, 11,0.3)]"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 border border-slate-700 text-foreground/80 rounded-lg hover:border-amber-500/40 hover:text-amber-300 transition-all duration-200 hover:shadow-[0_0_15px_rgba(245, 158, 11,0.15)]"
              >
                Get In Touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/in/hamza-alkaff-5728b3305", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:hamzacerts@gmail.com", label: "Email" },
                { Icon: Github, href: "https://github.com/hamzahalkaff", label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg text-slate-500 hover:text-amber-300 transition-colors duration-200"
                  aria-label={label}
                  itemProp={label === "Email" ? "email" : "sameAs"}
                >
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right - Profile area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-1 lg:order-2 lg:col-span-2 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
              {/* Animated border ring */}
              <motion.div 
                className="absolute -inset-[2px] rounded-full bg-gradient-to-b from-amber-500/40 to-amber-500/10"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border border-amber-500/20">
                <img 
                  src={profileImage} 
                  alt="Hamzah Alkaff"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-amber-300 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
