// Guided translation: predict the direction from the signs, then test it.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 360 260" width="100%" role="img" aria-label="A point translated from the origin on a labelled coordinate grid"></svg>
      <label>Horizontal change <input class="horizontal" type="range" min="-4" max="4" step="1" value="3"></label>
      <label>Vertical change <input class="vertical" type="range" min="-4" max="4" step="1" value="2"></label>
      <p class="readout" aria-live="polite"></p>
    </div>`;
  const svg = el.querySelector("svg");
  function update() {
    const x = Number(el.querySelector(".horizontal").value);
    const y = Number(el.querySelector(".vertical").value);
    const ox = 180;
    const oy = 130;
    const px = ox + x * 28;
    const py = oy - y * 28;
    const grid = [];
    for (let i = -5; i <= 5; i += 1) {
      grid.push(`<line x1="${ox + i * 28}" y1="20" x2="${ox + i * 28}" y2="240" class="fig-grid"></line>`);
      grid.push(`<line x1="40" y1="${oy - i * 28}" x2="320" y2="${oy - i * 28}" class="fig-grid"></line>`);
    }
    svg.innerHTML = `${grid.join("")}
      <line x1="40" y1="${oy}" x2="320" y2="${oy}" class="fig-ink"></line>
      <line x1="${ox}" y1="20" x2="${ox}" y2="240" class="fig-ink"></line>
      <line x1="${ox}" y1="${oy}" x2="${px}" y2="${oy}" class="fig-warn"></line>
      <line x1="${px}" y1="${oy}" x2="${px}" y2="${py}" class="fig-good"></line>
      <line x1="${ox}" y1="${oy}" x2="${px}" y2="${py}" class="fig-accent"></line>
      <circle cx="${px}" cy="${py}" r="5" class="fig-accent"></circle>
      <text x="${ox + 6}" y="${oy + 18}" class="text-ink">start</text>
      <text x="${Math.min(px + 6, 280)}" y="${py - 8}" class="text-accent">end</text>
      <text x="302" y="${oy - 7}" class="text-ink">x</text>
      <text x="${ox + 7}" y="29" class="text-ink">y</text>`;
    const directionX = x < 0 ? "left" : x > 0 ? "right" : "no horizontal change";
    const directionY = y < 0 ? "down" : y > 0 ? "up" : "no vertical change";
    el.querySelector(".readout").textContent = `Vector (${x}, ${y}): ${directionX}; ${directionY}.`;
  }
  el.querySelectorAll("input").forEach((input) => input.addEventListener("input", update));
  update();
}
