---
title: Linear system
---

# Linear system

**You have one of these when** every rule in the model is linear in the unknowns,
the unknowns are a finite list, and nothing changes with time.

## What you are modelling

A balance. The forces at a joint add to zero, the currents into a node add to zero,
the flow through a face equals the flow out of it. Or a fit: the model is a sum of
known shapes, and you want the amounts of each.

The system itself is linear, so no non-linear iteration is needed. The work is done once
the rows are written, and the difficulty has moved into the matrix — where a large sparse
system may still call for an iterative solver.

## The model you write down

$$
A x = b .
$$

Each row is one rule, each column is one unknown, and $b$ is what the rules have to
equal. The physics of the problem has already finished its job by the time you have
$A$.

## What it becomes on a computer

A matrix, and a choice between two families. The choice is made by the **properties
of the matrix**, not by the subject the matrix came from:

- **Dense and small.** Factorise it. The cost is cubic in the number of unknowns, and
  for a few thousand that is the end of the story.
- **Sparse and large.** Factorising fills in the zeros and runs out of memory, so
  iterate instead — and the iteration count is decided by conditioning, not by size.
- **Symmetric positive definite.** Conjugate gradients works, and fails on anything
  else.
- **Symmetric indefinite.** A different Krylov method is needed, and the reason is
  the [saddle point](../saddle-point/index.md) page.
- **Rectangular.** More equations than unknowns is a least-squares problem, and the
  answer is a projection rather than a solution.

A linear system is often one step inside a non-linear solve. `Maths Applied`
[§1.3](/maths-applied/chapter-1/section-1.3/learn/)'s three distance rules are
non-linear, and Gauss–Newton iterates them; each step solves the linear system on
this page. The rules at that step are linear, and the outer model is a root problem
or an optimisation. That is the distinction the
[class is a choice](../choosing-the-class/index.md) page makes: the class belongs to
the writing, and the writing can be one step of a larger model.

## The signature

The answer comes from a matrix, and the matrix's properties decide the method. Two
consequences follow, and both surprise people:

- **Scale is not difficulty.** A million-unknown sparse system with good conditioning
  solves in seconds; a hundred-unknown matrix with a condition number of $10^{12}$
  has lost twelve digits and cannot give you an answer you can trust.
- **Reordering the rows changes the answer.** In exact arithmetic it cannot. In
  floating point, a different pivot order changes the rounding, and an ill-conditioned
  matrix turns that into a different last digit or a different answer.

## Flags that matter here

- **Conditioning.** The one flag that matters most, and the one nobody checks. It is
  the number of digits you lose.
- **Symmetry and definiteness.** They decide which methods are available, and a method
  used outside its class does not merely run slowly; it returns nonsense.
- **Sparsity and fill-in.** A sparse matrix that factorises into a dense one is a
  memory problem wearing a maths problem's clothes.
- **Redundant rows.** Two rows that say the same thing give either no solution or
  infinitely many, and a solver that does not notice returns one of them.

## Techniques

Every method named here is in [Methods, A to Z](../techniques/#linear-systems), with its price and what it will not do.

| technique | what it does | when it wins | when it is the wrong tool |
|---|---|---|---|
| Dense LU, with pivoting | Factorises a general matrix | A few thousand unknowns, one solve or many right-hand sides | Large sparse problems |
| Cholesky | Factorises a symmetric positive definite matrix | The matrix is SPD, and you want half the work of LU | Any non-symmetric or indefinite matrix |
| QR, SVD | Factorises a rectangular matrix | Least squares, rank deficiency, a diagnostic of conditioning | Very large sparse problems |
| Normal equations | Squares the system and uses Cholesky | Overdetermined and well conditioned, and you want speed | Anything else: it squares the condition number |
| Sparse direct (multifrontal) | Factorises with a fill-reducing ordering | Two dimensions; repeated solves with the same matrix | Three dimensions, where fill-in wins |
| Conjugate gradients | Krylov method for SPD systems | Large, sparse, symmetric positive definite | Indefinite or non-symmetric matrices |
| GMRES, BiCGSTAB | Krylov methods for general matrices | Non-symmetric, sparse | Memory: GMRES stores every vector unless restarted |
| MINRES | Krylov method for symmetric indefinite systems | Symmetry with indefiniteness | Non-symmetric matrices |
| Preconditioners (ILU, AMG, Jacobi) | Changes the system the iteration sees | Almost always, in practice | You have not measured the iteration count |
| Multigrid | Solves on a hierarchy of meshes | The matrix came from an elliptic problem | A matrix from anywhere else |
| Iterative refinement | Corrects a solve with its own residual | Ill-conditioned, and you want every digit | The factorisation is expensive, and a second solve is not affordable |

## Systems that live here

- The stiffness matrix of a structural analysis: the displacement of every node.
- Nodal analysis of a circuit: the voltage at every node.
- Any steady discretisation, once the equations are assembled: see
  [Elliptic](../elliptic/index.md).
- The `double-wishbone` example's Jacobian: the package this collection uses solves 21
  equations whose Jacobian has 441 entries, of which **161 are not zero** — sparse enough
  that the sparsity is the method, not a detail of it: the generated solver touches only
  the non-zeros.
- A least-squares fit: a tyre model, a calibration curve, a camera model.
- Network flows, and the stationary vector of a link matrix.
- Spline and surface fitting, where the unknowns are the control points.

## What goes wrong

| symptom | cause | fix |
|---|---|---|
| The residual is tiny and the answer is wrong | The matrix is ill-conditioned; a small residual says little | Check the condition number; scale the unknowns |
| The factorisation runs out of memory | Fill-in: a sparse matrix with a dense factor | A fill-reducing ordering, or an iterative method |
| Conjugate gradients stalls or returns nonsense | The matrix is not symmetric positive definite | Check symmetry; use GMRES or MINRES |
| The answer changes when the rows are reordered | Rounding, amplified by conditioning | Fix a pivot ordering, and report the conditioning |
| The solver reports no solution, or infinitely many | Redundant or contradictory rows | A rank-revealing factorisation, and fix the model |
| The iterative method needs thousands of steps | No preconditioner, or a poor one | Precondition; measure the count before and after |

## Used in this collection

:::used

## Read next

- [Root finding](../root/index.md) — the same question when a rule bends with the answer.
- [Elliptic](../elliptic/index.md) — where most of these matrices come from.
- [Saddle point](../saddle-point/index.md) — a symmetric matrix that is not positive
  definite, and why that changes the method.
- [When it goes wrong](../symptoms/index.md) — the symptom table for every class.
