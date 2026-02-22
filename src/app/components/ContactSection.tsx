import { useState } from "react";
import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";

const contactInfo = [
  {
    Icon: Mail,
    label: "Email",
    value: "hamzacerts@gmail.com",
    href: "mailto:hamzacerts@gmail.com",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+966 58 090 3478",
    href: "tel:+966580903478",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Jeddah, Saudi Arabia",
    href: "#",
  },
];

const socials = [
  { Icon: Github, label: "GitHub", href: "https://github.com/hamzahalkaff" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/hamza-alkaff-5728b3305" },
];

export function ContactSection() {
  const { ref, isInView } = useInView();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [website, setWebsite] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = formState.name.trim();
    const email = formState.email.trim();
    const subject = formState.subject.trim();
    const message = formState.message.trim();

    if (website.trim()) {
      setSubmitState("success");
      setSubmitMessage("Message sent successfully.");
      return;
    }

    if (!name || !email || !subject || !message) {
      setSubmitState("error");
      setSubmitMessage("Please complete all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitState("error");
      setSubmitMessage("Please enter a valid email address.");
      return;
    }

    setSubmitState("sending");
    setSubmitMessage("");
    const abortController = new AbortController();
    const timeoutId = window.setTimeout(() => abortController.abort(), 15000);

    try {
      const response = await fetch("https://formsubmit.co/ajax/hamzacerts@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _replyto: email,
          _subject: `Portfolio Contact: ${subject}`,
          _template: "table",
          _honey: website,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setFormState({ name: "", email: "", subject: "", message: "" });
      setWebsite("");
      setSubmitState("success");
      setSubmitMessage("Message sent successfully.");
    } catch {
      setSubmitState("error");
      setSubmitMessage(
        "Message failed to send. Please try again or email hamzacerts@gmail.com directly.",
      );
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return (
    <section id="contact" className="signature-section relative py-24 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-amber-300/70 text-sm tracking-wide mb-3 block">
            Contact
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
            Get in touch
          </h2>
          <div className="w-12 h-0.5 bg-amber-500/50 mt-4 mb-5" />
          <p className="text-muted-foreground max-w-lg">
            Whether you have a role that might be a good fit, want to collaborate on a 
            security project, or just want to say hello - I'd be happy to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ x: 5 }}
                className="group flex items-start gap-3 py-2"
              >
                <motion.div 
                  className="w-10 h-10 rounded-lg bg-slate-800/60 flex items-center justify-center shrink-0 group-hover:bg-amber-500/10 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.Icon size={18} className="text-slate-500 group-hover:text-amber-300 transition-colors" />
                </motion.div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                  <p className="text-sm text-foreground/80 group-hover:text-amber-300 transition-colors">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}

            <div className="pt-4 border-t border-slate-800/50">
              <p className="text-xs text-slate-500 mb-3">Find me online</p>
              <div className="flex gap-2">
                {socials.map(({ Icon, label, href }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2.5 rounded-lg text-slate-500 hover:text-amber-300 hover:bg-slate-800/40 transition-all duration-200"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-7 rounded-xl bg-slate-900/60 border border-slate-800/50 hover:border-amber-500/30 transition-all duration-500 backdrop-blur-sm"
            >
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Name</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    maxLength={80}
                    autoComplete="name"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-foreground placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20 transition-all text-sm"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    maxLength={254}
                    autoComplete="email"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-foreground placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20 transition-all text-sm"
                    placeholder="you@email.com"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-xs text-slate-500 mb-1.5 block">Subject</label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  maxLength={120}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-foreground placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20 transition-all text-sm"
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div className="mb-5">
                <label className="text-xs text-slate-500 mb-1.5 block">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={4}
                  maxLength={2000}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-800/40 border border-slate-700/40 text-foreground placeholder:text-slate-600 focus:border-amber-500/40 focus:outline-none focus:ring-1 focus:ring-amber-500/20 transition-all text-sm resize-none"
                  placeholder="Tell me more..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={submitState === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-300 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 text-sm hover:shadow-[0_0_20px_rgba(245, 158, 11,0.4)]"
              >
                {submitState === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </motion.button>
              {submitMessage && (
                <p
                  className={`mt-3 text-xs ${
                    submitState === "success" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
