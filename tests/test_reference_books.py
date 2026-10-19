"""The map of numerical methods: a reference work whose nav comes from a registry.

The proof book is the collection's first reference work, and it is a book because
that is how the collection publishes, navigates and themes a body of pages. This is
the second, and it adds one thing the first did not need: **a sidebar without a
syllabus**. The proof book's registry is read by `:::prove`; the map's is read by
the nav and nothing else, so a page listed there is a page a reader can reach.

These tests exist because a registry is a second place a page can be forgotten. A
page that exists and is not listed is invisible; a page that is listed and does not
exist is a dead link; and a page that is authored but untitled is a browser tab that
says "Untitled". The scaffold cannot catch any of the three: it generates nothing
for this book and, by design, never overwrites an authored page.
"""

from __future__ import annotations

import re

import pytest

from textbook import book as books

MAP = "numerical-methods"

#: The nine classes, in the order the tree reaches them. Written here rather than
#: read from the registry, because a test that derives its expectation from the
#: thing it tests asserts nothing: a class silently dropped from `map.yaml` would
#: drop out of this list too, and both would agree.
CLASSES = [
    "optimisation",
    "averaging",
    "eigenvalue",
    "linear-system",
    "root",
    "saddle-point",
    "elliptic",
    "parabolic",
    "hyperbolic",
]


def map_book():
    return books.book_by_id(MAP)


def test_the_map_is_a_reference_work_and_has_no_syllabus():
    book = map_book()
    assert book.qualification == books.REFERENCE
    assert book.chapters == [], "a reference work with a chapter plan is a course"
    assert book.strands == []
    assert book.tier_axis == {}
    assert book.boards == ()
    assert not book.booklet_name
    assert book.oracles == ()


def test_every_listed_page_exists_and_every_page_is_listed():
    """Both directions, because each is a different defect.

    A listed page that is missing is a dead link in the sidebar. A page that exists
    but is unlisted is a page with no way in, and it is the one that happens by
    accident: the page gets written and the registry is forgotten.

    The About page is the one exception: the scaffold generates it, so it is a page
    with no entry and no need of one. Anything *else* that is not an `index.md` is a
    defect rather than an exception — a page at `docs/notes.md` would be published at
    a URL the navigation does not know about.
    """
    book = map_book()
    listed = {entry["path"] for entry in book.pages}
    authored = {
        page.relative_to(book.docs).as_posix()
        for page in book.docs.rglob("*.md")
        if page.name == "index.md" and page.parent != book.docs
    }
    stray = [
        page.relative_to(book.docs).as_posix()
        for page in book.docs.rglob("*.md")
        if page.name != "index.md" and page.relative_to(book.docs).as_posix() != "colophon.md"
    ]
    assert stray == [], f"a page that is not part of the map: {stray}"
    assert listed - authored == set(), "listed in map.yaml, but no page exists"
    assert authored - listed == set(), "a page exists, but map.yaml does not list it"


def test_every_page_has_a_title():
    """The browser tab, the search result and the pager all read it."""
    book = map_book()
    for entry in book.pages:
        text = (book.docs / entry["path"]).read_text(encoding="utf-8")
        match = re.match(r"---\n(.*?)\n---\n", text, re.S)
        assert match, f"{entry['path']} has no front matter"
        assert re.search(r"^title:\s*\S", match.group(1), re.M), (
            f"{entry['path']} has no title"
        )


def test_the_home_page_links_every_page_in_the_registry():
    """A reference work is entered from its home page, not only from its sidebar.

    The home page carries the same tree as the figure, in plain Markdown, so that a
    reader with scripting off still has the whole map. That makes it a second place
    the list of classes can drift, and this is the check that keeps it honest.
    """
    book = map_book()
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    missing = [
        entry["path"]
        for entry in book.pages
        if f"]({entry['path']})" not in home
    ]
    assert missing == [], f"the home page does not link {missing}"


def test_the_classes_come_first_in_tree_order():
    """The two indexes come after the classes, in the order the tree reaches them.

    The order is the argument: a reader walking the five questions meets the boxes
    in this sequence, and a registry sorted some other way would put the symptom
    index between two classes.
    """
    slug_of = lambda path: path.split("/")[0]  # noqa: E731 - a one-line helper
    assert [slug_of(e["path"]) for e in map_book().pages[:9]] == CLASSES
    assert [slug_of(e["path"]) for e in map_book().pages[9:]] == [
        "choosing-the-class",
        "worked-case",
        "techniques",
        "symptoms",
    ]


def test_the_figure_draws_every_class_page():
    """The figure is the map, so a class missing from it is a branch that stops.

    Read as text rather than mounted: the module's own layout data is the registry
    of what it draws, and a browser is not needed to check that the two lists agree.
    """
    module = (
        map_book().docs / "assets" / "figures" / "class-map.js"
    ).read_text(encoding="utf-8")
    missing = [slug for slug in CLASSES if f'key: "{slug}"' not in module]
    assert missing == [], f"class-map.js does not draw {missing}"


def test_every_link_the_figure_emits_is_a_page_the_book_lists():
    """The figure's hrefs are root-absolute, so the build's link check skips them.

    `SHAPE.md` says a link into another book is outside the linking book's own build
    and `check_links` skips it by design. The figure writes `/numerical-methods/<slug>/`
    for the same reason a proof link does — it must not resolve against whichever
    page mounts the figure — so the same skip applies. That leaves a renamed class
    shipping a dead link that every other check passes, and this is the check that
    replaces the one the build cannot make.
    """
    module = (map_book().docs / "assets" / "figures" / "class-map.js").read_text(
        encoding="utf-8"
    )
    listed = {entry["path"].split("/")[0] for entry in map_book().pages}
    drawn = set(re.findall(r'key: "([a-z-]+)"', module))
    linked_block = " ".join(re.findall(r"links: \[(.*?)\]", module))
    linked = set(re.findall(r'"([a-z-]+)"', linked_block))
    assert drawn <= listed, f"the figure draws {sorted(drawn - listed)}, which is no page"
    assert linked <= listed, f"a step links {sorted(linked - listed)}, which is no page"


def test_no_stub_page_survives_in_the_book():
    """Every page here is authored. The scaffold writes none for a reference work."""
    book = map_book()
    stubs = [
        page.relative_to(book.docs).as_posix()
        for page in book.docs.rglob("*.md")
        if "scaffold:stub" in page.read_text(encoding="utf-8")
    ]
    assert stubs == [], f"a stub page in a reference work: {stubs}"


def test_only_the_proof_book_holds_the_proof_registry():
    """Several reference works, one proof registry.

    The `:::prove` directive resolves against the book that declares `proofs:`. Two
    such books would make it ambiguous, and picking whichever sorted first is the
    kind of silent break this collection spends tests on.
    """
    holders = [book.id for book in books.reference_books() if book.proofs]
    assert holders == ["proofs"], holders


@pytest.mark.parametrize("slug", CLASSES)
def test_each_class_page_names_itself_and_its_neighbours(slug):
    """A page is entered cold, from search or from a wrong answer.

    So it starts by saying what it is, in the reader's words, and it ends by naming
    the pages that neighbour it. The second matters more than it looks: the whole
    premise is that the class you chose may be the wrong one, and the reader has to
    be able to leave for the neighbour without going back to the map.
    """
    page = (map_book().docs / slug / "index.md").read_text(encoding="utf-8")
    assert "You have one of these when" in page, f"{slug} does not open by naming itself"
    assert "## Read next" in page, f"{slug} has no neighbours"
    assert "](../symptoms/index.md)" in page, f"{slug} cannot reach the symptom index"


#: The order a class page is read in. Fixed, because eight pages that each invent
#: their own order stop being a map and become eight essays.
SKELETON = [
    "## What you are modelling",
    "## The model you write down",
    "## What it becomes on a computer",
    "## The signature",
    "## Flags that matter here",
    "## Techniques",
    "## Systems that live here",
    "## What goes wrong",
    "## Used in this collection",
    "## Read next",
]


@pytest.mark.parametrize("slug", CLASSES)
def test_a_class_page_keeps_the_shared_skeleton(slug):
    """A lookup with nine pages is only a lookup if the ninth reads like the first."""
    page = (map_book().docs / slug / "index.md").read_text(encoding="utf-8")
    positions = [page.find(heading) for heading in SKELETON]
    missing = [h for h, p in zip(SKELETON, positions) if p < 0]
    assert missing == [], f"{slug} is missing {missing}"
    assert positions == sorted(positions), f"{slug} has the headings out of order"
