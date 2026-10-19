// The transient: what a model with mass says that §1.2 to §1.5 could not.
//
// The numbers come from the package's own dynamics solver, vendored beside the page
// (`docs/assets/data/quarter-car/trajectory.js`): the chassis is released from the
// design position and gravity does the rest. The figure plots **travel** rather than
// heave, because a reader's question is "how far did the wheel move up the arch", and
// the travel is positive in bump.
//
// The sign conventions are the package's: camber is positive with the top of the wheel
// outboard, which is the opposite of §1.2's. The readout says so, and the page quotes
// the same numbers with the same caveat.
import { SIZE, axes, curve, label, panel, quantity } from "./kit.js";
import { meta, rows } from "../data/quarter-car/trajectory.js";

const UI = 2; // decimal places for a length in millimetres

/** `6.3 × 10⁻⁸`, because `6.3e-8` wraps badly in a caption at phone width. */
const SUPERSCRIPT = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
function sci(value) {
  const power = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / 10 ** power;
  const superscript = String(power)
    .split("")
    .map((character) => SUPERSCRIPT[character] || character)
    .join("");
  return `${mantissa.toFixed(1)} × 10${superscript}`;
}

export function mount(el) {
  const highest = rows.reduce((best, row) => (row.travel > best.travel ? row : best));
  const extreme = rows.reduce((best, row) => (row.camber < best.camber ? row : best));

  const { draw, x, y, box } = axes({
    width: 560,
    height: 300,
    pad: { left: 82, top: 26, bottom: 54 },
    x: { domain: [0, meta.duration], ticks: 4, tickFormat: (value) => quantity(value, "s", 1) },
    y: { domain: [-20, 230], ticks: 4, tickFormat: (value) => quantity(value, "mm", 0) },
  });

  const peaks = [];
  for (let index = 1; index < rows.length - 1; index += 1) {
    if (rows[index].travel > rows[index - 1].travel && rows[index].travel >= rows[index + 1].travel) {
      peaks.push(rows[index]);
    }
  }
  const period = peaks.length > 1 ? (peaks[peaks.length - 1].t - peaks[0].t) / (peaks.length - 1) : 0;

  const marks =
    draw +
    curve(
      rows.map((row) => [row.t, row.travel]),
      { x, y, class: "fig-line" },
    ) +
    label({
      x: x(highest.t) + 14,
      y: y(highest.travel) + 8,
      text: `reaches ${quantity(highest.travel, "mm", 0)}`,
      anchor: "start",
      size: SIZE.tick,
      class: "text-ink",
    }) +
    label({
      x: (box.x0 + box.x1) / 2,
      y: box.y0 + 50,
      text: "time",
      size: SIZE.label,
      class: "text-ink",
    }) +
    label({
      x: 16,
      y: (box.y0 + box.y1) / 2,
      text: "wheel travel into bump",
      size: SIZE.label,
      class: "text-ink",
      rotate: -90,
    });

  const { svg, readout, caption } = panel(el, {
    label: "Wheel travel against time when a quarter car is released from rest",
    description:
      "Wheel travel into bump in millimetres against time in seconds. The wheel rises " +
      "to about two hundred and thirteen millimetres and falls back to zero, five times " +
      "in three seconds, with the same peak each time: the motion does not die away.",
    width: 560,
    height: 300,
  });
  if (!svg) throw new Error("quarter-car: the frame has no drawing surface");
  svg.innerHTML = marks;

  readout.textContent =
    `Released from the design position, the corner swings between ` +
    `${quantity(0, "mm", 0)} and ${quantity(highest.travel, "mm", UI)}, once every ` +
    `${quantity(period, "s", 3)} — ${quantity(1 / period, "Hz", 2)} — and does not settle: ` +
    "the coil has no damper in this model. " +
    `Camber, counted the package's way (positive with the top of the wheel outboard, ` +
    `the opposite of §1.2), swings with it, from 0° to ${quantity(extreme.camber, "°", 2)}.`;
  caption.textContent =
    `The energy drifts by ${sci(meta.energy_drift)} of its starting value over the run, ` +
    `and the largest constraint violation is ${sci(meta.constraint_max)}.`;
}
