---
title: Where the matrix comes from
---

# Where the matrix comes from

## What this page answers

The class page says an elliptic problem is one where the answer is a value at
every point and nothing travels. It also says a computer solves one by turning
it into a linear system. It does not show the turning. This page integrates one
problem by parts, assembles the matrix element by element, and checks the answer
against the one function that can be written down.

It closes the discretisation row of the measured gaps: the book uses the word
and never shows the step it names.

## The mathematics

Take the simplest elliptic problem on the unit interval:

$$ -u''(x) = f(x), \qquad u(0) = u(1) = 0. $$

A classical solution needs two derivatives, and a piecewise-linear guess has
none at the joins. So the equation is rewritten in a form that a rougher
function can satisfy: multiply by a test function $v$ that also vanishes at the
ends, and integrate over the interval:

$$ -\int_0^1 u'' v \, dx = \int_0^1 f v \, dx. $$

Integrating the left side by parts moves one derivative from $u$ onto $v$:

$$ \int_0^1 u' v' \, dx - \big[u' v\big]_0^1 = \int_0^1 f v \, dx. $$

The boundary term is zero because $v$ vanishes there. What is left is the **weak
form**:

$$ \int_0^1 u' v' \, dx = \int_0^1 f v \, dx \quad\text{for every} v. $$

Both sides now need only one derivative, so a piecewise-linear $u$ is allowed.
The equation has become weaker on purpose: a solution of the classical equation
satisfies it, and the weaker condition is the one a computer can meet.

**The matrix.** Split the interval into $n$ pieces of width $h = 1/n$, with
nodes $x_i = ih$, and let $\phi_i$ be the hat function that is $1$ at node $i$,
$0$ at every other node, and linear in between. Write $u_h = \sum_j U_j \phi_j$
and choose $v = \phi_i$ for each $i$. Substituting gives

$$ \sum_j U_j \int \phi_j' \phi_i' \, dx = \int f \phi_i \, dx, $$

which is a linear system $K U = F$ with

$$ K_{ij} = \int \phi_j' \phi_i' \, dx, \qquad F_i = \int f \phi_i \, dx. $$

Every entry of $K$ is computed from one element. On the element
$[x_{i-1}, x_i]$, $\phi_i$ has slope $1/h$ and $\phi_{i-1}$ has slope $-1/h$, so

$$ \int_{x_{i-1}}^{x_i} (\phi_i')^2 = \frac1h, \qquad \int_{x_{i-1}}^{x_i}
\phi_i' \phi_{i-1}' = -\frac1h. $$

Adding the contribution from the element on the other side, where $\phi_i$ again
has slope $-1/h$, gives the diagonal $2/h$ and the off-diagonals $-1/h$. So

$$ K = \frac1h \begin{pmatrix} 2 & -1 & & \\ -1 & 2 & -1 & \\ & -1 & 2 & -1 \\ &
& -1 & 2 \end{pmatrix}, $$

the same matrix whichever $f$ is chosen. That is the point worth taking away:
the matrix is the **operator**, and the load vector is the data. Change $f$ and
only $F$ changes.

**The load.** With $f = 1$, $\int f \phi_i = h$, the area of the hat. So
$F = h(1, 1, \dots, 1)$, not $(1, 1, \dots, 1)$ — the factor $h$ is the width of
the region over which the constant acts, and leaving it out scales the answer by
$n$.

**The check.** For $-u'' = 1$ with zero ends, the exact solution is
$u(x) = x(1 - x)/2$. With $n = 4$ the program below returns $3/32$, $1/8$,
$3/32$ at $x = 1/4, 1/2, 3/4$, which are exactly $u(1/4)$, $u(1/2)$ and $u(3/4)$.
The nodal values are exact here, and the reason is visible in the matrix:
$K U = F$ says $(2U_i - U_{i-1} - U_{i+1})/h = h$, which is
$-(U_{i-1} - 2U_i + U_{i+1}) = h^2$. The exact solution is a quadratic, and a
quadratic's second difference is exactly $h^2$ times its second derivative. The
two difference equations are the same equation, so their solutions agree at the
nodes. That is a property of this problem, not a rule: a different $f$ loses it.

## The code

The program assembles the matrix for $n = 4$ from the element rule, applies the
load $h$ per node, solves exactly, and compares each nodal value with the exact
solution at the same point.

<details markdown="1">
<summary>The assembled matrix, the solve, and the exact values</summary>

```python
import sympy as sp

n = 4
h = sp.Rational(1, n)
K = sp.zeros(n - 1, n - 1)
for i in range(n - 1):
    K[i, i] = 2 / h
    if i:
        K[i, i - 1] = -1 / h
    if i < n - 2:
        K[i, i + 1] = -1 / h

f = h * sp.ones(n - 1, 1)
u = K.LUsolve(f)
print("h K =", (K * h).tolist())
for i in range(n - 1):
    x = (i + 1) * h
    exact = x * (1 - x) / 2
    diff = u[i] - exact
    print(f"x = {x}  u_h = {u[i]}  exact = {exact}  diff = {diff}")
```

```text
h K = [[2, -1, 0], [-1, 2, -1], [0, -1, 2]]
x = 1/4  u_h = 3/32  exact = 3/32  diff = 0
x = 1/2  u_h = 1/8  exact = 1/8  diff = 0
x = 3/4  u_h = 3/32  exact = 3/32  diff = 0
```

</details>
The first line is $hK$ rather than $K$, because that is the matrix that does not
depend on $h$: the $1/h$ in front is the whole of the mesh's effect on the
operator. The three differences are zero, so the discretisation error at the
nodes is not merely small — for this load it is absent, and the page above says
why.

## The theory

The weak form is what a finite element method actually solves, and three
consequences follow from it.

- **The choice of test space is the method.** Taking $v$ from the same space as
  $u_h$ is Galerkin's choice, and it is what makes $K$ symmetric. Taking $v$
  from a different space is a mixed method, which is the saddle-point class.
- **The matrix is sparse because the basis is local.** $\phi_i$ is nonzero only
  on two elements, so $K_{ij}$ is nonzero only when $i$ and $j$ share an
  element. A basis with global support would give a dense matrix for the same
  operator.
- **A better solution needs a better space.** Refining the mesh makes $h$
  smaller and $K$ larger, and the error falls as $h^2$ in the energy norm for a
  smooth solution. Raising the polynomial degree inside each element is the
  other route, and it converges faster when the solution is smooth.

The stability of the method is a property of the weak form rather than of the
solve. The bilinear form $\int u'v'$ is coercive on the space of functions that
vanish at the ends. That is what gives $K$ its positive definiteness, and it is
what lets the conjugate-gradient family be used on it. Briggs, Henson and
McCormick's multigrid text opens with this example for exactly that reason. It
is the cleanest case in which the operator, the matrix and the solver can all be
seen at once.

What it will not do: nodal exactness does not generalise. It held because the
test functions reproduce quadratics and the exact solution was a quadratic. A
variable load, a coefficient that varies with $x$, or two dimensions all lose
it, and then the error is $O(h^2)$ rather than zero.

## What this cost

The matrix has $O(n)$ nonzeros for $n$ unknowns in one dimension, and each row
costs a handful of arithmetic operations to assemble. Solving it by a direct
factorisation costs $O(n)$ for this banded matrix. An iterative method costs a
few matrix-vector products of $O(n)$ each. The number of those products grows as
the mesh refines, unless the method is preconditioned or multigrid is used.

The accuracy in the energy norm is $O(h^2)$ for a smooth solution, so halving
$h$ quarters the error and doubles the unknowns. In two dimensions the same
argument gives $O(h^2)$ with $O(h^{-2})$ unknowns, which is where the cost of a
refined mesh starts to bite.

What it will not do: it will not choose $h$ for you. It will not fix a singular
problem where the exact solution has a corner. And it will not give the exact
value between nodes: the piecewise-linear answer interpolates the nodal values,
so the error between nodes is the $O(h^2)$ one.

## Back to the map

[Elliptic](../index.md) is the class page this works under.
[One matrix, two errors](../../linear-system/conditioning/index.md) is what the
solve of this $K$ is exposed to. [Home](../../index.md) is the summary.
