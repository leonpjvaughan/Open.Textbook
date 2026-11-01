---
title: The second unknown
---

# The second unknown

## What this page answers

The class page says a saddle-point problem carries a second unknown, and that
the second unknown pays for a rule that has to hold everywhere. It does not say
what that unknown is, why it is the one that goes wrong, or why an answer can
have the displacements right and the forces wrong.

This closes the consistency row of the measured gaps, and it explains a symptom
the book already lists: a plot that looks correct and a reaction force that does
not.

## The mathematics

Take the smallest possible case. Two displacements $u = (u_1, u_2)$, an energy

$$ \tfrac12 u^{\mathsf T} K u - f^{\mathsf T} u, \qquad K = \begin{pmatrix} 2 &
0 \\ 0 & 3 \end{pmatrix}, \quad f = (1, 1), $$

and one rule that must hold: $u_1 + u_2 = g$. Write the rule as $B u = g$ with
$B = (1\;\;1)$. Minimising the energy subject to the rule means minimising

$$ \tfrac12 u^{\mathsf T} K u - f^{\mathsf T} u + p^{\mathsf T}(B u - g), $$

where $p$ is a new unknown — one per rule. Differentiating in $u$ and in $p$
gives the pair of equations

$$ K u + B^{\mathsf T} p = f, \qquad B u = g, $$

which is the block system

$$ \begin{pmatrix} K & B^{\mathsf T} \\ B & 0 \end{pmatrix} \begin{pmatrix} u \\
p \end{pmatrix} = \begin{pmatrix} f \\ g \end{pmatrix}. $$

The second unknown is not a slack variable or a device. $B^{\mathsf T} p$ is the
force the rule exerts on the structure, so $p$ **is** the reaction force, and
the last row of the block system is the rule itself.

**Why it is the one that goes wrong.** Eliminate $u$ using the first equation,
$u = K^{-1}(f - B^{\mathsf T}p)$, and substitute into the second:

$$ B K^{-1} f - B K^{-1} B^{\mathsf T} p = g. $$

The matrix $S = B K^{-1} B^{\mathsf T}$ is small, one by one here, so

$$ p = S^{-1}\left(B K^{-1} f - g\right). $$

Look at what that computes. The bracket is the difference of two quantities of
order one — the displacement the load would produce, and the displacement the
rule asks for. When the constraint is nearly satisfied by the load alone, those
two are nearly equal and their difference is small. The relative error of $p$ is
therefore the relative error of the inputs multiplied by

$$ \frac{\text{size of} B K^{-1} f}{\text{size of} B K^{-1} f - g}, $$

which is large whenever $p$ is small. Meanwhile $u$ is recovered from
$f - B^T p$, and there $p$ is a small correction to a quantity of order one, so
the same absolute error in $p$ moves $u$ far less.

That is the mechanism behind "right displacements, wrong forces": the
displacement is insensitive to the multiplier, and the multiplier is a
difference of large numbers. It is not an implementation error, and a better
linear solver does not fix it — the sensitivity is in the formulation.

**The check.** Solve the system above with $g = 0.84$. The multiplier is
$p = -0.008$ and the displacements are $(0.504, 0.336)$, whose sum is $0.84$ to
the last digit. Now change the rule to $g = 0.841$: one part in eight hundred.
The displacements move to $(0.5046, 0.3364)$, a relative change of $0.12\%$. The
multiplier moves to $-0.0092$, a relative change of $15\%$. The force is more
than a hundred times more sensitive to the constraint than the displacement is.

Leaving the multiplier out entirely is the other failure, and it is a large one:
$u = K^{-1}f = (0.5, 0.333\ldots)$ misses the rule by $1/6$, seventeen per cent.

## The code

The program solves that system in exact arithmetic for two values of $g$ one
thousandth apart, prints both answers, and prints the two relative changes side
by side. The unconstrained solve is printed first, as the wrong answer the
multiplier exists to correct.

<details markdown="1">
<summary>One solve, two constraints, both sensitivities</summary>

```python
import sympy as sp

K = sp.Matrix([[2, 0], [0, 3]])
B = sp.Matrix([[1, 1]])
f = sp.Matrix([1, 1])


def solve(g):
    """The constrained answer, with the multiplier p recovered last."""
    S = B * K.inv() * B.T
    p = (S.inv() * (B * K.inv() * f - sp.Matrix([g])))[0]
    u = K.inv() * (f - B.T * p)
    return p, u


plain = K.inv() * f
print("no multiplier  u =", list(plain), " gap =", (B * plain)[0] - 1)

for g in (sp.Rational(84, 100), sp.Rational(841, 1000)):
    p, u = solve(g)
    print(f"g = {float(g):.3f}   p = {float(p):+.6f}   "
          f"u = ({float(u[0]):.4f}, {float(u[1]):.4f})")

p1, u1 = solve(sp.Rational(84, 100))
p2, u2 = solve(sp.Rational(841, 1000))
print(f"force moved by  {float(abs(p2 - p1) / abs(p1)):.1%}")
print(f"u moved by      {float(abs(u2[0] - u1[0]) / abs(u1[0])):.2%}")
print("gap after       ", (B * u2)[0] - sp.Rational(841, 1000))
```

```text
no multiplier  u = [1/2, 1/3]  gap = -1/6
g = 0.840   p = -0.008000   u = (0.5040, 0.3360)
g = 0.841   p = -0.009200   u = (0.5046, 0.3364)
force moved by  15.0%
u moved by      0.12%
gap after        0
```

</details>
The two constrained rows both satisfy the rule — the last line prints a gap of
exactly zero — and their multipliers differ by fifteen per cent. A check that
only looked at the displacements would call the first solve right and the second
solve right, and would miss the change in the force entirely.

## The theory

The block system is symmetric and indefinite: it has eigenvalues of both signs,
so it is not a minimisation and the methods built for $K$ alone do not apply.
That is the reason the class exists as a class, and the reason the algorithms
that work on it are different ones.

Three things follow from the algebra above.

- **The multiplier is a force.** A reader who wants the reaction at a support,
  the pressure in a fluid, or the contact force between two bodies is asking for
  $p$. Recovering it is not post-processing; it is half the answer.
- **The conditioning belongs to $S$ .** $S = B K^{-1}B^{\mathsf T}$ is a Schur
  complement, and it is the matrix whose conditioning decides how well $p$ can
  be computed. A badly conditioned $S$ — nearly dependent rules, or a nearly
  incompressible material — makes $p$ worse without touching $u$.
- **A stable formulation is a choice.** Because the sensitivity is in the
  formulation, the fix is a formulation: a mixed method with a stable pair of
  spaces, or a penalty whose parameter is chosen rather than enlarged. Ferziger
  and Perić's treatment of the pressure–velocity coupling is the standard
  account in fluid mechanics, and it is the same problem.

What it will not do: it will not give the displacements and the forces to the
same relative accuracy. They are recovered from the same solve, and they are not
equally sensitive to it.

## What this cost

The block system is larger than $K$: $u$ plus one unknown per rule. Assembling
and solving it directly costs $O((n+m)^3)$ for a dense solve. The sparse version
costs what its factorisation costs, which for an indefinite matrix is more
awkward than for a definite one: pivoting for stability conflicts with
preserving the sparsity.

Eliminating $u$ first and solving $S p = B K^{-1}f - g$ instead costs one solve
with $K$ per column of $B^{\mathsf T}$, plus a solve with $S$. That is cheaper
when there are few rules, which is the common case, and it is also the form that
shows the sensitivity.

What it will not do: it will not tell you that the rules are nearly dependent.
That is a rank deficiency in $B$, and it shows up as an ill-conditioned $S$, not
as a wrong displacement.

## Back to the map

[Saddle point](../index.md) is the class page this works under.
[One matrix, two errors](../../linear-system/conditioning/index.md) is the same
sensitivity argument without the constraint. [Home](../../index.md) is the
summary.
