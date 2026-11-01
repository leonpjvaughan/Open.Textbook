# Review III: Maths Applied and Numerical Methods

A third pass over the two reference-shaped books, after
`maths-applied-and-numerical-methods.md` (14 items) and
`maths-applied-and-numerical-methods-ii.md` (10 findings, 5 designs). Those two
are not edited. This pass asks one question the earlier ones left open:

> A reader arrives holding a name. Can they get to the page, the entry or the
> number that name belongs to, without reading the book first?

That is a reading-surface question rather than a content question. The content
is in good shape: every class page works a number, every figure has a static
frame, and the two books are wired together by `:::class` and `:::used`. What
this pass found is that the **lookup surfaces** are less finished than the
pages they index.

**Changed in this pass:** nine class pages, the map's home page, the A–Z's
opening vocabulary, two passages of `maths-applied`, and one test. The rest is
recorded here and filed as items 173 and 174.

Evidence baseline, so that nothing below is an existing failure of a check:

```
$ uv run python -m textbook.lint maths-applied numerical-methods
scanned 49 pages                                   (no findings)

$ uv run python -m pytest tests/test_reference_books.py \
      tests/test_page_rules.py tests/test_pipeline.py -q
193 passed
```

The measurements below are a Playwright sweep over the built pages at 390 and
1280, the same viewports the figure audit uses. Before each number was taken,
the page was rebuilt with `python -m textbook.pipeline --book <id> --profile
<id>`, because a stale `site/` is how the second review nearly filed a fixed
defect twice.

---

## Verdict

**The pages are stronger than the ways into them.** Nine class pages each carry
a techniques table that is the page's working answer to "what do I do with this
model?", and until this pass that table was clipped at both widths and its
method names were plain text. The A–Z, which the class pages call the place a
method's step lives, is 22,580 px on a phone and is not alphabetical. The home
page explains three ways into the book at 92 per cent of its own length.

Those are all surface defects, and four of the five are now fixed. The two that
remain need a new index rather than an edit: one by method name, one by system.

---

## N1. The class pages' central table was off screen at both widths (fixed)

The nine class pages all carry the same four-column table under **Techniques**.
It was the last major table in either book without `<!-- table: cards -->`, and
the omission cost the same thing N3 of the second review measured on the home
page.

Measured before, at 390 px, the table was **468–528 px inside a 358 px scroll
box**, so 24–32 per cent of it was off screen. The last column, "when it is the
wrong tool" — the one a reader needs before trying a method — was **103–132 px
wide**. At 1280 px the table was 662 px inside a 1280 px window, with the same
column at 161–182 px, because the prose measure held it to 70ch.

```
                       before                    after
table width @390       468–528 px  (box 358)     358 px
table height @390      1,308–1,872 px            744–1,019 px
table width @1280      662 px                    896 px
last column @1280      161–182 px                267–275 px
```

The fix is one line per page, the marker the engine already reads:

```markdown
<!-- table: cards -->
| technique | what it does | when it wins | when it is the wrong tool |
```

Below 60rem each row becomes a labelled record, so no column is off screen;
above 60rem the page's content column widens for the table, as the nine-kinds
table already did. The class pages lost 400–1,000 px of height at 390 px rather
than gaining it, because a card does not have to reserve a 110 px column for a
sentence that wraps to five lines.

The cost is the one the home page already accepted: the column names are
repeated as labels on each card. For a technique record that is the right trade.
A reader comparing two methods down a column can still do it at 1280, where the
table is a table.

**Held by** `tests/test_reference_books.py`:
`test_every_method_a_class_page_names_links_to_its_entry` fails if the marker
is removed.

---

## N2. Eighty-seven method names were not links (fixed)

Each class page's techniques table names 9–11 methods, 87 rows in all. Every one
was plain text. The sentence above the table says:

> Every method named here is in [Methods, A to Z](../techniques/#finding-a-state),
> with its price and what it will not do.

So the page told the reader that the step and the price are one click away, and
then did not provide the click. The A–Z has had an anchor on every method since
it stopped being five tables (`<a id="uzawa"></a>` and 76 others); the class
pages linked only the family heading.

All 87 names now link to their entry. Two rows carry two methods and get two
links: `Gauss–Newton, Levenberg–Marquardt` on `optimisation`, and the two names
inside `Lanczos, Arnoldi` and `BDF, Radau` share an entry on the A–Z, so the
link text is the local name and the target is the entry that covers it.

**Held by** the same test, in both directions: every name in a table's first
cell is inside a link, and every target is an anchor the A–Z carries. A renamed
method or a stale anchor fails before a reader follows it.

The paragraph above the tables still says "with its price and what it will not
do". The A–Z now also carries the step, so the sentence is true but no longer
complete. It is left for the item that turns the table's key around (168),
because that edit rewrites the same paragraph.

---

## N3. "Class" meant two different things on the A–Z (fixed)

The book's central word is **class**: one of nine kinds of problem. The A–Z used
it twice more, for a different partition:

```
$ sed -n '10,19p' books/numerical-methods/docs/techniques/index.md
Five classes, and one section for each. **Read the class first**: ...
| class | what it answers | entries |
| Finding a state | ... | 19 |
| Linear systems | ... | 20 |
```

A reader told the map has nine classes meets a page that says five, and a table
whose "class" column names none of the nine. The page's own method blocks then
use `Class: [Root](../root/)` in the correct sense, four lines below the table
that used the wrong one.

The five are now **families**, and the table header is `family`. "Class" is left
with one meaning, and the opening sentence reads "Read the method's class
first", which is the page's actual instruction. No anchor, link or test changed:
the tests read the rows, not the header word.

This is a voice rule as much as a layout one, and it belongs in the same family
as item 166 (`stiff` meeting a bush before it meets a step size): one word, one
meaning.

---

## N4. "Three ways in" was at 92 per cent of the home page (fixed)

The home page opens by saying the field is nine kinds, then spends 8,000 px on
the nine kinds, the three flags, the detail pages, why nine, and one model
several kinds. Only then does it say how to use the book.

```
                          before              after
@390, y of heading        8,344 / 9,044       898 / 9,044
@1280, y of heading       5,176 / 5,724       636 / 5,724
```

A newcomer who does not yet know whether to read in order, look up a method, or
start from a wrong answer had to scroll to 92 per cent of the page to find out.
The section now sits directly after the opening numbers, before the nine kinds,
and its first bullet says "below" rather than "above". The page is the same
length; the wayfinding is 7,400 px earlier.

The closing paragraph ("Nothing here is a course...") stays at the end, where it
answers the reader who has now seen the whole map.

---

## N5. The worked case was unreachable from the class pages (fixed for five)

`worked-case/` is the book's best teaching page: one mechanism, five questions,
the numbers where the models agree. The first review noticed that no class page
linked it. That is still true for eight of the nine.

The page names five classes as worked on the suspension corner: root, linear
system, optimisation, saddle point and eigenvalues. Those five class pages now
link it at the top of **Read next**, so a reader holding a class can see it on a
real mechanism without going back to the map.

The other four are deliberately not linked from their class pages:

- `elliptic`, `parabolic` and `hyperbolic` are the three the worked case says
  have no caller yet. Sending a reader there from their class page would land
  them on "No page in this collection names this class yet", which is an honest
  sentence in the wrong place.
- `averaging` is used by the statistics chapters, but not by the corner; the
  worked case does not quote a suspension average, and a link would promise one.

The reverse direction still works: `:::used` on each class page lists the
sections that name it, and `worked-case` links the class pages it discusses.

---

## N6. Two proper nouns carried the explanation in `maths-applied` (fixed)

`books/maths-applied/AGENTS.md` says the mathematics has to be introduced where
it is needed, and that the book may not assume a level. Two sentences in §1.6
assumed one:

- "adding a Baumgarte term that pulls the state towards them" — one occurrence
  in either book, defined nowhere. A reader who does not know the name is given
  no way to know what the package avoided.
- "integrates with classical Runge–Kutta" — a named method with no gloss, in a
  book that defines "differential-algebraic" in the same paragraph.

The first is now "a term that pulls the state softly towards the constraints and
leaves it slightly wrong", which is the distinction the sentence is making. The
second keeps the name and adds the gloss: "classical Runge–Kutta — a standard
step-by-step method". Neither loses a fact; both now give the reader the idea
before the name.

One more sentence in `maths-applied` was false rather than unexplained. Its
home page said "Each section offers one optional page marked **Going deeper**",
and §1.6 and §1.7 have none. It now says "Each section of the main thread", which
is the five sections that do.

`discretise` and the `stiff` flag remain undefined in `numerical-methods`. That
is item 166, and it is the right fix: a flag that changes the method in every
class is a page or a paragraph, not a cell in a table.

---

## What remains, and the two I would do next

The queue already holds the content work: item 166 (the three flags defined),
167 (a contents list for pages over six `h2`s), 168 (a property-keyed techniques
table), 169 (a look-alike per class), 170 (retrieval on `symptoms`), 171 (figure
readouts in the page's columns) and 172 (the two procedures named once). Nothing
here repeats them.

Two ways into the map are missing, and both are one page.

### 1. The A–Z is not A–Z, and there is no way in by method name

The page calls itself the **inverse lookup**: "You have heard of a method and
want to know where it applies." It is sorted by method family, and within each
family by the order the class page happens to use:

```
$ grep '^### ' techniques/index.md | head -5
### Bisection
### Secant, false position
### Newton
### Quasi-Newton (Broyden)
### Brent
```

`Bisection` before `Brent` before `Newton` is a teaching order, not an
alphabetical one. At 390 px the page is **22,580 px** tall; `Uzawa` is at
**9,598 px** and `Monte Carlo` at **19,108 px**. The only name-based route is
find-in-page or the site search, and a search result opens the page at the top,
not at the anchor.

So the title promises a lookup the page does not offer. The fix is a compact
index at the top, one line per initial letter, each method name linking to the
anchor that already exists. It is the same list the `toc` extension produces,
sorted by the name, and it should be generated from the anchors rather than
typed, for the reason item 167 gives: a hand-kept list of 77 names is a second
copy that will rot.

Item 173 carries the measurement, the fix and the test.

### 2. There is no way in by system

The home page counts **64 systems** the nine kinds are used on. Every one is a
bullet inside a class page's **Systems that live here**. A reader who arrives
holding "incompressible flow", "a tyre's slip angle" or "weather ensembles" has
to guess which of nine pages lists it, or read all nine.

The book has three stated ways in: a model, a method name, a wrong answer. The
fourth is the most concrete thing many readers actually hold: the system they
are trying to model. `symptoms` goes wrong answer → class; `techniques` goes
method → class; `reading-the-class` goes equation → class. Nothing goes system →
class, although the systems are already written and already linked.

The fix is one page, derived from the class pages' lists the way `:::used` is
derived from the `:::class` callbacks, so it cannot fall behind. Item 174
carries it.

### The smaller thing I did not file

The detail pages' contract says **Back to the map** names "the parent class page
and at least one sibling detail page". Only `averaging` has siblings: the other
eight classes have one detail page each, so the rule is unsatisfiable for them,
and the test only counts two links. The pages are fine; the rule and the test
disagree. Either the rule says "a parent and a related detail page" or the test
checks the parent. That is a documentation decision, not a reader defect, so it
is recorded here rather than in the queue.

---

## What I would not change

- **The nine-kinds cards.** The repeated labels are the price of the card
  layout, and the second review's N3 measured the alternative: a table 34 per
  cent off screen. Nine records with their own labels is the right shape below
  60rem; the page's instruction to read the last column first survives, because
  the recognition line is still the last line of each card.
- **The class-page skeleton.** Ten fixed headings across nine pages is what
  makes the map a lookup. The temptation to give `linear-system` a different
  order because its matrix properties come first is the failure the skeleton
  exists to prevent.
- **The `Worked number` line.** One number, in bold, under "What it becomes on a
  computer", is the smallest worked example that still proves the page is about
  a solvable problem. A longer one would be a Walkthrough, and this is not a
  course.
- **The absence of answers.** `symptoms` is the one page that could carry
  retrieval, and item 170 is the right way to add it: native `<details>`, the
  answer already written. A problem bank would make the reference work a course.

---

## Method

- Every before/after number is a Playwright measurement over the built pages,
  at 390 and 1280, with the same route handler the audits use.
- The builds were made with `python -m textbook.pipeline` for each book after
  the edits; the hash-named assets changed as expected.
- `python -m textbook.lint maths-applied numerical-methods` reports no findings.
- `pytest tests/test_reference_books.py tests/test_page_rules.py
  tests/test_maths_applied_numbers.py tests/test_maths_applied_ladder.py
  tests/test_pipeline.py tests/test_home_page.py tests/test_book_structure.py`
  passes.
- `node tools/dist/cli.js check-mobile site` reports 15 pages, no errors;
  `canvas` reports 254 figures, no errors.
- What was not measured: a reader's time to find a method, and whether the
  cards reduce comprehension of a table that is compared down a column. The
  first needs a study; the second is why the table stays a table above 60rem.
