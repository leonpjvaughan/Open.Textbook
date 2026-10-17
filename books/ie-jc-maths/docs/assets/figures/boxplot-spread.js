// A box plot whose five values the reader sets, with the two quartiles dragged
// directly.
//
// Section 22.6 defines the interquartile range as the spread of the middle half, and
// the sentence is the whole difficulty: "the middle half" is a picture, and the box is
// that picture. So the reader drags the lower and the upper quartile and watches the
// width of the box, and the readout names the interquartile range as the two numbers
// that produced it. The whiskers keep the range visible beside it, so the difference
// between the two measures of spread is on one drawing.
//
// A pointer is not a keyboard, so each handle has a slider behind it: the slider holds
// the value and provides the keyboard path, and the handle is the enhancement. That is
// `draggable()`'s contract rather than this module's choice.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { SIZE, coord, draggable, fmt, label, line, numberLine, panel, path, react, slider } from "./kit.js";

const ROW = 70; // the vertical centre of the box
const BOX = 25; // half the height of the box
const CAP = 16; // half the height of a whisker cap
const SVG_NS = "http://www.w3.org/2000/svg";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A box plot whose five values are set by the reader",
    description:
      "A box plot on a scale from nought to one hundred. The box runs from the lower " +
      "quartile to the upper quartile, with the median marked inside it, and a whisker " +
      "reaches from each end of the box to the lowest and the highest value. The lower and " +
      "upper quartiles can be dragged, and every value has a slider below. The " +
      "interquartile range is given in the readout.",
    prompt: "Predict what happens to the interquartile range when you move the lower quartile to the left.",
    width: 560,
    height: 200,
  });

  const lowest = slider(el, { id: "lowest", label: "Lowest value", min: 0, max: 100, step: 1, value: 20, show: true });
  const lower = slider(el, { id: "lower", label: "Lower quartile Q1", min: 0, max: 100, step: 1, value: 40, show: true });
  const middle = slider(el, { id: "median", label: "Median Q2", min: 0, max: 100, step: 1, value: 55, show: true });
  const upper = slider(el, { id: "upper", label: "Upper quartile Q3", min: 0, max: 100, step: 1, value: 70, show: true });
  const highest = slider(el, { id: "highest", label: "Highest value", min: 0, max: 100, step: 1, value: 90, show: true });
  const order = [lowest, lower, middle, upper, highest];

  const { draw, x } = numberLine({ width: 520, min: 0, max: 100, step: 11, label: "score", height: 200 });

  // The drawing and the handles are separate layers, so a handle keeps its identity
  // and its drag binding while the marks behind it are redrawn.
  const marks = document.createElementNS(SVG_NS, "g");
  const handles = document.createElementNS(SVG_NS, "g");
  svg.append(marks, handles);
  const handleLower = document.createElementNS(SVG_NS, "circle");
  const handleUpper = document.createElementNS(SVG_NS, "circle");
  for (const handle of [handleLower, handleUpper]) {
    handle.setAttribute("r", "9");
    handle.setAttribute("class", "fig-accent");
    handle.setAttribute("cy", String(ROW));
    handles.append(handle);
  }
  draggable(handleLower, { control: lower, svg, toValue: (point) => Math.round(x.invert(point.x)) });
  draggable(handleUpper, { control: upper, svg, toValue: (point) => Math.round(x.invert(point.x)) });

  // A control may only move between its two neighbours, so the five values stay in
  // order however they are moved. The listener runs before `react`'s redraw because it
  // is registered first, and a clamped value tells the panel so the slider's own
  // number follows.
  function clampTo(control) {
    const index = order.indexOf(control);
    const low = index > 0 ? Number(order[index - 1].value) : 0;
    const high = index < order.length - 1 ? Number(order[index + 1].value) : 100;
    const wanted = Math.max(low, Math.min(Number(control.value), high));
    if (wanted !== Number(control.value)) {
      control.value = String(wanted);
      control.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
  for (const control of order) control.addEventListener("input", () => clampTo(control));

  function update() {
    const lo = Number(lowest.value);
    const q1 = Number(lower.value);
    const q2 = Number(middle.value);
    const q3 = Number(upper.value);
    const hi = Number(highest.value);

    let drawing = draw;
    // The whiskers: the lowest value to Q1, and Q3 to the highest value.
    drawing += line({ x1: x(lo), y1: ROW, x2: x(hi), y2: ROW, class: "fig-ink", width: 2 });
    drawing += line({ x1: x(lo), y1: ROW - CAP, x2: x(lo), y2: ROW + CAP, class: "fig-ink", width: 2 });
    drawing += line({ x1: x(hi), y1: ROW - CAP, x2: x(hi), y2: ROW + CAP, class: "fig-ink", width: 2 });

    // The box, which is the middle half, and the median inside it.
    drawing += path({
      d:
        `M${coord(x(q1))} ${coord(ROW - BOX)} L${coord(x(q3))} ${coord(ROW - BOX)} ` +
        `L${coord(x(q3))} ${coord(ROW + BOX)} L${coord(x(q1))} ${coord(ROW + BOX)} Z`,
      class: "fig-accent",
      width: 2.6,
    });
    drawing += line({ x1: x(q2), y1: ROW - BOX, x2: x(q2), y2: ROW + BOX, class: "fig-warn", width: 3 });

    drawing += label({ x: x(q1), y: ROW - BOX - 12, text: "Q1", size: SIZE.tick, class: "text-accent" });
    drawing += label({ x: x(q3), y: ROW - BOX - 12, text: "Q3", size: SIZE.tick, class: "text-accent" });
    drawing += label({ x: x(q2), y: ROW + BOX + 16, text: "median", size: SIZE.tick, class: "text-warn" });

    marks.innerHTML = drawing;
    handleLower.setAttribute("cx", coord(x(q1)));
    handleUpper.setAttribute("cx", coord(x(q3)));

    readout.textContent =
      `The box runs from ${fmt(q1)} to ${fmt(q3)}, so the interquartile range is ${fmt(q3 - q1)}. ` +
      `The middle half of the values lie between ${fmt(q1)} and ${fmt(q3)}. ` +
      `The range runs from ${fmt(lo)} to ${fmt(hi)}, which is ${fmt(hi - lo)}.`;
  }

  react(order, update);
}
