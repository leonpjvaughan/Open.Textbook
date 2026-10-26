---
title: 1.4 The redundancy was ours — Learn
chapter: 1
chapter_title: Suspension kinematics
section: '1.4'
section_title: The redundancy was ours
refs: []
kind: walkthrough
---

# 1.4 The redundancy was ours

## The question this section answers

§1.3 ended with a model that had three equations for two unknowns, and a
decomposition that reported a singular value of zero. But a zero singular value,
on its own, proves nothing at all: any matrix with more rows than columns has one.
It is a fact about the shape of the matrix, not about the model.

So the question is not "is there a redundancy". It is **which equation is the
spare one**, and how you can tell.

## What the decomposition says

The Jacobian is a $3 \times 2$ matrix. Its singular value decomposition is

$$ J = U\,\Sigma\,V^{\mathsf{T}}, $$

with $\Sigma$ holding the singular values down its diagonal. At the design pose,
those values are

$$ \sigma = \left(1.415,\ 0.998,\ 0.000\right). $$

Two of them are not zero, so the Jacobian has rank 2: the two unknowns are both
determined, and no direction in the point's own plane is left free. The third
belongs to the rows, and it says there is a **combination of the three equations
that is empty**.

Which combination? That is a vector in the left null space, and here it is:

$$ w = \left(0.707,\ -0.707,\ 0.000\right). $$

Read the entries: add 0.707 of the first equation to −0.707 of the second, add
nothing of the third, and the result constrains nothing. The first two rows cancel
each other, exactly. In plain words: **the two legs are one equation**.

The numbers in $w$ are not a coincidence of the arithmetic. The rows of $J$ are
$\hat{u}$, $\hat{u}$ and $\hat{v}$; two of them are equal, so their difference is
zero however the mechanism is posed. A different pose gives the same $w$, and a
different geometry gives a different $\sigma$ and the same pattern.

## Drop the row, and you are back where you started

If one row of a three-row model is a duplicate, deleting it cannot change the
answer. That is a claim worth testing rather than asserting. It is the third of
the four tests in the solver's own suite: with the spare equation removed, the
least-squares answer and the direct answer are the same number.

Getting the same answer by a shorter route is the useful outcome. The model is not
wrong; it was doing work it did not need to do.

## Why this is not a general-purpose diagnosis

Two cautions, and the second one matters more than the first.

**A zero singular value is not evidence.** Three rows and two unknowns always give
a zero. If the mechanism had four equations, it would give two. The evidence is the
null vector and its pattern of zeros. A null vector supported on two rows says
those two rows are one. A null vector with entries in every row says the equations
are in conflict, which is a different situation with a different remedy.

What the decomposition inspects is the matrix, not the mechanism. Which rows are
independent, and whether the system has a solution at all, are properties of that
matrix.

:::class linear-system

**Deleting a row is only safe when it is the spare one.** Delete a row that carries
information and the model changes silently: the answer is still a number, still
looks plausible, and is the answer to a different question. The decomposition is
what makes the choice visible.

## In three dimensions the legs come apart

Everything above is a statement about the front view. Look from the side, or from
above, and the wishbone's two legs no longer lie on top of each other. They are two
distinct demands on the same point, and the upright's length is a third.

:::figure wishbone-3d

Turn it. In this direction the two legs are visibly separate, and the plate
between them is what makes the triangle rigid. The front view threw that direction
away, which is why its two rows collapsed into one.

That is why the general solver models each wishbone as **one rigid triangle** and
counts the legs once, rather than as two legs with an upright's length bolted on.
The count is a modelling decision, and the decomposition is how you check that
the decision you made was the one you thought you made.

## The front view is an idealisation, and worth a number

One loose end, stated because the chapter's method is to state it. A projection of a
triangle is not a triangle with the same edges: the upper arm in this chapter's front
view is 0.30336 m long, and the two legs of the real wishbone are 0.31875 m and
0.32016 m. The view's single arm is shorter than either leg, by 15 mm and 17 mm,
because the front view flattens the fore-aft splay of the two chassis pivots.

So the front view is an idealisation *of the three-dimensional linkage*, chosen to
match it at the design position and to be simple enough to solve in closed form. The
three-dimensional solver and this chapter's model therefore agree at the design pose.
Elsewhere they drift apart by a fraction of a millimetre. That difference is far below
the question the chapter asks, and exactly the kind a reader should want a number for
rather than an assurance.

## The agreement panel

| Check | Value |
|---|---|
| Singular values of the three-row Jacobian at the design pose | 1.415, 0.998, 0.000 |
| Left null vector | (0.707, −0.707, 0), so the two legs cancel |
| Least squares with all three rows | same point as §1.2, to 10⁻¹⁶ m |
| Direct 2×2 solve with the spare row deleted | the same point again |

The same structure appears in the package's three-dimensional model, which these three
rows are a front-view imitation of. `otkd check
examples/double-wishbone-two-leg` reports **21 unknowns, 22 rows, rank 20,
redundancy 1** — one dependent row, exactly as here. Its diagnosis names the rows
that participate. The three-row model is not a smaller story; it is the same rank story
with fewer numbers to read.

The decomposition is computed by the page's own model at load, and the figure shows it on
every frame. What the section claims is structural: three rows, two unknowns,
one dependent row. The null vector's support is the evidence. A vector with
entries in the two leg rows says those two rows are one. The vendored exports solve
the three-dimensional model, whose unknowns are not these two, so they cannot check
this table. The structure is checked by the arithmetic above and by the pose
comparison at the bottom.

## Pseudocode, and the file it comes from

```python
# svd.py — what a diagnosis has to return to be useful
def diagnose(system, q, rows=None, rtol=1e-9):
    """Which equations are the same equation, and by how much."""
    jac = system.jacobian(q, rows)
    rank, null, sigma = left_null(jac, rtol)
    names = [system.problem.rows[i].name for i in rows or system.constrained]
    dependent = [name for name, w in zip(names, np.max(np.abs(null), axis=1))
                 if w > rtol]
    return Diagnosis(singular_values=sigma, rank=rank,
                     redundancy=len(names) - rank,
                     dependent_rows=dependent, null_space=null)
```

The file is
[`svd.py`](https://github.com/leonpjvaughan/suspension-kinematics/blob/main/src/otkd/solvers/svd.py).
Returning the row names rather than only the singular values is the whole point:
a figure can then say *which* equations are the same, instead of shouting that
something is wrong somewhere.

## You should now be able to

- say what a singular value decomposition of a Jacobian tells you, and what it does
  not
- read a null vector and say which rows cancel
- explain why deleting the spare row leaves the answer unchanged
- say why the three-dimensional model does not have this particular redundancy

## Watch out

The tempting reading — "a zero singular value means the model is over-determined"
— is true here and false as a rule. The zero is guaranteed by the shape of the
matrix, so it appears whether or not the model is redundant. It disappears
from view the moment you write a square system instead.

The other trap is a null vector whose entries are all non-zero. That is not a
duplicate: it is a **conflict**, and least squares is then splitting the difference
between equations that cannot all hold. The remedy is not to delete a row but to
find out which equation is wrong.

## Going further

:::deeper singular-values
