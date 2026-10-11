// Guided right-triangle investigation: predict before changing the second leg.
export function mount(el) {
  el.innerHTML = `<div style="max-width:520px">
    <svg viewBox="0 0 360 220" width="100%" role="img" aria-label="Right-angled triangle with one fixed side and one adjustable side"></svg>
    <label>Second shorter side <input type="range" min="1" max="8" step="1" value="4" aria-label="Second shorter side length"></label>
    <p class="readout text-accent" aria-live="polite"></p>
  </div>`;
  const svg=el.querySelector('svg'), input=el.querySelector('input'), out=el.querySelector('.readout');
  function update(){
    const b=Number(input.value), scale=18, x0=25, y0=185, a=6;
    const x1=x0+a*scale, y1=y0-b*scale, c=Math.hypot(a,b);
    svg.innerHTML=`<path d="M${x0} ${y0} L${x1} ${y0} L${x1} ${y1} Z" fill="none" stroke="currentColor" stroke-width="3" class="fig-accent"/><path d="M${x1-12} ${y0} L${x1-12} ${y0-12} L${x1} ${y0-12}" fill="none" stroke="currentColor" class="fig-grid"/><text x="${x0+40}" y="${y0+22}" class="fig-ink">6 units</text><text x="${x1+5}" y="${y0-b*scale/2}" class="text-warn">${b} units</text><text x="${x0+40}" y="${y0-b*scale/2-8}" class="text-good">hypotenuse</text>`;
    out.textContent=`The hypotenuse is √(${a}² + ${b}²) = ${c.toFixed(2)} units.`;
  }
  input.addEventListener('input',update); update();
}
