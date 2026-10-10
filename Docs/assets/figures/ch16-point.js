// Guided investigation: angles around a point complete a full turn.
export function mount(el) {
  el.innerHTML = `
    <section class="fig-grid" style="padding:1rem">
      <p class="text-accent">Angles around one point complete a full turn.</p>
      <label>First angle: <input class="first" type="range" min="30" max="150" step="10" value="90"></label>
      <label>Second angle: <input class="second" type="range" min="30" max="150" step="10" value="110"></label>
      <p class="readout text-ink" aria-live="polite"></p>
      <div class="bar fig-ink" role="img" aria-label="Three angle sectors around a point; the third completes the full turn"></div>
    </section>`;
  const readout = el.querySelector('.readout');
  const bar = el.querySelector('.bar');
  function draw() {
    const a = Number(el.querySelector('.first').value);
    const b = Number(el.querySelector('.second').value);
    const c = 360 - a - b;
    readout.textContent = `Known angles: ${a} and ${b} degrees. The remaining angle is ${c} degrees.`;
    bar.style.height = '1rem';
    bar.style.background = `linear-gradient(90deg, var(--md-primary-fg-color) 0 ${a/3.6}%, #888 ${a/3.6}% ${(a+b)/3.6}%, currentColor ${(a+b)/3.6}% 100%)`;
    bar.setAttribute('aria-label', `Angle amounts ${a}, ${b}, and ${c} degrees total 360 degrees`);
  }
  el.querySelectorAll('input').forEach(input => input.addEventListener('input', draw));
  draw();
}
