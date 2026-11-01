---
title: Why Newton is fast, and when it is not
---

# Why Newton is fast, and when it is not

## What this page answers

The class page says a root-finding problem is a rule that has to hold at a
point, and that Newton's method uses the rule's own slope to get there. It does
not say how fast that is, or what a root with a double slope does to the speed.
This page derives the rate, measures it against a prediction, and shows the one
case where the rate falls from quadratic to linear.

It closes the Richardson row of the measured gaps: an observed order is a
measurement, and this page makes it one.

## The mathematics

Newton's method from a current guess $x_k$ takes the tangent line at $x_k$ and
uses its root:

$$ x_{k+1} = x_k - \frac{f(x_k)}{f'(x_k)}. $$

Let $x^{*}$ be a root and $e_k = x_k - x^{*}$ the error. Expand $f$ about $x_k$
and evaluate at the root, where $f(x^{*}) = 0$:

$$ 0 = f(x^{*}) = f(x_k) + f'(x_k)(x^{*} - x_k) + \tfrac12 f''(\xi)(x^{*} -
x_k)^2
$$

for some $\xi$ between $x_k$ and $x^{*}$, by Taylor's theorem with the remainder.
The first two terms are exactly what Newton's step removes:
$f(x_k) + f'(x_k)(x^{*} - x_k) = f'(x_k)(x^{*} - x_{k+1})$. Substituting that and
dividing by $f'(x_k)$ gives

$$ x^{*} - x_{k+1} = \frac{f''(\xi)}{2 f'(x_k)} (x^{*} - x_k)^2, $$

which in the error's own notation is

$$ e_{k+1} = \frac{f''(\xi)}{2 f'(x_k)}\, e_k^2. $$

That is the whole result. The new error is the old error **squared**, times a
factor that settles down near the root: at the root the factor is
$f''(x^{*})/(2f'(x^{*}))$, a fixed number for a given problem. Squaring is what
makes the method fast — an error of $10^{-3}$ becomes $10^{-6}$, then $10^{-12}$
— and it is also what makes the step size useless as an error estimate until the
run is close.

**When the slope vanishes.** If $x^{*}$ is a root of multiplicity $m > 1$, then
$f(x) = (x - x^{*})^m g(x)$ with $g(x^{*}) \ne 0$, and near the root $f'(x)$ is
small in a particular way. Substituting the two expansions gives

$$ e_{k+1} \approx \frac{m - 1}{m}\, e_k, $$

so the error is multiplied by a constant below one instead of being squared. For
a double root the constant is $1/2$: every step halves the error, which is
linear convergence, and the number of correct digits grows by about $0.3$ per
step rather than doubling. The method still converges; it stops being fast, and
a run that looks like it has stalled is usually one that has found a double
root.

**The check.** Take $f(x) = x^2 - 2$ from $x_0 = 1$, whose root is
$\sqrt2 = 1.41421356\ldots$, and predict the ratio $e_{k+1}/e_k^2$ from the
formula: $f'' = 2$ and $f'(x^{*}) = 2\sqrt2$, so the predicted ratio is
$1/(2\sqrt2) = 0.35355$. The measured ratios in the program below are $0.333$,
$0.353$, $0.354$, $0.354$ — converging to the prediction from below. That is what the theorem says: the factor is evaluated at an intermediate point, which is still approaching the root on the early steps.

For the double root, $f(x) = x^2$ at $x^{*} = 0$, the prediction is $1/2$ per
step, and the measured ratio is $0.500$ on every step, with no sign of
improving.

## The code

The program runs five Newton steps on each function in forty-digit arithmetic
and prints the error after each one, with the ratio that decides the order. Both
runs start at $1$.

<details markdown="1">
<summary>Five steps on a simple root and on a double root</summary>

```python
import sympy as sp

x = sp.symbols("x")


def newton(f, x0, n=5):
    d = sp.diff(f, x)
    p = sp.N(x0, 40)
    rows = []
    for _ in range(n):
        p = sp.N(p - f.subs(x, p) / d.subs(x, p), 40)
        rows.append(p)
    return rows


print("f = x^2 - 2, root sqrt(2) =", sp.N(sp.sqrt(2), 8))
prev = None
for p in newton(x**2 - 2, 1):
    e = abs(p - sp.sqrt(2))
    ratio = sp.N(e / prev**2, 3) if prev else 0
    row = f"  x {sp.N(p, 12):>14}  error {sp.N(e, 3):>10}"
    print(f"{row}  e/prev^2 {ratio}")
    prev = e

print("f = x^2, double root at 0")
prev = None
for p in newton(x**2, 1):
    e = abs(p)
    ratio = sp.N(e / prev, 3) if prev else 0
    row = f"  x {sp.N(p, 12):>14}  error {sp.N(e, 3):>10}"
    print(f"{row}  e/prev {ratio}")
    prev = e
```

```text
f = x^2 - 2, root sqrt(2) = 1.4142136
  x  1.50000000000  error     0.0858  e/prev^2 0
  x  1.41666666667  error    0.00245  e/prev^2 0.333
  x  1.41421568627  error 0.00000212  e/prev^2 0.353
  x  1.41421356237  error   1.59E-12  e/prev^2 0.354
  x  1.41421356237  error   8.99E-25  e/prev^2 0.354
f = x^2, double root at 0
  x 0.500000000000  error      0.500  e/prev 0
  x 0.250000000000  error      0.250  e/prev 0.500
  x 0.125000000000  error      0.125  e/prev 0.500
  x 0.0625000000000  error     0.0625  e/prev 0.500
  x 0.0312500000000  error     0.0313  e/prev 0.500
```

</details>
Read the first table's error column as digits, not as numbers: each entry has
about twice as many correct digits as the one above it. That is what a constant
ratio of $e^2$ looks like. The second table's error column has the same number
of digits gaining one at a time, which is what a constant ratio of $e$ looks like. The ratio column says $0.500$ five times.

The final row of the first table is the limit of the method rather than of the analysis. The error is $10^{-25}$ because forty digits are being carried, and
the next step gains none.

## The theory

Newton's method is the fixed-point iteration $x_{k+1} = \Phi(x_k)$ with
$\Phi(x) = x - f(x)/f'(x)$, and the derivative of $\Phi$ at the root is zero
when $f'(x^{*}) \ne 0$: that is the same statement as the squared error. Three
assumptions carry it.

- **A simple root.** $f'(x^{*}) \ne 0$. The multiplicity argument above is what
  happens when this fails, and it is a change of order rather than a failure to
  converge.
- **Smoothness.** The remainder term needs $f''$ to exist near the root. A
  function with a kink at the root breaks the argument, and the iteration can
  cycle.
- **A start close enough.** The theorem is local. Far from the root the factor
  $f''/(2f')$ can be large, and the step can jump past the root or to another
  one. A run that oscillates between two values is starting badly, not
  converging slowly.

Two practical consequences follow, and both are about the stopping rule rather
than the rate. First, the step size is not the error: $|x_{k+1} - x_k|$ is
$|e_k|$ when the convergence is linear, and about $|e_k|$ too on the last
quadratic step, but before that it is a poor proxy. Second, the achievable
accuracy is limited by the accuracy of $f'$: a derivative with a relative error
$\delta$ leaves an error of about $\sqrt{\delta}$ in the root. The iteration is solving an equation that is itself slightly wrong. That square root
is the reason a numerical derivative caps the accuracy of Newton's method
regardless of how many digits are carried.

The order of convergence and its measurement are the subject of
[Convergence, and how to measure it](../../order/index.md); the standard
derivation is Wright's, in *Numerical Optimization*.

What it will not do: it will not work without a derivative. It will not recover quadratic convergence at a double root without being told the multiplicity. The modified step $x_{k+1} = x_k - m f(x_k)/f'(x_k)$ restores it
when $m$ is known, and guessing $m$ is a different problem.

## What this cost

Each step costs one evaluation of $f$ and one of $f'$. In one variable that is
negligible and the method is limited by how fast the error squares. In $n$
variables, $f'$ is a Jacobian and the step solves a linear system. A step then
costs $O(n^3)$ once and $O(n^2)$ per step after a factorisation. That is why the
rate matters so much in several variables: each step is expensive, and quadratic
convergence means about $\log_2$ of the digits wanted rather than one step per
digit.

What it will not do: it will not certify the root. It will not find a root it
did not start near. And at a multiple root it will not tell you that is what
happened unless you watch the ratio in the table above.

## Back to the map

[Root finding](../index.md) is the class page this works under.
[Convergence, and how to measure it](../../order/index.md) is how an observed
order is measured when the ratio is not a constant. [Home](../../index.md) is
the summary.
