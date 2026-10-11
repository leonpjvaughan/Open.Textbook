// Tier-1 guided investigation: the force from a change in momentum.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// collision time does to the force, then to explain why a longer time gives a
// smaller force. The mass and the speed are fixed, so the change in momentum is
// fixed; only the time can change. This is the idea behind crumple zones, seat
// belts and air bags.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-crash-force" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 170" width="100%" height="170" role="img"
           aria-label="A car hitting a barrier, with a force arrow whose length shows the force on the car"></svg>
      <div style="display:grid;grid-template-columns:repeat(1,minmax(0,1fr));gap:.4rem .9rem">
        <label>Collision time (s) <input class="time" type="range" min="0.05" max="0.50" step="0.05" value="0.20"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const MASS = 1200; // kg
  const SPEED = 15; // m/s
  const MOMENTUM_CHANGE = MASS * SPEED;
  const FORCE_MAX = MOMENTUM_CHANGE / 0.05; // the largest force the slider can give
  const ARROW_MAX = 210; // pixels
  const GROUND = 120;
  const BARRIER = 430;

  function update() {
    const time = Number(el.querySelector(".time").value);
    const force = MOMENTUM_CHANGE / time;

    const carWidth = 130;
    const carLeft = 90;
    const length = (force / FORCE_MAX) * ARROW_MAX;

    svg.innerHTML =
      `<rect x="${carLeft}" y="${GROUND - 42}" width="${carWidth}" height="34" class="fig-grid"></rect>` +
      `<circle cx="${carLeft + 26}" cy="${GROUND - 4}" r="9" class="fig-ink"></circle>` +
      `<circle cx="${carLeft + carWidth - 26}" cy="${GROUND - 4}" r="9" class="fig-ink"></circle>` +
      `<line x1="60" y1="${GROUND}" x2="500" y2="${GROUND}" class="fig-ink" stroke-width="3"></line>` +
      `<rect x="${BARRIER}" y="${GROUND - 74}" width="18" height="74" class="fig-ink"></rect>` +
      `<line x1="${carLeft + carWidth}" y1="${GROUND - 25}" x2="${carLeft + carWidth + length}" y2="${GROUND - 25}" class="fig-warn" stroke-width="4"></line>` +
      `<polygon points="${(carLeft + carWidth + length).toFixed(1)},${GROUND - 25} ${(carLeft + carWidth + length - 12).toFixed(1)},${GROUND - 31} ${(carLeft + carWidth + length - 12).toFixed(1)},${GROUND - 19}" class="fig-warn"></polygon>` +
      `<text x="${carLeft}" y="${GROUND - 56}" font-size="11" class="fig-ink">mass ${MASS} kg at ${SPEED} m/s</text>` +
      `<text x="${carLeft + carWidth + length + 6}" y="${GROUND - 20}" font-size="11" class="fig-ink">${Math.round(force)} N</text>`;

    readout.innerHTML =
      `The change in momentum is fixed: ${MASS} kg &times; ${SPEED} m/s = ` +
      `<strong>${Math.round(MOMENTUM_CHANGE)} kg m/s</strong>. ` +
      `Over a collision time of ${time.toFixed(2)} s, the force is ` +
      `${Math.round(MOMENTUM_CHANGE)} &divide; ${time.toFixed(2)} = ` +
      `<strong>${Math.round(force)} N</strong>. ` +
      `<em>Double the collision time. What happens to the force? Why can the momentum change stay the same?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
