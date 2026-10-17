/*
 * How a check reports, and what its exit code means.
 *
 * Every check here answers the same question — "is this acceptable?" — and the answer
 * has to be legible in a CI log and usable from a shell. Two rules, both learned from
 * the scripts this replaces:
 *
 *   * **a check that finds nothing prints that it found nothing**, with the number it
 *     examined. "no output" and "did not run" are indistinguishable otherwise, and the
 *     figure audits have twice reported success over an empty set;
 *   * **a warning is not an error unless the caller says so.** The distinction is in
 *     the exit code, so `scripts/preview-themes.sh` can decide.
 */

export type Severity = "error" | "warning";

export type Finding = {
  severity: Severity;
  /** Where, in the form a reader can act on: a page, a figure, a file. */
  where: string;
  /** What is wrong, in one sentence, stating the measurement rather than the rule. */
  what: string;
};

/** Collect findings, and count what was examined so a run cannot look empty. */
export class Report {
  readonly findings: Finding[] = [];
  examined = 0;

  constructor(readonly title: string) {}

  error(where: string, what: string): void {
    this.findings.push({ severity: "error", where, what });
  }

  warn(where: string, what: string): void {
    this.findings.push({ severity: "warning", where, what });
  }

  get errors(): number {
    return this.findings.filter((finding) => finding.severity === "error").length;
  }

  get warnings(): number {
    return this.findings.filter((finding) => finding.severity === "warning").length;
  }

  /** Print the findings and a summary that always states the count examined. */
  print(unit: string): void {
    for (const { severity, where, what } of this.findings) {
      console.log(`${severity === "error" ? "FAIL" : "WARN"}  ${where}: ${what}`);
    }
    const summary = `${this.title}: ${this.examined} ${unit} examined, ${this.errors} errors, ${this.warnings} warnings`;
    console.log(summary);
  }

  /** The exit code: non-zero when an error was recorded, never for a warning alone. */
  exitCode(options: { warningsAreErrors?: boolean } = {}): number {
    if (this.errors > 0) return 1;
    if (options.warningsAreErrors && this.warnings > 0) return 1;
    return 0;
  }
}

/** Parse `--flag value` pairs and positionals, rejecting an unknown flag. */
export function parseArgs(
  argv: string[],
  spec: { flags: Record<string, "string" | "boolean">; positional: string[] },
): { values: Record<string, string | boolean>; positional: string[] } {
  const values: Record<string, string | boolean> = {};
  const positional: string[] = [];
  let i = 0;
  while (i < argv.length) {
    const arg = argv[i]!;
    if (arg === "--") {
      positional.push(...argv.slice(i + 1));
      break;
    }
    if (arg.startsWith("--")) {
      const name = arg.slice(2);
      const kind = spec.flags[name];
      if (!kind) throw new Error(`unknown option --${name}`);
      if (kind === "boolean") {
        values[name] = true;
        i += 1;
      } else {
        const value = argv[i + 1];
        if (value === undefined) throw new Error(`--${name} needs a value`);
        values[name] = value;
        i += 2;
      }
    } else {
      positional.push(arg);
      i += 1;
    }
  }
  for (const [index, name] of spec.positional.entries()) {
    if (positional[index] === undefined) throw new Error(`missing argument <${name}>`);
  }
  return { values, positional };
}
