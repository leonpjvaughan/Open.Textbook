// Guided investigation for 11.5: what the mean and the standard deviation each
// do when the data change.
//
// One reading can be moved away from the others, and a constant can be added to
// every reading at once. The mean marker and the one-standard-deviation bar
// respond differently, which is the difference between a measure of centre and a
// measure of spread. The figure carries the comparison, so it earns its place.
//
// Predict -> Test -> Explain per AGENTS.md P6: the page asks which measure will
// move more before a control is touched, and asks for the reason afterwards.
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes; the readout is `aria-live`.
//
// The scaffolding — the surface, its accessible name, the two sliders, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, fmt, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A dot plot of five readings, with a marker for the mean and a bar showing one standard deviation either side of it",
    width: 560,
    height: 262,
    max: 600,
  });

  const readingInput = slider(el, {
    id: "reading",
    label: "The fifth reading",
    min: 0,
    max: 16,
    step: 0.5,
    value: 10,
    format: (value) => value.toFixed(1),
  });
  const shiftInput = slider(el, {
    id: "shift",
    label: "Added to every reading",
    min: -2,
    max: 2,
    step: 0.5,
    value: 0,
    format: (value) => value.toFixed(1),
  });

  const WIDTH = 560;
  const LEFT = 26;
  const RIGHT = 534;
  const AXIS_Y = 176;
  const DOT_Y = 140;
  const BAND_Y = 224;

  const X_MIN = -2;
  const X_MAX = 18;
  const FIXED = [2, 4, 6, 8];

  const xToPx = (value) =>
    LEFT + ((value - X_MIN) / (X_MAX - X_MIN)) * (RIGHT - LEFT);

  const text = (x, y, label, anchor = "middle", cls = "fig-ink") =>
    `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" ` +
    `font-size="16" class="${cls}">${label}</text>`;

  function render() {
    const reading = Number(readingInput.value);
    const shift = Number(shiftInput.value);
    const values = [...FIXED, reading].map((value) => value + shift);
    const n = values.length;

    const mean = values.reduce((sum, value) => sum + value, 0) / n;
    const sumSquares = values.reduce(
      (sum, value) => sum + (value - mean) * (value - mean),
      0
    );
    const sd = Math.sqrt(sumSquares / n);

    let grid = "";
    for (let value = X_MIN; value <= X_MAX; value += 2) {
      grid +=
        `<line x1="${xToPx(value).toFixed(1)}" y1="${DOT_Y - 34}" ` +
        `x2="${xToPx(value).toFixed(1)}" y2="${BAND_Y + 14}" class="fig-grid"></line>`;
    }

    const axis =
      `<line x1="${LEFT}" y1="${AXIS_Y}" x2="${RIGHT}" y2="${AXIS_Y}" ` +
      `class="fig-ink" stroke-width="1.5"></line>`;

    let ticks = "";
    for (let value = X_MIN; value <= X_MAX; value += 2) {
      ticks +=
        `<line x1="${xToPx(value).toFixed(1)}" y1="${AXIS_Y - 4}" ` +
        `x2="${xToPx(value).toFixed(1)}" y2="${AXIS_Y + 4}" class="fig-ink"></line>` +
        text(xToPx(value), AXIS_Y + 18, fmt(value));
    }

    // The four fixed readings are circles; the movable one is a diamond, so the
    // control that moves it is identified by shape as well as by colour.
    const fixedDots = FIXED.map(
      (value) =>
        `<circle cx="${xToPx(value + shift).toFixed(1)}" cy="${DOT_Y}" r="5" ` +
        `class="fig-ink"></circle>`
    ).join("");

    const movableX = xToPx(reading + shift);
    const movable =
      `<polygon points="${movableX.toFixed(1)},${DOT_Y - 7} ` +
      `${(movableX + 7).toFixed(1)},${DOT_Y} ` +
      `${movableX.toFixed(1)},${DOT_Y + 7} ` +
      `${(movableX - 7).toFixed(1)},${DOT_Y}" class="fig-warn"></polygon>` +
      text(movableX, DOT_Y - 14, fmt(reading + shift), "middle", "text-warn");

    const meanX = xToPx(mean);
    const meanMark =
      `<line x1="${meanX.toFixed(1)}" y1="${DOT_Y - 34}" ` +
      `x2="${meanX.toFixed(1)}" y2="${AXIS_Y}" class="fig-good" stroke-width="2.5"></line>` +
      text(meanX, DOT_Y - 42, `mean = ${mean.toFixed(1)}`, "middle", "text-good");

    // The bar is one standard deviation either side of the mean. Its length is
    // the spread, and the dots show how many readings sit inside it.
    const lowX = Math.max(LEFT, xToPx(mean - sd));
    const highX = Math.min(RIGHT, xToPx(mean + sd));
    const band =
      `<line x1="${lowX.toFixed(1)}" y1="${BAND_Y}" x2="${highX.toFixed(1)}" ` +
      `y2="${BAND_Y}" class="fig-accent" stroke-width="3"></line>` +
      `<line x1="${lowX.toFixed(1)}" y1="${BAND_Y - 9}" x2="${lowX.toFixed(1)}" ` +
      `y2="${BAND_Y + 9}" class="fig-accent" stroke-width="3"></line>` +
      `<line x1="${highX.toFixed(1)}" y1="${BAND_Y - 9}" x2="${highX.toFixed(1)}" ` +
      `y2="${BAND_Y + 9}" class="fig-accent" stroke-width="3"></line>` +
      text(
        (lowX + highX) / 2,
        BAND_Y + 26,
        `one standard deviation = ${sd.toFixed(2)}`,
        "middle",
        "text-accent"
      );

    svg.innerHTML = grid + axis + ticks + fixedDots + movable + meanMark + band;

    readout.textContent =
      `The readings are ${values.map((value) => fmt(value)).join(", ")}. Their mean is ` +
      `${mean.toFixed(2)}. The squared deviations from the mean add to ` +
      `${sumSquares.toFixed(2)}, so dividing by ${n} and taking the square root ` +
      `gives a standard deviation of ${sd.toFixed(2)}.`;

    svg.setAttribute(
      "aria-label",
      `A dot plot of the five readings. The mean is ${mean.toFixed(2)} and one ` +
        `standard deviation is ${sd.toFixed(2)} either side of it.`
    );
  }

  react([readingInput, shiftInput], render);
}
