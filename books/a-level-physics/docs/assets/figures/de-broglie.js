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
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
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
      `<text x="${LEFT}" y="${TOP - 12}" font-size="20" class="fig-ink">wavelength / pm</text>` +
      `<text x="${RIGHT}" y="${BOTTOM + 18}" font-size="20" class="fig-ink" text-anchor="end">voltage / V</text>`;

    for (let tick = V_MIN; tick <= V_MAX; tick += 150) {
      const x = px(tick);
      axes +=
        `<line x1="${x.toFixed(1)}" y1="${BOTTOM}" x2="${x.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `<text x="${x.toFixed(1)}" y="${BOTTOM + 16}" font-size="18" class="fig-ink" text-anchor="middle">${tick}</text>`;
    }
    for (let tick = 0; tick <= 200; tick += 50) {
      const y = py(tick);
      axes +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `<text x="${LEFT - 8}" y="${(y + 4).toFixed(1)}" font-size="18" class="fig-ink" text-anchor="end">${tick}</text>`;
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
