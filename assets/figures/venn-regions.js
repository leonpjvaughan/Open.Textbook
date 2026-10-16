// Tier-1 guided investigation: the sets in a Venn diagram, and which parts of the
// diagram a set expression picks out.
//
// **The first module in the shared figure library.** Set notation is the same idea in
// GCSE Mathematics, in Junior Cycle Mathematics (8.4) and in Leaving Certificate
// Mathematics (10.4), and those books want the *same* figure for it — not two figures
// on the same topic, which is what the four earlier duplicates turned out to be. So it
// lives in `assets/figures/` and every book mounts it by its filename.
//
// The page asks the reader to read a region off the diagram and to say what an
// expression selects. So the figure has to make the *selection* visible: the reader
// picks an expression and every part of the diagram that is in it lights up. The
// region labels are placed by `venn()` from the geometry, because an atom in the wrong
// region would teach the opposite of the truth.
//
// Nothing here carries a colour. The selected atoms use the accent class and are also
// drawn larger, so the selection does not depend on colour alone.
import { SIZE, chooser, circle, fmt, label, panel, react, venn } from "./kit.js";

const TWO = [
  { id: "A", cx: 250, cy: 148, r: 88 },
  { id: "B", cx: 320, cy: 148, r: 88 },
];

const THREE = [
  { id: "A", cx: 280, cy: 126, r: 82 },
  { id: "B", cx: 228, cy: 204, r: 82 },
  { id: "C", cx: 332, cy: 204, r: 82 },
];

// Each expression is a predicate on the set of letters a region is inside, so the
// figure cannot disagree with the notation it prints.
const EXPRESSIONS = {
  2: [
    { value: "A", label: "A", text: "A", test: (s) => s.has("A") },
    { value: "B", label: "B", text: "B", test: (s) => s.has("B") },
    { value: "AB", label: "A ∩ B", text: "A ∩ B", test: (s) => s.has("A") && s.has("B") },
    { value: "AuB", label: "A ∪ B", text: "A ∪ B", test: (s) => s.has("A") || s.has("B") },
    { value: "notA", label: "A′", text: "A′", test: (s) => !s.has("A") },
    { value: "notAuB", label: "(A ∪ B)′", text: "(A ∪ B)′", test: (s) => !s.has("A") && !s.has("B") },
  ],
  3: [
    { value: "A", label: "A", text: "A", test: (s) => s.has("A") },
    { value: "AB", label: "A ∩ B", text: "A ∩ B", test: (s) => s.has("A") && s.has("B") },
    { value: "ABC", label: "A ∩ B ∩ C", text: "A ∩ B ∩ C", test: (s) => s.has("A") && s.has("B") && s.has("C") },
    { value: "AuBuC", label: "A ∪ B ∪ C", text: "A ∪ B ∪ C", test: (s) => s.has("A") || s.has("B") || s.has("C") },
    { value: "notA", label: "A′", text: "A′", test: (s) => !s.has("A") },
    { value: "notAny", label: "(A ∪ B ∪ C)′", text: "(A ∪ B ∪ C)′", test: (s) => !s.has("A") && !s.has("B") && !s.has("C") },
  ],
};

// Every atom of the diagram: the regions the circles divide the frame into.
function atomsFor(ids) {
  const atoms = [];
  for (let mask = 0; mask < 1 << ids.length; mask += 1) {
    const inside = ids.filter((_, i) => mask & (1 << i));
    atoms.push({
      id: inside.join("") || "outside",
      in: inside,
      out: ids.filter((id) => !inside.includes(id)),
      letters: new Set(inside),
      text: inside.length ? inside.join(" ∩ ") : "none of them",
    });
  }
  return atoms;
}

export function mount(el) {
  const { svg, readout } = panel(el, {
    label:
      "A Venn diagram whose selected region changes with the expression chosen. The number of sets and the expression are set below",
    description:
      "Two or three overlapping circles inside a rectangle standing for the universal set. Each part of " +
      "the diagram is labelled with the sets it belongs to, and choosing an expression highlights every " +
      "part that is in it.",
    width: 560,
    height: 300,
  });

  const many = chooser(el, {
    id: "sets",
    label: "Sets",
    name: "How many sets the diagram shows",
    choices: [
      { value: "2", label: "Two, A and B" },
      { value: "3", label: "Three, A, B and C" },
    ],
    value: "2",
  });

  const pick = chooser(el, {
    id: "expression",
    label: "Show",
    name: "The set expression to highlight",
    choices: EXPRESSIONS[2],
    value: "A",
  });

  function update() {
    const count = Number(many.value);
    const ids = count === 3 ? ["A", "B", "C"] : ["A", "B"];
    const circles = count === 3 ? THREE : TWO;
    const atoms = atomsFor(ids);

    // The expression list depends on how many sets there are, so the chooser is
    // refilled rather than rebuilt — replacing it would lose the reader's focus.
    if (pick.options.length !== EXPRESSIONS[count].length) {
      pick.replaceChildren();
      for (const choice of EXPRESSIONS[count]) {
        const option = document.createElement("option");
        option.value = choice.value;
        option.textContent = choice.label;
        pick.append(option);
      }
      pick.value = EXPRESSIONS[count][0].value;
    }
    const chosen = EXPRESSIONS[count].find((e) => e.value === pick.value) || EXPRESSIONS[count][0];

    const diagram = venn({ circles, regions: atoms, labels: false });
    let drawing = diagram.draw;

    for (const atom of atoms) {
      const point = diagram.points[atom.id];
      if (!point) continue;
      const on = chosen.test(atom.letters);
      drawing += circle({ cx: point.x, cy: point.y, r: on ? 9 : 6, class: on ? "fig-accent" : "fig-ink" });
      drawing += label({
        x: point.x,
        y: point.y + 22,
        text: atom.id === "outside" ? "outside" : atom.text,
        size: SIZE.tick,
        class: on ? "text-accent" : "text-ink",
      });
    }

    svg.innerHTML = drawing;

    const selected = atoms.filter((atom) => chosen.test(atom.letters));
    const named = selected.map((atom) => (atom.id === "outside" ? "outside all of them" : atom.text));
    readout.textContent =
      `${count === 3 ? "Three" : "Two"} sets. ${chosen.text} contains ${selected.length} of the ` +
      `${atoms.length} parts: ${named.join("; ")}.`;
  }

  react([many, pick], update);
}
