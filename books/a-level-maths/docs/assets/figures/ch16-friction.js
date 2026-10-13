// Guided investigation for the friction model F <= mu R. The reader sets the
// horizontal push and the coefficient of friction and sees whether the block
// stays at rest or slides, and what the friction force is in each case. Plain
// HTML and SVG, no framework and no colour of its own: the fig-* classes carry
// the theme. Runtime text is plain text, never TeX.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout, the redraw — comes from `kit.js`. What is left here is the drawing and
// the sentence, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

const G = 9.8;

function arrow(x1, y1, x2, y2, cls) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const spread = 0.42;
  const bx = x2 - size * Math.cos(angle);
  const by = y2 - size * Math.sin(angle);
  const leftX = bx - size * Math.sin(angle) * spread * 2;
  const leftY = by + size * Math.cos(angle) * spread * 2;
  const rightX = bx + size * Math.sin(angle) * spread * 2;
  const rightY = by - size * Math.cos(angle) * spread * 2;
  return (
    `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" ` +
    `x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="${cls}" ` +
    `fill="none" stroke-width="2"></line>` +
    `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ` +
    `${leftX.toFixed(1)},${leftY.toFixed(1)} ${rightX.toFixed(1)},${rightY.toFixed(1)}" ` +
    `class="${cls}"></polygon>`
  );
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A block on a rough floor pushed to the right, with friction acting to the left",
    width: 480,
    height: 320,
    max: 600,
  });

  const inputs = {
    push: slider(el, { show: false,
      id: "push",
      label: "Push on the block, in newtons",
      min: 0,
      max: 250,
      step: 5,
      value: 80,
    }),
    mu: slider(el, { show: false,
      id: "mu",
      label: "Coefficient of friction",
      min: 0,
      max: 1,
      step: 0.05,
      value: 0.4,
    }),
  };

  const mass = 30;
  const weight = mass * G;

  function update() {
    const push = Number(inputs.push.value);
    const mu = Number(inputs.mu.value);
    const limiting = mu * weight;
    const moves = push > limiting + 0.001;
    const friction = moves ? limiting : push;
    const acceleration = moves ? (push - limiting) / mass : 0;

    const floorY = 250;
    const blockX = 190;
    const blockY = 175;
    const blockW = 100;
    const blockH = 75;

    const box =
      `<rect x="${blockX}" y="${blockY}" width="${blockW}" height="${blockH}" ` +
      `class="fig-ink" fill="none" stroke-width="2"></rect>`;
    const floor =
      `<line x1="30" y1="${floorY}" x2="450" y2="${floorY}" class="fig-ink" stroke-width="2"></line>`;

    const pushLen = Math.min(120, push * 0.45);
    const frictionLen = Math.min(120, friction * 0.45);

    svg.innerHTML =
      floor +
      box +
      arrow(blockX + blockW, blockY + blockH / 2, blockX + blockW + pushLen, blockY + blockH / 2, "fig-accent") +
      arrow(blockX, blockY + blockH / 2, blockX - frictionLen, blockY + blockH / 2, "fig-good") +
      arrow(blockX + blockW / 2, blockY + blockH, blockX + blockW / 2, blockY + blockH + 45, "fig-warn") +
      arrow(blockX + blockW / 2, blockY, blockX + blockW / 2, blockY - 45, "fig-grid");

    const frictionLine = moves
      ? `The push beats the limit, so the block slides. Friction now takes its greatest value, ` +
        `${limiting.toFixed(1)} newtons, and the acceleration is ${acceleration.toFixed(2)} metres per second squared.`
      : `The push is within the limit, so the block stays at rest. Friction matches the push exactly, ` +
        `at ${friction.toFixed(1)} newtons, and the acceleration is zero.`;

    readout.textContent =
      `Mass ${mass} kilograms, so the weight and the normal reaction are both ` +
      `${weight.toFixed(0)} newtons. The limit on friction is ${limiting.toFixed(1)} newtons. ` +
      frictionLine;

    svg.setAttribute(
      "aria-label",
      `A block of mass ${mass} kilograms on a rough floor. The weight is ` +
        `${weight.toFixed(0)} newtons and the greatest friction is ${limiting.toFixed(1)} newtons. ` +
        frictionLine
    );
  }

  react(Object.values(inputs), update);
}
