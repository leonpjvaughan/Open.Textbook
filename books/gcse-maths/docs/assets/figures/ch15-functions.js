// Guided investigation: predict how two linear functions compose, then test.

// A signed term, so the rule reads `2x + 3` and `2x - 5`, never `2x + (-5)`.
function signed(value) {
  return value < 0 ? `- ${Math.abs(value)}` : `+ ${value}`;
}

export function mount(el) {
  el.innerHTML = `
    <div class="fig-grid" style="max-width:520px">
      <p class="text-ink">Adjust a and b in f(x) = ax + b.</p>
      <label>a <input class="a" type="range" min="1" max="5" step="1" value="2"></label>
      <label>b <input class="b" type="range" min="-5" max="5" step="1" value="3"></label>
      <p class="readout text-accent" aria-live="polite"></p>
    </div>`;
  const update = () => {
    const a = Number(el.querySelector('.a').value);
    const b = Number(el.querySelector('.b').value);
    el.querySelector('.readout').textContent =
      `For f(x) = ${a}x ${signed(b)}, the inverse rule is ` +
      `f⁻¹(x) = (x ${signed(-b)}) / ${a}.`;
  };
  el.querySelectorAll('input').forEach(input => input.addEventListener('input', update));
  update();
}
