// The parts of a circle, explored one at a time.
//
// The page defines centre, radius, diameter and circumference in four bullets, and a
// reader who skims them can repeat all four words without being able to point at any of
// them. That is what a diagram is for: the words are attached to the picture, in place.
//
// It is the first use of `diagram()`, and it is the case the primitive was written for —
// a drawing whose meaning *is* its named parts. Each part is a button under the drawing,
// so the reader moves through them with the keyboard and hears what each one is, and the
// drawing follows. A single text element per label, which is what this figure would have been,
// is one image to a screen reader and one undifferentiated picture to everyone else.
//
// The labels in the drawing carry the numbers because the numbers are what a reader has to
// tell apart: the radius is 4, the diameter is 8, and the diameter is visibly twice the
// radius rather than a fact in a bullet.
import { SIZE, circle, diagram, label, line } from "./kit.js";

const CX = 260;
const CY = 150;
const R = 92;

export function mount(el) {
  const edge = (angle) => [CX + R * Math.cos(angle), CY + R * Math.sin(angle)];

  diagram(el, {
    label: "A circle with its centre, radius, diameter and circumference marked",
    description:
      "A circle. The centre is marked with a point. A line from the centre to the edge is " +
      "the radius, labelled 4. A line straight across through the centre is the diameter, " +
      "labelled 8, and it is twice the radius. The edge itself is the circumference.",
    width: 520,
    height: 300,
    parts: [
      {
        name: "Centre",
        description: "The point every point on the edge is the same distance from.",
        draw: () => circle({ cx: CX, cy: CY, r: 5, class: "fig-ink" }),
      },
      {
        name: "Radius",
        description: "The distance from the centre to the edge. Its symbol is r, and here it is 4.",
        draw: () =>
          line({ x1: CX, y1: CY, x2: CX + R, y2: CY, class: "fig-accent", width: 2.6 }) +
          label({
            x: CX + R / 2,
            y: CY - 10,
            text: "r = 4",
            size: SIZE.value,
            class: "text-accent",
          }),
      },
      {
        name: "Diameter",
        description:
          "The distance straight across the circle through the centre. Its symbol is d, and it is twice the radius, so here it is 8.",
        draw: () =>
          line({ x1: CX - R, y1: CY, x2: CX + R, y2: CY, class: "fig-warn", width: 2.6, dash: "6 4" }) +
          label({
            x: CX - R / 2,
            y: CY + 20,
            text: "d = 8",
            size: SIZE.value,
            class: "text-warn",
          }),
      },
      {
        name: "Circumference",
        description:
          "The distance all the way around the edge. It is the perimeter of the circle, and it is a little more than three times the diameter.",
        draw: () => {
          // The edge, drawn as a circle mark with no fill, plus four short outward ticks
          // at the compass points so the "all the way round" reading is not just a ring.
          const ticks = [0, 1, 2, 3]
            .map((i) => {
              const a = (i * Math.PI) / 2;
              const [x1, y1] = edge(a);
              const [x2, y2] = [CX + (R + 10) * Math.cos(a), CY + (R + 10) * Math.sin(a)];
              return line({ x1, y1, x2, y2, class: "fig-good", width: 2 });
            })
            .join("");
          return (
            `<circle cx="${CX}" cy="${CY}" r="${R}" class="fig-good" style="fill:none" stroke-width="2.6"></circle>` +
            ticks +
            label({
              x: CX,
              y: CY - R - 22,
              text: "circumference",
              size: SIZE.value,
              class: "text-good",
            })
          );
        },
      },
    ],
  });
}
