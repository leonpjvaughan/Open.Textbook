// Tier-1 guided investigation: the uniform electric field between two plates.
//
// Two sliders set the potential difference and the separation of the plates. The
// drawing changes the number of field arrows as the field strength changes. The
// readout gives the field strength, the force on a xenon ion, and the kinetic
// energy the ion gains crossing the gap. That energy depends on the potential
// difference alone, not on the separation, which is the point of the figure.
//
// Colours come from the fig-* classes. The readout is plain HTML, never runtime
// maths.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import {
  label,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Two parallel plates with a uniform electric field between them and a positive ion crossing the gap",
    width: 620,
    height: 300,
    max: 620,
  });

  const volts = slider(el, { show: true,
    id: "volts",
    label: "Potential difference (volts)",
    min: 200,
    max: 2000,
    step: 10,
    value: 1200,
  });
  const gap = slider(el, { show: true,
    id: "gap",
    label: "Separation (millimetres)",
    min: 0.5,
    max: 5,
    step: 0.1,
    value: 1.5,
    format: (value) => value.toFixed(1),
  });

  const Q = 1.60e-19; // charge on a xenon ion, C

  function update() {
    const V = Number(volts.value);
    const d = Number(gap.value) * 1e-3;

    const E = V / d;
    const F = Q * E;
    const energyJ = Q * V;

    const LEFT = 130;
    const RIGHT = 510;
    const TOP = 60;
    const BOTTOM = 240;

    let drawing =
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-accent" stroke-width="6"></line>` +
      `<line x1="${RIGHT}" y1="${TOP}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-accent" stroke-width="6"></line>` +
      `${label({ x: LEFT, y: TOP - 12, text: `+ plate`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: RIGHT, y: TOP - 12, text: `- plate`, anchor: "middle", size: SIZE.heading, class: "text-ink" })}`;

    const arrows = Math.max(
      2,
      Math.min(9, 2 + Math.round((7 * (Math.log10(E) - Math.log10(4e4))) / 2))
    );
    for (let index = 0; index < arrows; index += 1) {
      const y = TOP + ((index + 1) / (arrows + 1)) * (BOTTOM - TOP);
      const tip = RIGHT - 14;
      drawing +=
        `<line x1="${LEFT + 14}" y1="${y.toFixed(1)}" x2="${tip}" y2="${y.toFixed(1)}" class="fig-ink"></line>` +
        `<polygon points="${tip},${(y - 5).toFixed(1)} ${tip},${(y + 5).toFixed(1)} ${tip + 10},${y.toFixed(1)}" class="fig-ink"></polygon>`;
    }

    const ionX = LEFT + 70;
    const ionY = (TOP + BOTTOM) / 2;
    drawing +=
      `<circle cx="${ionX}" cy="${ionY}" r="8" class="fig-good"></circle>` +
      `${label({ x: ionX, y: ionY + 4, text: `+`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      `<line x1="${ionX + 12}" y1="${ionY}" x2="${ionX + 70}" y2="${ionY}" class="fig-good" stroke-width="2"></line>` +
      `<polygon points="${ionX + 70},${ionY - 5} ${ionX + 70},${ionY + 5} ${ionX + 80},${ionY}" class="fig-good"></polygon>` +
      `${label({ x: LEFT + 30, y: BOTTOM + 28, text: `gap ${quantity(Number(gap.value), "mm", 1)}`, anchor: "start", size: SIZE.heading, class: "text-ink" })}`;

    svg.innerHTML = drawing;

    readout.innerHTML =
      `With ${V} V across ${quantity(Number(gap.value), "mm", 1)}, ` +
      `E = <strong>${(E / 1000).toFixed(0)} kV m<sup>-1</sup></strong>. ` +
      `The force on one xenon ion is <strong>${F.toExponential(2)} N</strong>. ` +
      `The ion gains <strong>${V} eV</strong> = ` +
      `<strong>${energyJ.toExponential(2)} J</strong> crossing the gap. ` +
      `<em>Change the separation but keep the potential difference. What happens to the energy gained?</em>`;
  }

  react([volts, gap], update);
}
