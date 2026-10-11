// Tier-1 guided investigation: profit and loss at a stall.
//
// Guided, not a sandbox: the page asks the reader to predict before using it,
// then to explain the sign of the result. Exposes one parameter family
// (quantity / cost / price / sold) so the mathematics stays visible.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-profit" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 320 120" width="100%" height="110" role="img"
           aria-label="Bar chart comparing revenue and cost, and the resulting profit or loss"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Bought <input class="bought" type="range" min="0" max="200" step="5" value="120"></label>
        <label>Cost each (£) <input class="cost" type="range" min="0" max="2" step="0.05" value="0.65"></label>
        <label>Price each (£) <input class="price" type="range" min="0" max="3" step="0.05" value="1.20"></label>
        <label>Sold <input class="sold" type="range" min="0" max="200" step="5" value="95"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");

  function bar(x, w, h, cls, label, value) {
    const base = 100;
    return `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" class="${cls}"></rect>
      <text x="${x + w / 2}" y="${base + 12}" text-anchor="middle" font-size="10" class="fig-ink">${label}</text>
      <text x="${x + w / 2}" y="${base - h - 4}" text-anchor="middle" font-size="10" class="fig-ink">${value}</text>`;
  }

  function update() {
    const bought = +el.querySelector(".bought").value;
    const costEach = +el.querySelector(".cost").value;
    const priceEach = +el.querySelector(".price").value;
    const sold = +el.querySelector(".sold").value;

    const cost = bought * costEach;
    const revenue = sold * priceEach;
    const profit = revenue - cost;

    const scale = Math.max(cost, revenue, 1);
    const cap = (v) => Math.max(0, Math.min(90, (v / scale) * 90));

    svg.innerHTML =
      bar(70, 60, cap(revenue), "fig-accent", "Revenue", `£${revenue.toFixed(2)}`) +
      bar(190, 60, cap(cost), "fig-warn", "Cost", `£${cost.toFixed(2)}`);

    const isLoss = profit < 0;
    const cls = isLoss ? "text-warn" : "text-good";
    readout.innerHTML =
      `Profit = revenue − cost = £${revenue.toFixed(2)} − £${cost.toFixed(2)} = ` +
      `<strong class="${cls}">£${profit.toFixed(2)}</strong> ` +
      `(${isLoss ? "a loss" : "a profit"}). <em>Why does a negative number mean a loss?</em>`;
  }

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
