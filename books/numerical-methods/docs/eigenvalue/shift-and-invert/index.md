---
title: Finding a chosen eigenvalue
---

# Finding a chosen eigenvalue

## What this page answers

The class page says an eigenvalue question asks which values are allowed, and
that the cheap method is to keep multiplying by the matrix. That method always
finds the largest one. This page shows why, and then shows the one-line change
that finds any eigenvalue you name — including the ones a power iteration can
never report.

It closes a gap the symptom index already sends readers to: "the answer I want
is not the biggest one" has a standard fix, and this is it.

## The mathematics

For a matrix $A$ with eigenvalues $|\lambda_1| > |\lambda_2| \ge \dots$, start
from any vector $v_0$ with a component along the first eigenvector and repeat

$$ v_{k+1} = \frac{A v_k}{\|A v_k\|}. $$

Write $v_0 = \sum_i c_i u_i$ in the eigenvectors. Multiplying once gives
$\sum_i c_i \lambda_i u_i$, and multiplying $k$ times gives

$$ A^k v_0 = \lambda_1^k \left( c_1 u_1 + \sum_{i>1} c_i
\left(\frac{\lambda_i}{\lambda_1}\right)^{k} u_i \right). $$

The bracket tends to $c_1 u_1$ because every ratio has magnitude below one, so
the normalised vector tends to $\pm u_1$ and the Rayleigh quotient
$v^{\mathsf T} A v / v^{\mathsf T} v$ tends to $\lambda_1$. The error falls by
$|\lambda_2/\lambda_1|$ per step, which is slow when the two largest eigenvalues
are close and instant when they are not. Nothing in that argument says the
eigenvalue is the largest — only that it is the one the iteration is drawn to.

**The shift.** Pick a number $\sigma$ and apply the same iteration to

$$ B = (A - \sigma I)^{-1}. $$

If $A u = \lambda u$ then $B u = (\lambda - \sigma)^{-1} u$. The eigenvectors
are unchanged and the eigenvalues are replaced by $1/(\lambda - \sigma)$. So the
eigenvalue of $A$ nearest $\sigma$ becomes the eigenvalue of $B$ with the
largest magnitude, and two lines earlier proved that this is the one a power
iteration finds. Recover it with

$$ \lambda = \sigma + \frac{1}{\mu}, $$

where $\mu$ is the eigenvalue of $B$ that the iteration returned.

That is the whole of shift-and-invert. Two details make it usable.

- **The inverse is never formed.** Each step needs one solve of
  $(A - \sigma I) w = v$, which costs what a linear solve costs — the subject of
  the next class page — rather than the $O(n^3)$ of an explicit inverse.
- **The shift decides the rate.** The error now falls by
  $|(\lambda_{\text{target}} - \sigma)/(\lambda_{\text{next}} - \sigma)|$ per
  step. Choosing $\sigma$ close to the wanted eigenvalue makes that ratio small,
  and choosing it exactly on the eigenvalue makes the matrix singular, which is
  the one way this method fails loudly rather than slowly.

**The check.** Take

$$ A = \begin{pmatrix} 2 & 1 & 0 \\ 1 & 3 & 1 \\ 0 & 1 & 4 \end{pmatrix}, $$

whose eigenvalues are $1.26795$, $3$ and $4.73205$. Power iteration returns
$4.7320508$. With $\sigma = 1.5$ the shifted iteration returns $1.2679492$; with
$\sigma = 3.5$ it returns $3.0000000$. The middle eigenvalue is one a power
iteration on $A$ cannot report at all, and it is found in sixty steps once the
shift is right.

## The code

The program builds that matrix, runs sixty power iterations on $A$, then runs
the same iteration on $(A - \sigma I)^{-1}$ for two shifts and converts each
answer back to an eigenvalue of $A$. Sixty steps is enough for all three to
settle at the eight digits printed.

<details markdown="1">
<summary>The matrix, the power iteration and two shifted runs</summary>

```python
import sympy as sp

A = sp.Matrix([[2, 1, 0], [1, 3, 1], [0, 1, 4]])
print("eigenvalues", sorted(sp.N(v, 6) for v in A.eigenvals()))


def power(M, v, n=60):
    v = sp.Matrix(v)
    for _ in range(n):
        w = M * v
        v = w / max(abs(e) for e in w)
    return sp.N((v.dot(M * v)) / (v.dot(v)), 8), v


lam, v = power(A, [1, 1, 1])
print("power iteration found", lam)

for sigma in (sp.Rational(3, 2), sp.Rational(7, 2)):
    B = (A - sigma * sp.eye(3)).inv()
    mu, w = power(B, [1, -1, 1])
    value = sp.N(1 / mu + sigma, 8)
    print(f"shift {float(sigma):.2f}: eigenvalue", value)
```

```text
eigenvalues [1.26795, 3.00000, 4.73205]
power iteration found 4.7320508
shift 1.50: eigenvalue 1.2679492
shift 3.50: eigenvalue 3.0000000
```

</details>
Each shift returns the eigenvalue nearest it, and the two shifted answers are
the two eigenvalues that are not the largest. The first line is the reference:
without it a reader cannot tell a converged answer from a wrong one. The last
line is the one worth staring at, because $3$ is an eigenvalue that a power
iteration on $A$ never approaches — the run is still dominated by $4.73$ after
sixty steps.

## The theory

Three assumptions carry the argument, and each fails in a way worth naming.

- **A gap.** The convergence rate is a ratio of eigenvalues, so it needs a
  strict largest one. If $|\lambda_1| = |\lambda_2|$ — two eigenvalues of
  opposite sign, or a complex conjugate pair — the normalized iterate does not
  settle on a single vector, and the Rayleigh quotient oscillates instead of
  converging.
- **An eigenvalue you can name.** Shift-and-invert needs a $\sigma$, and knowing
  which $\sigma$ to pick is a property of the application rather than of the
  method. The usual route is a rational or polynomial filter, or a shift chosen
  from an approximate eigenvector.
- **A solvable shift.** If $\sigma$ lands on an eigenvalue, $A - \sigma I$ is
  singular and the solve has no unique answer. In exact arithmetic the iteration
  still converges in one step; in floating point the solve is dominated by
  rounding, and the answer is noise.

Sensitivity is where the eigenvalue problem differs from a linear system. An
eigenvalue's condition number is $1/|y^{\mathsf T} x|$ for its left and right
eigenvectors, so a non-symmetric matrix can have an eigenvalue that moves much
further than the entries do. The symmetric case is the well-behaved one, and
Saad's account of the Arnoldi and Lanczos families is where the non-symmetric
version is developed.

What it will not do: it will not find several eigenvalues without a shift for
each, and it will not report the whole spectrum. A block method or a
deflation-based method is the answer to "all of them", and both are more work
than this page.

## What this cost

One matrix-vector product per step for the plain iteration: $O(n^2)$ time and
$O(n)$ memory. The shifted version replaces that product with a linear solve, so
each step costs whatever the solver costs. It is $O(n^3)$ once for a dense
factorisation and $O(n^2)$ per step after that, or $O(n)$ per step for a sparse
solver.

Accuracy is limited by the shift: the closer $\sigma$ is to the wanted
eigenvalue, the faster the convergence and the worse the conditioning of the
solve. Efficient variants update the shift as the estimate improves. That is why
the method is often met under the name *shifted inverse iteration with Rayleigh
quotient shifts*, rather than by the two lines that define it.

What it will not do: it will not find an eigenvalue you cannot name
approximately. It will not separate two eigenvalues that share a magnitude
without a shift. And it will not tell you that a clustered pair is clustered — a
single estimate hides it.

## Back to the map

[Eigenvalues](../index.md) is the class page this works under.
[Error, and what a tolerance is](../../error/index.md) says what the solve
inside each step is accurate to. [Home](../../index.md) is the summary.
