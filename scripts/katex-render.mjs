// Build-time maths renderer. Line-delimited protocol: one JSON array of
// {tex, display} per line in, one JSON array of MathML per line out. Kept alive
// by the MkDocs hook so there is no per-page Node startup cost.
import katex from "katex";
import readline from "node:readline";

const rl = readline.createInterface({ input: process.stdin });

const escape = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

rl.on("line", (line) => {
  if (!line.trim()) return;
  let items = [];
  try {
    items = JSON.parse(line);
  } catch (err) {
    process.stderr.write(`katex-render: bad input: ${err.message}\n`);
    process.stdout.write("[]\n");
    return;
  }
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
  process.stdout.write(JSON.stringify(out) + "\n");
});
