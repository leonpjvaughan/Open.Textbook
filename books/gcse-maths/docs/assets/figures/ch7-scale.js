// Guided scale investigation for Chapter 7. Predict → Test → Explain.
export function mount(el) {
  el.innerHTML = `<div style="max-width:560px">
    <label>Drawing length: <input class="length" type="range" min="1" max="8" step="0.5" value="3"></label>
    <label>Scale denominator: <input class="scale" type="range" min="10000" max="50000" step="10000" value="25000"></label>
    <p class="output" aria-live="polite"></p>
    <div class="fig-grid" role="img" aria-label="Scale bar comparing a drawing length with the real distance it represents" style="height:1rem;border:1px solid currentColor"><div class="bar" style="height:100%;width:30%;background:var(--tb-fig-accent)"></div></div>
    <p class="text-accent">Drawing distance and real distance keep the same scale ratio.</p>
  </div>`;
  const update=()=>{
    const length=Number(el.querySelector('.length').value);
    const scale=Number(el.querySelector('.scale').value);
    const metres=length*scale/100;
    el.querySelector('.output').innerHTML=`<strong class="fig-good">${length} cm</strong> on a 1:${scale.toLocaleString('en-GB')} map represents <strong>${metres.toLocaleString('en-GB')} m</strong>.`;
    el.querySelector('.bar').style.width=`${length/8*100}%`;
  };
  el.querySelectorAll('input').forEach(input=>input.addEventListener('input',update));
  update();
}
