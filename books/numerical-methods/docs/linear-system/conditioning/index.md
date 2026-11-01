---
title: One matrix, two errors
---

# One matrix, two errors

## What this page answers

The spine page says a residual is not an error, and that a condition number
turns one into the other. This page does that arithmetic on one small matrix,
where every quantity can be written down exactly, so the difference between the
two errors is a number rather than a warning.

It closes the round-off row of the measured gaps. A reader can compute a
condition number, compute both errors on the same solve, and say which of the
two the algorithm is responsible for.

## The mathematics

Let $A x = b$ have the exact solution $x$, and let a computed $\hat x$ be what
an algorithm returned. Two quantities measure how wrong it is, and they are not
the same quantity.

The **residual** is what is left when $\hat x$ is put back into the equation:

$$ r = b - A\hat x. $$

It is computable without knowing $x$, which is why every solver reports
something built from it. The **error** is $x - \hat x$, which needs $x$ and
therefore cannot be computed at all in a real problem.

The two are related by the matrix alone. Subtract $A\hat x = b - r$ from
$A x = b$:

$$ A(x - \hat x) = r \quad\Longrightarrow\quad x - \hat x = A^{-1} r. $$

Taking norms gives an inequality in each direction:

$$ \|x - \hat x\| \le \|A^{-1}\| \, \|r\|, \qquad \|r\| = \|A(x - \hat x)\| \le
\|A\| \, \|x - \hat x\|. $$

Divide the first by $\|x\|$ and the second by $\|b\|$, and use
$\|b\| \le \|A\|\|x\|$ to bound $\|x\|$ from below. The two combine into

$$ \frac{\|x - \hat x\|}{\|x\|} \le \underbrace{\|A\|\,\|A^{-1}\|}_{\kappa(A)}
\cdot \frac{\|r\|}{\|b\|}. $$

Read it as a sentence: **the forward error is at most the condition number times
the backward error.** The second factor is the algorithm's business — a stable
solver makes it about $\epsilon$, the size of rounding — and the first is the
problem's, and no algorithm changes it. That is the entire content of "the
residual is small but the answer is wrong". A small backward error multiplied by
a large $\kappa$ is a large forward error, and the multiplication is not a
defect in the solver.

The bound is tight, in the sense that a right-hand side can be chosen to attain
it, so it is not a loose comfort. Which also means the inequality is only useful
when $\kappa$ is known, and $\kappa$ needs $\|A^{-1}\|$, which needs a solve.

**The check.** Take

$$ A = \begin{pmatrix} 1 & 1000 \\ 0 & 1 \end{pmatrix}, \qquad b =
\begin{pmatrix} 1000 \\ 1 \end{pmatrix}. $$

The exact solution is $x = (0, 1)$. Now change the second entry of $b$ by
$10^{-3}$ — one part in a thousand — and solve again. The new solution is
$(-1, 1.001)$, because the first row is $x_1 + 1000x_2 = 1000$ and a change of
$10^{-3}$ in $x_2$ is a change of $1$ in $x_1$. So the forward error is $1$,
against a solution of size $1$: a hundred per cent.

The residual of that answer, measured against the *original* $b$, is
$(0, 10^{-3})$ — a backward error of one part in a million of $\|b\| = 1000$.
Both statements are true at once. The condition number is
$\|A\|_\infty \|A^{-1}\|_\infty = 1001 \times 1001 = 1002001$, and the bound
predicts a forward error of at most $1002001 \times 10^{-6} \approx 1.002$,
which is what happened.

## The code

The program does that experiment in exact arithmetic, so the fractions printed
are the true values and not rounded ones. It prints both solutions, both errors
and the bound.

<details markdown="1">
<summary>The two-by-two system, its perturbation and the bound</summary>

```python
import sympy as sp

A = sp.Matrix([[1, 1000], [0, 1]])
b = sp.Matrix([1000, 1])
x = A.solve(b)
db = sp.Matrix([0, sp.Rational(1, 1000)])
xp = A.solve(b + db)
forward = max(abs(xp[i] - x[i]) for i in range(2))
backward = max(abs(e) for e in (A * xp - b))
cond = A.norm(ord=sp.oo) * A.inv().norm(ord=sp.oo)
print("A            ", A.tolist())
print("solution     ", x.T.tolist())
print("after db     ", xp.T.tolist())
print("forward error", forward)
print("residual     ", (A * xp - b).T.tolist())
print("backward err ", backward)
print("condition    ", cond)
print("bound        ", cond * sp.Rational(1, 1000) / 1000)
```

```text
A             [[1, 1000], [0, 1]]
solution      [[0, 1]]
after db      [[-1, 1001/1000]]
forward error 1
residual      [[0, 1/1000]]
backward err  1/1000
condition     1002001
bound         1002001/1000000
```

</details>
The forward error is $1$ and the backward error is $10^{-3}$, on the same solve.
A reader who checked only the residual would report a fine answer, because by
the residual's own measure it is fine: the computed $\hat x$ nearly satisfies
the equation. It is the equation that is unforgiving, and $\kappa = 10^6$ is the
number that says so before any solve is attempted.

## The theory

The bound is exact, and three things decide whether it is useful.

- **The norm.** $\kappa$ depends on which norm measures the error. The infinity
  norm above is the row-sum norm, and it is the natural one here because the
  perturbation was one entry of one row. A condition number quoted without its
  norm is a number without a meaning.
- **The perturbation.** Above, $b$ moved and $A$ did not. If $A$ is perturbed by
  a relative amount $\delta$, the forward error is bounded by
  $\kappa \delta/(1 - \kappa \delta)$, which blows up as $\kappa \delta$
  approaches one. A matrix can be so ill-conditioned that its own rounding
  destroys the answer, and then the right move is a different formulation, not a
  better solver.
- **The measure of the answer.** A forward error of $1$ on a solution of size
  $1$ is total loss; the same absolute error on a solution of size $10^{12}$ is
  nothing. Relative error is the quantity the bound is about, and it is the one
  to report.

Where the backward error comes from is the algorithm's structure. A Gaussian
elimination with partial pivoting has a backward error bounded by a modest
factor times $\epsilon$, and that bound is a theorem about the pivoting. It is
not a property of the matrix. Higham's *Accuracy and Stability of Numerical
Algorithms* is the standard account, and Trefethen and Bau's lectures give the
same argument in the language this page uses.

What it will not do: knowing $\kappa$ does not tell you the error of a
particular solve. It tells you the worst case, and it tells you the multiplier
that stands between the two errors. That is enough to decide whether to trust a
number, and not enough to replace the number.

## What this cost

Computing $\kappa$ needs a norm of $A$ and a norm of $A^{-1}$. The second needs
either a solve or a factorisation, so a condition estimate costs about one extra
solve of the same system. Practical codes estimate $\kappa$ from the
factorisation already computed, which costs far less than an exact value and is
enough to say "six digits" or "none".

The accuracy a solve can offer is about $\epsilon\,\kappa$ in relative terms, so
a $\kappa$ of $10^{6}$ leaves ten of the sixteen digits, and a $\kappa$ of
$10^{16}$ leaves none. That is a property of the problem and not of the
hardware, which is why the same matrix on a better machine is still a bad
matrix.

What it will not do: it will not improve the answer, and it will not detect a
perturbation in $A$ rather than in $b$ — the bound above assumed $b$ moved. It
says how much of the error the problem owns, which is the question to settle
before spending effort on the solver.

## Back to the map

[Linear system](../index.md) is the class page this works under.
[Error, and what a tolerance is](../../error/index.md) is the spine page this
works out, in general. [Home](../../index.md) is the summary.
