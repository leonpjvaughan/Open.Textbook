// Tier-1 guided investigation: speed, reaction time and stopping distance.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// speed does to the thinking distance and to the braking distance, then to
// explain why one doubles and the other becomes four times as large. The reader
// sets the speed and the braking deceleration; the figure draws the thinking
// distance and the braking distance as two parts of one road.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A road bar split into a thinking distance and a braking distance, with the total stopping distance",
    width: 560,
    height: 170,
  });

  const speedInput = slider(el, { show: false,
    id: "speed",
    label: "Speed (m/s)",
    min: 5,
    max: 20,
    step: 1,
    value: 10,
  });
  const decelInput = slider(el, { show: false,
    id: "decel",
    label: "Braking deceleration (m/s²)",
    min: 4,
    max: 10,
    step: 1,
    value: 8,
  });

  const REACTION = 0.60; // seconds, fixed
  const BAR_LEFT = 60;
  const BAR_WIDTH = 440;
  const BAR_Y = 70;
  const BAR_HEIGHT = 26;
  const MAX_DISTANCE = 62; // metres the bar can show

  function update() {
    const speed = Number(speedInput.value);
    const decel = Number(decelInput.value);
    const thinking = speed * REACTION;
    const braking = (speed * speed) / (2 * decel);
    const total = thinking + braking;

    const scale = BAR_WIDTH / MAX_DISTANCE;
    const thinkingWidth = Math.min(thinking * scale, BAR_WIDTH);
    const brakingWidth = Math.min(braking * scale, BAR_WIDTH - thinkingWidth);

    svg.innerHTML =
      `<text x="14" y="${BAR_Y + 18}" font-size="18" class="fig-ink">road</text>` +
      `<rect x="${BAR_LEFT}" y="${BAR_Y}" width="${thinkingWidth.toFixed(1)}" height="${BAR_HEIGHT}" class="fig-warn"></rect>` +
      `<rect x="${(BAR_LEFT + thinkingWidth).toFixed(1)}" y="${BAR_Y}" width="${brakingWidth.toFixed(1)}" height="${BAR_HEIGHT}" class="fig-accent"></rect>` +
      `<line x1="${BAR_LEFT}" y1="${BAR_Y + BAR_HEIGHT}" x2="${BAR_LEFT + BAR_WIDTH}" y2="${BAR_Y + BAR_HEIGHT}" class="fig-ink" stroke-width="2"></line>` +
      `<text x="${BAR_LEFT}" y="${BAR_Y - 10}" font-size="16" class="fig-ink">thinking ${thinking.toFixed(1)} m</text>` +
      `<text x="${(BAR_LEFT + thinkingWidth + 6).toFixed(1)}" y="${BAR_Y - 10}" font-size="16" class="fig-ink">braking ${braking.toFixed(1)} m</text>` +
      `<text x="${BAR_LEFT}" y="${BAR_Y + BAR_HEIGHT + 20}" font-size="18" class="fig-ink">total stopping distance = ${total.toFixed(1)} m</text>`;

    readout.innerHTML =
      `Speed ${speed} m/s, reaction time ${REACTION.toFixed(2)} s, braking deceleration ` +
      `${decel} m/s&sup2;. The thinking distance is ${speed} &times; ${REACTION.toFixed(2)} = ` +
      `<strong>${thinking.toFixed(1)} m</strong>. The braking distance is ` +
      `${speed} &sup2; &divide; (2 &times; ${decel}) = <strong>${braking.toFixed(1)} m</strong>. ` +
      `Total <strong>${total.toFixed(1)} m</strong>. ` +
      `<em>Now double the speed: which part doubles, and which becomes four times as large?</em>`;
  }

  react([speedInput, decelInput], update);
}
