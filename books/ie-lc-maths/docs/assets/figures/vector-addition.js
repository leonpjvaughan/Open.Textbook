// A guided investigation of vector addition, and of the angle between two vectors.
//
// The reader moves the two vectors with four sliders and watches three things at once:
// the sum drawn from the origin, the parallelogram whose fourth corner is that sum, and
// the angle between the two vectors. Setting the components so that the angle reads 90
// degrees is the moment the dot product earns its place, which is why the same figure
// appears in the addition section and again in the angle section.
//
// Nothing here carries a colour. The first vector is drawn in the accent class, the
// second in the warning class and the sum in the good class, and each is also named in
// words, so the three are told apart without relying on colour.
//
// The scaffolding — the panel, its accessible name, the sliders, the readout and the
// redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, fmt, label, panel, react, slider } from "./kit.js";

const W = 560;
const H = 360;
const ORIGIN = { x: 280, y: 200 };
const UNIT = 34; // SVG units per vector unit
const RANGE = 4; // the sliders' range, in each component

const px = (v) => ORIGIN.x + v * UNIT;
const py = (v) => ORIGIN.y - v * UNIT;

// A line with a solid arrowhead at its tip, so the direction is part of the drawing.
function arrow(x1, y1, x2, y2, cls, width) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 10;
  const wing = 0.42;
  const x3 = x2 - head * Math.cos(angle - wing);
  const y3 = y2 - head * Math.sin(angle - wing);
  const x4 = x2 - head * Math.cos(angle + wing);
  const y4 = y2 - head * Math.sin(angle + wing);
  return (
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}" ` +
    `stroke-width="${width}"></line>` +
    `<polygon points="${x2},${y2} ${x3},${y3} ${x4},${y4}" class="${cls}"></polygon>`
  );
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Two vectors drawn from a point, their sum, the parallelogram between them, and the angle between the vectors",
    width: W,
    height: H,
  });

  const ax = slider(el, {
    show: true,
    id: "ax",
    label: "a across",
    min: -RANGE,
    max: RANGE,
    step: 1,
    value: 3,
  });
  const ay = slider(el, {
    show: true,
    id: "ay",
    label: "a up",
    min: -RANGE,
    max: RANGE,
    step: 1,
    value: 1,
  });
  const bx = slider(el, {
    show: true,
    id: "bx",
    label: "b across",
    min: -RANGE,
    max: RANGE,
    step: 1,
    value: -1,
  });
  const by = slider(el, {
    show: true,
    id: "by",
    label: "b up",
    min: -RANGE,
    max: RANGE,
    step: 1,
    value: 3,
  });

  function update() {
    const a = [Number(ax.value), Number(ay.value)];
    const b = [Number(bx.value), Number(by.value)];
    const sum = [a[0] + b[0], a[1] + b[1]];
    const dot = a[0] * b[0] + a[1] * b[1];
    const magA = Math.hypot(a[0], a[1]);
    const magB = Math.hypot(b[0], b[1]);

    let angle = null;
    let angleText = "not defined, because one vector is the zero vector";
    if (magA > 0 && magB > 0) {
      const cos = Math.max(-1, Math.min(1, dot / (magA * magB)));
      angle = (Math.acos(cos) * 180) / Math.PI;
      angleText = `${fmt(angle, 1)} degrees`;
    }

    // Axes and grid, drawn fresh each time so the figure stays one self-contained SVG.
    let grid = "";
    for (let k = -RANGE; k <= RANGE; k += 1) {
      if (k === 0) continue;
      grid +=
        `<line x1="${px(k)}" y1="10" x2="${px(k)}" y2="${H - 10}" ` +
        `class="fig-grid" stroke-width="0.7"></line>`;
      grid +=
        `<line x1="10" y1="${py(k)}" x2="${W - 10}" y2="${py(k)}" ` +
        `class="fig-grid" stroke-width="0.7"></line>`;
    }
    grid +=
      `<line x1="10" y1="${ORIGIN.y}" x2="${W - 10}" y2="${ORIGIN.y}" ` +
      `class="fig-ink" stroke-width="1.4"></line>`;
    grid +=
      `<line x1="${ORIGIN.x}" y1="10" x2="${ORIGIN.x}" y2="${H - 10}" ` +
      `class="fig-ink" stroke-width="1.4"></line>`;

    // The two dashed sides that complete the parallelogram on the sum.
    const parallelogram =
      `<line x1="${px(a[0])}" y1="${py(a[1])}" x2="${px(sum[0])}" y2="${py(sum[1])}" ` +
      `class="fig-grid" stroke-width="1.2" stroke-dasharray="5 4"></line>` +
      `<line x1="${px(b[0])}" y1="${py(b[1])}" x2="${px(sum[0])}" y2="${py(sum[1])}" ` +
      `class="fig-grid" stroke-width="1.2" stroke-dasharray="5 4"></line>`;

    const arrows =
      arrow(ORIGIN.x, ORIGIN.y, px(a[0]), py(a[1]), "fig-accent", 2.6) +
      arrow(ORIGIN.x, ORIGIN.y, px(b[0]), py(b[1]), "fig-warn", 2.6) +
      arrow(ORIGIN.x, ORIGIN.y, px(sum[0]), py(sum[1]), "fig-good", 3);

    const names =
      label({
        x: px(a[0]) + 12,
        y: py(a[1]) - 8,
        text: "a",
        size: SIZE.value,
        class: "text-accent",
        anchor: "start",
        weight: "bold",
      }) +
      label({
        x: px(b[0]) + 12,
        y: py(b[1]) - 8,
        text: "b",
        size: SIZE.value,
        class: "text-warn",
        anchor: "start",
        weight: "bold",
      }) +
      label({
        x: px(sum[0]) + 12,
        y: py(sum[1]) + 18,
        text: "a + b",
        size: SIZE.value,
        class: "text-good",
        anchor: "start",
        weight: "bold",
      });

    svg.innerHTML = grid + parallelogram + arrows + names;

    const zero = magA === 0 || magB === 0;
    readout.textContent =
      `a = (${fmt(a[0])}, ${fmt(a[1])}) and b = (${fmt(b[0])}, ${fmt(b[1])}). ` +
      `Their sum is a + b = (${fmt(sum[0])}, ${fmt(sum[1])}), ` +
      `with length ${fmt(Math.hypot(sum[0], sum[1]), 3)}. ` +
      `The angle between a and b is ${angleText}. ` +
      (zero
        ? ""
        : dot === 0
          ? "A right angle appears here, and the two vectors are perpendicular."
          : dot > 0
            ? "This angle is acute, so the vectors point broadly the same way."
            : "This angle is obtuse, so the vectors point broadly opposite ways.");
  }

  react([ax, ay, bx, by], update);
}
