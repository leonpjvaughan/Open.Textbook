// Guided investigation for a resultant force in a plane.
//
// Guided, not a sandbox: the page asks the reader to predict whether a steeper
// rope makes the crate accelerate faster before any control is touched. Four
// sliders set the tension, the angle of the rope, the mass of the crate and the
// resistance. The rope's two components are drawn, so the reader sees that the
// tension lifts as well as pulls, and the readout works Newton's second law in
// each direction.
//
// Colours come from the fig-* and text-* classes, so the figure adapts to every
// bundle and to both schemes. No colour literal appears here, and the runtime
// text is plain HTML, never TeX.

const G = 9.8;
const SCALE = 0.18; // pixels per newton
const WIDTH = 480;
const HEIGHT = 380;
const CX = 240; // the point where every force acts
const CY = 210;
const HALF_W = 46;
const HALF_H = 26;
const FLOOR_Y = CY + HALF_H;
const MINUS = "\u2212";
const SQUARED = "\u00b2";

function one(value) {
  return (value < 0 ? MINUS : "") + Math.abs(value).toFixed(1);
}

function two(value) {
  return (value < 0 ? MINUS : "") + Math.abs(value).toFixed(2);
}

// An arrow from the point where the forces act. The length carries the size of
// the force, because one scale is used at every setting.
function arrow(dx, dy, cls, width) {
  const x2 = CX + dx;
  const y2 = CY + dy;
  const length = Math.hypot(dx, dy);
  if (length < 3) return "";
  const angle = Math.atan2(dy, dx);
  const size = width > 2 ? 10 : 8;
  const spread = 1.1;
  const bx = x2 - size * Math.cos(angle);
  const by = y2 - size * Math.sin(angle);
  return (
    `<line x1="${CX}" y1="${CY}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" ` +
    `class="${cls}" fill="none" stroke-width="${width}"></line>` +
    `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ` +
    `${(bx - size * Math.sin(angle) * spread).toFixed(1)},` +
    `${(by + size * Math.cos(angle) * spread).toFixed(1)} ` +
    `${(bx + size * Math.sin(angle) * spread).toFixed(1)},` +
    `${(by - size * Math.cos(angle) * spread).toFixed(1)}" ` +
    `class="${cls}"></polygon>`
  );
}

// A dashed line that completes the rectangle of components.
function guide(x2, y2) {
  return (
    `<line x1="${(CX + x2).toFixed(1)}" y1="${(CY + y2).toFixed(1)}" ` +
    `x2="${(CX + x2).toFixed(1)}" y2="${CY}" class="fig-ink" ` +
    `stroke-width="1" stroke-dasharray="5 4"></line>` +
    `<line x1="${(CX + x2).toFixed(1)}" y1="${(CY + y2).toFixed(1)}" ` +
    `x2="${CX}" y2="${(CY + y2).toFixed(1)}" class="fig-ink" ` +
    `stroke-width="1" stroke-dasharray="5 4"></line>`
  );
}

function label(x, y, text, cls, anchor) {
  return (
    `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="14" ` +
    `text-anchor="${anchor}" class="${cls}">${text}</text>`
  );
}

export function mount(el) {
  el.innerHTML = `
    <div style="font:14px system-ui;max-width:620px">
      <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" role="img"
           aria-label="A crate on a floor pulled by a rope at an angle, with the two components of the tension, the weight, the normal reaction and the resistance drawn as arrows"></svg>
      <label style="display:block;margin:.5rem 0">Tension T in the rope, in newtons
        <input class="tension" type="range" min="50" max="300" step="10" value="200">
        <output class="tension-out">200</output>
      </label>
      <label style="display:block;margin:.2rem 0">Angle of the rope above the floor, in degrees
        <input class="angle" type="range" min="0" max="60" step="5" value="25">
        <output class="angle-out">25</output>
      </label>
      <label style="display:block;margin:.2rem 0">Mass of the crate, in kilograms
        <input class="mass" type="range" min="10" max="60" step="5" value="45">
        <output class="mass-out">45</output>
      </label>
      <label style="display:block;margin:.2rem 0">Resistance to the motion, in newtons
        <input class="drag" type="range" min="0" max="150" step="5" value="80">
        <output class="drag-out">80</output>
      </label>
      <p class="readout text-ink" aria-live="polite" style="margin:.5rem 0 0"></p>
    </div>`;

  const svg = el.querySelector("svg");
  const readout = el.querySelector(".readout");
  const inputs = {
    tension: el.querySelector(".tension"),
    angle: el.querySelector(".angle"),
    mass: el.querySelector(".mass"),
    drag: el.querySelector(".drag"),
  };
  const outputs = {
    tension: el.querySelector(".tension-out"),
    angle: el.querySelector(".angle-out"),
    mass: el.querySelector(".mass-out"),
    drag: el.querySelector(".drag-out"),
  };

  function update() {
    const tension = Number(inputs.tension.value);
    const degrees = Number(inputs.angle.value);
    const mass = Number(inputs.mass.value);
    const drag = Number(inputs.drag.value);

    outputs.tension.textContent = String(tension);
    outputs.angle.textContent = String(degrees);
    outputs.mass.textContent = String(mass);
    outputs.drag.textContent = String(drag);

    const radians = (degrees * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const forward = tension * cos;
    const lift = tension * sin;
    const weight = mass * G;
    const contact = weight - lift;
    const normal = Math.max(0, contact);
    const net = forward - drag;
    const onFloor = contact > 0;
    const moves = onFloor && net > 0;
    const acceleration = moves ? net / mass : 0;

    const ropeLength = tension * SCALE;
    const ropeX = ropeLength * cos;
    const ropeY = -ropeLength * sin;

    const floor =
      `<line x1="30" y1="${FLOOR_Y}" x2="${WIDTH - 20}" y2="${FLOOR_Y}" ` +
      `class="fig-ink" stroke-width="2"></line>`;
    const crate =
      `<rect x="${CX - HALF_W}" y="${CY - HALF_H}" width="${2 * HALF_W}" ` +
      `height="${2 * HALF_H}" class="fig-ink" fill-opacity="0.12" ` +
      `stroke-width="2"></rect>`;

    // The angle between the rope and the floor.
    const arcRadius = Math.min(44, ropeLength * 0.6);
    const arc =
      degrees > 0 && arcRadius > 8
        ? `<path d="M ${(CX + arcRadius).toFixed(1)} ${CY} ` +
          `A ${arcRadius.toFixed(1)} ${arcRadius.toFixed(1)} 0 0 0 ` +
          `${(CX + arcRadius * cos).toFixed(1)} ` +
          `${(CY - arcRadius * sin).toFixed(1)}" class="fig-line"></path>` +
          label(
            CX + (arcRadius + 16) * Math.cos(radians / 2),
            CY - (arcRadius + 16) * Math.sin(radians / 2) + 4,
            "\u03b8",
            "text-ink",
            "middle",
          )
        : "";

    const parts =
      floor +
      crate +
      arc +
      (ropeY < -2 ? guide(ropeX, ropeY) : "") +
      arrow(ropeX, 0, "fig-warn", 2) +
      arrow(0, ropeY, "fig-warn", 2) +
      arrow(ropeX, ropeY, "fig-accent", 3) +
      arrow(0, weight * SCALE, "fig-ink", 3) +
      arrow(0, -normal * SCALE, "fig-ink", 3) +
      arrow(-drag * SCALE, 0, "fig-good", 3);

    const names =
      label(CX + 8, CY + weight * SCALE, `W = ${one(weight)} N`, "text-ink", "start") +
      (normal > 1
        ? label(CX - 8, CY - normal * SCALE, `R = ${one(normal)} N`, "text-ink", "end")
        : "") +
      (drag > 1
        ? label(CX - drag * SCALE - 8, CY + 5, `F = ${one(drag)} N`, "text-ink", "end")
        : "") +
      label(
        CX + (ropeX + 10),
        CY + ropeY - 4,
        `T = ${one(tension)} N`,
        "text-accent",
        "start",
      ) +
      (forward > 1
        ? label(
            CX + ropeX / 2,
            CY + 16,
            `T cos \u03b8 = ${one(forward)} N`,
            "text-warn",
            "middle",
          )
        : "") +
      (lift > 1
        ? label(
            CX + 8,
            CY + ropeY / 2,
            `T sin \u03b8 = ${one(lift)} N`,
            "text-warn",
            "start",
          )
        : "");

    // The acceleration, drawn away from the forces so it is not read as one.
    const arrowLength = Math.min(70, acceleration * 16);
    const moving =
      arrowLength > 3
        ? `<line x1="40" y1="352" x2="${(40 + arrowLength).toFixed(1)}" ` +
          `y2="352" class="fig-accent" fill="none" stroke-width="2"></line>` +
          `<polygon points="${(40 + arrowLength + 10).toFixed(1)},352 ` +
          `${(40 + arrowLength).toFixed(1)},347 ${(40 + arrowLength).toFixed(1)},357" ` +
          `class="fig-accent"></polygon>` +
          label(
            40 + arrowLength / 2,
            344,
            `acceleration a = ${two(acceleration)} m/s${SQUARED}`,
            "text-ink",
            "middle",
          )
        : "";

    svg.innerHTML = parts + names + moving;

    const weightLine =
      `The crate has mass ${mass} kg, so its weight is W = ${mass} &times; 9.8 = ` +
      `<strong>${one(weight)} N</strong>. The rope pulls with ${tension} N at ` +
      `${degrees}&deg; to the floor.`;
    const resolveLine =
      `Forward component: T cos ${degrees}&deg; = ${tension} &times; ` +
      `${cos.toFixed(4)} = <strong>${one(forward)} N</strong>. ` +
      `Upward component: T sin ${degrees}&deg; = ${tension} &times; ` +
      `${sin.toFixed(4)} = <strong>${one(lift)} N</strong>.`;
    const verticalLine =
      lift < 0.05
        ? `The rope is horizontal, so it does not lift the crate and ` +
          `R = <strong>${one(normal)} N</strong>.`
        : `Vertically: R + ${one(lift)} = ${one(weight)}, so ` +
          `R = <strong>${one(normal)} N</strong>.`;

    if (!onFloor) {
      readout.innerHTML =
        `${weightLine} ${resolveLine} The upward component is larger than the ` +
        `weight, so the crate leaves the floor. This figure keeps the crate on ` +
        `the floor, so use a smaller tension or a smaller angle. ` +
        `<em>Compare the upward component with the weight to find the angle ` +
        `where the two are equal.</em>`;
    } else if (!moves) {
      readout.innerHTML =
        `${weightLine} ${resolveLine} ${verticalLine} Along the floor the ` +
        `forward pull is ${one(forward)} N and the resistance is ` +
        `${one(drag)} N, so the resistance is at least as large as the pull ` +
        `and the crate does not move. ` +
        `<em>Find the smallest tension that moves the crate.</em>`;
    } else {
      readout.innerHTML =
        `${weightLine} ${resolveLine} ${verticalLine} Along the floor: ` +
        `${one(forward)} ${MINUS} ${one(drag)} = ` +
        `<strong>${one(net)} N</strong>, and a = ${one(net)} &divide; ${mass} = ` +
        `<strong>${two(acceleration)} m/s${SQUARED}</strong>. ` +
        `<em>The lift makes R smaller, and R does not appear in the ` +
        `acceleration. Which force does the acceleration depend on?</em>`;
    }

    svg.setAttribute(
      "aria-label",
      `A crate of mass ${mass} kilograms on a floor, pulled by a rope at ` +
        `${degrees} degrees with a tension of ${tension} newtons. The weight ` +
        `is ${one(weight)} newtons, the normal reaction is ` +
        `${one(normal)} newtons and the resistance is ${one(drag)} newtons. ` +
        (moves
          ? `The crate accelerates at ${two(acceleration)} metres per second ` +
            `squared.`
          : onFloor
            ? `The crate does not move.`
            : `The crate leaves the floor.`),
    );
  }

  for (const input of Object.values(inputs)) {
    input.addEventListener("input", update);
  }
  update();
}
