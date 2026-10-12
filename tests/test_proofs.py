"""The shared proof book: one proof, one URL, and a label when it is out of course.

The author's request, and the two things that make it more than a link:

* **One copy.** A proof is a page in `books/proofs/` and every book links to that
  page. The alternative — writing the proof where the claim is made — puts the same
  argument in five places and lets four of them go stale.
* **The label.** The same proof sits differently in different courses: a GCSE
  reader meets the angles of a triangle every year and the sum of the first *n*
  squares never. The `:::prove` directive compares the proof against the
  qualification of the book the reader is in and says so, which is the one thing a
  page cannot work out alone.

The reference work is a book because that is how the collection publishes,
navigates and themes pages, and for no other reason — it declares no chapters, no
boards and no tier axis. Several tests here exist to keep it from growing the
things it deliberately does not have.
"""

from __future__ import annotations

import re
from types import SimpleNamespace

import pytest

from textbook import book as books
from textbook import pipeline
from textbook import proofs as proofbook
from textbook.hooks import _fences, proofs

REFERENCE = books.reference_book()
BOOKS = books.discover_books()


def registry() -> dict:
    import yaml

    return yaml.safe_load(proofbook.registry_path().read_text(encoding="utf-8")) or {}


def config(qualification: str, book_id: str = "gcse-maths") -> dict:
    return {
        "extra": {
            "book": book_id,
            "qualification": qualification,
            "proofs_dir": "books/proofs",
            "proofs_url": "/proofs",
        }
    }


# --- the book itself ----------------------------------------------------------


def test_the_collection_has_exactly_one_reference_work():
    """Found by qualification, so renaming the directory is a rename."""
    assert REFERENCE is not None, "the collection declares no reference work"
    assert REFERENCE.id == "proofs"


def test_the_reference_work_has_no_syllabus():
    """It is not a course, and the three things that would make it one are absent.

    A tier axis would say some proofs are Higher-only; boards would say a proof
    belongs to an awarding body; chapters would say there are Walkthroughs.
    """
    assert REFERENCE.chapters == []
    assert REFERENCE.strands == []
    assert REFERENCE.tier_axis == {}
    assert REFERENCE.boards == ()
    assert not REFERENCE.booklet_name, "the proof book declares a formula booklet"


def test_the_reference_work_is_well_formed_like_any_other_book():
    """It goes through the same shape test as a course, which is the point."""
    assert REFERENCE.qualification == books.REFERENCE
    assert REFERENCE.profiles, "no profiles, so `plan` would build nothing"
    assert REFERENCE.curriculum.is_file()
    assert REFERENCE.docs.is_dir()
    assert REFERENCE.banks.is_dir()


def test_the_reference_work_has_a_placeholder_in_its_banks_directory():
    """An empty directory is not tracked by git, and the shape test wants it."""
    keep = REFERENCE.banks / ".gitkeep"
    assert keep.is_file(), "an empty banks directory would not survive a clone"


# --- the registry -------------------------------------------------------------


def test_every_proof_declares_who_is_examined_on_it():
    """The key must be present; an empty list is a decision, an omission is not.

    `sum-of-the-first-n-squares` is Further Mathematics, so it belongs to no course
    at this collection's level and says so with an empty list. Leaving the key out
    would say the same thing by accident, and the two must not look alike.
    """
    missing = [p.get("id") for p in registry()["proofs"] if "qualifications" not in p]
    assert not missing, (
        f"{missing} declare no `qualifications`. Write `qualifications: []` if a "
        "proof is in no course — that is a decision; an absent key is not."
    )


def test_every_named_qualification_is_one_the_collection_knows():
    """A typo here would silently mark a proof as beyond every course."""
    known = {q["id"] for q in books.load_collection().get("qualifications", [])}
    for proof in registry()["proofs"]:
        unknown = [q for q in proof["qualifications"] if q not in known]
        assert not unknown, (
            f"{proof['id']} names {unknown}, which is not in collection.yaml → "
            f"qualifications ({sorted(known)}). An unknown id marks the proof as "
            "outside every course."
        )


def test_every_proof_has_a_page_and_a_title():
    for proof in registry()["proofs"]:
        page = REFERENCE.docs / proof["id"] / "index.md"
        assert page.is_file(), f"{proof['id']} has no page at docs/{proof['id']}/index.md"
        assert str(proof.get("title") or "").strip(), f"{proof['id']} has no title"


def test_the_registry_has_no_duplicate_ids():
    ids = [p["id"] for p in registry()["proofs"]]
    assert len(ids) == len(set(ids)), f"duplicate proof ids: {ids}"


def test_a_proof_id_is_a_url_slug():
    """The id is the directory name and the URL segment, so it must be a slug."""
    for proof in registry()["proofs"]:
        assert proof["id"] == re.sub(r"[^a-z0-9-]", "-", proof["id"]), proof["id"]


# --- the label ----------------------------------------------------------------


@pytest.mark.parametrize(
    ("qualifications", "qualification", "expected"),
    [
        (["GCSE", "A-level"], "GCSE", False),
        (["GCSE", "A-level"], "A-level", False),
        ([], "GCSE", True),
        ([], "A-level", True),
        (["GCSE"], "A-level", True),
        (["A-level"], "GCSE", True),
    ],
)
def test_a_proof_is_marked_beyond_when_the_readers_course_does_not_include_it(
    qualifications, qualification, expected
):
    entry = {"id": "x", "qualifications": qualifications}
    assert proofbook.beyond_course(entry, qualification) is expected


def test_an_empty_list_means_every_course_is_outside_it():
    """Not "no opinion": a proof in no course is beyond every reader's.

    `sum-of-the-first-n-squares` is Further Mathematics. Offered to an A-level
    reader it is something to enjoy, not something to learn, and the label is what
    says so rather than leaving them to assume it will be examined.
    """
    assert proofbook.beyond_course({"qualifications": []}, "A-level") is True
    assert proofbook.beyond_course({"qualifications": []}, "GCSE") is True


def test_a_reader_with_no_qualification_is_not_marked():
    """A build that cannot say which course it is for must not guess."""
    assert proofbook.beyond_course({"qualifications": []}, "") is False


# --- the directive ------------------------------------------------------------


def page(url="chapter-1/section-1.1/learn/"):
    return SimpleNamespace(url=url, file=SimpleNamespace(src_path="x.md"))


def run(markdown: str, qualification: str = "GCSE", book_id: str = "gcse-maths"):
    return proofs.on_page_markdown(markdown, page(), config(qualification, book_id), [])


def test_the_directive_becomes_a_link():
    out = run(":::prove angles-in-a-triangle\n")
    assert '<a class="prove__link" href="/proofs/angles-in-a-triangle/">' in out
    assert "Prove it to me" in out
    assert "The angles in a triangle add to 180°" in out


def test_the_affordance_needs_no_script():
    """Tier-0: the proof is a page, so the affordance is an anchor and nothing else.

    This is why the answer to "make it clickable" is not a dialog. A reader with
    scripting off — or on a browser that failed to load a module — must still be
    able to reach the proof.
    """
    out = run(":::prove angles-in-a-triangle\n")
    assert "<script" not in out
    assert "<maths-" not in out, "a custom element would need script to do anything"


def test_an_unknown_proof_fails_the_build_and_names_the_id():
    with pytest.raises(ValueError) as caught:
        run(":::prove no-such-proof\n")
    assert "no-such-proof" in str(caught.value)


def test_the_directive_is_line_anchored():
    assert "aside" not in run("See :::prove angles-in-a-triangle in the prose.\n")


def test_the_directive_never_fires_inside_a_code_fence():
    """A page showing the marker syntax must not expand it."""
    fenced = "```\n:::prove angles-in-a-triangle\n```\n"
    assert "aside" not in run(fenced)


def test_a_proof_in_the_readers_course_carries_no_note():
    out = run(":::prove angles-in-a-triangle\n", qualification="GCSE")
    assert "Beyond your course" not in out


def test_a_proof_outside_the_readers_course_says_so():
    """The same id, the same page, two different books, two different labels."""
    out = run(":::prove sum-of-the-first-n-squares\n", qualification="A-level")
    assert "Beyond your course" in out
    assert "An exam will not ask you to reproduce it" in out


def test_the_label_is_the_same_words_everywhere():
    """One decision, in one place, so a page cannot invent a second phrasing."""
    out = run(":::prove sum-of-the-first-n-squares\n", qualification="A-level")
    assert proofbook.BEYOND_LABEL in out
    assert proofbook.BEYOND_NOTE in out


def test_the_qualification_comes_from_the_book_not_the_hook():
    """`extra.qualification` is what the pipeline fills; the hook must not guess."""
    out = run(":::prove sum-of-the-first-n-squares\n", qualification="GCSE")
    assert "Beyond your course" in out
    assert proofs.qualification(config("GCSE")) == "GCSE"


# --- the pages that use it ----------------------------------------------------


def book_pages():
    return [
        (book, path)
        for book in BOOKS
        if book.id != REFERENCE.id
        for path in sorted(book.docs.rglob("*.md"))
    ]


DIRECTIVES = [
    (book, path, match.group(1))
    for book, path in book_pages()
    for match in re.finditer(
        r"^:::[ \t]*prove[ \t]+([a-z0-9-]+)[ \t]*$",
        _fences.transform_outside_fences(
            path.read_text(encoding="utf-8"), lambda text: text
        )
        or path.read_text(encoding="utf-8"),
        re.M,
    )
]


def test_at_least_one_page_uses_a_proof():
    """A mechanism nothing calls is not a feature."""
    assert DIRECTIVES, "no page has a :::prove directive"


@pytest.mark.parametrize(
    ("book", "path", "proof_id"),
    DIRECTIVES,
    ids=[f"{b.id}/{p.parent.parent.parent.name}/{proof_id}" for b, p, proof_id in DIRECTIVES],
)
def test_every_directive_names_a_proof_that_exists(book, path, proof_id):
    assert proof_id in proofbook.entries(), (
        f"{book.id}/{path}: :::prove {proof_id} names no proof in the registry"
    )


@pytest.mark.parametrize(
    ("book", "path", "proof_id"),
    DIRECTIVES,
    ids=[f"{b.id}/{p.parent.parent.parent.name}/{proof_id}" for b, p, proof_id in DIRECTIVES],
)
def test_every_directive_is_outside_a_code_fence(book, path, proof_id):
    """The scan above only sees markers in prose, so this pins the scan itself.

    If a marker were fenced, the count would be wrong and the tests above would
    quietly cover fewer pages than they claim to.
    """
    text = path.read_text(encoding="utf-8")
    fenced = text.count(f":::prove {proof_id}") - len(
        re.findall(rf"^:::[ \t]*prove[ \t]+{re.escape(proof_id)}[ \t]*$", text, re.M)
    )
    assert fenced == 0, f"{path} mentions :::prove {proof_id} at the start of a line only in a fence"


# --- the built result ---------------------------------------------------------


@pytest.fixture(scope="module")
def built(tmp_path_factory) -> tuple[dict, dict]:
    """The proof book and A-level Mathematics, built, so the label is observed.

    Both, because the label is a difference *between* them: the same proof id
    renders with a note in one and without it in the other, and a test that built
    only one could not tell the difference from a bug.
    """
    root = tmp_path_factory.mktemp("proofs")
    out = {}
    for book_id, profile in (("proofs", "all"), ("a-level-maths", "all")):
        result = pipeline.build(book_id, profile, out=root / book_id, index=False)
        assert not result.broken, result.broken
        out[book_id] = result
    return out


def test_the_proof_book_builds_every_proof_it_lists(built):
    result = built["proofs"]
    urls = {page.url for page in result.pages}
    for proof in registry()["proofs"]:
        assert f"{proof['id']}/" in urls, (
            f"{proof['id']} is in the registry but was not built"
        )


def test_a_link_from_another_book_points_at_a_page_that_was_built(built):
    """The cross-book link resolves — checked against the other book's own build.

    `check_links` cannot do this: the proofs are not in the linking book's output
    directory, so that check skips them by design. This is the test that covers
    what the skip leaves open.
    """
    built_urls = {page.url for page in built["proofs"].pages}
    # A built page's url is relative to its own book's output root, while the link
    # carries the deploy root as well (`/proofs/<id>/`). Strip it before comparing,
    # or this would pass only for a book deployed at the site root.
    root = proofbook.base_url().strip("/") + "/"
    for book, path, proof_id in DIRECTIVES:
        target = proofbook.entries()[proof_id]["url"]
        assert target.startswith("/" + root), target
        in_book = target[len(root) + 1 :]
        assert in_book in built_urls, (
            f"{book.id}/{path.name} links to {target}, which the proof book does not build"
        )


def test_the_note_is_present_in_the_built_page_when_the_proof_is_out_of_course(built):
    text = (
        built["a-level-maths"].out / "chapter-4" / "section-4.4" / "learn" / "index.html"
    ).read_text(encoding="utf-8")
    assert "Beyond your course" in text
    assert "/proofs/sum-of-the-first-n-squares/" in text


def test_the_note_is_absent_in_the_built_page_when_the_proof_is_in_course(built):
    """The page this proof belongs to, in the book it belongs to, carries no note."""
    text = (
        built["proofs"].out / "angles-in-a-triangle" / "index.html"
    ).read_text(encoding="utf-8")
    # The proof's own page links onward, and the page it links to is in the same
    # course — so nothing on it is marked.
    assert "Beyond your course" not in text
