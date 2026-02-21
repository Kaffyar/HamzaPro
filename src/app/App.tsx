import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { CertificatesSection } from "./components/CertificatesSection";
import { EducationSection } from "./components/EducationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { ParticlesBackground } from "./components/ParticlesBackground";
import { ScrollProgress } from "./components/ScrollProgress";
import { ScanlineEffect } from "./components/ScanlineEffect";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden relative">
      <div className="luxury-atmosphere" aria-hidden="true" />
      <div className="luxury-noise" aria-hidden="true" />
      <ScrollProgress />
      <ParticlesBackground />
      <ScanlineEffect />
      <CustomCursor />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificatesSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
