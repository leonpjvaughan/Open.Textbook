// Tier-1 guided investigation: current, potential difference and resistance.
//
// Guided, not a sandbox: the page asks the reader to predict the effect of
// doubling the resistance, and then of doubling the potential difference, before
// the sliders are touched. The figure shows a simple series circuit with a cell,
// a resistor and an ammeter, and reads out the current. The bar below the circuit
// is a current meter, so the drawing changes when the current changes; the wires
// are drawn thicker when they carry more current, as in the other circuit
// figures in this book.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. No colour is the only signal: every value is printed as text and the
// current is written in the readout.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A series circuit with a cell, a resistor and an ammeter, with a current meter below it. The reading changes with the potential difference and the resistance.",
    width: 560,
    height: 250,
    max: 600,
  });

  const pdInput = slider(el, { show: false,
    id: "pd",
    label: "Potential difference (V)",
    min: 1,
    max: 12,
    step: 1,
    value: 6,
  });
  const resistanceInput = slider(el, { show: false,
    id: "resistance",
    label: "Resistance (Ω)",
    min: 1,
    max: 12,
    step: 1,
    value: 3,
  });

  // The current meter below the circuit. The scale runs from zero to the largest
  // current the controls can make: 12 V across 1 ohm.
  const PEAK = 12; // amperes
  const BAR_LEFT = 70;
  const BAR_RIGHT = 490;
  const BAR_Y = 202;
  const BAR_H = 16;
  // A wire is drawn thicker when it carries more current. The value is printed
  // too, so thickness is never the only signal.
  const widthFor = (amps) => (2 + 4 * Math.sqrt(amps / PEAK)).toFixed(1);

  function update() {
    const volts = Number(pdInput.value);
    const ohms = Number(resistanceInput.value);
    const amps = volts / ohms;
    const wire = widthFor(amps);
    const fraction = Math.min(amps / PEAK, 1);
    const barWidth = ((BAR_RIGHT - BAR_LEFT) * fraction).toFixed(1);

    svg.innerHTML =
      // Wires of the loop, thicker when the current is larger.
      `<line x1="70" y1="40" x2="70" y2="92" class="fig-ink" stroke-width="${wire}"></line>` +
      `<line x1="70" y1="108" x2="70" y2="160" class="fig-ink" stroke-width="${wire}"></line>` +
      `<line x1="70" y1="40" x2="230" y2="40" class="fig-ink" stroke-width="${wire}"></line>` +
      `<line x1="330" y1="40" x2="490" y2="40" class="fig-ink" stroke-width="${wire}"></line>` +
      `<line x1="490" y1="40" x2="490" y2="82" class="fig-ink" stroke-width="${wire}"></line>` +
      `<line x1="490" y1="118" x2="490" y2="160" class="fig-ink" stroke-width="${wire}"></line>` +
      `<line x1="490" y1="160" x2="70" y2="160" class="fig-ink" stroke-width="${wire}"></line>` +
      // Cell symbol: a long line (positive) and a short line (negative).
      `<line x1="48" y1="92" x2="92" y2="92" class="fig-ink" stroke-width="3"></line>` +
      `<line x1="60" y1="108" x2="80" y2="108" class="fig-ink" stroke-width="6"></line>` +
      // Resistor block on the top wire.
      `<rect x="230" y="28" width="100" height="24" class="fig-accent"></rect>` +
      `${label({ x: 280, y: 24, text: `resistor`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}` +
      // Ammeter.
      `<circle cx="490" cy="100" r="18" class="fig-grid" stroke-width="2"></circle>` +
      `${label({ x: 490, y: 105, text: `A`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      // Conventional-current arrow on the top wire.
      `<polygon points="440,40 420,32 420,48" class="fig-accent"></polygon>` +
      `${label({ x: 352, y: 26, text: `current`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}` +
      `${label({ x: 70, y: 180, text: `cell`, anchor: "start", size: SIZE.tick, class: "text-ink" })}` +
      // The current meter.
      `${label({ x: BAR_LEFT, y: BAR_Y - 8, text: `current`, anchor: "start", size: SIZE.tick, class: "text-ink" })}` +
      `${label({ x: BAR_RIGHT, y: BAR_Y - 8, text: `${amps.toFixed(2)} A`, anchor: "end", size: SIZE.tick, class: "text-ink" })}` +
      `<rect x="${BAR_LEFT}" y="${BAR_Y}" width="${BAR_RIGHT - BAR_LEFT}" height="${BAR_H}" class="fig-grid"></rect>` +
      `<rect x="${BAR_LEFT}" y="${BAR_Y}" width="${barWidth}" height="${BAR_H}" class="fig-accent"></rect>` +
      `${label({ x: BAR_LEFT, y: BAR_Y + BAR_H + 16, text: `0`, anchor: "start", size: SIZE.tick, class: "text-ink" })}` +
      `${label({ x: BAR_RIGHT, y: BAR_Y + BAR_H + 16, text: `${PEAK} A`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`;

    readout.innerHTML =
      `Potential difference <strong>${volts} V</strong>. ` +
      `Resistance <strong>${ohms} &Omega;</strong>. ` +
      `Current <strong>${amps.toFixed(2)} A</strong>. ` +
      `<em>The current is the potential difference divided by the resistance. ` +
      `What happens to the current if the resistance doubles?</em>`;
  }

  react([pdInput, resistanceInput], update);
}
