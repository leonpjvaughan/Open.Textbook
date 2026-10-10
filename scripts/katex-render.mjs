// Build-time maths renderer. Reads a JSON array of {tex, display} on stdin and
// writes a JSON array of MathML strings on stdout. Called once per page by the
// MkDocs maths hook. MathML only: no runtime JavaScript, CSS or fonts.
import katex from "katex";

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  let items = [];
  try {
    items = JSON.parse(input);
  } catch (err) {
    process.stderr.write(`katex-render: bad input: ${err.message}\n`);
    process.exit(1);
  }
  const escape = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const out = items.map((item) => {
    try {
      const html = katex.renderToString(item.tex, {
        output: "mathml",
        displayMode: Boolean(item.display),
        throwOnError: true,
      });
      // Strip the KaTeX wrapper span so no KaTeX CSS is required.
      return html.replace(/^<span class="katex">/, "").replace(/<\/span>$/, "");
    } catch (err) {
      return `<span class="math-error" title="${escape(err.message)}">${escape(item.tex)}</span>`;
    }
  });
  process.stdout.write(JSON.stringify(out));
});
