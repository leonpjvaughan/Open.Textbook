---
title: A step has a direction and a length
---

# A step has a direction and a length

## What this page answers

The class page says optimisation is one score over a set of choices, and that a
gradient points at the steepest way up. It does not say how far to walk. This
page separates the two decisions, shows why the gradient alone cannot answer the
second, and derives the window a fixed step has to sit in.

It settles the line-search row of the measured gaps: a reader can say why a step
length is a separate question, and can compute the window for a quadratic.

## The mathematics

Write the score as a quadratic in $n$ variables,

$$ f(x) = \tfrac12 x^{\mathsf T} A x - b^{\mathsf T} x, $$

with $A$ symmetric and positive definite, so the minimum is where $A x = b$.
Gradient descent takes

$$ x_{k+1} = x_k - t\,\nabla f(x_k), \qquad \nabla f(x) = A x - b. $$

Let $e_k = x_k - x^{*}$ be the error, where $x^{*}$ solves $A x = b$.
Subtracting the fixed point from the step gives the error's own rule:

$$ e_{k+1} = e_k - t A e_k = (I - tA)\, e_k. $$

That line is the whole analysis: the error is multiplied by the same matrix
every step, so its behaviour is decided by the eigenvalues of $I - tA$. If $A$
has eigenvalues $\lambda_i$, the error along eigenvector $i$ is multiplied by
$1 - t\lambda_i$ each step. It decays only if

$$ |1 - t\lambda_i| < 1 \quad\text{for every} i, $$

which is the window

$$ 0 < t < \frac{2}{\lambda_{\max}}. $$

So the largest curvature sets an upper limit, and the smallest sets the speed:
the slowest mode decays by the factor $1 - t\lambda_{\min}$ per step, so
reaching a relative error $\varepsilon$ needs about

$$ k \approx \frac{\log(1/\varepsilon)}{t\,\lambda_{\min}} $$

steps. The ratio $\lambda_{\max}/\lambda_{\min}$ is the condition number of $A$,
the same number the linear-system pages use. A well-conditioned quadratic
converges quickly at the best step; a badly conditioned one crawls, or
oscillates, because the step that suits the largest curvature is far too short
for the smallest.

**The step length, chosen rather than fixed.** Along the direction
$g = \nabla f(x)$, the best distance is the $t$ that minimises $f(x - tg)$. For
a quadratic that is a one-line calculation: differentiating $f(x - tg)$ in $t$
and setting it to zero gives

$$ t = \frac{g^{\mathsf T} g}{g^{\mathsf T} A g}. $$

With that $t$, one step lands on the minimum of $f$ along $g$. It does not find
the minimum of $f$, because the next gradient points somewhere new — but it
removes the only question the gradient could not answer.

**The check.** Take $A = \operatorname{diag}(10, 2)$, so $\lambda_{\max} = 10$
and the window is $0 < t < 0.2$, and start at $(1,1)$. At $t = 0.19$ both modes
decay and the run reaches $f < 10^{-5}$. At $t = 0.25$ the first mode is
multiplied by $1 - 0.25 \times 10 = -1.5$ every step, so the run explodes. At
$t = 0.05$ it converges, but the slow mode decays by $0.9$ per step, which is
the slow crawl. The exact step reaches the minimum in one iteration.

## The code

The program runs four fixed steps and one exact line search on that quadratic
and prints the final point and score. Sixty iterations is long enough to
separate converged from diverged.

<details markdown="1">
<summary>Four fixed steps and one exact line search</summary>

```python
import sympy as sp

x, y = sp.symbols("x y")
f = 5 * x**2 + y**2
gx, gy = sp.diff(f, x), sp.diff(f, y)
start = (1.0, 1.0)


def fixed(step, n=60):
    px, py = start
    for _ in range(n):
        g = (float(gx.subs({x: px, y: py})),
             float(gy.subs({x: px, y: py})))
        px, py = px - step * g[0], py - step * g[1]
    return px, py


def exact(n=60):
    px, py = start
    for _ in range(n):
        a = float(gx.subs({x: px, y: py}))
        b = float(gy.subs({x: px, y: py}))
        step = (a * a + b * b) / (10 * a * a + 2 * b * b)
        px, py = px - step * a, py - step * b
    return px, py


print("step   x            y            f")
for s in (0.05, 0.19, 0.25, 0.45):
    px, py = fixed(s)
    print(f"{s:>4}  {px:>11.3e}  {py:>11.3e}  {5*px*px + py*py:>11.3e}")
px, py = exact()
print(f"exact {px:>11.3e}  {py:>11.3e}  {5*px*px + py*py:>11.3e}")
```

```text
step   x            y            f
0.05    8.674e-19    1.797e-03    3.229e-06
0.19    1.797e-03    3.495e-13    1.615e-05
0.25    3.677e+10    8.674e-19    6.760e+21
0.45    4.406e+32    1.000e-60    9.708e+65
exact   5.458e-30    5.458e-30    1.787e-58
```

</details>
The first two rows are inside the window and the last two are outside it, which
is the window's shape rather than a coincidence: $0.19 < 0.2 < 0.25$. Read the
two converged rows against each other and the second decision appears. At
$t = 0.05$ the $y$ component is still $1.8 \times 10^{-3}$ after sixty steps,
because its curvature is $2$ and it decays by $0.9$ a step; the $x$ component,
with curvature $10$, is already gone. At $t = 0.19$ the order reverses: $y$ has
vanished and $x$ is the one left over, oscillating as $(-0.9)^k$. One step
length cannot be right for both directions, and that is the whole reason a line
search exists.

The exact row reaches $10^{-30}$ and stops, which is the point at which the
arithmetic runs out rather than the method.

## The theory

The analysis assumed three things, and each one is where a real problem differs.

- **A quadratic.** The error rule $e_{k+1} = (I - tA)e_k$ is exact only for a
  quadratic. For a general $f$ it is the linearisation about the minimum, so the
  window is a statement about the Hessian near the answer — which is the region
  a run only reaches if the early steps were safe.
- **A known largest curvature.** $\lambda_{\max}$ is not known in advance for a
  real score. A step chosen from a bound on the Hessian is a step chosen from a
  guess, and too large a guess diverges.
- **Exact arithmetic.** The divergence at $t = 0.45$ grows by a factor of about
  eight a step, so it reaches the floating-point ceiling in a few dozen steps
  and then overflows. Before that it is a real, finite, wrong answer, which is
  why a diverging run looks plausible for a while.

What the gradient cannot supply is curvature. It gives the direction of steepest
increase at the point, and nothing about how that direction changes as you move
along it. A method that uses only gradients is therefore choosing a length from
information it does not have. There are two ways out. One is to measure the
curvature, which is Newton's method and needs a Hessian and a solve. The other
is to measure the score along the line, which is a line search. The trade is
that Newton needs a Hessian and a linear solve per step, and a line search needs
one or more extra score evaluations per step.

The account of line search and of the conditions a step must satisfy is
Wright's, in *Numerical Optimization*; the convergence argument above is the
quadratic case of the same theorem.

What it will not do: a line search makes a step safe, and does not make the
method fast on a badly conditioned problem. It fixes the length, not the
direction, and on an ill-conditioned quadratic the direction is still the slow
part.

## What this cost

One gradient per iteration, at $O(n)$ for a score written as a formula, and the
analysis above costs one $O(n^2)$ matrix that a real problem never forms. Memory
is $O(n)$. An exact line search costs one extra score evaluation per step for a
quadratic, and several for a general $f$, where the minimisation along the line
is itself iterative.

The accuracy is limited by the condition number: the iteration count grows with
$\lambda_{\max}/\lambda_{\min}$, so a hundredfold worse conditioned problem
costs about a hundredfold more steps. The step length is the cheapest thing to
fix and the least valuable: it stops the run failing, and it does not stop it
crawling.

What it will not do: it will not choose the direction. It will not work without
a bound on the curvature. And it will not tell you that a small final gradient
means a small error — on a flat valley a small gradient and a large error look
the same.

## Back to the map

[Optimisation](../index.md) is the class page this works under.
[Convergence, and how to measure it](../../order/index.md) is how the rate is
measured when it is not a quadratic. [Home](../../index.md) is the summary.
