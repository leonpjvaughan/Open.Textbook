---
title: 12.9 Solving trigonometric equations — Learn
chapter: 12
chapter_title: Trigonometry
section: '12.9'
section_title: Solving trigonometric equations
tier: H
refs:
- '2.3'
kind: walkthrough
---

# 12.9 Solving trigonometric equations — Learn

**Prerequisites:** Section 12.4 — the unit circle and the signs in each quadrant;
Section 12.5 — the graphs; Section 12.8 — the identities.

**Objectives:** solve an equation of the form $\sin\theta = k$, $\cos\theta = k$ or
$\tan\theta = k$; find every solution in a given range; solve an equation of the form
$\sin n\theta = k$; work in radians as well as degrees.

By the end of this section you can solve a trigonometric equation and give every
solution in the range the question asks for.

## One equation, many answers

A calculator gives one angle for a given sine. The equation usually has more than one
solution.

Take $\sin\theta = 0.5$. A calculator returns $\theta = 30^\circ$. But
$\sin 150^\circ$ is also $0.5$. The sine of an angle equals the sine of
$180^\circ$ minus that angle. Between $0^\circ$ and $360^\circ$ there are two solutions.

The unit circle shows why. The horizontal line $y = 0.5$ cuts the circle twice. Each
crossing is a solution, and the two points are mirror images in the $y$-axis.

So the work has two parts:

1. find the **reference angle**, the acute angle a calculator gives;
2. use the quadrant signs to write down every solution in the range.

## Solving $\sin\theta = k$

Let $\alpha$ be the acute angle with $\sin\alpha = |k|$.

- If $k$ is positive, the solutions in $0^\circ \le \theta \le 360^\circ$ are
  $\alpha$ and $180^\circ - \alpha$.
- If $k$ is negative, they are $180^\circ + \alpha$ and $360^\circ - \alpha$.

**Example 1.** Solve $\sin\theta = 0.5$ for $0^\circ \le \theta \le 360^\circ$.

The reference angle is $\sin^{-1}(0.5) = 30^\circ$. The value is positive, so the
solutions lie in the first and second quadrants.

$$\theta = 30^\circ \quad\text{or}\quad \theta = 180^\circ - 30^\circ = 150^\circ$$

Check: $\sin 30^\circ = 0.5$ and $\sin 150^\circ = 0.5$. Both work.

**Example 2.** Solve $\sin\theta = -0.5$ for $0^\circ \le \theta \le 360^\circ$.

The reference angle is still $30^\circ$. The value is negative, so the solutions lie in
the third and fourth quadrants.

$$\theta = 180^\circ + 30^\circ = 210^\circ \quad\text{or}\quad
\theta = 360^\circ - 30^\circ = 330^\circ$$

## Solving $\cos\theta = k$

For the cosine, the sign of $k$ decides the pair of quadrants.

- If $k$ is positive, the solutions are $\alpha$ and $360^\circ - \alpha$.
- If $k$ is negative, they are $180^\circ - \alpha$ and $180^\circ + \alpha$.

**Example 3.** Solve $\cos\theta = -0.5$ for $0^\circ \le \theta \le 360^\circ$.

The reference angle is $\cos^{-1}(0.5) = 60^\circ$. The value is negative, so the
solutions lie in the second and third quadrants.

$$\theta = 180^\circ - 60^\circ = 120^\circ \quad\text{or}\quad
\theta = 180^\circ + 60^\circ = 240^\circ$$

## Solving $\tan\theta = k$

The tangent has period $180^\circ$, not $360^\circ$. Once you have one solution, the next
one is $180^\circ$ further on.

**Example 4.** Solve $\tan\theta = 1$ for $0^\circ \le \theta \le 360^\circ$.

The reference angle is $\tan^{-1}(1) = 45^\circ$. Add the period:

$$\theta = 45^\circ \quad\text{or}\quad \theta = 45^\circ + 180^\circ = 225^\circ$$

## Equations of the form $\sin n\theta = k$

When the angle is multiplied by $n$, solve for $n\theta$ first. The range for $n\theta$
is $n$ times as wide, so there are more solutions.

**Example 5.** Solve $\cos 2\theta = 0.5$ for $0^\circ \le \theta \le 360^\circ$.

Let $x = 2\theta$. Then $0^\circ \le x \le 720^\circ$, and $\cos x = 0.5$.

The reference angle is $60^\circ$. The cosine is positive, so $x = 60^\circ$ or
$x = 360^\circ - 60^\circ = 300^\circ$. Add $360^\circ$ to each, because the range
reaches $720^\circ$:

$$x = 60^\circ,\ 300^\circ,\ 420^\circ,\ 660^\circ$$

Now divide by $2$ to return to $\theta$:

$$\theta = 30^\circ,\ 150^\circ,\ 210^\circ,\ 330^\circ$$

There are four solutions, because one full turn of $2\theta$ covers two full turns of
$\theta$.

## Working in radians

The method does not change when the angle is in radians. Use $\pi$ radians for
$180^\circ$, and write the range in radians.

**Example 6.** Solve $\sin\theta = 0.5$ for $0 \le \theta \le 2\pi$.

The reference angle is $\dfrac{\pi}{6}$. The sine is positive, so the solutions lie in
the first and second quadrants.

$$\theta = \frac{\pi}{6} \quad\text{or}\quad \theta = \pi - \frac{\pi}{6} = \frac{5\pi}{6}$$

**Example 7.** Solve $2\cos^2\theta + \sin\theta = 1$ for $0^\circ \le \theta \le 360^\circ$.

The equation has both a cosine and a sine, so it is not yet in a standard form. Use the
identity from Section 12.8, $\cos^2\theta = 1 - \sin^2\theta$, to leave only the sine:

$$2(1 - \sin^2\theta) + \sin\theta = 1$$

$$2 - 2\sin^2\theta + \sin\theta = 1$$

$$2\sin^2\theta - \sin\theta - 1 = 0$$

This is a quadratic in $\sin\theta$. Factorise it:

$$(2\sin\theta + 1)(\sin\theta - 1) = 0$$

So $\sin\theta = -\dfrac{1}{2}$ or $\sin\theta = 1$.

- For $\sin\theta = -\dfrac{1}{2}$, the reference angle is $30^\circ$, so
  $\theta = 210^\circ$ or $330^\circ$.
- For $\sin\theta = 1$, $\theta = 90^\circ$.

The solutions are $90^\circ$, $210^\circ$ and $330^\circ$.

> **Watch out.** The most common mistake is to write down only the calculator's answer.
> For $\sin\theta = 0.5$ a calculator gives $30^\circ$, and stopping there loses
> $150^\circ$. A trigonometric equation almost always has more than one solution in a
> full turn.
>
> **Re-check:** substitute every answer back into the original equation. Both
> $\sin 30^\circ$ and $\sin 150^\circ$ equal $0.5$, so both belong in the answer.

## Progress check

Back to the chapter problem. The depth of water over the sandbank is

$$d = 1.4 + 1.2\sin(30^\circ t)$$

metres, where $t$ is the number of hours after low water. The yacht floats once the depth
reaches $2.0$ m.

Set $d = 2.0$ and solve for $t$ between $0$ and $12$ hours:

$$1.4 + 1.2\sin(30^\circ t) = 2.0$$

$$1.2\sin(30^\circ t) = 0.6$$

$$\sin(30^\circ t) = 0.5$$

Let $x = 30^\circ t$, so $0^\circ \le x \le 360^\circ$. The reference angle is
$30^\circ$, and the sine is positive, so $x = 30^\circ$ or $x = 150^\circ$.

$$t = 1 \text{ hour} \quad\text{or}\quad t = 5 \text{ hours}$$

The depth passes $2.0$ m on the way up at $t = 1$ and on the way down at $t = 5$. The
yacht floats between those two times, around high water at $t = 3$ hours.

## You should now be able to

- explain why a trigonometric equation has more than one solution in a range;
- find the reference angle and use the quadrant signs to list every solution;
- solve an equation of the form $\sin n\theta = k$, $\cos n\theta = k$ or
  $\tan n\theta = k$;
- solve a trigonometric equation in radians;
- use an identity to turn a quadratic trigonometric equation into a quadratic;
- check each answer by substituting it back into the equation.
