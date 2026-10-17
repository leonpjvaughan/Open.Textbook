# AGENTS.md — Leaving Certificate Physics

Read the root `AGENTS.md` and `books/AGENTS.md` first. This file adds what is particular
to this book.

**Leaving Certificate Physics**, `O`/`H`. **The specification introduced in September 2025
governs it.** The syllabus it replaced was examined for the last time in June 2026, so a
chapter written from the old document would already be wrong. The evidence, including the
dates and how they were established, is in `research/curriculum/ie-curriculum.md`.

## What is different from the English books

- **40% of the assessment is an investigation**, not a written paper, and Chapter 22
  teaches it. That is a larger practical component than either English Physics book has.
- **Chapter 1 is the Unifying strand made concrete**: measuring, modelling and
  investigating. It is not an introduction to the other chapters — it is the process they
  are all applied through.
- **The exam changed shape in 2025**: Section A was 80 marks and is now 120, Section B 280,
  for 400 in total. Older papers will not match the book's specification.
- **The SEC Formulae and Tables booklet supplies the formulae.** A page must not ask a
  reader to recall what they are given.

## Traps local to this book

- **`sympy` and `units`.** `dimensions` proves the magnitude *and* the unit; `sigfigs`
  proves the rounding. A physics answer of `6` where the data support two figures is wrong,
  and the bank says so.
- **Significant figures are a claim, not a style.** `6.0 N` says the reading was good to two
  figures. Use `sigfig()` from the kit when a figure prints an answer.
- **`$…$` at build time, plain text at runtime.** A figure that labels a value writes it in
  plain text; the maths hook does not run in the browser.

## Figures

Nineteen for 22 chapters, and the coverage is uneven on purpose: electricity, magnetism and
modern physics are close to one per chapter, while mechanics, heat and waves have gaps.
`ideas.md` lists gravity, sound and the electromagnetic spectrum as the next three, and
`vectorField()` in the kit is what the field diagrams draw with.
