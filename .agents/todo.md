# TODO

Working notes for the collection. One item per change. Items are ordered, not
dated: the first is next. This file is ours, not the reader's — the voice rules
in `AGENTS.md` do not apply here, but the engineering rules do.

**This file holds open items only.** Closed items are deleted (git history keeps their diagnosis). A new item goes at the next number, with its diagnosis, its fix and its own done-means. Open: **232**.

Accepted limitations live where the check that records them lives (`tests/test_verify_coverage.py`, `books/*/curriculum.yaml`), not here.

---

## 232 — declare the ready state

**Not a change: the gate.** The collection is ready to release when items 230–231 are
closed and their boxes are ticked, and not before — a checklist that is mostly ticked has
not been done.

**Done means**

- [x] every box in items 230–231 is ticked, or the item is explicitly deferred here
      with a reason;
- [ ] `scripts/check.sh` passes on `dev`;
- [ ] both profile builds leave no `markdown="1"` page and no `math-error` page;
- [ ] `main` is the commit that is live, and a release exists for it.
