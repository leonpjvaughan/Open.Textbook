// A rate is a line, and the slope is the order.
//
// The two error models behind the page are E = (e/2)h for the forward difference
// and E = (e/6)h² for the central one. On log-log axes those are straight lines
// with slopes 1 and 2, so the figure is the arithmetic rather than a measurement
// of a particular run. A reader can see why halving the step divides the central
// error by four and the forward error by two.
import { SIZE, axes, circle, curve, label, panel } from "./kit.js";

const FORWARD = Math.log10(Math.E / 2);
const CENTRAL = Math.log10(Math.E / 6);
const STEPS = [-2, -1, 0];

const forward = STEPS.map((h) => [h, h + FORWARD]);
const central = STEPS.map((h) => [h, 2 * h + CENTRAL]);

export function mount(el) {
  const { svg, readout, caption } = panel(el, {
    label: "Error against step size for two difference formulas",
    description:
      "Log-log plot. The forward difference has slope one: halving the step " +
      "halves the error. The central difference has slope two: halving the step " +
      "divides the error by four.",
    width: 560,
    height: 300,
  });
  if (!svg) throw new Error("order-rate: the frame has no drawing surface");

  const { draw, x, y, box } = axes({
    width: 560,
    height: 300,
    pad: { left: 76, bottom: 52 },
    x: { domain: [-2.2, 0.5], ticks: 3 },
    y: { domain: [-5, 1.2], ticks: 3 },
  });

  const marks =
    draw +
    curve(forward, { x, y, class: "fig-line" }) +
    curve(central, { x, y, class: "fig-line" }) +
    forward
      .map(([h, e]) => circle({ cx: x(h), cy: y(e), r: 5, class: "fig-accent" }))
      .join("") +
    central
      .map(([h, e]) => circle({ cx: x(h), cy: y(e), r: 3, class: "fig-ink" }))
      .join("") +
    label({
      x: x(0.1),
      y: y(0.8),
      text: "order 1",
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    }) +
    label({
      x: x(0.1),
      y: y(0.38),
      text: "order 2",
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    }) +
    label({
      x: (box.x0 + box.x1) / 2,
      y: box.y0 + 34,
      text: "log10 of the step h",
      size: SIZE.label,
      class: "text-ink",
    }) +
    label({
      x: 18,
      y: (box.y0 + box.y1) / 2,
      text: "log10 of the error",
      size: SIZE.label,
      class: "text-ink",
      rotate: -90,
    });

  svg.innerHTML = marks;
  readout.textContent =
    "Forward: slope 1, so halving h halves the error. " +
    "Central: slope 2, so halving h divides the error by four.";
  caption.textContent =
    "Both lines are the leading term of the error, not a measured run: " +
    "E = (e/2)h and E = (e/6)h². The constant sets the height, and the " +
    "exponent sets the slope.";
}
