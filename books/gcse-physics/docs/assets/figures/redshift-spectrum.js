// Tier-1 guided investigation: the red-shift of light from a receding galaxy.
//
// The page asks the reader to predict which way the dark lines move before
// touching the slider, then to test it by changing the speed of the galaxy,
// then to explain why a source moving away gives a longer wavelength. The
// laboratory row is the same light measured at rest; the galaxy row is the same
// pattern, moved towards the red end. Colours come from CSS classes, so the
// figure adapts to dark mode and every bundle, and each row is labelled in words
// as well as by its position.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-redshift-spectrum" style="font:14px system-ui;max-width:620px">
      <svg viewBox="0 0 600 220" width="100%" height="220" role="img"
           aria-label="Two rows of a spectrum with dark lines; the laboratory row is fixed and the galaxy row moves towards longer wavelengths as the galaxy speeds up"></svg>
      <label style="display:block;margin:.6rem 0 .3rem">
        Speed of the galaxy away from us: <input class="speed" type="range" min="0" max="100" step="1" value="40">
      </label>
      <p class="readout" aria-live="polite" style="margin:.4rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");

  const LEFT = 54;
  const RIGHT = 546;
  const WIDTH = RIGHT - LEFT;
  const LINES = [0.08, 0.3, 0.56, 0.78];

  function band(y, height, lines, lineClass) {
    const rect =
      `<rect x="${LEFT}" y="${y}" width="${WIDTH}" height="${height}" ` +
      `class="fig-grid" fill-opacity="0.25" stroke-width="1"></rect>`;
    const marks = lines
      .map((fraction) => {
        const x = LEFT + fraction * WIDTH;
        return (
          `<line x1="${x.toFixed(1)}" y1="${y}" x2="${x.toFixed(1)}" y2="${y + height}" ` +
          `class="${lineClass}" stroke-width="3"></line>`
        );
      })
      .join("");
    return rect + marks;
  }

  function update() {
    const speed = Number(el.querySelector(".speed").value);
    const shift = (speed / 100) * 0.12;
    const galaxyLines = LINES.map((fraction) => fraction + shift);

    const caption = (y, text) =>
      `<text x="${LEFT}" y="${y}" font-size="12" class="fig-ink">${text}</text>`;

    const reference = band(30, 34, LINES, "fig-ink");
    const galaxy = band(100, 34, galaxyLines, "fig-warn");

    // An arrow on the first line shows the size of the shift.
    const from = LEFT + LINES[0] * WIDTH;
    const to = LEFT + galaxyLines[0] * WIDTH;
    const shiftArrow =
      `<line x1="${from.toFixed(1)}" y1="170" x2="${to.toFixed(1)}" y2="170" ` +
      `class="fig-accent" stroke-width="2"></line>` +
      `<polygon points="${(to - 8).toFixed(1)},166 ${(to - 8).toFixed(1)},174 ${to.toFixed(1)},170" class="fig-accent"></polygon>` +
      `<text x="${from.toFixed(1)}" y="188" font-size="11" class="fig-ink">the pattern moves this way</text>`;

    const ends =
      caption(80, "laboratory: the same light at rest") +
      caption(150, "galaxy: the same lines, shifted") +
      `<text x="${LEFT}" y="212" font-size="11" class="fig-ink">shorter wavelength (blue end)</text>` +
      `<text x="${RIGHT}" y="212" font-size="11" text-anchor="end" class="fig-ink">longer wavelength (red end)</text>`;

    svg.innerHTML = reference + galaxy + shiftArrow + ends;

    readout.innerHTML =
      `The dark lines in the galaxy's light sit at <strong>longer wavelengths</strong> than the ` +
      `same lines in the laboratory. With the galaxy moving away at a speed of ` +
      `<strong>${speed}</strong> on this scale, the whole pattern has moved ` +
      `<strong>${(shift * 100).toFixed(1)} per cent</strong> of the strip width towards the red end. ` +
      `<em>A real galaxy's light is a measurement, not a slider. Why does moving away stretch the wavelength?</em>`;
  }

  el.querySelector(".speed").addEventListener("input", update);
  update();
}
