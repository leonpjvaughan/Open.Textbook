// Guided number-line investigation for strict and inclusive inequalities.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 520 90" width="100%" role="img" aria-label="Number line with a movable boundary and solution direction"></svg>
      <label>Boundary <input class="bound" type="range" min="-5" max="5" step="1" value="2"></label>
      <label><input class="inclusive" type="checkbox"> Include the boundary</label>
      <p class="readout" aria-live="polite"></p>
    </div>`;
  const svg = el.querySelector("svg");
  function update() {
    const b = Number(el.querySelector(".bound").value);
    const inclusive = el.querySelector(".inclusive").checked;
    const x = 260 + b * 35;
    const circle = inclusive
      ? `<circle cx="${x}" cy="42" r="7" class="fig-good"></circle>`
      : `<circle cx="${x}" cy="42" r="7" class="fig-warn"></circle>`;
    svg.innerHTML = `<line x1="45" y1="42" x2="475" y2="42" class="fig-ink"></line>
      <line x1="${x}" y1="42" x2="475" y2="42" class="fig-grid"></line>
      <line x1="${x}" y1="31" x2="${x}" y2="53" class="fig-accent"></line>
      ${circle}<text x="${x}" y="72" text-anchor="middle" class="fig-ink">${b}</text>
      <text x="55" y="25" class="text-accent">values greater than boundary</text>
      <text x="55" y="80" class="fig-ink">open: excluded · filled: included</text>`;
    const readout = el.querySelector(".readout");
    readout.className = `readout ${inclusive ? "text-good" : "text-warn"}`;
    readout.textContent = `x ${inclusive ? "≥" : ">"} ${b}`;
  }
  el.querySelectorAll("input").forEach((control) => control.addEventListener("input", update));
  update();
}
