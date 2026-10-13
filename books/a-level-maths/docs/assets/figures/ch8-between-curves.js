// Guided investigation for the area between two curves.
// The curve y = x^2 and the line y = kx enclose a region shaded between their
// intersections, with the exact area read from an antiderivative.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const X_MIN = -0.5;
const X_MAX = 3.3;
const Y_MIN = -0.5;
const Y_MAX = 9.5;
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
  for (let x = 0; x <= 3; x += 0.05) {
    points.push(`${xToPx(x).toFixed(1)},${yToPx(x * x).toFixed(1)}`);
  }
  return points.join(" ");
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "The curve y equals x squared and the line y equals k x, with the region " +
      "between them shaded",
    width: 420,
    height: 300,
  });

  const kInput = slider(el, { show: false,
    id: "k",
    label: "Gradient k of the line",
    min: 0.5,
    max: 3,
    step: 0.1,
    value: 1,
  });

  function grid() {
    let lines = "";
    for (let x = 0; x <= 3; x += 1) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(Y_MIN)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(Y_MAX)}" class="fig-grid"></line>`;
    }
    for (let y = 1; y <= 9; y += 1) {
      lines +=
        `<line x1="${xToPx(X_MIN)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const k = Number(kInput.value);
    const area = (k * k * k) / 6;

    const shade = [];
    for (let x = 0; x <= k + 1e-9; x += 0.04) {
      shade.push(`${xToPx(x).toFixed(1)},${yToPx(k * x).toFixed(1)}`);
    }
    for (let x = k; x >= -1e-9; x -= 0.04) {
      shade.push(`${xToPx(x).toFixed(1)},${yToPx(x * x).toFixed(1)}`);
    }

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    const band =
      `<polygon points="${shade.join(" ")}" class="fig-accent" fill-opacity="0.2"></polygon>`;

    const curve = `<polyline points="${curvePoints()}" class="fig-line"></polyline>`;

    const line =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(k * X_MIN).toFixed(1)}" ` +
      `x2="${xToPx(X_MAX)}" y2="${yToPx(k * X_MAX).toFixed(1)}" class="fig-warn"></line>`;

    const marker = `<circle cx="${xToPx(k).toFixed(1)}" cy="${yToPx(k * k).toFixed(1)}" r="4" class="fig-ink"></circle>`;

    svg.innerHTML = grid() + band + axes + line + curve + marker;

    readout.textContent =
      `The line y = kx and the curve y = x squared meet at x = 0 and x = ${k.toFixed(1)}. ` +
      `The shaded area is k cubed divided by 6, which is ${area.toFixed(4)} square units. ` +
      `When k doubles, the area grows by a factor of 8.`;

    svg.setAttribute(
      "aria-label",
      `The curve y equals x squared and the line y equals ${k.toFixed(1)} x. The region between them is shaded and has area ${area.toFixed(4)}.`
    );
  }

  react(kInput, update);
}
