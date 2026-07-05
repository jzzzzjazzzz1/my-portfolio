import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
  className = "",
  threshold = 0.25,
  once = true,
}) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(true);
          else if (!once) setActive(false);
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return (
    <div ref={ref} className={`${className} ${active ? "reveal-in" : "reveal"}`}>
      {children}
    </div>
  );
}