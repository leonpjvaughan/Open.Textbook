// Guided investigation: predict how two linear functions compose, then test.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-grid" style="max-width:520px">
      <p class="text-ink">Adjust a and b in f(x) = ax + b.</p>
      <label>a <input class="a" type="range" min="1" max="5" step="1" value="2"></label>
      <label>b <input class="b" type="range" min="-5" max="5" step="1" value="3"></label>
      <p class="readout text-accent" aria-live="polite" role="img" aria-label="A linear function rule and the rule for its inverse"></p>
    </div>`;
  const update = () => {
    const a = Number(el.querySelector('.a').value);
    const b = Number(el.querySelector('.b').value);
    el.querySelector('.readout').textContent =
      `For f(x) = ${a}x + (${b}), the inverse rule is f⁻¹(x) = (x − (${b})) / ${a}.`;
  };
  el.querySelectorAll('input').forEach(input => input.addEventListener('input', update));
  update();
}
