// The Argand diagram, with its named parts explored one at a time.
//
// Section 5.4 names the parts in prose — the real axis, the imaginary axis, the modulus
// and the conjugate — and a reader who skims them can repeat the four words without
// being able to point at any of them. The modulus is defined as "the distance from the
// origin", which is a fact about the picture, so the picture is where the words belong.
//
// Each part is a button under the drawing and the drawing follows the focus, which is
// `diagram()`'s contract. The two sliders still set z, and the parts are redrawn from
// the current z through the `groups` the kit returns, so the drawing and the readout
// cannot disagree. At rest — before any part is focused — the drawing is the one the
// page always had.
//
// Nothing here carries a colour. z is drawn in the accent class and its conjugate in the
// warning class, and the conjugate is additionally marked with a dashed drop line, so the
// two are told apart without relying on colour.
import { SIZE, diagram, label, react, slider } from "./kit.js";

// The drawing area, in SVG units. The origin sits in the middle.
const ORIGIN = { x: 280, y: 186 };
const UNIT = 38; // SVG units per complex unit
const RANGE = 6; // the sliders' range, in both parts

const px = (re) => ORIGIN.x + re * UNIT;
const py = (im) => ORIGIN.y - im * UNIT;

export function mount(el) {
  // The point z is the only state; every part is drawn from it.
  const state = { re: 3, im: 4 };

  function grid() {
    let out = "";
    // Only the lines the frame can show. `RANGE` is the sliders' range, not the canvas:
    // at ±6 units from an origin at y = 186 the extreme lines landed at y = −42 and 414
    // in a 360-unit drawing, so two of the thirteen were drawn where nothing is.
    for (let k = -RANGE; k <= RANGE; k += 1) {
      if (k === 0) continue;
      const x = px(k);
      const y = py(k);
      if (x >= 8 && x <= 552) {
        out += `<line x1="${x}" y1="14" x2="${x}" y2="352" class="fig-grid" stroke-width="0.7"></line>`;
      }
      if (y >= 14 && y <= 352) {
        out += `<line x1="8" y1="${y}" x2="552" y2="${y}" class="fig-grid" stroke-width="0.7"></line>`;
      }
    }
    return out;
  }

  function origin() {
    return `<circle cx="${ORIGIN.x}" cy="${ORIGIN.y}" r="3.5" class="fig-ink"></circle>`;
  }

  function realAxis() {
    return (
      grid() +
      `<line x1="8" y1="${ORIGIN.y}" x2="552" y2="${ORIGIN.y}" class="fig-ink" stroke-width="1.6"></line>` +
      label({ x: 540, y: ORIGIN.y - 10, text: "real", size: SIZE.value, class: "text-ink", anchor: "end" })
    );
  }

  function imaginaryAxis() {
    return (
      `<line x1="${ORIGIN.x}" y1="8" x2="${ORIGIN.x}" y2="352" class="fig-ink" stroke-width="1.6"></line>` +
      label({ x: ORIGIN.x + 12, y: 22, text: "imaginary", size: SIZE.value, class: "text-ink", anchor: "start" })
    );
  }

  function pointZ() {
    const zx = px(state.re);
    const zy = py(state.im);
    return (
      `<line x1="${zx}" y1="${zy}" x2="${zx}" y2="${ORIGIN.y}" class="fig-grid" stroke-width="1.2" stroke-dasharray="4 3"></line>` +
      `<circle cx="${zx}" cy="${zy}" r="9" class="fig-accent"></circle>` +
      label({ x: zx + 14, y: zy - 12, text: "z", size: SIZE.value, class: "text-accent", anchor: "start", weight: "bold" })
    );
  }

  function conjugate() {
    const cx = px(state.re);
    const cy = py(-state.im);
    const zx = px(state.re);
    const zy = py(state.im);
    // The reflection: a vertical line joining z and its conjugate, through the real
    // axis. It is absent when z is already on the axis, because the two points coincide.
    const mirror =
      state.im === 0
        ? ""
        : `<line x1="${zx}" y1="${zy}" x2="${cx}" y2="${cy}" class="fig-warn" stroke-width="1.4" stroke-dasharray="2 3"></line>`;
    return (
      mirror +
      `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${ORIGIN.y}" class="fig-grid" stroke-width="1.2" stroke-dasharray="4 3"></line>` +
      `<circle cx="${cx}" cy="${cy}" r="8" class="fig-warn"></circle>` +
      // The label goes above the point when the point is in the lower half of the
      // drawing: below it, a conjugate at im = 4 sat on y = 360 and the `canvas` check
      // measured it four units outside the frame.
      label({ x: cx + 14, y: cy > ORIGIN.y ? cy - 12 : cy + 22, text: "z\u0304", size: SIZE.value, class: "text-warn", anchor: "start", weight: "bold" })
    );
  }

  function modulus() {
    const zx = px(state.re);
    const zy = py(state.im);
    return (
      `<line x1="${ORIGIN.x}" y1="${ORIGIN.y}" x2="${zx}" y2="${zy}" class="fig-accent" stroke-width="2.4"></line>` +
      label({ x: (ORIGIN.x + zx) / 2, y: (ORIGIN.y + zy) / 2 - 8, text: "|z|", size: SIZE.value, class: "text-accent" })
    );
  }

  const parts = [
    {
      name: "Origin",
      description: "The point where the two axes meet, written (0, 0).",
      draw: origin,
    },
    {
      name: "Real axis",
      description: "The horizontal axis. The real part of a complex number is plotted along it.",
      draw: realAxis,
    },
    {
      name: "Imaginary axis",
      description: "The vertical axis. The imaginary part of a complex number is plotted along it.",
      draw: imaginaryAxis,
    },
    {
      name: "Point z",
      description:
        "The complex number z = a + bi, plotted at (a, b). Its real part is the distance across, and its imaginary part the distance up.",
      draw: pointZ,
    },
    {
      name: "Conjugate",
      description:
        "The conjugate z\u0304 = a \u2212 bi. It is the reflection of z in the real axis, so it has the same real part and the opposite imaginary part.",
      draw: conjugate,
    },
    {
      name: "Modulus",
      description:
        "The distance from the origin to z, written |z|. It is the hypotenuse of the right-angled triangle with sides a and b.",
      draw: modulus,
    },
  ];

  const { groups, readout } = diagram(el, {
    label:
      "An Argand diagram showing a complex number, its conjugate, and the modulus as a distance from the origin",
    description:
      "An Argand diagram, a plane with the real part on the horizontal axis and the " +
      "imaginary part on the vertical axis. The complex number z is plotted as a point, " +
      "and its conjugate is its reflection in the real axis. The modulus |z| is the " +
      "distance from the origin to z.",
    width: 560,
    height: 360,
    parts,
  });

  const reInput = slider(el, {
    show: true,
    id: "real",
    label: "Real part",
    min: -RANGE,
    max: RANGE,
    step: 0.5,
    value: 3,
  });

  const imInput = slider(el, {
    show: true,
    id: "imaginary",
    label: "Imaginary part",
    min: -RANGE,
    max: RANGE,
    step: 0.5,
    value: 4,
  });

  function redraw() {
    state.re = Number(reInput.value);
    state.im = Number(imInput.value);
    parts.forEach((part, index) => {
      groups[index].innerHTML = part.draw();
    });

    const modulus = Math.hypot(state.re, state.im);
    const sign = (v) => (v < 0 ? " - " : " + ") + Math.abs(v).toFixed(1);
    readout.textContent =
      `z = ${state.re.toFixed(1)}${sign(state.im)}i, and z\u0304 = ${state.re.toFixed(1)}${sign(-state.im)}i. ` +
      `|z| = ${modulus.toFixed(3)}. ` +
      (state.im === 0
        ? "The imaginary part is zero, so z lies on the real axis and z\u0304 is the same point: |z| is just the distance from the origin along the real axis."
        : `The conjugate is the reflection of z in the real axis, and the modulus |z| = \u221a(${state.re.toFixed(1)}\u00b2 + ${state.im.toFixed(1)}\u00b2) = ${modulus.toFixed(3)} is the distance from the origin.`);
  }

  react([reInput, imInput], redraw);
}
