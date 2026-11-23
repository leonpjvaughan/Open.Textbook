// Bisection, drawn as the bracket it is: two ends with opposite signs, a midpoint,
// and the half that survives.
//
// The page's claim is that a bracket makes a step certain: the answer cannot leave
// the interval, and the interval halves. So the figure draws the interval as a band,
// the midpoint on the curve, and prints the signs that choose the half to keep. Every
// number comes from the same polynomial the page's technique table names.
import { SIZE, axes, circle, graph, label, line, panel, react, rect, sigfig, stepper } from "./kit.js";

const WIDTH = 560;
const HEIGHT = 320;
const LOW = 1.98;
const HIGH = 2.52;

/** The cubic the root page's worked figures use, with a bracket either side of its root. */
const curveOf = (x) => x * x * x - 2 * x - 5;
const START = [2, 2.5];
const HALVINGS = 5;

/** One bracket per frame, each produced by the sign of the last midpoint. */
function brackets(count) {
  const out = [];
  let [a, b] = START;
  for (let i = 0; i <= count; i += 1) {
    const m = (a + b) / 2;
    out.push({ a, b, m, fa: curveOf(a), fb: curveOf(b), fm: curveOf(m) });
    // A midpoint with the sign of the left end puts the change in [m, b]; otherwise
    // the change is in [a, m].
    if (Math.sign(curveOf(m)) === Math.sign(curveOf(a))) a = m;
    else b = m;
  }
  return out;
}

const BRACKETS = brackets(HALVINGS);

/** A number as this figure prints it: a minus sign the reader recognises. */
const minus = (text) => String(text).replace("-", "\u2212");
const num = (value, figures = 3) => minus(sigfig(value, figures));
const place = (value) => minus(String(Number(value.toFixed(8))));

export function mount(el) {
  const { svg, readout, caption, claim } = panel(el, {
    label: "Bisection halving a bracket that holds one sign change",
    description:
      "The curve f of x equals x cubed minus two x minus five. A shaded band marks the " +
      "bracket: two x values where the curve is on opposite sides of the axis. The " +
      "midpoint is marked on the curve, and the next step keeps the half whose end still " +
      "has the opposite sign to the midpoint. Each step halves the shaded band.",
    prompt:
      "Predict: f(2) is about minus one and f(2.5) is about five point six. The midpoint " +
      "2.25 gives about one point nine. Which half of the bracket holds the root?",
    width: WIDTH,
    height: HEIGHT,
  });
  if (!svg) throw new Error("bisection-bracket: the frame has no drawing surface");

  const { draw, x, y, box } = axes({
    width: WIDTH,
    height: HEIGHT,
    pad: { left: 62, right: 22, top: 26, bottom: 48 },
    x: { domain: [LOW, HIGH], ticks: 4 },
    y: { domain: [-1.4, 6.4], ticks: 4 },
    origin: true,
    grid: false,
  });

  const step = stepper(el, {
    label: "Halving",
    id: "bisection-halving",
    steps: BRACKETS.map(() => ({ text: "Halve the bracket at its midpoint." })),
  });

  const show = () => {
    const k = Math.min(step.index, BRACKETS.length - 1);
    const state = BRACKETS[k];
    const width = state.b - state.a;
    const sameSign = Math.sign(state.fm) === Math.sign(state.fa);
    const kept = sameSign ? [state.m, state.b] : [state.a, state.m];
    const word = sameSign ? "right" : "left";

    const note = [
      [`bracket  [${place(state.a)}, ${place(state.b)}]`, "text-ink"],
      [`f(a) = ${num(state.fa)}   f(b) = ${num(state.fb)}`, "text-ink"],
      [`width  ${place(width)}`, "text-ink"],
      [`midpoint  ${place(state.m)}   f(m) = ${num(state.fm)}`, "text-accent"],
      [`keep the ${word} half`, "text-good"],
    ];

    const marks = [
      draw,
      rect({
        x: x(state.a),
        y: box.y1,
        width: Math.max(1, x(state.b) - x(state.a)),
        height: box.y0 - box.y1,
        class: "fig-grid",
        opacity: 0.18,
      }),
      graph(curveOf, { x, y, from: LOW, to: HIGH, class: "fig-line", width: 2.5 }),
      line({
        x1: x(state.a),
        y1: y(0),
        x2: x(state.a),
        y2: y(state.fa),
        class: "fig-ink",
        width: 1.4,
        dash: "4 3",
      }),
      line({
        x1: x(state.b),
        y1: y(0),
        x2: x(state.b),
        y2: y(state.fb),
        class: "fig-ink",
        width: 1.4,
        dash: "4 3",
      }),
      line({
        x1: x(state.m),
        y1: y(0),
        x2: x(state.m),
        y2: y(state.fm),
        class: "fig-accent",
        width: 2,
        dash: "5 4",
      }),
      circle({ cx: x(state.a), cy: y(state.fa), r: 4.5, class: "fig-ink" }),
      circle({ cx: x(state.b), cy: y(state.fb), r: 4.5, class: "fig-ink" }),
      circle({ cx: x(state.m), cy: y(state.fm), r: 5, class: "fig-accent" }),
      circle({ cx: x(state.m), cy: y(0), r: 3.5, class: "fig-accent" }),
      label({
        x: x(state.m),
        y: y(0) + 30,
        text: "m",
        size: SIZE.tick,
        class: "text-accent",
      }),
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
      `${step.text} The bracket is [${place(state.a)}, ${place(state.b)}], ` +
      `${place(width)} wide, and its ends have opposite signs: f(a) = ${num(state.fa)} and ` +
      `f(b) = ${num(state.fb)}. The midpoint ${place(state.m)} gives f(m) = ` +
      `${num(state.fm)}, the same sign as ${sameSign ? "f(a)" : "f(b)"}, so the ${word} half ` +
      `is kept: [${place(kept[0])}, ${place(kept[1])}].`;
    caption.textContent =
      `Five halvings divide the width by 32. Why can this method never lose the root, and ` +
      "why does that certainty cost it speed?";

    claim([
      {
        label: "the width of the bracket",
        expression: "b - a",
        values: { a: state.a, b: state.b },
        answer: width,
        shown: place(width),
      },
      {
        label: "the width after k halvings",
        expression: "(b - a)/2**k",
        values: { a: START[0], b: START[1], k },
        answer: width,
        shown: place(width),
      },
      {
        label: "the midpoint",
        expression: "(a + b)/2",
        values: { a: state.a, b: state.b },
        answer: state.m,
        shown: place(state.m),
      },
      {
        label: "the residual at the midpoint",
        expression: "m**3 - 2*m - 5",
        values: { m: state.m },
        answer: state.fm,
        shown: num(state.fm),
      },
      {
        label: "the residual at the left end",
        expression: "a**3 - 2*a - 5",
        values: { a: state.a },
        answer: state.fa,
        shown: num(state.fa),
      },
      {
        label: "the residual at the right end",
        expression: "b**3 - 2*b - 5",
        values: { b: state.b },
        answer: state.fb,
        shown: num(state.fb),
      },
    ]);
  };

  react(step, show);
}
