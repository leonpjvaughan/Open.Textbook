// Guided investigation for the power rule: the gradient of y = x^n.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const X_MAX = 2;
const Y_MAX = 16;
const SX = 160;
const SY = 15;
const CX = 40;
const CY = 270;

function xToPx(x) {
  return CX + x * SX;
}

function yToPx(y) {
  return CY - y * SY;
}

function curvePoints(n) {
  const points = [];
  for (let x = 0.02; x <= X_MAX + 1e-9; x += 0.02) {
    points.push(`${xToPx(x).toFixed(1)},${yToPx(Math.pow(x, n)).toFixed(1)}`);
  }
  return points.join(" ");
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A power curve with sliders for the power and the point, showing the " +
      "gradient of the tangent",
    width: 400,
    height: 300,
    max: 520,
  });

  const nInput = slider(el, { show: false,
    id: "n",
    label: "Power n",
    min: 0.5,
    max: 4,
    step: 0.5,
    value: 2,
  });
  const xInput = slider(el, { show: false,
    id: "x",
    label: "Point x",
    min: 0.25,
    max: 2,
    step: 0.05,
    value: 1,
  });

  function axes() {
    return (
      `<line x1="${xToPx(0)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(0)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`
    );
  }

  function grid() {
    let lines = "";
    for (let x = 0.5; x <= X_MAX; x += 0.5) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(0)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(Y_MAX)}" class="fig-grid"></line>`;
    }
    for (let y = 2; y <= Y_MAX; y += 2) {
      lines +=
        `<line x1="${xToPx(0)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const n = Number(nInput.value);
    const x0 = Number(xInput.value);
    const y0 = Math.pow(x0, n);
    const m = n * Math.pow(x0, n - 1);

    const x1 = Math.max(0.02, x0 - 0.5);
    const x2 = Math.min(X_MAX, x0 + 0.5);
    const tangent =
      `<line x1="${xToPx(x1).toFixed(1)}" y1="${yToPx(y0 + m * (x1 - x0)).toFixed(1)}" ` +
      `x2="${xToPx(x2).toFixed(1)}" y2="${yToPx(y0 + m * (x2 - x0)).toFixed(1)}" class="fig-accent"></line>`;

    const curve = `<polyline points="${curvePoints(n)}" class="fig-line"></polyline>`;
    const marker = `<circle cx="${xToPx(x0).toFixed(1)}" cy="${yToPx(y0).toFixed(1)}" r="4" class="fig-ink"></circle>`;

    svg.innerHTML = grid() + axes() + curve + tangent + marker;

    readout.textContent =
      `The curve is y = x to the power ${n}. ` +
      `At x = ${x0.toFixed(2)}, the value is ${y0.toFixed(3)}. ` +
      `The gradient is n times x to the power n minus 1, which is ${m.toFixed(3)}. ` +
      `At x = 1 the gradient would equal ${n.toFixed(2)}.`;

    svg.setAttribute(
      "aria-label",
      `A power curve with power ${n}. A point is at x equals ${x0.toFixed(2)}, ` +
        `where the gradient is ${m.toFixed(3)}.`
    );
  }

  react([nInput, xInput], update);
}
