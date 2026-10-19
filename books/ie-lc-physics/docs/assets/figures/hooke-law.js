// Tier-1 guided investigation: the force-extension graph of a spring, and what
// happens when the limit of proportionality is passed.
//
// The page asks the reader to predict the force at an extension of 0.20 m, then to
// check it here, then to explain why the graph curves once it is past the limit. So
// the figure has to make the *bend* visible: the straight part and the curved part
// are drawn as separate paths, and the marker moves along whichever one applies.
//
// Nothing here carries a colour. The two parts of the graph use different line
// styles as well as different classes, so the distinction survives a monochrome
// bundle and does not depend on colour alone.
//
// The scaffolding — the panel, its accessible name, the slider, the readout and the
// redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import {
  fmt,
  label,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

// The spring behaves while the extension is at or below this, in metres.
const LIMIT_EXTENSION = 0.24;
// Below the limit, F = kx. Above it the spring yields: each extra metre of extension
// needs more force than the straight line predicts.
const K = 30; // N/m

function forceAt(extension) {
  if (extension <= LIMIT_EXTENSION) return K * extension;
  const over = extension - LIMIT_EXTENSION;
  return K * LIMIT_EXTENSION + K * over * (1 + 3.2 * over);
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A force-extension graph for a spring, with the point where it stops obeying Hooke's law marked",
    width: 420,
    height: 260,
  });

  const forceInput = slider(el, {
    show: true,
    id: "force",
    label: "Applied force",
    min: 0,
    max: 20,
    step: 0.5,
    value: 4,
    unit: "N",
  });

  // The plot area, in SVG units.
  const PLOT = { x0: 58, y0: 208, x1: 384, y1: 26 };
  const X_MAX = 0.55; // metres
  const Y_MAX = 22; // newtons

  const sx = (metres) => PLOT.x0 + (metres / X_MAX) * (PLOT.x1 - PLOT.x0);
  const sy = (newtons) => PLOT.y0 - (newtons / Y_MAX) * (PLOT.y0 - PLOT.y1);

  // The inverse of forceAt over the straight part: the extension a given force
  // produces. Only meaningful while the force is within the proportional range.
  const extensionFor = (force) => {
    const straightForce = K * LIMIT_EXTENSION;
    if (force <= straightForce) return force / K;
    // Invert the curved part numerically. It is monotonic, so a bisection is exact
    // enough and cannot loop forever.
    let lo = LIMIT_EXTENSION;
    let hi = X_MAX;
    for (let i = 0; i < 40; i += 1) {
      const mid = (lo + hi) / 2;
      if (forceAt(mid) < force) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2;
  };

  function update() {
    const force = Number(forceInput.value);
    const extension = extensionFor(force);
    const past = extension > LIMIT_EXTENSION;

    // Axes, drawn once per redraw so the figure stays a single self-contained SVG.
    const axes = `
      <line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x1}" y2="${PLOT.y0}" class="fig-grid" stroke-width="1.5"></line>
      <line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0}" y2="${PLOT.y1}" class="fig-grid" stroke-width="1.5"></line>
      ${label({ x: PLOT.x0 - 8, y: PLOT.y0 + 4, text: "0", anchor: "end", size: SIZE.tick })}
      ${label({ x: PLOT.x1, y: PLOT.y0 + 18, text: "extension / m", anchor: "end", size: SIZE.tick })}
      ${label({ x: PLOT.x0 - 6, y: PLOT.y1 - 4, text: "force / N", anchor: "end", size: SIZE.tick })}
    `;

    // The straight part: Hooke's law, up to the limit.
    const straight = `<line x1="${sx(0)}" y1="${sy(0)}" x2="${sx(LIMIT_EXTENSION)}" y2="${sy(K * LIMIT_EXTENSION)}" class="fig-accent" stroke-width="2.5"></line>`;

    // The curved part: sampled, because it is not a straight line. Drawn dashed so
    // it is distinguishable without colour.
    let curve = "";
    for (let i = 0; i < 40; i += 1) {
      const e1 = LIMIT_EXTENSION + ((X_MAX - LIMIT_EXTENSION) * i) / 40;
      const e2 = LIMIT_EXTENSION + ((X_MAX - LIMIT_EXTENSION) * (i + 1)) / 40;
      if (forceAt(e1) > Y_MAX) break;
      curve += `<line x1="${sx(e1).toFixed(1)}" y1="${sy(forceAt(e1)).toFixed(1)}" x2="${sx(e2).toFixed(1)}" y2="${sy(Math.min(forceAt(e2), Y_MAX)).toFixed(1)}" class="fig-warn" stroke-width="2" stroke-dasharray="5 4"></line>`;
    }

    // The limit of proportionality, marked where the two parts meet.
    const limitMark =
      `<line x1="${sx(LIMIT_EXTENSION)}" y1="${PLOT.y0}" x2="${sx(LIMIT_EXTENSION)}" y2="${sy(K * LIMIT_EXTENSION)}" class="fig-grid" stroke-width="1" stroke-dasharray="2 3"></line>` +
      `<circle cx="${sx(LIMIT_EXTENSION)}" cy="${sy(K * LIMIT_EXTENSION)}" r="4" class="fig-ink"></circle>` +
      `${label({ x: sx(LIMIT_EXTENSION) + 6, y: sy(K * LIMIT_EXTENSION) - 8, text: "limit of proportionality", anchor: "start", size: SIZE.tick })}`;

    // The spring itself, drawn to the right so the reader sees the extension as well
    // as reading it. Coils bunch together as the spring lengthens.
    const coils = past ? 9 : 13;
    const top = 40;
    const bottom = top + 40 + extension * 380;
    let spring = "";
    for (let i = 0; i <= coils; i += 1) {
      const y = top + ((bottom - top) * i) / coils;
      const x = 404 + (i % 2 === 0 ? -9 : 9);
      spring += `${i === 0 ? "M" : "L"}${x} ${y.toFixed(1)} `;
    }

    const marker = `<circle cx="${sx(extension)}" cy="${sy(force)}" r="5.5" class="${past ? "fig-warn" : "fig-accent"}"></circle>`;

    svg.innerHTML = `${axes}${limitMark}${straight}${curve}${marker}
      <line x1="404" y1="${top - 16}" x2="404" y2="${top}" class="fig-grid" stroke-width="2"></line>
      <path d="${spring.trim()}" style="fill:none" class="fig-ink" stroke-width="2" stroke-linejoin="round"></path>
      <line x1="386" y1="${bottom.toFixed(1)}" x2="424" y2="${bottom.toFixed(1)}" class="fig-ink" stroke-width="3"></line>
      ${label({ x: 432, y: top + 10, text: "spring", anchor: "start", size: SIZE.tick })}`;

    readout.textContent = past
      ? `F = ${quantity(force, "N", 1)}, extension = ${quantity(extension, "m", 3)}. Past the limit of proportionality: the graph is no longer straight, so F = kx no longer gives this extension.`
      : `F = ${quantity(force, "N", 1)}, extension = ${quantity(extension, "m", 3)}. Below the limit, so F = kx, with k = ${K} N/m.`;
  }

  react([forceInput], update);
}
