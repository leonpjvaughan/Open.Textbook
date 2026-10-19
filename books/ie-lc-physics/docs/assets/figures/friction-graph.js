// Tier-1 guided investigation: friction against the push on a block.
//
// The page asks the reader to predict what the graph does at the moment the block
// starts to move, then to step the push up and check. So the figure draws the three
// parts of the graph — the static rise, the drop at the limit, and the flat kinetic
// part — and puts a marker on the branch that applies to the current push.
//
// Nothing here carries a colour. The two branches use different classes and different
// line styles, and the readout names each force, so the figure works without colour.
import {
  fmt,
  label,
  panel,
  quantity,
  react,
  scale,
  slider,
  SIZE,
} from "./kit.js";

const LIMITING = 80; // N, the largest static friction before the block moves
const KINETIC = 60; // N, the sliding friction once it does

const frictionAt = (push) => (push <= LIMITING ? push : KINETIC);

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A graph of friction against the push on a block, showing the moment it starts to slide",
    width: 480,
    height: 320,
  });

  const pushInput = slider(el, {
    show: false,
    id: "push",
    label: "Push on the block",
    min: 0,
    max: 120,
    step: 5,
    value: 0,
    unit: "N",
  });

  const x0 = 64;
  const x1 = 448;
  const y0 = 268;
  const y1 = 44;

  const sx = scale({ domain: [0, 120], range: [x0, x1] });
  const sy = scale({ domain: [0, 100], range: [y0, y1] });

  // The static branch: friction matches the push, so it rises with gradient 1.
  const staticBranch = `<line x1="${sx(0)}" y1="${sy(0)}" x2="${sx(LIMITING)}" y2="${sy(LIMITING)}" class="fig-accent" stroke-width="2.5"></line>`;
  // The drop at the limit: the block starts to slide and the friction falls.
  const drop = `<line x1="${sx(LIMITING)}" y1="${sy(LIMITING)}" x2="${sx(LIMITING)}" y2="${sy(KINETIC)}" class="fig-ink" stroke-width="2" stroke-dasharray="4 4"></line>`;
  // The kinetic branch: once sliding, the friction is roughly constant.
  const kineticBranch = `<line x1="${sx(LIMITING)}" y1="${sy(KINETIC)}" x2="${sx(120)}" y2="${sy(KINETIC)}" class="fig-warn" stroke-width="2.5"></line>`;

  const peak =
    `<circle cx="${sx(LIMITING)}" cy="${sy(LIMITING)}" r="4.5" class="fig-good"></circle>` +
    label({ x: sx(LIMITING) - 10, y: sy(LIMITING) - 10, text: "starts to move", anchor: "end", size: SIZE.tick });

  const axes =
    `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" class="fig-grid" stroke-width="1.5"></line>` +
    `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" class="fig-grid" stroke-width="1.5"></line>` +
    label({ x: (x0 + x1) / 2, y: y0 + 34, text: "push / N", size: SIZE.tick }) +
    label({ x: x1, y: y1 - 6, text: "friction / N", anchor: "end", size: SIZE.tick }) +
    label({ x: sx(0), y: y0 + 18, text: "0", size: SIZE.tick }) +
    label({ x: sx(60), y: y0 + 18, text: "60", size: SIZE.tick }) +
    label({ x: sx(120), y: y0 + 18, text: "120", anchor: "end", size: SIZE.tick }) +
    label({ x: x0 - 8, y: sy(100), text: "100", anchor: "end", size: SIZE.tick }) +
    label({ x: x0 - 8, y: sy(50) + 5, text: "50", anchor: "end", size: SIZE.tick });

  function draw() {
    const push = Number(pushInput.value);
    const friction = frictionAt(push);
    const marker = `<circle cx="${sx(push).toFixed(1)}" cy="${sy(friction).toFixed(1)}" r="6" class="fig-warn"></circle>`;
    svg.innerHTML = `${axes}${staticBranch}${drop}${kineticBranch}${peak}${marker}`;

    if (push <= LIMITING) {
      readout.textContent =
        `Push = ${quantity(push, "N")}. The block is at rest, so friction = ${quantity(friction, "N")} and the resultant force is 0 N. ` +
        "Static friction matches the push, which is why the first part of the graph is a straight line.";
    } else {
      readout.textContent =
        `Push = ${quantity(push, "N")}. The block is sliding, so friction = ${quantity(KINETIC, "N")} and the resultant force is ` +
        `${quantity(push - KINETIC, "N")} forwards. Kinetic friction is smaller than the largest static friction.`;
    }
  }

  react([pushInput], draw);
}
