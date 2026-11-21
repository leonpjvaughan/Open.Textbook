# AGENTS.md — the tools

One TypeScript package, one entry point: every non-Python check and measurement here.

```
node tools/dist/cli.js <command> [options]
node tools/dist/cli.js help [<command>]
node tools/dist/cli.js help --check
```

Read the root `AGENTS.md` first; its **Build and verify**, **Toolchain** and **Theming** apply.

## The commands

Every accepted flag is in the command's `SURFACE` and in `tools help <command>`.

| Command | What it does |
|---|---|
| `assets [siteDir]` | **Every asset a page reaches and every manifest entry** against the tree; orphans, misses, unreachable entries named |
| `offline [siteDir] [--route path]` | Network-off read after a deploy emptied the cache: the service worker's answer, not the server's |
| `audit <siteDir>` | **Every figure's paint in both schemes** against its panel; `--mobile` fails below 9px at 390px |
| `kit [siteDir] [route]` | The kit's **DOM** contract on a real page: roles, live regions, focus stops, colour classes |
| `canvas [siteDir]` | **Where the ink lands**: `getBBox()` in the SVG's space against its `viewBox`; `<text>` inside, a mark may cross with ink inside (`wishbone-hero` rays reach an off-drawing centre); `--cases` under `node` |
| `kit-pure [kitPath]` | The kit's drawing and formatting layers under plain `node`, in the gate |
| `check-mobile [siteDir] [--route path]` | Fail a page wider than a phone screen: five widths, one page of each kind, every book |
| `budget [siteDir] [route]` | First-load bytes, against a server reproducing the Worker's cache headers |
| `screenshot <siteDir> <outDir> -- name:route …` | Capture routes, one image per scheme; fail if they do not differ |
| `preview --root <dir> -- name:route …` | **Every bundle in both schemes**: preference reached the page, tokens and painted text clear their contrast floors, layout asserted before a browser starts; `--audit` every text element |
| `readout <siteDir> [--verify] [--json file]` | **Recompute each figure's declared arithmetic**, several settings, SymPy; `--verify` to `python -m textbook.working`; a figure stating arithmetic with no assertion is named |
| `types` | **The type ratchet**: `tsc` errors may not grow, nor fall without the baseline |

`tools help` is generated from those tables; `--check` proves each usage line against its parser: every accepted flag named, every name accepted, a misspelling rejected, a value-less string flag an error, `--` still ends the flags, a required positional still required. `help` runs that check before printing.

**The kit's contract is one table, run twice.** `lib/kit-contract.ts` holds each assertion as a row: name (its failure message), `tier` (`pure`/`dom`/`both`), export covered, how to see the answer. `kit-pure` runs `pure`+`both` under `node`; `kit` serves the compiled module to the page (`/__kit-contract.js`), running `dom`+`both` with one fresh `<maths-figure>` per row. Each run prints its tier's rows and exports covered, names any export with no row; a `tier` no runner reads fails; `--list` prints one tier's rows.

## The layout

`build.mjs` bootstrap, plain JS because it compiles the TypeScript; `src/cli.ts` command table and dispatcher; `src/lib/` — `browser.ts` Playwright, launch, the two servers, context, guard; `flags.ts` one argument surface per command; `layouts.ts` the route layouts `preview` asserts, witness pages included; `routes.ts` the pages a built site has; `report.ts` findings, summary line, exit code; `src/commands/` one file per command, each exporting its `SURFACE`; `dist/` compiled, committed, drift-checked.

## Rules local to the tools

- **`run(argv): Promise<number>` returns the exit code**, never `process.exit`; a test drives it in-process.
- **One argument table per command; `run` parses nothing else.** Export `SURFACE` (`{ positional, flags }`; kind, default, sentence per flag) to `parseArgs`, which `cli.ts` reads for `tools help` — never a second place for a flag, never a prose usage string. A flag valid only with another is not expressible: say so, do not special-case it.
- **A check that examines nothing must fail**; `Report.print` always states the count.
- **A warning is not an error unless the caller says so**; the exit code carries the distinction so `preview-themes.sh` decides.
- **Nothing is bundled or minified**: `tsc`, one file per source, comments kept (the output is committed and read); `prettier` formats it.
- **Emit and check are separate**: `tsconfig.kit.json` and `tsconfig.tools.json` set `noCheck`; `tsconfig.json` checks and `tools types` ratchets.
- **Playwright resolves at runtime**: `PLAYWRIGHT_PATH`, the bare specifier, then a mise install; not a dependency (`npm ci` would download three browsers). `lib/browser.ts` is the only resolver.
- **A page measured is the build's answer, not a book's name**: `lib/routes.ts` reads the directory passed, a missing route is an error, never a constant route or a fallback.
- **The two servers differ on purpose**: `serveStatic` intercepts and everything uses it except the budget, which binds a port — `transferSize` exists only across the network stack.

## Common tasks

- **Rebuild after editing a command** — `npm run build`, or `node tools/build.mjs tools`.
- **Type work list** — `node tools/dist/cli.js types --list`.
- **What a command accepts** — `node tools/dist/cli.js help <command>`; a flag added to its `SURFACE` appears in the line too.
- **Prove the help** — `node tools/dist/cli.js help --check`, one line per command with flag and positional counts.

## Read next

`assets/AGENTS.md` for the kit the audits measure, `scripts/AGENTS.md` for the shell, `tests/AGENTS.md` for how the tests drive them.
