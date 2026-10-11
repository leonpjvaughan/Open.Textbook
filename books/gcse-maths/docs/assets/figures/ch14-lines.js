// Guided graph investigation for a pair of linear equations.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 520 260" width="100%" role="img" aria-label="Two straight lines crossing at a marked point"></svg>
      <label>Test x value <input class="xvalue" type="range" min="0" max="4" step="1" value="2"></label>
      <p class="readout" aria-live="polite"></p>
    </div>`;
  const svg = el.querySelector("svg");
  function update() {
    const x = Number(el.querySelector(".xvalue").value);
    const y1 = 2 * x + 1;
    const y2 = -x + 7;
    const px = 70 + x * 90;
    const py1 = 220 - y1 * 25;
    const py2 = 220 - y2 * 25;
    svg.innerHTML = `<line x1="50" y1="220" x2="470" y2="220" class="fig-ink"></line>
      <line x1="70" y1="220" x2="250" y2="45" class="fig-accent"></line>
      <line x1="70" y1="45" x2="430" y2="220" class="fig-good"></line>
      <line x1="${px}" y1="${Math.min(py1, py2)}" x2="${px}" y2="${Math.max(py1, py2)}" class="fig-grid"></line>
      <circle cx="${px}" cy="${py1}" r="5" class="fig-accent"></circle>
      <circle cx="${px}" cy="${py2}" r="5" class="fig-good"></circle>
      <text x="80" y="25" class="text-accent">y = 2x + 1</text>
      <text x="330" y="25" class="text-good">y = -x + 7</text>
      <text x="440" y="238" class="fig-ink">x</text>`;
    const out = el.querySelector(".readout");
    out.className = `readout ${y1 === y2 ? "text-good" : "text-warn"}`;
    out.textContent = `At x = ${x}: first line y = ${y1}; second line y = ${y2}${y1 === y2 ? ". The values match." : ". The values do not match yet."}`;
  }
  el.querySelector("input").addEventListener("input", update);
  update();
}
