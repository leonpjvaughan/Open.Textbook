"""Shared engine for the interactive textbook collection.

Layers, from the bottom up:

* :mod:`textbook.book` — a book's identity and build metadata (`book.yaml`);
* :mod:`textbook.config` — resolve the current build's paths from MkDocs config;
* :mod:`textbook.hooks` — the MkDocs hooks, composed in an explicit order;
* :mod:`textbook.verify` — the problem-bank verifier and its oracles;
* :mod:`textbook.scaffold`, :mod:`textbook.booklet`, :mod:`textbook.portal` —
  the generators whose output CI checks for drift.
"""
