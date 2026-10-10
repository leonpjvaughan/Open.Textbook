// Tier-1 guided investigation: multiples and factors on a grid.
// Predict -> Test -> Explain.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-multiples" style="font:14px system-ui;max-width:560px">
      <label>Show multiples of
        <input class="n" type="range" min="2" max="12" step="1" value="3">
        <output class="nOut">3</output>
      </label>
      <div class="grid" style="display:grid;grid-template-columns:repeat(10,1fr);gap:3px;margin:.6rem 0"></div>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const grid = el.querySelector(".grid");
  const readout = el.querySelector(".readout");
  const nOut = el.querySelector(".nOut");
  const MAX = 60;

  function update() {
    const n = Number(el.querySelector(".n").value);
    nOut.textContent = String(n);
    let count = 0;
    const cells = [];
    for (let v = 1; v <= MAX; v += 1) {
      const isMultiple = v % n === 0;
      if (isMultiple) count += 1;
      cells.push(
        `<span class="${isMultiple ? "fig-accent" : "fig-ink"}" ` +
          `style="text-align:center;padding:3px 0;border-radius:4px;` +
          `${isMultiple ? "color:#fff;" : ""}">${v}</span>`,
      );
    }
    grid.innerHTML = cells.join("");
    readout.innerHTML =
      `${n} has ${count} multiples up to ${MAX}. ` +
      `<em>Predict: is 42 a multiple of ${n}? Is ${n} a factor of 42?</em>`;
  }

  el.querySelector(".n").addEventListener("input", update);
  update();
}
