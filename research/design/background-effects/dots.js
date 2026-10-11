// Prototype: the floor. A small Canvas 2D field of drifting dots.
//
// This is what "a very small canvas" means in practice: no shader, no
// framebuffer, a few dozen draw calls. If a background effect is wanted at all,
// this is the cheapest thing that still moves.

import { readPaletteRgb, watchPalette } from "./palette.js";

/**
 * @param {object} [opts]
 * @param {number} [opts.count=48] dots
 * @param {number} [opts.idleMs=2500]
 */
export function mount(opts = {}) {
  const { count = 48, idleMs = 2500, className = "tb-bg-dots" } = opts;

  const canvas = document.createElement("canvas");
  canvas.className = className;
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed", inset: "0", width: "100%", height: "100%",
    pointerEvents: "none", zIndex: "-1", display: "block",
  });
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return null;

  (document.body || document.documentElement).appendChild(canvas);

  let palette = readPaletteRgb();
  const unwatch = watchPalette((next) => { palette = next; });

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
  }
  resize();

  const dots = Array.from({ length: count }, (_, i) => ({
    x: Math.random(), y: Math.random(),
    vx: (Math.random() - 0.5) * 0.02,
    vy: (Math.random() - 0.5) * 0.02,
    r: 0.6 + (i % 3) * 0.35,
  }));

  function frameStep(dt) {
    const w = canvas.width;
    const h = canvas.height;
    if (w < 2 || h < 2) return;
    ctx.clearRect(0, 0, w, h);
    const [r, g, b] = palette.accent;
    ctx.fillStyle = `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`;
    ctx.globalAlpha = 0.25;
    const a = w / h;
    for (const d of dots) {
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      if (d.x < 0 || d.x > 1) d.vx *= -1;
      if (d.y < 0 || d.y > 1) d.vy *= -1;
      d.x = Math.min(1, Math.max(0, d.x));
      d.y = Math.min(1, Math.max(0, d.y));
      const px = (d.x * a > 1 ? d.x : d.x) * w;
      const py = d.y * h;
      ctx.beginPath();
      ctx.arc(px, py, d.r * (h / 800), 0, 6.2831853);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  let raf = 0;
  let running = false;
  let hidden = false;
  let lastInput = performance.now();
  let last = performance.now();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const passes = [];

  function frame(now) {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    const t0 = performance.now();
    frameStep(dt);
    passes.push(performance.now() - t0);
    if (passes.length > 600) passes.shift();
    schedule();
  }
  function schedule() {
    if (!running || hidden || reduced.matches) return;
    if (performance.now() - lastInput > idleMs) return;
    raf = requestAnimationFrame(frame);
  }
  function startLoop() { if (running) return; running = true; last = performance.now(); if (!raf) raf = requestAnimationFrame(frame); }
  function stopLoop() { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
  function poke() { lastInput = performance.now(); startLoop(); }
  function onVisibility() { hidden = document.hidden; if (hidden) stopLoop(); else startLoop(); }
  function onReduced() { if (reduced.matches) { stopLoop(); frameStep(1 / 60); } else poke(); }

  window.addEventListener("pointermove", poke, { passive: true });
  window.addEventListener("pointerdown", poke, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  reduced.addEventListener("change", onReduced);

  let intersection = null;
  if (typeof IntersectionObserver !== "undefined") {
    intersection = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) startLoop(); else stopLoop();
    });
    intersection.observe(canvas);
  }

  frameStep(1 / 60);
  if (!reduced.matches) startLoop();

  return {
    canvas,
    stop() {
      stopLoop();
      unwatch();
      intersection?.disconnect();
      window.removeEventListener("pointermove", poke);
      window.removeEventListener("pointerdown", poke);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReduced);
      canvas.remove();
    },
    palette() { return palette; },
    stats() {
      const sorted = [...passes].sort((a, b) => a - b);
      return { passes: passes.length, running, looping: raf !== 0, hidden, reducedMotion: reduced.matches,
        submitMsMean: sorted.length ? sorted.reduce((a, b) => a + b, 0) / sorted.length : 0 };
    },
  };
}
