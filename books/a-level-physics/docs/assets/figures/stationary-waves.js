// Tier-1 guided investigation: harmonics on a string fixed at both ends.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Three sliders set the harmonic number, the length of the string and
// the phase of the motion. The figure draws the shape of the string and marks
// every node and antinode. The nodes stay still whatever the phase, which is the
// point of the investigation. The readout gives the wavelength and the frequency.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "The shape of a stationary wave on a string fixed at both ends, with nodes and antinodes marked",
    width: 600,
    height: 300,
    max: 600,
  });

  const harmonic = slider(el, { show: true,
    id: "harmonic",
    label: "Harmonic",
    min: 1,
    max: 6,
    step: 1,
    value: 1,
  });
  const length = slider(el, { show: true,
    id: "length",
    label: "String length (metres)",
    min: 0.2,
    max: 1.5,
    step: 0.05,
    value: 0.65,
    format: (value) => value.toFixed(2),
  });
  const phase = slider(el, { show: true,
    id: "phase",
    label: "Phase of the motion",
    min: 0,
    max: 1,
    step: 0.02,
    value: 0,
    format: (value) => value.toFixed(2),
  });

  const MID_Y = 150;
  const AMPLITUDE = 80;
  const X0 = 120;
  const SPEED = 450;

  function update() {
    const n = Number(harmonic.value);
    const lengthM = Number(length.value);
    const phaseValue = Number(phase.value);

    const x1 = X0;
    const x2 = X0 + (lengthM / 1.5) * 380;
    const xFor = (u) => x1 + u * (x2 - x1);
    const shape = (u) => Math.sin(n * Math.PI * u) * Math.cos(2 * Math.PI * phaseValue);

    let curve = "";
    for (let index = 0; index <= 200; index += 1) {
      const u = index / 200;
      const x = xFor(u);
      const y = MID_Y - AMPLITUDE * shape(u);
      curve += `${x.toFixed(1)},${y.toFixed(1)} `;
    }

    let envelope = "";
    for (let index = 0; index <= 200; index += 1) {
      const u = index / 200;
      const x = xFor(u);
      envelope += `${x.toFixed(1)},${(MID_Y - AMPLITUDE * Math.sin(n * Math.PI * u)).toFixed(1)} `;
    }

    let nodes = "";
    for (let k = 0; k <= n; k += 1) {
      const x = xFor(k / n);
      nodes += `<circle cx="${x.toFixed(1)}" cy="${MID_Y}" r="5" class="fig-good"></circle>`;
    }

    let antinodes = "";
    for (let k = 0; k < n; k += 1) {
      const u = (k + 0.5) / n;
      const x = xFor(u);
      const y = MID_Y - AMPLITUDE * shape(u);
      antinodes +=
        `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" class="fig-warn"></circle>` +
        `<line x1="${x.toFixed(1)}" y1="${MID_Y}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="fig-warn" stroke-dasharray="2 3"></line>`;
    }

    const frame =
      `<line x1="${X0 - 30}" y1="${MID_Y}" x2="${X0 + 420}" y2="${MID_Y}" class="fig-grid" stroke-dasharray="4 4"></line>` +
      `<line x1="${x1}" y1="${MID_Y - 110}" x2="${x1}" y2="${MID_Y + 110}" class="fig-ink" stroke-width="3"></line>` +
      `<line x1="${x2}" y1="${MID_Y - 110}" x2="${x2}" y2="${MID_Y + 110}" class="fig-ink" stroke-width="3"></line>` +
      `${label({ x: x1 - 6, y: MID_Y - 116, text: `fixed end`, anchor: "middle", size: SIZE.value, class: "text-ink" })}` +
      `${label({ x: x2 + 6, y: MID_Y - 116, text: `fixed end`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;

    svg.innerHTML =
      frame +
      `<polyline points="${envelope.trim()}" class="fig-grid" fill="none" stroke-dasharray="3 3"></polyline>` +
      `<polyline points="${curve.trim()}" class="fig-accent" fill="none" stroke-width="3"></polyline>` +
      nodes +
      antinodes;

    const wavelength = (2 * lengthM) / n;
    const frequency = (n * SPEED) / (2 * lengthM);
    readout.innerHTML =
      `Harmonic ${n}, string ${lengthM.toFixed(2)} m long, wave speed ${SPEED} m/s. ` +
      `The wavelength is <strong>${wavelength.toFixed(3)} m</strong> and the frequency is ` +
      `<strong>${frequency.toFixed(0)} Hz</strong>. ` +
      `There are ${n + 1} nodes and ${n} antinodes. ` +
      `<em>Drag the phase: which points never move, and why?</em>`;
  }

  react([harmonic, length, phase], update);
}
