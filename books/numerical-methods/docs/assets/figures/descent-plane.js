// Gradient descent on a plane, which is where the page's error rule becomes visible.
//
// The page's quadratic is f = 5x² + y², so every step multiplies the x error by
// 1 − 10t and the y error by 1 − 2t. One step length cannot suit both: the reader picks
// a step, walks the iterates across the plane, and watches one coordinate disappear
// while the other is left to crawl, or to swing across zero. The iterates are produced
// by the update the page derives.
import { SIZE, axes, chooser, circle, curve, dots, label, line, panel, react, sigfig, stepper } from "./kit.js";

const WIDTH = 500;
const HEIGHT = 540;
const LOW = -0.5;
const HIGH = 1.15;
const START = [1, 1];
const STEPS = 10;
const LENGTHS = [0.05, 0.09, 0.19];

/** The page's model: f = 5x² + y², whose gradient is (10x, 2y). */
const score = (x, y) => 5 * x * x + y * y;

/** The path the update makes at a fixed step length. */
function path(t, count) {
  const out = [START];
  for (let i = 0; i < count; i += 1) {
    const [px, py] = out[out.length - 1];
    out.push([px - t * 10 * px, py - t * 2 * py]);
  }
  return out;
}

/** A number as this figure prints it: a minus sign the reader recognises. */
const minus = (text) => String(text).replace("-", "\u2212");
const num = (value, figures = 3) => {
  const tiny = value !== 0 && Math.abs(value) < 1e-3;
  return minus(sigfig(value, figures, { scientific: tiny }));
};

export function mount(el) {
  const { svg, readout, caption, claim } = panel(el, {
    label: "Gradient descent on a quadratic, drawn on the plane of its two unknowns",
    description:
      "The plane of the two unknowns, with their axes crossing at the answer. The start " +
      "is at one and one. A line joins the iterates: each step moves in the downhill " +
      "direction by the chosen distance. At a small step one coordinate reaches zero " +
      "quickly and the other crawls; at a larger step the other coordinate reaches zero " +
      "and the first swings back and forth across it.",
    prompt:
      "Predict: with a step of 0.05, which coordinate is still far from zero after ten " +
      "steps? Carry the line across, then choose 0.19 and predict again before you look.",
    width: WIDTH,
    height: HEIGHT,
  });
  if (!svg) throw new Error("descent-plane: the frame has no drawing surface");

  const { draw, x, y, box } = axes({
    width: WIDTH,
    height: HEIGHT,
    pad: { left: 74, right: 46, top: 110, bottom: 50 },
    x: { domain: [LOW, HIGH], ticks: 4 },
    y: { domain: [LOW, HIGH], ticks: 4 },
    origin: true,
    grid: false,
  });

  const step = stepper(el, {
    label: "Iteration",
    id: "descent-iteration",
    steps: Array.from({ length: STEPS + 1 }, (_, i) => ({
      text: `After ${i} iteration${i === 1 ? "" : "s"}.`,
    })),
  });
  const length = chooser(el, {
    id: "descent-step-length",
    label: "step length t",
    name: "The step length t",
    choices: LENGTHS.map((value) => ({ value, label: String(value) })),
    value: LENGTHS[0],
  });

  const show = () => {
    const t = Number(length.value);
    const k = Math.min(step.index, STEPS);
    const walk = path(t, STEPS).slice(0, k + 1);
    const [hereX, hereY] = walk[walk.length - 1];
    const previous = walk.length > 1 ? walk[walk.length - 2] : null;
    const reached = score(hereX, hereY);
    const factorX = 1 - t * 10;
    const factorY = 1 - t * 2;

    const note = [
      [`step  t = ${num(t, 2)}`, "text-ink"],
      [`the x error is multiplied by ${num(factorX)}`, "text-accent"],
      [`the y error is multiplied by ${num(factorY)}`, "text-warn"],
      [`f = ${num(reached)}`, "text-ink"],
    ];

    const marks = [
      draw,
      // The vertical axis is the frame's left edge in `axes()`, so the plane's own
      // axis through zero is drawn here.
      line({
        x1: x(0),
        y1: box.y0,
        x2: x(0),
        y2: box.y1,
        class: "fig-ink",
        width: 1.2,
      }),
      curve(walk, { x, y, class: "fig-line", width: 2, dash: "5 3" }),
      dots(walk.slice(1, -1), { x, y, r: 3.5, class: "fig-grid" }),
      circle({ cx: x(walk[0][0]), cy: y(walk[0][1]), r: 5, class: "fig-ink" }),
      circle({ cx: x(hereX), cy: y(hereY), r: 6, class: "fig-accent" }),
      circle({ cx: x(0), cy: y(0), r: 4.5, class: "fig-good" }),
      label({
        x: x(0) + 10,
        y: y(0) + 22,
        text: "the answer",
        anchor: "start",
        size: SIZE.tick,
        class: "text-good",
      }),
      label({
        x: x(START[0]) + 8,
        y: y(START[1]) - 8,
        text: "start",
        anchor: "start",
        size: SIZE.tick,
        class: "text-ink",
      }),
      label({
        x: box.x1 - 4,
        y: y(0) - 10,
        text: "x, λ = 10",
        anchor: "end",
        size: SIZE.tick,
        class: "text-ink",
      }),
      label({
        x: x(0) + 10,
        y: box.y1 + 16,
        text: "y, λ = 2",
        anchor: "start",
        size: SIZE.tick,
        class: "text-ink",
      }),
      ...note.map(([text, tone], i) =>
        label({
          x: box.x0,
          y: 30 + i * 20,
          text,
          anchor: "start",
          size: SIZE.tick,
          class: tone,
        }),
      ),
    ];
    svg.innerHTML = marks.join("");

    readout.textContent =
      `${step.text} x = ${num(hereX, 4)}, y = ${num(hereY, 4)}, and f = ${num(reached)}. ` +
      `Each step multiplies the x error by ${num(factorX)} and the y error by ${num(factorY)}.`;
    caption.textContent =
      "One step length cannot suit both directions. Why does the smaller step leave one " +
      "coordinate crawling, and why does the larger step send the other back and forth " +
      "across zero?";

    claim([
      {
        label: `the score at step ${k}`,
        expression: "5*x**2 + y**2",
        values: { x: hereX, y: hereY },
        answer: reached,
        shown: num(reached),
      },
      ...(previous
        ? [
            {
              label: `the x update into step ${k}`,
              expression: "x - t*10*x",
              values: { x: previous[0], t },
              answer: hereX,
              shown: num(hereX, 4),
            },
            {
              label: `the y update into step ${k}`,
              expression: "y - t*2*y",
              values: { y: previous[1], t },
              answer: hereY,
              shown: num(hereY, 4),
            },
          ]
        : []),
      {
        label: "the factor on the x error",
        expression: "1 - t*10",
        values: { t },
        answer: factorX,
        shown: num(factorX),
      },
      {
        label: "the factor on the y error",
        expression: "1 - t*2",
        values: { t },
        answer: factorY,
        shown: num(factorY),
      },
    ]);
  };

  react([step, length], show);
}
