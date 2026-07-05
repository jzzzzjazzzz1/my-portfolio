import { useEffect, useState } from "react";

/**
 * Returns progress (0..1) while you scroll through a section.
 * progress=0 when section top hits bottom of viewport
 * progress=1 when section bottom hits top of viewport
 */
export default function useScrollSectionProgress(sectionRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // how far the section has traveled through the viewport
      const total = rect.height + vh;
      const traveled = vh - rect.top;

      const p = Math.min(1, Math.max(0, traveled / total));
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRef]);

  return progress;
}