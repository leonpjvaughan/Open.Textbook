// Guided investigation for fixed-point iteration: staircase, cobweb, and divergence.
//
// The chapter's chapter problem is the iteration in Section 9.2, so this figure is
// the investigation that section is built around rather than a decoration: three
// rearrangements of the same equation, all with the same fixed point, one of which
// steps neatly towards it, one of which spirals, and one of which runs away. The
// reader reads the gradient of g at the fixed point off the picture and explains
// why it decides which is which.
//
// Plain HTML, SVG and a select, so it is keyboard-operable with no framework, and
// no colour of its own: the fig-* classes carry the theme. Runtime text is plain
// text, never TeX.
//
// The scaffolding — the surface, its accessible name, the controls, the live
// readout and the redraw — comes from `kit.js`. The verdict line is the figure's
// own text, so it stays here.
import { panel, slider, chooser, react } from "./kit.js";

const X_MIN = 0;
const X_MAX = 3;
const PLOT_LEFT = 44;
const PLOT_TOP = 18;
const PLOT_RIGHT = 372;
const PLOT_BOTTOM = 348;
const SPAN = X_MAX - X_MIN;
const PX_PER_UNIT = (PLOT_RIGHT - PLOT_LEFT) / SPAN;

// Phi, the fixed point of all three rearrangements of x^2 - x - 1 = 0.
const PHI = (1 + Math.sqrt(5)) / 2;

const MAPS = [
  {
    id: "sqrt",
    label: "x = the square root of (x + 1)",
    g: (x) => Math.sqrt(x + 1),
    shape: "staircase",
  },
  {
    id: "reciprocal",
    label: "x = 1 + 1 / x",
    g: (x) => (x === 0 ? Infinity : 1 + 1 / x),
    shape: "cobweb",
  },
  {
    id: "square",
    label: "x = x squared minus 1",
    g: (x) => x * x - 1,
    shape: "diverges",
  },
];

function toPx(x) {
  return PLOT_LEFT + (x - X_MIN) * PX_PER_UNIT;
}

function toPy(y) {
  return PLOT_BOTTOM - (y - X_MIN) * PX_PER_UNIT;
}

function inRange(v) {
  return Number.isFinite(v) && v >= X_MIN - 0.05 && v <= X_MAX + 0.05;
}

function curve(g, cls) {
  const points = [];
  const steps = 160;
  for (let i = 0; i <= steps; i += 1) {
    const x = X_MIN + (SPAN * i) / steps;
    const y = g(x);
    if (!inRange(y)) continue;
    points.push(`${toPx(x).toFixed(1)},${toPy(y).toFixed(1)}`);
  }
  return `<polyline class="${cls}" fill="none" points="${points.join(" ")}"></polyline>`;
}

function iterates(g, start, count) {
  const out = [start];
  let v = start;
  for (let i = 0; i < count; i += 1) {
    v = g(v);
    out.push(v);
    if (!inRange(v)) break;
  }
  return out;
}

// The cobweb: vertical to the curve, horizontal to y = x, repeat.
function path(values, g) {
  const segments = [];
  for (let i = 0; i < values.length - 1; i += 1) {
    const x = values[i];
    const y = g(x);
    if (!inRange(x) || !inRange(y)) break;
    segments.push(
      `<line class="fig-accent" x1="${toPx(x).toFixed(1)}" y1="${toPy(x).toFixed(1)}" ` +
        `x2="${toPx(x).toFixed(1)}" y2="${toPy(y).toFixed(1)}" stroke-width="1.6"></line>`,
    );
    if (!inRange(y)) break;
    segments.push(
      `<line class="fig-accent" x1="${toPx(x).toFixed(1)}" y1="${toPy(y).toFixed(1)}" ` +
        `x2="${toPx(y).toFixed(1)}" y2="${toPy(y).toFixed(1)}" stroke-width="1.6"></line>`,
    );
  }
  return segments.join("");
}

function short(value) {
  if (!Number.isFinite(value)) return "not a number";
  if (Math.abs(value) > 1000) return value.toExponential(2);
  return value.toFixed(4);
}

export function mount(el) {
  const { root, svg, readout } = panel(el, {
    label:
      "Graph of y equals g of x and y equals x, with the first four iterates " +
      "drawn as a staircase, a cobweb or a diverging path",
    width: 400,
    height: 368,
  });

  const select = chooser(el, {
    id: "map",
    label: "Rearrangement",
    choices: MAPS.map((m) => ({ value: m.id, label: m.label })),
  });
  const startInput = slider(el, { show: false,
    id: "start",
    label: "Starting value",
    min: 0.4,
    max: 2.9,
    step: 0.1,
    value: 1,
  });

  const verdict = document.createElement("p");
  verdict.className = "fig-note";
  root.append(verdict);

  function draw() {
    const map = MAPS.find((m) => m.id === select.value) || MAPS[0];
    const start = Number(startInput.value);
    const values = iterates(map.g, start, 4);

    const axes =
      `<line class="fig-grid" x1="${toPx(X_MIN)}" y1="${toPy(X_MIN)}" ` +
      `x2="${toPx(X_MAX)}" y2="${toPy(X_MIN)}" stroke-width="1"></line>` +
      `<line class="fig-grid" x1="${toPx(X_MIN)}" y1="${toPy(X_MIN)}" ` +
      `x2="${toPx(X_MIN)}" y2="${toPy(X_MAX)}" stroke-width="1"></line>`;

    // y = x, the line the iterate steps across.
    const diagonal =
      `<line class="fig-ink" x1="${toPx(X_MIN)}" y1="${toPy(X_MIN)}" ` +
      `x2="${toPx(X_MAX)}" y2="${toPy(X_MAX)}" stroke-width="1.2" ` +
      `stroke-dasharray="4 4"></line>`;

    const fixed =
      `<circle class="fig-good" cx="${toPx(PHI).toFixed(1)}" cy="${toPy(PHI).toFixed(1)}" ` +
      `r="4"></circle>`;

    svg.innerHTML =
      axes +
      curve((x) => x, "fig-ink") +
      curve(map.g, "fig-accent") +
      diagonal +
      fixed +
      path(values, map.g);

    readout.textContent =
      `${map.shape}: starting at ${start.toFixed(1)}, the iterates are ` +
      values.map(short).join(", ") + ".";

    // Whether the iteration settles is decided by the gradient of g at the
    // fixed point: a size below 1 pulls the iterates in, a size above 1 pushes
    // them away. Counting how close a few iterates got is not the test — with
    // x = 1 + 1 / x the fifth iterate is still 1.8% away, so the picture shows a
    // cobweb closing in while four iterates alone would call it divergent.
    const gPrime = (map.g(PHI + 1e-6) - map.g(PHI - 1e-6)) / 2e-6;
    const converged = Math.abs(gPrime) < 1;
    verdict.textContent =
      `The gradient of g at the fixed point has size ${Math.abs(gPrime).toFixed(2)}, ` +
      (converged
        ? "which is less than 1, so this rearrangement is closing on the fixed point, at about 1.618."
        : "which is greater than 1, so this rearrangement is moving away from the fixed point, not towards it.");
  }

  react([select, startInput], draw);
}
