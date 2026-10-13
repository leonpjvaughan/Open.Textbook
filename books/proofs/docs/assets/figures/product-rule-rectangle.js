// Guided investigation for the proof of the product rule.
//
// The proof is a rectangle with sides u and v that both grow. The change in area
// is the strip along the right, plus the strip along the top, plus the small
// corner where those two strips meet. The corner is the piece people leave out,
// so the figure draws it in its own colour and reports it beside the strips: the
// reader moves the growths, sees the two strips stay large, and sees the corner
// shrink away faster than either of them — which is why it contributes nothing in
// the limit, after the division by the change in x.
//
// Predict -> Test -> Explain per AGENTS.md P6: the page asks whether the two
// strips are the whole change before a slider is touched. Colours are CSS classes,
// so the figure adapts to every bundle and both schemes, and the readout is
// `aria-live` so the numbers reach a reader who cannot see the drawing.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A rectangle whose width and height both grow, with the two new strips drawn along the right and the top and the small corner they leave drawn separately",
    width: 500,
    height: 320,
    max: 520,
  });

  const growU = slider(el, { show: true,
    id: "grow-u",
    label: "Grow the width:",
    name: "How much the width grows",
    min: 0,
    max: 2,
    step: 0.05,
    value: 0.8,
    format: (value) => value.toFixed(2),
  });
  const growV = slider(el, { show: true,
    id: "grow-v",
    label: "Grow the height:",
    name: "How much the height grows",
    min: 0,
    max: 2,
    step: 0.05,
    value: 0.6,
    format: (value) => value.toFixed(2),
  });

  const UNIT = 40; // pixels per unit of length
  const ORIGIN_X = 60;
  const ORIGIN_Y = 270;
  const U = 6; // the width of the original rectangle
  const V = 4; // the height of the original rectangle

  const text = (x, y, label, cls, anchor = "middle") =>
    `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" text-anchor="${anchor}" ` +
    `font-size="15" class="${cls}">${label}</text>`;

  function draw() {
    const du = Number(growU.value); // how much the width grows
    const dv = Number(growV.value); // how much the height grows

    const left = ORIGIN_X;
    const right = ORIGIN_X + U * UNIT;
    const bottom = ORIGIN_Y;
    const top = ORIGIN_Y - V * UNIT;
    const wide = du * UNIT; // the drawn width of the right-hand strip
    const tall = dv * UNIT; // the drawn height of the top strip

    const rightStrip = V * du; // v times the growth of u
    const topStrip = U * dv; // u times the growth of v
    const corner = du * dv; // both small lengths multiplied
    const change = rightStrip + topStrip + corner;
    const share = change > 0 ? (100 * corner) / change : 0;

    svg.innerHTML = `
      <rect x="${left}" y="${top}" width="${U * UNIT}" height="${V * UNIT}"
            class="fig-ink" fill-opacity="0.12" stroke-width="1.5"></rect>
      <rect x="${right}" y="${top}" width="${wide}" height="${V * UNIT}"
            class="fig-accent" fill-opacity="0.35" stroke-width="1.5"></rect>
      <rect x="${left}" y="${top - tall}" width="${U * UNIT}" height="${tall}"
            class="fig-good" fill-opacity="0.35" stroke-width="1.5"></rect>
      <rect x="${right}" y="${top - tall}" width="${wide}" height="${tall}"
            class="fig-warn" fill-opacity="0.75" stroke-width="1.5"></rect>
      ${text(left + (U * UNIT) / 2, bottom + 22, `u = ${U}`, "text-ink")}
      ${text(left - 8, top + (V * UNIT) / 2 + 4, `v = ${V}`, "text-ink", "end")}
      ${text(right + wide / 2, bottom + 22, `right strip ${rightStrip.toFixed(2)}`, "text-accent")}
      ${text(left + (U * UNIT) / 2, top - tall - 8, `top strip ${topStrip.toFixed(2)}`, "text-good")}
      ${text(right + wide / 2, top - tall / 2 + 4, `corner ${corner.toFixed(2)}`, "text-warn")}`;

    readout.textContent =
      `The rectangle is u = ${U} by v = ${V}. Growing the width by ` +
      `${du.toFixed(2)} adds the right strip, area ${rightStrip.toFixed(2)}. ` +
      `Growing the height by ${dv.toFixed(2)} adds the top strip, area ` +
      `${topStrip.toFixed(2)}. The corner is ${corner.toFixed(2)}, which is ` +
      `${share.toFixed(1)}% of the whole change. Now make both growths smaller: ` +
      `the strips shrink in step with the growths, but the corner is the product ` +
      `of two small lengths, so it shrinks faster and its share falls towards zero.`;
  }

  react([growU, growV], draw);
}
