// Tier-1 guided investigation: the electric field around a charged sphere.
//
// Guided, not a sandbox: the page asks the reader to predict the direction of the
// field lines, and where the field is strongest, before the controls are used.
// The figure draws the radial field of an isolated charged sphere, lets the
// reader reverse the sign of the charge and move a test point away from it.
//
// Colours come from CSS classes, so the figure adapts to every bundle and both
// schemes. The arrow direction and the strength are both printed as text, so
// neither is carried by colour alone.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-electric-field" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 220" width="100%" height="220" role="img"
           aria-label="Radial electric field lines around a charged sphere, with arrows showing the direction and a test point that can be moved away from the sphere."></svg>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;margin:.5rem 0">
        <button type="button" class="sign">Change the sign of the charge</button>
        <label style="display:flex;align-items:center;gap:.4rem">Distance from the sphere
          <input class="distance" type="range" min="1" max="4" step="0.5" value="1"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const signButton = el.querySelector(".sign");
  const distanceSlider = el.querySelector(".distance");
  const readout = el.querySelector(".readout");

  const CX = 180;
  const CY = 110;
  let positive = true;

  function arrow(cx, cy, angle, direction) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const tipRadius = direction === "out" ? 72 : 60;
    const baseRadius = direction === "out" ? 62 : 70;
    const tipX = cx + cos * tipRadius;
    const tipY = cy + sin * tipRadius;
    const baseX = cx + cos * baseRadius;
    const baseY = cy + sin * baseRadius;
    const perpX = -sin * 5;
    const perpY = cos * 5;
    return (
      `<polygon points="${tipX.toFixed(1)},${tipY.toFixed(1)} ` +
      `${(baseX + perpX).toFixed(1)},${(baseY + perpY).toFixed(1)} ` +
      `${(baseX - perpX).toFixed(1)},${(baseY - perpY).toFixed(1)}" ` +
      `class="fig-accent"></polygon>`
    );
  }

  function update() {
    const distance = Number(distanceSlider.value);
    const testX = CX + 28 + (distance - 1) * 26;
    const relative = (1 / (distance * distance)) * 100;

    const lines = [];
    for (let step = 0; step < 8; step += 1) {
      const angle = (step * Math.PI) / 4;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      lines.push(
        `<line x1="${(CX + cos * 20).toFixed(1)}" y1="${(CY + sin * 20).toFixed(1)}" ` +
          `x2="${(CX + cos * 104).toFixed(1)}" y2="${(CY + sin * 104).toFixed(1)}" ` +
          `class="fig-grid" stroke-width="2"></line>`,
      );
      lines.push(arrow(CX, CY, angle, positive ? "out" : "in"));
    }

    svg.innerHTML =
      lines.join("") +
      `<circle cx="${CX}" cy="${CY}" r="16" class="${positive ? "fig-accent" : "fig-warn"}" style="fill:none" stroke-width="3"></circle>` +
      `<text x="${CX}" y="${CY + 5}" font-size="14" text-anchor="middle" class="fig-ink">${positive ? "+" : "&minus;"}</text>` +
      `<line x1="${testX}" y1="40" x2="${testX}" y2="180" class="fig-grid" stroke-width="1" stroke-dasharray="3 3"></line>` +
      `<circle cx="${testX}" cy="${CY}" r="6" class="fig-warn"></circle>` +
      `<text x="${testX}" y="200" font-size="12" text-anchor="middle" class="fig-ink">test point</text>` +
      `<text x="${CX}" y="205" font-size="12" text-anchor="middle" class="fig-ink">charged sphere</text>`;

    readout.innerHTML =
      `The sphere carries a <strong>${positive ? "positive" : "negative"}</strong> charge, so the ` +
      `field lines point <strong>${positive ? "away from" : "towards"} the sphere</strong>. ` +
      `At this distance the relative field strength is <strong>${relative.toFixed(0)}%</strong>. ` +
      `<em>The field is strongest close to the sphere. Why does the force on a charged object ` +
      `get stronger as it moves closer?</em>`;
  }

  signButton.addEventListener("click", () => {
    positive = !positive;
    update();
  });
  distanceSlider.addEventListener("input", update);
  update();
}
