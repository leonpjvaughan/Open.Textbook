# ACCESSIBILITY — the checks behind the claims

This document is the evidence for `.agents/todo.md` item 10 ("Accessibility: turn the
claims into checks"). Colour contrast was already tested
(`tests/test_themes.py`); the figure accessible names were already tested
(`tests/test_figures.py`). This records the rest of the work: the
no-JavaScript check, a keyboard and focus audit run in a real browser, and the
position on reading maths aloud.

It is written to be honest about the difference between what was **verified** by
a command and what is only **by inspection**. Nothing here is a claim about a
reader's actual experience of a screen reader: no screen reader was run.

## What is verified, and what is only by inspection

| Claim | Status | Evidence |
|---|---|---|
| Maths is rendered to MathML at build time | verified | `tests/test_no_javascript.py`; `tests/test_pipeline.py::test_build_renders_maths_to_mathml` |
| The page keeps its prose and its maths when the scripts are removed | verified | `tests/test_no_javascript.py` (scripts stripped) |
| Nothing in the built page renders maths at runtime | verified | `tests/test_no_javascript.py` (no `katex`/`mathjax` reference) |
| A book page keeps its prose and its maths with scripting off in a browser | verified | Playwright, `javaScriptEnabled: false` (audit below) |
| The Settings control is hidden rather than dead without JavaScript | verified (source) | `tests/test_settings.py`, `tests/test_no_javascript.py` |
| Focus order, focus visibility and Escape behaviour | verified | Playwright keyboard audit (audit below) |
| Screen-reader behaviour for the MathML | **by inspection, not measured** | `research/accessibility.md` §3, marked as such |

The keyboard audit was run against a snapshot of the built MkDocs site at commit
`3bc6594` (the commit stamped in `site/version.json`). The audit script and its
raw output live beside this repository task's artifacts; the method and the
exact commands are in §5.

---

## 1. The no-JavaScript check

### What it asserts

`tests/test_no_javascript.py` renders one real page — the Section 1.1
Walkthrough, which has both inline and display maths and a figure — through the
own-pipeline renderer. It then removes every `<script>` element, which is the
page a reader with scripting off actually gets, and asserts:

- the prose is present (a phrase from the page, plus more than 400 words after
  the tags are stripped);
- at least ten `<math>` elements are present, so the maths is static;
- the MathML carries the `application/x-tex` annotation KaTeX emits;
- removing the scripts removes no maths (the `<math>` count is unchanged);
- the page references no runtime maths renderer (`katex`, `mathjax`,
  `rendermathinelement`, `temml`);
- no inline `on*` handler mentions maths;
- the MkDocs Settings trigger is `hidden` in the markup and only the script
  reveals it.

The build is also a pure function: it needs Node and KaTeX at **build** time, but
no browser and no DOM at runtime.

### Command and result

```bash
uv run python -m pytest tests/test_no_javascript.py -q
# 8 passed
```

### The same check in a real browser

The pytest check is static. To prove the browser agrees, the audit below loaded
the built page in Chromium with JavaScript disabled and measured the DOM. It
observed 39 `<math>` elements and 1566 words of prose in `<main>`, with the
Settings trigger present but hidden and the booklet widget absent. See §2, "No
JavaScript", and `/tmp/pi-delegate/del-7/audit-report.txt`.

### Coverage boundary

This file exercises the shared engine (hooks and maths renderer), not the MkDocs
shell. The MkDocs shell is covered by `tests/test_settings.py` for its one
no-JavaScript promise, and the browser run in §2 covers the shell with scripting
off. The landing page is not covered here.

---

## 2. Keyboard and focus audit

### Method

The audit serves a copy of the built site through Playwright request
interception (no port), exactly the way `tools screenshot` does, then
drives it with real key presses. Every finding records the page and the
keystrokes that produced it.

- Browser: Chromium headless shell 1243
  (`~/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`).
- Playwright: `~/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright`.
- Page: `/gcse-maths/higher/Chapter 1/Section 1.1/Walkthrough/` (has a figure,
  maths, the Settings control, the search and the booklet).
- Script and raw output: `/tmp/pi-delegate/del-7/audit.cjs`,
  `audit-report.txt`, `audit-findings.json`, and the `focus-*.png` screenshots.

### Result summary

| Verdict | Count | What it covers |
|---|---|---|
| ok | 25 | skip link first, focus-visible everywhere, the whole Settings flow, search, booklet, figure, no-JS |
| broken | 1 | an invisible Tab stop in Material's closed search |
| could be better | 2 | unnamed sidebar expand toggles; booklet focus does not move into the panel |

### Focus order (book page, from page load)

`Tab` produced this order. Every stop matched `:focus-visible` and had an
outline; the skip link is first.

```
 0  a       "Skip to content"                       outline auto 1px
 1  a       logo                                     outline auto 1px
 2  input   search query                             outline 3px
 3  div     .md-search__scrollwrap                   outline auto 1px   <-- see broken
 4  button  #tb-settings  aria-label="Settings"      outline auto 1px
 5  a       "Home"                                   outline auto 1px
 ...
15  label   #__nav_3_2_label  (empty name)           outline auto 1px   <-- see could-be-better
```

Note stop 3: focusing stop 2 (the search input) opens the search, and moving on
to stop 3 closes it, but focus lands inside the closing overlay anyway.

The sidebar then repeats `a` title / `label` toggle down the book. The audit
stopped at its 40-tab limit, not because the sidebar had ended.

### Settings dialog — all ok

- `Tab` x5 reaches `#tb-settings` (a labelled `<button>`).
- `Enter` opens a native `:modal` `<dialog>`; focus moves to the first checked
  theme radio (`name="tb-theme"`).
- While open, programmatically focusing a header link did not move focus out of
  the dialog: the background is inert.
- `Escape` closes it and focus returns to the trigger.
- `ArrowDown` inside the radio group changes the scheme; the `change` handler
  drives Material's palette input.

### Search — all ok

- `/` opens the overlay and focuses `[data-md-component="search-query"]`.
- typing `factor` rendered 26 result links.
- `Escape` closes the overlay.

### Booklet widget — one could-be-better

- The FAB is named by its visible text ("Σ Formulae") and `Enter` opens the
  panel, setting `aria-expanded="true"`.
- The resize separator is keyboard-operable (`ArrowRight` resized 430 → 438px).
- `Escape` closes the panel and returns focus to the FAB.
- **Could be better:** focus stays on the FAB when the panel opens. The panel is
  a non-modal `role="dialog"` (`aria-modal="false"`), so the state is announced
  through `aria-expanded`; moving focus to the first control inside would match
  the WAI-ARIA dialog pattern more closely. This is in a file we own
  (`assets/booklet/booklet.js`) but was **not changed**: the current behaviour
  is defensible for a non-modal panel, and a behavioural change without a test
  is out of keeping with this task.

### Figure — all ok

- The drawing carries `role="img"` and a plain-English `aria-label`.
- The range inputs are keyboard-operable and have a visible focus style.
- The readout is an `aria-live="polite"` region, so a keyboard change is
  announced.

### No JavaScript — all ok

With `javaScriptEnabled: false` on the same book page:

```json
{
  "math": 39,
  "mainWords": 1566,
  "settingsPresent": true,
  "settingsVisible": false,
  "bookletFab": false,
  "searchInputVisible": false
}
```

The prose and the maths are there; the Settings trigger is present but hidden;
the search input and the booklet are absent, as enhancements should be. See
`/tmp/pi-delegate/del-7/no-javascript.png`.

---

## 3. How maths is read aloud — a recorded position

This is a **recorded position with known limitations**, not a fix. No screen
reader was run.

### What we actually ship

Verified from `engine/src/textbook/js/katex-render.mjs` and the built HTML:

- KaTeX runs at build time with `output: "mathml"` and `throwOnError: true`.
- Each expression becomes
  `<math><semantics>…<annotation encoding="application/x-tex">LATEX</annotation></semantics></math>`.
  The wrapper `<span class="katex">` is stripped, so no KaTeX CSS or font is
  needed at runtime.
- The Section 1.1 page carries 39 `<math>` elements and 39 annotations. **No
  `aria-label` or `alttext` is added**, and no speech rule engine (SRE) is
  shipped.
- A bad expression becomes `<span class="math-error" title="…">LATEX</span>`,
  which reads the raw TeX rather than failing silently.

### What screen readers do with it

This is the part we cannot honestly claim to have measured. What follows is the
documented platform behaviour we are designing against, not a result from this
repository.

- MathML is the intended accessible representation, and current Chromium and
  Firefox support MathML Core. Whether a screen reader reads it well depends on
  the browser + assistive-technology pair, and support is uneven.
- The `<annotation>` is metadata inside `<semantics>`, not the rendered content.
  Assistive technology may traverse it as text or ignore it; it is not a
  designed speech alternative.
- Without a speech rule engine, the reading of anything beyond simple
  left-to-right notation — fractions, powers, roots, functions, matrices — is
  often literal or wrong. "x squared" and "x sub two" are not guaranteed.

The honest summary is: **our maths is visual and structurally marked up; it is
not reliably spoken.** That is a limitation of the current platform and of not
shipping an SRE, not of the KaTeX output being wrong.

### What we would have to ship to do better

Build-time speech text (the no-JavaScript-compatible option). Run a speech rule
engine such as MathJax SRE offline in the build and attach the result to each
`<math>` as `alttext` or `aria-label`. This keeps the page scriptless. It is not
free: an `aria-label` on `<math>` overrides the MathML tree for assistive
technology and freezes one reading; SRE output is verbose and not always better
than the MathML; it adds a build dependency and a cache; and expressions using
custom macros need checking.

Runtime SRE (rejected for now). Shipping MathJax/SRE in the browser would give
better speech in some pairings, but it is a runtime maths dependency — exactly
what the build-time MathML design exists to avoid — and it would fail the
no-JavaScript test in §1.

Per-expression hand-written alternatives (not scalable). Correct, but 39
expressions on one page and thousands across the book, and they drift from the
formula.

### The position

Keep build-time MathML. Do not ship a runtime SRE. Do not blanket-add
`aria-label`s from a machine: a wrong reading is worse than none. Revisit this if
a reader reports a specific expression that reads wrongly, and then fix that
expression with a checked, hand-written alternative. Record the limitation
rather than imply the maths is fully accessible.

---

## 4. Fixes that need a file owned by another agent

The two keyboard findings are in Material's generated markup and CSS, so they
cannot be fixed in the files this task owns. The figure-token box is a third,
separate gap. The exact changes needed:

1. **Invisible Tab stop in the closed search** (`broken`).
   `assets/stylesheets/extra.css` is the right home. Focusing the search input
   opens the overlay; tabbing on to the next control closes it again, but
   Material then moves focus onto `.md-search__scrollwrap` (`tabindex="0"`),
   whose parent `.md-search__output` has faded to `opacity: 0`. The audit
   measured, at the moment of that Tab stop, `#__search.checked === false` and
   `opacity === 0`. Make the closed output hidden to keyboard traversal and
   visible when the search opens. The candidate rule below was injected in the
   browser and verified to remove the stop **and** keep the 26 results visible
   when `/` opens the search:

   ```css
   .md-search__output { visibility: hidden; }
   [data-md-toggle="search"]:checked ~ .md-header .md-search__output {
     visibility: visible;
   }
   ```

   (`assets/stylesheets/extra.css` is out of scope for this task; a naive
   `visibility: hidden` without the second selector hides the results, which was
   also checked.)

2. **Unnamed sidebar expand/collapse toggles** (`could be better`, but arguably
   a WCAG 4.1.2 Name, Role, Value failure). Material's
   `partials/nav-item.html`, in the `navigation.indexes` branch, renders the
   toggle as an icon-only `<label tabindex="0">` with no text and no
   `aria-label`; the section title is in the sibling `<a>`. Every one of the 133
   toggles on the audited page had empty `innerText` and no `aria-label`, and
   `ariaSnapshot` on a sample returned `""`. The fix belongs in a
   `renderers/mkdocs/overrides/partials/nav-item.html` override. In the branch
   that emits the icon-only toggle, add a name, for example:

   ```jinja
   <label class="md-nav__link {{ class }}" for="{{ path }}"
          id="{{ path }}_label" tabindex="{{ tabindex }}"
          aria-label="{{ render_title(nav_item) | striptags }}">
     <span class="md-nav__icon md-icon"></span>
   </label>
   ```

   The empty label is also the `aria-labelledby` target of the submenu `<nav>`,
   so this fix names the submenu as well.

3. **Figure token contrast** (the last unchecked box in item 10) belongs in
   `tests/test_themes.py`, which another agent owns. `fig-warn`, `fig-good` and
   `fig-grid` are still outside the contrast invariant.

---

## 5. Reproducing the audit

The audit needs a built site and Node with Playwright. It was run against a copy
of `site/`, so it never touched the shared build.

```bash
# 1. Snapshot the built site (the MkDocs build; see scripts/check.sh "builds").
cp -a /home/leon/Work/maths-site/site /tmp/pi-delegate/del-7/site

# 2. Run the browser audit. It serves the snapshot through request interception
#    (no port) and prints the findings, then writes audit-findings.json and
#    screenshots beside itself.
cd /tmp/pi-delegate/del-7
PLAYWRIGHT_PATH=/home/leon/.local/share/mise/installs/npm-playwright/latest/node_modules/playwright \
  node audit.cjs | tee audit-report.txt

# 3. The static check.
cd /home/leon/Work/maths-site
uv run python -m pytest tests/test_no_javascript.py -q
```

The audit is deterministic given the same `site/` snapshot: the page, the
browser build and the keystrokes are fixed. It is **not** wired into
`pytest tests/`, because it needs a built site and a browser, which the CI
`content` job does not have; the static check is the part that runs there.

## Sources to consult (not yet fetched into `research/sources/`)

- WCAG 2.2, success criteria 1.3.1, 1.1.1, 2.1.1, 2.4.3, 2.4.7, 2.4.11 and
  4.1.2 — the criteria behind the audit.
- The W3C MathML accessibility guidance, for the accessible-name and
  speech-alternative options in §3.
- WAI-ARIA Authoring Practices, dialog (modal) pattern — the basis for the
  Settings dialog findings.

No accessibility source is currently vendored under `research/sources/`; when one
is, it should be added there and cited here, the way `research/pedagogy.md` cites
its sources.
