// Tier-1 guided investigation: the binding energy per nucleon.
//
// Guided, not a sandbox: the page asks the reader to predict before moving the
// control. One slider sets the nucleon number. The left panel draws a schematic
// curve of the binding energy per nucleon against the nucleon number, with the
// chosen nuclide marked. The readout gives the value at that position.
//
// The curve is a sketch through the measured values; it is not a table of every
// nuclide. Colours come from CSS classes, so the figure adapts to every bundle
// and to both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Schematic curve of binding energy per nucleon against nucleon number, with the chosen nuclide marked",
    width: 620,
    height: 300,
    max: 620,
  });

  const mass = slider(el, { show: false,
    id: "mass",
    label: "Nucleon number",
    min: 1,
    max: 250,
    value: 56,
  });

  const LEFT = 80;
  const RIGHT = 580;
  const TOP = 40;
  const BOTTOM = 250;
  const A_MIN = 1;
  const A_MAX = 250;
  const E_MAX = 10;

  // A sketch through measured binding-energy-per-nucleon values, in MeV.
  const POINTS = [
    [1, 0],
    [2, 1.1],
    [4, 7.1],
    [7, 5.6],
    [12, 7.7],
    [20, 8.0],
    [40, 8.6],
    [56, 8.79],
    [80, 8.71],
    [120, 8.48],
    [160, 8.24],
    [200, 8.03],
    [238, 7.57],
  ];

  function valueAt(a) {
    for (let index = 1; index < POINTS.length; index += 1) {
      const [a0, e0] = POINTS[index - 1];
      const [a1, e1] = POINTS[index];
      if (a <= a1) {
        return e0 + ((a - a0) / (a1 - a0)) * (e1 - e0);
      }
    }
    return POINTS[POINTS.length - 1][1];
  }

  const px = (a) => LEFT + ((a - A_MIN) / (A_MAX - A_MIN)) * (RIGHT - LEFT);
  const py = (e) => BOTTOM - (e / E_MAX) * (BOTTOM - TOP);

  function update() {
    const a = Number(mass.value);
    const value = a === 1 ? 0 : valueAt(a);

    let axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT}" y2="${TOP}" class="fig-ink"></line>` +
      `${label({ x: LEFT, y: TOP - 12, text: `binding energy per nucleon / MeV`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: RIGHT, y: BOTTOM + 18, text: `nucleon number`, anchor: "end", size: SIZE.heading, class: "text-ink" })}`;

    for (let tick = 0; tick <= 250; tick += 50) {
      const x = px(tick);
      axes +=
        `<line x1="${x.toFixed(1)}" y1="${BOTTOM}" x2="${x.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `${label({ x: x.toFixed(1), y: BOTTOM + 16, text: `${tick}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;
    }
    for (let tick = 0; tick <= 10; tick += 2) {
      const y = py(tick);
      axes +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `${label({ x: LEFT - 8, y: (y + 4).toFixed(1), text: `${tick}`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;
    }

    let curve = "";
    for (let index = 0; index < POINTS.length; index += 1) {
      const [pointA, pointE] = POINTS[index];
      curve += `${px(pointA).toFixed(1)},${py(pointE).toFixed(1)} `;
    }

    const line =
      `<polyline points="${curve.trim()}" class="fig-accent" style="fill:none" stroke-width="3"></polyline>`;
    const marker =
      `<circle cx="${px(a).toFixed(1)}" cy="${py(value).toFixed(1)}" r="6" class="fig-warn"></circle>`;

    const peak =
      `<line x1="${px(56).toFixed(1)}" y1="${TOP}" x2="${px(56).toFixed(1)}" y2="${BOTTOM}" class="fig-ink" stroke-dasharray="4 3"></line>` +
      `${label({ x: (px(56) + 4).toFixed(1), y: TOP + 12, text: `iron-56`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;

    svg.innerHTML = axes + line + peak + marker;

    const region =
      a < 56
        ? 'light, on the rising part of the curve'
        : 'heavy, on the falling part of the curve';
    readout.innerHTML =
      `For a nucleon number of <strong>${a}</strong> the binding energy per nucleon is ` +
      `<strong>${value.toFixed(2)} MeV</strong>. This nucleus is ${region}. ` +
      `The peak is near iron-56, at about 8.8 MeV per nucleon. ` +
      `<em>Move the marker to a light nucleus and to a heavy one. ` +
      `Why does moving towards the peak release energy?</em>`;
  }

  react(mass, update);
}
