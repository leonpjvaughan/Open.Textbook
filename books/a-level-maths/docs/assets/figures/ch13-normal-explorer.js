// Guided investigation for 13.3: the area under a Normal curve.
// The reader sets the mean, the standard deviation and a value x, and sees the
// shaded area P(X < x). The area is computed by the trapezium rule on the
// density, so the readout matches the curve drawn. Pure HTML and SVG, no
// colour of its own: the fig-* classes carry the theme. Runtime text is plain
// text, never TeX.

const X_MIN = 0;
const X_MAX = 100;
const STEPS = 400;

function normalPdf(x, mu, sigma) {
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

function normalCdf(x, mu, sigma) {
  const lo = mu - 10 * sigma;
  const hi = x;
  if (hi <= lo) {
    return 0;
  }
  const width = (hi - lo) / STEPS;
  let area = 0;
  for (let i = 0; i < STEPS; i += 1) {
    const a = lo + i * width;
    const b = a + width;
    area += ((normalPdf(a, mu, sigma) + normalPdf(b, mu, sigma)) / 2) * width;
  }
  return Math.min(1, Math.max(0, area));
}

export function mount(el) {
  el.innerHTML = `
    <div style="max-width:620px">
      <label>Mean
        <input class="mu" type="range" min="20" max="80" step="1" value="50">
        <output class="mu-out">50</output>
      </label>
      <label>Standard deviation
        <input class="sigma" type="range" min="2" max="20" step="1" value="10">
        <output class="sigma-out">10</output>
      </label>
      <label>Value x
        <input class="x" type="range" min="0" max="100" step="1" value="60">
        <output class="x-out">60</output>
      </label>
      <svg viewBox="0 0 460 200" width="100%" role="img"
           aria-label="A Normal curve with the area to the left of x shaded"></svg>
      <p class="readout" aria-live="polite"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const muInput = el.querySelector(".mu");
  const sigmaInput = el.querySelector(".sigma");
  const xInput = el.querySelector(".x");
  const muOut = el.querySelector(".mu-out");
  const sigmaOut = el.querySelector(".sigma-out");
  const xOut = el.querySelector(".x-out");

  const left = 30;
  const plotW = 410;
  const base = 165;
  const plotH = 130;

  function toX(value) {
    return left + ((value - X_MIN) / (X_MAX - X_MIN)) * plotW;
  }

  function render() {
    const mu = Number(muInput.value);
    const sigma = Number(sigmaInput.value);
    const x = Number(xInput.value);
    const peak = normalPdf(mu, mu, sigma);
    const toY = (value) => base - (value / peak) * plotH;

    const points = [];
    for (let i = 0; i <= 200; i += 1) {
      const value = X_MIN + ((X_MAX - X_MIN) * i) / 200;
      points.push(`${toX(value).toFixed(1)},${toY(normalPdf(value, mu, sigma)).toFixed(1)}`);
    }
    const curve = points.join(" ");

    let shadePoints = [];
    for (let i = 0; i <= 200; i += 1) {
      const value = X_MIN + ((X_MAX - X_MIN) * i) / 200;
      if (value > x) {
        break;
      }
      shadePoints.push(`${toX(value).toFixed(1)},${toY(normalPdf(value, mu, sigma)).toFixed(1)}`);
    }
    const shade =
      shadePoints.length > 0
        ? `<polygon points="${toX(X_MIN)},${base} ${shadePoints.join(" ")} ${toX(x).toFixed(1)},${base}" class="fig-accent" fill-opacity="0.35"></polygon>`
        : "";

    const axis =
      `<line x1="${left}" y1="${base}" x2="${left + plotW}" y2="${base}" class="fig-ink"></line>`;

    const markers = [
      { value: mu - sigma, label: "mean minus sd" },
      { value: mu, label: "mean" },
      { value: mu + sigma, label: "mean plus sd" },
    ]
      .map((marker) => {
        const px = toX(marker.value).toFixed(1);
        return (
          `<line x1="${px}" y1="${base}" x2="${px}" y2="${base + 6}" class="fig-ink"></line>` +
          `<text x="${px}" y="${base + 18}" text-anchor="middle" class="fig-ink" font-size="13">${marker.label}</text>`
        );
      })
      .join("");

    svg.innerHTML = shade + `<polyline points="${curve}" fill="none" class="fig-ink"></polyline>` + axis + markers;

    const probability = normalCdf(x, mu, sigma);
    const z = (x - mu) / sigma;

    muOut.value = mu;
    muOut.textContent = mu;
    sigmaOut.value = sigma;
    sigmaOut.textContent = sigma;
    xOut.value = x;
    xOut.textContent = x;
    readout.textContent =
      `Mean ${mu}, standard deviation ${sigma}. The shaded area P(X < ${x}) is ` +
      `${probability.toFixed(4)}, with z = ${z.toFixed(2)}. The curve is ` +
      `steepest at the mean plus or minus one standard deviation.`;

    svg.setAttribute(
      "aria-label",
      `A Normal curve with mean ${mu} and standard deviation ${sigma}. ` +
        `The area to the left of ${x} is ${probability.toFixed(4)}.`
    );
  }

  muInput.addEventListener("input", render);
  sigmaInput.addEventListener("input", render);
  xInput.addEventListener("input", render);

  render();
}
