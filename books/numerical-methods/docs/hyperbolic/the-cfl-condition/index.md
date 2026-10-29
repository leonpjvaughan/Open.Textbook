---
title: The condition a wave equation imposes
---

# The condition a wave equation imposes

## What this page answers

The class page says a hyperbolic problem carries its answer along paths at a
finite speed, and that a scheme has to respect that speed. It states the
condition. This page derives it from the domain of dependence, measures what
happens on each side of it, and says why the boundary case is exact rather than
merely stable.

This closes the derivation row of the measured gaps for the third class, and it
gives the condition a reason rather than a name.

## The mathematics

Take the simplest wave equation, with speed one:

$$ u_t + u_x = 0, \qquad u(x, 0) = u_0(x). $$

Its exact solution is a travelling shape, $u(x, t) = u_0(x - t)$: the value at
$(x, t)$ is whatever was at the single point $x - t$ at time zero. That point is
the equation's **domain of dependence**, and it is one point, not an interval,
because the equation carries information at exactly one speed.

A scheme has its own domain of dependence. The explicit upwind scheme

$$ u_i^{n+1} = u_i^n - \nu\left(u_i^n - u_{i-1}^n\right), \qquad \nu =
\frac{a\,\Delta t}{h}, $$

computes the new value at node $i$ from the old values at $i$ and $i-1$: it
assumes the wave came from the left, which is why it is called upwind. After $n$
steps the value at node $i$ depends on nodes $i-n$ to $i$, an interval of width
$n h = a t$ for $\nu = 1$. The physical point $x_i - a t$ sits inside that
interval only when

$$ a\,\Delta t \le h, \qquad\text{that is,}\qquad \nu \le 1. $$

That is the Courant–Friedrichs–Lewy condition, and the argument is the one worth
remembering: **a scheme cannot be right where it cannot see.** If the exact
answer at a point depends on data the scheme never read, no amount of accuracy
in the arithmetic recovers it.

The same inequality comes out of von Neumann's analysis. Substituting
$u_i^n = g^n e^{\mathrm{i}\theta i}$ into the scheme gives

$$ g = 1 - \nu\left(1 - e^{-\mathrm{i}\theta}\right), $$

and multiplying by the conjugate gives a magnitude that depends only on the real
part:

$$ |g|^2 = 1 - 2\nu(1 - \nu)\left(1 - \cos\theta\right). $$

For $0 \le \nu \le 1$ the bracket is never negative, so $|g| \le 1$ and the
scheme is stable. For $\nu > 1$ the coefficient $1 - \nu$ is negative, the
bracket turns positive for $\theta \ne 0$, and $|g| > 1$: the scheme amplifies.
The two arguments agree, which is what a stability analysis of a linear
constant-coefficient scheme should do.

**The exact case.** At $\nu = 1$, $g = e^{-\mathrm{i}\theta}$, whose magnitude
is one for every $\theta$. A magnitude of exactly one with a phase that is
exactly the shift means the scheme does not merely approximate the shift. It
performs it. Run it at $\nu = 1$ and every node moves exactly one place per
step, with no diffusion and no error at all. That is why the condition is not a
nuisance to be pushed against. The boundary of the stable region is the one
place where a first-order scheme is exact. A code that runs at $\nu$ near one is
trading accuracy for speed in a way that is visible and rarely justified.

**The check.** Start with a single spike at node 20 of a 40-node grid and take
ten steps. At $\nu = 0.5$ the spike is smeared to a peak of $0.25$ at node 25 —
stable, and diffusive. At $\nu = 1$ it arrives at node 30 with its height $1.00$
intact: the exact shift. At $\nu = 1.5$ the peak reaches $288$, and it keeps
doubling: the CFL condition is violated and the answer is arithmetic noise with
a shape.

## The code

The program runs the upwind scheme on that spike at three Courant numbers and
prints the largest value and where it sits after ten steps.

<details markdown="1">
<summary>Ten steps of upwind at three Courant numbers</summary>

```python
def upwind(nu, n=40, steps=10):
    """u_t + a u_x = 0 with a = 1, one step of explicit upwind."""
    u = [1.0 if i == 20 else 0.0 for i in range(n)]
    for _ in range(steps):
        v = u[:]
        for i in range(1, n):
            u[i] = v[i] - nu * (v[i] - v[i - 1])
    return u


print("nu     max|u|   peak at")
for nu in (0.5, 1.0, 1.5):
    u = upwind(nu)
    peak = max(range(40), key=lambda i: abs(u[i]))
    print(f"{nu:>3}  {max(abs(x) for x in u):>8.2f}   {peak}")
```

```text
nu     max|u|   peak at
0.5      0.25   25
1.0      1.00   30
1.5    288.33   28
```

</details>
The peak's position is the wave speed, and it is the first thing to check in a
hyperbolic code. At $\nu = 0.5$ the peak has moved five nodes in ten steps. At
$\nu = 1$ it has moved ten, which is the physical speed. The height is the
second: $1.00$ at $\nu = 1$ is the exact shift, and $0.25$ at $\nu = 0.5$ is the
numerical diffusion that the same algebra predicts. The third row has the
position roughly right and the height meaningless, which is what an unstable run
looks like before it overflows.

## The theory

The condition came from a domain of dependence, and that argument generalises
further than the scheme.

- **It is about the equation, not the method.** Any explicit scheme for a
  hyperbolic problem has a finite stencil and therefore a finite domain of
  dependence. The CFL condition says the physical one must fit inside it, so the
  limit on $\Delta t$ survives a change of scheme — only the constant changes.
- **Implicit schemes evade it, and pay elsewhere.** An implicit stencil reaches
  every node at once, so it has no CFL limit; it is stable at any $\Delta t$ and
  still inaccurate when the step is too large to resolve the wave, because the
  answer is then a smoothed version of the right answer. Stability and accuracy
  are different requirements and the CFL condition is about the first.
- **Upwind is first order and diffusive.** The magnitude $|g| < 1$ for
  $0 < \nu < 1$ is numerical dissipation: the scheme damps the wave it should
  carry unchanged. That is the price of a one-sided stencil, and Lax–Wendroff
  buys second order at the cost of oscillations behind a front.

The wave speed is not always given. In a system, $a$ is replaced by the
eigenvalues of a Jacobian, and the condition is that every one of them satisfies
it. So the step is set by the fastest wave, whether or not the answer contains
it. That is the same stiffness that the parabolic page meets from the other
direction. Roache's book is the standard account of why the condition is a
stability condition and not only a bookkeeping rule, and LeVeque's develops the
domain-of-dependence argument for systems.

What it will not do: it will not tell you the step for a nonlinear conservation
law, where waves can steepen into shocks and the relevant speed depends on the
solution.

## What this cost

One pass over the nodes per step, so a fixed final time costs $O(1/h^2)$ work
with $\Delta t$ tied to $h$. Halving the mesh doubles the nodes and doubles the
steps, so the work goes up fourfold. That is cheaper than the parabolic case's
eightfold, because the time step is tied to $h$ rather than to $h^2$.

Memory is $O(1/h)$. Accuracy is first order in both $h$ and $\Delta t$ for this
scheme, so the error falls linearly with the mesh — one digit for a tenfold
refinement, where the centred schemes get two.

What it will not do: it will not carry a wave unchanged unless $\nu = 1$. It
will not stay stable if the boundary condition lets a wave back in. A stable
interior with a reflecting boundary one step out of phase is a common way to see
an explosion the CFL analysis says cannot happen.

## Back to the map

[Hyperbolic](../index.md) is the class page this works under.
[The same argument for a diffusive equation](../../parabolic/stability/index.md)
is the same condition with a different power. [Home](../../index.md) is the
summary.
