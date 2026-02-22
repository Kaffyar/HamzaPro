import { useEffect, useMemo, useState } from "react";

type SectionState = {
  activeHref: `#${string}` | null;
  progress: number;
};

export function useSectionProgress(sectionHrefs: Array<`#${string}`>): SectionState {
  const [activeHref, setActiveHref] = useState<`#${string}` | null>(sectionHrefs[0] ?? null);
  const [progress, setProgress] = useState(0);

  const ids = useMemo(() => sectionHrefs.map((href) => href.replace("#", "")), [sectionHrefs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let topVisible: { id: string; top: number } | null = null;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          const top = Math.abs(target.getBoundingClientRect().top);
          if (!topVisible || top < topVisible.top) {
            topVisible = { id: target.id, top };
          }
        });

        if (topVisible) {
          const next = `#${topVisible.id}` as `#${string}`;
          setActiveHref(next);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.4, 0.6],
      },
    );

    const observedIds = new Set<string>();
    const observeSections = () => {
      ids.forEach((id) => {
        if (observedIds.has(id)) return;
        const section = document.getElementById(id);
        if (!section) return;
        observer.observe(section);
        observedIds.add(id);
      });
    };

    observeSections();

    const mutationObserver = new MutationObserver(() => {
      observeSections();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const onScroll = () => {
      const totalScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / totalScrollable)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return { activeHref, progress };
}
