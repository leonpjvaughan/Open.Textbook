// Tier-1 guided investigation: how a count rate falls with each half-life.
//
// The page asks the reader to predict the fraction that remains after three
// half-lives, then to test it by changing the half-life and the starting count
// rate, then to explain why the curve never reaches zero. The smooth curve is the
// expected average: a real count is random, and the page makes that point.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentence, which are the parts that differ from every other figure.
import { SIZE, label, panel, react, slider } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A decay curve of count rate against time, with a marker at each half-life",
    width: 540,
    height: 250,
  });

  const halfLifeInput = slider(el, { show: false,
    id: "halflife",
    label: "Half-life (hours)",
    min: 1,
    max: 12,
    step: 1,
    value: 6,
    show: false,
  });
  const rateInput = slider(el, { show: false,
    id: "rate",
    label: "Starting count rate (per second)",
    min: 200,
    max: 1000,
    step: 100,
    value: 800,
    show: false,
  });

  const LEFT = 62;
  const RIGHT = 522;
  const TOP = 22;
  const BOTTOM = 196;

  function update() {
    const halfLife = Number(halfLifeInput.value);
    const start = Number(rateInput.value);
    const totalTime = 6 * halfLife;

    const x = (time) => LEFT + (time / totalTime) * (RIGHT - LEFT);
    const y = (rate) => BOTTOM - (rate / start) * (BOTTOM - TOP);

    let curve = "";
    for (let step = 0; step <= 120; step += 1) {
      const time = (step / 120) * totalTime;
      const rate = start * 2 ** (-time / halfLife);
      curve += `${step === 0 ? "M" : "L"}${x(time).toFixed(1)} ${y(rate).toFixed(1)} `;
    }

    const axes =
      `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" class="fig-ink"></line>` +
      `${label({ x: LEFT - 6, y: TOP + 4, text: `${start}`, anchor: "end", size: SIZE.tick, class: "text-ink" })}` +
      `${label({ x: LEFT - 6, y: BOTTOM + 4, text: `0`, anchor: "end", size: SIZE.tick, class: "text-ink" })}` +
      `${label({ x: RIGHT, y: BOTTOM + 18, text: `time (hours)`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`;

    let guides = "";
    let ticks = "";
    const readings = [];
    for (let n = 0; n <= 4; n += 1) {
      const time = n * halfLife;
      const rate = start / 2 ** n;
      ticks +=
        `<line x1="${x(time).toFixed(1)}" y1="${BOTTOM}" x2="${x(time).toFixed(1)}" y2="${BOTTOM + 5}" class="fig-ink"></line>` +
        `${label({ x: x(time).toFixed(1), y: BOTTOM + 17, text: `${time}`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}`;
      if (n > 0) {
        guides +=
          `<line x1="${LEFT}" y1="${y(rate).toFixed(1)}" x2="${x(time).toFixed(1)}" y2="${y(rate).toFixed(1)}" class="fig-grid" stroke-dasharray="4 4"></line>` +
          `<line x1="${x(time).toFixed(1)}" y1="${y(rate).toFixed(1)}" x2="${x(time).toFixed(1)}" y2="${BOTTOM}" class="fig-grid" stroke-dasharray="4 4"></line>` +
          `${label({ x: LEFT + 4, y: (y(rate) - 4).toFixed(1), text: `${rate}`, anchor: "start", size: SIZE.tick, class: "text-ink" })}`;
        readings.push(`${n} half-life${n === 1 ? "" : "s"}: ${rate} per second`);
      }
      const cx = x(time).toFixed(1);
      const cy = y(rate).toFixed(1);
      guides += `<circle cx="${cx}" cy="${cy}" r="5" class="fig-accent"></circle>`;
    }

    svg.innerHTML =
      axes +
      ticks +
      guides +
      `<path d="${curve}" class="fig-accent" style="fill:none" stroke-width="3"></path>`;

    readout.innerHTML =
      `With a half-life of <strong>${halfLife} hours</strong> and a starting count rate ` +
      `of <strong>${start} per second</strong>, the count rate falls like this. ` +
      readings.join(". ") +
      `. Each value is half the one before. ` +
      `<em>A real count is random, so a real measurement only follows this curve on average. ` +
      `Why does the curve get close to zero but never reach it?</em>`;
  }

  react([halfLifeInput, rateInput], update);
}
