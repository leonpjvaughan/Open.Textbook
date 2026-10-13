// Tier-1 guided investigation: a charged particle in a uniform magnetic field.
//
// A proton enters a field that points out of the page. Two sliders set the flux
// density and the speed. The drawing shows the circular path, and the readout
// gives the radius and the time for one full circle. The radius grows with the
// speed while the time does not change, which is the point of the figure.
//
// The drawing is not to scale. Colours come from the fig-* classes. The readout
// is plain HTML, never runtime maths.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-charged-particle-path" style="font:14px system-ui;max-width:620px">
      <svg viewBox="0 0 620 320" width="100%" role="img"
           aria-label="A proton entering a magnetic field out of the page and following a circular path"></svg>
      <label style="display:block;margin:.5rem 0">Flux density (tesla)
        <input class="field" type="range" min="0.05" max="0.5" step="0.01" value="0.2">
        <output class="field-out">0.20</output>
      </label>
      <label style="display:block;margin:.3rem 0">Speed (millions of metres per second)
        <input class="speed" type="range" min="0.5" max="5" step="0.1" value="5">
        <output class="speed-out">5.0</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const field = el.querySelector(".field");
  const speed = el.querySelector(".speed");
  const fieldOut = el.querySelector(".field-out");
  const speedOut = el.querySelector(".speed-out");
  const readout = el.querySelector(".readout");

  const M = 1.67e-27; // mass of a proton, kg
  const Q = 1.60e-19; // charge of a proton, C

  function update() {
    const B = Number(field.value);
    const v = Number(speed.value) * 1e6;
    fieldOut.textContent = B.toFixed(2);
    speedOut.textContent = Number(speed.value).toFixed(1);

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

  field.addEventListener("input", update);
  speed.addEventListener("input", update);
  update();
}
