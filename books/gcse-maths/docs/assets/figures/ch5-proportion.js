// Tier-1 guided investigation: direct and inverse proportion.
// Predict -> Test -> Explain.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-proportion" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 300 200" width="100%" role="img"
           aria-label="Graph of y against x for direct or inverse proportion"></svg>
      <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap">
        <label>k <input class="k" type="range" min="1" max="10" step="1" value="3"> <output class="kOut">3</output></label>
        <label>x <input class="x" type="range" min="1" max="10" step="1" value="4"> <output class="xOut">4</output></label>
        <label><input class="inverse" type="checkbox"> inverse</label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const num = (cls) => Number(el.querySelector(`.${cls}`).value);

  function update() {
    const k = num("k");
    const x = num("x");
    const inverse = el.querySelector(".inverse").checked;
    el.querySelector(".kOut").textContent = String(k);
    el.querySelector(".xOut").textContent = String(x);
    const y = inverse ? k / x : k * x;
    const X = (v) => 30 + (v / 11) * 240;
    const Y = (v) => 175 - (Math.min(v, 55) / 55) * 150;
    const points = [];
    for (let xv = 1; xv <= 10; xv += 1) {
      const yv = inverse ? k / xv : k * xv;
      points.push(`<circle cx="${X(xv)}" cy="${Y(yv)}" r="3" class="fig-accent"></circle>`);
    }
    svg.innerHTML =
      `<line x1="30" y1="175" x2="280" y2="175" class="fig-ink"></line>` +
      `<line x1="30" y1="20" x2="30" y2="175" class="fig-ink"></line>` +
      points.join("") +
      `<circle cx="${X(x)}" cy="${Y(y)}" r="5" class="fig-warn"></circle>`;
    readout.textContent = inverse
      ? `Inverse proportion: y = ${k}/x. When x = ${x}, y = ${Number.isInteger(y) ? y : y.toFixed(2)}. Predict: as x doubles, what happens to y?`
      : `Direct proportion: y = ${k}x. When x = ${x}, y = ${y}. Predict: as x doubles, what happens to y?`;
  }

  el.querySelectorAll("input").forEach((i) => i.addEventListener("input", update));
  update();
}
