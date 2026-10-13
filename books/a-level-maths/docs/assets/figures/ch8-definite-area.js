// Guided investigation for a definite integral as an area.
// The shaded region under y = 4 - x^2 between two movable limits, with the
// exact area read from an antiderivative.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const X_MIN = -2.2;
const X_MAX = 2.2;
const Y_MIN = -0.5;
const Y_MAX = 4.5;
const PLOT_W = 360;
const PLOT_H = 250;
const ORIGIN_X = 40;
const ORIGIN_Y = 280;

function xToPx(x) {
  return ORIGIN_X + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}

function yToPx(y) {
  return ORIGIN_Y - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
}

function heightAt(x) {
  return 4 - x * x;
}

function antiderivative(x) {
  return 4 * x - (x * x * x) / 3;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "The curve y equals four minus x squared with a shaded region between two " +
      "movable limits",
    width: 420,
    height: 300,
  });

  const aInput = slider(el, { show: false,
    id: "a",
    label: "Lower limit a",
    min: -2,
    max: 2,
    step: 0.1,
    value: 0,
  });
  const bInput = slider(el, { show: false,
    id: "b",
    label: "Upper limit b",
    min: -2,
    max: 2,
    step: 0.1,
    value: 2,
  });

  function grid() {
    let lines = "";
    for (let x = -2; x <= 2; x += 1) {
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

  function curvePoints() {
    const points = [];
    for (let x = X_MIN + 0.02; x <= X_MAX; x += 0.04) {
      points.push(`${xToPx(x).toFixed(1)},${yToPx(heightAt(x)).toFixed(1)}`);
    }
    return points.join(" ");
  }

  function update() {
    const a = Number(aInput.value);
    const b = Number(bInput.value);
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);

    const area = antiderivative(hi) - antiderivative(lo);

    const shade = [];
    shade.push(`${xToPx(lo).toFixed(1)},${yToPx(0).toFixed(1)}`);
    for (let x = lo; x <= hi + 1e-9; x += 0.04) {
      shade.push(`${xToPx(x).toFixed(1)},${yToPx(heightAt(x)).toFixed(1)}`);
    }
    shade.push(`${xToPx(hi).toFixed(1)},${yToPx(0).toFixed(1)}`);

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    const band =
      `<polygon points="${shade.join(" ")}" class="fig-accent" fill-opacity="0.2"></polygon>`;

    const curve = `<polyline points="${curvePoints()}" class="fig-line"></polyline>`;

    const limits =
      `<line x1="${xToPx(lo).toFixed(1)}" y1="${yToPx(0)}" x2="${xToPx(lo).toFixed(1)}" y2="${yToPx(heightAt(lo)).toFixed(1)}" class="fig-grid"></line>` +
      `<line x1="${xToPx(hi).toFixed(1)}" y1="${yToPx(0)}" x2="${xToPx(hi).toFixed(1)}" y2="${yToPx(heightAt(hi)).toFixed(1)}" class="fig-grid"></line>`;

    svg.innerHTML = grid() + band + axes + curve + limits;

    readout.textContent =
      `The shaded region runs from x = ${lo.toFixed(1)} to x = ${hi.toFixed(1)}. ` +
      `The area under the curve y = 4 minus x squared is ${area.toFixed(3)} square units. ` +
      `The height of the curve is largest near x = 0, so the area grows fastest there.`;

    svg.setAttribute(
      "aria-label",
      `The curve y equals four minus x squared with the region between x equals ${lo.toFixed(1)} and x equals ${hi.toFixed(1)} shaded. The area is ${area.toFixed(3)}.`
    );
  }

  react([aInput, bInput], update);
}
