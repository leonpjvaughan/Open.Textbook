// Guided investigation for the proof that the discriminant decides how many real
// roots a quadratic has.
//
// The graph and the completed square say the same thing. The completed square puts
// the vertex at height -discriminant/(4a), and the number of times the parabola
// meets the x-axis is whether the vertex sits below the axis, on it, or above it.
// The reader moves b and c and watches the crossings appear and disappear, so the
// sign of the discriminant is a picture rather than a memorised table.
//
// Predict -> Test -> Explain: the page asks for the value of c that gives exactly
// one root before the sliders are touched. The readout is `aria-live`, because a
// reader who cannot see the drawing must still be told the count and the value of
// the discriminant.
//
// No colour is written here: the drawing uses fig-* classes and the labels use
// text-* classes, so the figure adapts to every bundle and both schemes.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label:
      "A parabola on axes, with the points where it crosses the x-axis marked for the current values of b and c",
    width: 360,
    height: 320,
    max: 520,
  });

  const bInput = slider(el, { show: true,
    id: "b",
    label: "b:",
    name: "Coefficient of x",
    min: -6,
    max: 6,
    step: 1,
    value: -2,
  });
  const cInput = slider(el, { show: true,
    id: "c",
    label: "c:",
    name: "Constant term",
    min: -6,
    max: 6,
    step: 1,
    value: -3,
  });

  const LEFT = 30;
  const TOP = 20;
  const WIDTH = 300;
  const HEIGHT = 270;
  const XMIN = -6;
  // The vertex sits at y = c - b^2/4, which reaches -6 - 36/4 = -15, so the
  // window opens far enough down for the marker to stay on the drawing.
  const YMIN = -17;
  const YMAX = 20;
  const SX = WIDTH / 12; // x runs from -6 to 6
  const SY = HEIGHT / (YMAX - YMIN);
  const X0 = LEFT + (0 - XMIN) * SX;
  const Y0 = TOP + (YMAX - 0) * SY;

  const sx = (x) => LEFT + (x - XMIN) * SX;
  const sy = (y) => TOP + (YMAX - y) * SY;

  const round = (n) => (Math.abs(n - Math.round(n)) < 1e-9 ? String(Math.round(n)) : n.toFixed(2));

  function draw() {
    const b = Number(bInput.value);
    const c = Number(cInput.value);

    const delta = b * b - 4 * c;

    // The parabola, clipped to the window so it never draws outside the axes.
    let path = "";
    for (let x = XMIN; x <= 6.0001; x += 0.25) {
      const y = Math.max(YMIN, Math.min(YMAX, x * x + b * x + c));
      const command = path ? "L" : "M";
      path += `${command} ${sx(x).toFixed(1)} ${sy(y).toFixed(1)} `;
    }

    // Roots: two when the discriminant is positive, one when it is zero. A
    // negative discriminant gives no real root, so nothing is drawn on the axis.
    let roots = "";
    if (delta > 0) {
      const r1 = (-b + Math.sqrt(delta)) / 2;
      const r2 = (-b - Math.sqrt(delta)) / 2;
      for (const r of [r1, r2]) {
        if (r >= XMIN && r <= 6) {
          roots +=
            `<circle cx="${sx(r).toFixed(1)}" cy="${Y0.toFixed(1)}" r="5" ` +
            `class="fig-good"></circle>`;
        }
      }
    } else if (delta === 0) {
      const r = -b / 2;
      if (r >= XMIN && r <= 6) {
        roots +=
          `<circle cx="${sx(r).toFixed(1)}" cy="${Y0.toFixed(1)}" r="5" ` +
          `class="fig-warn"></circle>`;
      }
    }

    const vx = -b / 2;
    const vy = c - (b * b) / 4;
    const vertex = `<circle cx="${sx(vx).toFixed(1)}" cy="${sy(vy).toFixed(1)}" ` +
      `r="4" class="fig-accent"></circle>`;

    svg.innerHTML =
      `<line x1="${LEFT}" y1="${Y0.toFixed(1)}" x2="${(LEFT + WIDTH).toFixed(1)}" ` +
      `y2="${Y0.toFixed(1)}" class="fig-grid" stroke-width="1.5"></line>` +
      `<line x1="${X0.toFixed(1)}" y1="${TOP}" x2="${X0.toFixed(1)}" ` +
      `y2="${(TOP + HEIGHT).toFixed(1)}" class="fig-grid" stroke-width="1.5"></line>` +
      `<path d="${path}" fill="none" stroke-width="2.5" class="fig-line"></path>` +
      vertex +
      roots;

    let count;
    if (delta > 0) {
      count = "two distinct real roots";
    } else if (delta === 0) {
      count = "one repeated real root";
    } else {
      count = "no real roots";
    }

    readout.textContent =
      `b = ${b} and c = ${c}, so the discriminant is b² - 4c = ${b * b} - ` +
      `${4 * c} = ${delta}. The vertex is at (${round(vx)}, ${round(vy)}), and its ` +
      `height is -discriminant/(4a) = ${round(vy)}. The discriminant is ` +
      `${delta > 0 ? "positive" : delta === 0 ? "zero" : "negative"}, so the ` +
      `parabola meets the x-axis ${delta > 0 ? "twice" : delta === 0 ? "once" : "nowhere"} ` +
      `and the equation has ${count}.`;

    // Every number the sentence prints is declared, including the two it prints before
    // the subtraction it is named after: `b² - 4c = 9 - (-12) = 21` is three claims, and
    // a wrong middle one is a wrong sentence even when the discriminant is right.
    claim([
      { label: "b squared", expression: "b ** 2", values: { b }, answer: b * b, shown: String(b * b) },
      { label: "4c", expression: "4 * c", values: { c }, answer: 4 * c, shown: String(4 * c) },
      {
        label: "discriminant",
        expression: "b ** 2 - 4 * c",
        values: { b, c },
        answer: delta,
        shown: String(delta),
      },
      {
        label: "vertex height from the discriminant",
        expression: "-delta / 4",
        values: { delta },
        answer: vy,
        shown: round(vy),
      },
      { label: "vertex x", expression: "-b / 2", values: { b }, answer: vx, shown: round(vx) },
      {
        label: "vertex height",
        expression: "c - b ** 2 / 4",
        values: { b, c },
        answer: vy,
        shown: round(vy),
      },
    ]);
  }

  react([bInput, cInput], draw);
}
