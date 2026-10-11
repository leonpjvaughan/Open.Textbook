// Guided construction: equal-radius arcs locate a perpendicular bisector.
export function mount(el) {
  el.innerHTML = `
    <section class="fig-grid" style="padding:1rem">
      <p class="text-accent">Two fixed points and equal-radius arcs locate points equally far from both ends.</p>
      <label>Compass width: <input class="width" type="range" min="60" max="140" step="5" value="100"></label>
      <p class="readout text-ink" aria-live="polite"></p>
      <svg viewBox="0 0 320 190" role="img" aria-label="Equal-radius arcs from endpoints A and B cross above and below the segment; their crossings define the perpendicular bisector">
        <line x1="70" y1="95" x2="250" y2="95" class="fig-ink" stroke="currentColor" stroke-width="3" />
        <g class="arcs" fill="none" stroke="currentColor" stroke-width="2">
          <path class="fig-accent arc-a" />
          <path class="fig-warn arc-b" />
        </g>
        <line x1="160" y1="10" x2="160" y2="180" class="fig-good" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4" />
        <circle cx="70" cy="95" r="4" class="fig-ink" fill="currentColor" />
        <circle cx="250" cy="95" r="4" class="fig-ink" fill="currentColor" />
        <text x="58" y="118" class="text-ink">A</text><text x="254" y="118" class="text-ink">B</text>
      </svg>
    </section>`;
  const input = el.querySelector('.width');
  const readout = el.querySelector('.readout');
  function draw() {
    const r = Number(input.value);
    const y = Math.sqrt(Math.max(0, r * r - 90 * 90));
    el.querySelector('.arc-a').setAttribute('d', `M ${70 + r} 95 A ${r} ${r} 0 1 0 ${70 - r} 95`);
    el.querySelector('.arc-b').setAttribute('d', `M ${250 + r} 95 A ${r} ${r} 0 1 0 ${250 - r} 95`);
    readout.textContent = `The marked endpoints are 180 units apart. Each arc radius is ${r} units; the crossings are ${Math.round(y)} units above and below the segment.`;
  }
  input.addEventListener('input', draw);
  draw();
}
