// Guided investigation for integration as a limit of a sum.
// Right-endpoint rectangles under y = x^2 on [0, 2]; as the number of strips
// grows, their total area approaches the exact integral 8/3.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const X_MIN = 0;
const X_MAX = 2.15;
const Y_MIN = 0;
const Y_MAX = 4.4;
const PLOT_W = 340;
const PLOT_H = 250;
const ORIGIN_X = 50;
const ORIGIN_Y = 280;

function xToPx(x) {
  return ORIGIN_X + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}

function yToPx(y) {
  return ORIGIN_Y - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
}

function curvePoints() {
  const points = [];
  for (let x = 0; x <= 2; x += 0.05) {
    points.push(`${xToPx(x).toFixed(1)},${yToPx(x * x).toFixed(1)}`);
  }
  return points.join(" ");
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Rectangles under the curve y equals x squared, with a slider for the " +
      "number of strips",
    width: 420,
    height: 300,
  });

  const nInput = slider(el, { show: false,
    id: "n",
    label: "Number of strips n",
    min: 1,
    max: 40,
    step: 1,
    value: 4,
  });

  function grid() {
    let lines = "";
    for (let x = 0.5; x <= 2; x += 0.5) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(Y_MIN)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(Y_MAX)}" class="fig-grid"></line>`;
    }
    for (let y = 1; y <= 4; y += 1) {
      lines +=
        `<line x1="${xToPx(X_MIN)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const n = Number(nInput.value);
    const dx = 2 / n;
    const sum = (4 * (n + 1) * (2 * n + 1)) / (3 * n * n);

    let rects = "";
    for (let i = 0; i < n; i += 1) {
      const xLeft = i * dx;
      const xRight = (i + 1) * dx;
      const height = xRight * xRight;
      const x = xToPx(xLeft);
      const y = yToPx(height);
      const width = xToPx(xRight) - x;
      const barHeight = yToPx(0) - y;
      rects +=
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${width.toFixed(1)}" ` +
        `height="${barHeight.toFixed(1)}" class="fig-accent" fill-opacity="0.18"></rect>`;
    }

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    const curve = `<polyline points="${curvePoints()}" class="fig-line"></polyline>`;

    svg.innerHTML = grid() + rects + axes + curve;

    readout.textContent =
      `With ${n} strips of width ${dx.toFixed(3)}, the total rectangle area is ${sum.toFixed(4)}. ` +
      `The exact area under y = x squared from 0 to 2 is 8 thirds, which is 2.6667. ` +
      `Every rectangle reaches the curve at its right end, so the total is an overestimate that falls towards 2.6667.`;

    svg.setAttribute(
      "aria-label",
      `${n} rectangles under the curve y equals x squared. Their total area is ${sum.toFixed(4)}, approaching the exact value 2.6667.`
    );
  }

  react(nInput, update);
}
