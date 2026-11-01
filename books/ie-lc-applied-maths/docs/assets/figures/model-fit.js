// Tier-1 guided investigation: fitting a cooling model to data.
//
// Section 9.3 asks the reader to test a model against measurements. The page gives
// the data and the model, and asks which cooling rate k fits. So the figure draws
// the measured points and the model curve for the chosen k, and reports the total
// squared error, which is the number the reader is trying to make small.
//
// Nothing here carries a colour. The points and the curve use different fig-*
// classes and different shapes, so the distinction survives a monochrome bundle.
//
// The scaffolding comes from `kit.js`. What is left is the drawing and the words.
import {
  fmt,
  label,
  panel,
  quantity,
  react,
  scale,
  slider,
  SIZE,
} from "./kit.js";

// The cup of tea from the section: 90 °C at the pour, a room at 20 °C.
const T_ROOM = 20; // °C
const T_START = 90; // °C
// The measurements, taken each 2 minutes for 10 minutes.
const TIMES = [0, 2, 4, 6, 8, 10]; // min
const MEASURED = [90, 75, 63, 54, 47, 41]; // °C

function temperature(k, t) {
  return T_ROOM + (T_START - T_ROOM) * Math.exp(-k * t);
}

function squaredError(k) {
  let total = 0;
  for (let i = 0; i < TIMES.length; i += 1) {
    const gap = temperature(k, TIMES[i]) - MEASURED[i];
    total += gap * gap;
  }
  return total;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A cooling curve for a cup of tea, with the measured temperatures marked and the model curve drawn for the chosen cooling rate",
    width: 560,
    height: 300,
  });

  const kInput = slider(el, {
    show: true,
    id: "rate",
    label: "Cooling rate k",
    min: 0.04,
    max: 0.24,
    step: 0.005,
    value: 0.1,
    unit: "each minute",
  });

  const PLOT = { x0: 70, y0: 250, x1: 530, y1: 30 };
  const T_MAX = 100; // °C, the top of the graph

  const sx = scale({ domain: [0, 10], range: [PLOT.x0, PLOT.x1] });
  const sy = scale({ domain: [0, T_MAX], range: [PLOT.y0, PLOT.y1] });

  function update() {
    const k = Number(kInput.value);

    const axes =
      `<line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x1}" y2="${PLOT.y0}" class="fig-grid" stroke-width="1.5"></line>` +
      `<line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0}" y2="${PLOT.y1}" class="fig-grid" stroke-width="1.5"></line>` +
      label({ x: PLOT.x1, y: PLOT.y0 + 24, text: "time / min", size: SIZE.value, class: "text-ink", anchor: "end" }) +
      label({ x: PLOT.x0, y: PLOT.y1 - 10, text: "temperature / degC", size: SIZE.value, class: "text-ink", anchor: "start" });

    const roomLine =
      `<line x1="${PLOT.x0}" y1="${sy(T_ROOM)}" x2="${PLOT.x1}" y2="${sy(T_ROOM)}" class="fig-grid" stroke-width="1.2" stroke-dasharray="4 4"></line>` +
      label({ x: PLOT.x1 - 6, y: sy(T_ROOM) - 8, text: "room 20", size: SIZE.value, class: "text-ink", anchor: "end" });

    let curve = "";
    for (let i = 0; i < 80; i += 1) {
      const a = (10 * i) / 80;
      const b = (10 * (i + 1)) / 80;
      curve +=
        `<line x1="${sx(a).toFixed(1)}" y1="${sy(temperature(k, a)).toFixed(1)}" ` +
        `x2="${sx(b).toFixed(1)}" y2="${sy(temperature(k, b)).toFixed(1)}" ` +
        `class="fig-accent" stroke-width="3"></line>`;
    }

    let points = "";
    for (let i = 0; i < TIMES.length; i += 1) {
      points += `<circle cx="${sx(TIMES[i]).toFixed(1)}" cy="${sy(MEASURED[i]).toFixed(1)}" r="5" class="fig-ink"></circle>`;
    }

    svg.innerHTML = `${axes}${roomLine}${curve}${points}`;

    const error = squaredError(k);
    readout.textContent =
      `With k = ${fmt(k, 3)} each minute, the model gives ${quantity(temperature(k, 10), "degC", 1)} at 10 minutes. ` +
      `The total squared error is ${fmt(error, 2)}. Make that number as small as you can.`;
  }

  react([kInput], update);
}
