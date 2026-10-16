// Tier-1 guided investigation: the terminal potential difference of a battery
// against the current it supplies.
//
// The page asks the reader to predict what happens to the terminal potential
// difference when the current doubles, then to raise the internal resistance and
// describe what happens to the gradient. So the figure has to show the straight line
// V = E - I r, with the intercept fixed at the emf and the gradient set by r, and a
// marker that moves along it.
//
// Nothing here carries a colour. The line and the marker use different classes, so the
// figure survives a monochrome bundle.
//
// The scaffolding — the panel, its accessible name, the sliders, the readout and the
// redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, fmt, label, panel, scale, slider, react } from "./kit.js";

// The emf of the battery, in volts. Fixed, because it is the intercept of the line.
const EMF = 12;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Terminal potential difference against current for a battery with internal resistance",
    width: 420,
    height: 260,
  });

  const currentInput = slider(el, {
    show: false,
    id: "current",
    label: "Current",
    min: 0,
    max: 5,
    step: 0.1,
    value: 2,
    unit: "A",
  });

  const rInput = slider(el, {
    show: false,
    id: "resistance",
    label: "Internal resistance",
    min: 0,
    max: 1,
    step: 0.05,
    value: 0.5,
    unit: "ohm",
  });

  // The plot area, in SVG units.
  const PLOT = { x0: 58, y0: 208, x1: 384, y1: 26 };
  const X_MAX = 5.2; // amperes
  const Y_MAX = 12.5; // volts
  const x = scale({ domain: [0, X_MAX], range: [PLOT.x0, PLOT.x1] });
  const y = scale({ domain: [0, Y_MAX], range: [PLOT.y0, PLOT.y1] });

  function update() {
    const current = Number(currentInput.value);
    const r = Number(rInput.value);
    const lost = current * r;
    const terminal = EMF - lost;

    const axes = `
      <line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x1}" y2="${PLOT.y0}" class="fig-grid" stroke-width="1.5"></line>
      <line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0}" y2="${PLOT.y1}" class="fig-grid" stroke-width="1.5"></line>
      ${label({ x: PLOT.x0 - 8, y: PLOT.y0 + 4, text: "0", anchor: "end", size: SIZE.tick })}
      ${label({ x: PLOT.x1, y: PLOT.y0 + 18, text: "current / A", anchor: "end", size: SIZE.tick })}
      ${label({ x: PLOT.x0 - 6, y: PLOT.y1 - 4, text: "terminal potential difference / V", anchor: "end", size: SIZE.tick })}
    `;

    // The line V = E - I r. It always starts at the emf on the vertical axis, and its
    // gradient is set by the internal resistance.
    const far = Math.max(EMF - X_MAX * r, 0);
    const line = `<line x1="${x(0)}" y1="${y(EMF)}" x2="${x(X_MAX)}" y2="${y(far)}" class="fig-accent" stroke-width="2.5"></line>`;

    const marker = `<circle cx="${x(current)}" cy="${y(terminal)}" r="5.5" class="fig-ink"></circle>`;

    svg.innerHTML = `${axes}${line}${marker}`;

    readout.textContent = `Current = ${fmt(current, 1)} A, terminal potential difference = ${fmt(terminal, 2)} V, lost volts = ${fmt(lost, 2)} V. The line meets the vertical axis at the emf, ${EMF} V, and its gradient is the negative of the internal resistance.`;
  }

  react([currentInput, rInput], update);
}
