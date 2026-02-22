import type { ConsoleLine, NavItem, WorkShowcaseItem } from "../types/site";

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export const consoleLines: ConsoleLine[] = [
  "Monitoring threat surface in real-time",
  "Hardening systems and securing workflows",
  "Available for cyber and SOC opportunities",
  "Building secure, performant digital experiences",
  "Focused on practical security operations",
];

export const workShowcaseItems: WorkShowcaseItem[] = [
  {
    id: "sana-toolkit",
    title: "SANA Toolkit",
    label: "Featured Case Study",
    period: "2025",
    summary:
      "A network security analysis toolkit with scanning, host discovery, DNS recon, and threat checks in one operator-focused dashboard.",
    tech: ["Python", "SQLite", "Nmap", "VirusTotal API", "HTML/CSS/JS"],
    media: {
      kind: "placeholder",
      tone: "featured",
      note: "A real photo/video should be here. Sorry, I am still cooking it.",
    },
    github: "#",
    live: "#",
  },
  {
    id: "network-ops",
    title: "Network Operations Visual",
    label: "Security Workflow",
    period: "Prototype",
    summary:
      "A visual exploration of network posture and service health designed for fast triage.",
    tech: ["Threat Monitoring", "Telemetry", "Dashboards"],
    media: {
      kind: "placeholder",
      tone: "supporting",
      note: "Photo/video coming soon. Please wait for my upgrade patch.",
    },
  },
  {
    id: "incident-flow",
    title: "Incident Flow",
    label: "Automation Concept",
    period: "Prototype",
    summary:
      "Response sequence design focused on clean escalation paths and operator usability.",
    tech: ["SIEM", "Response Playbooks", "Automation"],
    media: {
      kind: "placeholder",
      tone: "supporting",
      note: "Photo/video coming soon. Please wait for my upgrade patch.",
    },
  },
  {
    id: "threat-lens",
    title: "Threat Lens",
    label: "Research Concept",
    period: "Prototype",
    summary:
      "Threat-intelligence visualization concept for faster anomaly spotting and context review.",
    tech: ["Threat Intel", "Visualization", "SOC"],
    media: {
      kind: "placeholder",
      tone: "supporting",
      note: "Photo/video coming soon. Please wait for my upgrade patch.",
    },
  },
];

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hamza-alkaff-5728b3305",
  },
  {
    label: "GitHub",
    href: "https://github.com/hamzahalkaff",
  },
  {
    label: "Email",
    href: "mailto:hamzacerts@gmail.com",
  },
];

export const introTimings = {
  minDurationMs: 1200,
  maxDurationMs: 1800,
};
