// Guided investigation: predict how enlargement changes a point's coordinates.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 320 230" width="100%" role="img" aria-label="Coordinate grid showing a point and its enlarged image">
        <path d="M20 200H290 M60 210V20" class="fig-grid" fill="none" stroke="currentColor" stroke-width="1" />
        <circle class="fig-accent" cx="100" cy="160" r="5" fill="currentColor" />
        <text x="94" y="156" class="text-accent" text-anchor="end">P</text>
      </svg>
      <label>Scale factor <input type="range" min="1" max="4" value="2" step="1"></label>
      <p aria-live="polite"></p>
    </div>`;
  const input = el.querySelector('input');
  const readout = el.querySelector('p');
  const svg = el.querySelector('svg');
  function update() {
    const k = Number(input.value);
    const px = 60 + 40 * k;
    const py = 200 - 40 * k;
    svg.querySelectorAll('[data-image]').forEach((image) => image.remove());
    const imagePoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    imagePoint.setAttribute('data-image', '');
    imagePoint.setAttribute('cx', px);
    imagePoint.setAttribute('cy', py);
    imagePoint.setAttribute('r', '6');
    imagePoint.setAttribute('class', 'fig-good');
    imagePoint.setAttribute('fill', 'currentColor');
    svg.appendChild(imagePoint);
    const imageLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    imageLabel.setAttribute('data-image', '');
    imageLabel.setAttribute('x', px + 6);
    imageLabel.setAttribute('y', py - 6);
    imageLabel.setAttribute('class', 'text-good');
    imageLabel.textContent = 'image';
    svg.appendChild(imageLabel);
    svg.setAttribute('aria-label', `Coordinate grid with point P at (1, 1) and its image at (${k}, ${k}) after an enlargement of scale factor ${k}`);
    readout.textContent = `Scale factor ${k}. Explain how the image coordinates relate to P.`;
  }
  input.addEventListener('input', update);
  update();
}
