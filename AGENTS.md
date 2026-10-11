# AGENTS.md — repository instructions

This repository builds a **collection of interactive, static, backend-free
textbooks** that share one engine. GCSE Mathematics is the first book; GCSE
Physics and A-level Mathematics and Physics are planned.

The repository is **Open.Textbook**: https://github.com/leonpjvaughan/Open.Textbook

`SHAPE.md` describes the repository shape, the per-book theming, and what a new
book requires. `PLAN.md` holds the authoring plan, `research/pedagogy.md` the
evidence behind the teaching design, and `AGENT-BRIEF.md` the per-chapter
authoring contract.

Read this file first for the cross-cutting rules. Then read the book's own
`books/<id>/AGENTS.md` for everything specific to that book: its exam boards, its
tier axis, and its subject pitfalls. The rules below hold for every book in the
collection.

## The chapter formula

The evidence briefing (`../edu-research/summary/build/pedagogy.pdf`) finds that
**interest and memory are separate tracks — neither automatically delivers the
other.** Every chapter therefore runs two arcs at once, and every page serves one
or both.

**Interest arc:** Trigger → Maintain → Emerge → Invite.
**Memory arc:** Encode → Retrieve → Space → Interleave.

### Six principles

- **P1 — Teach first, then fade the support.** Model the method with narrated
  reasoning, then withdraw support. Worked example → partial example → hint →
  independent. Never open with an unguided task a novice cannot start.
- **P2 — Give the chapter a destination and return to it.** Every chapter opens
  with an **anchor problem** that is genuinely solvable by the chapter's end.
  First contact is low-stakes (predict/estimate/notice, never fail). Return at
  2–3 checkpoints tied to specific sections; resolve it on the Review page.
- **P3 — Relevance is constructed by the learner, not announced.** Offer short,
  maths-tied contexts, then ask the learner to write their own connection
  ("where would this help you or someone you know?"). Never just assert that a
  topic is useful.
- **P4 — Retrieve from memory, over gaps.** Every Guided problems page opens with
  1–2 closed-book recall items from *earlier* material, with corrective feedback.
- **P5 — Interleave, and make the learner choose the method.** After enough
  blocked practice to learn a new tool, mix it with earlier topics and require
  "which method applies, and why?".
- **P6 — Guide every investigation or tool.** No unguided sandboxes. Every
  interactive follows **Predict → Test → Explain**, and the explanation is
  prompted, not shown.

Two rules keep the formula honest:

- **Surface misconceptions.** At least one "common error" callout per
  Walkthrough: state the error, show the contrast, re-explain with a check.
- **Budget the extras.** Hooks, applications and tools together are at most
  about a quarter of a chapter. Practice is the main event; a lively activity
  does not substitute for teaching and understanding.

### Chapter anatomy

```
Chapter <n>/
  index.md        # anchor problem, "by the end you'll…", roadmap, relevance prompt
  Section <n.m>/
    Walkthrough/index.md
    Guided problems/index.md
    Problems/index.md
  Review/index.md # anchor resolution, interleaved mixed practice, retrieval
```

### Page contracts

- **Walkthrough** — prerequisites, objectives, explicit teaching, worked
  examples with one line of reasoning per line of algebra, a misconception
  callout, at most one guided figure, and a "you should now be able to…"
  checklist. Name the DfE refs it delivers.
- **Guided problems** — retrieval starter (P4), then problems that fade
  hint → step → full working through nested `<details>`. At least one item from
  an earlier section or chapter.
- **Problems** — 8–15 independent items in increasing difficulty. In later
  sections, mixed with earlier topics (P5) and with method-selection prompts.
  Higher-only items marked **H**. Answers and concise solutions in one collapsed
  block. Low stakes; errors inform further teaching.
- **Review** — resolve the anchor problem; interleaved mixed practice across the
  chapter and earlier chapters; a reflection on what the learner can now do.

The weight is fixed: anchor thread + one learner-constructed relevance prompt +
guided investigation(s) per chapter; a bespoke application tool only where the
application *is* the maths (`tool:` in `curriculum.yaml`).

## Voice and language

This book is written for **ages 14–16 of mixed attainment**, including many
readers for whom English is an additional language and readers who find reading
hard. Write so that the mathematics is the only difficulty. The target reading
age is about 12–14.

**How the voice should come across.** Calm, clear and encouraging, like a good
teacher sitting beside the reader. Direct and plain. Never matey, never jokey at
the reader's expense, never a salesperson. The reader should feel that the book
is on their side and that progress is possible.

Rules, with the evidence behind them:

- **Active voice, short sentences.** GOV.UK's style guide requires the active
  voice because it is "concise, clear content". Aim for about 15–20 words per
  sentence and one idea per sentence. Break a sentence that needs "and" twice.
- **Plain English; explain every term on first use.** GOV.UK's guidance is to
  "present complicated information simply" and to explain jargon in plain
  English. A term the reader has met is not a term they can be assumed to know.
- **Avoid negative contractions.** GOV.UK: avoid `can't` and `don't` because
  "many users find them harder to read, or misread them as the opposite". Write
  `cannot`, `do not`. Contractions such as `it's` are best avoided too.
- **No shaming words.** Never `obviously`, `clearly`, `simply`, `just` or
  `easy`. If it were obvious the reader would not be reading this page.
- **No slang, idioms or cultural references.** They exclude EAL readers and
  date quickly. `piece of cake`, `no-brainer`, `blunder` and similar are out.
- **Use the board command words exactly.** `Work out`, `show that`, `explain`,
  `give a reason`, `describe`, `compare`, `estimate`, `solve`, `sketch` each mean
  something specific in the exam. Use them with their exam meaning, and tell the
  reader in a Walkthrough when a question wants a reason.
- **Address the reader as `you`.** First person plural (`we`) is for reasoning
  together: "we can check this by...". Never `one`.
- **Frame mistakes kindly.** ``Common error`` is fine, but present it as a trap to
  spot ("Watch out for..."), not as a failure. Explain why it happens.
- **UK English, consistent units.** `factorise`, `metre`, `0.5` always with a
  leading zero; currency as `£1.20`.

**Internal words must never reach the reader.** These are ours, not theirs:

| Do not write in a page | Write instead |
|---|---|
| anchor problem, anchor checkpoint | the chapter problem, `Progress check` |
| retrieval starter | `Warm-up: remember` |
| Walkthrough / Guided problems / Problems | `Learn` / `Practise with help` / `Practise` |
| Delivers DfE N1, N2 | (stays in front matter; render as `Covers:` if shown) |
| tier F / tier H | `Foundation and Higher` / `Higher only` |
| scaffold, hook, JSON, front matter | (never) |

The navigator uses the friendly page names. A page's own prose should use them
too, so the reader sees one set of words.

## Theming

How a book looks is two independent things that multiply. Keeping them apart is
the point, and it is the decision most easily undone by accident.

- A **bundle** (`themes/<id>.yaml`) is the *reading experience*: a complete light
  and dark palette plus its typography. It is chosen by the **reader** and applies
  to **every book**, so moving from mathematics to physics never moves the theme.
  One file per bundle, plus a line in `collection.yaml`.
- A book contributes only its **subject tint** (`book.yaml → theme`): an accent,
  and any surface it wants moved, given per scheme. It is supplied as
  `--tb-book-*` values, and each bundle composes them in:

  ```css
  --tb-accent: var(--tb-book-accent, #89b4fa);
  ```

  A bundle may **refuse** a token by listing it under `fixed:`. `clean` refuses the
  accent, so every book is monochrome there — by design, not by omission.

Never put a surface or a font in a book, and never put a subject's identity in a
bundle. A book states its tint once and every bundle decides how to use it.

### The cascade

| Layer | File | Owner |
|---|---|---|
| Plumbing: the Material mapping, components, fonts as tokens | `assets/stylesheets/extra.css` | shared, **declares no colour** |
| Bundles: every `--tb-*` per scheme, per bundle | `assets/stylesheets/themes.css` | generated from `themes/*.yaml` |
| Subject tint: `--tb-book-*` per scheme | `books/<id>/docs/assets/stylesheets/book.css` | generated from `book.yaml → theme` |
| A book's own component changes | `books/<id>/docs/assets/stylesheets/book-local.css` | authored, empty by default |

`extra.css` must not declare a colour token: a declaration there outranks every
bundle, silently. A test enforces this.

### What a page or a figure may do

Nothing in a page, and nothing in a figure, may carry a colour.

- Use the `fig-*` classes (`fig-accent`, `fig-warn`, `fig-good`, `fig-ink`,
  `fig-grid`) and the `text-*` classes.
- A figure reads the tokens (`var(--tb-accent)`, `var(--tb-fig-warn)`, …), so it
  adapts to every bundle and both schemes without being revisited.
- Never put `$...$` in text a figure injects at runtime: the maths hook runs at
  build time, so runtime LaTeX is not rendered. Use plain text or HTML.

### The contrast invariant

Bundles and subjects multiply, so a subject accent that is comfortable on one
bundle's paper can be unreadable on another's. This is not left to review.
`tests/test_themes.py` computes the WCAG ratio for every bundle × book × scheme
    and fails below **ink 7:1, link 4.5:1, accent 4.5:1**, plus **`accent_ink`
    4.5:1 on the accent** — text knocked out of the accent uses a dedicated
    `accent_ink` token, never the paper, because a bundle's paper can sit too
    close to its own accent to read.

When a new bundle or a new book fails it, **fix the palette, not the threshold.**
The check has already caught two stock Omarchy palettes — catppuccin-latte's own
link at 4.34:1 and gruvbox's at 4.40:1 — neither of which is visible by looking.

### Adding a bundle

1. Copy an existing file in `themes/`, change `id`, `title`, `description`, the
   two palettes and the typography. Both palettes must be complete: every token in
   `SCHEME_TOKENS` (`engine/textbook/book.py`), in both `light:` and `dark:`.
2. Add the id to `themes:` in `collection.yaml`. That list is the menu order.
3. `python -m textbook.scaffold` — regenerates `assets/stylesheets/themes.css`.
   No book is rebuilt to gain a theme.
4. `pytest tests/test_themes.py` — the contrast invariant will tell you if the
   palette is not readable against a book's tint.

### Reader preferences

Both preferences are the reader's and are shared by every book and the landing
page, under origin-wide keys: `textbooks:scheme` (`default` / `slate`) and
`textbooks:theme` (a bundle id). They are applied before the first paint by an
inline script at the top of `engine/textbook/templates/page.html`, which reads
the two keys and sets `data-theme` and `data-md-color-scheme`; the landing page
carries the same script, and both pages expose the same store to the shared
Settings runtime. Keep the script ahead of every stylesheet in that template, so
the chosen bundle paints with no flash.

Do not make the theme key path-scoped either — renaming the repository must not
cost a reader their preferences.

### Previewing a bundle

```bash
node scripts/screenshot.cjs site ~/out --schemes light,dark --theme catppuccin -- \
  "chapter:/gcse-maths/higher/Chapter 6/Section 6.4/Walkthrough/" "landing:/"
```

## Evidence

Do not overclaim. The synthesis is explicit that its causal evidence is mostly
US, secondary science or early-secondary maths, and that effects are not a
ranking of methods. Keep the claims to what the briefing supports; see
`research/pedagogy.md` for the mapping and the primary sources.

## Repository map

| Path | Role |
|---|---|
| `SHAPE.md` | Repository shape, theme bundles, what a new book requires |
| `collection.yaml` | Collection title, deployment base URL, qualification order |
| `engine/textbook/` | The shared engine: hooks, scaffold, booklet build, portal, lint, verifier |
| `themes/<id>.yaml` | A theme bundle: a full light and dark palette, plus typography |
| `assets/` | Shared design system and runtime widgets (CSS, figure loader, booklet widget) |
| `books/<id>/book.yaml` | A book's identity, profiles, tier axis, subject tint and paths |
| `books/<id>/curriculum.yaml` | Source of truth: chapters, sections, tier, curriculum refs |
| `books/<id>/docs/` | Canonical content (marimo markdown). Never edit generated files by hand |
| `books/<id>/problems/` | Verifiable problem banks, one YAML per practice set |
| `books/<id>/booklet/` | Formulae-and-tables data (source of truth) |
| `books/<id>/sources.yaml` | Tracked provenance for the curriculum claims |
| `books/<id>/AGENTS.md` | Book-specific instructions |
| `engine/textbook/pipeline.py` | **The site.** Renders a book to static HTML: nav, Pagefind search, link checking, sitemap, 404 |
| `deploy/dns/` | The importable BIND zone file for the DNS records, and the export it produced |
| `research/` | `pedagogy.md`, per-book notes, and fetched sources (git-ignored) |
| `PROBLEMS.md` | Problem-bank schema and verification limits |
| `BOOKLETS.md` | Formula-and-data booklet contract, and the target set per subject |
| `DEPLOY.md` | Deployment runbook: credentials, the domain, and how to deploy |
| `wrangler.jsonc` | The Worker that serves `site/` as static assets |
| `scripts/` | Thin developer entry points (`check.sh`, `fetch_sources.sh`, `screenshot.cjs`) |
| `tests/` | Engine, bank and collection-shape tests |
| `test/` | The figure-hook and tier-profile evaluation (24 assertions) |
| `AGENT-BRIEF.md` | Per-chapter sub-agent brief |
| `todo.md` | The work queue. Anything noticed and not fixed now belongs here |

## Build and verify

```bash
uv sync                                   # Python toolchain and the local engine
npm install                               # build-time KaTeX (pinned)

python -m textbook.scaffold               # docs tree, generated CSS, themes.css
python -m textbook.booklet                # validate booklet data, emit JSON + MathML
python -m textbook.portal                 # the collection landing page
python -m textbook.lint                   # voice, style, structure
python -m textbook.verify                 # verify every problem bank (SymPy)

python -m textbook.plan                   # the build matrix: book x profile
while read -r -a b; do python -m textbook.pipeline "${b[@]}"; done \
    < <(python -m textbook.plan --configs)             # both profiles, no broken links
grep -rl 'math-error' site --include='*.html'          # must print nothing

pytest tests/ -q                          # bank, marker, collection and theme tests
                                          #   (test_render_hooks.py holds the figure-hook
                                          #    and tier-profile evaluation)
scripts/check.sh                          # everything CI enforces, in one call
python -m textbook.plan --generated       # the files a drift check should diff
scripts/deploy.sh                         # build, guard, then deploy (see DEPLOY.md)
scripts/next-tag.sh                       # the release tag scheme (yy.day.increment)
scripts/protect-main.sh                   # require the gate check on main (needs GitHub Pro)
```

## Branches and releases

| Branch | Push to it and you get |
|---|---|
| `dev` | the whole gate — banks, tests, voice, both tier builds, drift, actionlint — and nothing else |
| `main` | the same gate, then a release, then a deploy to open-textbook.org |

`dev` is where work happens and it merges into `main`. The release and deploy jobs
require `refs/heads/main`, so they are skipped elsewhere by construction rather
than by remembering to guard them; that is what makes `dev` safe to push to.

**A change to the workflow itself is inert until it reaches `main`.** The pipeline
that runs is the one on the branch being pushed, and the release and deploy jobs
only ever run from `main` — so editing `.github/workflows/verify.yml` on `dev`
changes nothing about what happens on a push to `main` until the merge. This is
easy to get wrong in the other direction too: pushing such a change straight to
`main` deploys, because that is what pushing to `main` does.

Releases are tagged `yy.<day of year>.<increment>` — `26.284.1` is the second
release on day 284 of 2026 — so two deploys in a day cannot collide. The scheme
lives in `scripts/next-tag.sh`, tested in `tests/test_release.py`.

`DEPLOY.md` is the runbook: credentials, the domain, what each stage does, and how
to check a deploy.

## Capturing work

`todo.md` is the work queue: one item per change, ordered rather than dated, the
first being next. It is ours, not the reader's — the voice rules do not apply
there, but these do.

**Anything you notice and are not going to fix now goes in `todo.md` before you
finish.** Not in a commit message, not in a reply that scrolls away, not in your
head. An observation without a home gets made twice, and the second time is by
someone who no longer remembers the evidence.

That includes the small things, and especially those: a setting nobody verified, a
dead link, a claim in a document that turned out to be false, a test that would
have caught the bug you just fixed by hand.

Write it the way the file already reads:

- **What is wrong**, and the evidence you actually measured — a command and its
  output, or a quote from a primary source. "Probably" and "should" are worth
  less than what you ran. If you measured nothing, say what you would measure.
- **The fix**, concretely enough to do without re-deriving it.
- **A `done means` checklist**, in terms anyone can verify.

Then:

- Add a **new numbered item**; do not append to an unrelated one.
- Keep the **ready-state gate last**, renumbering it if you add items above it.
- **Do not park work you should be doing.** If it is next, do it; `todo.md` is for
  what is not.
- **Close items properly** when they land: tick the boxes and keep the diagnosis,
  because the diagnosis is what stops the problem returning. Item 2 keeps its
  nameserver evidence for that reason.

## Watch out for

Issues found while building the shell and the Chapter 1 slice. Check these before
calling a chapter done.

**Maths**

- Markdown escapes `<`, `>` and `&` inside `$…$`; the maths hook unescapes before
  KaTeX. If you bypass the hook you will see `&lt;` and broken maths.
- KaTeX runs with `throwOnError`, so a bad expression becomes a `.math-error`
  span and the build **still exits 0**. Always grep for `math-error` after a
  build; the exit code does not catch it.
- Prefer `\pounds` or write currency outside maths; a raw `£` in an equation is
  a trap. `aligned` works; `latex2mathml` does not — do not reintroduce it.

**Hooks**

- Never name a hook parameter `html`; it shadows the `html` module.
- Hooks resolve every path from the build's `config.extra` block, through
  `textbook/config.py` — never from `__file__`. A hook that guesses its own
  location works for one book and silently breaks for the next.
- Hook order is declared once, in `engine/textbook/hooks/__init__.py`, and the
  pipeline reads the same order from `pipeline.MARKDOWN_HOOKS`. Adding a hook
  means adding it to both, and the tests pin the two together.
- Figure slugs are auto-discovered from `books/<id>/docs/assets/figures/*.js`.
  The filename must equal the slug, and an unknown `:::figure` slug fails the
  build.
- Use the `:::figure` directive, not raw `<maths-figure>` HTML: only the
  directive triggers the per-page loader injection. Modules export `mount(el)`.

**Layout**

- Shared CSS and runtime widgets reach each book by symlink:
  `books/<id>/docs/assets/{stylesheets/extra.css,stylesheets/themes.css,figures/figures.js,booklet/booklet.js}`
  point into the root `assets/`. Edit the file in `assets/` — never replace a
  symlink with a copy, or the books drift apart. The scaffold creates these, so a
  new book gets them by running it.
- A broken symlink under `docs_dir` breaks the book: the scaffold creates the
  shared symlinks and the tests check they resolve, because a tool that walks the
  tree meets them whether or not a page references them.
- Anything to do with colour, fonts or bundles: see **Theming** above.

**Tiers**

- Foundation drops `tier: H` pages; a plain markdown link from an `F` page to an
  `H` page breaks the strict build. Wrap such links in
  `<!-- tier:h -->…<!-- /tier:h -->` or omit them.
- Verify every `F`/`H` tag against the AQA 8300 tier columns before publishing.

**Generated files**

- `books/<id>/docs/**` stubs, `books/<id>/docs/assets/stylesheets/book.css`
  and
  `books/<id>/CURRICULUM-MAP.md` are generated. Never hand-edit them; edit
  `book.yaml` or `curriculum.yaml` and re-run `python -m textbook.scaffold`.
- A stub is rewritten only while it carries `<!-- scaffold:stub -->`; authored
  pages must never contain that marker.

**Content**

- The build checks links, maths and structure — **not** mathematical correctness.
  Re-derive every answer and check the arithmetic in worked examples.
- `<details>` blocks need `markdown="1"` (via `md_in_html`) or the inner
  markdown renders literally.
- The anchor problem must be genuinely solvable by the chapter's end; keep hooks,
  applications and tools within the ~¼ budget.
- Figures must use the `fig-*` classes (`fig-accent`, `fig-warn`, `fig-good`,
  `fig-ink`, `fig-grid`) and the `text-*` classes, never hard-coded colours, so
  they adapt to dark mode.
- Never put `$...$` in text a figure injects at runtime: the maths hook runs at
  build time, so runtime LaTeX is not rendered. Use plain text or HTML.

**Problem bank**

- Keep units, words and `%` out of the CAS fields; they belong in `statement`.
  `£`, `p` and commas will not parse.
- Declare assumptions (`symbols: {x: {real: true}}`) or the verifier will reject
  valid steps such as `sqrt(x**2) -> x` when `x` can be negative.
- Decimals are rationalised before checking, so write exact values rather than
  rounded ones. Rounding needs an interval check, not equality.
- Squaring both sides or multiplying by a variable can add roots; those steps
  need a weaker relation and an explicit extraneous-root check. See PROBLEMS.md.
- A step that is not an equivalence (differentiate, substitute, integrate) must
  declare `relation: apply` with the operation. Do not fake calculus as an
  `equivalent` step. The verifier proves the algebra, not the argument.
- Markers are fence-aware. A real `:::answers` or `:::figure` marker inside a
  code fence is left alone, so never rely on a fenced marker expanding.
- The verifier proves the mathematics, not the method. A correct answer reached
  by an unexpected route still passes.

**Booklet**

- `BOOKLETS.md` is the contract: one booklet per qualification and subject, built
  from the board's own document, not from another board's sheet or from memory.
  Any subject whose board provides a sheet — mathematics, physics, chemistry,
  combined science — should have one, at GCSE and at A-level.
- `books/<id>/booklet/<subject>.yaml` is the source of truth;
  `books/<id>/docs/assets/booklet/booklet.json` is generated. Edit the YAML and
  run `python -m textbook.booklet`. A book that declares no booklet ships no
  widget.
- Provision is per board and tier. Selecting a board hides every item that board
  does not provide, so a wrong tag is a content bug. Since Ofqual's October 2024
  decision, all boards provide the same DfE-based sheets for 2025–2027; AQA and
  OCR 2026 sheets were checked directly, and Edexcel follows the same set.
- The page's answer blocks come from the bank. Write `:::answers <bank>` (or
  `:::answers <bank>#<id>`) instead of hand-writing answers, so the reader sees
  exactly what CI verified. `engine/textbook/verify/render.py` builds the block.
- The booklet renders formulae from build-time MathML, so never put `$...$` into
  it at runtime. Tables are plain text and data.
- Pop-out uses the Document Picture-in-Picture API, which is Chromium-only; the
  button is hidden elsewhere and the in-page panel is the baseline.
- The widget is site-wide runtime JS, a deliberate exception to the Tier-0
  no-JS rule. Keep it deferred and lazy: nothing beyond the button loads until a
  reader opens it.

**Toolchain**

- The build needs `uv sync` (the engine, Markdown and PyYAML) and `npm install`
  (KaTeX and Pagefind). Without Node, maths silently degrades to `.math-error`
  spans.
- `actionlint` only runs shellcheck if shellcheck is on `PATH`, and it is on
  `PATH` in CI but not by default locally. Without it, a whole class of workflow
  error passes locally and fails the `lint workflows` job — which has happened.
  It is installed with `mise use -g shellcheck@0.11.0`; check with
  `command -v shellcheck` before trusting a local `actionlint` run.
- The figure-hook and tier-profile evaluation is `tests/test_render_hooks.py`,
  from the pipeline's hooks (`pipeline.MARKDOWN_HOOKS`). It replaced
  `test/run.sh` and the `test/content-*` fixture books.
- `screenshot.cjs` serves the built site through Playwright request interception
  rather than binding a port. Listening sockets do work in this environment —
  `python -m textbook.pipeline --serve` binds and serves — so interception is a
  choice, not a workaround: it needs no free port and cannot clash with a server
  that is already running. Set `PLAYWRIGHT_PATH` if `require("playwright")` does
  not resolve.
- `screenshot.cjs` maps a route to a file under the directory you give it, and
  only appends `index.html` for a trailing slash. A route without the file
  extension therefore 404s — and because every capture then returns the *same*
  404 page, the run looks successful while producing identical images. Check the
  captures differ (byte size or hash) before reviewing them.

## Repository skills

The textbook-writing methodology is available as portable skills under
`.agents/skills/` (read natively by Pi, Copilot and Codex):

| Skill | Use it for |
|---|---|
| `author-textbook-chapter` | planning, authoring or revising a chapter end to end |
| `write-textbook-prose` | drafting or editing reader-facing prose, and fixing voice findings |
| `build-practice-set` | Guided problems / Problems pages and the verified banks behind them |
| `build-guided-figure` | an interactive investigation in a Learn page |
| `verify-textbook-change` | the definition-of-done gate, including the pedagogy audit |

Claude Code reads skills from `.claude/skills/`; project that directory with the
`agent-repository-conventions` helper rather than copying skills by hand.

## Conventions

- **Tier:** `F` = Foundation and Higher, `H` = Higher only. Higher-only pages
  carry `tier: H` front matter; in-page extensions use
  `<!-- tier:h -->…<!-- /tier:h -->`. Each book declares its own axis in
  `book.yaml → tier_axis` and the profiles it builds.
- **Figures:** author with the line-anchored directive `:::figure <slug>`; the
  figure hook expands it to `<maths-figure data-figure="<slug>">` and injects the
  loader only on pages that need it. Modules live in
  `books/<id>/docs/assets/figures/`; the loader `assets/figures/figures.js` is
  shared. Do not edit generated files or nav lists.
- **Maths:** write `$…$` and `$$…$$`. It is rendered to MathML at build time
  (KaTeX 0.19.0) with no runtime JavaScript. `aligned` environments are supported.
- **Theming:** never a colour in a page or a figure. Use the `fig-*`/`text-*`
  classes and the `--tb-*` tokens, so everything adapts to every bundle and both
  schemes. See **Theming** above.
- **Glossary:** define a term once on its strand page and link to it.
