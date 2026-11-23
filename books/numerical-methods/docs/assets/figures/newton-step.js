// One Newton step, drawn on the curve rather than described.
//
// The page derives the step from the tangent line; this figure is the line itself.
// The tangent at the current guess is drawn until it crosses the axis, the residual
// stands as a vertical segment from the curve to that axis, and the reader advances
// one step at a time. The iterates are computed by the step, so the picture cannot
// disagree with the formula beside it.
import { SIZE, axes, circle, graph, label, line, panel, react, sigfig, stepper } from "./kit.js";

const WIDTH = 560;
const HEIGHT = 320;
const LOW = 0.9;
const HIGH = 1.65;

/** The page's worked number: f(x) = x² − 2, so the root is √2. */
const ROOT = Math.SQRT2;
const curveOf = (x) => x * x - 2;
const slopeOf = (x) => 2 * x;

/** The iterates, produced by the step rather than typed into the drawing. */
function sequence(count) {
  const out = [1];
  for (let i = 0; i < count; i += 1) out.push(out[i] - curveOf(out[i]) / slopeOf(out[i]));
  return out;
}

const STEPS = sequence(3);

/** A number as this figure prints it: a minus sign the reader recognises. */
const minus = (text) => String(text).replace("-", "\u2212");
const num = (value, figures = 3) => minus(sigfig(value, figures));

export function mount(el) {
  const { svg, readout, caption, claim } = panel(el, {
    label: "One Newton step from a guess, with the tangent, the residual and the next guess",
    description:
      "The curve f of x equals x squared minus two, with the tangent drawn at the current " +
      "guess. The tangent crosses the axis at the next guess. A dashed vertical segment " +
      "shows the residual, which is how far the curve sits from the axis at the guess. " +
      "Stepping forward moves the guess to the crossing and draws the next tangent.",
    prompt:
      "Predict: from x = 1, the tangent crosses at 1.5. Will the tangent taken there cross " +
      "above 1.42 or below it?",
    width: WIDTH,
    height: HEIGHT,
  });
  if (!svg) throw new Error("newton-step: the frame has no drawing surface");

  const { draw, x, y, box } = axes({
    width: WIDTH,
    height: HEIGHT,
    pad: { left: 62, right: 22, top: 26, bottom: 48 },
    x: { domain: [LOW, HIGH], ticks: 4 },
    y: { domain: [-1.3, 0.85], ticks: 4 },
    origin: true,
    grid: false,
  });

  const step = stepper(el, {
    label: "Newton step",
    id: "newton-step",
    steps: STEPS.slice(1).map((_, i) => ({
      text: `Step ${i + 1}: take the tangent at x${i} and read x${i + 1} where it crosses.`,
    })),
  });

  const show = () => {
    const k = Math.min(step.index, STEPS.length - 1);
    const here = STEPS[k];
    const next = STEPS[k + 1];
    const residual = curveOf(here);
    const slope = slopeOf(here);
    const crossing = here - residual / slope;
    const error = here - ROOT;
    const nextError = next - ROOT;
    const ratio = nextError / (error * error);

    // The tangent runs a little either side of the two guesses it connects, so the
    // line reads as a line and not as the step's own segment.
    const from = Math.min(here, next) - 0.05;
    const to = Math.max(here, next) + 0.05;
    const tangent = (value) => residual + slope * (value - here);

    const note = [
      ["curve  f = x² − 2", "text-ink"],
      ["tangent at the guess", "text-accent"],
      [`residual  f = ${num(residual)}`, "text-warn"],
      [`guess  x = ${num(here, 4)}`, "text-ink"],
      [`next  x = ${num(next, 4)}`, "text-good"],
    ];

    const marks = [
      draw,
      graph(curveOf, { x, y, from: LOW, to: HIGH, class: "fig-line", width: 2.5 }),
      line({
        x1: x(from),
        y1: y(tangent(from)),
        x2: x(to),
        y2: y(tangent(to)),
        class: "fig-accent",
        width: 2,
      }),
      line({
        x1: x(here),
        y1: y(0),
        x2: x(here),
        y2: y(residual),
        class: "fig-warn",
        width: 2.5,
        dash: "5 4",
      }),
      circle({ cx: x(here), cy: y(residual), r: 5, class: "fig-accent" }),
      circle({ cx: x(here), cy: y(0), r: 4, class: "fig-ink" }),
      circle({ cx: x(next), cy: y(0), r: 5, class: "fig-good" }),
      ...note.map(([text, tone], i) =>
        label({
          x: box.x0 + 12,
          y: box.y1 + 14 + i * 18,
          text,
          anchor: "start",
          size: SIZE.tick,
          class: tone,
        }),
      ),
    ];
    svg.innerHTML = marks.join("");

    const ratioNote = k > 0 ? `: dividing by the square of the old error gives ${num(ratio)}.` : ".";
    readout.textContent =
      `${step.text} At x${k} = ${num(here, 4)} the residual is f = ${num(residual)} and the ` +
      `slope is ${num(slope)}; the crossing is x${k + 1} = ${num(next, 4)}. The signed error ` +
      `x − √2 moves from ${num(error)} to ${num(nextError)}${ratioNote}`;
    caption.textContent =
      "The root is 1.41421. Why is the third step so much better than the second, when " +
      "the second was only a little better than the first?";

    claim([
      {
        label: `residual at x${k}`,
        expression: "x**2 - 2",
        values: { x: here },
        answer: residual,
        shown: num(residual),
      },
      {
        label: `tangent crossing from x${k}`,
        expression: "x - (x**2 - 2)/(2*x)",
        values: { x: here },
        answer: crossing,
        shown: num(next, 4),
      },
      {
        label: `error at x${k}`,
        expression: "x - sqrt(2)",
        values: { x: here },
        answer: error,
        shown: num(error),
      },
      {
        label: `error at x${k + 1}`,
        expression: "x - sqrt(2)",
        values: { x: next },
        answer: nextError,
        shown: num(nextError),
      },
      ...(k > 0
        ? [
            {
              label: "the squared-error ratio",
              expression: "(next - sqrt(2))/(x - sqrt(2))**2",
              values: { x: here, next },
              answer: ratio,
              shown: num(ratio),
            },
          ]
        : []),
    ]);
  };

  react(step, show);
}
