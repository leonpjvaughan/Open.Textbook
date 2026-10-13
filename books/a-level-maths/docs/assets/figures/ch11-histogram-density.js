// Guided investigation for 11.3: why the area of a histogram bar is the
// frequency.
// One fixed set of 60 values, redrawn with a different class width. The bar
// heights change, but the total area does not.
// Pure HTML and SVG, no framework and no colour of its own: the fig-* classes
// carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentence.
import { panel, slider, react } from "./kit.js";

const WIDTHS = [5, 10, 15, 20];
const MIN_VALUE = 0;
const MAX_VALUE = 60;

// A stable right-skewed data set of 60 values, built from two waves so the
// shape is the same for every reader and the class counts are exact.
function buildData() {
  const values = [];
  for (let i = 0; i < 60; i += 1) {
    const wave = 24 + 12 * Math.sin(i / 4.5) + 9 * Math.sin(i / 1.6);
    const value = Math.max(1, Math.min(59, Math.round(wave)));
    values.push(value);
  }
  return values;
}

const DATA = buildData();

function classes(width) {
  const groups = [];
  for (let lo = MIN_VALUE; lo < MAX_VALUE; lo += width) {
    const hi = Math.min(lo + width, MAX_VALUE);
    const frequency = DATA.filter((value) => value >= lo && value < hi).length;
    groups.push({ lo, hi, frequency, density: frequency / (hi - lo) });
  }
  return groups;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A histogram of 60 values drawn with a chosen class width",
    width: 430,
    height: 190,
    max: 600,
  });

  const wInput = slider(el, {
    id: "w",
    label: "Class width",
    min: 0,
    max: 3,
    step: 1,
    value: 1,
    // The slider moves through the four widths, not through the index.
    format: (index) => String(WIDTHS[Number(index)]),
  });

  function render() {
    const width = WIDTHS[Number(wInput.value)];
    const groups = classes(width);
    const tallest = Math.max(...groups.map((group) => group.density));
    const plotW = 380;
    const plotH = 120;
    const left = 40;
    const base = 150;
    const barW = plotW / groups.length;

    const axis =
      `<line x1="${left}" y1="${base}" x2="${left + plotW}" y2="${base}" class="fig-ink"></line>` +
      `<line x1="${left}" y1="${base}" x2="${left}" y2="${base - plotH}" class="fig-ink"></line>`;

    const bars = groups
      .map((group, index) => {
        const height = (group.density / tallest) * plotH;
        const x = left + index * barW;
        return (
          `<rect x="${(x + 1).toFixed(1)}" y="${(base - height).toFixed(1)}" ` +
          `width="${(barW - 2).toFixed(1)}" height="${height.toFixed(1)}" ` +
          `class="fig-accent" fill-opacity="0.35" stroke="currentColor"></rect>`
        );
      })
      .join("");

    const ticks = groups
      .map(
        (group, index) =>
          `<text x="${(left + index * barW + barW / 2).toFixed(1)}" y="${base + 16}" ` +
          `text-anchor="middle" class="fig-ink" font-size="13">` +
          `${group.lo}–${group.hi}</text>`
      )
      .join("");

    svg.innerHTML = axis + bars + ticks;

    const total = groups.reduce((sum, group) => sum + group.frequency, 0);
    const tallestGroup = groups.reduce((best, group) =>
      group.density > best.density ? group : best
    );
    readout.textContent =
      `Class width ${width}. There are ${groups.length} classes and ` +
      `${total} values in total. The tallest bar has frequency density ` +
      `${tallestGroup.density.toFixed(2)} for the class ${tallestGroup.lo} to ` +
      `${tallestGroup.hi}, which gives frequency ` +
      `${tallestGroup.frequency}. The total area is always ${total}.`;

    svg.setAttribute(
      "aria-label",
      `A histogram of ${total} values with class width ${width}. The tallest ` +
      `bar has frequency density ${tallestGroup.density.toFixed(2)}.`
    );
  }

  react(wInput, render);
}
