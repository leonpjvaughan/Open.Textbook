---
title: What a singular value is telling you
chapter: 1
chapter_title: Suspension kinematics
section: '1.4'
section_title: The redundancy was ours
kind: deeper
---

# What a singular value is telling you

The main thread reads three numbers off a decomposition and concludes that two of
its equations are one. This page explains what those numbers are, and why the one
that is zero carries less information than the one that is not.

## A matrix stretches and turns

A matrix is a machine that takes an arrow and returns another arrow. Any such
machine can be split into three steps, and that is what the singular value
decomposition says:

$$ J = U\,\Sigma\,V^{\mathsf{T}}. $$

Read it right to left: $V^{\mathsf{T}}$ turns the input, $\Sigma$ stretches it
along the axes, and $U$ turns the result. The singular values in $\Sigma$ are how
much each direction is stretched. A direction that is stretched by **zero** is a
direction the machine flattens to nothing.

Here $J$ takes two inputs (how far to move the ball joint, across and up) and
returns three outputs (how much each equation changes). Its three singular values
are 1.415, 0.998 and 0. That is as many as two inputs can produce, and the third
is zero because two inputs cannot fill three dimensions.

## Two null spaces, and only one is about the equations

There are two questions a zero singular value can answer, and they are different
questions because the matrix has different numbers of rows and columns.

- **Nothing in the unknowns is free.** A direction in the unknowns that changes no
  equation would be a right null vector. There is none here: both unknowns affect
  the residuals. This is the good case — the pose is determined.
- **One combination of equations says nothing.** A direction in the residual space
  that no move can reach is a left null vector. There is one here, and it is
  $(0.707, -0.707, 0)$.

The second is the one that matters, because **equations are rows**. A redundancy is
a row too many, so it lives in the left space. A program that reported only the
singular values would know that something is degenerate and not what.

## Why the zero, on its own, is not evidence

Three rows and two columns force the third singular value to be zero. Two rows and
two columns would not. So the zero is a fact about the shape of the matrix, and it
appears in every three-row model — including a model whose equations genuinely
disagree.

What distinguishes the two situations is the null vector's pattern:

| Null vector looks like | What it means | What to do |
|---|---|---|
| two entries, opposite signs | those two rows are one equation | delete one of them |
| every entry non-zero | the equations conflict | find the wrong equation |

A conflict is the more interesting situation and the more dangerous one. Least
squares will split the difference and return an answer that looks like all the
others.

## The numbers in this chapter

| Quantity | Value | What it says |
|---|---|---|
| σ₁ | 1.415 | the strongest single combination of equations |
| σ₂ | 0.998 | the other one, nearly as strong |
| σ₃ | 0.000 | no third combination exists |
| σ₁ / σ₂ | 1.42 | well conditioned: no near-collapse |
| left null vector | (0.707, −0.707, 0) | rows 1 and 2 cancel |

The ratio is the number practitioners actually watch. If σ₂ had come out at 0.001
rather than 0.998, the model would be in trouble of a different kind: two equations
that are *almost* the same, so that a small measurement error in one of them swings
the answer wildly. That is not redundancy, it is fragility, and the cure is
different — measure better, or model differently.

## How the figure computes it

Two unknowns means $J^{\mathsf{T}}J$ is a $2\times2$ matrix, and the singular values
are the square roots of its eigenvalues:

$$ \sigma_i = \sqrt{\lambda_i\left(J^{\mathsf{T}}J\right)}. $$

For the left null vector, the page's own code diagonalises the $3\times3$ matrix
$JJ^{\mathsf{T}}$ by Jacobi rotations and takes the eigenvector of the smallest
eigenvalue. Twenty lines, no library — and the same definition the general solver
uses, which is why the two agree rather than merely resemble each other.
