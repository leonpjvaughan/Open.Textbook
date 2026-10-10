// Guided investigation: predict how the real distance changes with map length.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 360 100" width="100%" role="img" aria-label="A map segment and its represented real distance">
        <line x1="24" y1="40" x2="180" y2="40" class="fig-ink fig-grid" stroke-width="3"></line>
        <circle cx="24" cy="40" r="6" class="fig-accent"></circle>
        <circle cx="180" cy="40" r="6" class="fig-warn"></circle>
        <text x="24" y="68" class="fig-ink" font-size="13">Map length</text>
        <text x="190" y="45" class="text-good" font-size="13">Scale 1 cm : 1 m</text>
      </svg>
      <label>Map length in cm <input type="range" min="1" max="10" step="1" value="2" aria-label="Map length in centimetres"></label>
      <p class="readout text-accent" aria-live="polite"></p>
    </div>`;
  const input = el.querySelector('input');
  const readout = el.querySelector('.readout');
  const update = () => { const n = Number(input.value); readout.textContent = `${n} cm on the map represents ${n} m in real life.`; };
  input.addEventListener('input', update);
  update();
}
