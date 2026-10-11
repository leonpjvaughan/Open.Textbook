// Guided investigation of the centre angle and circumference angle.
export function mount(el) {
  el.innerHTML = `
    <section class="fig-grid" style="padding:1rem;max-width:520px">
      <p class="text-accent">Both angles stand on the same arc.</p>
      <label>Circumference angle: <input class="angle" type="range" min="10" max="80" step="5" value="35"></label>
      <svg viewBox="0 0 360 230" width="100%" role="img" aria-label="A circle with a centre angle twice the circumference angle, both standing on the same arc"></svg>
      <p class="readout text-ink" aria-live="polite"></p>
    </section>`;
  const svg = el.querySelector('svg');
  const readout = el.querySelector('.readout');
  function draw() {
    const a = Number(el.querySelector('.angle').value);
    const c = 2 * a;
    const rad = Math.PI / 180;
    const x1 = 180 - 88 * Math.sin(a * rad);
    const x2 = 180 + 88 * Math.sin(a * rad);
    const y = 118 - 88 * Math.cos(a * rad);
    svg.innerHTML = `<circle cx="180" cy="118" r="88" fill="none" class="fig-ink" stroke="currentColor" stroke-width="2" />
      <circle cx="180" cy="118" r="4" class="fig-warn" />
      <circle cx="${x1.toFixed(1)}" cy="${y.toFixed(1)}" r="4" class="fig-accent" />
      <circle cx="${x2.toFixed(1)}" cy="${y.toFixed(1)}" r="4" class="fig-accent" />
      <circle cx="180" cy="206" r="4" class="fig-good" />
      <line x1="180" y1="118" x2="${x1.toFixed(1)}" y2="${y.toFixed(1)}" class="fig-grid" stroke="currentColor" />
      <line x1="180" y1="118" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" class="fig-grid" stroke="currentColor" />
      <line x1="180" y1="206" x2="${x1.toFixed(1)}" y2="${y.toFixed(1)}" class="fig-ink" stroke="currentColor" />
      <line x1="180" y1="206" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" class="fig-ink" stroke="currentColor" />
      <text x="185" y="112" class="text-warn">centre ${c}°</text>
      <text x="184" y="190" class="text-good">circumference ${a}°</text>`;
    readout.textContent = `Centre angle ${c} degrees; circumference angle ${a} degrees.`;
  }
  el.querySelector('.angle').addEventListener('input', draw);
  draw();
}
