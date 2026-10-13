// Guided investigation for 13.4: the binomial bars and the matching Normal
// curve. The curve has mean np and standard deviation sqrt(np(1-p)). The bars
// are scaled to their tallest value and the curve is scaled to its peak, so
// the two can be compared. Pure HTML and SVG, no colour of its own: the
// fig-* classes carry the theme. Runtime text is plain text, never TeX.

function binomialCoefficient(n, r) {
  let result = 1;
  for (let i = 0; i < r; i += 1) {
    result = (result * (n - i)) / (i + 1);
  }
  return Math.round(result);
}

function binomialProbabilities(n, p) {
  const values = [];
  for (let r = 0; r <= n; r += 1) {
    values.push(binomialCoefficient(n, r) * p ** r * (1 - p) ** (n - r));
  }
  return values;
}

function normalPdf(x, mu, sigma) {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:640px">
      <label>Number of trials n
        <input class="n" type="range" min="5" max="100" step="5" value="20">
        <output class="n-out">20</output>
      </label>
      <label>Probability of success p
        <input class="p" type="range" min="5" max="95" step="5" value="50">
        <output class="p-out">0.50</output>
      </label>
      <svg viewBox="0 0 480 200" width="100%" role="img"
           aria-label="Binomial bars with a Normal curve drawn over them"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const nInput = el.querySelector(".n");
  const pInput = el.querySelector(".p");
  const nOut = el.querySelector(".n-out");
  const pOut = el.querySelector(".p-out");

  function render() {
    const n = Number(nInput.value);
    const p = Number(pInput.value) / 100;
    const probabilities = binomialProbabilities(n, p);
    const tallest = Math.max(...probabilities);
    const mu = n * p;
    const sigma = Math.sqrt(n * p * (1 - p));
    const peakPdf = normalPdf(mu, mu, sigma);

    const left = 30;
    const plotW = 430;
    const base = 160;
    const plotH = 125;
    const lo = -0.5;
    const hi = n + 0.5;
    const toX = (value) => left + ((value - lo) / (hi - lo)) * plotW;

    const axis =
      `<line x1="${left}" y1="${base}" x2="${left + plotW}" y2="${base}" class="fig-ink"></line>`;

    const gap = 1;
    const barW = Math.max(1, plotW / (n + 1) - gap);
    const bars = probabilities
      .map((value, r) => {
        const x = toX(r) - barW / 2;
        const height = (value / tallest) * plotH * 0.92;
        return (
          `<rect x="${x.toFixed(1)}" y="${(base - height).toFixed(1)}" ` +
          `width="${barW.toFixed(1)}" height="${Math.max(0, height).toFixed(1)}" ` +
          `class="fig-accent" fill-opacity="0.35" stroke="currentColor"></rect>`
        );
      })
      .join("");

    const points = [];
    for (let i = 0; i <= 240; i += 1) {
      const value = lo + ((hi - lo) * i) / 240;
      const height = (normalPdf(value, mu, sigma) / peakPdf) * plotH * 0.92;
      points.push(`${toX(value).toFixed(1)},${(base - height).toFixed(1)}`);
    }
    const curve = `<polyline points="${points.join(" ")}" fill="none" class="fig-ink"></polyline>`;

    const ticks = [];
    for (let r = 0; r <= n; r += Math.max(1, Math.round(n / 10))) {
      ticks.push(
        `<text x="${toX(r).toFixed(1)}" y="${base + 15}" text-anchor="middle" ` +
          `class="fig-ink" font-size="14">${r}</text>`
      );
    }

    svg.innerHTML = bars + curve + axis + ticks.join("");

    nOut.value = n;
    nOut.textContent = n;
    pOut.value = p.toFixed(2);
    pOut.textContent = p.toFixed(2);
    const ok = mu > 5 && n * (1 - p) > 5;
    readout.textContent =
      `n = ${n} and p = ${p.toFixed(2)}. The matching curve has mean ` +
      `${mu.toFixed(1)} and standard deviation ${sigma.toFixed(2)}. ` +
      `np = ${mu.toFixed(1)} and n(1 - p) = ${(n * (1 - p)).toFixed(1)}, so ` +
      `the approximation is ${ok ? "reasonable" : "not reliable"}.`;

    svg.setAttribute(
      "aria-label",
      `Binomial bars for n equals ${n} and p equals ${p.toFixed(2)}, with a ` +
        `Normal curve of mean ${mu.toFixed(1)} and standard deviation ` +
        `${sigma.toFixed(2)} drawn over them.`
    );
  }

  nInput.addEventListener("input", render);
  pInput.addEventListener("input", render);

  render();
}
