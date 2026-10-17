// The derivative as a limit of pictures: a chord whose second point slides towards the
// first, and the gradient it settles on.
//
// The page defines the derivative as the gradient of a chord in the limit. A definition
// of a limit is the one thing prose is worst at, because the whole content of it is what
// happens as one number moves — and a static diagram can only show one instant. So the
// reader moves `h` themselves, watches the chord turn, and reads both gradients at once:
// the chord's, which changes, and the tangent's, which does not. The gap between the two
// numbers closing *is* the section.
//
// Two things are drawn that a hand-written version would leave out. The rise-and-run
// triangle, because the chord's gradient is a quotient of two lengths and the picture
// should show the two lengths rather than a number. And the tangent itself, drawn from
// the start, so the reader has the answer on screen to watch the chord approach — the
// alternative is telling them the answer, which is what the page already does.
import { SIZE, axes, curve, dots, fmt, label, line, panel, react, slider } from "./kit.js";

const LAST_X = 3.5;
const MAX_H = 1.5;
const SQUARE = (x) => x * x;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "The curve y = x squared with a chord between two points and the tangent at the first point",
    description:
      "A parabola with one point fixed and a second point that slides along the curve. A straight " +
      "line joins the two points, and a second straight line touches the curve at the fixed point. " +
      "As the second point slides towards the first, the joining line turns until it lies along " +
      "the tangent. The gradients of both lines are given in the readout below.",
    prompt: "Move h towards zero and watch the chord. What does its gradient settle on?",
    width: 560,
    height: 340,
  });

  const at = slider(el, {
    id: "at",
    label: "Point at x =",
    min: 0.5,
    max: LAST_X,
    step: 0.1,
    show: true,
    value: 2,
    name: "The x-coordinate of the fixed point, 0.5 to 3.5",
  });

  const gap = slider(el, {
    id: "h",
    label: "Distance h =",
    min: 0.1,
    max: MAX_H,
    step: 0.05,
    show: true,
    value: MAX_H,
    name: "The distance to the second point, 0.1 to 1.5",
  });

  const { draw, x, y } = axes({
    width: 560,
    height: 340,
    pad: { left: 58, right: 26, top: 26, bottom: 46 },
    x: { domain: [0, 5], ticks: 5, label: "x" },
    y: { domain: [0, 25], ticks: 5, label: "y" },
  });

  function update() {
    const a = Number(at.value);
    const h = Number(gap.value);
    const b = a + h;

    const fa = SQUARE(a);
    const fb = SQUARE(b);

    // The tangent at the fixed point, which is the answer: its gradient is 2a.
    const slope = 2 * a;
    const span = 1.1;
    const tangent = [
      [a - span, fa - slope * span],
      [a + span, fa + slope * span],
    ];

    let drawing = draw;
    drawing += curve(
      Array.from({ length: 121 }, (_, i) => [i * (5 / 120), SQUARE(i * (5 / 120))]),
      { x, y, class: "fig-ink", width: 2.5 },
    );

    // The rise and the run, so the gradient is two lengths rather than a number.
    drawing += line({ x1: x(a), y1: y(fa), x2: x(b), y2: y(fa), class: "fig-grid", width: 1.6 });
    drawing += line({ x1: x(b), y1: y(fa), x2: x(b), y2: y(fb), class: "fig-grid", width: 1.6 });
    drawing += label({
      x: (x(a) + x(b)) / 2,
      y: y(fa) + 18,
      text: `h = ${fmt(h)}`,
      size: SIZE.tick,
      class: "text-ink",
    });
    drawing += label({
      x: x(b) + 8,
      y: (y(fa) + y(fb)) / 2 + 4,
      text: `rise ${fmt(fb - fa)}`,
      size: SIZE.tick,
      class: "text-ink",
      anchor: "start",
    });

    // The tangent, dashed and named, drawn under the chord.
    drawing += line({
      x1: x(tangent[0][0]),
      y1: y(tangent[0][1]),
      x2: x(tangent[1][0]),
      y2: y(tangent[1][1]),
      class: "fig-good",
      width: 2,
      dash: "7 5",
    });
    drawing += label({
      x: x(tangent[1][0]) - 4,
      y: y(tangent[1][1]) + 16,
      text: "tangent",
      size: SIZE.tick,
      class: "text-good",
      anchor: "end",
    });

    // The chord, which is what moves.
    drawing += line({ x1: x(a), y1: y(fa), x2: x(b), y2: y(fb), class: "fig-accent", width: 2.6 });
    drawing += label({
      x: x(b),
      y: y(fb) - 10,
      text: "chord",
      size: SIZE.tick,
      class: "text-accent",
    });

    drawing += dots([[a, fa]], { x, y, r: 5.5, class: "fig-ink" });
    drawing += dots([[b, fb]], { x, y, r: 5.5, class: "fig-accent" });

    svg.innerHTML = drawing;

    const chord = (fb - fa) / h;
    const gapTo = Math.abs(chord - slope);
    readout.textContent =
      `At x = ${fmt(a, 1)} the chord has gradient ${fmt(chord)}. ` +
      `The tangent has gradient ${fmt(slope)}. ` +
      (h <= 0.15
        ? `With h this small the two are within ${fmt(gapTo)} of each other.`
        : `Shrinking h brings the chord's gradient towards ${fmt(slope)}.`);
  }

  react([at, gap], update);
}
