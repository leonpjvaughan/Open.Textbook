---
title: Elliptic
---

# Elliptic

**You have one of these when** the answer is a value at every point in a region,
nothing travels, and a change at the boundary is felt everywhere at once.

## What you are modelling

A settled state. The system has had time to reach equilibrium, so there is no rate
of change left in the model. What remains is a balance that has to hold at every
point, with conditions given on the edge.

## The model you write down

$$
-\nabla \cdot \big(k \nabla u\big) = f \quad \text{in } \Omega ,
$$

with $u$ given on part of the boundary and its derivative given on the rest. The
simplest case is Laplace's equation, with $f = 0$: no source, and a value on every
edge.

## What it becomes on a computer

A mesh, one unknown at each node, and a large sparse linear system

$$
A u = b .
$$

The matrix is symmetric and positive definite in the simple case, which is a strong
statement: it has a fast, reliable iterative method, and the answer is unique.

The cost is in solving that system. A direct solve is fine in two dimensions and
becomes a memory problem in three. An iterative method is cheap per step and needs
to move information across the whole mesh.

## The signature

There is no speed of propagation, because there is no propagation. A change in one
boundary value changes the solution everywhere immediately. A method that moves
information one cell per step — Jacobi, Gauss–Seidel, a plain Krylov method — is
therefore crippled, and needs as many steps as the mesh is wide in every direction.

Two consequences follow:
- **Multigrid is not an optimisation; it is the answer.** It moves the smooth part
  of the error on a coarse mesh, where it is not smooth at all.
- **The solution is smooth even when the data is not.** A point load gives a
  continuous answer, and its derivative is the thing that has a corner.

## Flags that matter here

- **A coefficient that varies.** Layers and jumps in $k$ make a simple iterative
  method fail; algebraic multigrid is built for this.
- **A non-linear coefficient.** Then each outer step is an elliptic solve, and the
  loop is a root problem.
- **Any coupling to a constraint.** If a rule is enforced by a second unknown, the
  problem is a [saddle point](../saddle-point/index.md), and the positive-definite
  guarantee is gone.

## Techniques

Every method named here is in [Methods, A to Z](../techniques/#linear-systems), with its price and what it will not do.

| technique | what it does | when it wins | when it is the wrong tool |
|---|---|---|---|
| Sparse direct (Cholesky, LU) | Factorises the matrix once | Two dimensions; many right-hand sides | Three dimensions: the factors fill in |
| Conjugate gradients | Minimises the energy over a Krylov subspace | Symmetric positive definite | Any coupling or convection makes it fail |
| GMRES, BiCGSTAB | Krylov methods for general matrices | Not symmetric; a constraint is present | A symmetric problem, where CG is cheaper |
| Jacobi, Gauss–Seidel, SOR | Simple sweeps over the mesh | As a smoother inside multigrid | Alone: the step count grows with the mesh |
| Multigrid, algebraic multigrid | Solves on several meshes at once | Large, smooth, elliptic problems | Non-elliptic problems; jumping coefficients without AMG |
| Preconditioners (ILU, AMG, Jacobi) | Makes the system easier for a Krylov method | Almost always, in practice | You have not measured the iteration count |
| Domain decomposition | Splits the region into pieces | Very large problems on many cores | The interface problem is not solved well |
| Fast Fourier transform | Diagonalises a constant-coefficient operator | Periodic, constant coefficients | Varying coefficients or complex boundaries |
| Boundary element | Solves on the boundary only | Linear, homogeneous, unbounded regions | Varying coefficients inside the region |

## Systems that live here

- Steady heat conduction in a casting, before it is pulled.
- Electrostatics and magnetostatics.
- Potential flow around a body.
- Linear elasticity: the stress in a loaded bracket.
- Groundwater flow through soil.
- The pressure equation inside an incompressible flow solver — but the *constraint*
  that produces it is a saddle point, and the pressure equation is how that
  constraint is paid.
- The elliptic gauge conditions in numerical relativity, in the formulations where
  they cannot be evolved.

## What goes wrong

| symptom | cause | fix |
|---|---|---|
| The iteration count grows as the mesh is refined | No preconditioner, or a smoother used alone | Multigrid, or AMG |
| Conjugate gradients stalls or gives nonsense | The matrix is not symmetric positive definite | Check the model; use GMRES |
| The answer looks right but the flux is wrong | The boundary condition was applied to the wrong quantity | Check whether the value or its derivative was given |
| Refining the mesh changes the answer a lot | A point load or a re-entrant corner | Graded mesh, or a formulation that expects it |
| Two different solvers agree but the numbers differ | The system is ill-conditioned | Scale the unknowns; check the residual, not the answer |

## Used in this collection

:::used

## Read next

- [Saddle point](../saddle-point/index.md) — what an elliptic problem becomes when a
  constraint is added.
- [Parabolic](../parabolic/index.md) — the same operator, with time put back in.
- [When it goes wrong](../symptoms/index.md) — the symptom table for every class.
