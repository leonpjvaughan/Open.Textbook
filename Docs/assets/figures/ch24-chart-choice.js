// Guided chart-choice investigation: compare category counts and proportions.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label>Sample size <input class="size" type="range" min="20" max="100" step="20" value="40"></label>
      <p class="readout" aria-live="polite"></p>
      <div class="bars" role="img" aria-label="Bar chart showing walking, bus and car counts"></div>
      <p class="text-accent">The category proportions remain 1/4 walking, 1/2 bus and 1/4 car.</p>
    </div>`;
  const slider = el.querySelector('.size');
  const bars = el.querySelector('.bars');
  const readout = el.querySelector('.readout');
  function update() {
    const total = Number(slider.value);
    const values = [['Walk', total / 4], ['Bus', total / 2], ['Car', total / 4]];
    bars.innerHTML = '';
    values.forEach(([name, count], index) => {
      const row = document.createElement('p');
      row.className = index === 1 ? 'fig-good' : 'fig-accent';
      row.textContent = `${name}: ${count} ${'▰'.repeat(count / 2)}`;
      bars.append(row);
    });
    readout.textContent = `Sample size ${total}; the bus remains half of the responses.`;
  }
  slider.addEventListener('input', update);
  update();
}
