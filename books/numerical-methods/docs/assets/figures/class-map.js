// The map, drawn once and then walked.
//
// **Why this is a stepper and not a diagram.** `diagram()` is the primitive for a
// drawing whose meaning is its named parts: the reader moves through buttons and
// the drawing follows. That is the wrong shape here. The map's meaning is its
// *edges* — which question leads to which box — and a reader has to be able to see
// all of them at once before walking any of them. So the figure mounts showing the
// whole tree, every edge present and every box named, and the control narrows it.
//
// **The links are root-absolute.** A leaf is the page that the branch lands on, and
// a relative href would resolve against whichever page the figure is mounted on. An
// absolute one survives being moved, and it is what `:::prove` does for the same
// reason: the target is a page in a known place, not a page next door.
//
// **Nothing here chooses a number.** The figure states the shape of the argument,
// not any quantity, so there is nothing to declare through `claim()`.
import { SIZE, circle, label, line, panel, rect, stepper } from "./kit.js";

// --- the layout ---------------------------------------------------------------
//
// A vertical spine at x = 34 carries the five questions; leaves sit in a column at
// x = 330 and are fed from a bus at x = 310. A question with two outcomes gets two
// stubs off its bus; a question with none (Q2) has no bus, and its "yes" branch is
// a bracket down the left margin so that it visibly skips Q3 and Q4.

const SPINE = 34;
const BUS = 310;
const BOX = 330;
const BOX_W = 200;
const BOX_H = 26;
const FEED = 220;

const QUESTIONS = [
  { key: "q1", y: 56, text: "What do you want?", note: "start here" },
  { key: "q2", y: 164, text: "Does it move?" },
  { key: "q3", y: 232, text: "Is it everywhere?" },
  { key: "q4", y: 300, text: "What does it cost?" },
  { key: "q5", y: 384, text: "Does it remember?" },
];

// `slug` is the page the box links to. `centre` is where its stub meets the bus.
const LEAVES = {
  q1: [
    { key: "optimisation", y: 34, text: "Optimisation" },
    { key: "averaging", y: 68, text: "Averaging" },
    { key: "eigenvalue", y: 102, text: "Eigenvalues" },
  ],
  q3: [
    { key: "linear-system", y: 212, text: "Linear system" },
    { key: "root", y: 256, text: "Root finding" },
  ],
  q4: [
    { key: "saddle-point", y: 288, text: "Saddle point" },
    { key: "elliptic", y: 332, text: "Elliptic" },
  ],
  q5: [
    { key: "parabolic", y: 366, text: "Parabolic" },
    { key: "hyperbolic", y: 410, text: "Hyperbolic" },
  ],
};

// --- the steps ----------------------------------------------------------------
//
// Each step is the question being asked, the elements it brings forward, and the
// boxes a reader may stop at there. The links are on every step rather than only
// the last: a reader who already knows the answer is "the best one" should not have
// to walk four more questions to be given the page.

const STEPS = [
  {
    text: "The whole map. Five questions, nine boxes. Start at the top and take the branch that matches your model.",
    active: [],
    links: [],
  },
  {
    text: "What do you want? The best choice, a likelihood, a set of allowed values, or the state that obeys the rules. This question is about your system, not about the mathematics, so you can answer it before you solve anything.",
    active: ["q1", "optimisation", "averaging", "eigenvalue", "b-q1"],
    links: ["optimisation", "averaging", "eigenvalue"],
  },
  {
    text: "Does it move? Look for a rate of change in the model. With no derivative in it, the answer is settled, and you want one of the two steady boxes below.",
    active: ["q2", "b-q2-no", "b-q2-yes", "s-q1q2"],
    links: [],
  },
  {
    text: "Is it everywhere? One unknown at a point, or one at every point in a region. A finite list means the rules are equations at a point — and whether they are linear decides the whole method. Linear: one matrix, and the work is the solve. Not linear: a Jacobian, a start, and a loop.",
    active: ["q3", "linear-system", "root", "b-q3", "s-q3q4"],
    links: ["linear-system", "root"],
  },
  {
    text: "What does it cost? Is there a rule that has to hold everywhere, paid for by a second unknown — a pressure, a force, a price? If there is, it is a saddle point. If not, the operator is elliptic.",
    active: ["q4", "saddle-point", "elliptic", "b-q4", "s-q4q5"],
    links: ["saddle-point", "elliptic"],
  },
  {
    text: "Does it remember? Follow a disturbance forward. If it smooths and decays, the answer forgets where it started. If it travels along paths and keeps its shape, it remembers.",
    active: ["q5", "parabolic", "hyperbolic", "b-q5", "b-q2-yes"],
    links: ["parabolic", "hyperbolic"],
  },
];

// --- drawing ------------------------------------------------------------------

const PAGE = (slug) => `/numerical-methods/${slug}/`;

/**
 * One frame of the tree, with `active` keys drawn in the accent colour.
 *
 * Rebuilt rather than class-toggled: there are thirty elements and a redraw on a
 * slider drag is cheaper than a second source of truth about which element is on.
 */
function draw(active) {
  const on = (key) => active.includes(key);
  const edge = (key) => (on(key) ? "fig-line" : "fig-grid");
  const word = (key) => (on(key) ? "text-accent" : "text-ink");
  const parts = [];

  // The spine, in segments, so the step that walks it can light the part it means.
  parts.push(line({ x1: SPINE, y1: QUESTIONS[0].y, x2: SPINE, y2: QUESTIONS[1].y, class: edge("s-q1q2"), width: 2 }));
  parts.push(line({ x1: SPINE, y1: QUESTIONS[1].y, x2: SPINE, y2: QUESTIONS[2].y, class: edge("b-q2-no"), width: 2 }));
  parts.push(line({ x1: SPINE, y1: QUESTIONS[2].y, x2: SPINE, y2: QUESTIONS[3].y, class: edge("s-q3q4"), width: 2 }));
  parts.push(line({ x1: SPINE, y1: QUESTIONS[3].y, x2: SPINE, y2: QUESTIONS[4].y, class: edge("s-q4q5"), width: 2 }));
  parts.push(
    `<path d="M${SPINE} 164 L16 164 L16 384 L${SPINE} 384" class="${edge("b-q2-yes")}" style="fill:none" stroke-width="2"></path>`,
  );
  parts.push(label({ x: 10, y: 274, text: "yes", size: SIZE.tick, class: word("b-q2-yes"), rotate: -90 }));
  parts.push(label({ x: SPINE + 8, y: 196, text: "no", size: SIZE.tick, class: word("b-q2-no"), anchor: "start" }));

  for (const question of QUESTIONS) {
    parts.push(circle({ cx: SPINE, cy: question.y, r: 5, class: on(question.key) ? "fig-accent" : "fig-ink" }));
    parts.push(
      label({
        x: SPINE + 14,
        y: question.y + 5,
        text: question.text,
        size: SIZE.label,
        class: word(question.key),
        anchor: "start",
      }),
    );
  }

  // One bus and its stubs per question that has leaves.
  for (const [key, leaves] of Object.entries(LEAVES)) {
    const question = QUESTIONS.find((q) => q.key === key);
    const bus = `b-${key}`;
    parts.push(line({ x1: FEED, y1: question.y, x2: BUS, y2: question.y, class: edge(bus), width: 2 }));
    if (leaves.length > 1) {
      const top = leaves[0].y;
      const bottom = leaves[leaves.length - 1].y;
      parts.push(line({ x1: BUS, y1: top, x2: BUS, y2: bottom, class: edge(bus), width: 2 }));
    }
    for (const leaf of leaves) {
      parts.push(line({ x1: BUS, y1: leaf.y, x2: BOX, y2: leaf.y, class: edge(bus), width: 2 }));
      parts.push(
        rect({
          x: BOX,
          y: leaf.y - BOX_H / 2,
          width: BOX_W,
          height: BOX_H,
          class: on(leaf.key) ? "fig-line" : "fig-grid",
        }),
      );
      parts.push(
        label({
          x: BOX + 12,
          y: leaf.y + 6,
          text: leaf.text,
          size: SIZE.label,
          class: word(leaf.key),
          anchor: "start",
        }),
      );
    }
  }

  return parts.join("");
}

/** `Optimisation` and `Averaging` are both reachable from step one. */
function linksFor(slugs) {
  if (!slugs.length) return "";
  const items = slugs.map((slug) => {
    const leaf = Object.values(LEAVES)
      .flat()
      .find((entry) => entry.key === slug);
    return `<a href="${PAGE(slug)}">${leaf ? leaf.text : slug}</a>`;
  });
  return ` Stop here: ${items.join(", ")}.`;
}

export function mount(el) {
  const { svg, readout, controls, caption } = panel(el, {
    label: "A decision tree for finding the kind of problem a model has become",
    description:
      "Five questions, asked in order, narrow a model to one of eight kinds of problem. " +
      "What do you want? Does it move? Is it everywhere? What does it cost? Does it remember? " +
      "Each branch ends in a box: optimisation, averaging, eigenvalues, linear system, root " +
      "finding, elliptic, saddle point, parabolic, hyperbolic.",
    width: 560,
    height: 440,
  });
  if (!svg) throw new Error("class-map: the frame has no drawing surface");

  caption.textContent =
    "Step 0 draws the whole map. Each step narrows it to the question being asked.";

  const input = stepper(controls, {
    steps: STEPS,
    label: "Question",
    id: "class-map-step",
  });

  const render = () => {
    const step = STEPS[input.index] || STEPS[0];
    svg.innerHTML = draw(step.active);
    readout.innerHTML = `${step.text}${linksFor(step.links)}`;
  };

  input.addEventListener("input", render);
  render();
}
