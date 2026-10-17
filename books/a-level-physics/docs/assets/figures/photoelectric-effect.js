// Tier-1 guided investigation: the photoelectric effect.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Two sliders set the wavelength of the light and the work function of
// the metal. The left panel draws the photon energy and the maximum kinetic
// energy against wavelength; a dashed line marks the work function. The readout
// states whether emission happens and gives the threshold wavelength.
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
      "Photon energy and maximum kinetic energy against wavelength for a photocell, with a marked threshold",
    width: 620,
    height: 300,
    max: 620,
  });

  const wavelength = slider(el, { show: true,
    id: "wavelength",
    label: "Wavelength (nanometres)",
    min: 200,
    max: 800,
    step: 10,
    value: 250,
  });
  const work = slider(el, { show: true,
    id: "work",
    label: "Work function (electronvolts)",
    min: 1,
    max: 4,
    step: 0.1,
    value: 2,
    format: (value) => value.toFixed(1),
  });

  const LEFT = 70;
  const RIGHT = 580;
  const TOP = 40;
  const BOTTOM = 250;
  const HC = 6.63e-34 * 3.0e8 * 1e9 / 1.6e-19; // electronvolt nanometres
  const LAM_MIN = 200;
  const LAM_MAX = 800;
  const E_MAX = 5.5;

  const px = (lam) => LEFT + ((lam - LAM_MIN) / (LAM_MAX - LAM_MIN)) * (RIGHT - LEFT);
  const py = (e) => BOTTOM - (e / E_MAX) * (BOTTOM - TOP);

  function update() {
    const lam = Number(wavelength.value);
    const phi = Number(work.value);

    const photon = HC / lam;
    const threshold = HC / phi;
    const kinetic = Math.max(0, photon - phi);
    const emits = photon >= phi;

    let axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT}" y2="${TOP}" class="fig-ink"></line>` +
      `${label({ x: LEFT, y: TOP - 12, text: `energy / eV`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: RIGHT, y: BOTTOM + 18, text: `wavelength / nm`, anchor: "end", size: SIZE.heading, class: "text-ink" })}`;

    for (let tick = LAM_MIN; tick <= LAM_MAX; tick += 100) {
      const x = px(tick);
      axes +=
        `<line x1="${x.toFixed(1)}" y1="${BOTTOM}" x2="${x.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `${label({ x: x.toFixed(1), y: BOTTOM + 16, text: `${tick}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;
    }
    for (let tick = 0; tick <= 5; tick += 1) {
      const y = py(tick);
      axes +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `${label({ x: LEFT - 8, y: (y + 4).toFixed(1), text: `${tick}`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;
    }

    let photonCurve = "";
    let kineticCurve = "";
    for (let index = 0; index <= 120; index += 1) {
      const sample = LAM_MIN + (index / 120) * (LAM_MAX - LAM_MIN);
      const photonSample = HC / sample;
      photonCurve += `${px(sample).toFixed(1)},${py(photonSample).toFixed(1)} `;
      if (photonSample > phi) {
        kineticCurve += `${px(sample).toFixed(1)},${py(photonSample - phi).toFixed(1)} `;
      }
    }

    const curves =
      `<polyline points="${photonCurve.trim()}" class="fig-accent" fill="none" stroke-width="3"></polyline>` +
      `<polyline points="${kineticCurve.trim()}" class="fig-good" fill="none" stroke-width="3"></polyline>` +
      `<line x1="${LEFT}" y1="${py(phi).toFixed(1)}" x2="${RIGHT}" y2="${py(phi).toFixed(1)}" class="fig-warn" stroke-width="2" stroke-dasharray="6 4"></line>` +
      `${label({ x: LEFT + 6, y: (py(phi) - 6).toFixed(1), text: `work function`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;

    let marker = "";
    if (threshold >= LAM_MIN && threshold <= LAM_MAX) {
      marker =
        `<line x1="${px(threshold).toFixed(1)}" y1="${TOP}" x2="${px(threshold).toFixed(1)}" y2="${BOTTOM}" class="fig-ink" stroke-dasharray="4 3"></line>` +
        `${label({ x: (px(threshold) + 4).toFixed(1), y: TOP + 12, text: `threshold`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;
    }

    svg.innerHTML = axes + marker + curves;

    const verdict = emits
      ? 'electrons are released'
      : 'no electrons are released';
    readout.innerHTML =
      `At ${lam} nm the photon energy is <strong>${photon.toFixed(2)} eV</strong>. ` +
      `With a work function of ${phi.toFixed(1)} eV, <strong>${verdict}</strong>. ` +
      `The maximum kinetic energy is <strong>${kinetic.toFixed(2)} eV</strong>. ` +
      `The threshold wavelength is <strong>${Math.round(threshold)} nm</strong>. ` +
      `The red line is the photon energy. The dashed line is the work function. ` +
      `<em>Find the wavelength where the two lines cross. What happens below it?</em>`;
  }

  react([wavelength, work], update);
}
