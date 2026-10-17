// Direct and inverse proportion drawn on one pair of axes.
//
// Section 6.3 teaches the unitary method: find the value of one unit, then
// multiply. It also warns that not every pair of quantities grows together, and
// that more workers mean less time. The two relationships look nothing alike on a
// graph, and that is the whole idea this figure exists for. The reader sets the
// value of one unit and the number of units, and reads both values at once.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, and the two curves differ in line style as well as in class, so
// the distinction never depends on colour alone.
import { SIZE, axes, dots, fmt, graph, label, line, panel, react, slider } from "./kit.js";

const X_MAX = 10;
const Y_MAX = 40;

export function mount(el) {
  const { svg, readout, caption } = panel(el, {
    label: "A straight line for direct proportion and a falling curve for inverse proportion, on one pair of axes",
    description:
      "One graph is a straight line from the origin: as the number of units grows, the value grows " +
      "with it. The other graph curves down towards the axes: as the number of units grows, the value " +
      "falls. The value of one unit and the number of units are set with the controls, and both values " +
      "are given in the readout.",
    prompt: "Predict which of the two graphs is a straight line. Then move the controls and check.",
    width: 560,
    height: 320,
  });

  const constant = slider(el, { id: "k", label: "Value of one unit", min: 1, max: 4, step: 1, value: 2, show: true });
  const amount = slider(el, { id: "x", label: "Number of units", min: 1, max: X_MAX, step: 1, value: 4, show: true });

  const { draw, x, y, box } = axes({
    width: 560,
    height: 320,
    pad: { left: 58, right: 26, top: 26, bottom: 46 },
    x: { domain: [0, X_MAX], ticks: 5, label: "number of units", tickFormat: (v) => fmt(v, 0) },
    y: { domain: [0, Y_MAX], ticks: 5, label: "value", tickFormat: (v) => fmt(v, 0) },
  });

  caption.textContent = "The solid line is direct proportion. The dashed line is inverse proportion.";

  function update() {
    const k = Number(constant.value);
    const n = Number(amount.value);

    let drawing = draw;
    drawing += graph((v) => k * v, { x, y, from: 0, to: X_MAX, class: "fig-accent", width: 2.6 });
    drawing += graph((v) => k / v, { x, y, from: 0.4, to: X_MAX, class: "fig-good", width: 2.6, dash: "7 5" });

    // The reader's number of units, marked so both values can be read against it.
    drawing += line({ x1: x(n), y1: box.y0, x2: x(n), y2: box.y1, class: "fig-grid", width: 1.4, dash: "3 3" });
    drawing += dots([[n, k * n]], { x, y, r: 5.5, class: "fig-accent" });
    drawing += dots([[n, k / n]], { x, y, r: 5.5, class: "fig-good" });

    drawing += label({ x: x(X_MAX) - 6, y: y(k * X_MAX) - 10, text: "direct", size: SIZE.tick, class: "text-accent", anchor: "end" });
    drawing += label({ x: x(X_MAX) - 6, y: y(k / X_MAX) + 22, text: "inverse", size: SIZE.tick, class: "text-good", anchor: "end" });

    svg.innerHTML = drawing;

    readout.textContent =
      `One unit is ${fmt(k, 0)}. Direct proportion: ${fmt(n, 0)} unit${n === 1 ? "" : "s"} give ${fmt(k * n, 0)}. ` +
      `Inverse proportion: the product stays ${fmt(k, 0)}, so x = ${fmt(n, 0)} gives y = ${fmt(k / n, 3)}. ` +
      `The direct graph rises in a straight line, and the inverse graph curves down.`;
  }

  react([constant, amount], update);
}
