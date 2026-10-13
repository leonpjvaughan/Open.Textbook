// Guided investigation: predict how the real distance changes with map length.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 360 100" width="100%" role="img" aria-label="A map segment and the real distance it represents">
        <line x1="24" y1="40" x2="84" y2="40" class="fig-ink" stroke-width="3"></line>
        <circle cx="24" cy="40" r="6" class="fig-accent"></circle>
        <circle cx="84" cy="40" r="6" class="fig-warn"></circle>
        <text x="24" y="68" class="text-ink" font-size="13">Map length</text>
        <text x="24" y="90" class="text-good" font-size="13">Scale 1 cm : 1 m</text>
      </svg>
      <label>Map length in cm <input type="range" min="1" max="10" step="1" value="2" aria-label="Map length in centimetres"></label>
      <p class="readout text-accent" aria-live="polite"></p>
    </div>`;
  const svg = el.querySelector('svg');
  const line = el.querySelector('line');
  const farEnd = el.querySelector('circle.fig-warn');
  const input = el.querySelector('input');
  const readout = el.querySelector('.readout');
  // 30 pixels per centimetre keeps the longest segment inside the frame.
  const PIXELS_PER_CM = 30;
  const update = () => {
    const n = Number(input.value);
    const x2 = 24 + PIXELS_PER_CM * n;
    line.setAttribute('x2', x2);
    farEnd.setAttribute('cx', x2);
    const centimetres = n === 1 ? 'centimetre' : 'centimetres';
    const metres = n === 1 ? 'metre' : 'metres';
    svg.setAttribute('aria-label', `A map segment ${n} ${centimetres} long, representing ${n} ${metres} in real life`);
    readout.textContent = `${n} cm on the map represents ${n} m in real life.`;
  };
  input.addEventListener('input', update);
  update();
}
