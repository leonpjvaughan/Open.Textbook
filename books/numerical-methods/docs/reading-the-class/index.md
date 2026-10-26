---
title: Reading the class off the equation
---

# Reading the class off the equation

Three of the nine kinds are decided by one number. Put the equation in front of a
computer and it says which of [Elliptic](../elliptic/index.md),
[Parabolic](../parabolic/index.md) and [Hyperbolic](../hyperbolic/index.md) you have,
faster than you can read the equation. The number itself is a small piece of
arithmetic. This page gives you the arithmetic, the reason it works, and the program
that computes it.

## The three numbers in a second-order equation

A linear second-order equation in two variables, with every term moved to the left:

$$ A\,u_{xx} + B\,u_{xy} + C\,u_{yy} + \dots = 0 $$

Subscripts are shorthand for derivatives. $u_{xx}$ is the second derivative of $u$
with respect to $x$, and $u_{xy}$ is the derivative taken first with respect to $x$
and then with respect to $y$. The dots are the terms with fewer derivatives: first
derivatives, $u$ itself, and any source. They play no part in the test.

So three numbers carry the class: $A$, $B$ and $C$, read off the three second
derivatives in that order. They are allowed to be formulas in the variables rather
than fixed numbers, and the last section of this page takes that case.

## The test

$$ \Delta = B^2 - 4AC $$

Each of the three classes has **characteristics**: the directions in which a
disturbance can travel through the plane. What the test counts is how many real
characteristic directions pass through a point.

| Sign of $\Delta$ | Class | Directions through a point | What the answer does |
|---|---|---|---|
| $\Delta > 0$ | [Hyperbolic](../hyperbolic/index.md) | two | travels along paths, and keeps its shape |
| $\Delta = 0$ | [Parabolic](../parabolic/index.md) | one | moves forward and smooths |
| $\Delta < 0$ | [Elliptic](../elliptic/index.md) | none | is settled, and nothing travels |

A hyperbolic equation has two directions because information can travel along
either of them. The single direction of a parabolic one comes with no partner, so
the answer moves forward by smoothing rather than by travelling. An elliptic
equation has no real direction at all, which is the algebraic face of the statement
on the [elliptic page](../elliptic/index.md) that a change at one edge is felt
everywhere at once.

**Predict first.** The plane below holds one point, and the directions the equation
allows through it. Set $A = 1$, $B = 0$ and $C = 1$, which is Laplace's equation, and
write down what you expect: how many directions will appear, and which class the
readout will name.

:::figure discriminant

**Test.** Keep $A$ and $C$ at $1$ and move $B$ from $-6$ to $6$. The count changes at
$B = -2$ and at $B = 2$: no real direction between those two values, one direction at
either of them, two beyond. Watch the two directions meet as $B$ reaches $2$.

**Explain.** Say why the count changes at $B = \pm 2$ and at no other value, in your
own words. The next section gives the algebra behind your answer.

## Why one number decides

The slope $m$ of a characteristic direction is a root of

$$ A m^2 - B m + C = 0 . $$

So finding the directions is a quadratic, and $\Delta$ is that quadratic's own
discriminant: the same expression that decides how many real roots a quadratic has.
Counting directions through a point and solving a quadratic are one calculation
wearing two names.

The class names are borrowed from the curves $Ax^2 + Bxy + Cy^2$, whose graph is an
ellipse when the same number is below zero and a hyperbola when it is above. The
boundary case, where the two directions meet, is where the name *parabolic* comes
from. One number, three shapes, in the equations and in the curves alike.

## Three equations, worked by hand

Read the coefficients in the order $xx$, $xy$, $yy$, after every term has been moved
to one side. The two variables are whatever the two variables are: $x$ and $y$ for
Laplace, and $x$ and $t$, with $t$ standing for time, for the heat and wave rows.

| Equation | $A$, $B$, $C$ | $B^2-4AC$ | Class |
|---|---|---|---|
| Laplace: $u_{xx} + u_{yy} = 0$ | $1$, $0$, $1$ | $-4$ | elliptic |
| Heat: $u_t = u_{xx}$ | $1$, $0$, $0$ | $0$ | parabolic |
| Wave: $u_{tt} = u_{xx}$ | $-1$, $0$, $1$ | $4$ | hyperbolic |

**Common error.** The order and the signs are where a hand classification goes
wrong. Leave $u_{yy}$ on the other side of Laplace's equation, so it reads
$u_{xx} - u_{yy} = 0$, and $C$ reads as $-1$. The discriminant then becomes $4$,
and one sign has turned an elliptic equation hyperbolic. Move every term to the
left first, then read off $A$, $B$, $C$ in that order, then compute.

## The computer does the grunt work

Reading three coefficients out of a typed equation is exactly the kind of work a
program should do. The program below applies the equation to $e^{px+qy}$, a wave in
both variables at once. Each second derivative of that function comes back
multiplied by $p$ or $q$, so the coefficient of $p^2$ is $A$, the coefficient of
$pq$ is $B$, and the coefficient of $q^2$ is $C$. Every term with fewer derivatives
comes back at degree one or zero, and the three reads step straight over it.

**Predict.** Before the block runs: take $u_{xx} + 4u_{xy} + 3u_{yy} = 0$.
$B^2$ is $16$ and $4AC$ is $12$, so write down the value of $\Delta$ and the class it
names. The block prints five equations, and that one is the fourth row.

```python
import sympy as sp

def classify(pde, u, *vars):
    """The sign of B**2 - 4*A*C for a linear second-order equation.

    `pde` is the equation as an expression equal to zero, `u` is the unknown, and
    `vars` are its two independent variables.
    """
    p, q = sp.symbols("p q")
    trial = sp.exp(p*vars[0] + q*vars[1])
    form = sp.simplify(pde.subs(u, trial).doit() / trial)
    A = form.coeff(p, 2)        # what multiplies u_xx
    B = form.coeff(p*q)         # what multiplies u_xy
    C = form.coeff(q, 2)        # what multiplies u_yy
    delta = sp.factor(B**2 - 4*A*C)
    if delta.is_positive:
        verdict = "hyperbolic"
    elif delta.is_zero:
        verdict = "parabolic"
    elif delta.is_negative:
        verdict = "elliptic"
    else:
        verdict = f"the class depends on where you are: {delta}"
    return delta, verdict

x, y, t = sp.symbols("x y t")
u = sp.Function("u")
D = sp.diff
Laplace = D(u(x, y), x, 2) + D(u(x, y), y, 2)
Wave    = D(u(x, t), t, 2) - D(u(x, t), x, 2)
Heat    = D(u(x, t), x, 2) - D(u(x, t), t)
Cross   = D(u(x, y), x, 2) + 4*D(u(x, y), x, y) + 3*D(u(x, y), y, 2)
Mixed   = D(u(x, y), y, 2) - x*D(u(x, y), x, 2)

for name, (pde, unknown, *vars) in [
    ("Laplace", (Laplace, u(x, y), x, y)),
    ("Heat",    (Heat,    u(x, t), x, t)),
    ("Wave",    (Wave,    u(x, t), x, t)),
    ("Cross",   (Cross,   u(x, y), x, y)),
    ("Mixed",   (Mixed,   u(x, y), x, y)),
]:
    delta, verdict = classify(pde, unknown, *vars)
    print(f"{name:8} {str(delta):>4}  {verdict}")
```

```text
Laplace    -4  elliptic
Heat        0  parabolic
Wave        4  hyperbolic
Cross       4  hyperbolic
Mixed     4*x  the class depends on where you are: 4*x
```

**Explain.** The fourth row gives $\Delta = 4$, the value you wrote down. The fifth
row gives no class at all. Say what the program knows about that last equation and
what it does not know yet.

## The class can move with the equation

The fifth row is $u_{yy} - x\,u_{xx} = 0$, an equation whose coefficient $A$ is $-x$.
The discriminant is then $4x$: positive where $x$ is positive, zero on the line
$x = 0$, negative where $x$ is negative. One equation, three classes, and the
question "which class is this?" now has an answer that depends on where in the
region you are standing.

That is not a failure of the test. The test was always about the point in front
of you. It only looks like a fact about the whole equation when the coefficients
are fixed numbers.

A solver given such an equation decides region by region which kind of problem it
is solving. That decision comes before any method is chosen, and it is the
argument of [The class is a choice](../choosing-the-class/index.md).

## What the test does not decide

- **More than two variables.** With three or more independent variables the
  coefficients form a symmetric matrix, and the test becomes the signs of its
  eigenvalues: all one sign means elliptic, exactly one of the other sign means
  hyperbolic, a zero eigenvalue means parabolic.
- **Terms below second order.** The test reads the second derivatives only. Whether
  the question has a solution also depends on the conditions supplied with it, on
  the first-order terms, and on what is given at the edge.
- **What you solve after discretising.** Divide the region into cells and the
  arithmetic becomes a [linear system](../linear-system/index.md), whatever the model
  was. The class of the model and the class of the arithmetic are two different
  questions, and the second one is answered by the matrix.

## Read next

- [Elliptic](../elliptic/index.md), [Parabolic](../parabolic/index.md) and
  [Hyperbolic](../hyperbolic/index.md) — the three classes, what they are used on,
  and what goes wrong in each.
- [The class is a choice](../choosing-the-class/index.md) — the same physics written
  two ways, one of which cannot be solved at all.
- [Methods, A to Z](../techniques/index.md) — the reverse lookup, from a method to
  the classes it works on.
