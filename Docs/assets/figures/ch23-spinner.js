// Guided probability scale: predict and test how changing red regions changes chance.
export function mount(el) {
  el.innerHTML = `
    <section class="fig-grid" style="padding:1rem">
      <p class="text-accent">A spinner has 10 equal sectors. Change how many are red.</p>
      <label>Red sectors: <input class="red" type="range" min="0" max="10" step="1" value="4"></label>
      <p class="readout text-ink" aria-live="polite"></p>
      <div class="bar" role="img" aria-label="Ten equal spinner sectors; red sectors are shown separately from the rest"></div>
    </section>`;
  const readout = el.querySelector('.readout');
  const bar = el.querySelector('.bar');
  function draw() {
    const red = Number(el.querySelector('.red').value);
    const segments = Array.from({ length: 10 }, (_, i) => `${i < red ? 'var(--md-primary-fg-color)' : '#888'} ${i * 10}% ${(i + 1) * 10}%`).join(', ');
    bar.style.height = '2rem';
    bar.style.border = '1px solid currentColor';
    bar.style.background = `repeating-linear-gradient(90deg, transparent 0 9.7%, currentColor 9.7% 10%) , linear-gradient(90deg, ${segments})`;
    bar.setAttribute('aria-label', `${red} red sectors out of 10 equal sectors`);
    readout.textContent = `Red sectors: ${red} out of 10. Probability of red: ${red}/10.`;
  }
  el.querySelector('.red').addEventListener('input', draw);
  draw();
}
