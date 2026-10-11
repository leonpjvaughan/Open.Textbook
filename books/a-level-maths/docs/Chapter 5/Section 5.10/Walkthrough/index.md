---
title: 5.10 Solving trigonometric equations in an interval — Learn
chapter: 5
chapter_title: Trigonometry
section: '5.10'
section_title: Solving trigonometric equations in an interval
dfe:
- E7
kind: walkthrough
---

# 5.10 Solving trigonometric equations in an interval — Learn

**Prerequisites:** the graphs of the three functions; the principal values of
the inverse functions; the CAST quadrants; solving a quadratic by factorising.

**By the end of this section you can:** solve an equation of the form
$\sin\theta = k$, $\cos\theta = k$ or $\tan\theta = k$ in a given interval; find
all solutions without losing any; solve an equation in $\sin 2\theta$ or
$\cos 3\theta$; solve a quadratic in a trigonometric function.

## 1. One value, many angles

A trigonometric equation usually has more than one solution in an interval,
because the graphs repeat. The calculator gives one angle, called the
**principal value**. The graphs then give the others.

For $0 \le \theta < 2\pi$:

- $\sin\theta = k$ has principal value $\arcsin k$ in the first or fourth
  quadrant. The second solution is $\pi - \arcsin k$ when $k > 0$, or
  $\pi + \arcsin k$ when $k < 0$.
- $\cos\theta = k$ has principal value $\arccos k$. The second solution is
  $2\pi - \arccos k$.
- $\tan\theta = k$ has period $\pi$, so the second solution in the interval is
  $\arctan k + \pi$.

A quick sketch of the curve between $0$ and $2\pi$ shows how many solutions to
expect. Sine and cosine each give two solutions for a value strictly between
$-1$ and $1$. Tangent gives two solutions over a full turn.

## 2. Worked examples

**Example 1.** Solve $\sin\theta = \dfrac{1}{2}$ for $0 \le \theta < 2\pi$.

One angle with sine $\dfrac{1}{2}$ is $\dfrac{\pi}{6}$. The other is

$$
\pi - \frac{\pi}{6} = \frac{5\pi}{6}.
$$

The solutions are $\theta = \dfrac{\pi}{6}$ and $\theta = \dfrac{5\pi}{6}$.

**Example 2.** Solve $\cos\theta = -\dfrac{\sqrt{3}}{2}$ for
$0 \le \theta < 2\pi$.

The related acute angle is $\dfrac{\pi}{6}$, and cosine is negative in the
second and third quadrants. So

$$
\theta = \pi - \frac{\pi}{6} = \frac{5\pi}{6}
\quad \text{and} \quad
\theta = \pi + \frac{\pi}{6} = \frac{7\pi}{6}.
$$

**Example 3.** Solve $\tan\theta = 1$ for $0 \le \theta < 2\pi$.

The principal value is $\dfrac{\pi}{4}$. Tangent repeats every $\pi$, so the
second solution is $\dfrac{\pi}{4} + \pi = \dfrac{5\pi}{4}$.

## 3. A multiple angle

When the equation involves $2\theta$, solve first for the whole angle $2\theta$,
then divide at the end. Change the interval for $2\theta$ at the same time.

**Example 4.** Solve $\sin 2\theta = \dfrac{1}{2}$ for $0 \le \theta < 2\pi$.

Let $x = 2\theta$. Since $0 \le \theta < 2\pi$, the interval for $x$ is
$0 \le x < 4\pi$. The equation $\sin x = \dfrac{1}{2}$ has solutions
$\dfrac{\pi}{6}$ and $\dfrac{5\pi}{6}$ in the first turn, and two more in the
second turn:

$$
x = \frac{\pi}{6}, \quad \frac{5\pi}{6}, \quad \frac{13\pi}{6}, \quad \frac{17\pi}{6}.
$$

Divide each by $2$:

$$
\theta = \frac{\pi}{12}, \quad \frac{5\pi}{12}, \quad \frac{13\pi}{12}, \quad \frac{17\pi}{12}.
$$

## 4. A quadratic in a trigonometric function

Some equations are quadratics once you treat $\sin\theta$ as the unknown.

**Example 5.** Solve $2\sin^2\theta - \sin\theta - 1 = 0$ for
$0 \le \theta < 2\pi$.

Factorise:

$$
(2\sin\theta + 1)(\sin\theta - 1) = 0.
$$

So $\sin\theta = -\dfrac{1}{2}$ or $\sin\theta = 1$.

For $\sin\theta = -\dfrac{1}{2}$, the related acute angle is $\dfrac{\pi}{6}$,
and sine is negative in the third and fourth quadrants:

$$
\theta = \pi + \frac{\pi}{6} = \frac{7\pi}{6}
\quad \text{and} \quad
\theta = 2\pi - \frac{\pi}{6} = \frac{11\pi}{6}.
$$

For $\sin\theta = 1$, the only solution in the interval is
$\theta = \dfrac{\pi}{2}$.

The solutions are $\dfrac{\pi}{2}$, $\dfrac{7\pi}{6}$ and
$\dfrac{11\pi}{6}$.

> **Watch out.** Three mistakes are common when solving these equations.
>
> **Stopping at the principal value.** The calculator gives one angle. In a full
> turn, sine and cosine usually give a second angle, and tangent gives a second.
> Sketch the curve or use the CAST diagram to find every solution in the
> interval.
>
> **Dividing by a trigonometric function.** From an equation such as
> $\sin\theta\cos\theta = \sin\theta$, dividing by $\sin\theta$ removes the
> solutions where $\sin\theta = 0$. Factorise instead:
> $\sin\theta(\cos\theta - 1) = 0$.
>
> **Forgetting to change the interval for a multiple angle.** If
> $0 \le \theta < 2\pi$ and the equation uses $2\theta$, then $2\theta$ runs from
> $0$ to $4\pi$, which is two full turns. Missing the second turn loses half the
> solutions. **Re-check:** count the solutions your sketch predicts, and confirm
> that your list has that many.

## You should now be able to

- find the principal value of a trigonometric equation;
- find every solution in a stated interval using the graph or the CAST diagram;
- solve an equation in a multiple angle by changing the interval;
- solve a quadratic in sine or cosine;
- factorise rather than divide when a common trigonometric factor appears;
- count the expected number of solutions before you start.
