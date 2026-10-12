// Guided construction: equal-radius arcs locate a perpendicular bisector.
export function mount(el) {
  el.innerHTML = `
    <section class="fig-grid" style="padding:1rem">
      <p class="text-accent">Two fixed points and equal-radius arcs locate points equally far from both ends.</p>
      <label>Compass width: <input class="width" type="range" min="60" max="125" step="5" value="100"></label>
      <p class="readout text-ink" aria-live="polite"></p>
      <svg viewBox="0 0 320 190" role="img" aria-label="Equal-radius arcs drawn from two fixed endpoints, meeting the perpendicular bisector">
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
  const svg = el.querySelector('svg');
  function draw() {
    const r = Number(input.value);
    const half = 90; // half of the 180-unit segment between A and B
    const y = Math.sqrt(Math.max(0, r * r - half * half));
    // The crossings lie on the right half of the circle about A and the left
    // half of the circle about B, so those are the halves to draw. Two upper
    // semicircles meet only above the segment, which is not the construction.
    el.querySelector('.arc-a').setAttribute('d', `M 70 ${95 - r} A ${r} ${r} 0 0 1 70 ${95 + r}`);
    el.querySelector('.arc-b').setAttribute('d', `M 250 ${95 - r} A ${r} ${r} 0 0 0 250 ${95 + r}`);
    if (r < half) {
      readout.textContent = `The marked endpoints are 180 units apart. Each arc radius is ${r} units, which is less than half the segment, so the arcs do not meet. Widen the compass to draw the perpendicular bisector.`;
      svg.setAttribute('aria-label', `Two equal-radius arcs drawn from endpoints A and B. The compass width of ${r} units is less than half the 180-unit segment, so the arcs do not meet.`);
    } else if (y === 0) {
      readout.textContent = `The marked endpoints are 180 units apart. Each arc radius is ${r} units, exactly half the segment, so the arcs touch at the midpoint of the segment.`;
      svg.setAttribute('aria-label', `Two equal-radius arcs drawn from endpoints A and B. The arcs are tangent at the midpoint of the segment, giving one point equally far from both ends.`);
    } else {
      const gap = Math.round(y);
      readout.textContent = `The marked endpoints are 180 units apart. Each arc radius is ${r} units, so the arcs cross ${gap} units above and ${gap} units below the segment.`;
      svg.setAttribute('aria-label', `Two equal-radius arcs drawn from endpoints A and B. The arcs cross about ${gap} units above and ${gap} units below the segment; the two crossings define the perpendicular bisector.`);
    }
  }
  input.addEventListener('input', draw);
  draw();
}
