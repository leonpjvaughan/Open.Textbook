// Guided table-to-graph investigation for y = mx + c.
//
// The scaffolding — the surface, its accessible name, the two sliders, the live
// readout, the redraw — comes from `kit.js`, and a signed term from `signed()`,
// so a negative intercept reads as a signed number, never a bracketed addend.
import { SIZE, label, panel, react, signed, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "Coordinate grid with a straight line and three plotted points",
    width: 360,
    height: 250,
    max: 520,
  });

  const gradient = slider(el, { show: false,
    id: "gradient",
    label: "Gradient m",
    min: -3,
    max: 3,
    step: 1,
    value: 2,
  });
  const intercept = slider(el, { show: false,
    id: "intercept",
    label: "Intercept c",
    min: -3,
    max: 3,
    step: 1,
    value: 1,
  });

  function update() {
    const m = Number(gradient.value);
    const c = Number(intercept.value);
    // The plotted points reach y = 3 x 2 + 3 = 9 and y = -3 x 2 - 3 = -9, so
    // the vertical scale is set for that range: every marker stays in the frame.
    const px = (x) => 180 + x * 28;
    const py = (y) => 125 - y * 12;
    const dots = [-2, 0, 2].map((x) => {
      const y = m * x + c;
      return `<circle cx="${px(x)}" cy="${py(y)}" r="5" class="fig-good"></circle>`;
    }).join("");
    svg.innerHTML = `<line x1="24" y1="125" x2="336" y2="125" class="fig-ink"></line>
      <line x1="180" y1="20" x2="180" y2="230" class="fig-ink"></line>
      <line x1="36" y1="${py(m * -5 + c)}" x2="324" y2="${py(m * 5 + c)}" class="fig-accent"></line>
      ${dots}<circle cx="${px(0)}" cy="${py(c)}" r="8" fill="none" class="fig-warn"></circle>
      ${label({ x: 330, y: 145, text: "x", anchor: "start", class: "text-accent" })}${label({ x: 190, y: 24, text: "y", anchor: "start", class: "text-accent" })}
      ${label({ x: 12, y: 245, text: "Points at x = -2, 0, 2", anchor: "start", class: "text-ink" })}`;
    readout.textContent = `y = ${m}x ${signed(c)}; the highlighted intercept is ${c}.`;
  }

  react([gradient, intercept], update);
}
