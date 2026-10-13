// Guided investigation for the circle, its equation, and a chord.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const X_MIN = -4;
const X_MAX = 16;
const Y_MIN = -4;
const Y_MAX = 16;
const SCALE = 18; // pixels per unit; both axes share it, so circles stay round
const LINE_C = 19; // the fixed line x + y = 19

function xToPx(x) {
  return (x - X_MIN) * SCALE;
}

function yToPx(y) {
  return 360 - (y - Y_MIN) * SCALE;
}

function fixed(value, places) {
  return value.toFixed(places ?? 2);
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A circle with its centre and radius, and the line x plus y equals 19",
    width: 360,
    height: 360,
    max: 520,
  });

  const aInput = slider(el, {
    id: "a",
    label: "Centre x: a",
    min: 0,
    max: 12,
    step: 1,
    value: 6,
    show: false,
  });
  const bInput = slider(el, {
    id: "b",
    label: "Centre y: b",
    min: 0,
    max: 14,
    step: 1,
    value: 8,
    show: false,
  });
  const rInput = slider(el, {
    id: "r",
    label: "Radius r",
    min: 1,
    max: 8,
    step: 1,
    value: 5,
    show: false,
  });

  function grid() {
    let lines = "";
    for (let x = X_MIN; x <= X_MAX; x += 2) {
      lines +=
        `<line x1="${xToPx(x).toFixed(1)}" y1="${yToPx(Y_MIN)}" ` +
        `x2="${xToPx(x).toFixed(1)}" y2="${yToPx(Y_MAX)}" class="fig-grid"></line>`;
    }
    for (let y = Y_MIN; y <= Y_MAX; y += 2) {
      lines +=
        `<line x1="${xToPx(X_MIN)}" y1="${yToPx(y).toFixed(1)}" ` +
        `x2="${xToPx(X_MAX)}" y2="${yToPx(y).toFixed(1)}" class="fig-grid"></line>`;
    }
    return lines;
  }

  function update() {
    const a = Number(aInput.value);
    const b = Number(bInput.value);
    const r = Number(rInput.value);

    const axes =
      `<line x1="${xToPx(X_MIN)}" y1="${yToPx(0)}" x2="${xToPx(X_MAX)}" y2="${yToPx(0)}" class="fig-ink"></line>` +
      `<line x1="${xToPx(0)}" y1="${yToPx(Y_MIN)}" x2="${xToPx(0)}" y2="${yToPx(Y_MAX)}" class="fig-ink"></line>`;

    const circle =
      `<circle cx="${xToPx(a).toFixed(1)}" cy="${yToPx(b).toFixed(1)}" r="${(r * SCALE).toFixed(1)}" ` +
      `fill="none" class="fig-accent" stroke-width="2"></circle>` +
      `<circle cx="${xToPx(a).toFixed(1)}" cy="${yToPx(b).toFixed(1)}" r="3" class="fig-accent"></circle>`;

    // The fixed line x + y = 19, clipped to the view.
    const line =
      `<line x1="${xToPx(LINE_C - Y_MAX)}" y1="${yToPx(Y_MAX)}" ` +
      `x2="${xToPx(LINE_C - Y_MIN)}" y2="${yToPx(Y_MIN)}" class="fig-warn" stroke-width="2"></line>`;

    // Signed distance from the centre to the line x + y - 19 = 0.
    const signedD = (a + b - LINE_C) / Math.SQRT2;
    const distance = Math.abs(signedD);
    // The foot of the perpendicular, and the unit vector along the line.
    const footX = a - signedD / Math.SQRT2;
    const footY = b - signedD / Math.SQRT2;

    let chord = "";
    let detail = "";
    if (distance < r - 1e-9) {
      const half = Math.sqrt(r * r - distance * distance);
      const tX = 1 / Math.SQRT2;
      const tY = -1 / Math.SQRT2;
      const p1x = footX + half * tX;
      const p1y = footY + half * tY;
      const p2x = footX - half * tX;
      const p2y = footY - half * tY;
      chord =
        `<line x1="${xToPx(p1x).toFixed(1)}" y1="${yToPx(p1y).toFixed(1)}" ` +
        `x2="${xToPx(p2x).toFixed(1)}" y2="${yToPx(p2y).toFixed(1)}" class="fig-line"></line>` +
        `<line x1="${xToPx(a).toFixed(1)}" y1="${yToPx(b).toFixed(1)}" ` +
        `x2="${xToPx(footX).toFixed(1)}" y2="${yToPx(footY).toFixed(1)}" class="fig-grid"></line>` +
        `<circle cx="${xToPx(footX).toFixed(1)}" cy="${yToPx(footY).toFixed(1)}" r="3" class="fig-good"></circle>`;
      detail =
        `The line cuts the circle at two points. Its midpoint is ` +
        `(${fixed(footX, 1)}, ${fixed(footY, 1)}), and each half of the chord is ` +
        `${fixed(half)} units long. The perpendicular from the centre meets the chord at that midpoint.`;
    } else if (Math.abs(distance - r) < 1e-9) {
      chord =
        `<circle cx="${xToPx(footX).toFixed(1)}" cy="${yToPx(footY).toFixed(1)}" r="3" class="fig-good"></circle>`;
      detail = "The line just touches the circle, so it is a tangent. The distance from the centre equals the radius.";
    } else {
      detail = "The line misses the circle, because the distance from the centre is greater than the radius.";
    }

    svg.innerHTML = grid() + axes + line + circle + chord;

    readout.textContent =
      `Centre (${a}, ${b}), radius ${r}, so (x - ${a})^2 + (y - ${b})^2 = ${r * r}. ` +
      `The distance from the centre to x + y = 19 is ${fixed(distance)}. ` +
      detail;

    svg.setAttribute(
      "aria-label",
      `A circle with centre (${a}, ${b}) and radius ${r}, and the line x plus y equals 19. ` +
        `The distance from the centre to the line is ${fixed(distance)}. ${detail}`
    );
  }

  react([aInput, bInput, rInput], update);
}
