---
title: What least squares is minimising
chapter: 1
chapter_title: Suspension kinematics
section: '1.3'
section_title: Two legs, one contradiction
kind: deeper
---

# What least squares is minimising

The main thread uses least squares as a tool: when there are more equations than
unknowns, minimise the squared error and carry on. This page is about what that
sentence means, and why the tool is the right shape for the job.

## The residual is a point in three dimensions

At any guess $D$ for the upper ball joint, the three equations give three numbers:
how far the first leg is from its length, the second, and the upright. Collect them
into a vector:

$$ \mathbf{r}(D) = \left(r_1,\ r_2,\ r_3\right) \in \mathbb{R}^3. $$

Exact satisfaction would mean $\mathbf{r} = 0$: the origin of that space. When the
model is consistent, the origin is reachable. When it is not, the origin is out
there in space and the best you can do is get as close to it as the mechanism
allows.

"Close" is measured with the length of $\mathbf{r}$, and least squares minimises

$$ S(D) = \tfrac12\left|\mathbf{r}(D)\right|^2 = \tfrac12\left(r_1^2 + r_2^2 + r_3^2\right). $$

## Why squares

Three reasons, in increasing order of importance.

- **Squares are smooth where lengths are not.** $|\mathbf{r}|$ has a corner at zero,
  and a minimiser that sits at a corner is awkward to find by differentiation.
- **Squares give linear equations.** Setting $\partial S/\partial D = 0$ gives
  $J^{\mathsf{T}}\mathbf{r} = 0$ — the normal equations — which are linear in the
  unknown once $J$ is evaluated. Nothing has to be searched.
- **The answer is a projection.** This is the real reason. Moving $D$ by a small
  amount $\Delta$ changes $\mathbf{r}$ by $J\Delta$, and $J$ maps the plane of
  possible moves into three-dimensional residual space. The set of reachable
  residuals is a **plane through $\mathbf{r}$**, and the closest point on a plane to
  the origin is found by dropping a perpendicular onto it. That perpendicular is
  exactly $J^{\mathsf{T}}\mathbf{r} = 0$.

So least squares is not "an error measure someone chose". It is the geometry of
being closest, and the perpendicular is why the normal equations have the shape they
have.

## The compromise, and what it hides

When the equations genuinely disagree, least squares returns the point that splits
the difference — and this is worth being suspicious of.

- It does **not** tell you that an equation is wrong.
- It does **not** tell you which one.
- It gives the same kind of answer whether the equations are consistent or not.

A model with one bad equation therefore produces a plausible pose, a residual that
looks small compared with anything you can see, and a camber curve that is subtly
wrong. The residual is an error bar on the *solver*, not on the *model*.

## What the stopping test really is

An iteration that minimises $S$ has finished when moving in any direction would
increase it. Differentiating, that condition is

$$ J^{\mathsf{T}}\mathbf{r} = 0, $$

which is not the same as $\mathbf{r} = 0$. A least-squares solve has converged when
it can no longer improve — not when it has satisfied the equations.

That distinction is why the numbers in the main thread's table fall to the round-off
floor and then stop. They are not getting closer to zero because the solver gave up;
they are at the point where the solver has nothing left to improve, and the leftover
is the arithmetic's own noise.

## Why not the smallest possible misfit instead

A different-looking rule — minimise the largest of the three errors rather than the
sum of their squares — gives a different compromise, and for some problems a better
one. It is also harder to solve, and it does not have the projection property.

Least squares is chosen here because it is the compromise that the *mechanism's own
geometry* produces: the directions in which the point can move, and the perpendicular
to them. That is the sense in which it is not arbitrary.
