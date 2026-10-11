---
title: 3.4 Parametric equations and Cartesian conversion — Learn
chapter: 3
chapter_title: Coordinate geometry
section: '3.4'
section_title: Parametric equations and Cartesian conversion
dfe:
- C3
kind: walkthrough
---

# 3.4 Parametric equations and Cartesian conversion — Learn

**Prerequisites:** plotting coordinates; substituting into a formula;
rearranging to change the subject; the identity
$\cos^2 t + \sin^2 t = 1$ from GCSE.

**By the end of this section you can:** read the points of a curve from
parametric equations; convert a parametric curve to Cartesian form by
eliminating the parameter; convert a simple Cartesian equation to a parametric
form; state the part of a curve that a restricted parameter covers.

## 1. Two equations, one parameter

So far every curve has been written as one equation linking $x$ and $y$, such as
$y = x^2$. A curve can also be described by giving $x$ and $y$ separately in
terms of a third quantity. That third quantity is the **parameter**, and the two
equations are **parametric equations**.

$$
x = f(t), \qquad y = g(t).
$$

Each value of $t$ gives one point $(x, y)$. As $t$ varies over its range, the
point traces the curve.

**Example 1.** Sketch the curve $x = 2t$, $y = t^2$.

Substitute a few values of $t$ and write down the points.

| $t$ | $x = 2t$ | $y = t^2$ | point |
|---|---|---|---|
| $-3$ | $-6$ | $9$ | $(-6, 9)$ |
| $-2$ | $-4$ | $4$ | $(-4, 4)$ |
| $-1$ | $-2$ | $1$ | $(-2, 1)$ |
| $0$ | $0$ | $0$ | $(0, 0)$ |
| $1$ | $2$ | $1$ | $(2, 1)$ |
| $2$ | $4$ | $4$ | $(4, 4)$ |
| $3$ | $6$ | $9$ | $(6, 9)$ |

The points lie on a curve that opens upwards. Notice that $y$ is never negative,
because $t^2 \ge 0$. The curve is a parabola.

## 2. Eliminating the parameter

To find the Cartesian equation, **eliminate** $t$: combine the two equations
into one that links $x$ and $y$ only. The usual move is to make $t$ the subject
of the simpler equation, then substitute it into the other.

**Example 2.** Find the Cartesian equation of $x = 2t$, $y = t^2$.

The first equation is simpler. Divide by $2$:

$$
t = \frac{x}{2}.
$$

Substitute into the second equation:

$$
y = \left(\frac{x}{2}\right)^2 = \frac{x^2}{4}.
$$

The curve is the parabola $y = \frac{x^2}{4}$. Check one point: when $t = 2$,
the parametric equations give $(4, 4)$, and the Cartesian equation gives
$y = \frac{16}{4} = 4$. The point fits.

**Example 3.** Find the Cartesian equation of $x = 2 + t$, $y = 5 - 3t$.

Make $t$ the subject of the first equation:

$$
t = x - 2.
$$

Substitute into the second equation:

$$
y = 5 - 3(x - 2) = 5 - 3x + 6 = 11 - 3x.
$$

The curve is a straight line. The parameter traces it at a steady rate, so $t$
carries the timing as well as the position.

## 3. Eliminating with an identity

When the parameter appears in a sine and a cosine, the identity
$\cos^2 t + \sin^2 t = 1$ removes it. Square both equations and add them.

**Example 4.** Find the Cartesian equation of $x = 5\cos t$, $y = 5\sin t$.

Make each trigonometric function the subject:

$$
\cos t = \frac{x}{5}, \qquad \sin t = \frac{y}{5}.
$$

Square both and add, using the identity:

$$
\left(\frac{x}{5}\right)^2 + \left(\frac{y}{5}\right)^2 = \cos^2 t + \sin^2 t = 1.
$$

Multiply by $25$:

$$
x^2 + y^2 = 25.
$$

The curve is the circle of radius $5$ centred on the origin.

**Example 5.** Find the Cartesian equation of
$x = 6 + 5\cos t$, $y = 8 + 5\sin t$.

Rearrange first, so the trigonometric functions stand alone:

$$
\cos t = \frac{x - 6}{5}, \qquad \sin t = \frac{y - 8}{5}.
$$

Square and add:

$$
\left(\frac{x - 6}{5}\right)^2 + \left(\frac{y - 8}{5}\right)^2 = 1.
$$

Multiply by $25$:

$$
(x - 6)^2 + (y - 8)^2 = 25.
$$

This is the rim of the lake in the chapter problem, and the path of the drone.
The centre is $(6, 8)$ and the radius is $5$.

## 4. When the parameter is restricted

The range of $t$ decides which part of the curve is drawn. The Cartesian
equation often describes a larger curve, so the range must be carried across.

**Example 6.** A curve is given by $x = t + 1$, $y = t^2$, for $0 \le t \le 3$.
Find its Cartesian equation and the part of the curve it covers.

Make $t$ the subject: $t = x - 1$. Substitute:

$$
y = (x - 1)^2.
$$

The equation $y = (x - 1)^2$ describes a whole parabola. The parameter only runs
from $0$ to $3$, so $x = t + 1$ runs from $1$ to $4$. The curve is the part of
the parabola with $1 \le x \le 4$.

The same care applies in reverse. When you choose parametric equations for a
Cartesian curve, say which part you mean. For the circle $x^2 + y^2 = 16$, the
pair $x = 4\cos t$, $y = 4\sin t$ with $0 \le t < 2\pi$ covers the whole circle
exactly once.

## 5. Try it: the parametric explorer

**Predict first.** Three curves are offered: a parabola, a line, and a circle.
For the parabola, predict what happens to the point when $t$ is negative. Write
your prediction down before you move the slider.

:::figure ch3-parametric-explorer

**Test.** Choose a curve, then move the slider for $t$. Watch the point move and
read the coordinates. The panel shows the Cartesian equation that the curve is
equivalent to.

**Explain.** For the circle, describe in words what happens to the point as $t$
goes from $0$ to about $6.3$. Then write one sentence saying why the parameter
has to be eliminated to get back to the equation of the circle.

> **Watch out.** Two traps come with parameters.
>
> **The Cartesian form can cover more than the curve.** Eliminating $t$ can
> produce an equation with extra points. The pair $x = t^2$, $y = t^3$ traces
> only the right-hand branch, because $x = t^2 \ge 0$, yet $y^2 = x^3$ is
> satisfied by extra points. Always state the range of $t$ or the range of $x$.
>
> **A parametric curve need not be a function.** For $x = t^2$, $y = t^3$, one
> value of $x$ can come from two values of $t$. A parametric description handles
> curves that a single $y = f(x)$ cannot.
>
> **Re-check:** pick one value of $t$, work out the point from the parametric
> equations, and confirm that it satisfies the Cartesian equation.

## You should now be able to

- read points from a parametric curve and sketch it;
- eliminate the parameter by substitution;
- eliminate the parameter with $\cos^2 t + \sin^2 t = 1$;
- convert a simple Cartesian equation into parametric form;
- state the part of a curve covered by a restricted parameter;
- explain why eliminating the parameter can change the curve.
