// Tier-1 guided investigation: the Argand diagram.
//
// The page asks the reader to predict where the conjugate of z lies, then to move z and
// check, then to set the imaginary part to zero and say what happens to the modulus. So
// the figure has to draw z and its conjugate together, show the reflection, and read the
// modulus off the picture as a distance from the origin.
//
// Nothing here carries a colour. z is drawn in the accent class and its conjugate in the
// warning class, and the conjugate is additionally marked with a dashed drop line, so the
// two are told apart without relying on colour.
//
// The scaffolding — the panel, its accessible name, the sliders, the readout and the
// redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, fmt, label, panel, react, slider } from "./kit.js";

// The drawing area, in SVG units. The origin sits in the middle.
const ORIGIN = { x: 280, y: 186 };
const UNIT = 38; // SVG units per complex unit
const RANGE = 6; // the sliders' range, in both parts

const px = (re) => ORIGIN.x + re * UNIT;
const py = (im) => ORIGIN.y - im * UNIT;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "An Argand diagram showing a complex number, its conjugate, and the modulus as a distance from the origin",
    width: 560,
    height: 360,
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

  function update() {
    const re = Number(reInput.value);
    const im = Number(imInput.value);
    const modulus = Math.hypot(re, im);

    // Axes and grid, drawn fresh each time so the figure stays one self-contained SVG.
    let axes = "";
    for (let k = -RANGE; k <= RANGE; k += 1) {
      if (k === 0) continue;
      axes += `<line x1="${px(k)}" y1="14" x2="${px(k)}" y2="352" class="fig-grid" stroke-width="0.7"></line>`;
      axes += `<line x1="8" y1="${py(k)}" x2="552" y2="${py(k)}" class="fig-grid" stroke-width="0.7"></line>`;
    }
    axes += `<line x1="8" y1="${ORIGIN.y}" x2="552" y2="${ORIGIN.y}" class="fig-ink" stroke-width="1.6"></line>`;
    axes += `<line x1="${ORIGIN.x}" y1="8" x2="${ORIGIN.x}" y2="352" class="fig-ink" stroke-width="1.6"></line>`;
    axes += label({ x: 540, y: ORIGIN.y - 10, text: "real", size: SIZE.value, class: "text-ink", anchor: "end" });
    axes += label({ x: ORIGIN.x + 12, y: 22, text: "imaginary", size: SIZE.value, class: "text-ink", anchor: "start" });

    // The point z, its conjugate, and the right angle that joins them to the origin.
    const zx = px(re);
    const zy = py(im);
    const cx = px(re);
    const cy = py(-im);

    // The two dashed drop lines: from each point to the real axis.
    const drops =
      `<line x1="${zx}" y1="${zy}" x2="${zx}" y2="${ORIGIN.y}" class="fig-grid" stroke-width="1.2" stroke-dasharray="4 3"></line>` +
      `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${ORIGIN.y}" class="fig-grid" stroke-width="1.2" stroke-dasharray="4 3"></line>`;

    // The reflection: a vertical line joining z and its conjugate, through the real axis.
    const mirror =
      im === 0
        ? ""
        : `<line x1="${zx}" y1="${zy}" x2="${cx}" y2="${cy}" class="fig-warn" stroke-width="1.4" stroke-dasharray="2 3"></line>`;

    // The modulus as a radius from the origin to z.
    const radius = `<line x1="${ORIGIN.x}" y1="${ORIGIN.y}" x2="${zx}" y2="${zy}" class="fig-accent" stroke-width="2.4"></line>`;

    const points =
      `<circle cx="${zx}" cy="${zy}" r="9" class="fig-accent"></circle>` +
      `<circle cx="${cx}" cy="${cy}" r="8" class="fig-warn"></circle>` +
      `<circle cx="${ORIGIN.x}" cy="${ORIGIN.y}" r="3.5" class="fig-ink"></circle>` +
      label({ x: zx + 14, y: zy - 12, text: "z", size: SIZE.value, class: "text-accent", anchor: "start", weight: "bold" }) +
      label({ x: cx + 14, y: cy + 22, text: "z\u0304", size: SIZE.value, class: "text-warn", anchor: "start", weight: "bold" }) +
      label({ x: (ORIGIN.x + zx) / 2, y: (ORIGIN.y + zy) / 2 - 8, text: "|z|", size: SIZE.value, class: "text-accent" });

    svg.innerHTML = `${axes}${drops}${mirror}${radius}${points}`;

    const sign = (v) => (v < 0 ? " - " : " + ") + fmt(Math.abs(v), 1);
    readout.textContent =
      `z = ${fmt(re, 1)}${sign(im)}i, and z\u0304 = ${fmt(re, 1)}${sign(-im)}i. ` +
      `|z| = ${fmt(modulus, 3)}. ` +
      (im === 0
        ? "The imaginary part is zero, so z lies on the real axis and z\u0304 is the same point: |z| is just the distance from the origin along the real axis."
        : `The conjugate is the reflection of z in the real axis, and the modulus |z| = \u221a(${fmt(re, 1)}\u00b2 + ${fmt(im, 1)}\u00b2) = ${fmt(modulus, 3)} is the distance from the origin.`);
  }

  react([reInput, imInput], update);
}
