// Guided sequence investigation: predict how the multiplier changes later terms.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label>Multiplier
        <input class="factor" type="range" min="0.5" max="2" step="0.1" value="1.5">
      </label>
      <p class="factor-label" aria-live="polite"></p>
      <ol class="terms"></ol>
      <p class="text-accent">Start at 2, then multiply by the same number.</p>
    </div>`;
  const factor = el.querySelector(".factor");
  const label = el.querySelector(".factor-label");
  const list = el.querySelector(".terms");
  function update() {
    const ratio = Number(factor.value);
    let term = 2;
    list.innerHTML = "";
    for (let n = 1; n <= 5; n += 1) {
      const item = document.createElement("li");
      item.className = n === 5 ? "fig-good" : "fig-ink";
      item.textContent = `Term ${n}: ${Number(term.toFixed(4))}`;
      list.append(item);
      term *= ratio;
    }
    label.textContent = `Common multiplier: ${ratio}`;
  }
  factor.addEventListener("input", update);
  update();
}
