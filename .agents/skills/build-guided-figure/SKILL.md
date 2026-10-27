---
name: build-guided-figure
description: Build a guided investigation figure for a textbook page — Predict → Test → Explain, no unguided sandbox, a Tier-1 pure-JS module mounted by the :::figure directive, themed with fig-* classes and operable by keyboard. Use when adding or revising an interactive figure, tool, or investigation in a Learn page.
---

# Build a guided figure

No unguided sandbox. Every investigation is a lesson with three beats, and the
explanation is prompted, not shown. A decorative figure is worse than none.

## Choose the tier first

Default to Tier 0 (prose plus build-time maths). Add the cheapest tier that earns
its keep.

- **Tier 1 — pure JS.** The expected figure when a parameter is worth
  manipulating: a slider for place value, a scale factor, a gradient, a
  probability, a distribution shape.
- **Tier 2 — build-time Python → committed JSON → JS animates.** Only for heavy
  but finite, deterministic sweeps. Determinism is a requirement: regenerate and
  confirm a byte-identical diff.
- **Tier 3/4 — Pyodide.** Almost never justified at GCSE. Never make a Tier-3
  page the entry point of a chapter.

At most one guided figure per Learn page. A figure does not count as teaching.

## Write the three beats into the page

Around the `:::figure <slug>` directive, write the investigation so the reader
runs it:

1. **Predict first.** "Before moving the controls, predict…" The prediction must
   be written down before the figure is touched.
2. **Test.** "Now move the sliders and check." Say what to vary and what to
   watch.
3. **Explain.** Ask the reader to explain *why*, in words. Do not print the
   explanation for them.

## Build the module

- The directive is line-anchored: `:::figure <slug>`. Only the directive
  triggers the per-page loader; raw `<maths-figure>` HTML does not.
- The kit itself is TypeScript: `assets/figures/src/kit/*.ts`, compiled to
  `assets/figures/kit/*.js` by `node tools/build.mjs kit`. A figure module stays plain
  JavaScript — it is content, and it imports the compiled `./kit.js` like any other.
- The module is `books/<id>/docs/assets/figures/<slug>.js` — the filename **is**
  the slug. It exports `mount(el)`. An unknown slug fails the build.
- **A figure more than one book wants identically goes in the shared library**,
  `assets/figures/<slug>.js`, and every book mounts it by that name. A book may not
  shadow a shared slug; the build raises. It is for a *generic tool* — the same set
  diagram, the same number line, the same slope field — not for merging two books'
  takes on one topic, which usually serve different readers.
- **Import the kit's layers, not its whole surface.** `panel` and `react` from
  `./kit.js`; `SIZE`, `label`, `fmt`, `sigfig` for text; `axes`, `line`, `curve`,
  `graph`, `area`, `bars`, `dots` for the drawing; `slider`, `chooser`, `segmented`,
  `toggle`, `button`, `field` for controls; `stepper`, `table`, `animate`, `seed`,
  `check` for behaviour; `draggable` for a handle. The layer map is in
  `assets/AGENTS.md`.
- **Draw through the marks, not a `<text>` or a raw coordinate.** `axes()` returns its
  mappers, so a module draws with the same geometry the axes used. `label()` carries the
  colour class by default, which a hand-written `<text>` does not — that is the defect
  found eighteen times. `sigfig()` is for a rounded answer and `seed()` for randomness.
- **No colour in the module.** Use the `fig-*` classes (`fig-accent`, `fig-warn`,
  `fig-good`, `fig-ink`, `fig-grid`) and the `--tb-*` tokens, so the figure
  adapts to every bundle and both schemes. A hard-coded colour is a bug.
- **No `$…$` in anything the module injects at runtime.** The maths hook runs at
  build time, so runtime LaTeX is not rendered. Use plain text or HTML.
- **Accessible.** Give the drawing `role="img"` and an `aria-label` — `panel` does
  both — and put a live readout in `aria-live="polite"`, which `panel` also does.
  Every control is a native element built by the kit, so it is keyboard-operable and
  has a visible label and an accessible name. Never use colour as the only signal. A
  draggable handle needs its backing control; `draggable()` throws without one.

## Verify

```bash
node tools/dist/cli.js kit-pure                  # the drawing and formatting layers, no browser
uv run python -m pytest tests/ -q                # manifest coverage, the kit's pure contract
uv run python -m textbook.pipeline --book <book> --profile <profile>
node tools/dist/cli.js kit site                  # the DOM contract, needs a browser
node tools/dist/cli.js screenshot site ~/out --schemes light,dark -- \
  "learn:/<book>/<profile>/chapter-<n>/section-<n.m>/learn/"
```

Check the capture in both schemes, and check the captures actually differ — a
route that resolves to the same 404 page looks like a successful run. Confirm the
figure still works when it is the only thing on the page and with the keyboard
alone.
