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


def _counts() -> tuple[int, int]:
    """The two numbers the home page prints, measured from the pages themselves.

    62 methods is the number of rows in the four tables under *Methods, A to Z*, because
    that page is the book's own claim about how many methods it names. 64 systems is the
    number of entries in the nine class pages' *Systems that live here* lists, because
    those are the systems the reduction is claimed to cover. Both are counted here rather
    than typed, so adding a method or a system fails the home page until it says the new
    number — a count in the argument that nobody recomputes is just a number.
    """
    book = map_book()
    methods = 0
    for line in (book.docs / "techniques" / "index.md").read_text(encoding="utf-8").splitlines():
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) == 3 and not set(cells[0]) <= set("-: ") and cells[0] != "method":
            methods += 1
    systems = 0
    for slug in CLASSES:
        page = (book.docs / slug / "index.md").read_text(encoding="utf-8")
        start = page.index("## Systems that live here")
        block = page[start : page.index("## What goes wrong", start)]
        systems += len(re.findall(r"^- \S", block, re.M))
    return methods, systems


def test_the_nine_kinds_table_names_and_links_every_class():
    """The reduction is the home page's whole argument, so it has to be complete.

    One table row per kind, each linking its page, is the book's claim that nine of them
    cover the field. A class missing from the table is a kind the reader cannot reach
    from the argument; a row that does not link is a name with nowhere to go. The count
    of rows is asserted too, so a tenth class cannot be added to the registry without
    the table growing a row.
    """
    book = map_book()
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    unlinked = [
        entry["title"]
        for entry in book.pages
        if entry.get("signature")
        and f"[{entry['title']}]({entry['path']})" not in home
    ]
    assert unlinked == [], f"the home page never links {unlinked}"
    rows = [
        line
        for line in home.splitlines()
        if line.startswith("|")
        and re.search(r"\]\((" + "|".join(CLASSES) + r")/index\.md\)", line)
    ]
    assert len(rows) == len(CLASSES), f"the nine-kinds table has {len(rows)} rows"


def test_the_two_indexes_link_every_class_they_name():
    """A hop in a lookup has to be clickable, or it is a word and not a hop.

    `symptoms/` goes symptom → kind and `techniques/` goes method → kind, and both
    name the kind in a table cell. The home page offers them as two of the three
    ways in, so a bare class name here sends the reader back to the index to find
    the page the row was written to name — which is the trip the row exists to
    save. The nine-kinds table already links every kind, and this holds the pair to
    the same standard.

    Every link whose text is a class title is checked too, because a renamed class
    and a stale href are two halves of one defect and only one of them is a link
    that looks correct.
    """
    book = map_book()
    slug_of = {
        entry["title"]: entry["path"].split("/")[0]
        for entry in book.pages
        if entry.get("signature")
    }
    link = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")
    unlinked, misdirected = [], []
    for index in ("symptoms", "techniques"):
        text = (book.docs / index / "index.md").read_text(encoding="utf-8")
        for line in text.splitlines():
            if not line.startswith("|"):
                continue
            for match in link.finditer(line):
                if match.group(1) in slug_of:
                    wanted = f"../{slug_of[match.group(1)]}/"
                    if match.group(2) != wanted:
                        misdirected.append((index, match.group(1), match.group(2), wanted))
            plain = link.sub("", line)
            for title in slug_of:
                if re.search(rf"(?<![\w-]){re.escape(title)}(?![\w-])", plain):
                    unlinked.append((index, title, line))
    assert unlinked == [], f"a class named but not linked: {unlinked}"
    assert misdirected == [], f"a class linked to the wrong page: {misdirected}"


def test_the_home_page_states_the_counts_it_claims():
    """The page opens with an arithmetic claim: 62 methods, 64 systems, nine kinds.

    Each number is measured from the book, so the argument cannot quietly become false
    when a method is added or a system is dropped. This is the same rule as §1.5's
    stiffness ladder in `Maths Applied`: the page prints the export's number, and a test
    recomputes it.
    """
    methods, systems = _counts()
    book = map_book()
    home = (book.docs / "index.md").read_text(encoding="utf-8")
    opening = home[: home.index("## The nine kinds")]
    assert f"**{methods}**" in opening, f"the page does not say it names {methods} methods"
    assert f"**{systems}**" in opening, f"the page does not say {systems} systems live here"
    assert f"**{len(CLASSES)}**" in opening, "the page does not say how many kinds there are"


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
