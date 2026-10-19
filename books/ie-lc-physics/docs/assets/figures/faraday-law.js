// Tier-1 guided investigation: the induced emf in a coil.
//
// The page asks the reader to predict what happens to the emf when the time is
// halved, then to double the number of turns and explain why the time matters. So
// the figure has to show Faraday's law in action: the emf is set by the number of
// turns, the change in flux through one turn, and the time the change takes.
//
// Nothing here carries a colour. The bar uses one class, the axes another and the
// labels a third, so the figure survives a monochrome bundle.
//
// The scaffolding — the panel, its accessible name, the sliders, the readout and
// the redraw — comes from `kit.js`. What is left is the drawing and the sentences.
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

// The top of the emf axis, in volts. The largest setting gives 200 turns, a change
// of 10 mWb and a time of 5 ms, which is 400 V, so 420 V keeps every setting on
// the scale.
const Y_MAX = 420;

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Induced voltage for a chosen number of turns, change in flux and time",
    width: 420,
    height: 260,
  });

  const turnsInput = slider(el, {
    show: false,
    id: "turns",
    label: "Turns",
    min: 10,
    max: 200,
    step: 10,
    value: 100,
  });

  const fluxInput = slider(el, {
    show: false,
    id: "flux",
    label: "Change in flux",
    min: 1,
    max: 10,
    step: 0.5,
    value: 5,
    unit: "mWb",
  });

  const timeInput = slider(el, {
    show: false,
    id: "time",
    label: "Time",
    min: 5,
    max: 50,
    step: 5,
    value: 10,
    unit: "ms",
  });

  // The plot area, in SVG units.
  const PLOT = { x0: 58, y0: 208, x1: 384, y1: 26 };
  const y = scale({ domain: [0, Y_MAX], range: [PLOT.y0, PLOT.y1] });

  function update() {
    const turns = Number(turnsInput.value);
    const milliwebers = Number(fluxInput.value);
    const milliseconds = Number(timeInput.value);
    // A millimillisecond and a milliweber cancel, so the emf in volts is the
    // number of turns times the flux change in mWb divided by the time in ms.
    const emf = (turns * milliwebers) / milliseconds;

    const axes = `
      <line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x1}" y2="${PLOT.y0}" class="fig-grid" stroke-width="1.5"></line>
      <line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0}" y2="${PLOT.y1}" class="fig-grid" stroke-width="1.5"></line>
      ${label({ x: PLOT.x0 - 6, y: PLOT.y1 - 6, text: "induced emf / V", anchor: "start", size: SIZE.tick })}
    `;

    const ticks = [0, 100, 200, 300, 400]
      .map((value) =>
        label({
          x: PLOT.x0 - 8,
          y: y(value) + 5,
          text: String(value),
          anchor: "end",
          size: SIZE.tick,
        }),
      )
      .join("");

    const barTop = y(Math.min(emf, Y_MAX));
    const bar = `<rect x="193" y="${barTop.toFixed(1)}" width="56" height="${(PLOT.y0 - barTop).toFixed(1)}" class="fig-accent"></rect>`;

    svg.innerHTML = `${axes}${ticks}${bar}`;

    if (emf > Y_MAX) {
      readout.textContent = `Induced emf = above the top of the scale. ${turns} turns, a change in flux of ${quantity(milliwebers, "mWb", 1)} in ${quantity(milliseconds, "ms", 0)}.`;
    } else {
      readout.textContent = `Induced emf = ${quantity(emf, "V", 1)}. ${turns} turns, a change in flux of ${quantity(milliwebers, "mWb", 1)} through one turn, in ${quantity(milliseconds, "ms", 0)}.`;
    }
  }

  react([turnsInput, fluxInput, timeInput], update);
}
