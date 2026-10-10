// Guided investigation: predict how enlargement changes a point's coordinates.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 320 230" width="100%" role="img" aria-label="Coordinate grid showing a point and its enlarged image">
        <path d="M30 110H290 M160 210V20" class="fig-grid" fill="none" stroke="currentColor" stroke-width="1" />
        <circle class="fig-accent" cx="190" cy="80" r="5" fill="currentColor" />
        <circle class="fig-warn" cx="220" cy="50" r="5" fill="currentColor" />
        <text x="195" y="96" class="text-accent">P</text>
        <text x="225" y="45" class="text-warn">image</text>
      </svg>
      <label>Scale factor <input type="range" min="1" max="4" value="2" step="1"></label>
      <p aria-live="polite"></p>
    </div>`;
  const input = el.querySelector('input');
  const readout = el.querySelector('p');
  const svg = el.querySelector('svg');
  function update() {
    const k = Number(input.value);
    const px = 160 + 30 * k;
    const py = 110 - 30 * k;
    const old = svg.querySelector('[data-image]');
    if (old) old.remove();
    const imagePoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    imagePoint.setAttribute('data-image', '');
    imagePoint.setAttribute('cx', px);
    imagePoint.setAttribute('cy', py);
    imagePoint.setAttribute('r', '6');
    imagePoint.setAttribute('class', 'fig-good');
    imagePoint.setAttribute('fill', 'currentColor');
    svg.appendChild(imagePoint);
    readout.innerHTML = `For P = (1, 1) and scale factor ${k}, the image is (${k}, ${k}). Explain the coordinate rule.`;
  }
  input.addEventListener('input', update);
  update();
}
