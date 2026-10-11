// Tier-1 guided investigation: rounding to decimal places and significant
// figures. Predict → Test → Explain: the reader predicts the rounded value and
// then checks which digit was used to decide.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-rounding" style="font:14px system-ui;max-width:560px">
      <label>Number
        <input class="value" type="number" step="0.001" value="3.14159" style="width:9rem">
      </label>
      <label style="margin-left:1rem">Rule
        <select class="rule">
          <option value="dp">decimal places</option>
          <option value="sf">significant figures</option>
        </select>
      </label>
      <label style="margin-left:1rem">Amount
        <input class="places" type="range" min="1" max="4" step="1" value="2">
        <output class="placesOut">2</output>
      </label>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const num = el.querySelector(".value");
  const rule = el.querySelector(".rule");
  const places = el.querySelector(".places");
  const placesOut = el.querySelector(".placesOut");
  const readout = el.querySelector(".readout");

  function roundToSf(x, sf) {
    if (x === 0) return 0;
    const d = Math.ceil(Math.log10(Math.abs(x)));
    const power = sf - d;
    const factor = Math.pow(10, power);
    return Math.round(x * factor) / factor;
  }

  function update() {
    const x = Number(num.value);
    const n = Number(places.value);
    placesOut.textContent = String(n);
    if (!Number.isFinite(x)) {
      readout.textContent = "Enter a number.";
      return;
    }
    const result = rule.value === "dp" ? Number(x.toFixed(n)) : roundToSf(x, n);
    const unit =
      rule.value === "dp" ? `${n} decimal place(s)` : `${n} significant figure(s)`;
    readout.innerHTML =
      `${x} rounded to ${unit} is <strong>${result}</strong>. ` +
      `<em>Which digit did you look at to decide whether to round up?</em>`;
  }

  [num, rule, places].forEach((control) =>
    control.addEventListener("input", update),
  );
  update();
}
