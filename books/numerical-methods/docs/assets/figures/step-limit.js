// The wall an explicit method walks into, drawn from the arithmetic rather than
// described.
//
// A diffusion problem discretised on N cells has an explicit step limit of order
// 1/N². The figure plots the steps needed to reach the *same* time against the
// resolution, so the wall is the shape of the curve: doubling the cells multiplies
// the steps by four. Nothing here is a measurement of a particular solver — it is
// the limit itself, which is arithmetic.
//
// The point of the figure is what it makes visible: the vertical axis is a cost, so
// a curve that turns upwards is a method that stops being affordable while the
// answer is still getting better.
import { SIZE, axes, circle, curve, fmt, label, panel } from "./kit.js";

/** The cells across the region. Doubling each time is what makes the wall visible. */
const CELLS = [10, 20, 40, 80];

/** Steps to reach a fixed time: the stable step is proportional to 1/N², so this is 2N². */
const stepsFor = (cells) => 2 * cells * cells;

export function mount(el) {
  const points = CELLS.map((cells) => ({ cells, steps: stepsFor(cells) }));
  const last = points[points.length - 1];
  const previous = points[points.length - 2];

  const { draw, x, y, box } = axes({
    width: 560,
    height: 300,
    // The left margin holds the rotated axis title *and* the tick labels. At the
    // default 56 the title ran through "5 000" and "10 000" — found by looking at a
    // capture, which is the only check that can see it.
    pad: { left: 86 },
    x: { domain: [0, 90], ticks: 4 },
    y: { domain: [0, 14000], ticks: 4 },
  });

  const marks =
    draw +
    curve(
      points.map((point) => [point.cells, point.steps]),
      // `fig-line`, not `fig-accent`: a `fig-*` class that fills paints an open
      // path as a closed shape, so the curve arrived as a solid wedge. `fig-line`
      // is the class whose fill is `none`.
      { x, y, class: "fig-line" },
    ) +
    points
      .map((point) =>
        circle({ cx: x(point.cells), cy: y(point.steps), r: 5, class: "fig-accent" }),
      )
      .join("") +
    label({
      x: box.x0 + 14,
      y: box.y1 + 20,
      text: "twice the cells,",
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    }) +
    label({
      x: box.x0 + 14,
      y: box.y1 + 38,
      text: "four times the steps",
      anchor: "start",
      size: SIZE.tick,
      class: "text-accent",
    }) +
    label({
      x: (box.x0 + box.x1) / 2,
      y: box.y0 + 34,
      text: "cells across the region",
      size: SIZE.label,
      class: "text-ink",
    }) +
    label({
      x: 16,
      y: (box.y0 + box.y1) / 2,
      text: "steps to reach the same time",
      size: SIZE.label,
      class: "text-ink",
      rotate: -90,
    });

  const { svg, readout, caption, claim } = panel(el, {
    label: "The explicit time-step limit against the number of cells",
    description:
      "Steps needed to reach a fixed time, against the number of cells across the " +
      "region. Ten cells need two hundred steps; twenty need eight hundred; forty " +
      "need three thousand two hundred; eighty need twelve thousand eight hundred. " +
      "Each doubling of the resolution multiplies the steps by four.",
    width: 560,
    height: 300,
  });
  if (!svg) throw new Error("step-limit: the frame has no drawing surface");
  svg.innerHTML = marks;

  readout.textContent =
    `At ${last.cells} cells the explicit limit needs ${fmt(last.steps, 0)} steps to ` +
    `reach the same time; at ${previous.cells} it needed ${fmt(previous.steps, 0)}. ` +
    "Four times the work for twice the resolution is the wall, not a tuning problem.";
  caption.textContent =
    "The stable step falls as the square of the cell size, so the cost rises as its " +
    "square; the constant is set to one, and the shape is what matters. An implicit " +
    "method has no limit of this kind: it pays a linear solve at every step instead.";

  // The two numbers the readout prints, declared rather than typed: the arithmetic
  // is the model, and the verifier evaluates it exactly.
  claim(
    points.map((point) => ({
      label: `steps at ${point.cells} cells`,
      expression: "2 * n**2",
      values: { n: point.cells },
      answer: point.steps,
      shown: fmt(point.steps, 0),
    })),
  );
}
