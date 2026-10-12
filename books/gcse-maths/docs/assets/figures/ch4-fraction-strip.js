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
      // A `fig-*` class only sets `fill`/`stroke`, which paint nothing on an HTML
      // box, so each cell takes its background from the same token.
      const counted=i<whole;
      const part=i===whole&&partial>0;
      const background=counted?'var(--tb-fig-accent)'
        :part?'var(--tb-fig-warn)'
        :'color-mix(in srgb, var(--tb-ink) 12%, transparent)';
      const opacity=part?String(partial):'1';
      cells.push(`<span style="display:block;height:2rem;opacity:${opacity};border:1px solid currentColor;background:${background}"></span>`);
    }
    strip.style.display='grid'; strip.style.gridTemplateColumns=`repeat(${n}, minmax(0,1fr))`; strip.innerHTML=cells.join('');
    readout.textContent=`${n} equal parts: two thirds corresponds to ${Number(shaded.toFixed(2))} parts.`;
  }
  el.querySelector('.parts').addEventListener('input',draw); draw();
}
