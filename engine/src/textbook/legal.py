"""The collection's reader-facing legal pages, and the disclaimer every book carries.

Why this is a module rather than prose in each book
---------------------------------------------------

The disclaimer, the terms of use and the acknowledgements are about the
**collection**, not about one book. A reader who moves from GCSE Mathematics to
Leaving Certificate Physics must meet the same promise, and a correction to it
must not have to be made eleven times. So the wording lives here, beside the
generator that renders it, in the same way the About page's own prose lives in
``scaffold.py``.

The disclaimer is deliberately short and calm. It says three things a reader
needs: this is a companion rather than a replacement, no book is perfect, and
the law does not let an author promise more than it can. The full terms carry
the legal wording; the book page carries the sentence a reader will actually
read.

The text is not legal advice, and it is not a substitute for a solicitor
reviewing the wording for the author's own jurisdiction. ``research/legal/``
records the precedents and the limits of what a disclaimer can do.
"""

from __future__ import annotations

import html
from dataclasses import dataclass, field

from . import book as books
from . import yamlio

#: The date a reader sees on the terms page. It is written out rather than taken
#: from ``date.today()`` so a build is reproducible: the page changes when the
#: terms change, not when the site is rebuilt.
LAST_UPDATED = "21 October 2026"

#: The one contact route the project has. There is no mail service, so a
#: ``mailto:`` link would be dead — see the About page's own note.
CONTACT_URL = "https://github.com/leonpjvaughan/Open.Textbook/issues/new"

#: The heading and summary used on a book's home page. The summary is what a
#: reader sees before opening the note, so it must not sound like a warning.
DISCLAIMER_HEADING = "Before you use this book"
DISCLAIMER_SUMMARY = "Using this book alongside your course"


def disclaimer_lines() -> list[str]:
    """The disclaimer as Markdown lines, wrapped for the About page.

    ``scaffold.colophon_page`` inserts these under a heading of its own. The
    links are root-absolute because the About page is nested several directories
    deep inside a book, while the terms and acknowledgements are collection
    pages at the site root.
    """
    return [
        "This book is a study companion. It builds on what your school or college",
        "provides. It is not a replacement for your teacher, your lessons, or your",
        "exam board's current specification.",
        "",
        "We check the answers with a computer and read the pages carefully, but no",
        "book is perfect. To the extent the law allows,",
        "the author accepts no liability for any incorrect information in this book,",
        "or for any loss arising from using it or relying on it. Nothing in this note",
        "limits your statutory rights, or any liability that cannot lawfully be excluded.",
        "",
        "If this book disagrees with your specification or your teacher, follow",
        "them. Please report the mistake so it can be corrected.",
        "",
        "The [terms of use](/terms/) explain this in more detail. The",
        "[acknowledgements](/acknowledgements/) credit the sources and software",
        "the collection rests on.",
    ]


def disclaimer_html() -> str:
    """The compact, expandable note on a book's home page.

    A native ``<details>`` element: no script, no runtime, and a reader with
    JavaScript off still sees the summary and can open it. The link is to the
    book's own source path, which the pipeline rewrites to the published URL.
    """
    return (
        '<details class="disclaimer">\n'
        f"<summary>{html.escape(DISCLAIMER_SUMMARY)}</summary>\n"
        "<p>This book is a study companion. It builds on what your school or college "
        "provides, and it is not a replacement for your teacher, your lessons, or your "
        "exam board's current specification.</p>\n"
        "<p>We check the answers, but no book is perfect. If something here disagrees "
        "with your specification or your teacher, follow them.</p>\n"
        '<p><a href="colophon.md">Read the full note in About this book</a>.</p>\n'
        "</details>"
    )


# --- terms of use -------------------------------------------------------------


def _link(url: str, text: str) -> str:
    return f'<a href="{html.escape(url, quote=True)}">{html.escape(text)}</a>'


def terms_html() -> str:
    """The collection's terms of use, as HTML for the root page.

    The structure follows what a free educational resource actually needs, and
    no more: what the book is not, what is checked, the warranty and liability
    position with its statutory carve-outs, the exam-board relationship, the
    licence, privacy, and how to report a mistake. It deliberately does not
    invent a company, a registered address, a paid service or an email route
    that the project does not have.
    """
    report = _link(CONTACT_URL, "report a mistake")
    licence = _link(
        "https://github.com/leonpjvaughan/Open.Textbook/blob/main/LICENSE",
        "CC BY 4.0",
    )
    code_licence = _link(
        "https://github.com/leonpjvaughan/Open.Textbook/blob/main/LICENSE-CODE",
        "MIT Licence",
    )
    return "\n".join(
        [
            f'<p class="legal__updated">Last updated: {LAST_UPDATED}</p>',
            '<div class="legal__short">',
            "<p><strong>The short version.</strong> This is a free study companion. "
            "Use it alongside your school or college course, check anything that "
            "matters for an exam, and tell us when something is wrong.</p>",
            "</div>",
            "<h2>Who runs this site</h2>",
            "<p>Open.Textbook is an independent project by Leon Vaughan. The books "
            "are free to read. There are no accounts, no payments and no "
            "advertising.</p>",
            "<h2>Using this book</h2>",
            "<p>This book is a study companion. It is written to build on what your "
            "school, college or teacher provides. It is not a replacement for them, "
            "and it is not a scheme of work.</p>",
            "<p>No exam board or curriculum body has approved this book or supplies "
            "it. If you are a teacher, you decide whether a page suits your class. "
            "If you are a parent, you decide whether it suits your child.</p>",
            "<h2>Accuracy</h2>",
            "<p>The answers in each <strong>Practise</strong> set are checked by a "
            "computer before the book is published. That proves the algebra, not the "
            "explanation. The prose, worked examples and figures are written and read "
            "by hand.</p>",
            "<p>No book is perfect. Pages can be incomplete, out of date, or wrong. "
            "We correct mistakes when we find them, but we do not promise that the "
            "book matches your board's current specification, that it covers every "
            "question you will meet, or that it will improve your grade.</p>",
            "<p>For an exam, your current specification and your teacher's guidance "
            "are the authority. If they disagree with this book, follow them.</p>",
            "<h2>No warranty</h2>",
            "<p>To the extent the law allows, the book and this site are provided "
            "<em>as is</em> and <em>as available</em>. The author gives no warranty, "
            "express or implied, about accuracy, completeness, fitness for a "
            "particular purpose, or uninterrupted availability.</p>",
            "<h2>Limitation of liability</h2>",
            "<p>To the extent the law allows, the author accepts no liability for any "
            "incorrect information in the books, or for any loss or damage arising "
            "from using this site or relying on it. This includes indirect or "
            "consequential loss.</p>",
            "<p>Nothing in these terms excludes or limits liability that cannot "
            "lawfully be excluded or limited. In particular, nothing here excludes or "
            "limits liability for death or personal injury caused by negligence, for "
            "fraud or fraudulent misrepresentation, or your statutory rights as a "
            "consumer.</p>",
            "<h2>Exams, specifications and trade marks</h2>",
            "<p>AQA, Pearson Edexcel, OCR, NCCA, SEC and other names are the trade "
            "marks of their owners. They are used here to say which specification a "
            "page follows. Nothing here suggests that they endorse this book.</p>",
            "<p>Specification content, mark schemes and formulae sheets remain the "
            "property of the bodies that publish them. They are referred to, or "
            "reproduced, only as the law and their own terms allow. If you need the "
            "authoritative version, use the body's own document.</p>",
            "<h2>Licence and reuse</h2>",
            f"<p>The text and figures written for the books are licensed under "
            f"{licence}. The engine code is licensed under the {code_licence}. "
            "Third-party material keeps its own terms.</p>",
            "<p>You may share and adapt the books under those licences. You must give "
            "appropriate credit and link to the licence. The licence does not mean "
            "that the author endorses you or your version.</p>",
            "<h2>External links</h2>",
            "<p>The books link to specifications, articles and other websites. Those "
            "sites have their own terms and privacy policies. The author is not "
            "responsible for their content or for what they do with your data.</p>",
            "<h2>Privacy</h2>",
            "<p>The site has no accounts, no advertising and no analytics of its "
            "own. It stores your theme and colour-scheme choice in your browser. "
            "That choice is not sent to the author. The hosting provider may keep "
            "standard server logs for security and reliability.</p>",
            "<h2>Changes</h2>",
            "<p>The books change between editions. Pages may be corrected, added or "
            "removed. These terms may change too; the date at the top says when they "
            "last changed. The version on this page is the current one.</p>",
            "<h2>Governing law</h2>",
            "<p>These terms are governed by the law of England and Wales. Nothing in "
            "them removes a protection you have under the law of the country where "
            "you live.</p>",
            "<h2>Contact</h2>",
            f"<p>To {report} or ask about these terms, use the project's GitHub page: "
            f'{_link(CONTACT_URL, "github.com/leonpjvaughan/Open.Textbook/issues")}. '
            "That route needs a free GitHub account. The project has no email "
            "address.</p>",
        ]
    )


# --- acknowledgements ---------------------------------------------------------


@dataclass
class _Reference:
    """One source, as a reader needs to see it credited."""

    title: str
    url: str = ""
    ref: str = ""
    attribution: bool = False


@dataclass
class _BookSources:
    book: books.Book
    attributed: list[_Reference] = field(default_factory=list)
    background: list[_Reference] = field(default_factory=list)


def _sources(book: books.Book) -> dict:
    if not book.sources.is_file():
        return {}
    return yamlio.load_file(book.sources) or {}


def _reference(raw: dict) -> _Reference | None:
    title = str(raw.get("title") or "").strip()
    if not title:
        return None
    return _Reference(
        title=title,
        url=str(raw.get("url") or "").strip(),
        ref=str(raw.get("ref") or "").strip(),
        attribution=bool(raw.get("attribution")),
    )


def _book_sources() -> list[_BookSources]:
    out: list[_BookSources] = []
    for book in books.discover_books():
        entry = _BookSources(book)
        for raw in _sources(book).get("references") or []:
            if not isinstance(raw, dict):
                continue
            reference = _reference(raw)
            if reference is None:
                continue
            target = entry.attributed if reference.attribution else entry.background
            target.append(reference)
        if entry.attributed or entry.background:
            out.append(entry)
    return out


def _reference_html(reference: _Reference) -> str:
    title = html.escape(reference.title)
    if reference.url:
        title = f'<a href="{html.escape(reference.url, quote=True)}">{title}</a>'
    ref = (
        f' <span class="ack__ref">{html.escape(reference.ref)}</span>'
        if reference.ref
        else ""
    )
    return f"<li>{title}{ref}</li>"


def _references_html(references: list[_Reference]) -> list[str]:
    return ["<ul>", *[f"  {_reference_html(r)}" for r in references], "</ul>"]


#: Software that does work on the site, with the licence it is used under.
#: Kept as data so a new build dependency added to `package.json` or the Python
#: package has an obvious place to be credited.
SOFTWARE: tuple[tuple[str, str, str, str], ...] = (
    (
        "KaTeX",
        "https://katex.org/",
        "MIT",
        "renders the mathematics to MathML when the book is built",
    ),
    (
        "Pagefind",
        "https://pagefind.app/",
        "MIT",
        "builds the search index over the rendered pages",
    ),
    (
        "SymPy",
        "https://www.sympy.org/",
        "BSD-3-Clause",
        "checks the algebra in the problem banks",
    ),
    (
        "Python-Markdown",
        "https://python-markdown.github.io/",
        "BSD-3-Clause",
        "turns a page's Markdown into HTML",
    ),
    (
        "PyMdown Extensions",
        "https://facelessuser.github.io/pymdown-extensions/",
        "MIT",
        "provides the maths delimiters used on every page",
    ),
    (
        "PyYAML",
        "https://pyyaml.org/",
        "MIT",
        "reads the curriculum, book and source data",
    ),
    (
        "Python",
        "https://www.python.org/",
        "PSF-2.0",
        "runs the build and the verification tools",
    ),
    (
        "TypeScript",
        "https://www.typescriptlang.org/",
        "Apache-2.0",
        "compiles the figure kit and the site checks",
    ),
)


def acknowledgements_html() -> str:
    """The collection's acknowledgements, compiled from every book's sources.

    Two lists per book, because a source the book rests on and a book for
    further reading are not the same acknowledgement. The first is what the
    content is built from; the second is what a reader can go to next. Both are
    compiled from ``books/<id>/sources.yaml``, so a source added to a book
    reaches this page without a second edit.
    """
    report = _link(CONTACT_URL, "report a mistake or an omission")
    lines: list[str] = [
        '<p class="legal__updated">Compiled from every book\'s '
        "<code>sources.yaml</code>.</p>",
        '<div class="legal__short">',
        "<p>These books rest on the work of teachers, subject bodies and "
        "researchers, and on open-source software. This page credits both.</p>",
        "</div>",
        "<h2>The books</h2>",
        "<p>Open.Textbook is written and assembled by Leon Vaughan. The text and "
        "figures are licensed under CC BY 4.0. The engine is licensed under the MIT "
        "Licence. The sources below remain the property of their authors and "
        "publishers, and keep their own terms.</p>",
    ]
    for entry in _book_sources():
        lines.append('<section class="ack__book">')
        lines.append(f"<h3>{html.escape(entry.book.title)}</h3>")
        if entry.attributed:
            lines.append(
                '<p class="ack__label">Sources the book rests on</p>'
            )
            lines.extend(_references_html(entry.attributed))
        if entry.background:
            lines.append(
                '<p class="ack__label">Background and further reading</p>'
            )
            lines.extend(_references_html(entry.background))
        lines.append("</section>")
    lines += [
        "<h2>Software</h2>",
        "<p>The books are built and run with these open-source projects.</p>",
        '<ul class="ack__software">',
    ]
    for name, url, licence, role in SOFTWARE:
        lines.append(
            f"  <li>{_link(url, name)} "
            f'<span class="ack__ref">{html.escape(licence)}</span> — '
            f"{html.escape(role)}.</li>"
        )
    lines += [
        "</ul>",
        "<h2>Corrections</h2>",
        "<p>If a credit is missing, wrong, or out of date, please "
        f"{report} on the project's GitHub page. A correction to a credit is as "
        "welcome as a correction to a page.</p>",
    ]
    return "\n".join(lines)
