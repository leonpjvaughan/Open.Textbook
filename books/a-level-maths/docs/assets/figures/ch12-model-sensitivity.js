// Guided investigation for 12.3: how the base rate changes the meaning of a
// positive result. The reader sets the prevalence and the false-positive rate,
// and reads the counts of true and false positives in 100000 people.
// Pure HTML and SVG, no framework and no colour of its own: the fig-* classes
// carry the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the two sliders, the live
// readout and the redraw — comes from `kit.js`. The ratio line is the figure's own
// second live region, so it stays here.
import { SIZE, label, panel, react, slider } from "./kit.js";

const DETECT = 0.95;
const PEOPLE = 100000;
const BAR_W = 300;
const BAR_H = 26;
const LEFT = 190;

function bar(y, count, className) {
  const width = Math.max(0, Math.round((count / PEOPLE) * BAR_W));
  return (
    `<rect x="${LEFT}" y="${y}" width="${width}" height="${BAR_H}" ` +
    `class="${className}" rx="3"></rect>` +
    label({
      x: LEFT + BAR_W + 8,
      y: y + BAR_H - 8,
      text: `${Math.round(count)}`,
      anchor: "start",
      size: SIZE.label,
      class: "text-ink",
    })
  );
}

export function mount(el) {
  const { root, svg, readout } = panel(el, {
    label:
      "A bar chart of true positives and false positives among one hundred thousand people",
    width: LEFT + BAR_W + 70,
    height: 76,
    max: 680,
  });

  const prevalence = slider(el, { show: false,
    id: "prevalence",
    label: "How common the condition is",
    min: 1,
    max: 200,
    step: 1,
    value: 5,
    format: (value) => `${(value / 10).toFixed(1)}%`,
  });
  const fpr = slider(el, { show: false,
    id: "fpr",
    label: "False-positive rate",
    min: 1,
    max: 200,
    step: 1,
    value: 20,
    format: (value) => `${(value / 10).toFixed(1)}%`,
  });

  const ratio = document.createElement("p");
  ratio.className = "ratio";
  ratio.setAttribute("aria-live", "polite");
  root.append(ratio);

  function render() {
    const p = Number(prevalence.value) / 1000;
    const f = Number(fpr.value) / 1000;

    const truePositives = PEOPLE * p * DETECT;
    const falsePositives = PEOPLE * (1 - p) * f;
    const positives = truePositives + falsePositives;
    const posterior = positives > 0 ? truePositives / positives : 0;

    svg.innerHTML =
      label({ x: 0, y: 18, text: "Have it, test positive", anchor: "start", size: SIZE.label, class: "text-ink" }) +
      bar(4, truePositives, "fig-good") +
      label({ x: 0, y: 60, text: "Healthy, test positive", anchor: "start", size: SIZE.label, class: "text-ink" }) +
      bar(46, falsePositives, "fig-warn");

    readout.textContent =
      `In ${PEOPLE.toLocaleString()} people, about ${Math.round(truePositives)} ` +
      `have the condition and test positive, and about ${Math.round(falsePositives)} ` +
      `do not have the condition but still test positive. ` +
      `So ${(posterior * 100).toFixed(1)}% of positive results are true.`;

    const perTrue = truePositives > 0 ? falsePositives / truePositives : 0;
    ratio.textContent =
      `For every 1 true positive there are about ${perTrue.toFixed(1)} false positives.`;

    svg.setAttribute(
      "aria-label",
      `A bar chart of one hundred thousand people. About ${Math.round(truePositives)} ` +
        `have the condition and test positive. About ${Math.round(falsePositives)} ` +
        `do not have the condition but test positive. ` +
        `So ${(posterior * 100).toFixed(1)} percent of positive results are true.`
    );
  }

  react([prevalence, fpr], render);
}
