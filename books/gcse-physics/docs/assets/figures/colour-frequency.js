// Tier-1 guided investigation: the colour and frequency of visible light.
//
// Guided, not a sandbox: the page asks the reader to predict what happens to the
// frequency when the wavelength gets longer, then to explain it from c = f
// lambda. The slider moves a marker along the visible band, and the readout names
// the colour and gives the frequency. The colour name is always written, so
// colour is never the only signal. Colours come from CSS classes, so the figure
// adapts to every bundle and both schemes.
export function mount(el) {
  const BANDS = [
    { name: "violet", min: 400, max: 450 },
    { name: "blue", min: 450, max: 495 },
    { name: "green", min: 495, max: 570 },
    { name: "yellow", min: 570, max: 590 },
    { name: "orange", min: 590, max: 620 },
    { name: "red", min: 620, max: 700 },
  ];
  const MIN = 400;
  const MAX = 700;
  const LEFT = 40;
  const RIGHT = 560;
  const BAND_TOP = 40;
  const BAND_HEIGHT = 44;

  el.innerHTML = `
    <div class="fig-colour-frequency" style="font:14px system-ui;max-width:620px">
      <svg viewBox="0 0 600 160" width="100%" height="160" role="img"
           aria-label="A band of the visible spectrum from violet at short wavelengths to red at long wavelengths, with a marker at the chosen colour"></svg>
      <label style="display:block;margin:.6rem 0 .3rem">
        Wavelength: <input class="wavelength" type="range" min="400" max="700" step="5" value="550">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const slider = el.querySelector(".wavelength");
  const readout = el.querySelector(".readout");

  const xFor = (nm) => LEFT + ((nm - MIN) / (MAX - MIN)) * (RIGHT - LEFT);

  function bandFor(nm) {
    return (
      BANDS.find((band) => nm >= band.min && nm < band.max) ||
      BANDS[BANDS.length - 1]
    );
  }

  function formatFrequency(hz) {
    const exponent = Math.floor(Math.log10(hz));
    const mantissa = hz / Math.pow(10, exponent);
    return `${mantissa.toFixed(2)} x 10^${exponent} Hz`;
  }

  function update() {
    const wavelength = Number(slider.value);
    const frequency = 3.0e8 / (wavelength * 1e-9);
    const current = bandFor(wavelength);

    const cells = BANDS.map((band) => {
      const x = xFor(band.min);
      const width = xFor(band.max) - x;
      const highlight = band.name === current.name;
      return (
        `<rect x="${x.toFixed(1)}" y="${BAND_TOP}" width="${width.toFixed(1)}" height="${BAND_HEIGHT}" ` +
        `class="${highlight ? "fig-accent" : "fig-grid"}" ` +
        `${highlight ? 'fill-opacity="0.35" ' : ""}stroke-width="1"></rect>` +
        `<text x="${(x + width / 2).toFixed(1)}" y="${BAND_TOP + BAND_HEIGHT + 16}" ` +
        `font-size="11" text-anchor="middle" class="fig-ink">${band.name}</text>`
      );
    }).join("");

    const markerX = xFor(wavelength);
    const marker =
      `<line x1="${markerX.toFixed(1)}" y1="${BAND_TOP - 8}" x2="${markerX.toFixed(1)}" ` +
      `y2="${BAND_TOP + BAND_HEIGHT + 4}" class="fig-warn" stroke-width="2"></line>` +
      `<text x="${markerX.toFixed(1)}" y="${BAND_TOP - 14}" font-size="11" ` +
      `text-anchor="middle" class="text-warn">${wavelength} nm</text>`;

    const ticks = [400, 500, 600, 700]
      .map((nm) => {
        const x = xFor(nm);
        return (
          `<line x1="${x.toFixed(1)}" y1="${BAND_TOP + BAND_HEIGHT}" x2="${x.toFixed(1)}" ` +
          `y2="${BAND_TOP + BAND_HEIGHT + 5}" class="fig-ink"></line>` +
          `<text x="${x.toFixed(1)}" y="${BAND_TOP + BAND_HEIGHT + 34}" font-size="11" ` +
          `text-anchor="middle" class="fig-ink">${nm}</text>`
        );
      })
      .join("");

    svg.innerHTML =
      cells +
      marker +
      ticks +
      `<text x="${(LEFT + RIGHT) / 2}" y="152" font-size="11" text-anchor="middle" class="fig-ink">wavelength (nm)</text>`;

    readout.innerHTML =
      `Wavelength <strong>${wavelength} nm</strong>. All visible light travels at ` +
      `<strong>3.0 x 10^8 m/s</strong> in a vacuum, so the frequency is ` +
      `<strong>${formatFrequency(frequency)}</strong>. This light looks ` +
      `<strong>${current.name}</strong>. ` +
      `<em>Before you move the slider, predict what happens to the frequency when ` +
      `the wavelength gets longer.</em>`;
  }

  slider.addEventListener("input", update);
  update();
}
