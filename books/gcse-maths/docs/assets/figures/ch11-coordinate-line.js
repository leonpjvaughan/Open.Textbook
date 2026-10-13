// Guided table-to-graph investigation for y = mx + c.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label>Gradient m <input class="gradient" type="range" min="-3" max="3" step="1" value="2"></label>
      <label>Intercept c <input class="intercept" type="range" min="-3" max="3" step="1" value="1"></label>
      <svg viewBox="0 0 360 250" width="100%" role="img" aria-label="Coordinate grid with a straight line and three plotted points"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;
  const svg = el.querySelector("svg");
  function update() {
    const m = Number(el.querySelector(".gradient").value);
    const c = Number(el.querySelector(".intercept").value);
    // The plotted points reach y = 3 x 2 + 3 = 9 and y = -3 x 2 - 3 = -9, so
    // the vertical scale is set for that range: every marker stays in the frame.
    const px = (x) => 180 + x * 28;
    const py = (y) => 125 - y * 12;
    const dots = [-2, 0, 2].map((x) => {
      const y = m * x + c;
      return `<circle cx="${px(x)}" cy="${py(y)}" r="5" class="fig-good"></circle>`;
    }).join("");
    svg.innerHTML = `<line x1="24" y1="125" x2="336" y2="125" class="fig-ink"></line>
      <line x1="180" y1="20" x2="180" y2="230" class="fig-ink"></line>
      <line x1="36" y1="${py(m * -5 + c)}" x2="324" y2="${py(m * 5 + c)}" class="fig-accent"></line>
      ${dots}<circle cx="${px(0)}" cy="${py(c)}" r="8" fill="none" class="fig-warn"></circle>
      <text x="330" y="145" class="text-accent">x</text><text x="190" y="24" class="text-accent">y</text>
      <text x="12" y="245" class="fig-ink">Points at x = -2, 0, 2</text>`;
    el.querySelector(".readout").textContent = `y = ${m}x + ${c}; the highlighted intercept is ${c}.`;
  }
  el.querySelectorAll("input").forEach((input) => input.addEventListener("input", update));
  update();
}
