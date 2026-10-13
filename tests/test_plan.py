"""The generated-file list the local gate diffs.

`scripts/check.sh` is documented as "everything CI enforces, in one call", and
the generated-file step diffs exactly the paths `plan --generated` prints. A
generated file missing from that list is a file the local gate does not check
while CI, which diffs the whole tree, does — so the gate is weaker than it says.
"""

from __future__ import annotations

from textbook import plan, scaffold
from textbook.book import discover_books, repo_root


def test_the_colophon_is_listed_as_generated():
    """Regression: `colophon.md` was generated but never drift-checked.

    `scaffold.colophon_page` writes it for every book, and `engine/AGENTS.md`
    requires a new generated file to be added to `plan --generated`. It was not,
    so a source it reads (the collection licence, a book's sources) could change,
    the file be regenerated, and the local gate still pass while CI failed.
    """
    generated = set(plan.generated_paths())
    for book in discover_books():
        path = str((book.docs / scaffold.COLOPHON_FILE).relative_to(repo_root()))
        assert path in generated, f"{book.id}: {path} is missing from --generated"


def test_every_listed_file_exists():
    root = repo_root()
    for path in plan.generated_paths():
        assert not path.startswith("/"), path
        assert ".." not in path.split("/"), path
        assert (root / path).exists(), f"listed but not generated: {path}"


def test_the_list_is_sorted_and_unique():
    """A drift check that diffs the same file twice is a smell, not a failure."""
    paths = plan.generated_paths()
    assert paths == sorted(paths)
    assert len(paths) == len(set(paths))
