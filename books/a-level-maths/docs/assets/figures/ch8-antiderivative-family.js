// Guided investigation for the Fundamental Theorem of Calculus.
// The gradient of an antiderivative F at x equals the height of f at x, and it
// does not change when the constant C changes.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const X_MIN = -2.2;
const X_MAX = 2.2;
const Y_MIN = -3.5;
const Y_MAX = 7.5;
const PLOT_W = 360;
const PLOT_H = 260;
const ORIGIN_X = 40;
const ORIGIN_Y = 280;

function xToPx(x) {
  return ORIGIN_X + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}

function yToPx(y) {
  return ORIGIN_Y - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
}

function parabolaPoints(c) {
  const points = [];
  for (let x = X_MIN + 0.05; x <= X_MAX; x += 0.05) {
    points.push(`${xToPx(x).toFixed(1)},${yToPx(x * x + c).toFixed(1)}`);
  }
  return points.join(" ");
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A straight line for the gradient function and a parabola for its " +
      "antiderivative family, with sliders for the constant and the point",
    width: 420,
    height: 300,
  });

  const cInput = slider(el, { show: false,
    id: "c",
    label: "Constant C",
    min: -3,
    max: 3,
    step: 0.5,
    value: 0,
  });
  const xInput = slider(el, { show: false,
    id: "x",
    label: "Point x",
    min: -1.8,
    max: 1.8,
    step: 0.1,
    value: 1,
  });

  function grid() {
    let lines = "";
    for (let x = -2; x <= 2; x += 1) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(Y_MIN)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(Y_MAX)}" class="fig-grid"></line>`;
    }
    for (let y = -3; y <= 7; y += 1) {
      lines +=
        `<line x1="${xToPx(X_MIN)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const c = Number(cInput.value);
    const x0 = Number(xInput.value);
    const slope = 2 * x0;
    const fHeight = 2 * x0;
    const fValue = x0 * x0 + c;

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    const line =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(2 * X_MIN).toFixed(1)}" ` +
      `x2="${xToPx(X_MAX)}" y2="${yToPx(2 * X_MAX).toFixed(1)}" class="fig-warn"></line>`;

    const parabola = `<polyline points="${parabolaPoints(c)}" class="fig-line"></polyline>`;

    const tanStart = Math.max(X_MIN, x0 - 0.8);
    const tanEnd = Math.min(X_MAX, x0 + 0.8);
    const tangent =
      `<line x1="${xToPx(tanStart).toFixed(1)}" y1="${yToPx(fValue + slope * (tanStart - x0)).toFixed(1)}" ` +
      `x2="${xToPx(tanEnd).toFixed(1)}" y2="${yToPx(fValue + slope * (tanEnd - x0)).toFixed(1)}" class="fig-good"></line>`;

    const fMarker = `<circle cx="${xToPx(x0).toFixed(1)}" cy="${yToPx(fHeight).toFixed(1)}" r="4" class="fig-warn"></circle>`;
    const fMarker2 = `<circle cx="${xToPx(x0).toFixed(1)}" cy="${yToPx(fValue).toFixed(1)}" r="4" class="fig-ink"></circle>`;

    svg.innerHTML = grid() + axes + line + parabola + tangent + fMarker + fMarker2;

    const direction = slope > 0 ? "rising" : slope < 0 ? "falling" : "flat";
    readout.textContent =
      `The orange line is f of x equals 2x, the height of the gradient. ` +
      `The curve is the family F of x equals x squared plus C. ` +
      `At x = ${x0.toFixed(1)}, F is ${fValue.toFixed(1)} and the tangent is ${direction}. ` +
      `Its gradient equals the height of f, which is ${fHeight.toFixed(1)}. ` +
      `Changing C moves the curve up or down and leaves every gradient the same.`;

    svg.setAttribute(
      "aria-label",
      `A line for f of x equals 2x and a parabola for F of x equals x squared plus ${c}. ` +
        `At x equals ${x0.toFixed(1)}, the tangent to F has gradient ${fHeight.toFixed(1)}, equal to the height of f.`
    );
  }

  react([cInput, xInput], update);
}
