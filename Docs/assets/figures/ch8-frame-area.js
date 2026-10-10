// Guided investigation: compare the areas of a rectangular frame.
// The learner predicts an expression before adjusting the side variable.
export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <svg viewBox="0 0 320 150" width="100%" role="img" aria-label="Outer rectangle with a smaller rectangular opening"></svg>
      <label>Side value x <input type="range" min="1" max="10" value="2" step="1"></label>
      <p aria-live="polite"></p>
    </div>`;
  const svg = el.querySelector("svg");
  const input = el.querySelector("input");
  const readout = el.querySelector("p");
  function update() {
    const x = Number(input.value);
    const outerW = 220;
    const outerH = 110;
    const innerW = outerW * x / (x + 6);
    const innerH = outerH * x / (x + 4);
    const ix = (320 - innerW) / 2;
    const iy = 18 + (outerH - innerH) / 2;
    svg.innerHTML = `<rect x="50" y="18" width="220" height="110" class="fig-accent" fill="none" stroke="currentColor" stroke-width="3"/><rect x="${ix}" y="${iy}" width="${innerW}" height="${innerH}" class="fig-warn" fill="none" stroke="currentColor" stroke-width="2"/><text x="160" y="145" text-anchor="middle" class="fig-ink">Outer: (x + 6)(x + 4) · Opening: x(x + 2)</text>`;
    const outer = (x + 6) * (x + 4);
    const inner = x * (x + 2);
    readout.innerHTML = `At x = ${x}: outer area ${outer}, opening area ${inner}, frame area <strong class="text-good">${outer-inner}</strong> square units. Explain why the x² terms cancel.`;
  }
  input.addEventListener("input", update);
  update();
}
