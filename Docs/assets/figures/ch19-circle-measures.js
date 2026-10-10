// Guided comparison of how circumference and area change with circle radius.
export function mount(el) {
  el.innerHTML = `<div style="max-width:560px;font:14px system-ui">
    <label>Radius in units: <input class="radius" type="range" min="1" max="8" value="3"></label>
    <svg viewBox="0 0 420 170" width="100%" role="img" aria-label="Bar comparison showing circumference and area for a circle"></svg>
    <p class="readout" aria-live="polite"></p>
  </div>`;
  const svg=el.querySelector('svg'), output=el.querySelector('.readout');
  function draw(){
    const r=Number(el.querySelector('input').value), c=2*Math.PI*r, a=Math.PI*r*r;
    const scale=100/Math.max(c,a), ch=c*scale, ah=a*scale;
    svg.innerHTML=`<path d="M45 140 H400 M45 140 V20" fill="none" class="fig-grid"/>`+
      `<rect x="100" y="${140-ch}" width="70" height="${ch}" class="fig-accent"/>`+
      `<rect x="230" y="${140-ah}" width="70" height="${ah}" class="fig-good"/>`+
      `<text x="95" y="158" class="text-accent">Circumference</text>`+
      `<text x="245" y="158" class="text-good">Area</text>`+
      `<text x="110" y="${Math.max(18,132-ch)}" class="fig-ink">2πr</text>`+
      `<text x="240" y="${Math.max(18,132-ah)}" class="fig-ink">πr²</text>`;
    output.textContent=`Radius ${r}: circumference ${c.toFixed(2)} units; area ${a.toFixed(2)} square units. Explain how each value changes when radius doubles.`;
  }
  el.querySelector('input').addEventListener('input',draw); draw();
}
