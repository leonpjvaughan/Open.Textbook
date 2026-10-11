// Tier-1 guided investigation: the laws of indices.
// Predict -> Test -> Explain.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-indices" style="font:14px system-ui;max-width:560px">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem">
        <label>base <input class="a" type="range" min="2" max="5" step="1" value="2"></label>
        <label>m <input class="m" type="range" min="1" max="5" step="1" value="3"></label>
        <label>n <input class="n" type="range" min="1" max="5" step="1" value="2"></label>
      </div>
      <p class="readout" aria-live="polite" role="img" aria-label="A product and a quotient of powers written as a single power of the same base" style="margin:.6rem 0 0"></p>
    </div>`;

  const readout = el.querySelector(".readout");
  const val = (cls) => Number(el.querySelector(`.${cls}`).value);

  // Plain HTML, not LaTeX: the maths hook runs at build time, so anything this
  // module injects at runtime must be written in HTML to render.
  const power = (base, index) => `${base}<sup>${index}</sup>`;

  function update() {
    const a = val("a");
    const m = val("m");
    const n = val("n");
    const product = a ** m * a ** n;
    const sum = a ** (m + n);
    const quotient = a ** m / a ** n;
    readout.innerHTML =
      `a = ${a}, m = ${m}, n = ${n}. ` +
      `Multiplying: ${power(a, m)} × ${power(a, n)} = ${power(a, m + n)} = ${product} ` +
      `(the same as ${sum}). ` +
      `Dividing: ${power(a, m)} ÷ ${power(a, n)} = ${power(a, m - n)}` +
      (m >= n ? ` = ${Number.isInteger(quotient) ? quotient : quotient.toFixed(4)}. ` : " (a fraction). ") +
      `<em>Predict: what is ${power(a, m + n)} without multiplying it out? Why do the indices add?</em>`;
  }

  el.querySelectorAll("input").forEach((i) => i.addEventListener("input", update));
  update();
}
