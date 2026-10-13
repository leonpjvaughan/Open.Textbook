// Guided investigation for the solution set of a trigonometric equation.
//
// A trigonometric equation holds at several angles in an interval, and a multiple
// angle packs more of them into the same interval. The reader chooses the
// function and the value k, and every crossing of the horizontal line with the
// curve is marked and read out, so the size of the solution set is seen rather
// than remembered. Predict, Test and Explain belong to the page; this is the Test.
//
// Pure HTML and SVG, an ES module, no colour of its own: the fig-* classes carry
// the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the chooser, the slider,
// the live readout and the redraw — comes from `kit.js`.
import { panel, slider, chooser, react } from "./kit.js";

const PI = Math.PI;
const WIDTH = 460;
const HEIGHT = 280;
const LEFT = 40;
const RIGHT = 20;
const TOP = 22;
const BOTTOM = 34;
const PLOT_W = WIDTH - LEFT - RIGHT;
const PLOT_H = HEIGHT - TOP - BOTTOM;
const Y_MAX = 1.25;

const FUNCTIONS = {
  sin: { label: "sin x", f: (x) => Math.sin(x) },
  cos: { label: "cos x", f: (x) => Math.cos(x) },
  sin2: { label: "sin 2x", f: (x) => Math.sin(2 * x) },
  cos2: { label: "cos 2x", f: (x) => Math.cos(2 * x) },
};

function xToPx(x) {
  return LEFT + (x / (2 * PI)) * PLOT_W;
}

function yToPx(y) {
  return TOP + ((Y_MAX - y) / (2 * Y_MAX)) * PLOT_H;
}

// Write an angle as a multiple of pi when it is one, and as a decimal otherwise.
function formatAngle(x) {
  if (Math.abs(x) < 1e-9) return "0";
  const value = x / PI;
  for (const q of [1, 2, 3, 4, 6, 8, 12]) {
    const p = Math.round(value * q);
    if (p !== 0 && Math.abs(value - p / q) < 1e-7) {
      if (q === 1) {
        if (p === 1) return "π";
        if (p === -1) return "-π";
        return `${p}π`;
      }
      const sign = p < 0 ? "-" : "";
      const size = Math.abs(p) === 1 ? "" : `${Math.abs(p)}`;
      return `${sign}${size}π/${q}`;
    }
  }
  return `${x.toFixed(3)} rad`;
}

// Every x in [0, 2pi) where f(x) = k, found by sign changes and refined by
// bisection, so the module does not need a formula per function.
function solutions(f, k) {
  const roots = [];
  const steps = 4000;
  const add = (x) => {
    if (x >= 2 * PI - 1e-6) return;
    if (!roots.some((r) => Math.abs(r - x) < 1e-6)) roots.push(x);
  };
  let prevX = 0;
  let prevY = f(0) - k;
  for (let i = 0; i <= steps; i += 1) {
    const x = (i / steps) * 2 * PI;
    const y = f(x) - k;
    if (Math.abs(y) < 1e-9) add(x);
    if (i > 0 && prevY !== 0 && y !== 0 && prevY * y < 0) {
      let lo = prevX;
      let hi = x;
      let loY = prevY;
      for (let j = 0; j < 60; j += 1) {
        const mid = (lo + hi) / 2;
        const midY = f(mid) - k;
        if (loY * midY <= 0) {
          hi = mid;
        } else {
          lo = mid;
          loY = midY;
        }
      }
      add((lo + hi) / 2);
    }
    prevX = x;
    prevY = y;
  }
  return roots;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "The graph of a trigonometric function from 0 to 2 pi with a horizontal " +
      "line at k, and a dot at every solution in the interval",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  const fnInput = chooser(el, {
    id: "fn",
    label: "Function:",
    name: "Trigonometric function",
    choices: [
      { value: "sin", label: "sin x" },
      { value: "cos", label: "cos x" },
      { value: "sin2", label: "sin 2x" },
      { value: "cos2", label: "cos 2x" },
    ],
  });
  const kInput = slider(el, { show: false,
    id: "k",
    label: "Value of k:",
    name: "Value of k",
    min: -1,
    max: 1,
    step: 0.05,
    value: 0.5,
  });

  function draw() {
    const fn = FUNCTIONS[fnInput.value];
    const k = Number(kInput.value);
    const roots = solutions(fn.f, k);

    let curve = "";
    const segments = [];
    for (let i = 0; i <= 400; i += 1) {
      const x = (i / 400) * 2 * PI;
      segments.push(`${xToPx(x).toFixed(1)},${yToPx(fn.f(x)).toFixed(1)}`);
    }
    curve = `<polyline points="${segments.join(" ")}" class="fig-line"></polyline>`;

    let ticks = "";
    const marks = [
      [0, "0"],
      [PI / 2, "π/2"],
      [PI, "π"],
      [(3 * PI) / 2, "3π/2"],
      [2 * PI, "2π"],
    ];
    for (const [x, label] of marks) {
      const px = xToPx(x);
      ticks +=
        `<line x1="${px.toFixed(1)}" y1="${yToPx(0).toFixed(1)}" x2="${px.toFixed(1)}" ` +
        `y2="${(yToPx(0) + 5).toFixed(1)}" class="fig-ink"></line>` +
        `<text x="${px.toFixed(1)}" y="${(HEIGHT - 12).toFixed(1)}" text-anchor="middle" ` +
        `font-size="13" class="text-ink">${label}</text>`;
    }

    let dots = "";
    for (const x of roots) {
      const px = xToPx(x);
      const py = yToPx(k);
      dots +=
        `<line x1="${px.toFixed(1)}" y1="${yToPx(0).toFixed(1)}" x2="${px.toFixed(1)}" ` +
        `y2="${py.toFixed(1)}" class="fig-grid" stroke-dasharray="3 3"></line>` +
        `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4.5" class="fig-good"></circle>`;
    }

    const axes =
      `<line x1="${LEFT}" y1="${yToPx(0).toFixed(1)}" x2="${LEFT + PLOT_W}" ` +
      `y2="${yToPx(0).toFixed(1)}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${(TOP + PLOT_H).toFixed(1)}" ` +
      `class="fig-ink"></line>`;
    const level =
      `<line x1="${LEFT}" y1="${yToPx(k).toFixed(1)}" x2="${LEFT + PLOT_W}" ` +
      `y2="${yToPx(k).toFixed(1)}" class="fig-warn" stroke-dasharray="6 4"></line>`;

    svg.innerHTML = axes + ticks + level + curve + dots;

    const count = roots.length;
    let list;
    if (count === 0) {
      list = "there are no solutions in this interval";
    } else {
      list =
        `the solution${count === 1 ? "" : "s"} ${count === 1 ? "is" : "are"} ` +
        roots.map(formatAngle).join(", ");
    }
    readout.textContent = `${fn.label} = ${k}. In the interval 0 to 2π, ${list}.`;

    svg.setAttribute(
      "aria-label",
      `The graph of ${fn.label} from 0 to 2 pi with a horizontal line at ${k}. ` +
        `${count} solution${count === 1 ? "" : "s"} marked in the interval.`
    );
  }

  react([fnInput, kInput], draw);
}
