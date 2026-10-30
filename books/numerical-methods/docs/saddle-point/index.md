---
title: Saddle point
---

# Saddle point

**You have one of these when** a rule has to hold everywhere, and the model pays for it
with a second unknown.

## What you are modelling

A system with a constraint that is not a boundary condition: the fluid cannot
compress, the bodies cannot pass through each other, the linkage cannot come
apart. Something has to enforce that, and the something is a force, a pressure
or a multiplier — a second unknown that exists only to hold the rule.

The second unknown is often the interesting one. In a fluid it is the pressure.
In a mechanism it is the force in a rigid joint — the ball joint, the pin, the
contact. In an optimisation it is the price of the constraint.

## The model you write down

$$
\begin{bmatrix} A & B^{\mathsf{T}} \\ B & 0 \end{bmatrix}
\begin{bmatrix} u \\ p \end{bmatrix}
=
\begin{bmatrix} f \\ g \end{bmatrix}.
$$

The top row is the physics. The bottom row is the rule. The zero block is where
the trouble is. The matrix is symmetric but **indefinite** — it has both
positive and negative eigenvalues. So the methods that rely on positive
definiteness are closed to you.

The same problem written as a constrained minimum is

$$
\min_{u} \tfrac12 u^{\mathsf{T}} A u - f^{\mathsf{T}} u
\quad \text{subject to} \quad B u = g .
$$

The multiplier on the constraint is $p$. Same system, same difficulty, different
words.

## What it becomes on a computer

**Worked number.** The KKT system
$\begin{bmatrix}1&1\\1&0\end{bmatrix}\begin{bmatrix}x\\\lambda\end{bmatrix} =\begin{bmatrix}2\\1\end{bmatrix}$
has $x=1$ and $\lambda=1$, so the constraint force is the multiplier.

A block system. Eliminating $u$ leaves the **Schur complement**

$$
B A^{-1} B^{\mathsf{T}} p = B A^{-1} f - g ,
$$

which is dense even when $A$ and $B$ are sparse. That is why the obvious
approach — iterate on the whole system with a method that worked for the
elliptic case — stalls. The constraint block has to be handled as a constraint.

## The signature

Two unknowns per point, one of them a rule. The matrix has no positive-definite
guarantee. The solution is a pair, and the second member of the pair is a force
or a price.

There is a second signature, and it is the one that catches people: **the
constraint may be redundant.** If two rows of $B$ say the same thing, the system
has either no solution or infinitely many. A solver that does not notice will
return one of them.

## Flags that matter here

- **Non-linear.** Incompressible flow, contact, and any mechanism with a joint
  limit make the coupled system non-linear, so each step is a saddle-point solve
  inside a root-finding loop.
- **A nearly singular constraint.** A constraint that is almost dependent gives
  an ill-conditioned Schur complement, and a force that is nonsense.
- **A rank-deficient constraint.** The redundancy is in the model, not in the
  solver. A singular value decomposition of $B$ says which row to drop.

## Techniques

Every method named here is in [Methods, A to Z](../techniques/#linear-systems),
with its price and what it will not do.

| technique | what it does | when it wins | when it is the wrong tool |
|---|---|---|---|
| Sparse direct with pivoting | Factorises the block system | Small problems; two dimensions | Large three-dimensional problems |
| Schur complement | Eliminates the state, solves for the multiplier | Good solver for $A$, clear block structure | $A^{-1}$ is expensive to apply |
| Uzawa | Iterates on the multiplier alone | Short, and quick to write | Without a good preconditioner it converges slowly |
| MINRES | Krylov method for symmetric indefinite systems | The system is symmetric | Non-symmetric blocks |
| GMRES with a block preconditioner | Krylov on the whole system | The standard answer for large problems | No preconditioner, or a poor one |
| Augmented Lagrangian | Adds a penalty to improve conditioning | The multiplier is hard to get | The penalty term hides the constraint error |
| Projection (Chorin) | Projects the velocity onto the constraint set | Time-dependent incompressible flow | Steady problems, where the constraint must be exact |
| SIMPLE | Corrects pressure and velocity together | Steady flow, finite volumes | Large time steps; it is a steady method |
| Null-space method | Solves in the directions the constraint allows | The constraint has a clean parameterisation | The null space is hard to build |
| Constraint elimination | Removes dependent unknowns | The constraint is simple and local | Dense, coupled constraints |

## Systems that live here

- Incompressible flow: the pressure is the multiplier on the no-compression
  rule.
- A rigid suspension joint: the force in the joint is the multiplier on its
  constraint.
- Contact between two bodies: the contact force is the multiplier on
  non-penetration.
- Mixed finite elements for flow in a porous medium.
- The KKT system of any constrained optimisation.
- Electrostatics with a prescribed total charge.
- A rigid body mechanism with more constraints than degrees of freedom.

A **bushed** joint is the counterexample, and it is worth keeping beside the
rigid one. Replace the constraint with a spring, and the multiplier is gone: the
force is `k` times the deflection, not a solved unknown. That is the
[root problem](../root/index.md) on
[The class is a choice](../choosing-the-class/index.md), not this class.

**LBB** stands for Ladyzhenskaya–Babuška–Brezzi. An LBB-stable pair is a
velocity space and a pressure space that satisfy their condition, so the
pressure cannot develop the checkerboard pattern the table below names.

## What goes wrong

| symptom | cause | fix |
|---|---|---|
| The pressure has a checkerboard pattern | The velocity and pressure spaces do not fit together | An LBB-stable pair, or stabilisation |
| The solver stalls on the constraint block | No block preconditioner | A Schur-complement preconditioner |
| The forces are wrong but the displacements are right | The multiplier was recovered badly | Solve for the multiplier directly, not by differencing |
| Two constraints say the same thing | The constraint set is redundant | A singular value decomposition of $B$, and drop a row |
| Iterations grow as the viscosity falls | The Schur complement is badly conditioned | Precondition the Schur complement as well as $A$ |
| The constraint drifts over a long run | Projection applied once, then forgotten | Project at every step, or use a formulation that preserves it |

## Used in this collection

:::used

## Read next

- [The second unknown](the-multiplier/index.md) — the working under this class:
  what the second unknown is, and why it is the one that goes wrong.
- [Elliptic](../elliptic/index.md) — the same operator, without the constraint.
- [Root finding](../root/index.md) — the outer loop, once the model is
  non-linear.
- [When it goes wrong](../symptoms/index.md) — the symptom table for every
  class.

Back to the map: [the nine kinds](../index.md) puts this class among the
other eight.
