---
name: write-textbook-prose
description: Write and revise textbook prose in the house voice — plain English at a 12–14 reading age, short active sentences, no shaming words or negative contractions, every term explained on first use, board command words used with their exam meaning. Use when drafting or editing any reader-facing page, heading, callout, or instruction, or when a voice-lint finding needs fixing.
---

# Write textbook prose

The reader is mixed-attainment, aged 14–16, often reading English as an
additional language, and often finds reading hard. Aim for the mathematics to be
the only difficulty.

## Measurable targets

The voice is a standard, not a style preference. The repo's current prose meets
these; keep it that way.

| Property | Target | Measured by |
|---|---|---|
| Mean sentence length | 9–15 words (book baseline ≈ 9.4) | audit script |
| Sentence ceiling | no sentence over ~25 words; break anything over 32 | `textbook.lint` `style:long-sentence` |
| Reading age | 12–14 (Flesch–Kincaid grade ≈ 5–8) | audit script |
| Negative contractions | zero (`cannot`, `do not`, `is not`) | `textbook.lint` |
| Shaming words | zero: `obviously`, `clearly`, `simply`, `easy`, `easily`, `trivial`, `just` | `textbook.lint` |
| Internal words | zero (see substitution table) | `textbook.lint` |
| US spellings | zero (`factorise`, `colour`, `centre`, `metre`) | `textbook.lint` |
| Terms defined on first use | every one, then linked to the Glossary | manual |

## Rules

- **Active voice.** "The digit moves one place left", not "one place to the left
  is moved". Passive voice is the lint's biggest blind spot — read for it by hand.
- **One idea per sentence.** If a sentence needs "and" twice, split it.
- **Plain English. Explain every term on first use.** A term the reader has met
  is not a term they can be assumed to know.
- **No slang, idioms or cultural references.** They exclude EAL readers and date
  quickly. "piece of cake", "no-brainer" and "blunder" are out.
- **Address the reader as `you`.** Use `we` only for reasoning together ("we can
  check this by…"). Never `one`.
- **Board command words keep their exam meaning.** `Work out`, `show that`,
  `explain`, `give a reason`, `describe`, `compare`, `estimate`, `solve`,
  `sketch`. When a question wants a reason, say so in the Learn page.
- **Frame mistakes kindly.** `Watch out` presents a trap to spot, not a failure.
  Say why the error happens.
- **UK English and consistent units.** `0.5` always with a leading zero; currency
  as `£1.20`.

## Internal words must never reach the reader

| Do not write in a page | Write instead |
|---|---|
| anchor problem, anchor checkpoint | the chapter problem, `Progress check` |
| retrieval starter | `Warm-up: remember` |
| Walkthrough / Guided problems / Problems | `Learn` / `Practise with help` / `Practise` |
| Delivers DfE N1, N2 | covered by the page's `refs:` front matter; do not print codes |
| tier F / tier H | `Foundation and Higher` / `Higher only` |
| scaffold, hook, JSON, front matter | (never) |

A page's own prose uses the friendly page names, so the reader sees one
vocabulary from the navigator to the working.

## Procedure

1. Draft against the rules above.
2. Run `uv run python -m textbook.lint` and fix every finding. `--fix` applies
   the safe substitutions (contractions, spellings, internal phrases).
3. Run the audit script in `verify-textbook-change` for the lint's blind spots:
   mean and maximum sentence length, reading age, duplicated paragraphs, and
   heading drift.
4. Read the page aloud once. If you stumble, rewrite the sentence.

## Do not overclaim

The evidence base is real but bounded. Do not write motivational or scientific
claims into a page ("this is proven to improve memory"), and do not add
pedagogical rationale to reader-facing prose. The rationale lives in
`research/pedagogy.md`, and `author-textbook-chapter` carries it into the
structure, not into the sentences.
