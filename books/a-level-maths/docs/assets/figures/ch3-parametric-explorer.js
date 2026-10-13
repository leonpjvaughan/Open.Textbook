// Guided investigation for parametric equations and eliminating the parameter.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the chooser and slider,
// the live readout and the redraw — comes from `kit.js`.
import { panel, slider, chooser, react } from "./kit.js";

const VIEW = 10; // both axes run from -VIEW to VIEW
const SCALE = 18; // pixels per unit
const SIZE = VIEW * 2 * SCALE;

const CURVES = {
  parabola: {
    fx: (t) => 2 * t,
    fy: (t) => t * t,
    tMin: -3,
    tMax: 3,
    cartesian: "y = x^2 / 4",
  },
  line: {
    fx: (t) => 2 + t,
    fy: (t) => 5 - 3 * t,
    tMin: -1,
    tMax: 3,
    cartesian: "y = 11 - 3x",
  },
  circle: {
    fx: (t) => 5 * Math.cos(t),
    fy: (t) => 5 * Math.sin(t),
    tMin: 0,
    tMax: 2 * Math.PI,
    cartesian: "x^2 + y^2 = 25",
  },
};

function xToPx(x) {
  return (x + VIEW) * SCALE;
}

function yToPx(y) {
  return SIZE - (y + VIEW) * SCALE;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A parametric curve with a point at the current value of the parameter",
    width: SIZE,
    height: SIZE,
    max: 520,
  });

  const curveInput = chooser(el, {
    id: "curve",
    label: "Curve",
    choices: [
      { value: "parabola", label: "x = 2t, y = t^2" },
      { value: "line", label: "x = 2 + t, y = 5 - 3t" },
      { value: "circle", label: "x = 5 cos t, y = 5 sin t" },
    ],
  });
  const tInput = slider(el, {
    id: "t",
    label: "Parameter t",
    min: -3,
    max: 3,
    step: 0.05,
    value: 1,
    show: false,
  });

  function grid() {
    let lines = "";
    for (let x = -VIEW; x <= VIEW; x += 2) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(-VIEW)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(VIEW)}" class="fig-grid"></line>`;
    }
    for (let y = -VIEW; y <= VIEW; y += 2) {
      lines +=
        `<line x1="${xToPx(-VIEW)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(VIEW)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function path(curve) {
    let points = "";
    const steps = 240;
    for (let i = 0; i <= steps; i += 1) {
      const t = curve.tMin + ((curve.tMax - curve.tMin) * i) / steps;
      const x = xToPx(curve.fx(t)).toFixed(1);
      const y = yToPx(curve.fy(t)).toFixed(1);
      points += `${i === 0 ? "M" : "L"} ${x} ${y} `;
    }
    return `<path d="${points}" fill="none" class="fig-accent" stroke-width="2"></path>`;
  }

  function applyCurveRange() {
    const curve = CURVES[curveInput.value];
    tInput.min = String(curve.tMin);
    tInput.max = String(curve.tMax);
    tInput.step = "0.05";
    const mid = (curve.tMin + curve.tMax) / 2;
    tInput.value = String(Math.round(mid * 100) / 100);
  }

  function update() {
    const curve = CURVES[curveInput.value];
    const t = Number(tInput.value);
    const x = curve.fx(t);
    const y = curve.fy(t);

    const axes =
      `<line x1="${xToPx(-VIEW)}" y1="${yToPx(0)}" x2="${xToPx(VIEW)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(-VIEW)}" x2="${xToPx(0)}" y2="${yToPx(VIEW)}" class="fig-ink"></line>`;

    const marker =
      `<circle cx="${xToPx(x).toFixed(1)}" cy="${yToPx(y).toFixed(1)}" r="5" class="fig-warn"></circle>`;

    svg.innerHTML = grid() + axes + path(curve) + marker;

    readout.textContent =
      `t = ${t.toFixed(2)}. The point is (${x.toFixed(2)}, ${y.toFixed(2)}). ` +
      `Eliminating the parameter gives ${curve.cartesian}.`;

    svg.setAttribute(
      "aria-label",
      `The parametric curve ${curve.cartesian.replace("=", " equals ")}, ` +
        `with the point at t equals ${t.toFixed(2)}, which is (${x.toFixed(2)}, ${y.toFixed(2)}).`
    );
  }

  // The parameter range follows the chosen curve before the drawing is redrawn.
  curveInput.addEventListener("change", () => {
    applyCurveRange();
    update();
  });

  applyCurveRange();
  react(tInput, update);
}
