export type Severity = "error" | "warning";

export type Finding = {
  severity: Severity;
  where: string;
  what: string;
};

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

  print(unit: string): void {
    for (const { severity, where, what } of this.findings) {
      console.log(`${severity === "error" ? "FAIL" : "WARN"}  ${where}: ${what}`);
    }
    const summary = `${this.title}: ${this.examined} ${unit} examined, ${this.errors} errors, ${this.warnings} warnings`;
    console.log(summary);
  }

  exitCode(options: { warningsAreErrors?: boolean } = {}): number {
    if (this.errors > 0) return 1;
    if (options.warningsAreErrors && this.warnings > 0) return 1;
    return 0;
  }
}
