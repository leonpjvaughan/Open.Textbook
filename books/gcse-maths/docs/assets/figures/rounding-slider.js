// Tier-1 guided investigation: rounding to decimal places and significant
// figures. Predict → Test → Explain: the reader predicts the rounded value and
// then checks which digit was used to decide.
//
// The scaffolding — the frame, the prompt, the controls, the live readout, the
// redraw — comes from `kit.js`. The number box is a control the kit has no helper
// for, so it is appended to the kit's controls column; the rule is a chooser and
// the amount a slider. The module draws nothing, so it has no drawing to name.
import { panel, slider, chooser, react } from "./kit.js";

export function mount(el) {
  const { readout, controls } = panel(el, {
    drawing: false,
    prompt: "Change the number, the rule and the amount, then read the rounded value.",
    max: 560,
  });

  const numberLabel = document.createElement("label");
  numberLabel.className = "fig-control";
  numberLabel.textContent = "Number ";
  const num = document.createElement("input");
  num.type = "number";
  num.step = "0.001";
  num.value = "3.14159";
  num.className = "value";
  num.style.width = "9rem";
  numberLabel.append(num);
  controls.append(numberLabel);

  const rule = chooser(el, {
    id: "rule",
    label: "Rule",
    choices: [
      { value: "dp", label: "decimal places" },
      { value: "sf", label: "significant figures" },
    ],
    value: "dp",
  });

  const places = slider(el, { show: true,
    id: "places",
    label: "Amount",
    min: 1,
    max: 4,
    value: 2,
  });

  function roundToSf(x, sf) {
    if (x === 0) return 0;
    const d = Math.ceil(Math.log10(Math.abs(x)));
    const power = sf - d;
    const factor = Math.pow(10, power);
    return Math.round(x * factor) / factor;
  }

  react([num, rule, places], () => {
    const x = Number(num.value);
    const n = Number(places.value);
    if (!Number.isFinite(x)) {
      readout.textContent = "Enter a number.";
      return;
    }
    const result = rule.value === "dp" ? Number(x.toFixed(n)) : roundToSf(x, n);
    const unit =
      rule.value === "dp" ? `${n} decimal place(s)` : `${n} significant figure(s)`;
    readout.innerHTML =
      `${x} rounded to ${unit} is <strong>${result}</strong>. ` +
      `<em>Which digit did you look at to decide whether to round up?</em>`;
  });
}
