import { useEffect, useMemo, useRef, useState } from "react";
import { Activity, ExternalLink, Github, Radar, ShieldAlert, ShieldCheck } from "lucide-react";
import { workShowcaseItems } from "../config/siteContent";
import type { WorkMediaSlot } from "../types/site";

type WorkSignatureProps = {
  isStaticMode: boolean;
};

type VideoMap = Record<string, HTMLVideoElement | null>;
const supportIcons = [Radar, Activity, ShieldAlert];

function MediaSlot({
  id,
  label,
  media,
  registerVideoRef,
  fallbackIconIndex,
}: {
  id: string;
  label: string;
  media: WorkMediaSlot;
  registerVideoRef?: (id: string, node: HTMLVideoElement | null) => void;
  fallbackIconIndex: number;
}) {
  const FallbackIcon = supportIcons[fallbackIconIndex % supportIcons.length];

  if (media.kind === "image") {
    return <img src={media.src} alt={media.alt} loading="lazy" decoding="async" className="work-media-image" />;
  }

  if (media.kind === "video") {
    return (
      <video
        ref={(node) => registerVideoRef?.(id, node)}
        data-video-id={id}
        src={media.src}
        poster={media.poster}
        aria-label={media.ariaLabel}
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <div className={`work-media-panel ${media.tone === "featured" ? "work-media-panel--featured" : ""}`}>
      {media.tone === "featured" ? <ShieldCheck size={20} /> : <FallbackIcon size={18} />}
      <p>{label}</p>
      <span>Conceptual preview without external media.</span>
      <small className="work-media-note">{media.note}</small>
    </div>
  );
}

export function WorkSignature({ isStaticMode }: WorkSignatureProps) {
  const videoRefs = useRef<VideoMap>({});
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [inViewIds, setInViewIds] = useState<Set<string>>(new Set());
  const [featured, ...supporting] = useMemo(() => workShowcaseItems, []);

  useEffect(() => {
    const videoEntries = Object.entries(videoRefs.current).filter(([, node]) => Boolean(node));
    if (videoEntries.length === 0) return;

    const observer = new IntersectionObserver(
      (observerEntries) => {
        setInViewIds((prev) => {
          const next = new Set(prev);
          observerEntries.forEach((entry) => {
            const element = entry.target as HTMLVideoElement;
            const id = element.dataset.videoId;
            if (!id) return;
            if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
              next.add(id);
            } else {
              next.delete(id);
            }
          });
          return next;
        });
      },
      { threshold: [0.15, 0.45, 0.7], rootMargin: "0px 0px -10% 0px" },
    );

    videoEntries.forEach(([, node]) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ids = Array.from(inViewIds);
    if (ids.length === 0 || isStaticMode) {
      setActiveVideoId(null);
      return;
    }
    setActiveVideoId((prev) => (prev && ids.includes(prev) ? prev : ids[0]));
  }, [inViewIds, isStaticMode]);

  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (!video) return;
      const shouldPlay = id === activeVideoId;
      if (shouldPlay) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeVideoId]);

  return (
    <section id="work" className="work-signature signature-section">
      <div id="projects" className="anchor-compat" aria-hidden="true" />
      <div className="signature-shell">
        <div className="signature-section__head">
          <span>Work</span>
          <h2>Selected Projects and Security Concepts</h2>
          <div className="section-rule" />
        </div>

        <article className="work-featured" tabIndex={0}>
          <div className="work-featured__media">
            <MediaSlot
              id={featured.id}
              label="Network Security Analysis Toolkit"
              media={featured.media}
              fallbackIconIndex={0}
              registerVideoRef={(idValue, node) => {
                videoRefs.current[idValue] = node;
              }}
            />
            <span className="work-featured__label">{featured.label}</span>
          </div>

          <div className="work-featured__body">
            <p className="period">{featured.period}</p>
            <h3>{featured.title}</h3>
            <p>{featured.summary}</p>

            <ul>
              <li>Integrated Nmap for host discovery, port scanning, and vulnerability enumeration.</li>
              <li>Connected VirusTotal API flows for file, hash, URL, and domain analysis.</li>
              <li>Built scan-history visibility to track posture and security operations over time.</li>
              <li>Used Python backend with encrypted SQLite storage and a clean frontend interface.</li>
            </ul>

            <div className="work-tags">
              {featured.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="work-actions">
              <a href={featured.github ?? "#"}>
                <Github size={15} />
                Source Code
              </a>
              <a href={featured.live ?? "#"} className="accent">
                <ExternalLink size={15} />
                Live Demo
              </a>
            </div>
          </div>
        </article>

        <div className="work-grid">
          {supporting.map((item, index) => (
            <article key={item.id} className="work-card" tabIndex={0}>
              <div className="work-card__media">
                <MediaSlot
                  id={item.id}
                  label={item.label}
                  media={item.media}
                  fallbackIconIndex={index}
                  registerVideoRef={(idValue, node) => {
                    videoRefs.current[idValue] = node;
                  }}
                />
              </div>
              <div className="work-card__body">
                <p className="period">{item.period}</p>
                <h4>{item.title}</h4>
                <p>{item.summary}</p>
                <div className="work-tags">
                  {item.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
