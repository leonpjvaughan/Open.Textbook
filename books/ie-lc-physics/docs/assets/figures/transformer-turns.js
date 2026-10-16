// Tier-1 guided investigation: the voltages of a transformer.
//
// The page asks the reader to predict the secondary voltage when the number of
// secondary turns is doubled, then to change the primary voltage and explain why
// the ratio of the voltages is fixed by the turns. So the figure has to show the
// two voltages side by side, scaled to each other, with the turns visible as
// numbers the reader sets.
//
// Nothing here carries a colour. The two bars use one class, the axes another and
// the labels a third, so the figure survives a monochrome bundle.
//
// The scaffolding — the panel, its accessible name, the sliders, the readout and
// the redraw — comes from `kit.js`. What is left is the drawing and the sentences.
import { SIZE, fmt, label, panel, scale, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Primary and secondary voltages for a chosen pair of transformer coils",
    width: 420,
    height: 260,
  });

  const primaryTurns = slider(el, {
    show: false,
    id: "primary-turns",
    label: "Primary turns",
    min: 100,
    max: 1000,
    step: 100,
    value: 100,
  });

  const secondaryTurns = slider(el, {
    show: false,
    id: "secondary-turns",
    label: "Secondary turns",
    min: 100,
    max: 10000,
    step: 100,
    value: 1000,
  });

  const primaryVolts = slider(el, {
    show: false,
    id: "primary-volts",
    label: "Primary voltage",
    min: 100,
    max: 400,
    step: 10,
    value: 240,
    unit: "V",
  });

  // The plot area, in SVG units.
  const PLOT = { x0: 58, y0: 208, x1: 384, y1: 26 };

  function update() {
    const np = Number(primaryTurns.value);
    const ns = Number(secondaryTurns.value);
    const vp = Number(primaryVolts.value);
    const vs = (vp * ns) / np;

    // The taller bar sets the scale, so both bars are always visible and their
    // heights compare directly. A little headroom keeps the top label clear.
    const top = Math.max(vp, vs) * 1.1;
    const y = scale({ domain: [0, top], range: [PLOT.y0, PLOT.y1] });

    const axes = `
      <line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x1}" y2="${PLOT.y0}" class="fig-grid" stroke-width="1.5"></line>
      <line x1="${PLOT.x0}" y1="${PLOT.y0}" x2="${PLOT.x0}" y2="${PLOT.y1}" class="fig-grid" stroke-width="1.5"></line>
      ${label({ x: PLOT.x0 - 6, y: PLOT.y1 - 6, text: "voltage / V", anchor: "start", size: SIZE.tick })}
    `;

    const ticks = [0, top / 2, top]
      .map((value) =>
        label({
          x: PLOT.x0 - 8,
          y: y(value) + 5,
          text: fmt(value, 0),
          anchor: "end",
          size: SIZE.tick,
        }),
      )
      .join("");

    const primaryTop = y(vp);
    const secondaryTop = y(vs);
    const primaryBar = `<rect x="140" y="${primaryTop.toFixed(1)}" width="50" height="${(PLOT.y0 - primaryTop).toFixed(1)}" class="fig-accent"></rect>`;
    const secondaryBar = `<rect x="250" y="${secondaryTop.toFixed(1)}" width="50" height="${(PLOT.y0 - secondaryTop).toFixed(1)}" class="fig-ink"></rect>`;

    const names =
      label({ x: 165, y: PLOT.y0 + 18, text: "primary", size: SIZE.tick }) +
      label({ x: 275, y: PLOT.y0 + 18, text: "secondary", size: SIZE.tick });

    svg.innerHTML = `${axes}${ticks}${primaryBar}${secondaryBar}${names}`;

    const ratio = ns / np;
    const kind = ratio > 1 ? "a step-up transformer" : ratio < 1 ? "a step-down transformer" : "an isolating transformer with the same voltage";
    readout.textContent = `Primary ${fmt(vp, 0)} V across ${np} turns. Secondary ${fmt(vs, 0)} V across ${ns} turns. The turns ratio is ${fmt(ratio, 2)}, so this is ${kind}.`;
  }

  react([primaryTurns, secondaryTurns, primaryVolts], update);
}
