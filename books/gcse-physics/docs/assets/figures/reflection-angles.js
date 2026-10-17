// The law of reflection, with the parts of the ray diagram explored one at a time.
//
// Section 4.3 defines the parts in prose — the surface, the normal, the incident ray,
// the reflected ray, the angle of incidence and the angle of reflection — and a reader
// who skims the bullets can repeat all six names without pointing at any of them. The
// page asks them to "draw the normal and measure both angles from it", which is a
// statement about a picture, so the picture is where the words belong.
//
// So each part is a button under the drawing and the drawing follows the focus, which
// is `diagram()`'s contract. The angle control still sets the geometry: the parts are
// redrawn from the current angle through the `groups` the kit returns, so the drawing
// and the readout cannot disagree, and the figure at rest — before any part is
// focused — is the same drawing it always was.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { SIZE, diagram, label, react, slider } from "./kit.js";

const P = { x: 280, y: 180 };
const RAY = 120;
const NORMAL_TOP = { x: 280, y: 55 };

export function mount(el) {
  // The angle is the only state; every part is drawn from it.
  const state = { angle: 40 };

  // The two ray ends for the current angle. The angle is measured from the normal, so
  // the sine is the horizontal step and the cosine the vertical one.
  function ends() {
    const radians = (state.angle * Math.PI) / 180;
    const dx = Math.sin(radians);
    const dy = Math.cos(radians);
    return {
      radians,
      dx,
      dy,
      source: { x: P.x - RAY * dx, y: P.y - RAY * dy },
      reflected: { x: P.x + RAY * dx, y: P.y - RAY * dy },
    };
  }

  function surface() {
    return `<line x1="60" y1="${P.y}" x2="500" y2="${P.y}" class="fig-ink" stroke-width="2"></line>`;
  }

  function normal() {
    return (
      `<line x1="${NORMAL_TOP.x}" y1="${NORMAL_TOP.y}" x2="${P.x}" y2="${P.y}" ` +
      `class="fig-grid" stroke-dasharray="5 4" stroke-width="2"></line>` +
      `${label({ x: NORMAL_TOP.x + 6, y: NORMAL_TOP.y + 4, text: `normal`, anchor: "start", size: SIZE.tick, class: "text-ink" })}`
    );
  }

  function incident() {
    const { dx, dy, source } = ends();
    return (
      `<line x1="${source.x.toFixed(1)}" y1="${source.y.toFixed(1)}" x2="${P.x}" y2="${P.y}" ` +
      `class="fig-accent" stroke-width="2.5"></line>` +
      `<polygon points="${P.x},${P.y} ${(P.x - 12 * dx + 6 * dy).toFixed(1)},${(P.y - 12 * dy - 6 * dx).toFixed(1)} ` +
      `${(P.x - 12 * dx - 6 * dy).toFixed(1)},${(P.y - 12 * dy + 6 * dx).toFixed(1)}" class="fig-accent"></polygon>` +
      `${label({ x: source.x.toFixed(1), y: (source.y - 6).toFixed(1), text: `incident ray`, anchor: "start", size: SIZE.tick, class: "text-ink" })}`
    );
  }

  function reflected() {
    const { reflected: end } = ends();
    return (
      `<line x1="${P.x}" y1="${P.y}" x2="${end.x.toFixed(1)}" y2="${end.y.toFixed(1)}" ` +
      `class="fig-warn" stroke-width="2.5"></line>` +
      `${label({ x: end.x.toFixed(1), y: (end.y - 6).toFixed(1), text: `reflected ray`, anchor: "end", size: SIZE.tick, class: "text-ink" })}`
    );
  }

  // A small arc from the normal to one ray, drawn as a short polyline so the direction
  // of sweep does not depend on the SVG arc conventions. `sign` is -1 for the incident
  // side and +1 for the reflected side.
  function angleArc(sign) {
    const { dx, dy, radians } = ends();
    const arcRadius = 46;
    const points = [];
    for (let t = 0; t <= state.angle; t += 2) {
      const r = (t * Math.PI) / 180;
      points.push(
        `${(P.x + sign * arcRadius * Math.sin(r)).toFixed(1)},` +
          `${(P.y - arcRadius * Math.cos(r)).toFixed(1)}`,
      );
    }
    points.push(
      `${(P.x + sign * arcRadius * Math.sin(radians)).toFixed(1)},` +
        `${(P.y - arcRadius * Math.cos(radians)).toFixed(1)}`,
    );
    const labelX = P.x + sign * (arcRadius + 16) * dx;
    const labelY = P.y - (arcRadius + 8) * dy;
    return (
      `<polyline points="${points.join(" ")}" class="fig-ink" fill="none" stroke-width="1.5"></polyline>` +
      `${label({ x: labelX.toFixed(1), y: labelY.toFixed(1), text: `${state.angle}°`, anchor: "middle", size: SIZE.tick, class: "text-ink" })}`
    );
  }

  const parts = [
    {
      name: "Surface",
      description:
        "The flat surface the ray meets. Both angles are measured from the normal, not from this surface.",
      draw: surface,
    },
    {
      name: "Normal",
      description:
        "The line at right angles to the surface at the point where the ray hits. Both angles are measured from it.",
      draw: normal,
    },
    {
      name: "Incident ray",
      description: "The ray arriving at the surface.",
      draw: incident,
    },
    {
      name: "Reflected ray",
      description: "The ray leaving the surface.",
      draw: reflected,
    },
    {
      name: "Angle of incidence",
      description: "The angle between the incident ray and the normal.",
      draw: () => angleArc(-1),
    },
    {
      name: "Angle of reflection",
      description: "The angle between the reflected ray and the normal.",
      draw: () => angleArc(1),
    },
  ];

  const { groups, readout } = diagram(el, {
    label:
      "A ray of light meeting a flat surface, with the normal, the incident and reflected rays and both angles marked",
    description:
      "A ray of light meeting a flat surface. The normal is the dashed line at right " +
      "angles to the surface. The incident ray arrives at the surface and the reflected " +
      "ray leaves it. The angle of incidence and the angle of reflection are both " +
      "measured from the normal, and they are equal.",
    width: 560,
    height: 240,
    parts,
  });

  const angleInput = slider(el, {
    show: false,
    id: "angle",
    label: "Angle of incidence (degrees)",
    min: 0,
    max: 80,
    step: 5,
    value: 40,
  });

  function redraw() {
    state.angle = Number(angleInput.value);
    parts.forEach((part, index) => {
      groups[index].innerHTML = part.draw();
    });
    readout.innerHTML =
      `Angle of incidence <strong>${state.angle}&deg;</strong>, angle of reflection ` +
      `<strong>${state.angle}&deg;</strong>. The two angles are equal, and both are ` +
      `measured from the normal. ` +
      `<em>Now set the angle to 0&deg;. Where does the reflected ray go?</em>`;
  }

  react(angleInput, redraw);
}
