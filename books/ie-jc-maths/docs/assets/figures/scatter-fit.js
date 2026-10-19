// Tier-1 guided investigation: placing the line of best fit on a scatter graph.
//
// Section 22.7 gives one criterion for the line of best fit — roughly the same number
// of points above it as below — and that criterion is a picture, not a number. So the
// figure uses the survey data from the chapter problem, draws a line the reader
// controls, and counts the points on each side. The reader moves the line until the
// two counts are close, which is the procedure the page teaches, performed rather than
// described.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import {
  axes,
  dots,
  fmt,
  label,
  line,
  panel,
  quantity,
  react,
  slider,
} from "./kit.js";

// The twenty pairs from the chapter problem: screen time in hours, sleep in hours.
const DATA = [
  [1, 9], [1, 10], [2, 9], [2, 10], [2, 8], [3, 8], [3, 8], [3, 9], [4, 7], [4, 8],
  [4, 8], [5, 7], [5, 6], [5, 7], [6, 6], [6, 7], [7, 5], [7, 6], [8, 5], [8, 5],
];

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A scatter graph of screen time against sleep for twenty students, with a line of best fit the reader can move",
    description:
      "Each point is one student, with screen time along the bottom and sleep up the side. A straight " +
      "line crosses the graph, and a thin gap joins every point to the line. The line follows the trend " +
      "when about the same number of points sit above it as below.",
    prompt: "Predict where the line should sit before you move it, then change the two controls and count the points each side.",
    width: 560,
    height: 340,
  });

  const steepness = slider(el, { id: "steepness", label: "Steepness of the line", min: -1.5, max: 0.5, step: 0.05, value: -0.4, show: true });
  const height = slider(el, { id: "height", label: "Height of the line at 0 hours", min: 6, max: 13, step: 0.25, value: 9.5, show: true });

  function update() {
    const m = Number(steepness.value);
    const c = Number(height.value);
    const value = (x) => m * x + c;

    const { draw, x, y, box } = axes({
      width: 560,
      height: 340,
      pad: { left: 62, right: 26, top: 24, bottom: 52 },
      x: { domain: [0, 9], label: "screen time (hours)", ticks: 10, tickFormat: (v) => fmt(v, 0) },
      y: { domain: [4, 11], label: "sleep (hours)", ticks: 8, tickFormat: (v) => fmt(v, 0) },
    });

    let drawing = draw;
    // The gaps first, so the points and the line sit on top of them.
    for (const [px, py] of DATA) {
      drawing += line({ x1: x(px), y1: y(py), x2: x(px), y2: y(value(px)), class: "fig-grid", width: 1, dash: "3 3" });
    }
    drawing += line({ x1: x(0), y1: y(value(0)), x2: x(9), y2: y(value(9)), class: "fig-accent", width: 2.5 });
    drawing += dots(DATA, { x, y, r: 5, class: "fig-ink" });
    drawing += label({
      x: box.x1 - 6,
      y: y(value(9)) - 10,
      text: `y = ${fmt(m, 2)}x ${c < 0 ? "\u2212" : "+"} ${fmt(Math.abs(c), 2)}`,
      size: 16,
      class: "text-accent",
      anchor: "end",
    });
    svg.innerHTML = drawing;

    let above = 0;
    let below = 0;
    for (const [px, py] of DATA) {
      if (py > value(px) + 1e-9) above += 1;
      else if (py < value(px) - 1e-9) below += 1;
    }
    const onLine = DATA.length - above - below;
    const balance = Math.abs(above - below);
    const verdict =
      balance <= 2
        ? "That is a good balance, so the line follows the trend."
        : `Move the line so the two counts are closer: ${above > below ? "lower" : "raise"} it, or make it steeper, and watch which points change side.`;

    readout.textContent =
      `${above} of the ${DATA.length} points are above your line and ${below} are below it` +
      (onLine ? `, with ${onLine} exactly on it` : "") +
      `. ${verdict} ` +
      `The points fall from left to right and lie close to a straight line, so the correlation is negative and strong. ` +
      `The line lets you estimate a value that was not measured: at 6 hours of screen time it gives about ${quantity(value(6), "hours", 1)} of sleep.`;
  }

  react([steepness, height], update);
}
