// Guided investigation for 14.1: the p-value, the critical region and the tail
// of a binomial test. Pure HTML and SVG, an ES module, no framework and no
// colour of its own: the fig-* classes carry the theme. Runtime text is plain
// text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the drop-downs,
// the live readout, the redraw — comes from `kit.js`. What is left here is the
// drawing and the sentence, which are the parts that differ from every other
// figure.
import { panel, slider, chooser, react } from "./kit.js";

function binomialPmf(n, p) {
  const pmf = new Array(n + 1).fill(0);
  let term = Math.pow(1 - p, n); // P(X = 0)
  pmf[0] = term;
  for (let k = 1; k <= n; k += 1) {
    term *= ((n - k + 1) / k) * (p / (1 - p));
    pmf[k] = term;
  }
  return pmf;
}

function cumulative(pmf) {
  const cdf = [];
  let running = 0;
  for (let k = 0; k < pmf.length; k += 1) {
    running += pmf[k];
    cdf.push(running);
  }
  return cdf;
}

// The largest lower tail and the smallest upper tail whose probability is at
// most the stated level. A null result means that tail is empty at this level.
function criticalRegion(cdf, alpha, tail) {
  const n = cdf.length - 1;
  const survival = (k) => (k <= 0 ? 1 : 1 - cdf[k - 1]); // P(X >= k)
  const largestBelow = (limit) => {
    let chosen = null;
    for (let k = 0; k <= n; k += 1) {
      if (cdf[k] <= limit + 1e-12) chosen = k;
    }
    return chosen;
  };
  const smallestAbove = (limit) => {
    let chosen = null;
    for (let k = n; k >= 0; k -= 1) {
      if (survival(k) <= limit + 1e-12) chosen = k;
    }
    return chosen;
  };
  if (tail === "left") return { low: largestBelow(alpha), high: null };
  if (tail === "right") return { low: null, high: smallestAbove(alpha) };
  const half = alpha / 2;
  return { low: largestBelow(half), high: smallestAbove(half) };
}

function pValue(cdf, observed, tail) {
  const left = cdf[observed];
  const right = observed <= 0 ? 1 : 1 - cdf[observed - 1];
  if (tail === "left") return left;
  if (tail === "right") return right;
  return Math.min(1, 2 * Math.min(left, right));
}

function inRegion(k, region) {
  const inLow = region.low !== null && k <= region.low;
  const inHigh = region.high !== null && k >= region.high;
  return inLow || inHigh;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A bar chart of a binomial distribution with the critical region shaded and the observed count marked",
    width: 460,
    height: 190,
    max: 640,
  });

  const nInput = slider(el, {
    id: "n",
    label: "Number of trials n",
    min: 10,
    max: 40,
    step: 5,
    value: 20,
  });
  const pInput = slider(el, {
    id: "p",
    label: "Null probability p",
    min: 0.05,
    max: 0.95,
    step: 0.05,
    value: 0.25,
    format: (value) => value.toFixed(2),
  });
  const observInput = slider(el, {
    id: "observ",
    label: "Observed count",
    min: 0,
    max: 20,
    value: 2,
  });
  const alphaInput = chooser(el, {
    id: "alpha",
    label: "Significance level",
    choices: [
      { value: "0.05", label: "5%" },
      { value: "0.01", label: "1%" },
      { value: "0.1", label: "10%" },
    ],
    value: "0.05",
  });
  const tailInput = chooser(el, {
    id: "tail",
    label: "Tail",
    choices: [
      { value: "left", label: "lower tail" },
      { value: "right", label: "upper tail" },
      { value: "two", label: "two tails" },
    ],
    value: "left",
  });

  function render() {
    const n = Number(nInput.value);
    const p = Number(pInput.value);
    const alpha = Number(alphaInput.value);
    const tail = tailInput.value;
    observInput.max = String(n);
    if (Number(observInput.value) > n) observInput.value = String(n);
    const observed = Number(observInput.value);

    const pmf = binomialPmf(n, p);
    const cdf = cumulative(pmf);
    const region = criticalRegion(cdf, alpha, tail);
    const pv = pValue(cdf, observed, tail);
    const reject = pv <= alpha + 1e-12;

    const plotLeft = 34;
    const plotBottom = 132;
    const plotTop = 30;
    const plotRight = 446;
    const maxHeight = plotBottom - plotTop;
    const peak = Math.max(...pmf, 0.0001);
    const slot = (plotRight - plotLeft) / (n + 1);
    const barWidth = Math.max(3, slot - 2);

    let bars = "";
    pmf.forEach((probability, k) => {
      const height = (probability / peak) * maxHeight;
      const x = plotLeft + slot * k + (slot - barWidth) / 2;
      const y = plotBottom - height;
      const flagged = inRegion(k, region);
      const chosen = k === observed;
      bars +=
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" ` +
        `height="${height.toFixed(1)}" class="${flagged ? "fig-warn" : "fig-grid"}"></rect>` +
        (chosen
          ? `<rect x="${(x - 1).toFixed(1)}" y="${(y - 1).toFixed(1)}" ` +
            `width="${(barWidth + 2).toFixed(1)}" height="${(height + 2).toFixed(1)}" ` +
            `class="fig-line"></rect>` +
            `<text x="${(x + barWidth / 2).toFixed(1)}" y="${(plotBottom + 12).toFixed(1)}" ` +
            `text-anchor="middle" class="fig-accent" font-size="13">seen</text>`
          : "")
    });

    const axis =
      `<line x1="${plotLeft}" y1="${plotBottom}" x2="${plotRight}" y2="${plotBottom}" ` +
      `class="fig-ink"></line>` +
      `<text x="${plotLeft}" y="${plotBottom + 26}" class="fig-ink" font-size="15">0</text>` +
      `<text x="${plotRight}" y="${plotBottom + 26}" text-anchor="end" ` +
      `class="fig-ink" font-size="15">${n}</text>`;

    const caption =
      `<text x="230" y="18" text-anchor="middle" class="fig-ink" font-size="16">` +
      `Binomial distribution, n = ${n}, p = ${p.toFixed(2)}</text>`;

    svg.innerHTML = caption + axis + bars;

    const regionText =
      region.low !== null && region.high !== null
        ? `The critical region is X at most ${region.low} or X at least ${region.high}.`
        : region.low !== null
          ? `The critical region is X at most ${region.low}.`
          : region.high !== null
            ? `The critical region is X at least ${region.high}.`
            : "No outcome is extreme enough for this level, so the test never rejects.";

    readout.textContent =
      `The p-value is ${pv.toFixed(4)}. ${regionText} ` +
      `The verdict at the ${(alpha * 100).toFixed(0)}% level is to ` +
      `${reject ? "reject the null hypothesis." : "retain the null hypothesis."}`;

    svg.setAttribute(
      "aria-label",
      `A bar chart of the binomial distribution with ${n} trials and ` +
        `probability ${p.toFixed(2)}. The observed count is ${observed}. ` +
        `${regionText} The p-value is ${pv.toFixed(4)}, so the test ` +
        `${reject ? "rejects" : "retains"} the null hypothesis at the ` +
        `${(alpha * 100).toFixed(0)}% level.`
    );
  }

  react([nInput, pInput, observInput, alphaInput, tailInput], render);
}
