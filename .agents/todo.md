# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** Closed items are deleted (git history keeps their diagnosis). A new item goes at the next number, with its diagnosis, its fix and its own done-means. Open: **229**.

Accepted limitations live where the check that records them lives (`tests/test_verify_coverage.py`, `books/*/curriculum.yaml`), not here.

---

## 229 — a literal `markdown="1"` leaks into 14 built pages

**What is wrong.** The `markdown="1"` that `hooks/callouts.py`, `hooks/tier.py` and
`hooks/examples.py` put on their wrappers is consumed by `md_in_html`. On some pages it
survives into the HTML, as an attribute on a wrapper element:

```
$ grep -rl 'markdown="1"' site --include=index.html | wc -l
14      # gcse-maths 9.4, 9.6, 25.2, 25.3; ie-jc-maths 12.6; both tiers
```

Twelve of the 14 are Practise pages with no worked example, so it predates the
`worked-example` wrapper. `site/gcse-maths/higher/chapter-25/section-25.2/learn/` also has
one: a `<t` inside maths earlier on the page appears to make `md_in_html` stop treating the
block as Markdown. The attribute is invisible and the text renders, but the block was not
parsed as Markdown, which is what the wrapper exists to do.

**The fix.** Find the construct that ends `md_in_html`'s handling on those pages (start with
the `<t` in the 25.2 Learn source and the 9.4 Practise answers block), and either escape it
at the source or make the hook emit a wrapper `md_in_html` cannot lose. Then add a lint that
fails on `markdown="1"` in any built page.

**Done means**

- [ ] `grep -rl 'markdown="1"' site --include=index.html | wc -l` prints `0`;
- [ ] the lint fails on a page that carries the attribute;
- [ ] the worked-example, callout and tier tests still pass.
