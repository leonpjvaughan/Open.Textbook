// Guided investigation for transformations of graphs: y = a f(k(x - h)) + v
// with f(x) = x^2. Pure HTML and SVG, an ES module, no framework and no colour
// of its own: the fig-* classes carry the theme. Runtime text is plain text.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const X_MIN = -8;
const X_MAX = 8;
const Y_MIN = -10;
const Y_MAX = 26;

function xToPx(x) {
  return 180 + (x * 180) / 8;
}

function yToPx(y) {
  return 20 + ((Y_MAX - y) * 200) / (Y_MAX - Y_MIN);
}

function signed(value) {
  return value < 0 ? `- ${Math.abs(value)}` : `+ ${value}`;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A transformed parabola",
    width: 360,
    height: 240,
    max: 520,
  });

  const aInput = slider(el, {
    id: "a",
    label: "Vertical stretch a",
    min: 0.5,
    max: 3,
    step: 0.5,
    value: 1,
    show: false,
  });
  const kInput = slider(el, {
    id: "k",
    label: "Horizontal scale k",
    min: 0.5,
    max: 2,
    step: 0.5,
    value: 1,
    show: false,
  });
  const hInput = slider(el, {
    id: "h",
    label: "Horizontal shift h",
    min: -4,
    max: 4,
    step: 1,
    value: 0,
    show: false,
  });
  const vInput = slider(el, {
    id: "v",
    label: "Vertical shift v",
    min: -5,
    max: 5,
    step: 1,
    value: 0,
    show: false,
  });

  function update() {
    const a = Number(aInput.value);
    const k = Number(kInput.value);
    const h = Number(hInput.value);
    const v = Number(vInput.value);

    const segments = [];
    let points = [];
    for (let x = X_MIN; x <= X_MAX + 0.001; x += 0.2) {
      const y = a * (k * (x - h)) ** 2 + v;
      if (y < Y_MIN || y > Y_MAX) {
        if (points.length > 1) segments.push(points);
        points = [];
      } else {
        points.push(`${xToPx(x).toFixed(1)},${yToPx(y).toFixed(1)}`);
      }
    }
    if (points.length > 1) segments.push(points);
    const path = segments.map((seg) => `M ${seg.join(" L ")}`).join(" ");

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    svg.innerHTML =
      axes +
      `<path d="${path}" fill="none" class="fig-accent" stroke-width="2"></path>` +
      `<circle cx="${xToPx(h).toFixed(1)}" cy="${yToPx(v).toFixed(1)}" r="4" class="fig-accent"></circle>`;

    const inside = k === 1 ? `(x ${signed(-h)})` : `${k}(x ${signed(-h)})`;
    readout.textContent =
      `y = ${a} times [${inside}]^2 ${signed(v)}. ` +
      `Vertex at (${h}, ${v}). ` +
      (k === 1
        ? "No horizontal scale."
        : `The horizontal scale k = ${k} is ${k > 1 ? "a squeeze" : "a stretch"}.`);

    svg.setAttribute(
      "aria-label",
      `The parabola y equals ${a} times the square of ${inside}, plus ${v}. ` +
        `Its vertex is at (${h}, ${v}).`
    );
  }

  react([aInput, kInput, hInput, vInput], update);
}
