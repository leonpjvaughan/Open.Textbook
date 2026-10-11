// Guided box plot: adjust the upper quartile and observe the middle-half box.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:560px">
      <svg viewBox="0 0 560 150" width="100%" role="img" aria-label="Box plot for travel times from 12 to 42 minutes"></svg>
      <label>Upper quartile <input class="upper" type="range" min="24" max="34" step="1" value="27"></label>
      <p class="readout" aria-live="polite"></p>
    </div>`;
  const svg = el.querySelector('svg');
  function update() {
    const q3 = Number(el.querySelector('.upper').value);
    const x = value => 55 + value * 10;
    const q1 = 17.5;
    svg.innerHTML = `
      <line x1="55" y1="95" x2="475" y2="95" class="fig-ink" />
      <line x1="175" y1="55" x2="${x(q1)}" y2="55" class="fig-accent" />
      <line x1="${x(q3)}" y1="55" x2="475" y2="55" class="fig-accent" />
      <line x1="175" y1="35" x2="175" y2="75" class="fig-ink" />
      <line x1="${x(q3)}" y1="35" x2="${x(q3)}" y2="75" class="fig-ink" />
      <rect x="${x(q1)}" y="35" width="${x(q3) - x(q1)}" height="40" fill="none" stroke="currentColor" stroke-width="3" class="fig-accent" />
      <line x1="270" y1="35" x2="270" y2="75" class="fig-warn" stroke-width="3" />
      <text x="48" y="120" class="fig-ink">0</text><text x="165" y="120" class="fig-ink">12</text><text x="${x(q1)-8}" y="120" class="fig-ink">17.5</text>
      <text x="260" y="120" class="text-warn">21.5</text><text x="${x(q3)-8}" y="120" class="fig-ink">${q3}</text><text x="460" y="120" class="fig-ink">42</text>
      <text x="245" y="28" class="text-accent">middle half</text>`;
    el.querySelector('.readout').textContent = `The box runs from ${q1} to ${q3}; its width is ${q3 - q1} minutes.`;
  }
  el.querySelector('.upper').addEventListener('input', update);
  update();
}
