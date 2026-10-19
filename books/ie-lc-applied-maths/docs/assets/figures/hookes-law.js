// Tier-1 guided investigation: Hooke's law, and where it stops holding.
//
// The page asks the reader to predict the extension for a given force, then to find
// where the straight line ends. So the figure draws the force-extension graph with the
// limit of proportionality marked, and moves a marker along whichever part applies.
//
// Nothing here carries a colour. The straight part and the curved part use different
// line styles as well as different classes, so the distinction survives a monochrome
// bundle and does not rest on colour.
//
// The scaffolding comes from `kit.js`. What is left is the drawing and the sentences.
import {
  fmt,
  label,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

// The spring from the chapter problem: 120000 N/m, and it behaves up to 0.12 m.
const K = 120000; // N/m
const LIMIT_X = 0.12; // m
const X_MAX = 0.20; // m, the right-hand edge of the graph

function forceAt(x) {
  if (x <= LIMIT_X) return K * x;
  const over = x - LIMIT_X;
  return K * LIMIT_X + K * over * (1 + 6 * over);
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A force-extension graph for a spring, with the limit of proportionality marked and a marker at the chosen force",
    width: 560,
    height: 320,
  });

  const forceInput = slider(el, {
    show: true,
    id: "force",
    label: "Applied force",
    min: 0,
    max: 26000,
    step: 500,
    value: 8000,
    unit: "N",
  });

  const PLOT = { x0: 74, y0: 250, x1: 520, y1: 30 };
  const Y_MAX = 30000; // N

  const sx = (x) => PLOT.x0 + (x / X_MAX) * (PLOT.x1 - PLOT.x0);
  const sy = (f) => PLOT.y0 - (f / Y_MAX) * (PLOT.y0 - PLOT.y1);

  // The inverse of forceAt over the straight part, then by bisection past the limit.
  function extensionFor(force) {
    if (force <= K * LIMIT_X) return force / K;
    let lo = LIMIT_X;
    let hi = X_MAX;
    for (let i = 0; i < 40; i += 1) {
      const mid = (lo + hi) / 2;
      if (forceAt(mid) < force) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2;
  }

  function update() {
    const force = Number(forceInput.value);
    const x = extensionFor(force);
    const past = x > LIMIT_X;

    const axes =
      `<line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x1}" y2="${PLOT.y0}" class="fig-grid" stroke-width="1.5"></line>` +
      `<line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0}" y2="${PLOT.y1}" class="fig-grid" stroke-width="1.5"></line>` +
      label({ x: PLOT.x1, y: PLOT.y0 + 24, text: "extension / m", size: SIZE.value, class: "text-ink", anchor: "end" }) +
      label({ x: PLOT.x0 - 10, y: PLOT.y1 - 6, text: "force / N", size: SIZE.value, class: "text-ink", anchor: "end" });

    const straight = `<line x1="${sx(0)}" y1="${sy(0)}" x2="${sx(LIMIT_X)}" y2="${sy(K * LIMIT_X)}" class="fig-accent" stroke-width="3"></line>`;

    let curve = "";
    for (let i = 0; i < 32; i += 1) {
      const a = LIMIT_X + ((X_MAX - LIMIT_X) * i) / 32;
      const b = LIMIT_X + ((X_MAX - LIMIT_X) * (i + 1)) / 32;
      if (forceAt(a) > Y_MAX) break;
      curve += `<line x1="${sx(a).toFixed(1)}" y1="${sy(forceAt(a)).toFixed(1)}" x2="${sx(b).toFixed(1)}" y2="${sy(Math.min(forceAt(b), Y_MAX)).toFixed(1)}" class="fig-warn" stroke-width="2.5" stroke-dasharray="6 4"></line>`;
    }

    const limit =
      `<line x1="${sx(LIMIT_X)}" y1="${PLOT.y0}" x2="${sx(LIMIT_X)}" y2="${sy(K * LIMIT_X)}" class="fig-grid" stroke-width="1.2" stroke-dasharray="3 3"></line>` +
      `<circle cx="${sx(LIMIT_X)}" cy="${sy(K * LIMIT_X)}" r="4.5" class="fig-ink"></circle>` +
      label({ x: sx(LIMIT_X) - 8, y: sy(K * LIMIT_X) - 12, text: "limit", size: SIZE.value, class: "text-ink", anchor: "end" });

    const marker = `<circle cx="${sx(x)}" cy="${sy(force)}" r="7" class="${past ? "fig-warn" : "fig-accent"}"></circle>`;

    svg.innerHTML = `${axes}${limit}${straight}${curve}${marker}`;

    readout.textContent = past
      ? `F = ${quantity(force, "N", 0)} gives an extension of ${quantity(x, "m", 3)}. That is past the limit of proportionality, so the graph is no longer straight and F = kx does not give this extension.`
      : `F = ${quantity(force, "N", 0)} gives an extension of ${quantity(x, "m", 3)}, so k = ${quantity(K, "N", 0)}/m. The graph is still straight, so F = kx holds.`;
  }

  react([forceInput], update);
}
