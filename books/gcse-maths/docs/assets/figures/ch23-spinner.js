// Guided probability scale: predict and test how changing red regions changes chance.
export function mount(el) {
  el.innerHTML = `
    <section class="fig-grid" style="padding:1rem">
      <p class="text-accent">A spinner has 10 equal sectors. Change how many are red.</p>
      <label>Red sectors: <input class="red" type="range" min="0" max="10" step="1" value="4"></label>
      <p class="readout text-ink" aria-live="polite"></p>
      <svg class="spinner" width="100%" height="32" viewBox="0 0 200 32" role="img" aria-label="Ten equal spinner sectors">
        ${Array.from({ length: 10 }, (_, i) => `<rect class="${i < 4 ? 'fig-accent' : 'fig-grid'}" x="${i * 20}" y="0" width="20" height="32"></rect>`).join('')}
      </svg>
    </section>`;
  const readout = el.querySelector('.readout');
  const spinner = el.querySelector('.spinner');
  function draw() {
    const red = Number(el.querySelector('.red').value);
    spinner.innerHTML = Array.from({ length: 10 }, (_, i) => `<rect class="${i < red ? 'fig-accent' : 'fig-grid'}" x="${i * 20}" y="0" width="20" height="32"></rect>`).join('');
    spinner.setAttribute('aria-label', `${red} red sectors out of 10 equal sectors`);
    readout.textContent = `Red sectors: ${red} out of 10. Probability of red: ${red}/10.`;
  }
  el.querySelector('.red').addEventListener('input', draw);
  draw();
}
