// Guided investigation for 12.1: when two events are independent.
// A two-way table with fixed row and column totals. The reader moves the number
// in the overlap cell and watches P(A given B) move away from P(A).
// Pure HTML and SVG, no framework and no colour of its own: the fig-* classes
// carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. The two-way table and the
// verdict line are the figure's own text, so they stay here.
import { SIZE, label, panel, react, slider } from "./kit.js";

const N = 200;
const HALF = 100;
const BAR_W = 320;
const BAR_H = 26;
const LEFT = 120;

function bar(y, value, className) {
  const width = Math.max(0, Math.round(value * BAR_W));
  return (
    `<rect x="${LEFT}" y="${y}" width="${width}" height="${BAR_H}" ` +
    `class="${className}" rx="3"></rect>` +
    label({
      x: LEFT + BAR_W + 8,
      y: y + BAR_H - 8,
      text: `${Math.round(value * 100)}%`,
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    })
  );
}

export function mount(el) {
  const { root, svg, readout } = panel(el, {
    label:
      "A bar chart comparing the conditional probability of A given B with the unconditional probability of A",
    width: LEFT + BAR_W + 60,
    height: 80,
    max: 640,
  });

  const overlap = slider(el, { show: false,
    id: "overlap",
    label: "Number in both A and B",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
  });

  const table = document.createElement("table");
  table.className = "two-way";
  table.innerHTML =
    `<tr><th></th><th>B</th><th>not B</th><th>Total</th></tr>` +
    `<tr><th>A</th><td class="ab"></td><td class="anb"></td><td>100</td></tr>` +
    `<tr><th>not A</th><td class="nab"></td><td class="nanb"></td><td>100</td></tr>` +
    `<tr><th>Total</th><td>100</td><td>100</td><td>200</td></tr>`;

  const verdict = document.createElement("p");
  verdict.className = "verdict";
  verdict.setAttribute("aria-live", "polite");

  root.insertBefore(table, svg);
  root.append(verdict);

  function render() {
    const x = Number(overlap.value);

    const ab = x;
    const anb = HALF - x;
    const nab = HALF - x;
    const nanb = x;

    el.querySelector(".ab").textContent = ab;
    el.querySelector(".anb").textContent = anb;
    el.querySelector(".nab").textContent = nab;
    el.querySelector(".nanb").textContent = nanb;

    const pA = HALF / N;
    const pB = HALF / N;
    const pAB = ab / N;
    const pAGivenB = ab / HALF;
    const product = pA * pB;

    svg.innerHTML =
      label({ x: 0, y: 17, text: "P(A given B)", anchor: "start", size: SIZE.tick, class: "text-ink" }) +
      bar(4, pAGivenB, "fig-accent") +
      label({ x: 0, y: 57, text: "P(A)", anchor: "start", size: SIZE.tick, class: "text-ink" }) +
      bar(44, pA, "fig-good");

    readout.textContent =
      `P(A and B) is ${pAB.toFixed(3)}. ` +
      `P(A) times P(B) is ${product.toFixed(3)}. ` +
      `P(A given B) is ${pAGivenB.toFixed(2)}.`;

    const equal = Math.abs(pAB - product) < 1e-9;
    verdict.textContent = equal
      ? "The two values are equal, so A and B are independent at this setting."
      : "The two values differ, so A and B are not independent at this setting.";

    svg.setAttribute(
      "aria-label",
      `A bar chart. P(A given B) is ${(pAGivenB * 100).toFixed(0)} percent ` +
        `and P(A) is ${(pA * 100).toFixed(0)} percent. ` +
        `P(A and B) is ${pAB.toFixed(3)} and P(A) times P(B) is ${product.toFixed(3)}.`
    );
  }

  react(overlap, render);
}
