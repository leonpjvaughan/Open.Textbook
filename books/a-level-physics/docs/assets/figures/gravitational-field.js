// Tier-1 guided investigation: gravitational field strength and potential.
//
// A single slider moves a point outwards from the centre of the Earth. The curve
// is g = GM / r^2, and a marker sits at the chosen distance. The readout gives
// the field strength, its ratio to the surface value and the gravitational
// potential. Colours come from the fig-* classes, so the figure adapts to every
// bundle and to both schemes. The readout is plain HTML, never runtime maths.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Graph of gravitational field strength against distance from the centre of the Earth, with a movable marker",
    width: 620,
    height: 320,
    max: 620,
  });

  const radius = slider(el, { show: false,
    id: "radius",
    label: "Distance from the centre (megametres)",
    min: 6.4,
    max: 38,
    step: 0.1,
    value: 6.8,
    format: (value) => value.toFixed(1),
  });

  const GM = 6.67e-11 * 5.97e24; // m^3 s^-2
  const R = 6.37e6; // m
  const G0 = GM / (R * R); // surface field strength, N/kg

  const LEFT = 70;
  const RIGHT = 580;
  const TOP = 40;
  const BOTTOM = 270;
  const R_MIN = 6.4e6;
  const R_MAX = 38e6;
  const G_MAX = 10;

  const px = (r) => LEFT + ((r - R_MIN) / (R_MAX - R_MIN)) * (RIGHT - LEFT);
  const py = (g) => BOTTOM - (g / G_MAX) * (BOTTOM - TOP);

  function update() {
    const r = Number(radius.value) * 1e6;

    const g = GM / (r * r);
    const V = -GM / r;

    let axes =
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${LEFT}" y2="${TOP}" class="fig-ink"></line>` +
      `${label({ x: LEFT, y: TOP - 12, text: `field strength g / (N kg-1)`, anchor: "start", size: SIZE.heading, class: "text-ink" })}` +
      `${label({ x: RIGHT, y: BOTTOM + 18, text: `distance r / Mm`, anchor: "end", size: SIZE.heading, class: "text-ink" })}`;

    for (let tick = 10; tick <= 35; tick += 5) {
      const x = px(tick * 1e6);
      axes +=
        `<line x1="${x.toFixed(1)}" y1="${BOTTOM}" x2="${x.toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `${label({ x: x.toFixed(1), y: BOTTOM + 16, text: `${tick}`, anchor: "middle", size: SIZE.value, class: "text-ink" })}`;
    }
    for (let tick = 0; tick <= G_MAX; tick += 2) {
      const y = py(tick);
      axes +=
        `<line x1="${LEFT}" y1="${y.toFixed(1)}" x2="${RIGHT}" y2="${y.toFixed(1)}" class="fig-grid"></line>` +
        `${label({ x: LEFT - 8, y: (y + 4).toFixed(1), text: `${tick}`, anchor: "end", size: SIZE.value, class: "text-ink" })}`;
    }

    let curve = "";
    for (let index = 0; index <= 160; index += 1) {
      const sample = R_MIN + (index / 160) * (R_MAX - R_MIN);
      curve += `${px(sample).toFixed(1)},${py(GM / (sample * sample)).toFixed(1)} `;
    }

    const surface =
      `<line x1="${LEFT}" y1="${py(G0).toFixed(1)}" x2="${RIGHT}" y2="${py(G0).toFixed(1)}" class="fig-warn" stroke-width="2" stroke-dasharray="6 4"></line>` +
      `${label({ x: LEFT + 6, y: (py(G0) - 6).toFixed(1), text: `surface value 9.81`, anchor: "start", size: SIZE.value, class: "text-ink" })}`;

    const marker =
      `<line x1="${px(r).toFixed(1)}" y1="${TOP}" x2="${px(r).toFixed(1)}" y2="${BOTTOM}" class="fig-ink" stroke-dasharray="4 3"></line>` +
      `<circle cx="${px(r).toFixed(1)}" cy="${py(g).toFixed(1)}" r="5" class="fig-accent"></circle>`;

    svg.innerHTML =
      axes +
      `<polyline points="${curve.trim()}" class="fig-accent" fill="none" stroke-width="3"></polyline>` +
      surface +
      marker;

    const ratio = g / G0;
    readout.innerHTML =
      `At ${Number(radius.value).toFixed(1)} megametres from the centre, ` +
      `g = <strong>${g.toFixed(2)} N kg<sup>-1</sup></strong>. ` +
      `That is <strong>${ratio.toFixed(3)}</strong> of the surface value. ` +
      `The gravitational potential is <strong>${(V / 1e6).toFixed(1)} MJ kg<sup>-1</sup></strong>. ` +
      `The dashed line is the surface field strength. ` +
      `<em>Find the distance where g is one quarter of the surface value. What is the ratio of the distances?</em>`;
  }

  react(radius, update);
}
