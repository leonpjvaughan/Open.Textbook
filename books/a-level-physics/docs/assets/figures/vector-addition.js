// Tier-1 guided investigation: adding two vectors by the triangle rule.
//
// Guided, not a sandbox: the page asks the reader to predict the resultant
// before moving a control, and to explain afterwards why the resultant is
// shorter than the two magnitudes added. Two sliders set the force magnitudes
// and one sets the angle between them. The second force is placed tail to tip on
// the first, and the resultant runs from the tail of the first to the tip of the
// second, so the reader can watch the resultant grow and shrink as the angle
// changes.
//
// A fixed frame keeps the scale constant, so a force of 10 N is the same length
// on screen at every setting. Colours come from CSS classes, so the figure
// adapts to every bundle and to both schemes. No colour literal appears here,
// and no runtime LaTeX: the readout is plain HTML.
//
// The scaffolding — the surface, its accessible name, the sliders, the live
// readout and the redraw — comes from `kit.js`. What is left here is the drawing
// and the sentences, which are the parts that differ from every other figure.
import { panel, slider, react } from "./kit.js";

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Two force arrows placed tip to tail, with the resultant arrow drawn from the tail of the first to the tip of the second",
    width: 640,
    height: 300,
    max: 640,
  });
  readout.classList.add("text-ink");

  const forceA = slider(el, { show: true,
    id: "force-a",
    label: "Force A in newtons",
    min: 1,
    max: 10,
    step: 1,
    value: 6,
  });
  const forceB = slider(el, { show: true,
    id: "force-b",
    label: "Force B in newtons",
    min: 1,
    max: 10,
    step: 1,
    value: 8,
  });
  const angle = slider(el, { show: true,
    id: "angle",
    label: "Angle between the forces in degrees",
    min: 0,
    max: 180,
    step: 5,
    value: 90,
  });

  // A fixed frame, so a force of 10 N is the same length on screen at every
  // setting and the reader can compare one setting with another. The frame holds
  // the widest case: forces of 10 N each pointing the same way, which reach 20 N
  // from the tail of the first.
  const VIEW_W = 640;
  const VIEW_H = 300;
  const PAD = 28;
  const X_MIN = -10;
  const X_MAX = 20;
  const Y_MIN = 0;
  const Y_MAX = 10;
  const SCALE = Math.min(
    (VIEW_W - 2 * PAD) / (X_MAX - X_MIN),
    (VIEW_H - 2 * PAD) / (Y_MAX - Y_MIN),
  );
  const LEFT = (VIEW_W - (X_MAX - X_MIN) * SCALE) / 2;
  const TOP = (VIEW_H - (Y_MAX - Y_MIN) * SCALE) / 2;
  const screenX = (x) => LEFT + (x - X_MIN) * SCALE;
  const screenY = (y) => TOP + (Y_MAX - y) * SCALE;

  function arrow(x1, y1, x2, y2, cls, width) {
    const head = 10;
    const length = Math.hypot(x2 - x1, y2 - y1);
    if (length < 1) {
      return `<circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="4" class="${cls}"></circle>`;
    }
    const ux = (x2 - x1) / length;
    const uy = (y2 - y1) / length;
    const baseX = x2 - ux * head;
    const baseY = y2 - uy * head;
    const perpX = -uy * 6;
    const perpY = ux * 6;
    return (
      `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${baseX.toFixed(1)}" y2="${baseY.toFixed(1)}" class="${cls}" stroke-width="${width}"></line>` +
      `<polygon points="${x2.toFixed(1)},${y2.toFixed(1)} ` +
      `${(baseX + perpX).toFixed(1)},${(baseY + perpY).toFixed(1)} ` +
      `${(baseX - perpX).toFixed(1)},${(baseY - perpY).toFixed(1)}" class="${cls}"></polygon>`
    );
  }

  // A letter beside the middle of an arrow, pushed clear of the shaft. A "side"
  // of minus one pushes the other way, so the resultant label does not sit on
  // the two force labels when the forces point the same way.
  function arrowLabel(x1, y1, x2, y2, text, cls, side) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy) || 1;
    const x = (x1 + x2) / 2 + (-dy / length) * 16 * side;
    const y = (y1 + y2) / 2 + (dx / length) * 16 * side + 5;
    return (
      `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="18" ` +
      `text-anchor="middle" class="${cls}">${text}</text>`
    );
  }

  function update() {
    const a = Number(forceA.value);
    const b = Number(forceB.value);
    const degrees = Number(angle.value);

    const radians = (degrees * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    // The triangle rule: the resultant closes the triangle, so its length comes
    // from the two sides and the angle between them.
    const resultant = Math.sqrt(a * a + b * b + 2 * a * b * cos);

    const tailX = screenX(0);
    const tailY = screenY(0);
    const tipAX = screenX(a);
    const tipAY = tailY;
    const tipBX = screenX(a + b * cos);
    const tipBY = screenY(b * sin);

    const axes =
      `<line x1="${screenX(X_MIN).toFixed(1)}" y1="${tailY.toFixed(1)}" ` +
      `x2="${screenX(X_MAX).toFixed(1)}" y2="${tailY.toFixed(1)}" class="fig-grid"></line>` +
      `<line x1="${tailX.toFixed(1)}" y1="${tailY.toFixed(1)}" ` +
      `x2="${tailX.toFixed(1)}" y2="${screenY(Y_MAX).toFixed(1)}" class="fig-grid"></line>`;

    // The angle between the two forces is marked at the tip of the first.
    let arc = "";
    if (degrees > 2) {
      const radius = 40;
      const startX = tipAX + radius;
      const endX = tipAX + radius * cos;
      const endY = tipAY - radius * sin;
      arc =
        `<path d="M ${startX.toFixed(1)} ${tipAY.toFixed(1)} ` +
        `A ${radius} ${radius} 0 0 0 ${endX.toFixed(1)} ${endY.toFixed(1)}" class="fig-line"></path>` +
        `<text x="${(tipAX + (radius + 16) * Math.cos(radians / 2)).toFixed(1)}" ` +
        `y="${(tipAY - (radius + 16) * Math.sin(radians / 2) + 5).toFixed(1)}" ` +
        `font-size="18" text-anchor="middle" class="text-ink">&theta;</text>`;
    }

    svg.innerHTML =
      axes +
      arc +
      arrow(tailX, tailY, tipAX, tipAY, "fig-accent", 3) +
      arrow(tipAX, tipAY, tipBX, tipBY, "fig-warn", 3) +
      arrow(tailX, tailY, tipBX, tipBY, "fig-good", 3) +
      arrowLabel(tailX, tailY, tipAX, tipAY, "A", "text-accent", 1) +
      arrowLabel(tipAX, tipAY, tipBX, tipBY, "B", "text-warn", 1) +
      arrowLabel(tailX, tailY, tipBX, tipBY, "R", "text-good", -1);

    readout.innerHTML =
      `Force A is <strong>${a} N</strong> and force B is <strong>${b} N</strong>, ` +
      `with an angle of <strong>${degrees}&deg;</strong> between them. ` +
      `The resultant R is <strong>${resultant.toFixed(1)} N</strong>. ` +
      `Adding the two magnitudes gives ${a + b} N. ` +
      `<em>Move the angle and watch the resultant. When is the resultant equal to ` +
      `the two magnitudes added?</em>`;
  }

  react([forceA, forceB, angle], update);
}
