// Guided chart-choice investigation: compare category counts and proportions.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label>Sample size <input class="size" type="range" min="20" max="100" step="20" value="40"></label>
      <p class="readout" aria-live="polite"></p>
      <div class="bars" role="img" aria-label="Bar chart showing walking, bus and car counts"></div>
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
      row.className = index === 1 ? 'text-good' : 'text-accent';
      row.textContent = `${name}: ${count} ${'▰'.repeat(count / 5)}`;
      bars.append(row);
    });
    bars.setAttribute('aria-label', values.map(([name, count]) => `${name}: ${count}`).join(', '));
    readout.textContent = `Sample size ${total}. Compare the category counts.`;
  }
  slider.addEventListener('input', update);
  update();
}
