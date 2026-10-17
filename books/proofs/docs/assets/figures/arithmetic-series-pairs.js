// Guided investigation for the proof of the arithmetic-series sum.
//
// The proof is one arrangement: write the sum down twice, the second time
// backwards, and add the two lines term by term. Every column makes the same total
// a + l, and there are n columns, so 2S = n(a + l). The figure draws the three
// lines — the sum, its reverse, and the column totals — so the reader performs the
// addition rather than reading about it.
//
// Predict -> Test -> Explain: the page asks what a column will add to before the
// reader ticks the box, and the reversed line is hidden until it is ticked.
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes; the readout is `aria-live`, so the arithmetic reaches a reader who
// cannot see the drawing.
//
// The scaffolding — the surface, its accessible name, the controls, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, toggle, react, SIZE, label, rect, line, fmt } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "An arithmetic series written out as a row of terms, the same series written backwards underneath it, and a third row of the column totals",
    width: 540,
    height: 250,
    max: 560,
  });

  const first = slider(el, {
    show: true,
    id: "first",
    label: "First term a:",
    name: "First term of the series",
    min: 1,
    max: 9,
    step: 1,
    value: 1,
  });
  const diff = slider(el, {
    show: true,
    id: "diff",
    label: "Common difference d:",
    name: "Common difference",
    min: 1,
    max: 5,
    step: 1,
    value: 1,
  });
  const count = slider(el, {
    show: true,
    id: "count",
    label: "Number of terms n:",
    name: "Number of terms",
    min: 3,
    max: 8,
    step: 1,
    value: 5,
  });
  const add = toggle(el, {
    id: "add",
    label: "Add the reversed line",
  });

  const LEFT = 58;
  const RIGHT = 18;
  const BOX_H = 34;
  const ROWS = [40, 96, 162];
  const ROW_CLASS = ["fig-accent", "fig-warn", "fig-good"];

  function draw() {
    const a = Number(first.value);
    const d = Number(diff.value);
    const n = Number(count.value);
    const l = a + (n - 1) * d;
    const pair = a + l;
    const doubled = n * pair;
    const sum = doubled / 2;

    const terms = Array.from({ length: n }, (_, k) => a + k * d);
    const reversed = terms.slice().reverse();
    const totals = terms.map((term, k) => term + reversed[k]);

    const usable = 540 - LEFT - RIGHT;
    const cell = usable / n;
    const middle = (row) => row + BOX_H / 2 + 5;

    let marks =
      label({ x: LEFT, y: 24, text: `last term l = ${l}`, anchor: "start" }) +
      label({ x: LEFT - 12, y: middle(ROWS[0]), text: "S", anchor: "end" });

    for (let k = 0; k < n; k += 1) {
      const x = LEFT + k * cell;
      const cx = x + cell / 2;
      marks +=
        rect({ x: x + 3, y: ROWS[0], width: cell - 6, height: BOX_H, class: ROW_CLASS[0], opacity: 0.18 }) +
        label({ x: cx, y: middle(ROWS[0]), text: fmt(terms[k], 0), size: SIZE.tick });
    }

    if (add.checked) {
      marks += label({ x: LEFT - 12, y: (ROWS[0] + BOX_H + ROWS[1]) / 2 + 5, text: "+", size: SIZE.value, anchor: "end" });
      marks += label({ x: LEFT - 12, y: middle(ROWS[1]), text: "S", anchor: "end" });
      marks += label({ x: LEFT - 12, y: (ROWS[1] + BOX_H + ROWS[2]) / 2 + 5, text: "=", size: SIZE.value, anchor: "end" });
      marks += label({ x: LEFT - 12, y: middle(ROWS[2]), text: "2S", anchor: "end" });

      for (let k = 0; k < n; k += 1) {
        const x = LEFT + k * cell;
        const cx = x + cell / 2;
        marks +=
          line({ x1: cx, y1: ROWS[0] + BOX_H, x2: cx, y2: ROWS[1], class: "fig-grid", width: 1, dash: "3 3" }) +
          line({ x1: cx, y1: ROWS[1] + BOX_H, x2: cx, y2: ROWS[2], class: "fig-grid", width: 1, dash: "3 3" }) +
          rect({ x: x + 3, y: ROWS[1], width: cell - 6, height: BOX_H, class: ROW_CLASS[1], opacity: 0.18 }) +
          label({ x: cx, y: middle(ROWS[1]), text: fmt(reversed[k], 0), size: SIZE.tick }) +
          rect({ x: x + 3, y: ROWS[2], width: cell - 6, height: BOX_H, class: ROW_CLASS[2], opacity: 0.18 }) +
          label({ x: cx, y: middle(ROWS[2]), text: fmt(totals[k], 0), size: SIZE.tick });
      }
    }

    svg.innerHTML = marks;

    if (!add.checked) {
      readout.textContent =
        `One sum, S = ${terms.join(" + ")}. Its last term is ${l}, and there are ` +
        `${n} terms. Predict what every column will add to when you write the same ` +
        `sum backwards underneath and add the two lines, then add the reversed line.`;
      return;
    }

    readout.textContent =
      `Written once, S = ${terms.join(" + ")}. Written backwards, ` +
      `S = ${reversed.join(" + ")}. Each column adds to a + l = ${a} + ${l} = ` +
      `${pair}, and there are n = ${n} columns, so 2S = ${n} × ${pair} = ${doubled}. ` +
      `Half of that is the sum: S = ${doubled} ÷ 2 = ${sum}.`;
  }

  react([first, diff, count, add], draw);
}
