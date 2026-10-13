// Tier-1 guided investigation: interference from two coherent sources.
//
// Guided, not a sandbox: the page asks the reader to predict before moving a
// control. Three sliders set the wavelength, the separation of the two sources
// and the distance to the screen. The figure draws the two sources, the rays
// that reach the first bright fringe, and the bright fringes on the screen. The
// readout gives the fringe spacing and the angles of the maxima.
//
// Colours come from CSS classes, so the figure adapts to every bundle and to
// both schemes. No colour literal appears here, and no runtime LaTeX: the
// readout is plain HTML.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-interference-2source" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 320" width="100%" role="img"
           aria-label="Two coherent sources, the rays to the first bright fringe, and the bright fringes on a screen"></svg>
      <label style="display:block;margin:.5rem 0">Wavelength (nanometres)
        <input class="wavelength" type="range" min="400" max="700" step="10" value="600">
        <output class="wavelength-out">600</output>
      </label>
      <label style="display:block;margin:.3rem 0">Source separation (millimetres)
        <input class="separation" type="range" min="0.05" max="0.50" step="0.01" value="0.25">
        <output class="separation-out">0.25</output>
      </label>
      <label style="display:block;margin:.3rem 0">Distance to the screen (metres)
        <input class="distance" type="range" min="0.5" max="3.0" step="0.1" value="2.5">
        <output class="distance-out">2.5</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const wavelength = el.querySelector(".wavelength");
  const separation = el.querySelector(".separation");
  const distance = el.querySelector(".distance");
  const wavelengthOut = el.querySelector(".wavelength-out");
  const separationOut = el.querySelector(".separation-out");
  const distanceOut = el.querySelector(".distance-out");
  const readout = el.querySelector(".readout");

  const SLIT_X = 90;
  const MID_Y = 160;
  const PX_PER_MM = 6;
  const HALF_SCREEN_PX = 140;

  function update() {
    const lambdaNm = Number(wavelength.value);
    const sMm = Number(separation.value);
    const dM = Number(distance.value);
    wavelengthOut.textContent = String(lambdaNm);
    separationOut.textContent = sMm.toFixed(2);
    distanceOut.textContent = dM.toFixed(1);

    const lambdaM = lambdaNm * 1e-9;
    const sM = sMm * 1e-3;
    const wMm = (lambdaM * dM) / sM * 1000;
    const screenX = 210 + ((dM - 0.5) / 2.5) * 300;
    const sepPx = 30 + sMm * 180;
    const yTop = MID_Y - sepPx / 2;
    const yBottom = MID_Y + sepPx / 2;

    const frame =
      `<line x1="${SLIT_X}" y1="20" x2="${SLIT_X}" y2="300" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="${screenX}" y1="20" x2="${screenX}" y2="300" class="fig-ink" stroke-width="2"></line>` +
      `<text x="${SLIT_X - 6}" y="14" font-size="19" class="fig-ink" text-anchor="end">two slits</text>` +
      `<text x="${screenX + 6}" y="14" font-size="19" class="fig-ink">screen</text>` +
      `<circle cx="${SLIT_X}" cy="${yTop}" r="4" class="fig-good"></circle>` +
      `<circle cx="${SLIT_X}" cy="${yBottom}" r="4" class="fig-good"></circle>` +
      `<line x1="${SLIT_X + 8}" y1="${yTop}" x2="${SLIT_X + 8}" y2="${yBottom}" class="fig-warn" stroke-width="2"></line>` +
      `<text x="${SLIT_X + 12}" y="${(MID_Y).toFixed(1)}" font-size="17" class="fig-warn">s</text>`;

    // The bright fringes: equally spaced bands on the screen, spaced w apart.
    let fringes = "";
    const maxOrder = Math.min(8, Math.floor(HALF_SCREEN_PX / (PX_PER_MM * wMm)));
    for (let n = -maxOrder; n <= maxOrder; n += 1) {
      const y = MID_Y - n * wMm * PX_PER_MM;
      const width = n === 0 ? 5 : 3;
      fringes +=
        `<line x1="${screenX - 14}" y1="${y.toFixed(1)}" x2="${screenX + 14}" y2="${y.toFixed(1)}" ` +
        `class="fig-accent" stroke-width="${width}"></line>`;
    }

    // Rays from each slit to the first-order bright fringe, when it is on screen.
    let rays = "";
    if (maxOrder >= 1) {
      const y1 = MID_Y - wMm * PX_PER_MM;
      rays =
        `<line x1="${SLIT_X}" y1="${yTop}" x2="${screenX - 14}" y2="${y1.toFixed(1)}" class="fig-grid" stroke-dasharray="3 3"></line>` +
        `<line x1="${SLIT_X}" y1="${yBottom}" x2="${screenX - 14}" y2="${y1.toFixed(1)}" class="fig-grid" stroke-dasharray="3 3"></line>` +
        `<text x="${screenX + 16}" y="${y1.toFixed(1)}" font-size="17" class="fig-ink">n = 1</text>`;
    }

    const centreLabel =
      `<text x="${screenX - 6}" y="${MID_Y + 4}" font-size="17" class="fig-ink" text-anchor="end">centre</text>`;

    svg.innerHTML = frame + fringes + rays + centreLabel;

    const firstAngle = Math.asin(Math.min(1, lambdaM / sM)) * (180 / Math.PI);
    const secondRatio = (2 * lambdaM) / sM;
    const angleText = secondRatio <= 1
      ? `The first bright fringe is at ${firstAngle.toFixed(1)}&deg; and the second at ` +
        `${(Math.asin(secondRatio) * (180 / Math.PI)).toFixed(1)}&deg; from the centre. `
      : `The first bright fringe is at ${firstAngle.toFixed(1)}&deg; from the centre. ` +
        `There is no second bright fringe, because it would need a sine greater than 1. `;

    readout.innerHTML =
      `Wavelength ${lambdaNm} nm, source separation ${sMm.toFixed(2)} mm, ` +
      `screen ${dM.toFixed(1)} m away. The bright fringes are <strong>${wMm.toFixed(2)} mm</strong> apart. ` +
      angleText +
      `<em>Move the sources closer together: what happens to the fringe spacing?</em>`;
  }

  wavelength.addEventListener("input", update);
  separation.addEventListener("input", update);
  distance.addEventListener("input", update);
  update();
}
