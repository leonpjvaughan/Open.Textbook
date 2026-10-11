// Guided investigation for proof by exhaustion: check n squared + n + 41 for
// n = 0 to 45 and watch the first composite value appear. Pure HTML and ES
// module, no framework, no colour of its own: the fig-* classes carry the theme.
const N_MAX = 45;

function isPrime(value) {
  if (value < 2) return false;
  for (let i = 2; i * i <= value; i += 1) {
    if (value % i === 0) return false;
  }
  return true;
}

function firstFactor(value) {
  for (let i = 2; i * i <= value; i += 1) {
    if (value % i === 0) return i;
  }
  return value;
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:520px">
      <label>Value of n
        <input class="n" type="range" min="0" max="${N_MAX}" step="1" value="0">
      </label>
      <svg viewBox="0 0 360 80" width="100%" role="img"
           aria-label="A strip of the values of n from 0 to 45, with the current value marked"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const input = el.querySelector(".n");
  const visited = new Set();
  const cellW = 360 / (N_MAX + 1);

  function update() {
    const n = Number(input.value);
    const value = n * n + n + 41;
    const prime = isPrime(value);
    visited.add(n);

    let cells = "";
    for (let k = 0; k <= N_MAX; k += 1) {
      const x = k * cellW + 1;
      const width = cellW - 2;
      let cls = "fig-grid";
      if (visited.has(k)) {
        cls = isPrime(k * k + k + 41) ? "fig-accent" : "fig-warn";
      }
      cells += `<rect x="${x}" y="24" width="${width}" height="20" class="${cls}"></rect>`;
    }
    const markerX = n * cellW + cellW / 2;
    svg.innerHTML =
      cells +
      `<line x1="${markerX}" y1="16" x2="${markerX}" y2="52" class="fig-ink"></line>` +
      `<text x="2" y="72" class="fig-ink">n = 0</text>` +
      `<text x="326" y="72" class="fig-ink">n = 45</text>`;
    svg.setAttribute(
      "aria-label",
      `Values of n from 0 to 45. The current value is n equals ${n}, for which the expression equals ${value}, which is ${prime ? "prime" : "not prime"}.`
    );

    if (prime) {
      readout.textContent = `n = ${n}: the value is ${value}. It is prime.`;
    } else {
      const factor = firstFactor(value);
      readout.textContent =
        `n = ${n}: the value is ${value} = ${factor} times ${value / factor}. ` +
        `It is not prime, so the claim fails here.`;
    }
  }

  input.addEventListener("input", update);
  update();
}
