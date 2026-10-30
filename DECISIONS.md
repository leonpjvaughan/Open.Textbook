# Decisions

## 2026-10-28 — The goal's branch rule, the deployed release, and two evidence lines

**The problem.** The combined goal that closed items 139–153 says "work on dev, never
commit to main". Partway through it the user asked, in those words, to "finish off the
body of work" and then to "push through to production". That was done: `dev` was
fast-forwarded into `main`, pushed, and CI released `26.302.0` and deployed it. Every
commit up to `0f328d93` is therefore on `main` and live, and an independent audit of the
goal's completion read that as the branch rule broken.

**The decision, and its exact state.** The deploy stands, and the user has said so. On
2026-10-30 the choice between keeping the deploy and restoring `main` to `48fccea` was
put to the user, who answered "Keep main". That answer is the authorisation this
exception needs: the user owns the deployed release, and neither the agent nor the
auditor can grant it.

What is where, measured on 2026-10-30: `main` and `origin/main` are at `0f328d93`,
released as `26.302.0` and live, which carries the work up to item 153. Everything after
it — Phase C's eight pages, the six detail-page rules, the masthead label, the
chapter-problem fix and the recomputed worked numbers — is on `dev`, pushed at
`3d3e224b`, level with `origin/dev`, and **not live**. That is the ordinary state
between a merge and its release: `dev` takes the gate, `main` takes the deploy, and the
next release carries these commits.

**Why not the other way.** Reverting would have deleted a published release and taken
live pages down in order to satisfy a rule the user had already overridden when asking
for the push. It was offered and declined, so the record keeps the deploy and says who
authorised it.

**Two evidence lines, corrected.** This entry also fixes two claims made at
completion, because a claim that measures something else is how a gate rots:

- `grep -rl 'math-error' site` does **not** print nothing, and cannot: it matches 18
  stylesheet files, because `extra.css` defines the `.math-error` rule that a page
  carries when KaTeX fails. The failing state is a *page* with the span, and the
  command that measures it is `grep -rl 'math-error' site --include='*.html'`, which
  prints nothing and which `scripts/check.sh` already runs. `AGENTS.md`'s build and
  verify section quotes the scoped form for exactly this reason.
- The two-book review is at `research/review/maths-applied-and-numerical-methods.md`,
  and the goal's in-scope list did not name `research/`. It stays there: three reviews
  already live in that directory, and every closed item from 150 to 153 cites this one
  for its measurements, so moving it would break the evidence the queue points at.

**The scope accounting, measured.** The goal's verification contract asks that the
final diff contain only in-scope paths. Measured over the whole goal, `48fccea..HEAD`
touches 106 files, and eight of them are outside the objective's literal list. Each is
named here rather than omitted:

| Path | Why it is in this work |
|---|---|
| `.agents/numerical-methods-handoff.md` | The specification the detail track implements; every task from Phase A to Phase C cites it |
| `.agents/planning/2026-10-28-goal-reconciliation.md` | The record that the paused 105–121 goal is verified and closed, which the objective asks for by name |
| `assets/booklet/booklet.js` | Item 149's reader half: a page that names a booklet table can open it |
| `books/a-level-maths/problems/chapter-11-practice-11.3.yaml` | Item 146 moved `p7-grouped-mean` out of the 11.3 bank |
| `books/a-level-maths/problems/chapter-11-practice-11.5.yaml` | The same item moved it in, with `refs: [L3]` |
| `books/a-level-maths/problems/chapter-13-review.yaml` | Item 145: the review bank now interprets a given $r$ instead of computing it |
| `research/review/maths-applied-and-numerical-methods.md` | The measurements items 150–153 were filed from and closed against |
| `research/review/maths-applied-and-numerical-methods-ii.md` | The second review, which filed W3 and the items closed after it |

The remaining 90 files are inside the enumerated scope, and no file was added for a
purpose outside the objective's five success criteria.

## 2026-10-28 — Correlation and the fitted line are given, not computed

**The problem.** A-level 14.4 said plainly that $r$ is always given and its
calculation is not required, which is what the DfE content this book follows says.
Two review-bank items then asked the reader to compute $r$ and a least-squares
line, so the bank and the pages disagreed about what the course requires.

**The decision.** The pages are right and the bank changes. $r$ and the fitted
line are computed for the reader by a computer, and the examined work is to
interpret them: direction, strength, gradient, intercept, prediction, and what the
number does not prove. The bank items now give the value and ask for that
interpretation. Their checks still compute the coefficient and the line from the
data, because that verifies the given value is the one the data produce; the
reader is not asked to do that arithmetic.

**Why not the other way.** Computing $r$ by hand is not in the content the book
follows, and a bank that requires it would teach a reader to spend exam time on
arithmetic the specification does not ask for. The least-squares derivation is
not lost: it is a page in `numerical-methods/averaging/regression/`, linked from
A-level 11.4 for a reader who wants to see why the line passes through
$(\bar x, \bar y)$.

## 2026-10-26 — The solvers live here, one ABI, and the tag names the version

**The problem.** Two repositories produced the numbers a page runs: this one, and
`suspension-kinematics`, whose `otkd` package was released as a zip and vendored by
digest. A model change meant a tag, a release, a download and a pasted checksum, and
nothing proved the committed bytes came from the source. The new Rust kernels had no
home at all.

**The decision.** `solvers/` holds both producers: `ot-solve` (hand-written numerical
kernels, Rust → WebAssembly) and `otkd` (the mechanism compiler, moved here and
archived at its old address). One ABI, `solvers/ABI.md`: a fixed `f64` arena, four
named blocks, seven exports and the memory, status codes rather than traps, a generated manifest and
a native selftest replayed through the page's loader. `scripts/build-solvers.sh` and
`scripts/build-otkd.sh` rebuild the committed artefacts; CI **builds to compare, never
to ship**, and the deploy installs no compiler. The otkd suite is path-gated because it
is twelve minutes. The host tests and the build tool are static Rust (`musl` +
`rust-lld`), and the artefact is Rust (`wasm32` + `rust-lld`); there is no C or C++
toolchain on either side.

**The move, and why there is no history.** The files were copied from the last release,
not carried with `git subtree`. The history stays in the archived repository, which
remains readable; the trade was deliberate. The acceptance test was that the move
changed **no number**: every `out.js` and every `kernel.wasm` is byte-identical to the
0.11.0 release, and only the generator, commit and version stamps differ.

**The version is the collection's.** `hatch-vcs` reads the repository tag in both
Python packages, so `otkd` and `textbook` report `26.299.0` at a tag rather than a
number maintained by hand. The bundle records the tag it was built at. A shallow clone
without tags cannot name a version, and the build says so.

**The import is namespaced.** `otkd` imports as `open_textbook.otkd`; the command is
still `otkd`. The engine still imports as `textbook`: its rename is ~90 import and
command sites and is a mechanical change of its own, not a rider on this one.

**What this changes in the rules.** The `.github/AGENTS.md` rule that CI installs no
compiler became "builds a vendored binary only to prove it". A statement about a
simulated number is no longer a `claim()`: `assets/AGENTS.md` says why, and the
selftest replaces the CAS for that class of number.

---

## 2026-10-21 — The disclaimer is one promise, made once, and reachable three ways

**The problem.** A free textbook is used without a teacher beside the reader, and
exam preparation carries a real risk of lost marks if a page is wrong. The author
wanted to say plainly that the book is a companion rather than a replacement, and
that no liability is accepted for incorrect information — without turning the
front page into a legal warning, and without repeating the same paragraph in
eleven books.

**The decision.** The wording lives once, in `engine/src/textbook/legal.py`. It
reaches the reader in three places: a section on every book's generated **About
this book** page, a native `<details>` note at the bottom of every book's home
page (`:::disclaimer`), and a collection-level **Terms of use** page at
`/terms/`. A separate **Acknowledgements** page at `/acknowledgements/` compiles
every book's `sources.yaml` and the software that builds the site. The landing
page footer links both, and every About page links both.

**Why three places.** The About page is where a reader checks provenance; the
home page is where they start reading; the footer is where a reader looks for
the terms of a site. One of them alone is either invisible or repetitive.

**Why the wording is cautious.** The text says "to the extent the law allows"
and leaves the statutory carve-outs in: liability for death or personal injury
caused by negligence, fraud, and the consumer's statutory rights cannot be
excluded. It also says what is checked (the algebra) and what is not (the prose),
which is the honest version of "no liability for incorrect information".
`research/legal/disclaimer-and-terms.md` records the precedents and the limits.

**The cross-artefact seam.** A book is built into its own output directory, so
its link checker cannot see `/terms/` at the site root. `pipeline.check_links`
now skips the pages `portal.root_page_slugs()` owns — the same treatment another
book's deploy root already receives — and the deploy tests check that the pages
were actually written.

---

## 2026-10-18 — A book declares its own page structure, and its own depth

**The problem.** Three things were global, and each was right for a course and wrong
for a book that is not one: **three pages per section** (`Walkthrough`, `Guided
problems`, `Problems`), **no page the curriculum does not list**, and **a book's
assets are its figures and its stylesheets**. `books/maths-applied` is a book about
modelling with one page per section, optional depth pages, and a payload of numbers
computed elsewhere. The first two were hard constraints; the third blocked the data
entirely.

**The temptation, and why it was refused.** Add an exemption to `lint` for a book
without a `Practise` page. That fixes the symptom and leaves the cause: the scaffold
still writes the page, the navigation still lists it, and the exemption has to be
repeated for the next book with a different shape. A rule with a per-book escape is
two rules.

**The decision.** A book declares its own structure in `book.yaml` and its own depth
in `curriculum.yaml`, and **one declaration drives all four readers** — the scaffold
that writes stubs, the navigation, the URL shaper and the lint rules:

```yaml
section_pages: [learn]        # book.yaml: reader-facing names; default: all three
```

```yaml
sections:
  - id: '1.2'
    deeper:
      - slug: two-solutions     # authored, never scaffolded
        title: Why two circles meet twice
```

`:::deeper <slug>` expands to **one link and nothing else**, beside `:::prove`: a
depth page is a page, the link is a link, and a reader with scripting off still
reaches it. The scaffold deliberately writes no stub for it — a depth page exists
because somebody wrote it.

Assets followed the same reasoning: `docs/assets/data/` and `docs/assets/images/` are
now copied as directories. A figure's payload cannot live in `figures/`, where every
file must export `mount()`; a photograph cannot be a figure at all, because a figure
is drawn to follow the reader's bundle.

**What this buys.** A book's shape is data, so its About page describes the pages it
has rather than promising two that are not there — and `maths-applied` needs no
problem bank, no tier and no exemption.

**The cost.** Four call sites moved from a constant to a property, and the lint rules
now read the declaration instead of directory names. The default is unchanged for the
nine course books, which is what `tests/test_book_structure.py` pins — along with the
guard that the exemption is the *declaration* and not a blanket skip.

---

## 2026-10-17 — An assertion is data; display is free

**The problem.** Two figures printed a multiplication that does not give the number
beside it: `interest-growth` printed `× 0.07` for a rate of 6.5%, and `ratio-share`
printed `3 × 14.29 = 42.86` from an already-rounded 14.29. Structure, colour,
contrast, legibility and the kit's DOM contract all passed, because none of them
reads a number.

**The first attempt was wrong, and the way it was wrong is the point.** It parsed
the printed sentence back out of the text. To read *some* of it, that checker needed
`<sup>` for an exponent, `√` for a square root, `%`, thousands separators, a
trailing sentence period, and the words "and"/"is" — and after all that it could
read **43%** of the statements it saw, of which four were arithmetic. Every new
formatting choice was a new case, and every new figure was a new chance to be
silently unreadable.

**The decision.** An assertion lives in data and is decided by a computer algebra;
display is free to be whatever a reader needs. This is not new: the problem banks
have always done it — `expression`, `values`, `answer`, proved by `sympy` at build
time — and the figures were the only place that broke the rule by writing an
assertion into a formatted string.

So a figure **declares** what it asserts:

```js
claim([
  { label: "compound total", expression: "P * (1 + r) ** t",
    values: { P, r, t }, answer: compoundTotal, shown: money(compoundTotal) },
]);
```

and `python -m textbook.working` proves two things per claim:

1. the expression, evaluated at the stated values, **is** the answer;
2. the string shown **is** that answer at the precision it prints, and the readout
   actually contains it.

`expression` is Python syntax, because the verifier is SymPy — so `sqrt`, `**`,
`pi` and everything else are there by construction, and no notation table exists.
`cas._rationalize` turns `0.065` into `13/200`, so a comparison is exact and there is
no floating-point tolerance to tune.

**What this catches, measured.** Reintroducing the original defect — printing
`fmt(r, 2)` while claiming `fmt(r, 3)` — fails with *"claims to show '0.065', but the
readout does not contain it"*. Claiming an intermediate as well as a total is what
makes a rounded print a failure rather than a styling choice.

**What it does not.** It proves the figures that declare claims. A figure that prints
arithmetic and declares none is reported by `tools readout` as *undeclared*, not
passed — so the gap is a count rather than an assumption, which is the same rule the
booklet-coverage check follows. The migration of the remaining figures is a queue
item, and a new figure is checked the moment it declares.

**Alternative considered and rejected.** Generating the sentence from the claim, so
the printed text and the checked number are one object. That is the stronger form,
but it puts number formatting, units and prose order inside the kit, and every
readout in the collection would have to be rewritten to say what a reader should see.
Declaring the claim keeps the prose free and still makes the arithmetic provable.


A dated, appendable log of decisions that need to be findable. It is a record,
not an essay: newest entries at the top, each one short and specific. Anything
that is work rather than a decision belongs in `.agents/todo.md`.

## 2026-10-16 — The figure kit is a library, and `assets/figures/` is shared

**Decision.** `assets/figures/kit.js` is a barrel over six layers — text, frame, draw,
controls, interact, drag — and `assets/figures/` is the **shared figure library**: a
module dropped in beside the loader is mountable by its filename in every book. A book
may not define its own module with the same name; the build fails and says so. A shared
*directory* is declared in `scaffold.SHARED_DIRS` and copied recursively.

**Why.** The kit began as ten functions and deliberately did not draw, on the argument
that "a framework for 177 bespoke diagrams would be a framework around nothing". That was
right about *bespoke* drawing and wrong about *repeated* drawing, and the measurements
settled it: **162 of 213 modules draw an axis by hand, 68 a `<rect>`, 54 a `<polygon>`, 44
a `<path>`, and 136 write a `<text>` never calling `label()`** — the same five drawings
re-earned two hundred times, and the re-earning is where the legibility defects came from.
`research/design/reuse-audit.md` has the counts.

The library answers a different problem: a figure that two books want *identically* was
being written twice. It is deliberately **not** a de-duplicator for topic figures — the
four that were duplicated before it existed (`circular-motion`, `radiation-penetration`,
`transformer-turns`, `vector-addition`) turned out on inspection to be two books solving
one topic differently for different readers, and merging them would have served neither
page. What belongs in the library is a generic tool: the same set diagram, the same number
line, the same slope field.

**The cost, stated.** The kit is 2,400 lines and 33.5 kB gzipped, against 6 kB for the
single file it replaced. It is hand-written rather than a dependency, for the reason the
theme bundles are: `function-plot` is 61 kB, `d3` 90, `three` 128, `math.js` 171 — and a
mark is a pure function returning a string, which is smaller than any of them.

**Two primitives carry a rule that must not be lost.** `draggable()` **throws without a
backing control**, because a pointer is not a keyboard. `exercise()`/`practice()` claim
*internal consistency*, not verification: a banked answer is proved by a CAS at build time
and a generated one cannot be, so a page built on them must not say "checked by a
computer".

---

## 2026-10-11 — No `scipy`: `sympy.stats` and an explicit tolerance

**Decision.** The verifier's distribution, hypothesis-test and regression checks
will be built on `sympy.stats` with exact results and `evalf` where a decimal is
needed, plus a new `approx` check with an absolute or relative tolerance. `scipy`
is not added.

**Why.** `scipy.stats` would be a genuinely *independent* oracle, which is the
stronger verification, and the A-level gap analysis names it as the candidate.
Against that: it is a new dependency with a compiled extension, it answers in
floating point where SymPy answers exactly, and a textbook's answers are usually
required to a stated accuracy rather than to machine precision — which is what
`approx` is for. `sympy.stats` already gives `Binomial`, `Normal` (through `erf`),
`P`, `cdf`, `E` and `variance`, so nothing here is blocked.

The honest cost: `erf` expressions for normal probabilities are exact but
unfamiliar, and an exact-result oracle is not independent of the algebra engine
that everything else uses. If a future check needs genuine independence — a
hypothesis test where the risk of a shared bug matters — revisit this and pin
`scipy` for that check alone.

---

## 2026-10-11 — Background effects are opt-in, and never a CSS animation

**Decision.** Animated or reactive backgrounds may ship, on the three vivid
themes, as an opt-in the reader turns on and that is remembered per reader. They
are not automatic, and they are not built as a CSS animation.

**Why.** Measured against a page the pipeline ships
(`research/design/background-effects.md`). The counter-intuitive result: the CSS
animated gradient — the option that looks free — was the worst citizen by a wide
margin. It cannot stop, so it cost 180 ms/s of main-thread time on an idle page
and 435 ms/s throttled to 4× CPU, while a WebGL field idled below the baseline
and a full fluid solver idled *under* it. An explicit render loop is also an
explicit stopping point.

Cost of the two credible options: +12 kB for the field, +22 kB for the fluid, no
change to `DOMContentLoaded`, no CSP change, and the page is complete with
scripting off. Frame rate held at 60 in every variant, so the risk is battery and
heat rather than jank — which is also why opt-in is the only honest default.

**Open, and work rather than decision:** none of it is implemented. For the
Physics book the field is content rather than decoration, so it competes with
figures instead of with the decoration budget; that is a separate decision when
that book starts.

---

## 2026-10-11 — The theme bundles are ours

**Decision.** The collection ships six theme bundles, all original work designed
in this repository. The third-party palettes are gone.

**Why.** The bundles were named after other people's palettes (Catppuccin,
Gruvbox, Kanagawa, Tokyo Night, Synthwave '84, Arc Blueberry) and carried their
hex values. Their licences are permissive, but shipping them made the collection
depend on getting someone else's attribution exactly right. That is a risk with
no upside for a static textbook, so we designed our own in the same directions.

**What replaced what.** Seven bundles were deleted and four were written. Two
were kept.

| Deleted | Replaced by | Direction |
|---|---|---|
| Catppuccin, Gruvbox | Harbour | soft, low-chroma, cool |
| Arc Blueberry, Tokyo Night | Neon | cyberpunk glass terminal |
| Synthwave '84, Archwave | Phosphor | CRT amber and acid green |
| Kanagawa | Glass | glassmorphism developer OS |

`Clean` (monochrome) and `Editorial` (warm paper, serif) were already ours and
are unchanged. The four new directions — Harbour, Neon, Phosphor, Glass — come
from a mood board of other work and are direction only: every value here was
chosen and checked for this collection. The vivid light members are the
deliberate hard case, because a light cyberpunk terminal is a contradiction;
each is built on purpose from its dark member's hues and says so in the file,
rather than being a mechanical inversion of the dark palette.

**Provenance.** `themes/*.yaml` records, per member, that the palette is
`original: true`. The loader requires `source`/`observed` for anything that is
genuinely observed from, or derived from, another project, and refuses an
original member that claims to be observed.

**Licence.** The palettes are original work by this collection, released under
the collection's own licence: content under CC BY 4.0, engine source under MIT.
No third-party palette hex or attribution is carried.
