// Guided probability scale: predict and test how changing red regions changes chance.
const SECTORS = 10;
const CENTRE = 100;
const OUTER = 88;
const INNER = 30;

// A point on the spinner, 0 degrees at the top and increasing clockwise.
function at(radius, degrees) {
  const radians = (degrees * Math.PI) / 180;
  const round = (value) => Math.round(value * 100) / 100;
  return `${round(CENTRE + radius * Math.sin(radians))} ${round(CENTRE - radius * Math.cos(radians))}`;
}

// One equal sector, drawn as an annular wedge so the ten are visibly the same size.
function sector(index) {
  const from = (index * 360) / SECTORS;
  const to = ((index + 1) * 360) / SECTORS;
  return `M ${at(OUTER, from)} A ${OUTER} ${OUTER} 0 0 1 ${at(OUTER, to)} ` +
    `L ${at(INNER, to)} A ${INNER} ${INNER} 0 0 0 ${at(INNER, from)} Z`;
}

function sectors(red) {
  return Array.from({ length: SECTORS }, (_, index) =>
    `<path class="${index < red ? 'fig-accent' : 'fig-ink'}" d="${sector(index)}"></path>`
  ).join('');
}

export function mount(el) {
  el.innerHTML = `
    <section class="fig-grid" style="padding:1rem;max-width:320px">
      <p class="text-accent">A spinner has 10 equal sectors. Change how many are red.</p>
      <label>Red sectors: <input class="red" type="range" min="0" max="10" step="1" value="4"></label>
      <p class="readout text-ink" aria-live="polite"></p>
      <svg class="spinner" width="100%" viewBox="0 0 200 200" role="img" aria-label="A spinner divided into ten equal sectors"></svg>
    </section>`;
  const readout = el.querySelector('.readout');
  const spinner = el.querySelector('.spinner');
  function draw() {
    const red = Number(el.querySelector('.red').value);
    spinner.innerHTML = sectors(red);
    spinner.setAttribute('aria-label', `A spinner divided into ten equal sectors, ${red} of them red`);
    readout.textContent = `Red sectors: ${red} out of 10. Probability of red: ${red}/10.`;
  }
  el.querySelector('.red').addEventListener('input', draw);
  draw();
}
