/*
 * Check the figure kit's **pure** layer, with no browser.
 *
 * The list of claims is not here: it is `lib/kit-contract.ts`, one table that this
 * command and `tools kit` both read. This is the half that runs under plain `node`,
 * because the drawing and formatting layers are pure functions returning strings and
 * numbers and they are what a module composes hundreds of times. Checking them only in
 * the browser would mean checking them only where Playwright is configured, which is not
 * the ordinary gate.
 *
 * So this runs every row whose tier is `pure` or `both`, imports the kit that ships (so
 * it checks what a figure actually gets), and prints how many rows it ran and how many
 * kit exports those rows cover. An export with no row is named in that line rather than
 * silently unchecked.
 *
 * Usage: tools kit-pure [kitPath] — the `SURFACE` table below, which is what
 * `tools help kit-pure` prints.
 */
import { fileURLToPath } from "node:url";
import { parseArgs } from "../lib/flags.js";
import { conclude, judge, listLines, observe, rowsFor } from "../lib/kit-contract.js";
/** What this command accepts. `tools help kit-pure` is generated from this table. */
export const SURFACE = {
    positional: [
        { name: "kitPath", help: "the kit to check; by default the one that ships", required: false },
    ],
    flags: {
        list: { kind: "boolean", help: "print every row this tier runs, with its tier and what it covers" },
    },
};
export async function run(argv) {
    const { values, positional } = parseArgs(argv, SURFACE);
    if (values.list === true) {
        for (const line of listLines("pure"))
            console.log(line);
        return 0;
    }
    const kitPath = positional[0] ?? fileURLToPath(new URL("../../../assets/figures/kit.js", import.meta.url));
    const kit = await import(kitPath);
    const rows = rowsFor("pure");
    return conclude({
        tier: "pure",
        kitExports: Object.keys(kit),
        verdicts: judge(rows, observe(rows, kit)),
        title: "the figure kit's pure layer",
    });
}
