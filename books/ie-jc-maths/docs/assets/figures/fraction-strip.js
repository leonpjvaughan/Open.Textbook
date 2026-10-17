// A fraction strip with an adjustable part count, and the common denominator that
// lets two fractions be added.
//
// Section 5.2 teaches that fractions can only be added once their parts are the
// same size. That is a sentence a reader can repeat and still not believe, so the
// figure shows it: two strips cut into different numbers of parts sit above a
// third strip cut into a number that suits both, and the two shaded amounts line
// up on that one scale. The reader changes the part counts and watches the third
// strip follow.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { fmt, label, panel, react, rect, slider } from "./kit.js";

// The drawing geometry: one whole is `W` units wide, and every strip starts at X0.
const W = 460;
const X0 = 62;
const H = 34;

/** The highest common factor, used to find the lowest common denominator. */
function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "Two fraction strips cut into different numbers of parts, with a third strip below cut into a common number of parts",
    description:
      "The first strip is cut into one number of equal parts and the second into another. The shaded " +
      "amount of each strip is the fraction chosen with the controls. A third strip is cut into a " +
      "number of parts that suits both, so the two shaded amounts can be read on one scale and added.",
    prompt: "Predict whether the total changes when you cut both strips into more equal parts. Then test it.",
    width: 560,
    height: 300,
  });

  const denA = slider(el, { id: "denA", label: "Parts in the first strip", min: 2, max: 8, step: 1, value: 3, show: true });
  const numA = slider(el, { id: "numA", label: "Shaded parts in the first strip", min: 0, max: 3, step: 1, value: 2, show: true });
  const denB = slider(el, { id: "denB", label: "Parts in the second strip", min: 2, max: 8, step: 1, value: 4, show: true });
  const numB = slider(el, { id: "numB", label: "Shaded parts in the second strip", min: 0, max: 4, step: 1, value: 1, show: true });

  // Keep each numerator inside its own denominator, so a strip never tries to
  // shade a part that is not there.
  function limit() {
    for (const [den, num] of [[denA, numA], [denB, numB]]) {
      num.max = den.value;
      if (Number(num.value) > Number(den.value)) {
        num.value = den.value;
        num.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  }
  denA.addEventListener("input", limit);
  denB.addEventListener("input", limit);

  /** One strip, cut into `parts` equal pieces, with the first `shaded` filled. */
  function strip(y, parts, shaded, cls) {
    let drawing = "";
    for (let i = 0; i < parts; i += 1) {
      if (i < shaded) {
        drawing += rect({ x: X0 + (i * W) / parts, y, width: W / parts, height: H, class: cls, opacity: 0.4 });
      }
    }
    for (let i = 0; i < parts; i += 1) {
      drawing += rect({ x: X0 + (i * W) / parts, y, width: W / parts, height: H, class: "fig-grid" });
    }
    return drawing;
  }

  function update() {
    const a = Number(denA.value);
    const p = Number(numA.value);
    const b = Number(denB.value);
    const q = Number(numB.value);

    // The lowest common denominator, and each fraction written over it.
    const common = (a * b) / gcd(a, b);
    const firstParts = (p * common) / a;
    const secondParts = (q * common) / b;
    const total = firstParts + secondParts;
    const wholes = Math.max(1, Math.ceil(total / common));

    let drawing = "";
    drawing += label({ x: X0 - 10, y: 26 + H / 2 + 5, text: `${p}/${a}`, anchor: "end", class: "text-accent" });
    drawing += strip(26, a, p, "fig-accent");
    drawing += label({ x: X0 - 10, y: 82 + H / 2 + 5, text: `${q}/${b}`, anchor: "end", class: "text-good" });
    drawing += strip(82, b, q, "fig-good");

    drawing += label({ x: X0, y: 150, text: `Both strips cut into ${common} equal parts`, anchor: "start", class: "text-ink" });
    for (let w = 0; w < wholes; w += 1) {
      const y = 160 + w * (H + 10);
      for (let i = 0; i < common; i += 1) {
        const index = w * common + i;
        if (index >= total) break;
        drawing += rect({
          x: X0 + (i * W) / common,
          y,
          width: W / common,
          height: H,
          class: index < firstParts ? "fig-accent" : "fig-good",
          opacity: 0.4,
        });
      }
      for (let i = 0; i < common; i += 1) {
        drawing += rect({ x: X0 + (i * W) / common, y, width: W / common, height: H, class: "fig-grid" });
      }
    }
    drawing += label({ x: X0 - 10, y: 160 + H / 2 + 5, text: `${total}/${common}`, anchor: "end", class: "text-ink" });
    svg.innerHTML = drawing;

    const decimal = p / a + q / b;
    if (a === b) {
      readout.textContent =
        `Both strips already have ${fmt(a, 0)} equal parts, so the parts match. ` +
        `Add the shaded parts: ${fmt(p, 0)} plus ${fmt(q, 0)} is ${fmt(p + q, 0)}, giving ${p + q}/${a}. ` +
        `As a decimal that is ${fmt(decimal, 3)}.`;
    } else {
      readout.textContent =
        `${p}/${a} is the same as ${firstParts}/${common}, and ${q}/${b} is the same as ${secondParts}/${common}. ` +
        `Both strips are now cut into ${fmt(common, 0)} equal parts, so the total is ${total}/${common}. ` +
        `As a decimal that is ${fmt(decimal, 3)}.`;
    }
    if (total > common) {
      readout.textContent += " The total is more than one whole.";
    }
  }

  react([denA, numA, denB, numB], update);
}
