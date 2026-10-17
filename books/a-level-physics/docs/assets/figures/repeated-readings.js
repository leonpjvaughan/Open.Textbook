// Tier-1 guided investigation: what a stated uncertainty hides.
//
// Guided, not a sandbox: the page asks the reader to predict what the zero-error
// slider does to the stated range before touching it, and to explain afterwards
// why repeating a measurement removes a random error but not a systematic one.
// The drawing shows eight repeated readings of the same length, the mean with
// the range the book's convention quotes, and the true length. The spread slider
// widens the readings and the stated range; the zero-error slider moves the whole
// group and leaves the range the same size, so a tight set of readings can still
// sit away from the true value.
//
// Colours come from CSS classes, so the figure follows every bundle and both
// schemes. No colour literal appears here, and no runtime LaTeX: the readout is
// plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  // A fixed shape with a mean of exactly zero, so the mean of the readings is
  // the true value plus the zero error, whatever the spread.
  const PATTERN = [-1, -0.68, -0.34, 0.12, 0.47, 0.74, 1, -0.31];
  const TRUE = 12.0; // the length in millimetres
  const MIN = 11.88;
  const MAX = 12.12;
  const LEFT = 80;
  const RIGHT = 610;
  const AXIS = 170;
  const TOP = 95;
  const DOT = 130;

  const { svg, readout } = panel(el, {
    label:
      "Eight repeated readings of one length drawn on a scale in millimetres, with the mean, the stated range and the true length marked",
    width: 640,
    height: 230,
    max: 640,
  });

  const spread = slider(el, { show: false,
    id: "spread",
    label: "Spread of the readings",
    name: "Spread of the repeated readings, in millimetres",
    min: 0.002,
    max: 0.02,
    step: 0.002,
    value: 0.008,
  });
  const zero = slider(el, { show: false,
    id: "zero",
    label: "Zero error",
    name: "Systematic zero error, in millimetres",
    min: -0.05,
    max: 0.05,
    step: 0.005,
    value: 0.02,
  });

  const xFor = (value) => LEFT + ((value - MIN) / (MAX - MIN)) * (RIGHT - LEFT);

  // One significant figure for the uncertainty, and the value to the same
  // number of decimal places, which is the convention the section teaches.
  function oneSigFig(value) {
    const exponent = Math.floor(Math.log10(Math.abs(value)));
    const decimals = Math.max(0, -exponent);
    return { text: value.toFixed(decimals), decimals };
  }

  function update() {
    const spreadValue = Number(spread.value);
    const zeroValue = Number(zero.value);
    const readings = PATTERN.map((point) => TRUE + zeroValue + spreadValue * point);
    const mean = TRUE + zeroValue;
    const half = spreadValue;
    const low = mean - half;
    const high = mean + half;

    // A faint mark every 0.01 mm and a labelled mark every 0.05 mm.
    let grid = "";
    for (let step = 0; step <= 24; step += 1) {
      const value = MIN + step * 0.01;
      const x = xFor(value).toFixed(1);
      const isLabel = Math.abs(value * 100 - Math.round(value * 100)) < 0.5 &&
        Math.abs((value * 100) % 5) < 0.5;
      grid +=
        `<line x1="${x}" y1="${AXIS}" x2="${x}" y2="${isLabel ? AXIS + 6 : AXIS + 3}" class="fig-grid"></line>`;
      if (isLabel) {
        grid +=
          `${label({ x: x, y: AXIS + 20, text: `${value.toFixed(2)}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;
      }
    }

    const dots = readings
      .map(
        (value, index) =>
          `<circle cx="${xFor(value).toFixed(1)}" cy="${DOT - (index % 2) * 8}" r="5" class="fig-accent"></circle>`,
      )
      .join("");

    const trueX = xFor(TRUE).toFixed(1);
    const meanX = xFor(mean).toFixed(1);
    const bandX = xFor(Math.max(low, MIN)).toFixed(1);
    const bandWidth = (xFor(Math.min(high, MAX)) - xFor(Math.max(low, MIN))).toFixed(1);

    svg.innerHTML =
      grid +
      `<line x1="${LEFT}" y1="${AXIS}" x2="${RIGHT}" y2="${AXIS}" class="fig-ink"></line>` +
      `<rect x="${bandX}" y="${TOP}" width="${bandWidth}" height="${AXIS - TOP}" class="fig-ink" opacity="0.12"></rect>` +
      dots +
      `<line x1="${meanX}" y1="${TOP - 10}" x2="${meanX}" y2="${AXIS}" class="fig-ink" stroke-width="2"></line>` +
      `${label({ x: (Number(meanX) + 8).toFixed(1), y: TOP - 2, text: `mean`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `<line x1="${trueX}" y1="${TOP - 20}" x2="${trueX}" y2="${AXIS}" class="fig-warn" stroke-dasharray="4 3"></line>` +
      `${label({ x: (Number(trueX) - 8).toFixed(1), y: TOP - 24, text: `true length`, anchor: "end", size: SIZE.heading, class: "text-warn" })}` +
      `${label({ x: RIGHT, y: AXIS + 40, text: `measured length / mm`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;

    const uncertainty = oneSigFig(half);
    const inside = Math.abs(mean - TRUE) <= half + 1e-9;
    readout.innerHTML =
      `Eight readings. The mean is <strong>${mean.toFixed(uncertainty.decimals)} mm</strong> ` +
      `and the stated uncertainty is <strong>±${uncertainty.text} mm</strong>, half the range. ` +
      `The true length is 12.000 mm, which lies ${inside ? "<strong>inside</strong>" : "<strong>outside</strong>"} that range. ` +
      (inside
        ? `The readings sit close to the true value, so they are accurate. `
        : `The readings sit close together, so they are precise, but every one of them lies to the same side of the true value. ` +
          `Repeating the measurement will not remove that shift. `) +
      `<em>Does moving the zero error change the width of the range?</em>`;
  }

  react([spread, zero], update);
}
