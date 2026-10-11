// Guided model: a fraction strip with an adjustable number of equal parts.
// The reader predicts a matching numerator before using the controls.
export function mount(el) {
  el.innerHTML = `
    <section class="fig-grid" style="padding:1rem">
      <p class="text-accent">Fraction strip: compare two equivalent amounts.</p>
      <label>Number of parts: <input class="parts" type="range" min="3" max="15" step="1" value="6"></label>
      <p class="readout text-ink" aria-live="polite"></p>
      <div class="strip" role="img" aria-label="Strip divided into equal parts; shaded parts show two thirds"></div>
    </section>`;
  const strip=el.querySelector('.strip');
  const readout=el.querySelector('.readout');
  function draw(){
    const n=Number(el.querySelector('.parts').value);
    const shaded=2*n/3;
    const whole=Math.floor(shaded);
    const partial=shaded-whole;
    const cells=[];
    for(let i=0;i<n;i++){
      const fill=i<whole?'fig-accent':(i===whole&&partial>0?'fig-warn':'fig-ink');
      const opacity=i<whole?'1':(i===whole&&partial>0?String(partial):'0.16');
      cells.push(`<span class="${fill}" style="display:block;height:2rem;opacity:${opacity};border:1px solid currentColor"></span>`);
    }
    strip.style.display='grid'; strip.style.gridTemplateColumns=`repeat(${n}, minmax(0,1fr))`; strip.innerHTML=cells.join('');
    readout.textContent=`${n} equal parts: two thirds corresponds to ${shaded} parts.`;
  }
  el.querySelector('.parts').addEventListener('input',draw); draw();
}
