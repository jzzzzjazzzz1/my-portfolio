import { useEffect, useRef } from "react";

/**
 * Matrix background using Canvas.
 * Props:
 *  - intensity: "subtle" | "normal"  (subtle is better for performance)
 */
export default function MatrixBackground({ intensity = "subtle" }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));
    let w = 0;
    let h = 0;

    const config =
      intensity === "subtle"
        ? {
            fontSize: 16,
            speed: 0.6,
            fadeAlpha: 0.06,
            green: "rgba(34,197,94,0.55)",
            bg: "rgba(2,6,23,0.18)",
            density: 0.85,
          }
        : {
            fontSize: 16,
            speed: 1.0,
            fadeAlpha: 0.04,
            green: "rgba(34,197,94,0.75)",
            bg: "rgba(2,6,23,0.16)",
            density: 1.0,
          };

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let columns = 0;
    let drops = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.floor(w / config.fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * h);
      ctx.font = `${config.fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    };

    const draw = () => {
      // fade
      ctx.fillStyle = `rgba(2, 6, 23, ${config.fadeAlpha})`;
      ctx.fillRect(0, 0, w, h);

      // slight tint
      ctx.fillStyle = config.bg;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = config.green;

      for (let i = 0; i < columns; i++) {
        if (Math.random() > config.density) continue;

        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * config.fontSize;
        const y = drops[i];

        ctx.fillText(text, x, y);

        drops[i] += config.fontSize * config.speed;

        if (drops[i] > h + 50 && Math.random() > 0.975) {
          drops[i] = -Math.random() * 200;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const onResize = () => resize();

    resize();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      aria-hidden="true"
    />
  );
}