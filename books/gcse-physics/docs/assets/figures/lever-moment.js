// Tier-1 guided investigation: moments and a balanced lever.
//
// Guided, not a sandbox: the page asks the reader to predict the effort that
// balances a load before moving the sliders, then to explain why the effort must
// grow as it moves closer to the pivot. The reader sets the load and the two
// distances; the figure works out the effort that balances the lever.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentence, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A lever turning about a pivot, with a load on the left and the balancing effort on the right",
    width: 560,
    height: 180,
  });

  const loadInput = slider(el, { show: false,
    id: "load",
    label: "Load (N)",
    min: 100,
    max: 600,
    step: 50,
    value: 300,
    show: false,
  });
  const loadDistanceInput = slider(el, { show: false,
    id: "load-d",
    label: "Load distance (m)",
    min: 0.2,
    max: 1.0,
    step: 0.05,
    value: 1.0,
    show: false,
  });
  const effortDistanceInput = slider(el, { show: false,
    id: "effort-d",
    label: "Effort distance (m)",
    min: 0.2,
    max: 1.5,
    step: 0.05,
    value: 1.0,
    show: false,
  });

  const PIVOT = 280;
  const BEAM = 60;
  const SCALE = 130; // pixels per metre, so 1.5 m reaches 195 px

  function forceArrow(x, label, cls) {
    return (
      `<line x1="${x.toFixed(1)}" y1="${BEAM}" x2="${x.toFixed(1)}" y2="${BEAM + 70}" class="${cls}" stroke-width="3"></line>` +
      `<polygon points="${x.toFixed(1)},${BEAM + 80} ${(x - 6).toFixed(1)},${BEAM + 68} ${(x + 6).toFixed(1)},${BEAM + 68}" class="${cls}"></polygon>` +
      `<text x="${x.toFixed(1)}" y="${BEAM + 96}" font-size="18" text-anchor="middle" class="fig-ink">${label}</text>`
    );
  }

  function update() {
    const load = Number(loadInput.value);
    const loadDistance = Number(loadDistanceInput.value);
    const effortDistance = Number(effortDistanceInput.value);
    const loadMoment = load * loadDistance;
    const effort = loadMoment / effortDistance;

    const loadX = PIVOT - loadDistance * SCALE;
    const effortX = PIVOT + effortDistance * SCALE;

    svg.innerHTML =
      `<line x1="70" y1="${BEAM}" x2="490" y2="${BEAM}" class="fig-ink" stroke-width="4"></line>` +
      `<polygon points="${PIVOT},${BEAM + 6} ${PIVOT - 14},${BEAM + 30} ${PIVOT + 14},${BEAM + 30}" class="fig-grid"></polygon>` +
      `<line x1="${loadX.toFixed(1)}" y1="${BEAM - 24}" x2="${PIVOT}" y2="${BEAM - 24}" class="fig-grid" stroke-dasharray="3 3"></line>` +
      `<line x1="${PIVOT}" y1="${BEAM - 44}" x2="${effortX.toFixed(1)}" y2="${BEAM - 44}" class="fig-grid" stroke-dasharray="3 3"></line>` +
      `<text x="${((loadX + PIVOT) / 2).toFixed(1)}" y="${BEAM - 28}" font-size="16" text-anchor="middle" class="fig-ink">${loadDistance.toFixed(2)} m</text>` +
      `<text x="${((PIVOT + effortX) / 2).toFixed(1)}" y="${BEAM - 48}" font-size="16" text-anchor="middle" class="fig-ink">${effortDistance.toFixed(2)} m</text>` +
      forceArrow(loadX, `${load} N`, "fig-warn") +
      forceArrow(effortX, `${Math.round(effort)} N`, "fig-accent");

    const multiplied = effort < load;
    readout.innerHTML =
      `Load moment = ${load} N &times; ${loadDistance.toFixed(2)} m = ` +
      `<strong>${loadMoment.toFixed(1)} N m</strong>. ` +
      `To balance it, the effort moment must equal this, so effort = ` +
      `${loadMoment.toFixed(1)} N m &divide; ${effortDistance.toFixed(2)} m = ` +
      `<strong>${Math.round(effort)} N</strong>. ` +
      (multiplied
        ? `The effort is smaller than the load, so this lever multiplies the force. `
        : `The effort is larger than the load at this setting. `) +
      `<em>Move the effort closer to the pivot. Why does the effort needed grow?</em>`;
  }

  react([loadInput, loadDistanceInput, effortDistanceInput], update);
}
