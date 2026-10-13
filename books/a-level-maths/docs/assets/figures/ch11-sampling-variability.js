// Guided investigation for 11.1: sampling variability.
// A fixed population with a stable, deterministic shape, and a random sample
// drawn from it. The reader changes the sample size and draws again. Changing
// the size draws a fresh sample of that size, so the drawing responds to the
// slider as every other figure does, and the values in the latest sample are
// drawn along the axis so the size of the sample can be seen as well as read.
// Pure HTML and SVG, no framework and no colour of its own: the fig-* classes
// carry the theme. Runtime text is plain text, never TeX.

const POPULATION_SIZE = 240;
const MIN_VALUE = 0;
const MAX_VALUE = 60;
const PLOT_W = 380;
const PLOT_H = 90;
const LEFT = 30;

// A stable pseudo-random population: a wave plus a repeating small offset.
// It is deterministic, so every reader sees the same population and the same
// population mean, while a sample still varies.
function buildPopulation() {
  const values = [];
  for (let i = 0; i < POPULATION_SIZE; i += 1) {
    const wave = 25 + 12 * Math.sin(i / 9);
    const ripple = 5 * Math.sin(i / 2.3);
    const value = Math.max(MIN_VALUE, Math.min(MAX_VALUE, wave + ripple));
    values.push(value);
  }
  return values;
}

const POPULATION = buildPopulation();
const POPULATION_MEAN =
  POPULATION.reduce((total, value) => total + value, 0) / POPULATION.length;

function xToPx(value) {
  return LEFT + ((value - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * PLOT_W;
}

function drawSample(size) {
  const values = [];
  let total = 0;
  for (let i = 0; i < size; i += 1) {
    const value = POPULATION[Math.floor(Math.random() * POPULATION.length)];
    values.push(value);
    total += value;
  }
  return { mean: total / size, values };
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:600px">
      <label>Sample size n
        <input class="n" type="range" min="5" max="50" step="5" value="10">
        <output class="n-out">10</output>
      </label>
      <p><button class="draw" type="button">Take a new sample</button>
         <button class="reset" type="button">Clear the history</button></p>
      <svg viewBox="0 0 430 150" width="100%" role="img"
           aria-label="A number line showing the population mean and the mean of a random sample"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const nInput = el.querySelector(".n");
  const nOut = el.querySelector(".n-out");
  const drawButton = el.querySelector(".draw");
  const resetButton = el.querySelector(".reset");

  let history = [];

  function axis() {
    let marks = "";
    for (let value = 0; value <= 60; value += 10) {
      marks +=
        `<line x1="${xToPx(value).toFixed(1)}" y1="20" ` +
        `x2="${xToPx(value).toFixed(1)}" y2="120" class="fig-grid"></line>` +
        `<text x="${xToPx(value).toFixed(1)}" y="138" text-anchor="middle" ` +
        `class="fig-ink" font-size="13">${value}</text>`;
    }
    return (
      marks +
      `<line x1="${xToPx(MIN_VALUE).toFixed(1)}" y1="110" ` +
      `x2="${xToPx(MAX_VALUE).toFixed(1)}" y2="110" class="fig-ink"></line>`
    );
  }

  function render() {
    const latest = history.length ? history[history.length - 1] : null;
    const populationLine =
      `<line x1="${xToPx(POPULATION_MEAN).toFixed(1)}" y1="25" ` +
      `x2="${xToPx(POPULATION_MEAN).toFixed(1)}" y2="115" class="fig-good" ` +
      `stroke-dasharray="4 3"></line>`;

    // The values in the latest sample, drawn as marks along the axis, so a
    // larger sample is visibly more marks rather than only a different reading.
    const sampleMarks = latest
      ? latest.values
          .map(
            (value) =>
              `<line x1="${xToPx(value).toFixed(1)}" y1="122" ` +
              `x2="${xToPx(value).toFixed(1)}" y2="130" class="fig-accent"></line>`
          )
          .join("")
      : "";

    const dots = history
      .map(
        (item, index) =>
          `<circle cx="${xToPx(item.mean).toFixed(1)}" ` +
          `cy="${(115 - (index % 8) * 4).toFixed(1)}" r="3" class="fig-accent"></circle>`
      )
      .join("");

    svg.innerHTML = axis() + populationLine + sampleMarks + dots;

    const spread = history.length > 1
      ? Math.max(...history.map((item) => item.mean)) -
        Math.min(...history.map((item) => item.mean))
      : 0;
    readout.textContent =
      `The population mean is ${POPULATION_MEAN.toFixed(1)} minutes. ` +
      (latest
        ? `Your sample of ${latest.size} has mean ${latest.mean.toFixed(1)} minutes, ` +
          `and the ${latest.values.length} values in it are marked along the bottom. `
        : "No sample has been taken yet. ") +
      (history.length > 1
        ? `So far the sample means range over ${spread.toFixed(1)} minutes.`
        : "");

    svg.setAttribute(
      "aria-label",
      `A number line from 0 to 60 minutes. The population mean is ` +
      `${POPULATION_MEAN.toFixed(1)} minutes.` +
      (latest
        ? ` The sample of ${latest.size} has mean ${latest.mean.toFixed(1)} minutes, ` +
          `and its ${latest.values.length} values are drawn along the bottom.`
        : " No sample has been drawn yet.")
    );
  }

  function takeSample() {
    const size = Number(nInput.value);
    history.push({ size, ...drawSample(size) });
    if (history.length > 24) {
      history = history.slice(-24);
    }
    render();
  }

  // Moving the sample-size slider draws a sample of the new size, so the drawing
  // changes with the slider and the reader sees a sample of the size they set.
  // The button below draws further samples of the same size.
  nInput.addEventListener("input", () => {
    nOut.value = nInput.value;
    nOut.textContent = nInput.value;
    takeSample();
  });
  drawButton.addEventListener("click", takeSample);
  resetButton.addEventListener("click", () => {
    history = [];
    render();
  });

  render();
}
