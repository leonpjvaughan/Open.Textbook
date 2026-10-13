// Guided investigation for an arithmetic series.
//
// Each bar is the running total after that many terms, so the bars grow by one
// term at every step. The line marks the individual terms, which is what the
// last bar is built from. Seeing a total that is far larger than any single term
// is the point: the page warns against confusing the term with the sum, and the
// drawing makes the difference visible.
//
// Predict -> Test -> Explain lives on the page: the reader predicts what a
// negative or zero common difference does to the running total before moving a
// slider, and explains the growth afterwards. The module carries no colour of
// its own. The fig-* and text-* classes read the --tb-* tokens, so the figure
// follows the reader's bundle and both schemes, and the readout is aria-live so
// a reader who cannot see the drawing is told what changed. Runtime text is
// plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

const LEFT = 44;
const RIGHT = 344;
const TOP = 18;
const BOTTOM = 206;
const ZERO = (TOP + BOTTOM) / 2;
const HALF = (BOTTOM - TOP) / 2;

function text(x, y, label, cls, anchor) {
  return (
    `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" ` +
    `font-size="11" class="${cls}">${label}</text>`
  );
}

export function mount(el) {
  const { svg, readout, controls } = panel(el, {
    label:
      "Bars showing the running total of an arithmetic series after each term, " +
      "with the terms themselves marked",
    width: 360,
    height: 250,
    max: 520,
  });

  // The key to the two series, kept directly under the drawing it explains.
  const legend = document.createElement("p");
  legend.className = "legend";
  legend.style.cssText = "display:flex;gap:1.2rem;font-size:.9rem;margin:.5rem 0 0";
  legend.innerHTML = `
        <span>
          <svg width="14" aria-hidden="true" style="vertical-align:-2px">
            <rect x="2" y="2" width="10" height="10" class="fig-accent"></rect>
          </svg>
          running total
        </span>
        <span>
          <svg width="14" aria-hidden="true" style="vertical-align:-2px">
            <line x1="1" y1="7" x2="13" y2="7" class="fig-warn" stroke-width="2"></line>
            <circle cx="7" cy="7" r="3" class="fig-warn"></circle>
          </svg>
          term
        </span>`;
  controls.before(legend);

  const aInput = slider(el, {
    id: "a",
    label: "First term a",
    name: "First term of the sequence",
    min: -5,
    max: 10,
    step: 1,
    value: 5,
    show: false,
  });
  const dInput = slider(el, {
    id: "d",
    label: "Common difference d",
    name: "Common difference of the sequence",
    min: -5,
    max: 5,
    step: 1,
    value: 4,
    show: false,
  });
  const nInput = slider(el, {
    id: "n",
    label: "Number of terms n",
    name: "Number of terms in the series",
    min: 1,
    max: 12,
    step: 1,
    value: 5,
    show: false,
  });

  function update() {
    const a = Number(aInput.value);
    const d = Number(dInput.value);
    const n = Number(nInput.value);

    const terms = [];
    const sums = [];
    let running = 0;
    for (let k = 1; k <= n; k += 1) {
      const term = a + (k - 1) * d;
      running += term;
      terms.push(term);
      sums.push(running);
    }

    const tallest = Math.max(
      1,
      ...terms.map((value) => Math.abs(value)),
      ...sums.map((value) => Math.abs(value))
    );
    const toPx = (value) => ZERO - (value / tallest) * HALF;

    const slot = (RIGHT - LEFT) / n;
    const barWidth = Math.min(slot * 0.6, 30);
    const centre = (k) => LEFT + slot * (k - 0.5);

    const zeroLine =
      `<line x1="${LEFT}" y1="${ZERO}" x2="${RIGHT}" y2="${ZERO}" class="fig-ink" stroke-width="1"></line>` +
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink" stroke-width="1"></line>`;

    const gridLines =
      `<line x1="${LEFT}" y1="${toPx(tallest / 2).toFixed(1)}" x2="${RIGHT}" y2="${toPx(tallest / 2).toFixed(1)}" class="fig-grid" stroke-width="1"></line>` +
      `<line x1="${LEFT}" y1="${toPx(-tallest / 2).toFixed(1)}" x2="${RIGHT}" y2="${toPx(-tallest / 2).toFixed(1)}" class="fig-grid" stroke-width="1"></line>`;

    let bars = "";
    sums.forEach((sum, index) => {
      const edge = toPx(sum);
      const height = Math.abs(edge - ZERO);
      bars +=
        `<rect x="${(centre(index + 1) - barWidth / 2).toFixed(1)}" ` +
        `y="${Math.min(edge, ZERO).toFixed(1)}" width="${barWidth.toFixed(1)}" ` +
        `height="${height.toFixed(1)}" class="fig-accent"></rect>`;
    });

    const linePoints = terms
      .map((term, index) => `${centre(index + 1).toFixed(1)},${toPx(term).toFixed(1)}`)
      .join(" L ");
    const termLine =
      `<path d="M ${linePoints}" style="fill:none" class="fig-warn" stroke-width="2"></path>`;
    let dots = "";
    terms.forEach((term, index) => {
      dots +=
        `<circle cx="${centre(index + 1).toFixed(1)}" cy="${toPx(term).toFixed(1)}" r="3" class="fig-warn"></circle>`;
    });

    let ticks = text(LEFT - 6, ZERO + 4, "0", "text-ink", "end");
    ticks += text(LEFT - 6, toPx(tallest) + 4, `${tallest}`, "text-ink", "end");
    const lowest = Math.min(...terms, ...sums);
    if (lowest < 0) {
      ticks += text(LEFT - 6, toPx(-tallest) + 4, `${-tallest}`, "text-ink", "end");
    }

    let numbers = "";
    for (let k = 1; k <= n; k += 1) {
      numbers += text(centre(k), BOTTOM + 15, `${k}`, "text-ink", "middle");
    }

    svg.innerHTML =
      gridLines + zeroLine + bars + termLine + dots + ticks + numbers;

    const lastTerm = terms[n - 1];
    const lastSum = sums[n - 1];
    const formula = (n * (2 * a + (n - 1) * d)) / 2;

    const growth =
      d > 0
        ? "Each term is larger than the one before it, so the bars curve upward."
        : d < 0
          ? "Each term is smaller than the one before it, so the bars fall once the terms turn negative."
          : "Every term is the same, so the bars rise in a straight line.";

    const compare =
      n > 1
        ? ` The running total is much larger than the term on its own, because it adds every term before it.`
        : "";

    readout.textContent =
      `The first term is ${a} and the common difference is ${d}. Term ${n} is ` +
      `${lastTerm}, and the running total after ${n} terms is ${lastSum}. The ` +
      `formula gives ${formula} as well. ${growth}${compare}`;

    svg.setAttribute(
      "aria-label",
      `Bars showing the running total of the arithmetic series with first term ` +
        `${a} and common difference ${d}. After ${n} terms the running total is ` +
        `${lastSum}, and term ${n} is ${lastTerm}.`
    );
  }

  react([aInput, dInput, nInput], update);
}
