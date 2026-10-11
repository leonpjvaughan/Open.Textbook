"""The verification-oracle registry: check kind → the oracle that owns it.

A problem bank declares an independent ``check`` of its answer, and every check
names its ``kind``. This package is where a kind finds its oracle. The table is
:data:`KIND_ORACLE`; each oracle implements exactly the kinds it owns, and the
loader fails loudly when a kind is registered to a module that does not exist or
when a module and the table disagree — the same discipline as an unknown
``:::figure`` slug.

Adding an oracle is a new module under this package plus its name in
:data:`ORACLE_MODULES`. ``book.yaml → oracles`` (or a bank's own ``oracles``)
then selects which of them a bank may use. ``verify.py`` keeps the reports and
the step relations and delegates each check here.
"""

from __future__ import annotations

from importlib import import_module
from typing import Any, Callable, Iterable, Mapping

#: The oracles the engine ships: the name a book writes in ``book.yaml``, and
#: the module that implements it.
ORACLE_MODULES: dict[str, str] = {
    "sympy": f"{__name__}.sympy",
    "units": f"{__name__}.units",
}

#: check kind → the oracle that owns it. This is the one table an author (see
#: ``PROBLEMS.md``) and CI read; ``tests/test_verify_oracles.py`` pins it.
KIND_ORACLE: dict[str, str] = {
    "all": "sympy",
    "evaluate": "sympy",
    "solve": "sympy",
    "compare": "sympy",
    "rounded": "sympy",
    "between": "sympy",
    "apply": "sympy",
    "statistic": "sympy",
    "system": "sympy",
    "inequality": "sympy",
    "vector": "sympy",
    "ode": "sympy",
    "approx": "sympy",
    "distribution": "sympy",
    "hypothesis": "sympy",
    "correlation": "sympy",
    "regression": "sympy",
    "dimensions": "units",
    "convert": "units",
    "sigfigs": "units",
    "uncertainty": "units",
    "resolve": "units",
    "gradient": "units",
    "intercept": "units",
    "area": "units",
    "structured": "units",
}


class UnknownOracle(ValueError):
    """A book or bank named an oracle the engine does not ship."""


class UnknownCheck(ValueError):
    """A check kind no oracle the bank selected owns."""


_LOADED: set[str] = set()
_HANDLERS: dict[str, Callable[..., None]] = {}


def load(name: str) -> None:
    """Import the oracle ``name`` and register the handlers for its kinds.

    Fails loudly when the name is not shipped, when its module does not exist,
    or when the module and :data:`KIND_ORACLE` disagree about what it owns.
    """
    if name in _LOADED:
        return
    path = ORACLE_MODULES.get(name)
    if path is None:
        raise UnknownOracle(
            f"unknown verification oracle {name!r}; "
            f"choose one of {', '.join(sorted(ORACLE_MODULES))}"
        )
    try:
        module = import_module(path)
    except ModuleNotFoundError as err:
        raise UnknownOracle(
            f"verification oracle {name!r} names module {path!r}, which does not exist"
        ) from err

    owned = {kind for kind, owner in KIND_ORACLE.items() if owner == name}
    implemented = set(module.CHECKS)
    if owned != implemented:
        missing = sorted(owned - implemented)
        extra = sorted(implemented - owned)
        detail = []
        if missing:
            detail.append(f"no handler for {missing}")
        if extra:
            detail.append(f"unregistered handlers {extra}")
        raise ValueError(
            f"verification oracle {name!r} does not match KIND_ORACLE: "
            + "; ".join(detail)
        )
    for kind in owned:
        _HANDLERS[kind] = module.CHECKS[kind]
    _LOADED.add(name)


def check_kinds() -> dict[str, str]:
    """The check-kind → oracle table, with every shipped oracle loaded."""
    for name in ORACLE_MODULES:
        load(name)
    return dict(KIND_ORACLE)


class Selection:
    """The oracles one bank may use, validated and ready to dispatch.

    ``verify_bank`` builds one from ``book.yaml → oracles`` or a bank's own
    ``oracles`` override. A check whose kind belongs to an oracle the bank did
    not select fails loudly rather than silently passing.
    """

    def __init__(self, names: Iterable[str]):
        self.names = tuple(dict.fromkeys(names))
        for name in self.names:
            load(name)

    def handler(self, kind: str) -> Callable[..., None] | None:
        owner = KIND_ORACLE.get(kind)
        if owner is None:
            return None
        if owner not in self.names:
            raise UnknownCheck(
                f"check kind {kind!r} needs the {owner!r} oracle, "
                f"but this bank declares {', '.join(self.names) or 'none'}"
            )
        return _HANDLERS[kind]


def select(names: Iterable[str] | None = None) -> Selection:
    """Validate and select oracles by name; all shipped ones when omitted."""
    return Selection(ORACLE_MODULES if names is None else names)


def verify_check(
    check: Mapping[str, Any], symbols: dict, report, selection: Selection
) -> None:
    """Dispatch one check to the oracle that owns its ``kind``.

    ``all`` composes sub-checks through the same dispatch, so a composite can
    mix kinds from different oracles.
    """
    kind = check.get("kind")
    handler = selection.handler(kind)
    if handler is None:
        report.errors.append(f"check: unknown kind {kind!r}")
        return
    handler(
        check,
        symbols,
        report,
        lambda sub: verify_check(sub, symbols, report, selection),
    )
