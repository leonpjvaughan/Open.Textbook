// Prototype: the two CSS-only alternates, and nothing else.
//
// `gradient-static` adds one <style> and never runs again. `gradient-animated`
// animates `background-position` on a fixed layer. Both declare only `var(--tb-*)`
// tokens — no literal colour — so they follow every bundle and both schemes the
// way a page or a figure must.
//
// Style, not script, is the point: a CSS gradient costs zero main-thread time
// when it is idle, and the animated one is composited by the browser.

const CLASS = "tb-bg-gradient";

function ensureStyle(id, text) {
  let style = document.getElementById(id);
  if (!style) {
    style = document.createElement("style");
    style.id = id;
    document.head.appendChild(style);
  }
  style.textContent = text;
  return style;
}

const LAYER = `
.${CLASS} {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    radial-gradient(120% 90% at 15% 10%, color-mix(in oklab, var(--tb-accent) 22%, transparent), transparent 60%),
    radial-gradient(100% 80% at 85% 90%, color-mix(in oklab, var(--tb-fig-warn) 14%, transparent), transparent 55%),
    linear-gradient(160deg, var(--tb-paper), var(--tb-paper));
  background-size: 200% 200%, 200% 200%, 100% 100%;
  background-position: 0% 50%, 100% 50%, 0 0;
}
`;

const KEYFRAMES = `
@keyframes tb-bg-drift {
  0%   { background-position: 0% 50%, 100% 50%, 0 0; }
  50%  { background-position: 100% 50%, 0% 50%, 0 0; }
  100% { background-position: 0% 50%, 100% 50%, 0 0; }
}
.${CLASS} { animation: tb-bg-drift 36s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .${CLASS} { animation: none; }
}
`;

function addLayer() {
  const layer = document.createElement("div");
  layer.className = CLASS;
  layer.setAttribute("aria-hidden", "true");
  (document.body || document.documentElement).appendChild(layer);
  return layer;
}

export function mountStatic() {
  ensureStyle("tb-bg-gradient-style", LAYER);
  const layer = addLayer();
  return {
    layer,
    stop() { layer.remove(); },
    palette() { return null; },
    stats() { return { running: false, static: true }; },
  };
}

export function mountAnimated() {
  ensureStyle("tb-bg-gradient-style", LAYER + KEYFRAMES);
  const layer = addLayer();
  return {
    layer,
    stop() { layer.remove(); },
    palette() { return null; },
    stats() { return { running: !window.matchMedia("(prefers-reduced-motion: reduce)").matches, cssAnimated: true }; },
  };
}
