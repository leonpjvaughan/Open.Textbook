// Tier-1 guided investigation: pressure and volume for a fixed mass of gas.
//
// Guided, not a sandbox: the page asks the reader to predict what happens to the
// pressure when the volume is halved, then to explain the result with the
// particle model. The reader sets the volume at a constant temperature; the
// figure draws the container and reads out the pressure and the value of pV.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. No maths is injected at runtime: every value is plain text.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-gas-pressure-volume" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 170" width="100%" height="170" role="img"
           aria-label="A cylinder of gas with a movable piston, showing more particles per unit volume and a higher pressure as the gas is compressed"></svg>
      <label style="display:block;margin:.3rem 0">Volume (m cubed)
        <input class="volume" type="range" min="0.20" max="2.00" step="0.05" value="1.00"></label>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.3rem 0">
        <button type="button" class="preset-start">Start (1.00 m3)</button>
        <button type="button" class="preset-half">Half the volume (0.50 m3)</button>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const volumeSlider = el.querySelector(".volume");
  const readout = el.querySelector(".readout");

  const PV = 100; // the value of pV in kPa times cubic metres
  const V_MAX = 2.0;
  const LEFT = 60;
  const WIDTH_MAX = 420;
  const TOP = 30;
  const HEIGHT = 100;

  // Fixed particle positions, scaled to the container, so a smaller volume packs
  // the same number of particles into a smaller space.
  const PARTICLES = [];
  for (let i = 0; i < 28; i += 1) {
    PARTICLES.push({
      u: ((i * 0.618) % 1) * 0.94 + 0.03,
      v: ((i * 0.381 + 0.2) % 1) * 0.9 + 0.05,
    });
  }

  function update() {
    const volume = Number(volumeSlider.value);
    const pressure = PV / volume;
    const width = (volume / V_MAX) * WIDTH_MAX;

    let dots = "";
    PARTICLES.forEach((p) => {
      const x = LEFT + p.u * width;
      const y = TOP + p.v * HEIGHT;
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" class="fig-accent"></circle>`;
    });

    svg.innerHTML =
      `<rect x="${LEFT}" y="${TOP}" width="${width.toFixed(1)}" height="${HEIGHT}" class="fig-ink" fill="none" stroke-width="2"></rect>` +
      `<line x1="${(LEFT + width).toFixed(1)}" y1="${TOP - 18}" x2="${(LEFT + width).toFixed(1)}" y2="${TOP + HEIGHT + 18}" class="fig-warn" stroke-width="5"></line>` +
      `<line x1="${LEFT}" y1="${TOP + HEIGHT + 30}" x2="${LEFT + WIDTH_MAX}" y2="${TOP + HEIGHT + 30}" class="fig-ink" stroke-width="2"></line>` +
      `<text x="${(LEFT + width / 2).toFixed(1)}" y="${TOP + HEIGHT + 48}" font-size="10" text-anchor="middle" class="fig-ink">piston</text>` +
      dots;

    readout.innerHTML =
      `Volume <strong>${volume.toFixed(2)} m3</strong>. ` +
      `Pressure <strong>${pressure.toFixed(0)} kPa</strong>. ` +
      `p x V = <strong>${(pressure * volume).toFixed(1)} kPa m3</strong>. ` +
      `<em>Halve the volume and watch the pressure and the value of pV. ` +
      `Why does the pressure change, and why does pV stay the same?</em>`;
  }

  el.querySelector(".preset-start").addEventListener("click", () => {
    volumeSlider.value = "1.00";
    update();
  });
  el.querySelector(".preset-half").addEventListener("click", () => {
    volumeSlider.value = "0.50";
    update();
  });
  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
