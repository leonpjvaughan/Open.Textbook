export class Report {
    title;
    findings = [];
    examined = 0;
    constructor(title) {
        this.title = title;
    }
    error(where, what) {
        this.findings.push({ severity: "error", where, what });
    }
    warn(where, what) {
        this.findings.push({ severity: "warning", where, what });
    }
    get errors() {
        return this.findings.filter((finding) => finding.severity === "error").length;
    }
    get warnings() {
        return this.findings.filter((finding) => finding.severity === "warning").length;
    }
    print(unit) {
        for (const { severity, where, what } of this.findings) {
            console.log(`${severity === "error" ? "FAIL" : "WARN"}  ${where}: ${what}`);
        }
        const summary = `${this.title}: ${this.examined} ${unit} examined, ${this.errors} errors, ${this.warnings} warnings`;
        console.log(summary);
    }
    exitCode(options = {}) {
        if (this.errors > 0)
            return 1;
        if (options.warningsAreErrors && this.warnings > 0)
            return 1;
        return 0;
    }
}
