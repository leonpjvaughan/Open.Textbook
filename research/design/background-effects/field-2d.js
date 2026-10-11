// Prototype: the same dipole field, as a Canvas 2D particle flow.
//
// This is the cheap teaching alternate to field-gl.js: a few hundred particles
// advected through the analytic field and drawn as short streaks. It is the
// shape the collection's existing figures already use (Canvas 2D, no WebGL),
// so the question is whether it is cheap enough to be a *background* as well as
// a figure.
//
// The field is E = (p-c1)/|p-c1|^2 - (p-c2)/|p-c2|^2, normalised so particles
// move at a constant speed along the field lines.

import { readPaletteRgb, watchPalette } from "./palette.js";

/**
 * @param {object} [opts]
 * @param {number} [opts.count=240] particles
 * @param {number} [opts.speed=0.22] field-line units per second
 * @param {number} [opts.fade=0.09] trail fade per frame
 * @param {number} [opts.idleMs=2500]
 */
export function mount(opts = {}) {
  const { count = 240, speed = 0.22, fade = 0.09, idleMs = 2500, className = "tb-bg-field2d" } = opts;

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

  const aspect = () => canvas.width / Math.max(1, canvas.height);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
  }
  resize();

  const sep = 0.42;
  const particles = Array.from({ length: count }, () => ({ x: 0, y: 0 }));
  function spawn(p, i) {
    // Spread by index so the first frame is already a field, not a clump.
    const u = ((i * 0.618033988749895) % 1) * 2 - 1;
    const v = ((i * 0.381966011250105) % 1) * 2 - 1;
    p.x = u * 1.4;
    p.y = v * 1.0;
    if (Math.abs(p.x) < 0.05 && Math.abs(p.y) < 0.05) p.x += 0.2;
  }
  particles.forEach((p, i) => spawn(p, i));

  function field(px, py) {
    const ax = px + sep, ay = py;
    const bx = px - sep, by = py;
    const r1 = Math.max(0.02, ax * ax + ay * ay);
    const r2 = Math.max(0.02, bx * bx + by * by);
    return [ax / r1 - bx / r2, ay / r1 - by / r2];
  }

  function frameStep(dt) {
    const w = canvas.width;
    const h = canvas.height;
    const a = aspect();

    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = `rgba(0,0,0,${fade})`;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";

    const [r, g, b] = palette.accent;
    ctx.strokeStyle = `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)})`;
    ctx.lineWidth = Math.max(1, h / 700);
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const ox = p.x;
      const oy = p.y;
      const [ex, ey] = field(p.x, p.y);
      const mag = Math.hypot(ex, ey) || 1e-6;
      const nx = p.x + (ex / mag) * speed * dt;
      const ny = p.y + (ey / mag) * speed * dt;
      // Recover a particle that has reached a charge, and skip its segment so
      // the trail does not jump across the screen.
      if (Math.hypot(nx + sep, ny) < 0.03 || Math.hypot(nx - sep, ny) < 0.03) {
        p.x = ((i * 0.7) % 1) * 2 - 1;
        p.y = Math.sin(i * 2.3) * 0.9;
        continue;
      }
      p.x = nx;
      p.y = ny;
      ctx.moveTo(((ox / a) * 0.5 + 0.5) * w, (0.5 - oy * 0.5) * h);
      ctx.lineTo(((nx / a) * 0.5 + 0.5) * w, (0.5 - ny * 0.5) * h);
    }
    ctx.stroke();
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
