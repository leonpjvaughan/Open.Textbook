# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** `.agents/todo-closed.md` holds every closed
one **in full** — the diagnosis is the valuable part: what was wrong, how it was
measured and what fixed it. A one-line summary keeps the number and deletes the
reasoning, so nothing is compressed on the way across and nothing is deleted.

**An item is here because it is still true.** Before closing one, run its own
done-means; an item whose heading says done and whose checklist does not is the
failure this file has had twice, so the list below, the headings and the boxes
are checked against each other on every pass.

**Items 79–123 are closed,** each with its measurement and fix in
`.agents/todo-closed.md`; 124–129 below are the open ones. The
*interactive-aid backlog* — which figures and interactions a book still wants — is
`ideas.md`; it is a plan rather than a defect list, and it is written for the
author choosing what to build next.

**Not in the queue, and not forgotten.** Accepted limitations live where the check
that records them lives, not here: the booklets whose items cannot be parsed
(`tests/test_verify_coverage.py`), the specifications that publish no finer
granularity than a strand (`books/*/curriculum.yaml`), and the deferred chapter
rewrites ranked in `research/pedagogy-audit/README.md`. An item in this file is a
defect this repository can fix; those are decisions already taken.

## 124 — Every table renders on the browser's 1px cell padding

**What is wrong.** No stylesheet here styles `table`, `th` or `td`:

```
$ grep -rn "md-typeset table\|md-typeset td\|md-typeset th" assets engine --include=*.css
assets/stylesheets/extra.css:767:  .md-typeset table,        # a print-media rule only
assets/stylesheets/extra.css:783:  .md-typeset thead {       # a print-media rule only
```

So the user-agent default is what every reader sees. Measured on the built site
(computed style of a `td` and a `th` in `site/numerical-methods/`):

```
{ "td": { "padding": "1px", "text-align": "start" },
  "th": { "padding": "1px", "text-align": "center" } }
```

Text-heavy tables survive 1px — the A–Z and the nine-kinds table are separated by
their own column width and line height. A table of short numbers is not: the
worked table on `reading-the-class` printed `1 0 1 −4` as one blob, and the fix
that shipped was local — the three coefficients were merged into one cell
(`$1$, $0$, $1$`) so the reader can see where each number ends. That is a
workaround for a collection-wide gap.

**The fix.** Give cells padding in `assets/stylesheets/extra.css`, for every book,
then re-check the tables already tuned against the current spacing:
`books/numerical-methods/docs/assets/stylesheets/book-local.css` sets explicit
column widths for the A–Z at `min-width: 1024px`, and padding takes content space
out of every column, so those widths will need re-measuring rather than assuming.

```css
.md-typeset table th,
.md-typeset table td { padding: 0.4em 0.6em; }
```

**done means**

- [ ] a built page's `td` computes to padding other than `1px`
- [ ] the A–Z's five tables still fit at 1024px and 1280px: no `.table-scroll`
      that scrolls at desktop width, and `node tools/dist/cli.js check-mobile site`
      reports 0 errors
- [ ] the worked table on `reading-the-class` reads as separate columns in a light
      and a dark capture, with and without the merged coefficient cell
- [ ] `scripts/check.sh` passes

## 125 — The old repository says it is archived, and nothing archived it

**What is wrong.** The move was accepted on one condition: `suspension-kinematics`
is archived and its README points at the new home. Four documents were written as
though that had happened:

```
$ gh repo view leonpjvaughan/suspension-kinematics --json isArchived -q .isArchived
false

$ grep -rn "archived" DECISIONS.md solvers/otkd/AGENTS.md solvers/otkd/docs/releasing.md
DECISIONS.md:13:archived at its old address). One ABI, `solvers/ABI.md`: ...
DECISIONS.md:23:not carried with `git subtree`. The history stays in the archived repository, ...
solvers/otkd/AGENTS.md:31:  2026-10-26 and `suspension-kinematics` is archived. Its version is ...
solvers/otkd/docs/releasing.md:4:> `suspension-kinematics` is archived. There is no separate tag, wheel or GitHub ...
```

So the repository is still open for issues and pulls, its CI still runs against
files that no longer move, and the decision record asserts something false. The
`otkd` history is only readable *because* the repository is public and kept; an
archive is what makes that a promise rather than an accident.

**The fix.** Write a README at the root of the old repository that says the
project moved to `solvers/otkd` in `Open.Textbook`, names the ABI and the tag
scheme, and gives the two commands a returning reader needs; then
`gh repo archive leonpjvaughan/suspension-kinematics --yes`. Check the four claims
afterwards: each must be true, and none may name a path that only existed in the
old repository.

**done means**

- [ ] the old repository's README names `solvers/otkd`, the collection tag and
      `solvers/ABI.md`
- [ ] `gh repo view ... --json isArchived` prints `true`
- [ ] the four claims in `DECISIONS.md`, `solvers/otkd/AGENTS.md` and
      `solvers/otkd/docs/releasing.md` are true, with no path that 404s
- [ ] `books/maths-applied` still builds: its data README and `sources.yaml` links
      resolve to the new home

## 126 — Both otkd CI paths are green without having run anything

**What is wrong.** The gate was split so a branch runs a fast Python suite and
`main` runs three jobs on separate machines. Neither has executed. Every job
carries a change detector, and the last pushes touched no file under
`solvers/otkd/`, so each job finished in four seconds:

```
$ gh run view 40401538576 --json jobs \
    -q '.jobs[] | select(.name|test("otkd")) | {name, conclusion, startedAt, completedAt}'
{"name":"otkd kernels","conclusion":"success","startedAt":"2026-10-26T21:07:51Z","completedAt":"2026-10-26T21:07:55Z"}
{"name":"otkd tests",  "conclusion":"success","startedAt":"2026-10-26T21:07:51Z","completedAt":"2026-10-26T21:07:56Z"}
{"name":"otkd bundle", "conclusion":"success","startedAt":"2026-10-26T21:07:51Z","completedAt":"2026-10-26T21:07:55Z"}
{"name":"otkd (dev)",  "conclusion":"skipped","startedAt":"2026-10-26T21:07:49Z","completedAt":"2026-10-26T21:07:49Z"}
```

No branch run has run `pytest -q --ignore=tests/test_wasm.py -n 2`, and no `main`
run has run the split suite, the kernel compiles or the bundle rebuild. A green
tick on a job that did nothing is the failure mode this split was meant to remove,
so the first real run has to be watched rather than assumed.

**The fix.** Land a commit that touches `solvers/otkd/` (item 127 is one) on a
branch first, so the fast suite runs, then merge it so the three `main` jobs run.
Read the logs: a real run prints collected test counts and durations. Write the
timings next to the job in `.github/AGENTS.md`, since "path-gated" is only
defensible with the number it costs.

**done means**

- [ ] a non-`main` run's log shows the fast suite collected and ran its tests, and
      the job is green
- [ ] a `main` run's logs show all three jobs doing their work, and all are green
- [ ] the times are recorded beside the job that costs them
- [ ] a push that touches nothing under `solvers/otkd/` still short-circuits in
      seconds, and says so

## 127 — The package's own docs describe the release workflow the move deleted

**What is wrong.** `solvers/otkd` came with documents that describe a release
process that no longer exists: there is no `.github/` tree and no `scripts/version.py`.

```
$ ls solvers/otkd/.github solvers/otkd/scripts/version.py
ls: cannot access 'solvers/otkd/.github': No such file or directory
ls: cannot access 'solvers/otkd/scripts/version.py': No such file or directory
```

Three files still present it as current:

- `solvers/otkd/AGENTS.md:82` — "The version is written in
  `src/open_textbook/otkd/__init__.py`, not derived from a tag." The version is
  derived from the collection tag by `hatch-vcs` into `_version.py`; the same file
  says so twenty lines earlier, and `pyproject.toml` configures it.
- `solvers/otkd/docs/wasm.md:244` — "`.github/workflows/release.yml` runs that on
  every push to `main` that warrants a release". There is no such workflow.
- `solvers/otkd/docs/security.md:41` — "`release.yml` opts into `contents: write`".
  The same.

**The fix.** Correct `AGENTS.md` to match `pyproject.toml`. For the two documents,
say what replaced the workflow rather than deleting the reasoning: the collection's
tag is the version, `scripts/build-otkd.sh` rebuilds the bundle, and the empirical
tests are in the gate. Keep `docs/releasing.md` as it stands: it is already marked
superseded, which is the pattern the other two should follow.

**done means**

- [ ] `solvers/otkd/AGENTS.md` describes the version the way `pyproject.toml` does
- [ ] no document in `solvers/otkd` presents `release.yml` or `scripts/version.py`
      as current; both appear only under a superseded note
- [ ] `grep -rn "not derived from a tag" solvers/` prints nothing
- [ ] a reader following any `solvers/otkd` document reaches a file that exists

## 128 — The runner fallback cannot be switched on the way the README says

**What is wrong.** The four self-hosted runners on this machine are kept as a warm
fallback, and the README offers a two-command switch:

```
$ grep -n "RUNNER_LABEL" deploy/runner/README.md
19:gh variable set RUNNER_LABEL --body self-hosted   # point CI at it
22:gh variable delete RUNNER_LABEL                  # put CI back on ubuntu-latest

$ grep -c "vars.RUNNER_LABEL" .github/workflows/verify.yml
0
$ gh variable list
(no variables)
```

The workflow no longer reads the variable: it was removed deliberately, because a
repository setting deciding where CI runs is a hidden dependency. So setting
`RUNNER_LABEL` today changes nothing, and the documented fallback is a command
that silently does nothing. The fleet itself is fine:

```
$ docker ps --format '{{.Names}} {{.Status}}'
runner-runner-1 Up 4 hours ... runner-runner-4 Up 4 hours
```

**The fix.** Keep the fleet and make the switch honest, without restoring the
variable indirection: the README names the one line to edit in
`.github/workflows/verify.yml` for each job, and `deploy/runner/start.sh --status`
reports what `docker compose ps` reports plus whether the runners are registered,
so "warm fallback" is something a person can check rather than believe.

**done means**

- [ ] `deploy/runner/README.md` describes the switch that exists, not the variable
- [ ] `deploy/runner/start.sh --status` prints the four containers and their
      registration state without starting or stopping anything
- [ ] the README says why the variable was removed, so nobody restores it thinking
      the fallback is broken
- [ ] CI stays on `ubuntu-latest` and `gh variable list` stays empty

## 129 — The parabolic page shows the same fact twice

**What is wrong.** The page has two figures about the explicit heat scheme's time
step:

```
$ grep -n ":::figure" books/numerical-methods/docs/parabolic/index.md
45::::figure step-limit
117::::figure heat-lab
```

`step-limit` plots the step count against the mesh (`2N^2`) and its paragraph says
the limit "decides whether a mesh is affordable". `heat-lab` runs the scheme and
lets the reader push `r` past `1/2`, and its paragraph says the number that decides
it is `r = \alpha\Delta t/\Delta x^2`. Both answer "how many steps can I take",
from two directions, and a reader meets the second as though it were new. The
page's common-error table then repeats the same point a third time.

**The fix.** Decide what each figure owns and write only that. `step-limit` owns
the **count**: how the mesh decides the number of steps, which is a cost question.
`heat-lab` owns the **threshold**: what happens either side of `r = 1/2`, which is
a stability question. Rewrite the two introductions so neither restates the other,
and drop the duplicated sentence from the common-error paragraph.

**done means**

- [ ] each figure's introduction asks a different question, and neither states the
      other's answer
- [ ] the common-error paragraph does not repeat the threshold the lab shows
- [ ] both figures audit clean in both schemes and at 390px
- [ ] `python -m textbook.lint numerical-methods` reports nothing
