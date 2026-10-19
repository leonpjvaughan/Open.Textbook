// Tier-1 guided investigation: the force from a change in momentum.
//
// Guided, not a sandbox: the page asks the reader to predict what doubling the
// collision time does to the force, then to explain why a longer time gives a
// smaller force. The mass and the speed are fixed, so the change in momentum is
// fixed; only the time can change. This is the idea behind crumple zones, seat
// belts and air bags.
// Colours come from CSS classes so the figure adapts to dark mode.
//
// The scaffolding — the surface, its accessible name, the slider, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import {
  label,
  panel,
  quantity,
  react,
  slider,
  SIZE,
} from "./kit.js";

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label:
      "A car hitting a barrier, with a force arrow whose length shows the force on the car",
    width: 560,
    height: 170,
  });

  const timeInput = slider(el, { show: false,
    id: "time",
    label: "Collision time (s)",
    min: 0.05,
    max: 0.5,
    step: 0.05,
    value: 0.2,
  });
  const MASS = 1200; // kg
  const SPEED = 15; // m/s
  const MOMENTUM_CHANGE = MASS * SPEED;
  const FORCE_MAX = MOMENTUM_CHANGE / 0.05; // the largest force the slider can give
  const ARROW_MAX = 210; // pixels
  const GROUND = 120;
  const BARRIER = 430;

  function update() {
    const time = Number(timeInput.value);
    const force = MOMENTUM_CHANGE / time;

    const carWidth = 130;
    const carLeft = 90;
    const length = (force / FORCE_MAX) * ARROW_MAX;

    svg.innerHTML =
      `<rect x="${carLeft}" y="${GROUND - 42}" width="${carWidth}" height="34" class="fig-grid"></rect>` +
      `<circle cx="${carLeft + 26}" cy="${GROUND - 4}" r="9" class="fig-ink"></circle>` +
      `<circle cx="${carLeft + carWidth - 26}" cy="${GROUND - 4}" r="9" class="fig-ink"></circle>` +
      `<line x1="60" y1="${GROUND}" x2="500" y2="${GROUND}" class="fig-ink" stroke-width="3"></line>` +
      `<rect x="${BARRIER}" y="${GROUND - 74}" width="18" height="74" class="fig-ink"></rect>` +
      `<line x1="${carLeft + carWidth}" y1="${GROUND - 25}" x2="${carLeft + carWidth + length}" y2="${GROUND - 25}" class="fig-warn" stroke-width="4"></line>` +
      `<polygon points="${(carLeft + carWidth + length).toFixed(1)},${GROUND - 25} ${(carLeft + carWidth + length - 12).toFixed(1)},${GROUND - 31} ${(carLeft + carWidth + length - 12).toFixed(1)},${GROUND - 19}" class="fig-warn"></polygon>` +
      `${label({ x: carLeft, y: GROUND - 56, text: `mass ${MASS} kg at ${SPEED} m/s`, anchor: "start", size: SIZE.tick, class: "text-ink" })}` +
      `${label({ x: carLeft + carWidth + length + 6, y: GROUND - 20, text: `${Math.round(force)} N`, anchor: "start", size: SIZE.tick, class: "text-ink" })}`;

    // Two products are printed: the change in momentum, and the force that is that
    // momentum divided by the collision time. Both are declared, so a force that does
    // not follow from the time beside it is a finding and not a rounding choice.
    claim([
      {
        label: "change in momentum, mass times the change in speed",
        expression: "mass * speed",
        values: { mass: MASS, speed: SPEED },
        answer: MOMENTUM_CHANGE,
        shown: String(Math.round(MOMENTUM_CHANGE)),
      },
      {
        label: "force, the momentum change over the collision time",
        expression: "momentum / time",
        values: { momentum: MOMENTUM_CHANGE, time },
        answer: force,
        shown: String(Math.round(force)),
      },
    ]);
    readout.innerHTML =
      `The change in momentum is fixed: ${MASS} kg &times; ${SPEED} m/s = ` +
      `<strong>${Math.round(MOMENTUM_CHANGE)} kg m/s</strong>. ` +
      `Over a collision time of ${quantity(time, "s", 2)}, the force is ` +
      `${Math.round(MOMENTUM_CHANGE)} &divide; ${time.toFixed(2)} = ` +
      `<strong>${Math.round(force)} N</strong>. ` +
      `<em>Double the collision time. What happens to the force? Why can the momentum change stay the same?</em>`;
  }

  react(timeInput, update);
}
