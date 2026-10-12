// Guided figure: compare simple and compound interest over a fixed number of years.
// The reader predicts before moving the time control, then explains the difference.
export function mount(el) {
  el.innerHTML = `<div style="max-width:560px;font:14px system-ui">
    <label>Years: <input class="years" type="range" min="1" max="10" value="5"></label>
    <svg viewBox="0 0 420 150" width="100%" role="img" aria-label="Simple and compound balances over time"></svg>
    <p class="readout" aria-live="polite"></p>
  </div>`;
  const svg=el.querySelector('svg'), output=el.querySelector('.readout');
  function draw(){
    const years=Number(el.querySelector('.years').value), start=1000, rate=.05;
    // The vertical scale is set by the largest balance on the drawing, so the
    // compound curve — the point of the figure — stays inside the frame.
    const biggest=start*(1+rate)**years-start;
    const scale=100/biggest;
    const points=(compound)=>Array.from({length:years+1},(_,i)=>{
      const balance=compound?start*(1+rate)**i:start*(1+rate*i);
      return [30+i*(360/years),120-(balance-start)*scale];
    });
    const line=(pts,cls)=>`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="currentColor" stroke-width="3" class="${cls}"/>`;
    svg.innerHTML=`<path d="M30 120 H400 M30 120 V20" fill="none" stroke="currentColor" class="fig-grid"/>`+line(points(false),'fig-accent')+line(points(true),'fig-good')+`<text x="32" y="18" class="fig-ink">Blue: simple · Green: compound</text>`;
    const simple=start*(1+rate*years), compound=start*(1+rate)**years;
    output.textContent=`After ${years} years: simple £${simple.toFixed(2)}; compound £${compound.toFixed(2)}. Why does compound interest grow faster?`;
  }
  el.querySelector('input').addEventListener('input',draw); draw();
}
