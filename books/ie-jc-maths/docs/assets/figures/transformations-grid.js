// A triangle on a coordinate grid, with the mirror line chosen from a list, so the
// four reflection rules of Section 19.2 can be read off one drawing.
//
// The page gives the rules as three formulas and two more for the lines x = k and
// y = k. A formula is a sentence about a point, and the point is what the reader
// cannot see: which coordinate changes, and by how much. So the figure draws the
// object, its image and the dashed line joining each corner to its own image, and
// lets the reader choose the mirror line and slide the shape across. The rule for the
// chosen line is named in the readout beside the coordinates it produces.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { SIZE, axes, chooser, coord, fmt, label, line, panel, path, react, slider } from "./kit.js";

// The object triangle, before the reader slides it. The corner A is the one the
// readout follows.
const BASE = [
  [1, 2],
  [3, 2],
  [1, 4],
];
const NAMES = ["A", "B", "C"];

// The mirror lines the page teaches, each with its coordinate rule.
const MIRRORS = {
  xaxis: {
    text: "The mirror line is the x-axis. A reflection in it keeps the x-coordinate and changes the sign of the y-coordinate.",
    apply: ([px, py]) => [px, -py],
  },
  yaxis: {
    text: "The mirror line is the y-axis. A reflection in it changes the sign of the x-coordinate and keeps the y-coordinate.",
    apply: ([px, py]) => [-px, py],
  },
  yx: {
    text: "The mirror line is y = x. A reflection in it swaps the two coordinates.",
    apply: ([px, py]) => [py, px],
  },
  x2: {
    text: "The mirror line is x = 2. The image is as far to the right of the line as the object is to the left.",
    apply: ([px, py]) => [4 - px, py],
  },
  y1: {
    text: "The mirror line is y = 1. The image is as far above the line as the object is below.",
    apply: ([px, py]) => [px, 2 - py],
  },
};

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A triangle and its image on a coordinate grid, with the mirror line chosen by the reader",
    description:
      "A coordinate grid from minus six to six. A triangle is drawn in one colour and its " +
      "reflection in another. The mirror line is chosen from a list, and dashed lines join " +
      "each corner of the triangle to its image. The coordinates of the image are given in " +
      "the readout below.",
    prompt: "Predict where the corner A at (1, 2) lands when you reflect the shape in the line y = x.",
    width: 560,
    height: 420,
  });

  const mirror = chooser(el, {
    id: "mirror",
    label: "Mirror line",
    name: "The line the shape is reflected in",
    choices: [
      { value: "xaxis", label: "the x-axis" },
      { value: "yaxis", label: "the y-axis" },
      { value: "yx", label: "the line y = x" },
      { value: "x2", label: "the line x = 2" },
      { value: "y1", label: "the line y = 1" },
    ],
    value: "xaxis",
  });

  const corner = slider(el, {
    id: "corner",
    label: "x-coordinate of the corner A",
    min: 1,
    max: 3,
    step: 1,
    value: 1,
    show: true,
    name: "The x-coordinate of the corner A, from 1 to 3",
  });

  // The x domain is wider than the y domain by the ratio of the drawing box, so one
  // unit is the same length on both axes and the line y = x really does run at 45°.
  const { draw, x, y } = axes({
    width: 560,
    height: 420,
    pad: { left: 56, right: 26, top: 24, bottom: 44 },
    x: { domain: [-6.8, 6.8], ticks: 14 },
    y: { domain: [-5, 5], ticks: 11 },
    origin: true,
  });

  /** The outline of a shape, as path data through the axes' own mappers. */
  function outline(points) {
    return (
      points.map(([px, py], i) => `${i ? "L" : ""}${coord(x(px))} ${coord(y(py))}`).join(" ") + " Z"
    );
  }

  /** A label just outside a shape's own corner, so it never sits on the outline. */
  function outside(point, centroid) {
    const dx = point[0] - centroid[0];
    const dy = point[1] - centroid[1];
    const length = Math.hypot(dx, dy) || 1;
    return [point[0] + (dx / length) * 0.7, point[1] + (dy / length) * 0.7];
  }

  function update() {
    const chosen = MIRRORS[mirror.value] || MIRRORS.xaxis;
    const shift = Number(corner.value) - BASE[0][0];
    const object = BASE.map(([px, py]) => [px + shift, py]);
    const image = object.map(chosen.apply);

    let drawing = draw;

    // The mirror line, dashed so it reads as a line of reflection and not as a side.
    if (mirror.value === "xaxis") {
      drawing += line({ x1: x(-6.8), y1: y(0), x2: x(6.8), y2: y(0), class: "fig-warn", width: 2, dash: "7 5" });
    } else if (mirror.value === "yaxis") {
      drawing += line({ x1: x(0), y1: y(-5), x2: x(0), y2: y(5), class: "fig-warn", width: 2, dash: "7 5" });
    } else if (mirror.value === "yx") {
      drawing += line({ x1: x(-5), y1: y(-5), x2: x(5), y2: y(5), class: "fig-warn", width: 2, dash: "7 5" });
    } else if (mirror.value === "x2") {
      drawing += line({ x1: x(2), y1: y(-5), x2: x(2), y2: y(5), class: "fig-warn", width: 2, dash: "7 5" });
    } else {
      drawing += line({ x1: x(-6.8), y1: y(1), x2: x(6.8), y2: y(1), class: "fig-warn", width: 2, dash: "7 5" });
    }

    // A dashed line from every corner to its own image, so the pairing is visible.
    for (let i = 0; i < object.length; i += 1) {
      drawing += line({
        x1: x(object[i][0]),
        y1: y(object[i][1]),
        x2: x(image[i][0]),
        y2: y(image[i][1]),
        class: "fig-grid",
        width: 1.4,
        dash: "4 4",
      });
    }

    drawing += path({ d: outline(object), class: "fig-accent", width: 2.6 });
    drawing += path({ d: outline(image), class: "fig-good", width: 2.6 });

    const objectCentre = [
      object.reduce((sum, p) => sum + p[0], 0) / object.length,
      object.reduce((sum, p) => sum + p[1], 0) / object.length,
    ];
    const imageCentre = [
      image.reduce((sum, p) => sum + p[0], 0) / image.length,
      image.reduce((sum, p) => sum + p[1], 0) / image.length,
    ];
    for (let i = 0; i < object.length; i += 1) {
      const from = outside(object[i], objectCentre);
      const to = outside(image[i], imageCentre);
      drawing += label({ x: x(from[0]), y: y(from[1]) + 5, text: NAMES[i], size: SIZE.value, class: "text-accent" });
      drawing += label({ x: x(to[0]), y: y(to[1]) + 5, text: `${NAMES[i]}′`, size: SIZE.value, class: "text-good" });
    }

    svg.innerHTML = drawing;

    const first = object[0];
    const imageFirst = image[0];
    readout.textContent =
      `${chosen.text} The corner A at (${fmt(first[0])}, ${fmt(first[1])}) goes to ` +
      `(${fmt(imageFirst[0])}, ${fmt(imageFirst[1])}).`;
  }

  react([mirror, corner], update);
}
