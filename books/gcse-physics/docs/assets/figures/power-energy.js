// Tier-1 guided investigation: power, time and energy transferred.
//
// Guided, not a sandbox: the page asks the reader to predict which transfers more
// energy, a low-power device left on for a long time or a high-power device used
// briefly, before the sliders are moved. The figure reads out E = Pt in joules
// and in kilojoules or megajoules.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. Every value is printed as text.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-power-energy" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 560 170" width="100%" height="170" role="img"
           aria-label="A bar whose height shows the energy transferred by a device, for a chosen power and time."></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Power (kW)
          <input class="power" type="range" min="0.1" max="3" step="0.1" value="2"></label>
        <label>Time (minutes)
          <input class="time" type="range" min="1" max="60" step="1" value="1"></label>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.5rem 0">
        <button type="button" class="preset-lamp">Set the lamp (0.10 kW, 30 minutes)</button>
        <button type="button" class="preset-heater">Set the heater (2.0 kW, 1.0 minute)</button>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const powerSlider = el.querySelector(".power");
  const timeSlider = el.querySelector(".time");
  const readout = el.querySelector(".readout");

  // The bar is scaled so the largest setting still fits.
  const MAX_ENERGY = 3000 * 3600;

  function formatEnergy(joules) {
    if (joules >= 1e6) return `${(joules / 1e6).toFixed(2)} MJ`;
    if (joules >= 1e3) return `${(joules / 1e3).toFixed(1)} kJ`;
    return `${Math.round(joules)} J`;
  }

  function update() {
    const kilowatts = Number(powerSlider.value);
    const minutes = Number(timeSlider.value);
    const watts = kilowatts * 1000;
    const seconds = minutes * 60;
    const energy = watts * seconds;

    const barHeight = Math.max(6, (energy / MAX_ENERGY) * 120);
    const barY = 140 - barHeight;

    svg.innerHTML =
      `<line x1="60" y1="140" x2="500" y2="140" class="fig-ink" stroke-width="2"></line>` +
      `<rect x="180" y="${barY.toFixed(1)}" width="90" height="${barHeight.toFixed(1)}" class="fig-accent"></rect>` +
      `<text x="225" y="${(barY - 8).toFixed(1)}" font-size="12" text-anchor="middle" class="fig-ink">${formatEnergy(energy)}</text>` +
      `<text x="225" y="158" font-size="12" text-anchor="middle" class="fig-ink">your setting</text>` +
      `<line x1="360" y1="140" x2="360" y2="20" class="fig-grid" stroke-width="2" stroke-dasharray="4 4"></line>` +
      `<text x="366" y="36" font-size="12" class="fig-ink">lamp: 0.10 kW for 30 min</text>` +
      `<text x="366" y="52" font-size="12" class="fig-ink">= 180 kJ</text>` +
      `<line x1="360" y1="80" x2="530" y2="80" class="fig-grid" stroke-width="2" stroke-dasharray="4 4"></line>` +
      `<text x="366" y="96" font-size="12" class="fig-ink">heater: 2.0 kW for 1.0 min</text>` +
      `<text x="366" y="112" font-size="12" class="fig-ink">= 120 kJ</text>`;

    readout.innerHTML =
      `Power <strong>${kilowatts.toFixed(2)} kW = ${watts} W</strong>. ` +
      `Time <strong>${minutes} minutes = ${seconds} s</strong>. ` +
      `Energy <strong>${formatEnergy(energy)}</strong> ` +
      `(${Math.round(energy)} J). ` +
      `<em>Compare your setting with the lamp and the heater. ` +
      `Which transfers the most energy, and why?</em>`;
  }

  el.querySelector(".preset-lamp").addEventListener("click", () => {
    powerSlider.value = "0.1";
    timeSlider.value = "30";
    update();
  });
  el.querySelector(".preset-heater").addEventListener("click", () => {
    powerSlider.value = "2";
    timeSlider.value = "1";
    update();
  });
  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
