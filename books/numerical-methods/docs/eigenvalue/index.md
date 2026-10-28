---
title: Eigenvalues
---

# Eigenvalues

**You have one of these when** you ask which values are allowed — which
frequencies, which loads, which energies, which growth rates — rather than what
a particular one is.

## What you are modelling

A system with patterns in it. Most patterns get distorted or decayed by the
system. A few come back unchanged, scaled by a number. Those numbers are the
answer, and they decide what the system is like: how it rings, when it buckles,
whether it is stable.

## The model you write down

$$
A x = \lambda x ,
$$

or, when two matrices are involved because one of them carries the mass or the
metric,

$$
A x = \lambda B x .
$$

The vector $x$ is the pattern. The scalar $\lambda$ is what the system does to
it.

## What it becomes on a computer

A matrix, usually large and sparse, and usually not written down on purpose. It
arrives from somewhere else: a discretised structure, a linearisation about an
equilibrium, a network of links. So the method depends on what you can *do* with
the matrix, not on its entries:

- Can you multiply by it cheaply? Then a Krylov method is open to you.
- Can you solve with it, or with a shifted version? Then the eigenvalue you want
  can be turned into the largest one of another problem.
- Is it small and dense? Then compute all of them, and stop worrying.

The gap between the two eigenvalues is the speed. The figure multiplies a vector
by a symmetric matrix and draws it turning toward the dominant eigenvector. The
ratio of the second eigenvalue to the first is the factor by which the wrong
direction shrinks each step.

:::figure power-lab

## The signature

The answers are a discrete set, not a curve. The question is usually *local* —
the first three modes, the smallest one, the one nearest zero — and that
locality is what makes the problem tractable on a matrix with a million rows.

Eigenvalues are also the standard way a stability question is asked: perturb the
equilibrium, linearise, and look at the sign of the real part.

## Flags that matter here

- **Non-symmetric.** Complex eigenvalues arrive in pairs, and a real-only solver
  will either fail or silently lie.
- **Generalised, with a singular $B$ .** Infinite eigenvalues appear. That is
  not a bug; it is what a constraint looks like.
- **Non-linear in $\lambda$ .** The eigenvalue is inside the matrix — a
  frequency in a foundation, a delay in a control loop. Then each step is a root
  problem again, and the safe methods are the ones built on linear solves.

## Techniques

Every method named here is in [Methods, A to Z](../techniques/#eigenvalues),
with its price and what it will not do.

| technique | what it does | when it wins | when it is the wrong tool |
|---|---|---|---|
| Power iteration | Multiplies repeatedly; finds the largest | One dominant eigenvalue, cheap multiply | You want the smallest, or two eigenvalues are close |
| Inverse iteration, shift-invert | Multiplies by $(A-\sigma I)^{-1}$ | An eigenvalue near $\sigma$ | Each step needs a linear solve |
| Lanczos | Krylov subspace, symmetric matrices | A few extreme eigenvalues, large sparse $A$ | Non-symmetric matrices |
| Arnoldi | Krylov subspace, general matrices | A few extreme eigenvalues, non-symmetric | Memory: it stores every vector unless restarted |
| QR algorithm | Similarity transformations to triangular form | All eigenvalues of a dense matrix | Large sparse problems |
| QZ | Generalised problem $Ax=\lambda Bx$ | Singular or ill-conditioned $B$ | Large sparse problems; it is dense |
| Jacobi–Davidson | Subspace correction aimed at one eigenvalue | Interior eigenvalues, non-linear problems | You need many eigenvalues |
| Subspace iteration | Several vectors at once | A block of dominant eigenvalues | Interior eigenvalues |
| Contour integral (FEAST) | Integrates around a region of the complex plane | All eigenvalues in a window | Very large problems without a good solver |

## Systems that live here

- The bounce and wheel-hop frequencies of a quarter car — one mass or two, and
  the answer changes when the second mass is added.
- Buckling of a chassis member: the smallest load at which it gives way.
- Brake squeal and flutter: a complex eigenvalue with a positive real part.
- Linear stability of a flow, where the eigenvalues of the linearised operator
  decide whether a disturbance grows.
- Molecular energy levels, from the Schrödinger equation.
- PageRank: the stationary vector of a link matrix.
- Principal components: the directions in which data varies most.

## What goes wrong

| symptom | cause | fix |
|---|---|---|
| A complex eigenvalue arrives and the code assumed real | The matrix is non-symmetric | Complex arithmetic, or work with the real block |
| The smallest eigenvalue comes out wrong | Power iteration converges to the largest | Shift-invert about zero |
| A known mode is missing | The start vector was orthogonal to it | Try several starts; use a block method |
| Spurious eigenvalues near a boundary | The discretisation, not the physics | Refine, and check convergence of each eigenvalue |
| The solver reports an infinite eigenvalue | A generalised problem with singular $B$ | That is a constraint; use QZ and read it as such |

## Used in this collection

:::used

## Read next

- [Root finding](../root/index.md) — an eigenvalue of a small matrix is the root
  of its determinant.
- [Hyperbolic](../hyperbolic/index.md) — the stability of a wave problem is an
  eigenvalue question in disguise.
- [When it goes wrong](../symptoms/index.md) — the symptom table for every
  class.
