// Guided investigation for 13.1: the shape of a binomial distribution.
// The reader sets n and p and watches the bars for P(X = r). The module builds
// the exact probabilities from the binomial formula, so the chart matches the
// formula on the page. Pure HTML and SVG, no framework and no colour of its
// own: the fig-* classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the two sliders, the live
// readout and the redraw — comes from `kit.js`.
import { panel, slider, react } from "./kit.js";

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
    const value =
      binomialCoefficient(n, r) * p ** r * (1 - p) ** (n - r);
    values.push(value);
  }
  return values;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A bar chart of the binomial probabilities for chosen n and p",
    width: 460,
    height: 200,
    max: 620,
  });

  const nInput = slider(el, {
    id: "n",
    label: "Number of trials n",
    min: 1,
    max: 20,
    step: 1,
    value: 10,
  });
  const pInput = slider(el, {
    id: "p",
    label: "Probability of success p",
    min: 5,
    max: 95,
    step: 5,
    value: 50,
    format: (value) => (value / 100).toFixed(2),
  });

  function render() {
    const n = Number(nInput.value);
    const p = Number(pInput.value) / 100;
    const probabilities = binomialProbabilities(n, p);
    const tallest = Math.max(...probabilities);
    const mode = probabilities.indexOf(tallest);

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
      .map((value, r) => {
        const x = left + (r + 0.5) * (plotW / (n + 1)) - barW / 2;
        const height = tallest === 0 ? 0 : (value / tallest) * plotH;
        return (
          `<rect x="${x.toFixed(1)}" y="${(base - height).toFixed(1)}" ` +
          `width="${barW.toFixed(1)}" height="${Math.max(0, height).toFixed(1)}" ` +
          `class="fig-accent" fill-opacity="0.45" stroke="currentColor"></rect>`
        );
      })
      .join("");

    const ticks = probabilities
      .map((value, r) => {
        if (r % step !== 0) {
          return "";
        }
        const x = left + (r + 0.5) * (plotW / (n + 1));
        return (
          `<text x="${x.toFixed(1)}" y="${base + 15}" text-anchor="middle" ` +
          `class="fig-ink" font-size="13">${r}</text>`
        );
      })
      .join("");

    svg.innerHTML = axis + bars + ticks;

    readout.textContent =
      `n = ${n} and p = ${p.toFixed(2)}. The tallest bar is at r = ${mode}, ` +
      `with probability ${tallest.toFixed(4)}. The probabilities add to 1.`;

    svg.setAttribute(
      "aria-label",
      `A bar chart of the binomial distribution for n equals ${n} and p equals ` +
        `${p.toFixed(2)}. The tallest bar is at ${mode} with probability ` +
        `${tallest.toFixed(4)}.`
    );
  }

  react([nInput, pInput], render);
}
