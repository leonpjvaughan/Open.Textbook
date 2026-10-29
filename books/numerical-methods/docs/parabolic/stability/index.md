---
title: Why the time step is tied to the square of the mesh
---

# Why the time step is tied to the square of the mesh

## What this page answers

The class page says a parabolic problem moves forward in time and forgets where
it started, and that the obvious scheme needs a time step that shrinks with the
mesh. It asserts the relation; this page derives it, names the mode that breaks,
and shows the cost that follows when the mesh is refined.

It closes the von Neumann row of the measured gaps, which the book lists twice —
once for parabolic and once for hyperbolic — and never analyses.

## The mathematics

Take the heat equation on a line, with a diffusion coefficient of one:

$$ u_t = u_{xx}. $$

The forward-in-time, centred-in-space scheme (FTCS) replaces each derivative by
the simplest difference:

$$ \frac{u_i^{n+1} - u_i^n}{\Delta t} = \frac{u_{i+1}^n - 2u_i^n +
u_{i-1}^n}{h^2}. $$

Rearrange it and one number appears:

$$ u_i^{n+1} = u_i^n + r\left(u_{i+1}^n - 2u_i^n + u_{i-1}^n\right), \qquad r =
\frac{\Delta t}{h^2}. $$

The scheme depends on $\Delta t$ and $h$ only through $r$, so the question "how
small may the time step be" is the question "how large may $r$ be".

**von Neumann's argument.** Look for a solution of the difference equation that
is a wave in space and a power in time,

$$ u_i^n = g^n e^{\mathrm{i}\theta i}, $$

with $\theta$ the wave's phase per cell. Substituting gives

$$ g = 1 + r\left(e^{\mathrm{i}\theta} - 2 + e^{-\mathrm{i}\theta}\right) = 1 -
2r(1 - \cos\theta) = 1 - 4r\sin^2\!\left(\tfrac{\theta}{2}\right). $$

Every such wave must not grow, or the scheme amplifies rounding into an answer.
So the requirement is $|g| \le 1$ for every $\theta$. Two ends decide it. At
$\theta \to 0$, $g \to 1$ from below, which is safe. At $\theta = \pi$, the
grid-scale sawtooth, $g = 1 - 4r$, so the condition $|g| \le 1$ becomes

$$ -1 \le 1 - 4r \quad\Longrightarrow\quad r \le \tfrac12. $$

That is the whole result:

$$ \Delta t \le \frac{h^2}{2}. $$

**Why the square.** The unstable mode is the one that alternates in sign from
node to node. The second difference of a sawtooth is four times its own value
with the opposite sign. Divided by $h^2$ it is $4/h^2$ so the diffusion term's
magnitude grows like $1/h^2$ The time step's contribution to the update is
proportional to $\Delta t$ alone. To keep the update from overshooting,
$\Delta t$ must shrink as $h^2$. An explicit scheme for a parabolic problem pays
that price at every refinement. That is why implicit schemes — which do not have
the limit — are the usual choice, even though they need a solve each step.

**The check.** The program below evaluates $g$ at $\theta = \pi$ for five values
of $r$. At $r = 0.5$ the factor is $-1$: the sawtooth flips sign every step and
neither grows nor decays, which is the boundary. At $r = 0.6$ the factor is
$-1.4$, and after twenty steps the amplitude is $1.4^{20} \approx 837$. At
$r = 0.75$ it is $-2$ and the amplitude is $2^{20} \approx 1.05 \times 10^{6}$.

The second table is the price. Halving $h$ quarters $\Delta t$, so reaching a
fixed final time takes four times as many steps. The number of nodes doubles at
the same time, so the work per unit of simulated time grows eightfold. Refining
the mesh by ten costs a thousand times the work.

## The code

The program prints the sawtooth amplification and its twentieth power for five
values of $r$, then the largest time step for three meshes and the number of
steps to reach $t = 1$ at that step.

<details markdown="1">
<summary>Amplification at the sawtooth, and three meshes</summary>

```python
print("r      g(pi)      |g|^20     bounded")
for r in (0.25, 0.4, 0.5, 0.6, 0.75):
    g = 1 - 4 * r
    print(f"{r:>4}  {g:>8.2f}  {abs(g) ** 20:>10.3f}  "
          f"{'yes' if abs(g) <= 1 else 'no'}")

print("h        dt = h^2/2   steps to t = 1")
for k in (1, 2, 3):
    h = 10.0 ** -k
    print(f"{h:<8} {h * h / 2:<12.3e} {1 / (h * h / 2):>10.0f}")
```

```text
r      g(pi)      |g|^20     bounded
0.25      0.00       0.000  yes
 0.4     -0.60       0.000  yes
 0.5     -1.00       1.000  yes
 0.6     -1.40     836.683  no
0.75     -2.00  1048576.000  no
h        dt = h^2/2   steps to t = 1
0.1      5.000e-03           200
0.01     5.000e-05         20000
0.001    5.000e-07       2000000
```

</details>
The first table is the condition and the second is its cost. The bounded rows
are the ones at or below $r = 0.5$. The boundary row is the interesting one:
$r = 0.5$ is stable, but barely, because the sawtooth neither decays nor grows.
The answer keeps a grid-scale wobble it can never lose. A scheme that is stable
and still wrong is a real outcome of this analysis. It is why an explicit
parabolic code is run at $r$ comfortably below one half, rather than at it.

## The theory

The argument above is a Fourier argument, and it is exact for the difference
equation on a line with periodic ends. Three things are worth saying about how
far it reaches.

- **It assumes constant coefficients and a uniform mesh.** A variable
  coefficient or a stretched mesh has no single $r$, and the condition becomes
  local: the step must satisfy $h^2/2$ for the largest coefficient anywhere, or
  the analysis is done mode by mode on the frozen coefficient.
- **It is necessary and sufficient for this scheme.** For a linear, constant
  coefficient, periodic problem, von Neumann's condition is exactly equivalent
  to stability. For a scheme with boundaries, an inflow, or a nonlinearity it is
  necessary and not sufficient — the Lax equivalence theorem needs more.
- **It says nothing about accuracy.** $r = 0.5$ is stable and only first-order
  accurate in time; the time-discretisation error is $O(\Delta t)$ and the
  space-discretisation error is $O(h^2)$, so refining both together leaves the
  time error dominant. The implicit schemes that remove the stability limit do
  not remove this, and a second-order time step is a separate decision.

The consistency question — whether the difference equation tends to the
differential one as the mesh refines — is the subject of
[Convergence, and how to measure it](../../order/index.md). The two together are
what LeVeque's treatment builds the stability-and-convergence theorem from.

What it will not do: it will not tell you the step for an implicit scheme, where
there is no such limit. Nor will it tell you the step for a nonlinear problem,
where the relevant coefficient is the largest eigenvalue of a Jacobian that
moves.

## What this cost

The work is one pass over the nodes per step: $O(1/h)$ per step, so the cost to
reach a fixed time is $O(1/h^3)$ — a factor of eight for every halving of the
mesh. That is the price of the explicit form. It is the reason an implicit
scheme wins for anything but the smallest problems: it costs a linear solve per
step, and it allows a step set by accuracy rather than stability.

Memory is $O(1/h)$: two time levels. Accuracy is $O(h^2) + O(\Delta t)$, so the
mesh and the step have to be refined together to see the space error fall.

What it will not do: it will not remove the stiffness of the problem. A
parabolic equation is stiff by construction — its eigenvalues span $O(1/h^2)$ —
and the explicit method's time step is the smallest of them, not the one the
answer needs.

## Back to the map

[Parabolic](../index.md) is the class page this works under.
[Why the time step is tied to the mesh](../../hyperbolic/the-cfl-condition/index.md)
is the wave equation's version of the same argument, with a different power.
[Home](../../index.md) is the summary.
