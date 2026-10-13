// Guided investigation for stationary points, the gradient and the second
// derivative. Pure HTML and SVG, an ES module, no framework and no colour of
// its own: the fig-* classes carry the theme. Runtime text is plain text.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const X_MIN = -1;
const X_MAX = 3;
const Y_MIN = -3;
const Y_MAX = 3;
const SX = 80;
const SY = 40;
const CX = 40;
const CY = 150;

function f(x) {
  return x * x * x - 3 * x * x + 2;
}

function df(x) {
  return 3 * x * x - 6 * x;
}

function ddf(x) {
  return 6 * x - 6;
}

function xToPx(x) {
  return CX + (x - X_MIN) * SX;
}

function yToPx(y) {
  return CY - y * SY;
}

function curvePoints() {
  const points = [];
  for (let x = X_MIN; x <= X_MAX + 1e-9; x += 0.04) {
    points.push(`${xToPx(x).toFixed(1)},${yToPx(f(x)).toFixed(1)}`);
  }
  return points.join(" ");
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A cubic curve with a movable point, showing its value, gradient and " +
      "second derivative",
    width: 400,
    height: 300,
    max: 520,
  });

  const aInput = slider(el, { show: false,
    id: "a",
    label: "Point x",
    min: -1,
    max: 3,
    step: 0.05,
    value: 0.5,
  });

  function axes() {
    return (
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`
    );
  }

  function grid() {
    let lines = "";
    for (let x = X_MIN; x <= X_MAX; x += 0.5) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(Y_MIN)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(Y_MAX)}" class="fig-grid"></line>`;
    }
    for (let y = Y_MIN; y <= Y_MAX; y += 0.5) {
      lines +=
        `<line x1="${xToPx(X_MIN)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const a = Number(aInput.value);
    const y = f(a);
    const m = df(a);
    const second = ddf(a);

    const x1 = Math.max(X_MIN, a - 0.6);
    const x2 = Math.min(X_MAX, a + 0.6);
    const tangent =
      `<line x1="${xToPx(x1).toFixed(1)}" y1="${yToPx(y + m * (x1 - a)).toFixed(1)}" ` +
      `x2="${xToPx(x2).toFixed(1)}" y2="${yToPx(y + m * (x2 - a)).toFixed(1)}" class="fig-accent"></line>`;

    const turning =
      `<circle cx="${xToPx(0).toFixed(1)}" cy="${yToPx(f(0)).toFixed(1)}" r="5" class="fig-good"></circle>` +
      `<circle cx="${xToPx(2).toFixed(1)}" cy="${yToPx(f(2)).toFixed(1)}" r="5" class="fig-good"></circle>`;

    const curve = `<polyline points="${curvePoints()}" class="fig-line"></polyline>`;
    const marker = `<circle cx="${xToPx(a).toFixed(1)}" cy="${yToPx(y).toFixed(1)}" r="4" class="fig-ink"></circle>`;

    svg.innerHTML = grid() + axes() + curve + tangent + turning + marker;

    let move;
    if (Math.abs(m) < 0.02) {
      move = "the curve is flat here, so this is a stationary point";
    } else if (m > 0) {
      move = "the curve is rising here";
    } else {
      move = "the curve is falling here";
    }

    let bend;
    if (second > 0.02) {
      bend = "the second derivative is positive, so the curve is convex";
    } else if (second < -0.02) {
      bend = "the second derivative is negative, so the curve is concave";
    } else {
      bend = "the second derivative is zero here";
    }

    readout.textContent =
      `At x = ${a.toFixed(2)}, the value is ${y.toFixed(3)}. ` +
      `The gradient is ${m.toFixed(3)}, so ${move}. ` +
      `The second derivative is ${second.toFixed(3)}, so ${bend}.`;

    svg.setAttribute(
      "aria-label",
      `A cubic curve. At x equals ${a.toFixed(2)} the gradient is ` +
        `${m.toFixed(3)} and the second derivative is ${second.toFixed(3)}.`
    );
  }

  react(aInput, update);
}
