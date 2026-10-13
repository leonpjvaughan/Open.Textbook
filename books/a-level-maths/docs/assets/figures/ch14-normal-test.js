// Guided investigation for 14.3: a hypothesis test for a mean when the standard
// deviation is known. The reader moves the sample mean, the standard deviation
// and the sample size and watches the test statistic and the tail area. Pure
// HTML and SVG, an ES module, no framework and no colour of its own: the fig-*
// classes carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the drop-downs,
// the live readout, the redraw — comes from `kit.js`. What is left here is the
// drawing and the sentence, which are the parts that differ from every other
// figure.
import { panel, slider, chooser, react } from "./kit.js";

const NULL_MEAN = 500;

// Critical values of the standard Normal for the three levels the reader can
// choose. "one" is the one-tailed boundary, "two" the two-tailed boundary.
const CRITICAL_Z = {
  0.1: { one: 1.281552, two: 1.644854 },
  0.05: { one: 1.644854, two: 1.959964 },
  0.01: { one: 2.326348, two: 2.575829 },
};

function erf(x) {
  // Abramowitz and Stegun 7.1.26, accurate to about 1.5 parts in 10^7.
  const sign = x < 0 ? -1 : 1;
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const poly =
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t +
      0.254829592) *
    t;
  return sign * (1 - poly * Math.exp(-x * x));
}

function normalCdf(z) {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

function pValueFromZ(z, tail) {
  const left = normalCdf(z);
  const right = 1 - left;
  if (tail === "left") return left;
  if (tail === "right") return right;
  return Math.min(1, 2 * Math.min(left, right));
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A Normal curve for the sample mean with the critical region for the chosen significance level shaded",
    width: 460,
    height: 190,
    max: 640,
  });

  const xbarInput = slider(el, {
    id: "xbar",
    label: "Sample mean",
    min: 494,
    max: 506,
    step: 0.5,
    value: 497,
    format: (value) => value.toFixed(1),
  });
  const sigmaInput = slider(el, {
    id: "sigma",
    label: "Known standard deviation",
    min: 2,
    max: 8,
    step: 0.5,
    value: 4,
    format: (value) => value.toFixed(1),
  });
  const nInput = slider(el, {
    id: "n",
    label: "Sample size n",
    min: 4,
    max: 64,
    step: 4,
    value: 16,
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
    const xbar = Number(xbarInput.value);
    const sigma = Number(sigmaInput.value);
    const n = Number(nInput.value);
    const alpha = Number(alphaInput.value);
    const tail = tailInput.value;

    const standardError = sigma / Math.sqrt(n);
    const z = (xbar - NULL_MEAN) / standardError;
    const pv = pValueFromZ(z, tail);
    const reject = pv <= alpha + 1e-9;

    const plotLeft = 34;
    const plotRight = 446;
    const plotBottom = 140;
    const plotTop = 24;
    const maxHeight = plotBottom - plotTop;
    // The axis must show the observed mean as well as the curve, or the "seen"
    // marker leaves the frame whenever the sample mean is more than four standard
    // errors from the null mean. Four standard errors is the floor, so the two
    // critical regions stay in view.
    const span = Math.max(4 * standardError, Math.abs(xbar - NULL_MEAN) * 1.15);
    const low = NULL_MEAN - span;
    const high = NULL_MEAN + span;
    const toPx = (value) => plotLeft + ((value - low) / (high - low)) * (plotRight - plotLeft);
    const centre = toPx(NULL_MEAN);

    const peak = 1 / (standardError * Math.sqrt(2 * Math.PI));

    let curve = "";
    let fill = "";
    const steps = 90;
    const heightAt = (value) =>
      (1 / (standardError * Math.sqrt(2 * Math.PI))) *
      Math.exp(-((value - NULL_MEAN) ** 2) / (2 * standardError ** 2));

    const boundaries = [];
    const critical = CRITICAL_Z[alpha][tail === "two" ? "two" : "one"];
    if (tail === "left") boundaries.push(NULL_MEAN - critical * standardError);
    if (tail === "right") boundaries.push(NULL_MEAN + critical * standardError);
    if (tail === "two") {
      boundaries.push(NULL_MEAN - critical * standardError);
      boundaries.push(NULL_MEAN + critical * standardError);
    }

    function shaded(from, to) {
      const left = toPx(from);
      const right = toPx(to);
      return (
        `<rect x="${left.toFixed(1)}" y="${plotTop}" ` +
        `width="${Math.max(0, right - left).toFixed(1)}" ` +
        `height="${maxHeight}" class="fig-warn" opacity="0.35"></rect>`
      );
    }

    if (tail === "left") {
      fill += shaded(low, boundaries[0]);
    } else if (tail === "right") {
      fill += shaded(boundaries[0], high);
    } else {
      fill += shaded(low, boundaries[0]);
      fill += shaded(boundaries[1], high);
    }

    for (let i = 0; i <= steps; i += 1) {
      const value = low + ((high - low) * i) / steps;
      const x = toPx(value);
      const y = plotBottom - (heightAt(value) / peak) * maxHeight;
      curve += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
    }

    const axis =
      `<line x1="${plotLeft}" y1="${plotBottom}" x2="${plotRight}" y2="${plotBottom}" ` +
      `class="fig-ink"></line>` +
      `<line x1="${centre.toFixed(1)}" y1="${plotTop}" x2="${centre.toFixed(1)}" ` +
      `y2="${plotBottom}" class="fig-grid" stroke-dasharray="4 3"></line>` +
      `<text x="${centre.toFixed(1)}" y="${(plotBottom + 26).toFixed(1)}" ` +
      `text-anchor="middle" class="fig-ink" font-size="13">null mean 500</text>`;

    const marker =
      `<line x1="${toPx(xbar).toFixed(1)}" y1="${plotTop}" ` +
      `x2="${toPx(xbar).toFixed(1)}" y2="${plotBottom}" class="fig-line"></line>` +
      `<text x="${toPx(xbar).toFixed(1)}" y="${(plotTop - 8).toFixed(1)}" ` +
      `text-anchor="middle" class="fig-accent" font-size="13">seen</text>`;

    const caption =
      `<text x="230" y="14" text-anchor="middle" class="fig-ink" font-size="15">` +
      `Sampling distribution of the sample mean</text>`;

    svg.innerHTML =
      caption +
      fill +
      `<path d="${curve}" fill="none" class="fig-ink" stroke-width="1.5"></path>` +
      axis +
      marker;

    readout.textContent =
      `The standard error is ${standardError.toFixed(3)}. ` +
      `The test statistic is z = ${z.toFixed(2)}. ` +
      `The p-value is ${pv.toFixed(4)}. ` +
      `At the ${(alpha * 100).toFixed(0)}% level the test ` +
      `${reject ? "rejects" : "retains"} the null hypothesis that the mean is 500.`;

    const level = (alpha * 100).toFixed(0);
    const tailPhrase =
      tail === "left" ? "the lower tail" : tail === "right" ? "the upper tail" : "both tails";
    svg.setAttribute(
      "aria-label",
      `A Normal curve for the sample mean, centred on the null mean of 500. ` +
        `The observed sample mean is ${xbar.toFixed(1)}, which standardises to ` +
        `z equals ${z.toFixed(2)}. The shaded region is the critical region for a ` +
        `${level}% test, in ${tailPhrase}, so its total probability is ${alpha}. ` +
        `The observed mean lies ${reject ? "inside" : "outside"} the critical region, ` +
        `so the test ${reject ? "rejects" : "retains"} the null hypothesis.`
    );
  }

  react([xbarInput, sigmaInput, nInput, alphaInput, tailInput], render);
}
