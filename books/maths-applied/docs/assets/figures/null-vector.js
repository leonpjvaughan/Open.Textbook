// The decomposition, drawn: three rows, two of them the same arrow, and a combination
// that closes on nothing.
//
// §1.4 says "the two legs are one equation" and gives it as a sentence and a row vector.
// The claim is a fact about three arrows, and the page's only figure is about the legs in
// three dimensions — so the decomposition itself was text. This draws it: the Jacobian's
// three rows as arrows from one origin, the coincident pair marked, and the left null
// vector as the two half-length arrows that walk out and come back.
//
// **Nothing here is typed.** The rows come from `legsJacobian`, the singular values from
// `singularValues` and the null vector from `nullDirection`, all at the design pose — the
// same calls the page's tests make. The figure has no control: the pattern does not depend
// on the pose, and §1.4 says so ("a different pose gives the same w").
import { SIZE, arrow, label, panel, scale } from "./kit.js";
import {
  legsJacobian,
  lowerJoint,
  nullDirection,
  pose,
  singularValues,
  thetaFor,
} from "../data/mechanism.js";

const WIDTH = 560;
const HEIGHT = 320;

/** A number as the prose writes it: a true minus sign, and never a negative zero. */
const num = (value, places) => {
  const shown = Object.is(value, -0) ? 0 : value;
  return shown.toFixed(places).replace("-", "\u2212");
};

export function mount(el) {
  const { svg, readout, caption, claim } = panel(el, {
    label:
      "The three rows of the Jacobian as arrows, with the left null vector drawn as the combination that cancels",
    description:
      "Three arrows from one origin are the three rows of the Jacobian: the first two are " +
      "the same arrow, drawn one over the other, and the third is a different direction. " +
      "On the right, half of the first row is walked out and minus half of the second is " +
      "walked back, and the pair returns to where it started, so that combination of the " +
      "three equations constrains nothing.",
    prompt: "Two of the three arrows are the same. What does that say about the three equations?",
    width: WIDTH,
    height: HEIGHT,
    max: 560,
  });

  // The design pose, which is the pose every number on the page is taken at.
  const theta = thetaFor(0);
  const C = lowerJoint(theta);
  const D = pose(theta).D;
  const rows = legsJacobian(D, C);
  const sigma = singularValues(rows);
  const w = nullDirection(rows);

  const left = { x: 150, y: 210 };
  const right = { x: 430, y: 210 };
  const span = 120;
  const map = scale({ domain: [-1, 1], range: [-span, span] });
  /** A row of J, as a screen offset from an origin. */
  const offset = (row, factor = 1) => [map(row[0] * factor), -map(row[1] * factor)];

  let drawing = "";

  drawing += label({
    x: 20,
    y: 28,
    text: "the three rows of J, from one origin",
    anchor: "start",
    size: SIZE.value,
    class: "text-ink",
  });
  drawing += label({
    x: WIDTH - 16,
    y: 28,
    text: "0.707 \u00b7 row 1 \u2212 0.707 \u00b7 row 2",
    anchor: "end",
    size: SIZE.value,
    class: "text-ink",
  });

  // Row 3, the odd one out.
  const [thirdX, thirdY] = offset(rows[2]);
  drawing += arrow({
    x1: left.x,
    y1: left.y,
    x2: left.x + thirdX,
    y2: left.y + thirdY,
    class: "fig-grid",
    width: 2.2,
  });
  drawing += label({
    x: left.x + thirdX + 8,
    y: left.y + thirdY + 4,
    text: "row 3",
    anchor: "start",
    size: SIZE.tick,
    class: "text-ink",
  });

  // Rows 1 and 2 are the same vector — `legsJacobian` returns the same array twice. They
  // are drawn 7px apart so a reader can see there are two: a dashed arrow exactly on top
  // of a solid one is one arrow to the eye, and there being two is the whole point.
  const [firstX, firstY] = offset(rows[0]);
  drawing += arrow({
    x1: left.x,
    y1: left.y - 7,
    x2: left.x + firstX,
    y2: left.y + firstY - 7,
    class: "fig-accent",
    width: 2.4,
  });
  drawing += arrow({
    x1: left.x,
    y1: left.y + 7,
    x2: left.x + firstX,
    y2: left.y + firstY + 7,
    class: "fig-warn",
    width: 2.4,
    dash: "6 4",
  });
  drawing += label({
    x: left.x + firstX + 10,
    y: left.y + firstY - 12,
    text: "rows 1 and 2",
    anchor: "start",
    size: SIZE.tick,
    class: "text-ink",
  });

  // The cancellation, on the right: out along 0.707 of row 1, back along 0.707 of row 2,
  // which is the same vector reversed. The return leg is offset 9px so the pair is two
  // arrows and not one line drawn twice.
  const half = 0.707;
  const [outX, outY] = offset(rows[0], half);
  drawing += arrow({
    x1: right.x,
    y1: right.y,
    x2: right.x + outX,
    y2: right.y + outY,
    class: "fig-accent",
    width: 2.6,
  });
  drawing += label({
    x: right.x + outX / 2,
    y: right.y + outY / 2 - 10,
    text: "+0.707",
    anchor: "middle",
    size: SIZE.tick,
    class: "text-ink",
  });
  drawing += arrow({
    x1: right.x + outX,
    y1: right.y + outY + 9,
    x2: right.x,
    y2: right.y + 9,
    class: "fig-warn",
    width: 2.6,
    dash: "6 4",
  });
  drawing += label({
    x: right.x + outX / 2,
    y: right.y + outY / 2 + 26,
    text: "\u22120.707",
    anchor: "middle",
    size: SIZE.tick,
    class: "text-ink",
  });
  // The landing point: the origin, which is the whole argument.
  drawing += label({
    x: right.x - 6,
    y: right.y + 30,
    text: "back to nothing",
    anchor: "end",
    size: SIZE.tick,
    class: "text-ink",
  });

  svg.innerHTML = drawing;

  readout.textContent =
    `The design pose's Jacobian has singular values ${num(sigma[0], 3)}, ${num(sigma[1], 3)} and ` +
    `${num(sigma[2], 0)}. Its left null vector is (${num(w[0], 3)}, ${num(w[1], 3)}, ${num(w[2], 0)}): ` +
    `${num(half, 3)} of row 1 less ${num(half, 3)} of row 2 is 0 in both unknowns, so the two legs ` +
    `are one equation.`;

  caption.textContent =
    "Two of the three rows are the same arrow, and that is exact: each row is a unit vector " +
    "along a distance, and the two legs are the same distance. The third row is a different " +
    "direction, so it carries the only information the pair did not.";

  // The three facts the drawing asserts, each as the arithmetic the figure does.
  claim([
    {
      label: "row 1 less row 2, first unknown",
      expression: "a - b",
      values: { a: rows[0][0], b: rows[1][0] },
      answer: 0,
      shown: "0",
    },
    {
      label: "row 1 less row 2, second unknown",
      expression: "a - b",
      values: { a: rows[0][1], b: rows[1][1] },
      answer: 0,
      shown: "0",
    },
    {
      label: "the null combination, first unknown",
      expression: "half * a - half * b",
      values: { half, a: rows[0][0], b: rows[1][0] },
      answer: 0,
      shown: "0",
    },
  ]);
}
