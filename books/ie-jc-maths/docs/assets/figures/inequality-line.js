// Tier-1 guided investigation: the solution set of an inequality on a number line.
//
// Section 12.6 asks for four things at once — the endpoint, whether the circle is open
// or closed, which way the arrow points, and whether the set is real numbers or whole
// numbers — and the trap it names is getting the circle and the arrow out of step with
// the sign. So the figure draws all four from one sign, and the reader changes the
// sign and the number set to watch each one follow.
//
// The circle carries its meaning in its shape, not its colour: an open circle is a
// ring and a closed circle is a disc. A reader who cannot tell the colours apart can
// still tell the two apart.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { circle, label, line, numberLine, panel, path, react, chooser, slider } from "./kit.js";

const SIGNS = {
  "<": { text: "<", strict: true, right: false },
  "\u2264": { text: "\u2264", strict: false, right: false },
  ">": { text: ">", strict: true, right: true },
  "\u2265": { text: "\u2265", strict: false, right: true },
};

const num = (value) => String(value).replace("-", "\u2212");

/** An open circle: a ring, so the meaning survives without colour. */
const ring = (cx, cy, r) =>
  path({
    d: `M${cx - r} ${cy} A${r} ${r} 0 1 0 ${cx + r} ${cy} A${r} ${r} 0 1 0 ${cx - r} ${cy}`,
    class: "fig-grid",
    width: 2.6,
  });

export function mount(el) {
  const { svg, readout } = panel(el, {
    label: "A number line showing the solution set of an inequality, with an open or closed circle at the endpoint",
    description:
      "The boundary of the inequality is marked with an open ring when the endpoint is not included and a " +
      "filled disc when it is. The solution set is shaded to one side, or drawn as separate dots when only " +
      "whole numbers or integers are allowed.",
    prompt: "Predict whether the circle will be open or closed, then change the sign and check.",
    width: 560,
    height: 190,
  });

  const endpoint = slider(el, { id: "endpoint", label: "Endpoint", min: -6, max: 6, step: 0.5, value: 2, show: true });
  const sign = chooser(el, {
    id: "sign",
    label: "Sign",
    choices: [
      { value: "<", label: "less than" },
      { value: "\u2264", label: "less than or equal to" },
      { value: ">", label: "greater than" },
      { value: "\u2265", label: "greater than or equal to" },
    ],
    value: ">",
  });
  const kind = chooser(el, {
    id: "kind",
    label: "Numbers allowed",
    choices: [
      { value: "real", label: "real numbers" },
      { value: "integer", label: "integers" },
      { value: "whole", label: "whole numbers" },
    ],
    value: "real",
  });

  function update() {
    const b = Number(endpoint.value);
    const rule = SIGNS[sign.value];
    const set = kind.value;
    const includes = (v) => (rule.right ? (rule.strict ? v > b : v >= b) : rule.strict ? v < b : v <= b);

    const MIN = -8;
    const MAX = 8;
    // `axis`, not `line`: the kit exports a `line()` mark, and a local binding of
    // that name shadowed it, so the call below threw and the figure never mounted.
    const axis = numberLine({ width: 560, height: 130, min: MIN, max: MAX, step: 17, label: "" });
    let drawing = axis.draw;

    if (set === "real") {
      // The shaded part runs from the endpoint to the end of the line.
      const from = rule.right ? b : MIN;
      const to = rule.right ? MAX : b;
      drawing += line({ x1: axis.x(from), y1: axis.y, x2: axis.x(to), y2: axis.y, class: "fig-accent", width: 6 });
    } else {
      const allowed = [];
      for (let v = MIN; v <= MAX; v += 1) {
        if (set === "whole" && v < 0) continue;
        if (includes(v)) allowed.push(v);
      }
      for (const v of allowed) drawing += circle({ cx: axis.x(v), cy: axis.y, r: 6, class: "fig-accent" });
    }

    drawing += rule.strict ? ring(axis.x(b), axis.y, 9) : circle({ cx: axis.x(b), cy: axis.y, r: 8, class: "fig-accent" });
    drawing += label({ x: axis.x(b), y: axis.y + 46, text: num(b), size: 18, class: "text-accent", weight: 600 });
    svg.innerHTML = drawing;

    const circleWord = rule.strict ? "open" : "closed";
    const sideWord = rule.right ? "greater than" : "less than";
    const start =
      set === "real"
        ? `Every real number ${sideWord} ${num(b)} belongs to the solution set.`
        : (() => {
            const allowed = [];
            for (let v = MIN; v <= MAX; v += 1) {
              if (set === "whole" && v < 0) continue;
              if (includes(v)) allowed.push(v);
            }
            if (!allowed.length) return `No ${set === "whole" ? "whole number" : "integer"} on this line belongs to the solution set.`;
            const shown = allowed.slice(0, 6).map(num).join(", ");
            // The list runs in ascending order, so the last member is where it stops —
            // not the end of the line, which is what a fixed MAX wrote for a
            // left-pointing set ("… and so on to 8" for x < 5).
            const last = allowed[allowed.length - 1];
            const more = allowed.length > 6 ? `, and so on to ${num(last)}` : "";
            return `The ${set === "whole" ? "whole numbers" : "integers"} in the solution set are ${shown}${more}. Each one is a dot, because only ${set === "whole" ? "whole numbers" : "integers"} are allowed, and the values between them are not in the set.`;
          })();

    readout.textContent =
      `x ${rule.text} ${num(b)}. ${start} ` +
      `The circle at ${num(b)} is ${circleWord}, because the sign is ${rule.text} and ${
        rule.strict ? `an open circle means ${num(b)} is not included` : `a closed circle means ${num(b)} is included`
      }. ` +
      (set === "real"
        ? `The shading runs to the ${rule.right ? "right" : "left"}, because the solution set is ${sideWord} ${num(b)}.`
        : `The dots run to the ${rule.right ? "right" : "left"}, because the solution set is ${sideWord} ${num(b)}.`);
  }

  react([endpoint, sign, kind], update);
}
