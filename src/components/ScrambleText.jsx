import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>/?";

export default function ScrambleText({
  text,
  className = "",
  duration = 1200,
  revealDelay = 200,
  characters = DEFAULT_CHARS,

  // NEW:
  retriggerOnView = false,
  viewThreshold = 0.7,
}) {
  const [out, setOut] = useState(text);
  const runningRef = useRef(false);
  const elRef = useRef(null);

  const randomChar = useMemo(
    () => () => characters[Math.floor(Math.random() * characters.length)],
    [characters]
  );

  const run = () => {
    if (runningRef.current) return;
    runningRef.current = true;

    const start = performance.now() + revealDelay;
    const total = duration;

    const tick = (now) => {
      if (now < start) return requestAnimationFrame(tick);

      const t = Math.min(1, (now - start) / total);
      const revealedCount = Math.floor(t * text.length);

      let s = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === " ") s += " ";
        else if (i < revealedCount) s += c;
        else s += randomChar();
      }

      setOut(s);

      if (t < 1) requestAnimationFrame(tick);
      else {
        setOut(text);
        runningRef.current = false;
      }
    };

    requestAnimationFrame(tick);
  };

  // run once on first mount
  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // re-run whenever it enters viewport again
  useEffect(() => {
    if (!retriggerOnView) return;
    const el = elRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) run();
        }
      },
      { threshold: viewThreshold }
    );

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retriggerOnView, viewThreshold, text]);

  return (
    <span ref={elRef} className={className}>
      {out}
    </span>
  );
}