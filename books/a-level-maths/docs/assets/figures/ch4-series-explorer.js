// Guided investigation for a geometric series: the running total as terms are
// added, and the value it settles on when the common ratio is below one.
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const TERMS = 10;

function partialSums(r) {
  const sums = [];
  let running = 0;
  let term = 1;
  for (let n = 1; n <= TERMS; n += 1) {
    running += term;
    term *= r;
    sums.push(running);
  }
  return sums;
}

function limitOf(r) {
  if (Math.abs(r) >= 1) return null;
  return 1 / (1 - r);
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "The running total of a geometric series as terms are added",
    width: 400,
    height: 220,
    max: 520,
  });

  const rInput = slider(el, { show: false,
    id: "r",
    label: "Common ratio r",
    min: -1.4,
    max: 1.4,
    step: 0.1,
    value: 0.6,
  });

  function update() {
    const r = Number(rInput.value);
    const sums = partialSums(r);
    const limit = limitOf(r);

    const top = 18;
    const bottom = 186;
    const left = 34;
    const width = 340;
    const candidates = [...sums.map(Math.abs)];
    if (limit !== null) candidates.push(Math.abs(limit));
    candidates.push(1);
    const tallest = Math.max(...candidates);
    const yScale = (value) => bottom - ((value + tallest) / (2 * tallest)) * (bottom - top);

    const axis =
      `<line x1="${left}" y1="${yScale(0)}" x2="${left + width}" y2="${yScale(0)}" class="fig-ink"></line>` +
      `<line x1="${left}" y1="${yScale(-tallest)}" x2="${left}" y2="${yScale(tallest)}" class="fig-ink"></line>`;

    const barWidth = width / TERMS - 4;
    let bars = "";
    sums.forEach((sum, index) => {
      const x = left + (index * width) / TERMS + 2;
      const edge = yScale(sum);
      const base = yScale(0);
      const y = Math.min(edge, base);
      bars +=
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" ` +
        `height="${Math.abs(edge - base).toFixed(1)}" class="fig-accent"></rect>`;
    });

    let limitLine = "";
    if (limit !== null) {
      const y = yScale(limit);
      limitLine =
        `<line x1="${left}" y1="${y.toFixed(1)}" x2="${left + width}" y2="${y.toFixed(1)}" ` +
        `class="fig-good"></line>` +
        `<text x="${left + 4}" y="${(y - 4).toFixed(1)}" class="fig-good">limit</text>`;
    }

    svg.innerHTML = axis + bars + limitLine;

    const tenth = sums[sums.length - 1];
    const limitText =
      limit === null
        ? "The series does not settle, so there is no sum to infinity."
        : `The sum to infinity is ${limit.toFixed(3)}.`;

    readout.textContent =
      `The first term is 1 and the common ratio is ${r}. ` +
      `The running total after ${TERMS} terms is ${tenth.toFixed(3)}. ${limitText}`;

    svg.setAttribute(
      "aria-label",
      `A bar chart of the running total of the geometric series with first term 1 ` +
        `and common ratio ${r}, after each of ${TERMS} terms. The running total ` +
        `after ${TERMS} terms is ${tenth.toFixed(3)}. ${limitText}`
    );
  }

  react(rInput, update);
}
