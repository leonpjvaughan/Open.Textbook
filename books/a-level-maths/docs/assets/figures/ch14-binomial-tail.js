// Guided investigation for 14.1: the p-value, the critical region and the tail
// of a binomial test. Pure HTML and SVG, an ES module, no framework and no
// colour of its own: the fig-* classes carry the theme. Runtime text is plain
// text, never TeX.

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
  el.innerHTML = `
    <div style="max-width:640px">
      <p>
        <label>Number of trials n
          <input class="n" type="range" min="10" max="40" step="5" value="20">
          <output class="n-out">20</output>
        </label>
      </p>
      <p>
        <label>Null probability p
          <input class="p" type="range" min="0.05" max="0.95" step="0.05" value="0.25">
          <output class="p-out">0.25</output>
        </label>
      </p>
      <p>
        <label>Observed count
          <input class="observ" type="range" min="0" max="20" step="1" value="2">
          <output class="observ-out">2</output>
        </label>
      </p>
      <p>
        <label>Significance level
          <select class="alpha">
            <option value="0.05" selected>5%</option>
            <option value="0.01">1%</option>
            <option value="0.1">10%</option>
          </select>
        </label>
        <label>Tail
          <select class="tail">
            <option value="left" selected>lower tail</option>
            <option value="right">upper tail</option>
            <option value="two">two tails</option>
          </select>
        </label>
      </p>
      <svg viewBox="0 0 460 190" width="100%" role="img"
           aria-label="A bar chart of a binomial distribution with the critical region shaded and the observed count marked"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const nInput = el.querySelector(".n");
  const pInput = el.querySelector(".p");
  const observInput = el.querySelector(".observ");
  const alphaInput = el.querySelector(".alpha");
  const tailInput = el.querySelector(".tail");
  const nOut = el.querySelector(".n-out");
  const pOut = el.querySelector(".p-out");
  const observOut = el.querySelector(".observ-out");

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
            `text-anchor="middle" class="fig-accent" font-size="10">seen</text>`
          : "")
    });

    const axis =
      `<line x1="${plotLeft}" y1="${plotBottom}" x2="${plotRight}" y2="${plotBottom}" ` +
      `class="fig-ink"></line>` +
      `<text x="${plotLeft}" y="${plotBottom + 26}" class="fig-ink" font-size="11">0</text>` +
      `<text x="${plotRight}" y="${plotBottom + 26}" text-anchor="end" ` +
      `class="fig-ink" font-size="11">${n}</text>`;

    const caption =
      `<text x="230" y="18" text-anchor="middle" class="fig-ink" font-size="12">` +
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

  [nInput, pInput, observInput].forEach((input) => {
    input.addEventListener("input", () => {
      nOut.value = nInput.value;
      nOut.textContent = nInput.value;
      pOut.value = Number(pInput.value).toFixed(2);
      pOut.textContent = Number(pInput.value).toFixed(2);
      observOut.value = observInput.value;
      observOut.textContent = observInput.value;
      render();
    });
  });
  alphaInput.addEventListener("change", render);
  tailInput.addEventListener("change", render);

  nOut.textContent = nInput.value;
  pOut.textContent = Number(pInput.value).toFixed(2);
  observOut.textContent = observInput.value;
  render();
}
