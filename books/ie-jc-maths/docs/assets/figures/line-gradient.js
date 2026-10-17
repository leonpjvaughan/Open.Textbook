// Two points and the slope between them.
//
// Section 17.3 measures how steep a line is with rise over run, and warns that
// swapping the two gives a slope that is far too large. The figure shows the two
// steps as lengths on the grid, so the rise and the run are two distances before
// they are a fraction. The reader moves both points, and the equation of the line
// appears as the slope settles.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, and the two points are labelled A and B, so they are told apart
// without colour.
import { SIZE, axes, dots, fmt, label, line, panel, react, slider } from "./kit.js";

const MAX = 10;

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Two points on a coordinate grid with the line through them, and the rise and the run drawn as the two legs of a triangle",
    description:
      "The points A and B can be moved anywhere on the grid. A straight line joins them, and a dashed " +
      "right-angled triangle shows the horizontal run and the vertical rise between them. The slope is " +
      "the rise divided by the run, and it is given in the readout along with the equation of the line.",
    prompt: "Predict whether the slope changes if you swap which point is A and which is B. Then swap them and check.",
    width: 560,
    height: 380,
  });

  const ax = slider(el, { id: "x1", label: "x of A", min: 0, max: MAX, step: 1, value: 1, show: true });
  const ay = slider(el, { id: "y1", label: "y of A", min: 0, max: MAX, step: 1, value: 1, show: true });
  const bx = slider(el, { id: "x2", label: "x of B", min: 0, max: MAX, step: 1, value: 5, show: true });
  const by = slider(el, { id: "y2", label: "y of B", min: 0, max: MAX, step: 1, value: 4, show: true });

  const { draw, x, y } = axes({
    width: 560,
    height: 380,
    pad: { left: 56, right: 24, top: 24, bottom: 46 },
    x: { domain: [0, MAX], ticks: 5, label: "x", tickFormat: (v) => fmt(v, 0) },
    y: { domain: [0, MAX], ticks: 5, label: "y", tickFormat: (v) => fmt(v, 0) },
  });

  function update() {
    const axv = Number(ax.value);
    const ayv = Number(ay.value);
    const bxv = Number(bx.value);
    const byv = Number(by.value);
    const dx = bxv - axv;
    const dy = byv - ayv;

    let drawing = draw;
    // The rise and the run, drawn under the segment so the segment stays legible.
    if (dx !== 0) {
      drawing += line({ x1: x(axv), y1: y(ayv), x2: x(bxv), y2: y(ayv), class: "fig-grid", width: 1.4, dash: "5 4" });
    }
    if (dy !== 0) {
      drawing += line({ x1: x(bxv), y1: y(ayv), x2: x(bxv), y2: y(byv), class: "fig-grid", width: 1.4, dash: "5 4" });
    }
    drawing += line({ x1: x(axv), y1: y(ayv), x2: x(bxv), y2: y(byv), class: "fig-accent", width: 2.6 });

    drawing += dots([[axv, ayv]], { x, y, r: 6, class: "fig-good" });
    drawing += dots([[bxv, byv]], { x, y, r: 6, class: "fig-warn" });
    drawing += label({ x: x(axv) - 10, y: y(ayv) + 20, text: "A", size: SIZE.value, class: "text-good", anchor: "end", weight: "bold" });
    drawing += label({ x: x(bxv) + 10, y: y(byv) - 10, text: "B", size: SIZE.value, class: "text-warn", anchor: "start", weight: "bold" });

    // The two steps are named where they are drawn, so neither is mistaken for the
    // other.
    if (dx !== 0) {
      drawing += label({
        x: (x(axv) + x(bxv)) / 2,
        y: y(ayv) + (dy >= 0 ? 22 : -12),
        text: `run ${fmt(dx, 0)}`,
        size: SIZE.tick,
        class: "text-ink",
      });
    }
    if (dy !== 0) {
      drawing += label({
        x: x(bxv) + (dx >= 0 ? 10 : -10),
        y: (y(ayv) + y(byv)) / 2 + 5,
        text: `rise ${fmt(dy, 0)}`,
        size: SIZE.tick,
        class: "text-ink",
        anchor: dx >= 0 ? "start" : "end",
      });
    }

    svg.innerHTML = drawing;

    const at = `A is (${fmt(axv, 0)}, ${fmt(ayv, 0)}) and B is (${fmt(bxv, 0)}, ${fmt(byv, 0)}).`;
    if (dx === 0 && dy === 0) {
      readout.textContent = `${at} The two points are in the same place, so there is no line to measure yet.`;
      return;
    }
    if (dx === 0) {
      readout.textContent = `${at} The run is zero, so the line is vertical and its slope is undefined.`;
      return;
    }

    const g = gcd(dy, dx);
    let n = dy / g;
    let d = dx / g;
    if (d < 0) {
      n = -n;
      d = -d;
    }
    const slope = d === 1 ? `${fmt(n, 0)}` : `${n}/${d}, which is ${fmt(dy / dx, 3)}`;

    // The equation, kept in exact fractions because the points sit on whole numbers.
    const cn = ayv * dx - dy * axv;
    const cg = gcd(cn, dx);
    let cNum = cn / cg;
    let cDen = dx / cg;
    if (cDen < 0) {
      cNum = -cNum;
      cDen = -cDen;
    }
    const coefficient = d === 1 ? (n === 1 ? "" : n === -1 ? "−" : fmt(n, 0)) : `(${n}/${d})`;
    const constant = cNum === 0 ? "" : ` ${cNum > 0 ? "+" : "−"} ${cDen === 1 ? Math.abs(cNum) : `${Math.abs(cNum)}/${cDen}`}`;

    readout.textContent =
      `${at} The rise is ${fmt(dy, 0)} and the run is ${fmt(dx, 0)}, so the slope is ${slope}. ` +
      `The line has equation y = ${coefficient}x${constant}.`;
  }

  react([ax, ay, bx, by], update);
}
