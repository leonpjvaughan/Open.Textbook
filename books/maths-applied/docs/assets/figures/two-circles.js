// Why there are two answers, drawn: two circles, two meetings, one of them a car.
//
// §1.2 gives the closed form as code — `along`, `across`, and the two points either side
// of the chord — and the depth page for the section names both answers in a table and
// states the inequality under which the circles stop meeting. Neither drew them, so the
// one place in the book where "an equation can have two answers and both are valid" is
// argued was the one place with no picture.
//
// **Nothing here is typed.** The centres, both radii and both meeting points come from
// `lowerJoint` and `upperJoint` in `data/mechanism.js`, at the design pose — the same
// calls the page's tests make. `along` and `across` are recovered from the chord the two
// answers subtend rather than copied from the solver, so the figure states the page's
// triangle instead of repeating its arithmetic.
import { SIZE, circle, fmt, label, line, panel, scale } from "./kit.js";
import { FRONT, lowerJoint, upperJoint } from "../data/mechanism.js";

const WIDTH = 560;
const HEIGHT = 380;

// The window, in metres: lateral outboard to the right, up the page. Fixed rather than
// fitted to the circles, so a change to the geometry moves the drawing inside a frame a
// reader has already learned instead of rescaling everything under them.
const X0 = 0.02;
const X1 = 1.1;
const Z0 = -0.25;
const Z1 = 0.8;
// The drawing's box, and the column of words to its right.
const BOX = { left: 16, right: 348, top: 30, bottom: 350 };
const LEGEND = 366;

/** A number as the prose writes it: a true minus sign, never a negative zero. */
const num = (value, places) => {
  const shown = Object.is(value, -0) ? 0 : value;
  return shown.toFixed(places).replace("-", "\u2212");
};

export function mount(el) {
  const { svg, readout, caption, claim } = panel(el, {
    label:
      "Two circles, one about each arm pivot, meeting at the two places the upper ball joint can be",
    description:
      "A drawing of the front view. One circle is the upper arm's reach: it is centred on " +
      "the upper arm's pivot, B, with a radius of 0.303 metres. The other is the upright's " +
      "reach: it is centred on the lower ball joint, C, with a radius of 0.372 metres. The " +
      "two circles cross at two points, and each crossing is a valid position for the upper " +
      "ball joint. A solid line runs from C to the upper meeting point, which is the " +
      "assembly the car is built on, and a dashed line runs from C to the lower meeting " +
      "point, which folds the upright down past the lower arm. A line from B across the " +
      "chord to the first meeting point is split at the chord into a part along BC and a " +
      "part across it, at a right angle.",
    prompt: "The circles cross in two places. Why does a car have only one of them?",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  const C = lowerJoint(0);
  const [first, second] = upperJoint(C);
  const B = FRONT.B;
  const RB = FRONT.RB;
  const L = FRONT.L;

  // The chord the two answers subtend, and the point on BC it crosses. Both come from
  // the two answers: the design pose is their midpoint, and the right angle at it is
  // what makes `along` and `across` the legs of a right triangle.
  const mid = [(first[0] + second[0]) / 2, (first[1] + second[1]) / 2];
  const along = Math.hypot(mid[0] - B[0], mid[1] - B[1]);
  const across = Math.hypot(first[0] - mid[0], first[1] - mid[1]);

  // One factor for both axes, or the circles would not be circles. The box is the
  // constraint, and the narrower of the two spans sets the scale.
  const k = Math.min(
    (BOX.right - BOX.left) / (X1 - X0),
    (BOX.bottom - BOX.top) / (Z1 - Z0),
  );
  const px = scale({ domain: [X0, X1], range: [BOX.left, BOX.left + (X1 - X0) * k] });
  const py = scale({ domain: [Z0, Z1], range: [BOX.top + (Z1 - Z0) * k, BOX.top] });
  const at = (point) => [px(point[0]), py(point[1])];

  const [bx, by] = at(B);
  const [cx, cy] = at(C);
  const [mx, my] = at(mid);
  const [px1, py1] = at(first);
  const [px2, py2] = at(second);

  let drawing = "";

  // The chord BC, faint: it is not a part of the mechanism, it is the line `along` is
  // measured along, and the two answers are symmetric about it.
  drawing += line({ x1: bx, y1: by, x2: cx, y2: cy, class: "fig-grid", width: 1.6, dash: "5 5" });

  // The two circles: the same kind of object (a fixed distance), so the same class. A
  // hollow circle is the one mark the kit has no option for, and it is drawn twice, so
  // it is built once.
  const ringMark = (x, y, r, width) =>
    `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(2)}" ` +
    `class="fig-ink" style="fill:none" stroke-width="${width}"></circle>`;
  drawing += ringMark(bx, by, RB * k, 2.2);
  drawing += ringMark(cx, cy, L * k, 2.2);

  // The right triangle at the chord: `along` from B to the chord, `across` from the
  // chord to the meeting point, meeting at a right angle. This is the pair of numbers
  // the section's code computes, drawn where the code computes them.
  drawing += line({ x1: bx, y1: by, x2: mx, y2: my, class: "fig-good", width: 2.8 });
  drawing += line({ x1: mx, y1: my, x2: px1, y2: py1, class: "fig-good", width: 2.8 });
  // The right angle, as the two short sides of a square on the corner, in screen units:
  // both legs are in pixels by now, so the unit vectors are taken from them directly.
  const legIn = [(bx - mx) / Math.hypot(bx - mx, by - my), (by - my) / Math.hypot(bx - mx, by - my)];
  const legOut = [
    (px1 - mx) / Math.hypot(px1 - mx, py1 - my),
    (py1 - my) / Math.hypot(px1 - mx, py1 - my),
  ];
  const mark = 9;
  const cornerIn = [mx + mark * legIn[0], my + mark * legIn[1]];
  const cornerOut = [mx + mark * legOut[0], my + mark * legOut[1]];
  drawing += line({
    x1: cornerIn[0],
    y1: cornerIn[1],
    x2: cornerIn[0] + mark * legOut[0],
    y2: cornerIn[1] + mark * legOut[1],
    class: "fig-good",
    width: 1.6,
  });
  drawing += line({
    x1: cornerOut[0],
    y1: cornerOut[1],
    x2: cornerIn[0] + mark * legOut[0],
    y2: cornerIn[1] + mark * legOut[1],
    class: "fig-good",
    width: 1.6,
  });

  // The upright in both of its positions. The solid one is the assembly the car is
  // built on; the dashed one is the same rigid part folded the other way.
  drawing += line({ x1: cx, y1: cy, x2: px1, y2: py1, class: "fig-accent", width: 3.2 });
  drawing += line({
    x1: cx,
    y1: cy,
    x2: px2,
    y2: py2,
    class: "fig-warn",
    width: 3.2,
    dash: "7 5",
  });
  drawing += circle({ cx: px1, cy: py1, r: 5.5, class: "fig-accent" });
  drawing += circle({ cx: px2, cy: py2, r: 5.5, class: "fig-warn" });

  // The two pivots, named.
  drawing += circle({ cx: bx, cy: by, r: 3.5, class: "fig-ink" });
  drawing += circle({ cx, cy, r: 3.5, class: "fig-ink" });
  drawing += label({
    x: bx - 10,
    y: by - 8,
    text: "B",
    anchor: "end",
    size: SIZE.value,
    class: "text-ink",
  });
  drawing += label({
    x: cx + 10,
    y: cy + 18,
    text: "C",
    anchor: "start",
    size: SIZE.value,
    class: "text-ink",
  });

  // The two answers, with their coordinates. The numbers are the depth page's table.
  // The first answer sits on the upper arm's circle, so a label directly above it is
  // crossed by the arc; it is set out to the right instead, where the arc has curved away.
  drawing += label({
    x: px1 + 15,
    y: py1 - 22,
    text: `${num(first[0], 2)}, ${num(first[1], 2)}`,
    anchor: "start",
    size: SIZE.tick,
    class: "text-ink",
  });
  drawing += label({
    x: px2 - 8,
    y: py2 + 16,
    text: `${num(second[0], 2)}, ${num(second[1], 2)}`,
    anchor: "end",
    size: SIZE.tick,
    class: "text-ink",
  });

  // The legs of the triangle are named in the legend, not on the drawing: both legs are
  // short, and every place beside them is either the chord, the upright or a circle.

  // The column of words. Every swatch carries the same class and the same dash as the
  // thing it names, so the mapping is style rather than colour.
  const ring = (y) => ringMark(LEGEND + 8, y - 5, 6, 2);
  const stroke = (y, cls, dash) =>
    line({ x1: LEGEND, y1: y - 5, x2: LEGEND + 18, y2: y - 5, class: cls, width: 2.8, dash });
  const row = (y, swatch, first_, second_) =>
    swatch +
    label({
      x: LEGEND + 26,
      y,
      text: first_,
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    }) +
    label({
      x: LEGEND + 26,
      y: y + 18,
      text: second_,
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    });

  drawing += label({
    x: LEGEND,
    y: 44,
    text: "the front view, in metres",
    anchor: "start",
    size: SIZE.value,
    class: "text-ink",
  });
  drawing += row(80, ring(80), "the upper arm's reach", `radius ${num(RB, 3)} about B`);
  drawing += row(132, ring(132), "the upright's reach", `radius ${num(L, 3)} about C`);
  drawing += row(
    184,
    stroke(184, "fig-accent"),
    "the car's assembly",
    `joint at ${num(first[0], 2)}, ${num(first[1], 2)}`,
  );
  drawing += row(
    236,
    stroke(236, "fig-warn", "7 5"),
    "the other assembly",
    `joint at ${num(second[0], 2)}, ${num(second[1], 2)}`,
  );
  drawing += row(288, stroke(288, "fig-good"), "the chord, split in two", `along ${num(along, 3)} m`);
  drawing += label({
    x: LEGEND + 26,
    y: 324,
    text: `across ${num(across, 3)} m`,
    anchor: "start",
    size: SIZE.tick,
    class: "text-ink",
  });

  svg.innerHTML = drawing;

  readout.textContent =
    `The two pivots are ${num(Math.hypot(C[0] - B[0], C[1] - B[1]), 3)} m apart. The upper ` +
    `arm's circle has radius ${num(RB, 3)} m and the upright's ${num(L, 3)} m, so the circles ` +
    `cross at (${num(first[0], 2)}, ${num(first[1], 2)}) and at ` +
    `(${num(second[0], 2)}, ${num(second[1], 2)}). The chord between them crosses BC ` +
    `${num(along, 3)} m from B, and each answer sits ${num(across, 3)} m off that line. Both ` +
    `answers are the same two equations solved, so the difference between them is which ` +
    `assembly the parts are in, not which answer is right.`;

  caption.textContent =
    "Two circles meet twice, and both meetings are a valid position for the same rigid " +
    "parts. Nothing in the algebra prefers one of them: the car is built on one assembly, " +
    "and a solver has to be told which. The pair of circles still crosses everywhere the " +
    "chapter sweeps, so this section's model fails only when the pivots are further apart " +
    "than the two radii added together, or closer together than their difference.";

  // The four distances, and the two legs, each as the arithmetic the drawing does.
  claim([
    {
      label: "the car's answer, from the upper arm's pivot",
      expression: "sqrt((a - b)**2 + (c - d)**2)",
      values: { a: first[0], b: B[0], c: first[1], d: B[1] },
      answer: RB,
      shown: num(RB, 3),
    },
    {
      label: "the car's answer, from the lower ball joint",
      expression: "sqrt((a - b)**2 + (c - d)**2)",
      values: { a: first[0], b: C[0], c: first[1], d: C[1] },
      answer: L,
      shown: num(L, 3),
    },
    {
      label: "the other answer, from the upper arm's pivot",
      expression: "sqrt((a - b)**2 + (c - d)**2)",
      values: { a: second[0], b: B[0], c: second[1], d: B[1] },
      answer: RB,
      shown: num(RB, 3),
    },
    {
      label: "the other answer, from the lower ball joint",
      expression: "sqrt((a - b)**2 + (c - d)**2)",
      values: { a: second[0], b: C[0], c: second[1], d: C[1] },
      answer: L,
      shown: num(L, 3),
    },
    {
      label: "the chord's crossing point, along BC",
      expression: "(r**2 - u**2 + d**2) / (2 * d)",
      values: {
        r: RB,
        u: L,
        d: Math.hypot(C[0] - B[0], C[1] - B[1]),
      },
      answer: along,
      shown: num(along, 3),
    },
    {
      label: "each answer's distance off the chord",
      expression: "sqrt(r**2 - a**2)",
      values: { r: RB, a: along },
      answer: across,
      shown: num(across, 3),
    },
  ]);
}
