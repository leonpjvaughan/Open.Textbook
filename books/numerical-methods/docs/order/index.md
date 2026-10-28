---
title: Convergence, and how to measure it
---
# Convergence, and how to measure it

## What this page answers

The class pages say a method converges. This page says how fast, and how to
measure the rate when the answer is the thing you do not have. It settles the
question a tolerance asks: if the step is halved, how much smaller does the
error become?

A rate is a promise about the shape of the error, not a promise that the error
is small. The difference matters before the asymptotic regime, where most real
computations start.

## The mathematics

Write the error after a step of size $h$ as

$$ E(h) = C h^p + O(h^{p+1}). $$

The number $p$ is the **order** of the method, and $C$ is a constant that
depends on the problem but not on $h$ . Halve the step and the leading term
falls by $2^p$ : first order by 2, second order by 4, fourth order by 16.

That gives the **observed order**. With errors at $h$ and $h/2$ ,

$$ p \approx \log_2 \frac{E(h)}{E(h/2)}. $$

When the exact answer is unknown, the errors are unknown too. But the same
argument works on three approximations. If $f_h$ is the computed value at step
$h$ , then $f_h - f_{h/2}$ has the same leading behaviour as $E(h)$ , so

$$ p \approx \log_2 \frac{|f_h - f_{h/2}|}{|f_{h/2} - f_{h/4}|}. $$

This is the **Richardson** estimate. It needs no exact answer, only three runs,
and it is the reason a convergence table is evidence rather than decoration.

The same three values give an **extrapolated** answer. If the leading error is
$C h^p$ , then

$$ f_0 \approx f_{h/2} + \frac{f_{h/2} - f_h}{2^p - 1} $$

removes it, leaving the next term. Repeated extrapolation is the idea behind
Romberg integration and behind the deferred-correction schemes in a solver.

### What a rate does not promise

An order is an asymptotic statement. At large $h$ the $O(h^{p+1})$ term can
dominate, and the observed order can be anything. A method can be second order
on a smooth solution and first order on a solution with a kink, because the
expansion it assumes does not exist. And once $E(h)$ reaches the round-off
floor, halving $h$ makes the error larger, not smaller.

So a convergence table has three regions: pre-asymptotic, where the order is
noise; asymptotic, where it is the method's order; and round-off, where it turns
over. Reading the table means knowing which region you are in.

**The check.** For $f(x)=e^x$ at $x=1$ , the forward difference has order 1 and
the central difference order 2. The table below shows observed orders of 1.05
and 2.00 at $h=0.1$ , which is the arithmetic the page claims.

## The code

The program computes both differences for four step sizes and prints the error
and the observed order at each.

```python
import math

x0 = 1.0
exact = math.exp(x0)

def forward(h):
    return (math.exp(x0 + h) - math.exp(x0)) / h

def central(h):
    return (math.exp(x0 + h) - math.exp(x0 - h)) / (2 * h)

print("h        forward error   order   central error   order")
previous = {"forward": None, "central": None}
for k in range(4):
    h = 0.2 / 2**k
    row = [f"{h:.5f}"]
    for name, method in (("forward", forward), ("central", central)):
        error = abs(method(h) - exact)
        if previous[name] is None:
            order = ""
        else:
            order = f"{math.log2(previous[name] / error):.2f}"
        previous[name] = error
        row += [f"{error:.3e}", f"{order:>6}"]
    print("  ".join(row))
```

```text
h        forward error   order   central error   order
0.20000  2.909e-01          1.816e-02        
0.10000  1.406e-01    1.05  4.533e-03    2.00
0.05000  6.910e-02    1.02  1.133e-03    2.00
0.02500  3.426e-02    1.01  2.832e-04    2.00
```

The forward column approaches 1 and the central column sits at 2. The first
forward estimate is 1.05 rather than 1.00 because $h=0.1$ is not yet small
enough for the $h^2$ term to be negligible. That is the pre-asymptotic region,
visible in one row.

## The theory

The expansion exists when the function has enough continuous derivatives. For a
forward difference the Taylor series gives

$$ \frac{f(x+h)-f(x)}{h} = f'(x) + \frac{h}{2}f''(x) + O(h^2), $$

so $p=1$ and $C=f''(x)/2$ . For the central difference the $h$ terms cancel and
the leading error is $-h^2 f'''(x)/6$ , so $p=2$ .

Richardson extrapolation assumes the same expansion and a known $p$ . If the
observed order is not stable across two refinements, the assumption is wrong and
the extrapolated value is not more accurate. The check is cheap: compare the
observed order before and after the extrapolation.

Round-off enters as a second term with the opposite slope. The difference
quotient divides by $h$ , so an absolute error $\epsilon$ in each value becomes
$\epsilon/h$ in the result. The total error is roughly $C h^p + \epsilon/h$ ,
which has a minimum at $h \sim \epsilon^{1/(p+1)}$ . Making $h$ smaller than
that makes the answer worse. The turnover is not a bug in the method; it is the
arithmetic of subtraction.

The sources for the rate and its verification are in `sources.yaml`. Roache's
*Verification and Validation in Computational Science and Engineering* is the
reference for the convergence table as evidence. LeVeque's *Finite Difference
Methods for Ordinary and Partial Differential Equations* gives the expansions.

## What this cost

One run per step size, so a three-grid table costs three solves. Richardson
extrapolation needs no extra solve and gains one order when its assumptions
hold. The observed order costs one extra run beyond the two values a reader
would already have.

What it will not do: it will not validate the model, and it will not detect a
wrong equation. A method can converge beautifully to the wrong answer. That is
the next page's subject.

## Back to the map

[Home](../index.md) is the summary this page works under.
[Error, and what a tolerance is](../error/index.md) says how large the error is;
this page says how fast it shrinks.
[Knowing the answer is right](../checking/index.md) turns the rate into evidence
about a model rather than only about a step size.
