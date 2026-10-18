---
title: 1.3 Two legs, one contradiction — Learn
chapter: 1
chapter_title: Suspension kinematics
section: '1.3'
section_title: Two legs, one contradiction
refs: []
kind: walkthrough
---

# 1.3 Two legs, one contradiction

## A model that starts from the parts

A wishbone is made of two legs welded to a plate. That suggests a model built from
the legs: each leg has a fixed length, so each one is a distance that must not
change. Write the upper ball joint's position as the two unknowns, and every fact
you know about it becomes one equation:

$$ \begin{aligned}
\left|D - B_1\right| - R_1 &= 0 && \text{the front leg keeps its length} \\
\left|D - B_2\right| - R_2 &= 0 && \text{the rear leg keeps its length} \\
\left|D - C\right| - L &= 0 && \text{the upright keeps its length}
\end{aligned} $$

Three equations, two unknowns. That is the whole of this section: the model has
one more thing to say than it has freedom to say it with.

§1.2 avoided this by treating the wishbone as one rigid body, which it is. The
two-leg model is not wrong about the car. It is wrong about the *counting*.

## In the front view, two of those are one equation

Look from in front of the car. The wishbone's two legs lie almost fore and aft,
so they point almost straight at you, and they project onto nearly the same line.
The two pivots $B_1$ and $B_2$ project onto the same point, and the two leg
lengths project onto the same circle.

So in this view the first two rows are **the same equation written twice**: the
same centre, the same radius, the same derivative. The model has three rows and
two genuinely different equations.

That is not a mistake to be embarrassed about. It is exactly what a projection
does: it throws away the direction that told the legs apart. The three-dimensional
model keeps them apart, and §1.4 shows what that costs.

## Least squares: the best you can do with too many demands

When a system has more equations than unknowns, there is usually no point that
satisfies all of them. The standard way to answer is to ask for the point that
comes closest: minimise the total of the squared errors,

$$ S(D) = \tfrac12\left|\mathbf{r}(D)\right|^2, \qquad
\mathbf{r} = \begin{pmatrix} |D-B| - R_B \\ |D-B| - R_B \\ |D-C| - L \end{pmatrix}. $$

Setting the derivative to zero gives the **normal equations**, and each step of
the iteration solves them:

$$ J^{\mathsf{T}}J\;\Delta = -J^{\mathsf{T}}\mathbf{r},
\qquad D \leftarrow D + \Delta. $$

This is Gauss–Newton. With two unknowns, $J^{\mathsf{T}}J$ is a $2\times2$ matrix,
and the step is written down with no linear algebra library at all. The rows of
$J$ are simple too, because every row is a distance:

$$ J = \begin{pmatrix} \hat{u}^{\mathsf{T}} \\ \hat{u}^{\mathsf{T}} \\ \hat{v}^{\mathsf{T}} \end{pmatrix},
\qquad \hat{u} = \frac{D-B}{|D-B|},\quad \hat{v} = \frac{D-C}{|D-C|}. $$

The derivative of a distance, with respect to the point, is the unit vector along
it. The general solver differentiates symbolically, which matters when the rows
are harder than these; here it can be written down.

:::figure solver-loop

Step through. The two dashed circles are where the point has to be to satisfy the
two constraints it can satisfy. The bars on the right are how wrong each of the
three equations still is.

## What happens

| Step | Total error |
|---|---|
| 0, the first guess | 135 mm |
| 1 | 8.9 mm |
| 2 | 0.20 mm |
| 3 | 2.6 × 10⁻⁵ mm |
| 4 | 1.7 × 10⁻¹² mm |
| 5 | 1.7 × 10⁻¹³ mm |

The error does not fall to nothing: it falls to the smallest number a double
precision float can tell apart from nothing, and stays there. That floor is
**round-off**, not physics. It is worth knowing the difference, because a residual
that flattens out *above* the round-off floor means the equations genuinely
disagree, and that is a modelling problem rather than a numerical one.

The point it settles on is the point §1.2 found, to eleven decimal places. Adding
an equation that says the same thing twice did not change the answer. It only gave
the solver more work.

## The agreement panel

| Check | Value |
|---|---|
| Least squares, after five steps | agrees with §1.2's closed form to 10⁻¹² m |
| Total residual at the end | 1.7 × 10⁻¹³ mm, which is round-off |
| Singular values of the Jacobian | 1.446, 0.953, 0.000 |
| The smallest, and what it means | nothing on its own — see §1.4 |

```text
TODO(phase-a): the exported two-leg sweep carries `iterations` — one representative
frame, each step's residual and singular values — and §1.4's panel reads
`agreement` and the null-space basis from the solver package. Until then these
numbers are the ones this page's own model computes, and the figure recomputes them
on every load.
```

## Pseudocode, and the file it comes from

```python
# solve.py — least squares by Gauss-Newton, with the diagnosis attached
def least_squares(start, theta, steps=20, tol=1e-12):
    D = start
    for k in range(steps):
        r = residual(D, theta)              # three rows
        J = jacobian(D, theta)              # three by two
        delta = solve_normal_equations(J, r)  # (JᵀJ) Δ = -Jᵀr
        D = D + delta
        if norm(r) < tol:
            break
    return Solution(D, cost=0.5 * norm(r)**2, singular_values=svd(J)[0], ...)
```

The real function is
[`solve.py`](https://github.com/leonpjvaughan/suspension-kinematics/blob/main/src/suspension/solve.py),
and it returns the cost, the optimality and the singular values of $J$ at the
solution, because a least-squares answer without its residual is a number with no
error bar.

## You should now be able to

- say what a redundancy is, and why writing a fact twice creates one
- explain why the front view makes the wishbone's two legs the same equation
- write the residual and the Jacobian for a system of distance constraints
- say what the residual floor means, and what it would mean if it were higher

## Watch out

A small residual does **not** mean the model is a good model. It means the solver
did well at satisfying the equations it was given.

Those are different claims, and confusing them is the most expensive mistake in
this chapter. A model that is missing something — a bush, a bend, a length that
changes with temperature — will still have a tiny residual, because it is
answering its own question perfectly. The residual measures the arithmetic. Only
measurement, or a second model, can say anything about the world.

The second trap is the mirror of it: an equation that repeats another one looks
harmless, and it makes every error message the solver produces about the *wrong*
thing. A rank-deficient Jacobian is not a numerical accident here. It is a
statement about the model, and it has a name: §1.4.

## Going further

:::deeper what-least-squares-does
