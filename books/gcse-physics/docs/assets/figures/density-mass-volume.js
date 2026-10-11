// Tier-1 guided investigation: density from mass and volume.
//
// Guided, not a sandbox: the page asks the reader to predict whether the ice
// block floats in water before the sliders are moved, then to explain the result
// with the particle model. The figure compares the density with the density of
// water, which is drawn as a marked line.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. No maths is injected at runtime: every value is plain text.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-density-mass-volume" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 190" width="100%" height="190" role="img"
           aria-label="A bar whose length shows the density of a chosen mass and volume, with a marked line for the density of water"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Mass (kg)
          <input class="mass" type="range" min="0.2" max="5.0" step="0.1" value="2.3"></label>
        <label>Volume (cm cubed)
          <input class="volume" type="range" min="200" max="6000" step="100" value="2500"></label>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.5rem 0">
        <button type="button" class="preset-ice">Set the ice block</button>
        <button type="button" class="preset-water">Set liquid water</button>
        <button type="button" class="preset-aluminium">Set aluminium</button>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const massSlider = el.querySelector(".mass");
  const volumeSlider = el.querySelector(".volume");
  const readout = el.querySelector(".readout");

  const WATER = 1000;
  const MAX_DENSITY = 3000;

  function draw(mass, volumeCm3) {
    const volumeM3 = volumeCm3 / 1e6;
    const density = mass / volumeM3;
    const barWidth = Math.min(430, (density / MAX_DENSITY) * 430);
    const waterX = 70 + (WATER / MAX_DENSITY) * 430;
    const floats = density < WATER;

    svg.innerHTML =
      `<line x1="70" y1="70" x2="520" y2="70" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="70" y1="70" x2="70" y2="30" class="fig-ink" stroke-width="2"></line>` +
      `<rect x="70" y="46" width="${barWidth.toFixed(1)}" height="24" class="fig-accent"></rect>` +
      `<line x1="${waterX.toFixed(1)}" y1="24" x2="${waterX.toFixed(1)}" y2="86" class="fig-warn" stroke-width="2" stroke-dasharray="4 4"></line>` +
      `<text x="${waterX.toFixed(1)}" y="18" font-size="11" text-anchor="middle" class="fig-ink">water 1000</text>` +
      `<text x="70" y="108" font-size="12" class="fig-ink">density (kg/m3)</text>` +
      `<text x="70" y="132" font-size="13" class="fig-ink">${Math.round(density)} kg/m3</text>` +
      `<text x="70" y="156" font-size="13" class="fig-ink">${
        floats ? "floats in water" : "sinks in water"
      }</text>`;

    readout.innerHTML =
      `Mass <strong>${mass.toFixed(1)} kg</strong>. ` +
      `Volume <strong>${volumeCm3} cm3 = ${volumeM3.toExponential(2)} m3</strong>. ` +
      `Density <strong>${Math.round(density)} kg/m3</strong>. ` +
      `<em>Compare your density with the water line. Does the material float, ` +
      `and what does that tell you about its particles?</em>`;
  }

  function update() {
    draw(Number(massSlider.value), Number(volumeSlider.value));
  }

  el.querySelector(".preset-ice").addEventListener("click", () => {
    massSlider.value = "2.3";
    volumeSlider.value = "2500";
    update();
  });
  el.querySelector(".preset-water").addEventListener("click", () => {
    massSlider.value = "1.0";
    volumeSlider.value = "1000";
    update();
  });
  el.querySelector(".preset-aluminium").addEventListener("click", () => {
    massSlider.value = "2.7";
    volumeSlider.value = "1000";
    update();
  });
  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
