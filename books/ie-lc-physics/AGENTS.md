# AGENTS.md — Leaving Certificate Physics

Read the root `AGENTS.md` and `books/AGENTS.md` first; this file adds what is
particular to this book.

**Leaving Certificate Physics**, `O`/`H`. **The September 2025 specification
governs it**; the syllabus it replaced was last examined in June 2026, so a
chapter written from the old document is already wrong.

## What is different from the English books

- **40% of the assessment is an investigation**, not a written paper; Chapter 22
  teaches it.
- **Chapter 1 is the Unifying strand made concrete** — measuring, modelling and
  investigating. It is the process the other chapters are applied through, not an
  introduction to them.
- **The SEC Formulae and Tables booklet supplies the formulae.** Never ask a
  reader to recall what they are given.
- The examination is 400 marks: Section A 120, Section B 280. Older papers do not
  match this specification.

## Traps local to this book

- **`sympy` and `units`.** `dimensions` proves the magnitude *and* the unit;
  `sigfigs` proves the rounding. A physics answer of `6` where the data support
  two figures is wrong, and the bank says so.
- **Significant figures are a claim, not a style.** `6.0 N` says the reading was
  good to two figures. Use `sigfig()` from the kit when a figure prints an answer.
- **`$…$` at build time, plain text at runtime.** A figure that labels a value
  writes it in plain text; the maths hook does not run in the browser.

## Figures

Coverage is uneven on purpose: electricity, magnetism and modern physics run near
one per chapter, while mechanics, heat and waves have gaps. `ideas.md` lists
gravity, sound and the electromagnetic spectrum next; field diagrams draw with
`vectorField()` in the kit.
