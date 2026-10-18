// Tier-1 guided investigation: prime factorisation as a tree.
//
// Section 3.2 writes a number as a product of primes by dividing by the smallest
// prime that goes in. The tree is the same fact drawn instead of written: each
// composite splits into the smallest prime that divides it and what is left, and the
// splitting stops when every branch ends in a prime. The trap the page names — a
// composite left in the answer — is a branch that has not been split, which the
// reader can see.
//
// The primes are round and the composites are square, so the finished factorisation
// is legible without reading a single number.
//
// Nothing here carries a colour. Every shape uses a `fig-*` class and every word a
// `text-*` class, so the figure follows the reader's theme in both schemes.
import { fmt, label, line, panel, react, rect, circle, slider } from "./kit.js";

const SUPERSCRIPT = { 0: "\u2070", 1: "\u00b9", 2: "\u00b2", 3: "\u00b3", 4: "\u2074", 5: "\u2075", 6: "\u2076", 7: "\u2077", 8: "\u2078", 9: "\u2079" };
const sup = (n) => String(n).split("").map((d) => SUPERSCRIPT[d]).join("");

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i += 1) if (n % i === 0) return false;
  return true;
};

const smallestPrime = (n) => {
  for (let i = 2; i * i <= n; i += 1) if (n % i === 0) return i;
  return n;
};

/** A factor tree: a composite splits into its smallest prime and what is left. */
function build(n) {
  if (isPrime(n)) return { n, prime: true, children: [] };
  const p = smallestPrime(n);
  return { n, prime: false, children: [{ n: p, prime: true, children: [] }, build(n / p)] };
}

export function mount(el) {
  const { svg, readout, claim } = panel(el, {
    label: "A factor tree for a whole number, with the primes drawn as circles and the composite numbers as squares",
    description:
      "Each composite number splits into the smallest prime that divides it and the number left over. " +
      "The primes are the round shapes at the ends of the branches, and they are the prime factorisation " +
      "of the number at the top.",
    prompt: "Predict which prime the tree will split by first, then change the number and check.",
    width: 560,
    height: 360,
  });

  const number = slider(el, { id: "number", label: "Number", min: 12, max: 100, step: 1, value: 96, show: true });

  function update() {
    const n = Number(number.value);
    const root = build(n);

    // A leaf takes the next column; a node sits over the middle of its children.
    let columns = 0;
    const walk = (node, depth) => {
      node.depth = depth;
      if (!node.children.length) {
        node.col = columns;
        columns += 1;
        return node.col;
      }
      const cols = node.children.map((child) => walk(child, depth + 1));
      node.col = (cols[0] + cols[cols.length - 1]) / 2;
      return node.col;
    };
    walk(root, 0);

    const left = 64;
    const right = 560 - 64;
    const spacing = columns > 1 ? (right - left) / (columns - 1) : 0;
    const at = (node) => ({
      x: columns > 1 ? left + node.col * spacing : 280,
      y: 46 + node.depth * 50,
    });

    let drawing = "";
    const drawEdges = (node) => {
      const from = at(node);
      for (const child of node.children) {
        const to = at(child);
        drawing += line({ x1: from.x, y1: from.y, x2: to.x, y2: to.y, class: "fig-ink", width: 1.6 });
        drawEdges(child);
      }
    };
    drawEdges(root);

    const drawNodes = (node) => {
      const { x, y } = at(node);
      const text = label({ x, y: y + 6, text: fmt(node.n, 0), size: node.prime ? 17 : 16, class: "text-ink" });
      if (node.prime) {
        drawing += circle({ cx: x, cy: y, r: 19, class: "fig-good" });
      } else {
        drawing += rect({ x: x - 23, y: y - 18, width: 46, height: 36, class: "fig-accent", opacity: 0.3 });
      }
      drawing += text;
      node.children.forEach(drawNodes);
    };
    drawNodes(root);
    svg.innerHTML = drawing;

    // The primes in order, with their repeats counted for the index form.
    const primes = [];
    const collect = (node) => {
      if (node.prime) primes.push(node.n);
      else node.children.forEach(collect);
    };
    collect(root);
    primes.sort((a, b) => a - b);

    if (primes.length === 1) {
      readout.textContent =
        `${fmt(n, 0)} is prime, so it has no factor tree to draw. Its only factors are 1 and itself.`;
      // Nothing is multiplied out in this case, so nothing is asserted. Declared empty
      // rather than left over from the last redraw: a stale claim would be checked
      // against a readout that never printed it.
      claim([]);
      return;
    }

    const counts = new Map();
    for (const p of primes) counts.set(p, (counts.get(p) || 0) + 1);
    const indexForm = [...counts].map(([p, c]) => (c === 1 ? `${p}` : `${p}${sup(c)}`)).join(" \u00d7 ");
    const factorCount = [...counts.values()].reduce((product, c) => product * (c + 1), 1);
    const countSum = [...counts.values()].map((c) => c + 1).join(" \u00d7 ");

    readout.textContent =
      `${fmt(n, 0)} = ${primes.join(" \u00d7 ")} = ${indexForm} in index form. ` +
      `The tree stops at the ${primes.length} primes, and there is no composite number left on any branch. ` +
      `The number of factors is ${countSum} = ${factorCount}.`;

    // The tree states a product and a count, and both are declared. The product is the
    // chain of primes the branches end in — the factorisation itself, not a summary of
    // it — so a branch that stopped one prime early fails here even though the drawing
    // would still look like a tree. The count is `(exponent + 1)` multiplied out, which
    // is the rule the page teaches, written as the multiplications it is made of.
    claim([
      {
        label: "prime factorisation",
        expression: primes.join(" * "),
        values: {},
        answer: n,
        shown: fmt(n, 0),
      },
      {
        label: "number of factors",
        expression: [...counts.values()].map((c) => `(${c} + 1)`).join(" * "),
        values: {},
        answer: factorCount,
        shown: fmt(factorCount, 0),
      },
    ]);
  }

  react(number, update);
}
