// Tier-1 guided investigation: the de Broglie wavelength of an accelerated
// electron.
//
// Guided, not a sandbox: the page asks the reader to predict before moving the
// control. One slider sets the accelerating potential difference. The left panel
// plots the de Broglie wavelength against the voltage, with the current point
// marked. The readout gives the kinetic energy, the momentum and the wavelength.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label:
      "De Broglie wavelength of an electron against accelerating voltage, with the working point marked",
    width: 620,
    height: 300,
    max: 620,
  });

  const voltage = slider(el, { show: false,
    id: "voltage",
    label: "Accelerating voltage (volts)",
    min: 50,
    max: 1000,
    step: 10,
    value: 150,
  });

  const LEFT = 80;
  const RIGHT = 580;
  const TOP = 40;
  const BOTTOM = 250;
  const V_MIN = 50;
  const V_MAX = 1000;
  const LAM_MAX_PM = 200;
  const h = 6.63e-34;
  const m = 9.11e-31;
  const e = 1.6e-19;

  const wavelengthPm = (v) => (h / Math.sqrt(2 * m * e * v)) * 1e12;

  const px = (v) => LEFT + ((v - V_MIN) / (V_MAX - V_MIN)) * (RIGHT - LEFT);
  const py = (lam) => BOTTOM - (lam / LAM_MAX_PM) * (BOTTOM - TOP);

  function update() {
    const v = Number(voltage.value);

    const energy = e * v;
    const momentum = Math.sqrt(2 * m * energy);
    const lam = h / momentum;
    const lamPm = lam * 1e12;

    let axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT}" y2="${TOP}" class="fig-ink"></line>` +
      `${label({ x: LEFT, y: TOP - 12, text: `wavelength / pm`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: RIGHT, y: BOTTOM + 18, text: `voltage / V`, anchor: "end", size: SIZE.heading, class: "text-ink" })}`;

    for (let tick = V_MIN; tick <= V_MAX; tick += 150) {
      const x = px(tick);
      axes +=
        `<line x1="${x.toFixed(1)}" y1="${BOTTOM}" x2="${x.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `${label({ x: x.toFixed(1), y: BOTTOM + 16, text: `${tick}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;
    }
    for (let tick = 0; tick <= 200; tick += 50) {
      const y = py(tick);
      axes +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `${label({ x: LEFT - 8, y: (y + 4).toFixed(1), text: `${tick}`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;
    }

    let curve = "";
    for (let index = 0; index <= 120; index += 1) {
      const sample = V_MIN + (index / 120) * (V_MAX - V_MIN);
      curve += `${px(sample).toFixed(1)},${py(wavelengthPm(sample)).toFixed(1)} `;
    }

    const line =
      `<polyline points="${curve.trim()}" class="fig-accent" fill="none" stroke-width="3"></polyline>`;
    const marker =
      `<circle cx="${px(v).toFixed(1)}" cy="${py(lamPm).toFixed(1)}" r="6" class="fig-warn"></circle>`;

    svg.innerHTML = axes + line + marker;

    // Four numbers are printed, and each is the next one's input: the energy from the
    // accelerating voltage, the momentum from the energy, and the wavelength from the
    // momentum. A `shown` in standard form reads to the verifier as a label, but the
    // answer beside it is still proved exactly — `6.63e-34` is a rational, not a float.
    claim([
      {
        label: "kinetic energy gained, charge times voltage",
        expression: "e * v",
        values: { e, v },
        answer: energy,
        shown: `${(energy * 1e17).toFixed(2)} \u00d7 10^-17`,
      },
      {
        label: "momentum, from the kinetic energy",
        expression: "sqrt(2 * m * energy)",
        values: { m, energy },
        answer: momentum,
        shown: `${(momentum * 1e24).toFixed(2)} \u00d7 10^-24`,
      },
      {
        label: "de Broglie wavelength in picometres",
        expression: "h / momentum * 1e12",
        values: { h, momentum },
        answer: lamPm,
        shown: lamPm.toFixed(1),
      },
      {
        label: "de Broglie wavelength in metres",
        expression: "h / momentum",
        values: { h, momentum },
        answer: lam,
        shown: `${(lam * 1e10).toFixed(3)} \u00d7 10^-10`,
      },
    ]);
    readout.innerHTML =
      `At ${v} V the electron gains <strong>${(energy * 1e17).toFixed(2)} &times; 10<sup>-17</sup> J</strong>. ` +
      `Its momentum is <strong>${(momentum * 1e24).toFixed(2)} &times; 10<sup>-24</sup> kg m/s</strong>. ` +
      `Its de Broglie wavelength is <strong>${lamPm.toFixed(1)} pm</strong>, ` +
      `which is <strong>${(lam * 1e10).toFixed(3)} &times; 10<sup>-10</sup> m</strong>. ` +
      `The curve is steeper at low voltage than at high voltage. ` +
      `<em>Double the voltage. Does the wavelength halve? Use the curve to check.</em>`;
  }

  react(voltage, update);
}
