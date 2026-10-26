// The nine kinds, drawn as the shape of their answer.
//
// The home page's table says what each kind asks and what model it writes down.
// This figure adds the third thing a reader needs before the words mean anything:
// what the answer *looks* like. Five kinds return a point or a set, and four return
// a field, and the field problems differ in what the field does over time.
//
// It is deliberately not a decision tree. The book retired a tree because a reader
// who has no model is not navigating; this is a gallery, read left to right, and its
// only claim is the shape of the answer. Each panel is titled with the kind and
// signed with the noun the page uses for its result.
import { SIZE, arrow, circle, label, line, panel, path, rect } from "./kit.js";

/** The panels sit on a 3 x 3 grid. The numbers are the frame, not the data. */
const COL = [14, 194, 374];
const ROW = [10, 210, 410];
const CELL_W = 172;
const CELL_H = 190;

/** A coordinate rounded to one decimal place, as every kit drawing helper does. */
const n = (value) => Math.round(value * 10) / 10;

/** One panel's drawing box, its centre, and the room left for its two labels. */
function cell(index) {
  const x = COL[index % 3];
  const y = ROW[Math.floor(index / 3)];
  return {
    x,
    y,
    cx: x + CELL_W / 2,
    left: x + 14,
    right: x + CELL_W - 14,
    top: y + 32,
    bottom: y + 150,
  };
}

/** A sampled curve in a panel, as one path. Smooth enough at this size. */
function plot(fn, box, samples = 48) {
  let d = "";
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const x = box.left + t * (box.right - box.left);
    const y = box.bottom - fn(t) * (box.bottom - box.top);
    d += `${i === 0 ? "M" : "L"}${n(x)} ${n(y)}`;
  }
  return path({ d, class: "fig-line" });
}

/** A step pulse, the shape a hyperbolic problem carries unchanged. */
function pulse(box, from, width, height, cls, dash) {
  const x0 = box.left + from * (box.right - box.left);
  const x1 = x0 + width * (box.right - box.left);
  const top = box.bottom - height * (box.bottom - box.top);
  return path({
    d: `M${n(x0)} ${n(box.bottom)}L${n(x0)} ${n(top)}L${n(x1)} ${n(top)}L${n(x1)} ${n(box.bottom)}`,
    class: cls,
    dash,
  });
}

/** A panel's title and the noun its answer takes. */
function caption(box, title, answer) {
  return (
    label({
      x: box.cx,
      y: box.y + 20,
      text: title,
      size: SIZE.tick,
      weight: 600,
      class: "text-ink",
    }) +
    label({
      x: box.cx,
      y: box.y + 176,
      text: answer,
      size: SIZE.tick,
      class: "text-ink",
    })
  );
}

export function mount(el) {
  const marks = [];

  // 1. Optimisation: a cost with one bottom, and the best choice marked.
  {
    const box = cell(0);
    const best = box.bottom - 0.06 * (box.bottom - box.top);
    marks.push(
      plot((t) => 0.06 + 0.9 * (2 * t - 1) ** 2, box),
      circle({ cx: box.cx, cy: best, r: 5, class: "fig-accent" }),
      caption(box, "Optimisation", "best"),
    );
  }

  // 2. Averaging: a distribution, with the draws that estimate it.
  {
    const box = cell(1);
    const dots = [];
    for (let i = 0; i < 13; i += 1) {
      const t = 0.08 + (0.84 * i) / 12;
      const y = Math.exp(-((t - 0.5) ** 2) / 0.032);
      dots.push(circle({ cx: box.left + t * (box.right - box.left), cy: box.bottom - y * (box.bottom - box.top), r: 2.2, class: "fig-accent" }));
    }
    marks.push(
      line({ x1: box.left, y1: box.bottom, x2: box.right, y2: box.bottom, class: "fig-grid" }),
      plot((t) => Math.exp(-((t - 0.5) ** 2) / 0.032), box),
      ...dots,
      caption(box, "Averaging", "spread"),
    );
  }

  // 3. Eigenvalues: a discrete set of allowed values, not a curve.
  {
    const box = cell(2);
    const heights = [0.45, 0.82, 0.62];
    const bars = heights.map((h, i) => {
      const width = 13;
      const x = box.left + (0.2 + 0.3 * i) * (box.right - box.left) - width / 2;
      const top = box.bottom - h * (box.bottom - box.top);
      return rect({ x, y: top, width, height: box.bottom - top, class: "fig-accent" });
    });
    marks.push(
      line({ x1: box.left, y1: box.bottom, x2: box.right, y2: box.bottom, class: "fig-grid" }),
      ...bars,
      caption(box, "Eigenvalues", "modes"),
    );
  }

  // 4. Linear system: two rules, one point where both hold.
  {
    const box = cell(3);
    const a = box.top + 18;
    const b = box.bottom - 18;
    const c = box.bottom - 28;
    const d = box.top + 28;
    const t = (c - a) / (b - a - (d - c));
    const x = box.left + t * (box.right - box.left);
    const y = a + t * (b - a);
    marks.push(
      line({ x1: box.left, y1: a, x2: box.right, y2: b, class: "fig-line" }),
      line({ x1: box.left, y1: c, x2: box.right, y2: d, class: "fig-line" }),
      circle({ cx: x, cy: y, r: 5, class: "fig-accent" }),
      caption(box, "Linear system", "state"),
    );
  }

  // 5. Root finding: one rule, and the point where it comes out zero.
  {
    const box = cell(4);
    const mid = (box.top + box.bottom) / 2;
    marks.push(
      line({ x1: box.left, y1: mid, x2: box.right, y2: mid, class: "fig-grid" }),
      plot((t) => 0.5 + 0.45 * Math.tanh((t - 0.5) * 4), box),
      circle({ cx: box.cx, cy: mid, r: 5, class: "fig-accent" }),
      caption(box, "Root finding", "point"),
    );
  }

  // 6. Saddle point: a block system, with the zero block that causes the trouble.
  {
    const box = cell(5);
    const x0 = box.left + 18;
    const x1 = box.right - 18;
    const y0 = box.top + 8;
    const y1 = box.bottom - 10;
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    const at = (x, y, text, cls = "text-ink") =>
      label({ x, y: y + 6, text, size: SIZE.tick, class: cls });
    marks.push(
      rect({ x: x0, y: y0, width: x1 - x0, height: y1 - y0, class: "fig-line" }),
      line({ x1: x0, y1: my, x2: x1, y2: my, class: "fig-grid" }),
      line({ x1: mx, y1: y0, x2: mx, y2: y1, class: "fig-grid" }),
      at((x0 + mx) / 2, (y0 + my) / 2, "A"),
      at((mx + x1) / 2, (y0 + my) / 2, "Bᵀ"),
      at((x0 + mx) / 2, (my + y1) / 2, "B"),
      at((mx + x1) / 2, (my + y1) / 2, "0", "text-accent"),
      caption(box, "Saddle point", "state + price"),
    );
  }

  // 7. Elliptic: a settled field, fixed at the edge and smooth inside.
  {
    const box = cell(6);
    const x0 = box.left + 18;
    const x1 = box.right - 18;
    const y0 = box.top + 6;
    const y1 = box.bottom - 12;
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    marks.push(
      rect({ x: x0, y: y0, width: x1 - x0, height: y1 - y0, class: "fig-line" }),
      [10, 22, 34].map((r) => circle({ cx, cy, r, class: "fig-grid" })).join(""),
      circle({ cx, cy, r: 3, class: "fig-accent" }),
      caption(box, "Elliptic", "settled"),
    );
  }

  // 8. Parabolic: the same amount of heat, smoothing as time passes.
  {
    const box = cell(7);
    const gauss = (centre, width, height) => (t) =>
      height * Math.exp(-((t - centre) ** 2) / width);
    marks.push(
      line({ x1: box.left, y1: box.bottom, x2: box.right, y2: box.bottom, class: "fig-grid" }),
      pulse(box, 0.32, 0.36, 0.9, "fig-grid", "5 4"),
      plot(gauss(0.5, 0.03, 0.7), box),
      plot(gauss(0.5, 0.09, 0.4), box),
      caption(box, "Parabolic", "smoothing"),
    );
  }

  // 9. Hyperbolic: the same pulse, carried along without changing shape.
  {
    const box = cell(8);
    marks.push(
      line({ x1: box.left, y1: box.bottom, x2: box.right, y2: box.bottom, class: "fig-grid" }),
      arrow({ x1: box.left + 6, y1: box.top + 6, x2: box.right - 6, y2: box.top + 6, class: "fig-ink" }),
      pulse(box, 0.04, 0.22, 0.62, "fig-grid", "5 4"),
      pulse(box, 0.36, 0.22, 0.62, "fig-grid", "5 4"),
      pulse(box, 0.68, 0.22, 0.62, "fig-line"),
      caption(box, "Hyperbolic", "travelling"),
    );
  }

  const { svg, caption: note } = panel(el, {
    label: "The shape of the answer for each of the nine kinds",
    description:
      "Nine small drawings, one per kind. Optimisation is a cost curve with its " +
      "lowest point marked; averaging is a distribution with samples on it; " +
      "eigenvalues are three separate bars; a linear system is two lines meeting at " +
      "one point; root finding is a curve crossing a line; a saddle point is a block " +
      "matrix whose lower-right block is zero; elliptic is a square with settled " +
      "contours and a source at the centre; parabolic is a pulse that spreads and " +
      "lowers; hyperbolic is the same pulse at three places, unchanged.",
    width: 560,
    height: 600,
  });
  if (!svg) throw new Error("kind-shapes: the frame has no drawing surface");
  svg.innerHTML = marks.join("");

  note.textContent =
    "The first five answers are a point or a set; the last four are a field.";
}
