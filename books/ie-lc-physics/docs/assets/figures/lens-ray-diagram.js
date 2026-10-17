// A ray diagram for a converging lens, with its named parts explored one at a time.
//
// Section 12.4 defines the parts in prose — the lens, the principal focus, the focal
// length, the object, the image — and a reader who skims them can repeat all five words
// without being able to point at any of them. The page asks the reader to say where the
// image forms and whether it is real or virtual, which is a fact about the picture.
//
// Each part is a button under the drawing and the drawing follows the focus, which is
// `diagram()`'s contract. The slider still moves the object, and the parts are redrawn
// from the current object distance through the `groups` the kit returns, so the drawing
// and the readout cannot disagree. At rest — before any part is focused — the drawing is
// the one the page always had.
//
// Nothing here carries a colour. The rays, the lens, the arrows and the focal marks use
// the fig-* and text-* classes, and a virtual image is drawn with a dashed backward
// extension as well as a different class, so the distinction survives a monochrome bundle.
import { SIZE, diagram, label, react, scale, slider } from "./kit.js";

// The focal length of the lens, in centimetres, and the object height.
const F = 12.0;
const OBJECT_HEIGHT_PX = 30;
// The drawing is 560 units wide and the lens sits at its centre, so 4 units per
// centimetre keeps the focal points and a 36 cm object distance on the page.
const PX_PER_CM = 4;
const LENS_X = 280;
const AXIS_Y = 150;
// Past this the image is off the drawing, so the figure says so instead of drawing an
// arrow at a place it does not belong.
const MAX_DRAW_V = 62;

export function mount(el) {
  // The object distance is the only state; every part is drawn from it.
  const state = { u: 18 };

  // The lens is the origin. The object is to the left; a real image is to the right and
  // a virtual image is to the left. `scale` maps a distance in centimetres to an SVG x.
  const sxRight = scale({ domain: [0, 70], range: [LENS_X, LENS_X + PX_PER_CM * 70] });
  const sxLeft = scale({ domain: [0, 70], range: [LENS_X, LENS_X - PX_PER_CM * 70] });

  // The y of a line through two points, at a given x. The refracted rays are straight
  // lines, so two points fix each of them.
  const yAt = (x1, y1, x2, y2, x) => y1 + ((y2 - y1) / (x2 - x1)) * (x - x1);

  // Everything the parts need, worked out once per object distance.
  function geometry() {
    const u = state.u;
    const objectX = sxLeft(u);
    const objectTopY = AXIS_Y - OBJECT_HEIGHT_PX;
    const focusRight = sxRight(F);
    const focusLeft = sxLeft(F);
    const reciprocal = 1 / F - 1 / u;
    const v = Math.abs(reciprocal) < 0.004 ? Infinity : 1 / reciprocal;
    const real = v > 0;
    const drawable = Number.isFinite(v) && Math.abs(v) <= MAX_DRAW_V;
    return { u, objectX, objectTopY, focusRight, focusLeft, v, real, drawable };
  }

  function principalAxis() {
    return `<line x1="10" y1="${AXIS_Y}" x2="550" y2="${AXIS_Y}" class="fig-grid" stroke-width="1.5"></line>`;
  }

  function lens() {
    return `<ellipse cx="${LENS_X}" cy="${AXIS_Y}" rx="9" ry="70" class="fig-line"></ellipse>`;
  }

  function foci() {
    const { focusRight, focusLeft } = geometry();
    return (
      `<circle cx="${focusRight}" cy="${AXIS_Y}" r="3.5" class="fig-ink"></circle>` +
      `<circle cx="${focusLeft}" cy="${AXIS_Y}" r="3.5" class="fig-ink"></circle>` +
      label({ x: focusRight + 4, y: AXIS_Y + 20, text: "F", anchor: "start", size: SIZE.tick }) +
      label({ x: focusLeft - 4, y: AXIS_Y + 20, text: "F'", anchor: "end", size: SIZE.tick })
    );
  }

  function rays() {
    const { objectX, objectTopY, focusRight } = geometry();
    // Ray 1: from the object top, parallel to the axis, then through the far focus.
    // Ray 2: from the object top straight through the centre of the lens.
    const refracted1End = yAt(LENS_X, objectTopY, focusRight, AXIS_Y, 550);
    const refracted2End = yAt(objectX, objectTopY, LENS_X, AXIS_Y, 550);
    return (
      `<line x1="${objectX}" y1="${objectTopY}" x2="${LENS_X}" y2="${objectTopY}" class="fig-accent" stroke-width="2"></line>` +
      `<line x1="${LENS_X}" y1="${objectTopY}" x2="550" y2="${refracted1End.toFixed(1)}" class="fig-accent" stroke-width="2"></line>` +
      `<line x1="${objectX}" y1="${objectTopY}" x2="${LENS_X}" y2="${AXIS_Y}" class="fig-accent" stroke-width="2"></line>` +
      `<line x1="${LENS_X}" y1="${AXIS_Y}" x2="550" y2="${refracted2End.toFixed(1)}" class="fig-accent" stroke-width="2"></line>`
    );
  }

  function object() {
    const { objectX, objectTopY } = geometry();
    return (
      `<line x1="${objectX}" y1="${AXIS_Y}" x2="${objectX}" y2="${objectTopY}" class="fig-ink" stroke-width="2.5"></line>` +
      `<polygon points="${objectX},${objectTopY} ${objectX - 5},${objectTopY + 10} ${objectX + 5},${objectTopY + 10}" class="fig-ink"></polygon>` +
      label({ x: objectX, y: AXIS_Y + 20, text: "object", size: SIZE.tick })
    );
  }

  function image() {
    const { u, objectX, objectTopY, real, drawable, v } = geometry();
    if (!drawable) return "";
    const imageX = sxRight(v);
    const imageTopY = AXIS_Y + (v / u) * OBJECT_HEIGHT_PX;
    // A virtual image is found by extending the diverging rays backwards, so the
    // extensions are dashed and drawn to the left of the lens.
    const extensions = real
      ? ""
      : `<line x1="${LENS_X}" y1="${objectTopY}" x2="10" y2="${yAt(LENS_X, objectTopY, sxRight(F), AXIS_Y, 10).toFixed(1)}" class="fig-warn" stroke-width="1.5" stroke-dasharray="6 5"></line>` +
        `<line x1="${LENS_X}" y1="${AXIS_Y}" x2="10" y2="${yAt(objectX, objectTopY, LENS_X, AXIS_Y, 10).toFixed(1)}" class="fig-warn" stroke-width="1.5" stroke-dasharray="6 5"></line>`;
    const tip = imageTopY < AXIS_Y ? imageTopY + 10 : imageTopY - 10;
    return (
      extensions +
      `<line x1="${imageX}" y1="${AXIS_Y}" x2="${imageX}" y2="${imageTopY.toFixed(1)}" class="fig-warn" stroke-width="2.5"></line>` +
      `<polygon points="${imageX},${imageTopY.toFixed(1)} ${imageX - 5},${tip.toFixed(1)} ${imageX + 5},${tip.toFixed(1)}" class="fig-warn"></polygon>` +
      label({ x: imageX, y: AXIS_Y + 20, text: "image", size: SIZE.tick })
    );
  }

  const parts = [
    {
      name: "Principal axis",
      description:
        "The horizontal line through the centre of the lens. Distances along it are measured from the lens.",
      draw: principalAxis,
    },
    {
      name: "Lens",
      description:
        "The converging lens, drawn as a thin ellipse. It is thicker in the middle and brings parallel rays together at the principal focus.",
      draw: lens,
    },
    {
      name: "Focal points",
      description:
        "The principal foci, one on each side of the lens. Each is a focal length f = 12.0 cm from the centre.",
      draw: foci,
    },
    {
      name: "Rays of light",
      description:
        "The two rays from the top of the object. One is parallel to the axis and passes through the far focus; the other passes straight through the centre of the lens.",
      draw: rays,
    },
    {
      name: "Object",
      description:
        "The object, drawn as an arrow standing on the principal axis. Its distance from the lens is u.",
      draw: object,
    },
    {
      name: "Image",
      description:
        "Where the rays meet, or appear to meet. A real image is inverted and can be caught on a screen; a virtual image is upright, on the same side as the object, and cannot.",
      draw: image,
    },
  ];

  const { groups, readout } = diagram(el, {
    label:
      "A ray diagram for a converging lens, with the principal axis, the lens, its focal points, the object, the image and the two rays marked",
    description:
      "A ray diagram for a converging lens. The lens sits at the centre of the principal " +
      "axis, with a principal focus a focal length to each side. An object stands on the " +
      "axis to the left, and two rays from its top are drawn through the lens. The image " +
      "forms where the rays meet, or where their backward extensions meet.",
    width: 560,
    height: 280,
    parts,
  });

  const objectInput = slider(el, {
    id: "object-distance",
    label: "Object distance",
    show: true,
    min: 6,
    max: 36,
    step: 0.5,
    value: 18,
    unit: "cm",
  });

  function redraw() {
    state.u = Number(objectInput.value);
    parts.forEach((part, index) => {
      groups[index].innerHTML = part.draw();
    });

    const { u, v, real, drawable } = geometry();
    const m = Number.isFinite(v) ? v / u : Infinity;
    if (!drawable) {
      readout.textContent = `u = ${u.toFixed(1)} cm. The object is at the focal point, so the rays leave the lens parallel and there is no image on the screen.`;
    } else if (real) {
      readout.textContent = `u = ${u.toFixed(1)} cm, v = ${v.toFixed(1)} cm, magnification = ${Math.abs(m).toFixed(2)}. The image is real and inverted, and it forms on the far side of the lens.`;
    } else {
      readout.textContent = `u = ${u.toFixed(1)} cm, v = ${v.toFixed(1)} cm, magnification = ${Math.abs(m).toFixed(2)}. The image is virtual and upright, on the same side of the lens as the object.`;
    }
  }

  react([objectInput], redraw);
}
