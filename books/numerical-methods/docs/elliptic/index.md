---
title: Elliptic
---

# Elliptic

**You have one of these when** the answer is a value at every point in a region,
and nothing travels.

## What you are modelling

A settled state. The system has had time to reach equilibrium, so there is no
rate of change left in the model. What remains is a balance that has to hold at
every point, with conditions given on the edge.

## The model you write down

$$
-\nabla \cdot \big(k \nabla u\big) = f \quad \text{in } \Omega ,
$$

with $u$ given on part of the boundary and its derivative given on the rest. The
simplest case is Laplace's equation, with $f = 0$: no source, and a value on
every edge.

## What it becomes on a computer

**Worked number.** For $-u''=1$ on $[0,1]$ with $u=0$ at both ends,
$u(x)=x(1-x)/2$, whose maximum is $1/8$ at $x=1/2$.

A mesh, one unknown at each node, and a large sparse linear system

$$
A u = b .
$$

The matrix is symmetric and positive definite in the simple case, which is a
strong statement: it has a fast, reliable iterative method, and the answer is
unique.

The cost is in solving that system. A direct solve is fine in two dimensions and
becomes a memory problem in three. An iterative method is cheap per step and
needs to move information across the whole mesh.

The system is the problem. The figure solves a one-dimensional version by
conjugate gradients. The field moves toward the exact curve, and the residual
below it falls to the floor in at most one iteration per cell.

:::figure cg-lab

## The signature

There is no speed of propagation, because there is no propagation. A change in
one boundary value changes the solution everywhere immediately. A **smoother**
is one sweep of Jacobi or Gauss–Seidel; multigrid uses a coarse mesh for the
part of the error a sweep cannot see. A method that moves information one cell
per step — Jacobi, Gauss–Seidel, a plain Krylov method — is therefore crippled,
and needs as many steps as the mesh is wide in every direction.

Two consequences follow:

- **Multigrid is not an optimisation of another method; it is what the class
  makes available.** It moves the smooth part of the error on a coarse mesh,
  where it is not smooth at all.
- **The solution is smooth even when the data is not.** A point load gives a
  continuous answer, and its derivative is the thing that has a corner.

## Flags that matter here

- **A coefficient that varies.** Layers and jumps in $k$ make a simple iterative
  method fail; algebraic multigrid is built for this.
- **A non-linear coefficient.** Then each outer step is an elliptic solve, and
  the loop is a root problem.
- **Any coupling to a constraint.** If a rule is enforced by a second unknown,
  the problem is a [saddle point](../saddle-point/index.md), and the
  positive-definite guarantee is gone.

## Techniques

Every method named here is in [Methods, A to Z](../techniques/#linear-systems),
with its price and what it will not do.

<!-- table: cards -->
| technique | what it does | when it wins | when it is the wrong tool |
|---|---|---|---|
| [Sparse direct (Cholesky, LU)](../techniques/#sparse-direct-cholesky) | Factorises the matrix once | Two dimensions; many right-hand sides | Three dimensions: the factors fill in |
| [Conjugate gradients](../techniques/#conjugate-gradients) | Minimises the energy over a Krylov subspace | Symmetric positive definite | Any coupling or convection makes it fail |
| [GMRES, BiCGSTAB](../techniques/#gmres) | Krylov methods for general matrices | Not symmetric; a constraint is present | A symmetric problem, where CG is cheaper |
| [Jacobi, Gauss–Seidel, SOR](../techniques/#jacobi) | Simple sweeps over the mesh | As a smoother inside multigrid | Alone: the step count grows with the mesh |
| [Multigrid, algebraic multigrid](../techniques/#multigrid) | Solves on several meshes at once | Large, smooth, elliptic problems | Non-elliptic problems; jumping coefficients without AMG |
| [Preconditioners (ILU, AMG, Jacobi)](../techniques/#preconditioners-ilu) | Makes the system easier for a Krylov method | Almost always, in practice | You have not measured the iteration count |
| [Domain decomposition](../techniques/#domain-decomposition) | Splits the region into pieces | Very large problems on many cores | The interface problem is not solved well |
| [Fast Fourier transform](../techniques/#fast-fourier-transform) | Diagonalises a constant-coefficient operator | Periodic, constant coefficients | Varying coefficients or complex boundaries |
| [Boundary element](../techniques/#boundary-element) | Solves on the boundary only | Linear, homogeneous, unbounded regions | Varying coefficients inside the region |

## Systems that live here

- Steady heat conduction in a casting, before it is pulled.
- Electrostatics and magnetostatics.
- Potential flow around a body.
- Linear elasticity: the stress in a loaded bracket.
- Groundwater flow through soil.
- The pressure equation inside an incompressible flow solver — but the
  *constraint* that produces it is a saddle point, and the pressure equation is
  how that constraint is paid.
- The elliptic coordinate conditions in numerical relativity, in the
  formulations where they cannot be evolved — the lapse equation among them,
  which
  [The class is a choice](../choosing-the-class/#the-same-equations-classified)
  puts through the test beside its hyperbolic version.

## What goes wrong

| symptom | cause | fix |
|---|---|---|
| The iteration count grows as the mesh is refined | No preconditioner, or a smoother used alone | Multigrid, or AMG |
| It ran all night and moved nowhere | The method moves information one cell per step | A method that sees the whole region at once |
| Conjugate gradients stalls or returns nonsense | The matrix is not symmetric positive definite | Check symmetry; use GMRES or MINRES |
| The answer looks right but the flux is wrong | The boundary condition is on the wrong quantity | Check whether the value or its derivative was given |
| Refining the mesh changes the answer a lot | A point load or a re-entrant corner | Graded mesh, or a formulation that expects it |
| Two different solvers agree but the numbers differ | The system is ill-conditioned | Scale the unknowns; check the residual, not the answer |

## Used in this collection

:::used

## Read next

- [Where the matrix comes from](the-weak-form/index.md) — the working under this
  class: the weak form, the element, and the assembled matrix.
- [Saddle point](../saddle-point/index.md) — what an elliptic problem becomes
  when a constraint is added.
- [Parabolic](../parabolic/index.md) — the same operator, with time put back in.
- [Reading the class off the equation](../reading-the-class/index.md) — the one
  number that says an equation like this one is elliptic.
- [When it goes wrong](../symptoms/index.md) — the symptom table for every
  class.

Back to the map: [the nine kinds](../index.md) puts this class among the
other eight.
