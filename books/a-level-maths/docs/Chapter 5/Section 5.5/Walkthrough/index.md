---
title: 5.5 Small-angle approximations — Learn
chapter: 5
chapter_title: Trigonometry
section: '5.5'
section_title: Small-angle approximations
refs:
- E2
kind: walkthrough
---

# 5.5 Small-angle approximations — Learn

**Prerequisites:** radian measure; the graphs of sine, cosine and tangent; the
idea of an approximation and its error.

**By the end of this section you can:** state the small-angle approximations for
sine, cosine and tangent; use them to estimate a value; say when the
approximation is too rough to trust.

## 1. Approximating near zero

When an angle $\theta$ is measured in radians and is close to $0$, the three
trigonometric functions are almost the same as three simple expressions:

$$
\sin\theta \approx \theta, \qquad
\tan\theta \approx \theta, \qquad
\cos\theta \approx 1 - \frac{\theta^2}{2}.
$$

You can see why from the graphs. Near the origin the curve $y = \sin\theta$ is
almost a straight line through the origin with gradient $1$, so $\sin\theta$ is
almost $\theta$. The tangent curve has the same gradient there. The cosine curve
is flat at its peak, so it is almost $1$, with a small quadratic correction.

The approximations are only valid in **radians**. In degrees the number for
$\theta$ is about $57$ times larger, and the approximations fail.

**Example 1.** Use a small-angle approximation to estimate $\sin 0.1$ and
$\cos 0.1$.

$$
\sin 0.1 \approx 0.1.
$$

$$
\cos 0.1 \approx 1 - \frac{0.1^2}{2} = 1 - 0.005 = 0.995.
$$

A calculator gives $\sin 0.1 \approx 0.09983$ and $\cos 0.1 \approx 0.99500$.
Both estimates are close.

**Example 2.** A pendulum of length $L$ swings through a small angle $\theta$.
The horizontal displacement of the bob is approximately

$$
x = L\sin\theta \approx L\theta.
$$

For $L = 0.8$ m and $\theta = 0.05$ radians,

$$
x \approx 0.8 \times 0.05 = 0.04 \text{ m}.
$$

## 2. How small is small

The size of the error grows quickly with the angle.

| $\theta$ | $0.05$ | $0.1$ | $0.2$ | $0.5$ |
|---|---|---|---|---|
| $\sin\theta$ | $0.04998$ | $0.09983$ | $0.19867$ | $0.47943$ |
| $\theta$ | $0.05$ | $0.1$ | $0.2$ | $0.5$ |
| error | $0.00002$ | $0.00017$ | $0.00133$ | $0.02057$ |

At $\theta = 0.2$ radians, about $11.5^\circ$, the error in $\sin\theta$ is
already about $0.7\%$. At half a radian, about $28.6^\circ$, it is about $4\%$.
Engineers often keep $\theta$ below about $0.2$ radians when the approximation
must be accurate to three decimal places.

The cosine approximation is a better fit over the same range, because the first
correction is quadratic.

> **Watch out.** Three mistakes are common with small angles.
>
> **Using degrees.** The approximation $\sin\theta \approx \theta$ is only true
> in radians. If $\theta = 5^\circ$ and you write $\sin 5^\circ \approx 5$, the
> answer is far too large. Convert first: $5^\circ \approx 0.087$ radians.
>
> **Approximating cosine by $1$.** Near zero this is close, but the useful
> approximation keeps the quadratic term: $\cos\theta \approx 1 -
> \dfrac{\theta^2}{2}$. Dropping the term loses the whole reason the cosine is
> not exactly flat.
>
> **Forgetting the error.** The approximation is not an identity. State the
> range of angles where it is used, and quote the approximate answer as an
> approximation. **Re-check:** substitute one angle from the table and confirm
> that the error is small, then try an angle near $0.5$ and watch it grow.

## You should now be able to

- state $\sin\theta \approx \theta$, $\tan\theta \approx \theta$ and
  $\cos\theta \approx 1 - \dfrac{\theta^2}{2}$ for small angles in radians;
- use them to estimate a value without a calculator;
- explain why the approximations need radians;
- say roughly how small an angle must be for a given accuracy;
- use a small-angle approximation in a simple model.
