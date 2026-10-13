// Tier-1 guided investigation: a charged particle in a uniform magnetic field.
//
// A proton enters a field that points out of the page. Two sliders set the flux
// density and the speed. The drawing shows the circular path, and the readout
// gives the radius and the time for one full circle. The radius grows with the
// speed while the time does not change, which is the point of the figure.
//
// The drawing is not to scale. Colours come from the fig-* classes. The readout
// is plain HTML, never runtime maths.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A proton entering a magnetic field out of the page and following a circular path",
    width: 620,
    height: 320,
    max: 620,
  });

  const field = slider(el, {
    id: "field",
    label: "Flux density (tesla)",
    min: 0.05,
    max: 0.5,
    step: 0.01,
    value: 0.2,
    format: (value) => value.toFixed(2),
  });
  const speed = slider(el, {
    id: "speed",
    label: "Speed (millions of metres per second)",
    min: 0.5,
    max: 5,
    step: 0.1,
    value: 5,
    format: (value) => value.toFixed(1),
  });

  const M = 1.67e-27; // mass of a proton, kg
  const Q = 1.60e-19; // charge of a proton, C

  function update() {
    const B = Number(field.value);
    const v = Number(speed.value) * 1e6;

    const r = (M * v) / (B * Q);
    const period = (2 * Math.PI * M) / (B * Q);

    const LEFT = 90;
    const RIGHT = 560;
    const TOP = 40;
    const BOTTOM = 290;
    const MID = (TOP + BOTTOM) / 2;

    const rMin = (M * 0.5e6) / (0.5 * Q);
    const rMax = (M * 5e6) / (0.05 * Q);
    const rPx =
      30 +
      (110 * (Math.log10(r) - Math.log10(rMin))) /
        (Math.log10(rMax) - Math.log10(rMin));

    const entryX = LEFT;
    const entryY = TOP + 30;
    const centreX = entryX;
    const centreY = entryY + rPx;

    let dots = "";
    for (let x = LEFT + 20; x < RIGHT; x += 46) {
      for (let y = TOP + 30; y < BOTTOM - 10; y += 46) {
        dots +=
          `<circle cx="${x}" cy="${y}" r="2.5" class="fig-ink"></circle>` +
          `<circle cx="${x}" cy="${y}" r="6" class="fig-ink" fill="none"></circle>`;
      }
    }

    const circle =
      `<circle cx="${centreX}" cy="${centreY.toFixed(1)}" r="${rPx.toFixed(1)}" class="fig-grid" fill="none" stroke-dasharray="5 4"></circle>`;

    const endAngle = Math.PI / 2;
    const endX = centreX + rPx * Math.sin(endAngle);
    const endY = centreY - rPx * Math.cos(endAngle);
    const arc =
      `<path d="M ${entryX} ${entryY} A ${rPx.toFixed(1)} ${rPx.toFixed(1)} 0 0 1 ${endX.toFixed(1)} ${endY.toFixed(1)}" class="fig-accent" fill="none" stroke-width="3"></path>` +
      `<circle cx="${endX.toFixed(1)}" cy="${endY.toFixed(1)}" r="6" class="fig-good"></circle>` +
      `<circle cx="${entryX}" cy="${entryY}" r="6" class="fig-ink"></circle>` +
      `<text x="${entryX + 12}" y="${entryY + 4}" font-size="18" class="fig-ink">proton in</text>` +
      `<text x="${RIGHT - 10}" y="${TOP + 18}" font-size="18" class="fig-ink" text-anchor="end">field out of the page</text>`;

    svg.innerHTML = dots + circle + arc;

    readout.innerHTML =
      `With B = ${B.toFixed(2)} T and v = ${Number(speed.value).toFixed(1)} x 10<sup>6</sup> m s<sup>-1</sup>, ` +
      `the radius is <strong>${(r * 1000).toFixed(1)} mm</strong> and ` +
      `the time for one full circle is <strong>${(period * 1e9).toFixed(0)} ns</strong>. ` +
      `The drawing is not to scale. ` +
      `<em>Double the speed. What happens to the radius, and what happens to the time for one circle?</em>`;
  }

  react([field, speed], update);
}
