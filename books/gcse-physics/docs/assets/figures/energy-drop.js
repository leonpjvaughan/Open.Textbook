// Tier-1 guided investigation: energy on a drop.
//
// Guided, not a sandbox: the page asks the reader to predict before moving the
// sliders, then to explain why doubling the height doubles the energy but does
// not double the speed. Mass and height are the two parameters; the gravitational
// potential store and the kinetic store are shown side by side.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-energy-drop" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 170" width="100%" role="img"
           aria-label="A ball on a drop with two bars showing gravitational potential energy at the top and kinetic energy at the bottom"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Mass (kg) <input class="mass" type="range" min="0.5" max="5" step="0.1" value="2"></label>
        <label>Height (m) <input class="height" type="range" min="0.5" max="5" step="0.1" value="1"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const g = 9.8;
  const GROUND = 140;
  const TOP = 24;
  const HEIGHT_MAX = 5;
  const ENERGY_MAX = 5 * g * 5;

  function update() {
    const mass = Number(el.querySelector(".mass").value);
    const height = Number(el.querySelector(".height").value);
    const energy = mass * g * height;
    const speed = Math.sqrt(2 * g * height);

    // The ball sits at a height proportional to the slider, with a dotted line
    // down to the ground.
    const y = GROUND - (height / HEIGHT_MAX) * (GROUND - TOP);
    const ball =
      `<circle cx="70" cy="${y}" r="9" class="fig-accent"></circle>` +
      `<line x1="70" y1="${y}" x2="70" y2="${GROUND}" class="fig-grid" ` +
      `stroke-dasharray="3 3"></line>` +
      `<line x1="40" y1="${GROUND}" x2="150" y2="${GROUND}" class="fig-ink"></line>` +
      `<text x="84" y="${(y + GROUND) / 2}" font-size="16" class="fig-ink">` +
      `h = ${height.toFixed(1)} m</text>`;

    // Two bars sharing one scale, so a taller drop visibly stores more energy.
    const barWidth = (energy / ENERGY_MAX) * 330;
    const bar = (top, cls, label, value) =>
      `<text x="170" y="${top - 5}" font-size="16" class="fig-ink">${label}</text>` +
      `<rect x="170" y="${top}" width="${barWidth.toFixed(1)}" height="20" class="${cls}"></rect>` +
      `<text x="${(178 + barWidth).toFixed(1)}" y="${top + 15}" font-size="16" class="fig-ink">${value}</text>`;

    svg.innerHTML =
      ball +
      bar(30, "fig-accent", "Gravitational potential store", `${energy.toFixed(1)} J`) +
      bar(90, "fig-warn", "Kinetic store at the bottom", `${energy.toFixed(1)} J`);

    readout.innerHTML =
      `Mass ${mass.toFixed(1)} kg, height ${height.toFixed(1)} m. ` +
      `The gravitational potential store holds <strong>${energy.toFixed(1)} J</strong>. ` +
      `With no friction that energy moves to the kinetic store, so the ball reaches ` +
      `<strong>${speed.toFixed(1)} m/s</strong> at the bottom. ` +
      `<em>Now double the height: which of the two numbers doubles, and which does not?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
