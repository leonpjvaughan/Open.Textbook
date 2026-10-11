// Guided investigation for 13.2: at most, exactly and at least on a binomial
// distribution. The reader sets n, p and r, chooses a range, and sees the
// shaded bars and the probability. The probabilities are built from the
// binomial formula. Pure HTML and SVG, no colour of its own: the fig-* classes
// carry the theme. Runtime text is plain text, never TeX.

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

const RANGES = [
  { id: "exactly", label: "exactly r" },
  { id: "at_most", label: "at most r" },
  { id: "at_least", label: "at least r" },
];

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:620px">
      <label>Number of trials n
        <input class="n" type="range" min="2" max="20" step="1" value="10">
        <output class="n-out">10</output>
      </label>
      <label>Probability of success p
        <input class="p" type="range" min="5" max="95" step="5" value="40">
        <output class="p-out">0.40</output>
      </label>
      <label>Value r
        <input class="r" type="range" min="0" max="10" step="1" value="2">
        <output class="r-out">2</output>
      </label>
      <label>Range
        <select class="range">
          ${RANGES.map((item) => `<option value="${item.id}">${item.label}</option>`).join("")}
        </select>
      </label>
      <svg viewBox="0 0 460 200" width="100%" role="img"
           aria-label="A bar chart of a binomial distribution with a shaded range"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const nInput = el.querySelector(".n");
  const pInput = el.querySelector(".p");
  const rInput = el.querySelector(".r");
  const rangeInput = el.querySelector(".range");
  const nOut = el.querySelector(".n-out");
  const pOut = el.querySelector(".p-out");
  const rOut = el.querySelector(".r-out");

  function inRange(r, value, kind) {
    if (kind === "exactly") {
      return r === value;
    }
    if (kind === "at_most") {
      return r <= value;
    }
    return r >= value;
  }

  function render() {
    const n = Number(nInput.value);
    const p = Number(pInput.value) / 100;
    rInput.max = String(n);
    if (Number(rInput.value) > n) {
      rInput.value = String(n);
    }
    const r = Number(rInput.value);
    const kind = rangeInput.value;
    const probabilities = binomialProbabilities(n, p);
    const tallest = Math.max(...probabilities);
    const shaded = probabilities.reduce(
      (sum, value, index) => (inRange(index, r, kind) ? sum + value : sum),
      0
    );

    const plotW = 400;
    const plotH = 130;
    const left = 40;
    const base = 160;
    const gap = 2;
    const barW = Math.max(2, plotW / (n + 1) - gap);

    const axis =
      `<line x1="${left}" y1="${base}" x2="${left + plotW}" y2="${base}" class="fig-ink"></line>` +
      `<line x1="${left}" y1="${base}" x2="${left}" y2="${base - plotH}" class="fig-ink"></line>`;

    const step = n > 12 ? Math.ceil(n / 10) : 1;
    const bars = probabilities
      .map((value, index) => {
        const x = left + (index + 0.5) * (plotW / (n + 1)) - barW / 2;
        const height = tallest === 0 ? 0 : (value / tallest) * plotH;
        const picked = inRange(index, r, kind);
        const barClass = picked ? "fig-accent" : "fig-grid";
        const opacity = picked ? "0.75" : "0.35";
        return (
          `<rect x="${x.toFixed(1)}" y="${(base - height).toFixed(1)}" ` +
          `width="${barW.toFixed(1)}" height="${Math.max(0, height).toFixed(1)}" ` +
          `class="${barClass}" fill-opacity="${opacity}" stroke="currentColor"></rect>`
        );
      })
      .join("");

    const ticks = probabilities
      .map((value, index) => {
        if (index % step !== 0) {
          return "";
        }
        const x = left + (index + 0.5) * (plotW / (n + 1));
        return (
          `<text x="${x.toFixed(1)}" y="${base + 15}" text-anchor="middle" ` +
          `class="fig-ink" font-size="10">${index}</text>`
        );
      })
      .join("");

    svg.innerHTML = axis + bars + ticks;

    nOut.value = n;
    nOut.textContent = n;
    pOut.value = p.toFixed(2);
    pOut.textContent = p.toFixed(2);
    rOut.value = r;
    rOut.textContent = r;

    const words = RANGES.find((item) => item.id === kind).label.replace(
      "r",
      String(r)
    );
    readout.textContent =
      `n = ${n}, p = ${p.toFixed(2)}. The shaded probability for "${words}" ` +
      `is ${shaded.toFixed(4)}.`;

    svg.setAttribute(
      "aria-label",
      `A binomial bar chart for n equals ${n} and p equals ${p.toFixed(2)}, ` +
        `with the bars for ${words} shaded. The shaded probability is ` +
        `${shaded.toFixed(4)}.`
    );
  }

  nInput.addEventListener("input", render);
  pInput.addEventListener("input", render);
  rInput.addEventListener("input", render);
  rangeInput.addEventListener("change", render);

  render();
}
