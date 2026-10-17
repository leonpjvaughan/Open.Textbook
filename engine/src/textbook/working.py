"""`python -m textbook.working` — verify the arithmetic a figure states.

The work is in `textbook.verify.working`; this is the entry point, beside the other
`python -m textbook.<thing>` commands.
"""

from __future__ import annotations

import sys

from .verify.working import main

if __name__ == "__main__":
    sys.exit(main())
