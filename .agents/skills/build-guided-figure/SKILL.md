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
- The module is `books/<id>/docs/assets/figures/<slug>.js` — the filename **is**
  the slug. It exports `mount(el)`. An unknown slug fails the build.
- **No colour in the module.** Use the `fig-*` classes (`fig-accent`, `fig-warn`,
  `fig-good`, `fig-ink`, `fig-grid`) and the `--tb-*` tokens, so the figure
  adapts to every bundle and both schemes. A hard-coded colour is a bug.
- **No `$…$` in anything the module injects at runtime.** The maths hook runs at
  build time, so runtime LaTeX is not rendered. Use plain text or HTML.
- **Accessible.** Give the drawing `role="img"` and an `aria-label`. Put a live
  readout in `aria-live="polite"`. Every control is operable by keyboard: native
  `<input>` and `<button>` are the default, not `<div>` handlers. Never use
  colour as the only signal.

## Verify

```bash
uv run python -m pytest tests/ -q     # manifest coverage: every slug exists
uv run mkdocs build -f renderers/mkdocs/<book>.<profile>.yml --strict
node scripts/screenshot.cjs site ~/out --schemes light,dark -- \
  "learn:/<book>/<profile>/Chapter <n>/Section <n.m>/Walkthrough/"
```

Check the capture in both schemes, and check the captures actually differ — a
route that resolves to the same 404 page looks like a successful run. Confirm the
figure still works when it is the only thing on the page and with the keyboard
alone.
