/*
 * Does the arithmetic a figure *prints* actually work?
 *
 * A readout is prose with numbers in it — "Simple interest is €1,500.00 × 0.07 × 4 =
 * €390.00" — and nothing checked it. Two of fourteen new figures shipped a statement
 * that does not produce the number beside it:
 *
 *     interest-growth   × 0.07 for a rate of 6.5%   (0.065 rounded to two places)
 *     ratio-share       3 × 14.29 = 42.86           (14.29 was already rounded)
 *
 * Structure, colour, contrast, legibility and the DOM contract all passed, because none
 * of them reads a number. This does: it takes the text a figure shows, finds every
 * `left = right` where both sides are pure numbers, and recomputes.
 *
 * **It is deliberately conservative.** Anything it cannot read — a formula with symbols,
 * a complex number, a scientific-notation unit it misparses — is counted as unread and
 * reported rather than passed, because "I could not check this" and "this is correct"
 * must not look the same.
 */

/** A statement whose printed result is not what its printed expression gives. */
export type Wrong = {
  /** The clause as shown, trimmed. */
  statement: string;
  /** The expression to the left of `=`, normalised. */
  left: string;
  /** The number shown to the right of `=`. */
  shown: number;
  /** What the left-hand side actually evaluates to. */
  computed: number;
};

export type Checked = {
  /** Statements evaluated and found consistent. */
  right: number;
  /** Statements that had an `=` but could not be read as pure arithmetic. */
  unread: string[];
  /** Statements whose arithmetic does not hold. */
  wrong: Wrong[];
};

const SUPERSCRIPTS: Record<string, string> = {
  "⁰": "^0", "¹": "^1", "²": "^2", "³": "^3", "⁴": "^4",
  "⁵": "^5", "⁶": "^6", "⁷": "^7", "⁸": "^8", "⁹": "^9",
};

/** The characters an expression may contain, plus the ones a rounded print adds. */
const NUMERIC = /^[0-9eE+\-*/().^ √]+$/;
/** What a scan for an expression may step over. `√` is part of the notation. */
const SCAN = /[0-9eE+\-*/().^ √]/;
const OPERATOR_BETWEEN = /[0-9)]\s*[+\-*/^]\s*[-(0-9]/;

/**
 * Everything a figure prints, in the form the checker reads.
 *
 * Exported because the transformation is the part that can be wrong, and a test that
 * cannot see it can only test the whole pipeline.
 */
export function normalise(text: string): string {
  let out = String(text);
  // The reader's minus, and the multiplication and division signs, are not ASCII.
  out = out.replace(/\u2212/g, "-").replace(/[–—]/g, "-");
  out = out.replace(/\u00d7/g, "*").replace(/\u00f7/g, "/");
  for (const [sup, plain] of Object.entries(SUPERSCRIPTS)) out = out.split(sup).join(plain);
  // A thousands separator, and only where it is one: `1,500` is 1500, `a, b` is a list.
  out = out.replace(/(\d),(?=\d{3}\b)/g, "$1");
  // Currency is a label on the number, not part of it.
  out = out.replace(/[£$€]/g, "");
  // A percentage is a number divided by a hundred, so `6.5% × 4` reads as arithmetic.
  out = out.replace(/(\d(?:\.\d+)?)\s*%/g, "($1/100)");
  return out;
}

/** The pure-numeric expression immediately left of `at`, or "". */
function leftOf(text: string, at: number): string {
  let i = at;
  while (i > 0 && SCAN.test(text[i - 1])) i -= 1;
  // A leading `.` is the end of the previous sentence, not a decimal point.
  return text.slice(i, at).trim().replace(/^\./, "");
}

/** The pure-numeric expression immediately right of `at`, or "". */
function rightOf(text: string, at: number): string {
  let i = at;
  while (i < text.length && SCAN.test(text[i])) i += 1;
  // A trailing `.` is the end of the sentence. `42.86.` is not a number, and reading it
  // as one made the checker call the statement unreadable instead of wrong.
  return text.slice(at, i).trim().replace(/\.+$/, "");
}

/** Evaluate an arithmetic expression of digits and operators, or null. */
function evaluate(expression: string): number | null {
  if (!expression || !NUMERIC.test(expression)) return null;
  // `√` is a square root, and it binds what follows: `√(6^2 + 8^2)` is a whole side of
  // the right-triangle figure. Without this the checker read `(6^2 + 8^2) = 10` as
  // arithmetic and called four correct statements wrong.
  const js = expression
    .replace(/√\s*(\d+(?:\.\d+)?)/g, "Math.sqrt($1)")
    .replace(/√/g, "Math.sqrt")
    .replace(/\^/g, "**");
  // The expression has already been restricted to digits, operators, parentheses,
  // `e` and `√`, so this is arithmetic and not a program. A syntax error is still a
  // "could not read", never a failure.
  try {
    const value = new Function(`"use strict"; return (${js});`)();
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

/** How far a printed number may sit from the exact value: half its last place. */
function tolerance(shownText: string, computed: number): number {
  const decimals = (shownText.split(".")[1] || "").replace(/[^0-9]/g, "").length;
  return 0.5 * Math.pow(10, -decimals) + Math.abs(computed) * 1e-9;
}

/**
 * Check every `left = right` a piece of text contains.
 *
 * Clauses are split on sentence ends and on `,`/`;` so that one statement's numbers
 * cannot run into the next's. A clause containing `≈` is skipped: it says the value is
 * approximate, and rounding it is the point.
 */
export function checkArithmetic(text: string): Checked {
  const normalised = normalise(text);
  const result: Checked = { right: 0, unread: [], wrong: [] };
  const clauses = normalised.split(/(?<=[.;])\s+|,\s+/);
  const seen = new Set<string>();
  for (const clause of clauses) {
    if (!clause.includes("=") || clause.includes("≈") || clause.includes("≠")) continue;
    // **Every** `=`, not the last: one clause often holds two statements —
    // "3 × 14.29 = 42.86 and 4 × 14.29 = 57.14" — and checking only the last would
    // have let the first, which is the one that was wrong, go unexamined.
    for (let at = clause.indexOf("="); at !== -1; at = clause.indexOf("=", at + 1)) {
      const left = leftOf(clause, at);
      const right = rightOf(clause, at + 1);
      const statement = clause.trim();
      if (!left || !right || !OPERATOR_BETWEEN.test(left)) {
        // An `=` without arithmetic on the left is a definition — `z = 3`, `x < 5`,
        // `A = lw` — and is not this check's business.
        if (/[0-9]/.test(left) && /[0-9]/.test(right) && !seen.has(statement)) {
          seen.add(statement);
          result.unread.push(statement);
        }
        continue;
      }
      const computed = evaluate(left);
      const shown = evaluate(right);
      const key = `${left}|${right}`;
      if (computed === null || shown === null) {
        if (!seen.has(key)) {
          seen.add(key);
          result.unread.push(statement);
        }
        continue;
      }
      if (seen.has(key)) continue;
      seen.add(key);
      if (Math.abs(computed - shown) > tolerance(right, computed)) {
        result.wrong.push({ statement, left, shown, computed });
      } else {
        result.right += 1;
      }
    }
  }
  return result;
}
