# Theme direction mocks

Design exploration for how far the books should diverge. **Nothing here is
published**; it exists so a direction can be chosen by looking at it rather than
by describing it.

The mocks link the real `assets/stylesheets/extra.css`, so each direction is the
house token layer with overrides applied — not a drawing of what it might look
like. Whatever survives review is implemented as data in `book.yaml → theme`
(for B and C) or in a book's authored `book-local.css` (for D and E).

## The directions

| | Direction | What it tests | How it would be implemented |
|---|---|---|---|
| **A** | House | The baseline: warm paper, blue accent | Nothing — this is today |
| **B** | Shared core, subject tint | How far a hue alone carries a subject's identity | `theme.<scheme>.accent` per book — pure data |
| **C** | Shared core, subject temperature | The tint *plus* paper, ink and rules moved | The token set per book — still pure data |
| **D** | Subject-native | A recognisably physics working page: blueprint grid, monospace labels, amber highlight | Tokens plus `book-local.css` for the components |
| **E** | Editorial print | The other extreme: high-contrast serif, boxed rules, one red accent | Tokens plus `book-local.css` |
| **F** | Tint board | The same components in mathematics, physics and chemistry hues | A comparison of B, not a separate direction |

## What the mock contains

Every direction renders the same lesson, so the comparison is of treatment and
not of content: a lead, the chapter problem, a worked example with reasoning, a
misconception callout, a figure with a grid canvas, a practice list with a
Higher-only chip, and a collapsed answer block.

## Regenerating

```bash
python research/design/make_mocks.py                 # writes var/mockups/
node scripts/screenshot.cjs var/mockups ~/out --schemes light,dark -- \
  "A-house:/a-house" "B-subject-tint:/b-tint" "C-subject-temperature:/c-temperature" \
  "D-subject-native:/d-native" "E-editorial-print:/e-print" "F-tint-board:/tint-board"
```

Images land in `~/out`, in light and dark. `var/` is git-ignored scratch.

## Reading the trade-offs

- **A–B–C cost nothing to maintain.** They are token values in one file per book;
  the design system stays shared and every improvement to it reaches every book.
- **D is where "personality" starts to cost.** The grid, the letter-spaced
  uppercase headings and the monospace labels are component changes, so they live
  in that book's `book-local.css`. Each one is a rule the shared design system
  cannot improve for anyone else.
- **E is the informative extreme.** It is attractive and it demonstrates that a
  genuinely different personality is reachable — but it changes the reading
  experience for a 14–16 audience (lower-contrast rules, serif body, tighter
  measure) and it makes the collection look like a set of unrelated books.
- **Tint alone (B) is not enough for a subject's identity** once two subjects sit
  side by side on the landing page; **temperature (C) is enough**, and it is
  still pure data.

The recommendation that follows from the mocks: **C as the general mode** — every
book gets its own hue *and* its own paper temperature, all as tokens — with D's
component vocabulary available per book through `book-local.css` where a subject
genuinely needs it. Small, shared, and data-driven by default; distinctive on
purpose, not by accident.
