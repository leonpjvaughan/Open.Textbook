---
title: Error, and what a tolerance is
---
# Error, and what a tolerance is

## What this page answers

Every class page says what a method costs and when it fails. This page says what
the number it returns is worth: how far it can be from the answer, where that
distance came from, and how to choose a tolerance that means something.

It settles the question the symptom table raises four times. A page that says
"ill-conditioned" has told you the problem, not the size of it. The size is a
number, and this page computes it.

## The mathematics

Write the answer as $x$ and the number a computer returns as $\hat x$. The
error is $\hat x - x$. An error on its own is not a verdict, because the same
absolute error is large for $10^{-8}$ and tiny for $10^{8}$. The useful measure
is **relative error**:

$$ \text{relative error} = \frac{|\hat x - x|}{|x|}. $$

A double stores about 16 decimal digits. The gap between $1$ and the next double
is $2^{-52} \approx 2.22 \times 10^{-16}$. Call it $\epsilon$, the **machine
epsilon**. No operation on doubles can promise more than about $\epsilon$
relative accuracy, and a chain of $n$ operations can lose a factor of $n$ on top
of that.

### Cancellation

Some of the loss is not the arithmetic. It is the question. Compute
$\sqrt{1+x}-1$ for $x=10^{-16}$. The true value is about $5 \times 10^{-17}$,
but $\sqrt{1+x}$ rounds to $1$ in double precision, and the subtraction returns
$0$. The two operands were each accurate; their difference was not.

The fix is algebra, not precision. Multiply by the conjugate:

$$ \sqrt{1+x}-1 = \frac{x}{\sqrt{1+x}+1}. $$

The right side is a quotient of two numbers of size $1$, so it keeps its
digits. A formula that subtracts nearly equal numbers is the defect; the same
formula rewritten is not.

### Conditioning

Some problems amplify an input error whoever solves them. Write the problem as a
function $f$ and perturb $x$ by a relative amount $\delta$. The **condition
number** is the factor by which the relative error grows:

$$ \kappa(x) = \left| \frac{x f'(x)}{f(x)} \right|. $$

For $f(x)=e^x$, $\kappa(x)=x$. At $x=10$, a relative error of $10^{-16}$ in
the input becomes about $10^{-15}$ in the answer. That is the problem's
arithmetic, not the method's.

For a linear system $Ax=b$, the same idea is

$$ \kappa(A) = \|A\|\,\|A^{-1}\|, $$

and it bounds the answer's error in terms of the **residual** $r=b-A\hat x$:

$$ \frac{\|\hat x-x\|}{\|x\|} \le \kappa(A)\,\frac{\|r\|}{\|b\|}. $$

The residual is computable. The error is not. The condition number is what turns
one into a bound on the other.

### Forward and backward error

A **backward-stable** method returns the exact answer to a nearby question:
there is a small perturbation of the data for which $\hat x$ is exact. The size
of that perturbation is the **backward error**. The forward error, $\hat x-x$,
is then roughly the backward error multiplied by the condition number.

This splits the blame correctly. A large forward error is either a large
backward error (an unstable method) or a large condition number (a hard
problem). A method cannot fix the second.

### Choosing a tolerance

A stopping rule such as $|x_{k+1}-x_k| < \tau$ bounds the **step**, not the
error. For bisection the step is a bracket, so it does bound the error. For
Newton's method the step is a good estimate only once the iteration is
converging quadratically; before that it can be optimistic by orders of
magnitude.

A tolerance therefore needs three things: a **norm** (what is being measured), a
**scale** (absolute or relative), and a **reason** (what the step tells you
about the error). "Solve to $10^{-8}$" without them is a number with no units.

**The check.** For $x=10^{-16}$, the direct $\sqrt{1+x}-1$ returns $0$ in double
precision and the conjugate form returns about $5 \times 10^{-17}$. The gap is
total, and it is a fact about the formula rather than the machine.

## The code

The program prints the machine epsilon, the two routes to $\sqrt{1+x}-1$, and
the condition number of $e^x$ at two points.

```python
import math
import sys

eps = sys.float_info.epsilon
print(f"machine epsilon          {eps:.3e}")

x = 1e-16
direct = math.sqrt(1.0 + x) - 1.0
stable = x / (math.sqrt(1.0 + x) + 1.0)
print(f"direct sqrt(1+x)-1       {direct:.3e}")
print(f"stable x/(sqrt(1+x)+1)   {stable:.3e}")
print(f"relative error of direct {abs(direct - stable) / stable:.1f}")

for value in (1.0, 10.0):
    print(f"condition number of exp at {value:>4}: {value:>4.1f}")
```

```text
machine epsilon          2.220e-16
direct sqrt(1+x)-1       0.000e+00
stable x/(sqrt(1+x)+1)   5.000e-17
relative error of direct 1.0
condition number of exp at  1.0:  1.0
condition number of exp at 10.0: 10.0
```

The first two lines are the whole argument. The direct formula is not less exact
because the computer is bad at square roots. It is less exact because it throws
away the information it had computed.

## The theory

The model is the standard floating-point one: every operation returns the exact
result rounded to the nearest double, with relative error at most $\epsilon/2$.
Under that model, addition, subtraction, multiplication and division are all
backward stable, and a sum of $n$ terms has a backward error of order
$n\epsilon$. The factor $n$ is why a long accumulation needs a compensated sum.

The condition number is a property of the problem, not of the algorithm. A
well-conditioned problem solved by a stable method has a small forward error; an
ill-conditioned problem can have a large one even when the method is perfect.
The distinction matters when a result looks wrong: change the method first, and
if the answer is unchanged, the problem is what is hard.

The bound above is worst-case, and it is often loose by orders of magnitude.
That is not a reason to ignore it. It is the only bound available before the
answer is known, and a factor of $10^6$ between residual and error is exactly
what the next section demonstrates.

The tolerance rule that follows: choose a norm that matches the question, ask
for a relative accuracy, and state which quantity the stopping rule bounds. When
the method is quadratically convergent, the step is a good proxy for the error.
When it is not, the step is a number that happens to be small.

## What this cost

Nothing beyond one pass over the data for a residual, and one solve for a
condition number if it is computed directly. The direct condition number costs a
factorisation, which is the same order as the solve. Iterative estimates are
cheaper and approximate.

The accuracy is bounded by $\epsilon$ times the condition number. That product
is the one number to remember. Doubling the precision buys one more digit, and a
problem whose condition number is $10^{12}$ has no digits left in double
precision whatever method is used.

What it will not do: it will not tell you the error. It gives a bound, and the
bound is only as good as the norm and the condition number you put into it.

## Back to the map

[Home](../index.md) is the summary this page works under.
[Convergence, and how to measure it](../order/index.md) is the companion: this
page says how large an error can be, and that page says how fast it shrinks.
[Knowing the answer is right](../checking/index.md) turns the residual into
evidence.
