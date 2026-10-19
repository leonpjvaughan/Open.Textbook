# AGENTS.md — the tools

One TypeScript package, one entry point, one place to look. It holds every check and
measurement in this repository that is not Python, and it exists because thirteen loose
files in `scripts/` had no index and five of them carried their own copy of the same
browser plumbing.

```
node tools/dist/cli.js <command> [options]
node tools/dist/cli.js help [<command>]
node tools/dist/cli.js help --check
```

Read the root `AGENTS.md` first. Its **Build and verify**, **Toolchain** and
**Theming** sections still apply.

## The commands

The first column is the shape worth remembering, not the whole surface: every flag a
command accepts is in its `SURFACE` table and in `tools help <command>`.

| Command | What it does |
|---|---|
| `audit <siteDir>` | **Measure every figure's paint in both schemes** against the panel behind it. `--mobile` asks the other question — what reaches a 390px screen — and fails below 9px |
| `kit [siteDir] [route]` | The figure kit's **DOM** contract, checked through a real page: roles, live regions, focus stops, colour classes |
| `kit-pure [kitPath]` | The kit's drawing and formatting layers, under plain `node`, so they are in the ordinary gate |
| `check-mobile [siteDir]` | Fail when a phone-width page is wider than the screen, at five widths |
| `budget [siteDir] [route]` | Bytes over the wire on a first load, against a server that reproduces the Worker's cache headers |
| `screenshot <siteDir> <outDir> -- name:route …` | Capture routes, one image per scheme, and fail if the captures do not differ |
| `preview --root <dir> -- name:route …` | **Every bundle in both schemes**: the reader's preference reached the page, the tokens and the painted text clear their contrast floors, and the route layout is asserted before a browser starts. `--audit` walks every text element on the page |
| `readout <siteDir> [--verify] [--json file]` | **Recompute the arithmetic every figure declares**, at several settings, with SymPy. `--verify` hands the claims to `python -m textbook.working`. There is no sentence heuristic: an assertion is data, and a figure that states arithmetic and declares none is reported by name |
| `types` | **The type ratchet.** Fails if the `tsc` error count grows — or falls without the baseline being lowered |

`tools help` is generated from those tables, so it cannot go stale, and
`tools help --check` proves each usage line against its parser: every flag the command
accepts is named in the line, every name in the line is accepted, a misspelling is
rejected, a value-less string flag is an error, `--` still ends the flags and a required
positional is still required. `help` runs that check before it prints, so a disagreement
is reported instead of a line that lies. `tools help <command>` prints one command's
flags with what each one does.

**The kit's contract is one table, run twice.** `lib/kit-contract.ts` holds every
assertion as a row — its name (which is its failure message), its `tier` (`pure`, `dom`
or `both`), the kit export it covers, and how to see the answer — and both commands read
that one table: `kit-pure` runs the `pure` and `both` rows under `node`, and `kit` serves
the compiled module to the page (`/__kit-contract.js`) and runs the `dom` and `both` rows
there, one fresh `<maths-figure>` per row. Every run prints how many rows its tier ran and
how many exports those rows cover, and names any export with no row at all, so "checked
only in one tier" and "not checked at all" are answers the output gives rather than
questions nobody asked. A row whose `tier` no runner reads fails the run, and `--list`
prints the rows one tier is responsible for.


## The layout

```
tools/
├── build.mjs          # the bootstrap: it compiles the TypeScript, so it is plain JS
├── src/
│   ├── cli.ts         # the command table and the dispatcher
│   ├── lib/
│   │   ├── browser.ts # Playwright, launch, the two servers, the context, the guard
│   │   ├── flags.ts   # one argument surface per command: the parser and the help line
│   │   └── report.ts  # findings, the summary line, the exit code
│   └── commands/      # one file per command, each exporting its `SURFACE`
└── dist/              # compiled, committed, drift-checked
```

## Rules local to the tools

- **A command exports `run(argv): Promise<number>` and returns its exit code.** It does
  not call `process.exit`, so a test can drive it in-process and the CLI owns the exit.
- **A command's arguments are one table, and `run` parses nothing else.** It exports
  `SURFACE` — `{ positional, flags }`, each flag with its kind, its default and a
  sentence — and hands it to `parseArgs`. `cli.ts` reads the same table for `tools help`.
  There is no second place to add a flag and no prose usage string to drift from it:
  `audit` accepted `--maps` for months that `help` never mentioned, and `readout` and
  `preview` hand-wrote loops that **ignored** an unknown flag, so a typo in CI read as a
  passing run. A flag that is only valid together with another one is not expressible
  here — say so rather than special-casing it in the parser.
- **A check that examines nothing must fail.** "No output" and "did not run" are
  indistinguishable otherwise, and the figure audits have twice reported success over an
  empty set. `Report.print` always states the count.
- **A warning is not an error unless the caller says so.** The distinction lives in the
  exit code so `preview-themes.sh` can decide.
- **Nothing is bundled and nothing is minified.** `tsc` emits one file per source and
  keeps the comments, because the compiled file is committed and a reader opens it. The
  build runs `prettier` over the output so it reads like the rest of the tree.
- **Emit and check are separate.** `tsconfig.kit.json` and `tsconfig.tools.json` set
  `noCheck`; `tsconfig.json` checks and `tools types` ratchets. A build that refused to
  emit until every annotation existed would be a build nobody runs.
- **Playwright is resolved at runtime**, through `PLAYWRIGHT_PATH` then the bare
  specifier then a mise install, because it is not a dependency — `npm ci` would
  download three browsers for it. `lib/browser.ts` is the only place that resolves it.
- **The two servers are different on purpose.** `serveStatic` intercepts, and everything
  uses it except the budget, which binds a port: `transferSize` is populated only for a
  request that crossed the network stack, so an intercepted response reports 0 and the
  budget would read as far too small.

## Common tasks

- **Rebuild after editing a command** — `npm run build`, or `node tools/build.mjs tools`.
- **See the type work list** — `node tools/dist/cli.js types --list`.
- **See what a command accepts** — `node tools/dist/cli.js help <command>`; add a flag
  to its `SURFACE` and it appears in both that and the usage line.
- **Prove the help is true** — `node tools/dist/cli.js help --check`, one line per
  command with its flag and positional counts.

## Read next

`assets/AGENTS.md` for the figure kit the audits measure, `scripts/AGENTS.md` for the
shell that calls these, and `tests/AGENTS.md` for how the tests drive them.
