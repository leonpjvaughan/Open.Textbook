// Tier-1 guided investigation: speed, reaction time and stopping distance.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// speed does to the thinking distance and to the braking distance, then to
// explain why one doubles and the other becomes four times as large. The reader
// sets the speed and the braking deceleration; the figure draws the thinking
// distance and the braking distance as two parts of one road.
// Colours come from CSS classes so the figure adapts to dark mode.
export function mount(el) {
  el.innerHTML = `
    <div class="fig-stopping-distance" style="font:14px system-ui;max-width:560px">
      <svg viewBox="0 0 560 170" width="100%" role="img"
           aria-label="A road bar split into a thinking distance and a braking distance, with the total stopping distance"></svg>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem .9rem">
        <label>Speed (m/s) <input class="speed" type="range" min="5" max="20" step="1" value="10"></label>
        <label>Braking deceleration (m/s&sup2;) <input class="decel" type="range" min="4" max="10" step="1" value="8"></label>
      </div>
      <p class="readout" aria-live="polite" style="margin:.6rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const REACTION = 0.60; // seconds, fixed
  const BAR_LEFT = 60;
  const BAR_WIDTH = 440;
  const BAR_Y = 70;
  const BAR_HEIGHT = 26;
  const MAX_DISTANCE = 62; // metres the bar can show

  function update() {
    const speed = Number(el.querySelector(".speed").value);
    const decel = Number(el.querySelector(".decel").value);
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

  el.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", update),
  );
  update();
}
