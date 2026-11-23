"""Acceptance 3: the SVD finds exactly one null direction, and names what is in it."""

from __future__ import annotations

from types import SimpleNamespace

import numpy as np

from open_textbook.otkd.problem.compile import Problem
from open_textbook.otkd.report import diagnose_redundancy
from open_textbook.otkd.solvers.svd import diagnose
from open_textbook.otkd.solvers.system import System, left_null, rank_and_null


def test_exactly_one_null_direction(two_leg):
    diagnosis = diagnose_redundancy(two_leg)
    assert diagnosis.redundancy == 1
    assert diagnosis.null_space.shape[1] == 1
    assert diagnosis.rank == 21
    # 22 rows, 21 unknowns: one singular value more than the unknown count would be needed
    # to see the zero explicitly, so assert the count, not a threshold.
    assert len(diagnosis.singular_values) == 21
    assert diagnosis.singular_values[-1] > 1e-3


def test_dependent_rows_are_named(two_leg):
    diagnosis = diagnose_redundancy(two_leg)
    assert "uca.unit" in diagnosis.dependent_rows
    assert any(name.startswith("uca-front") for name in diagnosis.dependent_rows)


def test_dropping_a_dependent_row_restores_a_well_conditioned_system(two_leg):
    problem = Problem(two_leg)
    g = problem.numbers()
    q0 = problem.q0()
    theta = problem.theta0()
    for name in ("uca-front.ty", "uca-front.tz", "uca-rear.ty"):
        system = System(problem, g, theta, (name,))
        rank, null, singular = rank_and_null(system.jacobian(q0))
        assert rank == problem.n
        assert null.shape[1] == 0
        assert singular[0] / singular[-1] < 1e3


def test_dropping_an_independent_row_does_not(two_leg):
    problem = Problem(two_leg)
    system = System(problem, problem.numbers(), problem.theta0(), ("uca-front.tx",))
    rank, null, _ = rank_and_null(system.jacobian(problem.q0()))
    assert rank == problem.n - 1
    assert null.shape[1] == 1


def _stub_system(jac: np.ndarray, names: tuple[str, ...]):
    problem = SimpleNamespace(rows=[SimpleNamespace(name=name) for name in names])
    return SimpleNamespace(
        constrained=list(range(len(names))),
        problem=problem,
        jacobian=lambda _q, rows: jac[rows],
    )


def _straddling_jacobian(sigma: float) -> np.ndarray:
    """3x3 matrix with exact singular values [1, 1, sigma] and left null vector [0, 1, -1]/sqrt(2)."""
    s = 1.0 / np.sqrt(2.0)
    u = np.array([[1.0, 0.0, 0.0], [0.0, s, s], [0.0, s, -s]])
    return u @ np.diag([1.0, 1.0, sigma])


def test_diagnose_rtol_governs_rank_and_dependent_rows():
    names = ("r0", "r1", "r2")
    q = np.zeros(3)

    # Singular value 5e-10 sits above the default 1e-10 cutoff and below 1e-9.
    above_default = _stub_system(_straddling_jacobian(5e-10), names)
    default_diag = diagnose(above_default, q)
    assert default_diag.rank == 3
    assert default_diag.redundancy == 0
    assert default_diag.dependent_rows == ()
    assert default_diag.null_space.shape == (3, 0)

    looser_diag = diagnose(above_default, q, rtol=1e-9)
    assert looser_diag.rank == 2
    assert looser_diag.redundancy == 1
    assert looser_diag.dependent_rows == ("r1", "r2")
    assert looser_diag.null_space.shape == (3, 1)

    # Singular value 5e-11 sits below the default 1e-10 cutoff and above 1e-11.
    below_default = _stub_system(_straddling_jacobian(5e-11), names)
    default_below = diagnose(below_default, q)
    assert default_below.rank == 2
    assert default_below.redundancy == 1
    assert default_below.dependent_rows == ("r1", "r2")
    assert default_below.null_space.shape == (3, 1)

    tighter_diag = diagnose(below_default, q, rtol=1e-11)
    assert tighter_diag.rank == 3
    assert tighter_diag.redundancy == 0
    assert tighter_diag.dependent_rows == ()
    assert tighter_diag.null_space.shape == (3, 0)


def test_diagnose_rtol_filters_null_row_weights():
    alpha = 5e-10
    beta = float(np.sqrt((1.0 - alpha**2) / 2.0))
    null_dir = np.array([[alpha, beta, -beta]])
    # Two orthonormal columns orthogonal to null_dir give singular values [1, 1] and exact left null null_dir.
    _, _, vt = np.linalg.svd(null_dir, full_matrices=True)
    jac = vt[1:].T
    system = _stub_system(jac, ("r0", "r1", "r2"))
    q = np.zeros(2)

    default_diag = diagnose(system, q)
    assert default_diag.rank == 2
    assert default_diag.redundancy == 1
    assert default_diag.dependent_rows == ("r0", "r1", "r2")

    looser_diag = diagnose(system, q, rtol=1e-9)
    assert looser_diag.rank == 2
    assert looser_diag.redundancy == 1
    assert looser_diag.dependent_rows == ("r1", "r2")
