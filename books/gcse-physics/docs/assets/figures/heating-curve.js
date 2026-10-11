// Tier-1 guided investigation: a heating curve for water.
//
// Guided, not a sandbox: the page asks the reader to predict how many flat
// parts the graph will have and what a higher heater power does to them. The
// reader sets the power; the figure draws temperature against time for 1.0 kg of
// ice, from -20 degrees Celsius to steam, and reads out the energy and the time
// for each stage.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. No maths is injected at runtime: every value is plain text.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-heating-curve" style="font:14px system-ui;max-width:600px">
      <svg viewBox="0 0 600 230" width="100%" height="230" role="img"
           aria-label="A heating graph of temperature against time for water, with two sloped parts and two flat parts where the substance changes state"></svg>
      <label style="display:block;margin:.3rem 0">Heater power (W)
        <input class="power" type="range" min="200" max="2000" step="50" value="500"></label>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin:.3rem 0">
        <button type="button" class="preset-low">Low power (200 W)</button>
        <button type="button" class="preset-high">High power (2000 W)</button>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const powerSlider = el.querySelector(".power");
  const readout = el.querySelector(".readout");

  // 1.0 kg of water, in four stages. The energies in joules are fixed.
  const STAGES = [
    { label: "ice warms", energy: 1.0 * 2100 * 20, from: -20, to: 0 },
    { label: "ice melts", energy: 1.0 * 3.3e5, from: 0, to: 0 },
    { label: "water warms", energy: 1.0 * 4200 * 100, from: 0, to: 100 },
    { label: "water boils", energy: 1.0 * 2.3e6, from: 100, to: 100 },
  ];
  const TOTAL_ENERGY = STAGES.reduce((sum, s) => sum + s.energy, 0);
  const TIME_MAX = 16000;

  const xPixel = (t) => 70 + (t / TIME_MAX) * 470;
  const yPixel = (temp) => 200 - ((temp + 40) / 180) * 160;

  function energyText(joules) {
    if (joules >= 1e6) return `${(joules / 1e6).toFixed(2)} MJ`;
    return `${Math.round(joules / 1e3)} kJ`;
  }

  function timeText(seconds) {
    if (seconds >= 120) return `${(seconds / 60).toFixed(1)} min`;
    return `${seconds.toFixed(0)} s`;
  }

  function update() {
    const power = Number(powerSlider.value);

    let time = 0;
    const points = [];
    const summary = [];
    points.push([0, STAGES[0].from]);
    STAGES.forEach((stage) => {
      const duration = stage.energy / power;
      time += duration;
      points.push([time, stage.to]);
      summary.push(
        `${stage.label}: ${energyText(stage.energy)} in ${timeText(duration)}`,
      );
    });

    const line = points
      .map(([t, temp], i) => `${i === 0 ? "M" : "L"} ${xPixel(t).toFixed(1)} ${yPixel(temp).toFixed(1)}`)
      .join(" ");

    svg.innerHTML =
      `<line x1="70" y1="200" x2="555" y2="200" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="70" y1="200" x2="70" y2="20" class="fig-ink" stroke-width="2"></line>` +
      `<line x1="70" y1="${yPixel(0).toFixed(1)}" x2="555" y2="${yPixel(0).toFixed(1)}" class="fig-grid" stroke-dasharray="4 4"></line>` +
      `<line x1="70" y1="${yPixel(100).toFixed(1)}" x2="555" y2="${yPixel(100).toFixed(1)}" class="fig-grid" stroke-dasharray="4 4"></line>` +
      `<text x="10" y="${yPixel(0).toFixed(1)}" font-size="10" class="fig-ink">0</text>` +
      `<text x="4" y="${yPixel(100).toFixed(1)}" font-size="10" class="fig-ink">100</text>` +
      `<text x="300" y="222" font-size="11" text-anchor="middle" class="fig-ink">time (s)</text>` +
      `<text x="14" y="110" font-size="11" class="fig-ink" transform="rotate(-90 14 110)">temperature (C)</text>` +
      `<path d="${line}" class="fig-accent" fill="none" stroke-width="3"></path>` +
      `<text x="150" y="${(yPixel(0) - 8).toFixed(1)}" font-size="10" class="fig-ink">melting</text>` +
      `<text x="300" y="${(yPixel(100) - 8).toFixed(1)}" font-size="10" class="fig-ink">boiling</text>`;

    readout.innerHTML =
      `Heater power <strong>${power} W</strong>. ` +
      `Total energy <strong>${energyText(TOTAL_ENERGY)}</strong> ` +
      `in <strong>${timeText(TOTAL_ENERGY / power)}</strong>. ` +
      `<em>${summary.join(". ")}. ` +
      `Compare a low power with a high power: what changes, and what stays the same?</em>`;
  }

  el.querySelector(".preset-low").addEventListener("click", () => {
    powerSlider.value = "200";
    update();
  });
  el.querySelector(".preset-high").addEventListener("click", () => {
    powerSlider.value = "2000";
    update();
  });
  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
