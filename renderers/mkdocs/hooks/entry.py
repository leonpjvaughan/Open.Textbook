"""MkDocs adapter: re-export the engine's hooks.

MkDocs requires a *file* path in ``hooks:`` — a dotted module path is rejected —
so this thin shim is the permanent bridge between the MkDocs config and the
installed ``textbook`` package. The hooks themselves, and the order they run in,
live in ``textbook/hooks/__init__.py``.
"""

from textbook.hooks import on_files, on_page_content, on_page_markdown  # noqa: F401
