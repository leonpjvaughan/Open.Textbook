// The secant step, drawn where it happens: two points on the curve, the line through
// them, and the place it crosses the axis.
//
// The page says the secant interpolates between two guesses and needs no derivative.
// The picture is that sentence: the slope comes from the two residuals, and the new
// guess is where their line meets the axis. The iterates are computed by the update,
// so the drawing cannot drift from the formula.
import { SIZE, axes, circle, graph, label, line, panel, react, sigfig, stepper } from "./kit.js";

const WIDTH = 560;
const HEIGHT = 320;
const LOW = 0.9;
const HIGH = 2.15;

const curveOf = (x) => x * x - 2;
const ROOT = Math.SQRT2;

/** The iterates, produced by the secant update rather than typed in. */
function sequence(count) {
  const out = [1, 2];
  for (let i = 0; i < count; i += 1) {
    const last = out[out.length - 1];
    const before = out[out.length - 2];
    out.push(last - (curveOf(last) * (last - before)) / (curveOf(last) - curveOf(before)));
  }
  return out;
}

const STEPS = sequence(4);

/** A number as this figure prints it: a minus sign the reader recognises. */
const minus = (text) => String(text).replace("-", "\u2212");
const num = (value, figures = 3) => minus(sigfig(value, figures));

export function mount(el) {
  const { svg, readout, caption, claim } = panel(el, {
    label: "One secant step: two guesses on the curve, the line through them, and its crossing",
    description:
      "The curve f of x equals x squared minus two. Two guesses are marked on it, and a " +
      "straight line is drawn through both points. That line crosses the axis at the next " +
      "guess. Stepping forward drops the older point, keeps the newer one and the crossing, " +
      "and draws the next secant.",
    prompt:
      "Predict: the two guesses are 1 and 2, where the curve is at minus one and two. Will " +
      "the line through them cross the axis below the root or above it?",
    width: WIDTH,
    height: HEIGHT,
  });
  if (!svg) throw new Error("secant-step: the frame has no drawing surface");

  const { draw, x, y, box } = axes({
    width: WIDTH,
    height: HEIGHT,
    pad: { left: 62, right: 22, top: 26, bottom: 48 },
    x: { domain: [LOW, HIGH], ticks: 4 },
    y: { domain: [-1.4, 2.8], ticks: 4 },
    origin: true,
    grid: false,
  });

  const step = stepper(el, {
    label: "Secant step",
    id: "secant-step",
    steps: STEPS.slice(2).map((_, i) => ({
      text: `Step ${i + 1}: draw the secant through guesses ${i} and ${i + 1}.`,
    })),
  });

  const show = () => {
    const k = Math.min(step.index, STEPS.length - 3);
    const before = STEPS[k];
    const here = STEPS[k + 1];
    const next = STEPS[k + 2];
    const fBefore = curveOf(before);
    const fHere = curveOf(here);
    const crossing = here - (fHere * (here - before)) / (fHere - fBefore);
    const slope = (fHere - fBefore) / (here - before);
    const error = here - ROOT;
    const nextError = next - ROOT;

    // The line is drawn beyond both guesses, and clipped to the plot, so it reads as
    // the line through two points rather than as a short segment with dots on it.
    const from = Math.max(LOW, Math.min(before, here) - 0.18);
    const to = Math.min(HIGH, Math.max(before, here) + 0.18);
    const secant = (value) => fHere + slope * (value - here);

    const note = [
      ["curve  f = x² − 2", "text-ink"],
      [`two guesses  ${num(before, 4)} and ${num(here, 4)}`, "text-warn"],
      [`the secant's slope  ${num(slope)}`, "text-accent"],
      [`next guess  ${num(next, 4)}`, "text-good"],
    ];

    const marks = [
      draw,
      graph(curveOf, { x, y, from: LOW, to: HIGH, class: "fig-line", width: 2.5 }),
      line({
        x1: x(from),
        y1: y(secant(from)),
        x2: x(to),
        y2: y(secant(to)),
        class: "fig-accent",
        width: 2,
      }),
      line({
        x1: x(before),
        y1: y(0),
        x2: x(before),
        y2: y(fBefore),
        class: "fig-warn",
        width: 2,
        dash: "5 4",
      }),
      line({
        x1: x(here),
        y1: y(0),
        x2: x(here),
        y2: y(fHere),
        class: "fig-warn",
        width: 2,
        dash: "5 4",
      }),
      circle({ cx: x(before), cy: y(fBefore), r: 4.5, class: "fig-warn" }),
      circle({ cx: x(here), cy: y(fHere), r: 5.5, class: "fig-warn" }),
      circle({ cx: x(next), cy: y(0), r: 5, class: "fig-good" }),
      ...note.map(([text, tone], i) =>
        label({
          x: box.x0 + 12,
          y: box.y1 + 20 + i * 20,
          text,
          anchor: "start",
          size: SIZE.tick,
          class: tone,
        }),
      ),
    ];
    svg.innerHTML = marks.join("");

    readout.textContent =
      `${step.text} The line through (${num(before, 4)}, ${num(fBefore)}) and ` +
      `(${num(here, 4)}, ${num(fHere)}) has slope ${num(slope)} and crosses at ` +
      `${num(next, 4)}. The signed error x − √2 is ${num(error)} at the older guess and ` +
      `${num(nextError)} at the crossing. The step used the two residuals and no derivative.`;
    caption.textContent =
      "The root is 1.41421. After four crossings the older guess is on one side of the " +
      "root and the newer one on the other. What decides which side the next crossing " +
      "lands on?";

    claim([
      {
        label: `residual at ${k}`,
        expression: "x**2 - 2",
        values: { x: before },
        answer: fBefore,
        shown: num(fBefore),
      },
      {
        label: `residual at ${k + 1}`,
        expression: "x**2 - 2",
        values: { x: here },
        answer: fHere,
        shown: num(fHere),
      },
      {
        label: "the secant's slope",
        expression: "(y1 - y0)/(x1 - x0)",
        values: { y1: fHere, y0: fBefore, x1: here, x0: before },
        answer: slope,
        shown: num(slope),
      },
      {
        label: "the secant crossing",
        expression: "x1 - (x1**2 - 2)*(x1 - x0)/((x1**2 - 2) - (x0**2 - 2))",
        values: { x0: before, x1: here },
        answer: crossing,
        shown: num(next, 4),
      },
      {
        label: "the error at the crossing",
        expression: "x - sqrt(2)",
        values: { x: next },
        answer: nextError,
        shown: num(nextError),
      },
    ]);
  };

  react(step, show);
}
