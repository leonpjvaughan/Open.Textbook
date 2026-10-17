// Guided investigation comparing an arithmetic model (add a fixed amount each
// step) with a geometric model (multiply by a fixed factor each step).
// Pure HTML and SVG, an ES module, no framework and no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`.
import { SIZE, label, panel, react, slider } from "./kit.js";

const STEPS = 10;

function arithmeticSeries(start, added) {
  return Array.from({ length: STEPS }, (_, i) => start + i * added);
}

function geometricSeries(start, factor) {
  return Array.from({ length: STEPS }, (_, i) => start * Math.pow(factor, i));
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Two models over ten steps: one adds a fixed amount, one multiplies by a " +
      "fixed factor",
    width: 440,
    height: 240,
    max: 560,
  });

  const dInput = slider(el, {
    id: "d",
    label: "Amount added each step",
    min: 0,
    max: 10,
    step: 1,
    value: 4,
    show: false,
  });
  const rInput = slider(el, {
    id: "r",
    label: "Factor each step",
    min: 1,
    max: 1.3,
    step: 0.05,
    value: 1.1,
    show: false,
  });

  function update() {
    const added = Number(dInput.value);
    const factor = Number(rInput.value);
    const start = 10;
    const arithmetic = arithmeticSeries(start, added);
    const geometric = geometricSeries(start, factor);

    const top = 26;
    const bottom = 196;
    const left = 34;
    const width = 380;
    const tallest = Math.max(...arithmetic, ...geometric, 1);
    const yScale = (value) => bottom - (value / tallest) * (bottom - top);

    const axis =
      `<line x1="${left}" y1="${yScale(0)}" x2="${left + width}" y2="${yScale(0)}" class="fig-ink"></line>` +
      `<line x1="${left}" y1="${yScale(tallest)}" x2="${left}" y2="${yScale(0)}" class="fig-ink"></line>`;

    const slot = width / STEPS;
    let bars = "";
    for (let i = 0; i < STEPS; i += 1) {
      const x = left + i * slot;
      const half = slot / 2 - 2;
      const arithmeticTop = yScale(arithmetic[i]);
      const geometricTop = yScale(geometric[i]);
      bars +=
        `<rect x="${(x + 1).toFixed(1)}" y="${arithmeticTop.toFixed(1)}" ` +
        `width="${half.toFixed(1)}" height="${(yScale(0) - arithmeticTop).toFixed(1)}" ` +
        `class="fig-accent"></rect>` +
        `<rect x="${(x + 2 + half).toFixed(1)}" y="${geometricTop.toFixed(1)}" ` +
        `width="${half.toFixed(1)}" height="${(yScale(0) - geometricTop).toFixed(1)}" ` +
        `class="fig-warn"></rect>`;
    }

    const key =
      label({ x: left, y: top - 8, text: `Left bar: add ${added} each step.`, anchor: "start", class: "text-ink" }) +
      label({ x: left + 200, y: top - 8, text: `Right bar: multiply by ${factor} each step.`, anchor: "start", class: "text-ink" });

    svg.innerHTML = axis + bars + key;

    let crossing = 0;
    for (let i = 0; i < STEPS; i += 1) {
      if (geometric[i] > arithmetic[i]) {
        crossing = i + 1;
        break;
      }
    }
    const crossingText =
      crossing === 0
        ? "The multiplying model is still behind after 10 steps."
        : `The multiplying model first passes the adding model at step ${crossing}.`;

    readout.textContent =
      `Both models start at ${start}. Adding gives ${arithmetic[STEPS - 1].toFixed(2)} ` +
      `after ${STEPS} steps, and multiplying gives ${geometric[STEPS - 1].toFixed(2)}. ${crossingText}`;

    svg.setAttribute(
      "aria-label",
      `Two bar charts over ${STEPS} steps. Both start at ${start}. The adding model ` +
        `adds ${added} each step and reaches ${arithmetic[STEPS - 1].toFixed(2)}. ` +
        `The multiplying model multiplies by ${factor} each step and reaches ` +
        `${geometric[STEPS - 1].toFixed(2)}. ${crossingText}`
    );
  }

  react([dInput, rInput], update);
}
