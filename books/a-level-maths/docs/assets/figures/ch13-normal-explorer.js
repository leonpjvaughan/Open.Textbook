// Guided investigation for 13.3: the area under a Normal curve.
// The reader sets the mean, the standard deviation and a value x, and sees the
// shaded area P(X < x). The area is computed by the trapezium rule on the
// density, so the readout matches the curve drawn. Pure HTML and SVG, no
// colour of its own: the fig-* classes carry the theme. Runtime text is plain
// text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

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
  const { svg, readout } = panel(el, {
    label: "A Normal curve with the area to the left of x shaded",
    width: 460,
    height: 200,
    max: 620,
  });

  const muInput = slider(el, { show: false,
    id: "mu",
    label: "Mean",
    min: 20,
    max: 80,
    value: 50,
  });
  const sigmaInput = slider(el, { show: false,
    id: "sigma",
    label: "Standard deviation",
    min: 2,
    max: 20,
    value: 10,
  });
  const xInput = slider(el, { show: false,
    id: "x",
    label: "Value x",
    min: 0,
    max: 100,
    value: 60,
  });

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
          label({
            x: px,
            y: base + 18,
            text: marker.label,
            anchor: "middle",
            size: SIZE.tick,
            class: "text-ink",
          })
        );
      })
      .join("");

    svg.innerHTML = shade + `<polyline points="${curve}" style="fill:none" class="fig-ink"></polyline>` + axis + markers;

    const probability = normalCdf(x, mu, sigma);
    const z = (x - mu) / sigma;

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

  react([muInput, sigmaInput, xInput], render);
}
