# SUB-AGENT BRIEF — author one chapter

You are authoring **one chapter** of an interactive GCSE Mathematics textbook
(England, 9-1). Everything you need is in the repository. Do not invent content
that is not on the curriculum, and do not touch work outside your chapter.

## Your input

Invoke with `CHAPTER_ID=<n>` (1–25). Read, in order:

1. `AGENTS.md` — the operative **chapter formula** (six principles, page
   contracts, budget). This is binding.
2. `research/pedagogy.md` — the evidence and its limits, so you do not overclaim.
3. `.agents/planning/plan.md` §4–§6 — folder conventions, content contract, interactivity policy.
4. `books/gcse-maths/curriculum.yaml` — find `chapters[?id=<n>]`. This is your scope: every section,
   its `tier`, its `dfe` references, and the chapter's `anchor`, `application`,
   `relevance_prompt` and `tool` metadata.
5. `CURRICULUM-MAP.md` — confirm exactly which DfE items you must deliver.
6. `.agents/planning/handoff.md` §3–§4 — interactivity tiers and the client-side compute constraints.
7. The primary sources in `sources/` (run `scripts/fetch_sources.sh` if empty):
   `dfe_content.txt`, `aqa_spec.txt`, `edexcel_spec.txt`, `ocr_spec.txt`. Use them
   to confirm scope and tier; quote nothing.
8. `PROBLEMS.md` — the problem-bank schema and its verification limits.

## Your deliverables

For every section `s` in your chapter:

```
books/gcse-maths/docs/Chapter <n>/Section <n.m>/Walkthrough/index.md
books/gcse-maths/docs/Chapter <n>/Section <n.m>/Guided books/gcse-maths/problems/index.md
books/gcse-maths/docs/Chapter <n>/Section <n.m>/Problems/index.md
```

Plus two chapter-level pages:

```
books/gcse-maths/docs/Chapter <n>/index.md      # anchor problem, outcomes, roadmap, relevance prompt
books/gcse-maths/docs/Chapter <n>/Review/index.md   # resolve the anchor, interleaved mixed practice
```

Replace the `<!-- scaffold:stub -->` pages. Keep the front matter (update it if the
scope genuinely shifted, but do not change `id`, `tier` or `dfe` without recording
why). Also:

- Update the chapter `books/gcse-maths/docs/Chapter <n>/index.md` with a real overview and section
  list; keep it short and navigational.
- Append any new terms to `books/gcse-maths/docs/Glossary/<strand>.md`, alphabetically, one
  definition each. Define a term once in the book.
- Add figures under `books/gcse-maths/docs/assets/figures/<slug>.js` (Tier 1) or generators under
  `figures/py/` writing to `figures/data/` (Tier 2). Only when they earn their keep.
- Add every worked solution and answer you rely on to
  `books/gcse-maths/problems/chapter-<n>.yaml`, with an independent `check` and, where you show
  steps, a `steps` chain. Run `python -m textbook.verify books/gcse-maths/problems/` — it must pass.
- Render the questions and answers with `:::problems <bank>` and
  `:::answers <bank>` instead of hand-writing them, so the reader sees exactly
  what CI verified. See PROBLEMS.md.
- Do **not** edit `books/gcse-maths/curriculum.yaml`, `nav.yml`, `CURRICULUM-MAP.md`, `.agents/planning/plan.md`, or
  any other chapter. `nav.yml` and the map are generated.

## Coverage — non-negotiable

Every DfE item in your chapter's `dfe` list must be explicitly taught and practised.
Each Walkthrough page names the items it delivers and shows at least one worked
example per item. Each Guided/Problems page includes items keyed to each item. If
you believe an item is misplaced, do not silently move it — finish the chapter and
raise it (see escalation).

## Content standards — the chapter formula

The binding rules are in `AGENTS.md`. In short: run an **interest arc**
(anchor → maintain → learner-constructed relevance → invite) and a **memory arc**
(explicit teaching → retrieval → spacing → interleaving) through the chapter.

- **Chapter opener (`index.md`):** the anchor problem with low-stakes first
  contact, a "by the end you'll…" outcome list, the roadmap, and the learner's
  relevance prompt.
- **Walkthrough:** prerequisites → objectives → teaching prose → worked examples
  (one line of reasoning per line of algebra) → a misconception callout → at most
  one guided figure (Predict → Test → Explain) → "you should now be able to…".
- **Guided problems:** a closed-book **retrieval starter** from earlier material,
  then problems that fade hint → step → full working using nested `<details>`.
- **Problems:** 8–15 items in increasing difficulty; later sections mix in earlier
  topics and ask "which method, and why?". Higher-only items marked **H**;
  answers and concise solutions in one collapsed block.
- **Review:** resolve the anchor problem and set interleaved mixed practice across
  the chapter and earlier chapters.
- **Budget:** hooks, applications and tools together ≤ ~¼ of the chapter.

- **Maths** is `$...$` / `$$...$$`, rendered to MathML at build time (no runtime
  JS). `aligned` works. No MathJax on the same page.
- **Language:** UK English, GCSE command words ("work out", "show that", "explain
  why", "give a reason"). Contexts should be plausible and varied, not filler.
- **Tier:** confirm each `F`/`H` tag against the AQA 8300 tier columns. Fixing a
  wrong tag is in scope; changing the scaffolded tag without evidence is not.
- **Accessibility:** headings in order, alt text on every figure, colour never the
  only signal, and every interactive control operable by keyboard.

## Interactivity

Default to Tier 0. Add a Tier-1 pure-JS figure on most Walkthrough pages where a
parameter can be manipulated (gradient, scale factor, right-triangle sides,
probability, distribution shape). Use Tier 2 only for heavy, finite, deterministic
sweeps, and prove determinism by regenerating. Tier 3/4 is almost never justified at
GCSE; if you reach for Pyodide, justify it in the chapter overview first.

## Definition of done — report evidence, do not assert

1. Every file listed above exists and contains no `scaffold:stub` marker.
2. `python -m textbook.verify books/gcse-maths/problems/` passes and `pytest tests/ -q` is green.
3. The prose follows `AGENTS.md` → Voice and language: no internal words (anchor
   problem, retrieval starter, tier, DfE codes), no shaming words, plain English,
   no negative contractions. Read every page aloud once; if you stumble, rewrite.
4. Every `dfe` item in your chapter appears in at least one Learn page and one
   practice page (grep the refs and show the result).
5. `python -m textbook.scaffold` reports your chapter's files as **skipped**,
   not rewritten.
6. `python -m textbook.pipeline --book gcse-maths --profile higher` succeeds and
   `grep -rl 'math-error' site/gcse-maths/higher --include='*.html'` prints nothing.
7. If you added a Tier-2 figure: regeneration is byte-identical.
8. Report the literal commands you ran and their literal output.

## Escalate (stop and hand back with evidence) if

- a DfE item cannot be taught at the section granularity you were given;
- the figure hook you were told to use does not exist or does not work;
- a tier tag conflicts with the AQA columns;
- covering a section honestly would require content outside the curriculum.

---

## A theorem you state without proof

The rule is in `AGENTS.md`: a result you state and do not prove must have a page
in the shared proof book, linked from the line that states it. This is the
procedure.

**1. Add it to `books/proofs/proofs.yaml`.**

```yaml
  - id: angles-in-a-polygon
    title: The angles in a polygon add to (n − 2) × 180°
    summary: >-
      Cut the polygon into triangles from one corner. Count how many, and the
      triangle proof does the rest.
    qualifications: [GCSE, A-level]
    strand: geometry
    figure: polygon-triangulation
```

- `id` is the directory name and the URL segment, so it is a slug.
- `qualifications` lists the courses **examined** on the proof. Write
  `qualifications: []` when it is in no course at this level — that is a real
  answer, and it makes the link say **Beyond your course** in every book. The key
  must be present: an empty list is a decision, a missing key is an oversight, and
  a test enforces the difference.
- `figure` only if you write one.

**2. Write `books/proofs/docs/<id>/index.md`.**

The proof a reader can follow, not the shortest one there is. Open with what they
need first, and where the result is beyond the course, say so in the prose as well
as in the label. If the proof needs a case you would rather skip — an obtuse
triangle, a negative number — prove it or say why it does not arise; a proof that
quietly only covers half the cases is not a proof.

**3. Put `:::prove <id>` on its own line where the result is stated.**

An id that is in no registry fails the build, the same way an unknown figure slug
does, so a typo is caught rather than rendering nothing.

**4. Where the proof is visual, add a figure.**

Sliders and toggles are welcome, and **Predict → Test → Explain** applies to a
proof as much as to any investigation: the page asks the reader to predict before
they move anything, and to explain what they saw afterwards. See
`.agents/skills/build-guided-figure/SKILL.md`.

**A definition is not a theorem. A convention is not a theorem.** The test is
whether a reader could reasonably ask *why*. If they could, the answer belongs in
the proof book rather than in a sentence they have to accept.
