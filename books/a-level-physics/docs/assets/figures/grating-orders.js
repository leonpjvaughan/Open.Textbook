// Tier-1 guided investigation: the maxima from a diffraction grating.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Two sliders set the wavelength of the light and the number of lines
// per millimetre. The figure draws the grating, the straight-through direction
// and the rays to each order, with the order number on an arc. The readout gives
// the slit spacing, the highest order and the angle of each order.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-grating-orders" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 330" width="100%" height="330" role="img"
           aria-label="A diffraction grating with rays at each order, drawn on an arc"></svg>
      <label style="display:block;margin:.5rem 0">Wavelength (nanometres)
        <input class="wavelength" type="range" min="400" max="700" step="10" value="600">
        <output class="wavelength-out">600</output>
      </label>
      <label style="display:block;margin:.3rem 0">Grating lines per millimetre
        <input class="density" type="range" min="100" max="1000" step="50" value="300">
        <output class="density-out">300</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const wavelength = el.querySelector(".wavelength");
  const density = el.querySelector(".density");
  const wavelengthOut = el.querySelector(".wavelength-out");
  const densityOut = el.querySelector(".density-out");
  const readout = el.querySelector(".readout");

  const GX = 300;
  const GY = 300;
  const RADIUS = 230;
  const LIMIT_DEG = 80;

  function point(angleDeg) {
    const radians = (angleDeg * Math.PI) / 180;
    return {
      x: GX + RADIUS * Math.sin(radians),
      y: GY - RADIUS * Math.cos(radians),
    };
  }

  function update() {
    const lambdaNm = Number(wavelength.value);
    const lines = Number(density.value);
    wavelengthOut.textContent = String(lambdaNm);
    densityOut.textContent = String(lines);

    const lambdaM = lambdaNm * 1e-9;
    const dM = 1 / (lines * 1000);
    const ratio = lambdaM / dM;
    const highest = Math.floor(ratio);

    let arcPath = "";
    for (let step = -LIMIT_DEG; step <= LIMIT_DEG; step += 2) {
      const { x, y } = point(step);
      arcPath += `${step === -LIMIT_DEG ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
    }

    const grating =
      `<line x1="${GX - 120}" y1="${GY}" x2="${GX + 120}" y2="${GY}" class="fig-ink" stroke-width="4"></line>` +
      `<text x="${GX - 124}" y="${GY + 16}" font-size="11" class="fig-ink" text-anchor="end">grating</text>` +
      `<line x1="${GX}" y1="${GY}" x2="${GX}" y2="${GY - RADIUS}" class="fig-grid" stroke-dasharray="4 4"></line>` +
      `<text x="${GX + 4}" y="${GY - RADIUS + 12}" font-size="10" class="fig-ink">n = 0</text>`;

    const arc = `<path d="${arcPath.trim()}" fill="none" class="fig-ink"></path>`;

    let rays = "";
    let count = 0;
    for (let n = -highest; n <= highest; n += 1) {
      const sine = n * ratio;
      if (Math.abs(sine) > Math.sin((LIMIT_DEG * Math.PI) / 180)) {
        continue;
      }
      count += 1;
      const angle = (Math.asin(sine) * 180) / Math.PI;
      const { x, y } = point(angle);
      const cls = n === 0 ? "fig-good" : "fig-accent";
      rays +=
        `<line x1="${GX}" y1="${GY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" class="${cls}" stroke-width="2"></line>` +
        `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" class="${cls}"></circle>` +
        `<text x="${(GX + (x - GX) * 1.03).toFixed(1)}" y="${(GY + (y - GY) * 1.03).toFixed(1)}" ` +
        `font-size="11" class="fig-ink" text-anchor="middle">${n}</text>`;
    }

    svg.innerHTML = arc + grating + rays;

    const dMicrometres = dM * 1e6;
    const firstAngle = ratio <= 1
      ? `${(Math.asin(ratio) * (180 / Math.PI)).toFixed(1)}&deg;`
      : "impossible, because the sine would be greater than 1";

    readout.innerHTML =
      `Wavelength ${lambdaNm} nm, grating ${lines} lines per millimetre. ` +
      `The slit spacing is <strong>${dMicrometres.toFixed(2)} &micro;m</strong>. ` +
      `The highest order is <strong>${highest}</strong>, so ${count} maxima are drawn. ` +
      `The first-order maximum is at ${firstAngle} from the straight-through direction. ` +
      `<em>Increase the number of lines per millimetre: does the pattern spread out or pack together?</em>`;
  }

  wavelength.addEventListener("input", update);
  density.addEventListener("input", update);
  update();
}
