---
title: 5.6 Secant, cosecant, cotangent and the inverse trigonometric functions — Learn
chapter: 5
chapter_title: Trigonometry
section: '5.6'
section_title: Secant, cosecant, cotangent and the inverse trigonometric functions
refs:
- E4
kind: walkthrough
---

# 5.6 Secant, cosecant, cotangent and the inverse trigonometric functions — Learn

**Prerequisites:** the graphs of sine, cosine and tangent; the identity
$\sin^2\theta + \cos^2\theta = 1$; finding an angle from a known ratio.

**By the end of this section you can:** define secant, cosecant and cotangent;
use the identities that link them to tangent; name the domain restrictions;
find an angle with an inverse trigonometric function and give the principal
value.

## 1. Three new functions

Each of the three new functions is the reciprocal of one you already know.

$$
\sec\theta = \frac{1}{\cos\theta}, \qquad
\operatorname{cosec}\theta = \frac{1}{\sin\theta}, \qquad
\cot\theta = \frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}.
$$

The names come from the geometry of a circle, but the definitions above are all
you need.

Each function is undefined where its denominator is zero:

- $\sec\theta$ is undefined where $\cos\theta = 0$, that is at
  $\theta = \dfrac{\pi}{2}$, $\dfrac{3\pi}{2}$ and so on;
- $\operatorname{cosec}\theta$ is undefined where $\sin\theta = 0$, that is at
  multiples of $\pi$;
- $\cot\theta$ is undefined where $\tan\theta = 0$, also at multiples of
  $\pi$.

The graph of $y = \sec x$ has a minimum value of $1$ and a maximum value of
$-1$, with branches that curve away towards the asymptotes. It never takes a
value between $-1$ and $1$.

## 2. Two identities

Divide $\sin^2\theta + \cos^2\theta = 1$ by $\cos^2\theta$:

$$
\tan^2\theta + 1 = \sec^2\theta.
$$

Divide the same identity by $\sin^2\theta$:

$$
1 + \cot^2\theta = \operatorname{cosec}^2\theta.
$$

These two identities are the ones to reach for when a question mixes a
reciprocal function with a squared term.

**Example 1.** Simplify $\sec^2\theta - \tan^2\theta$.

From the first identity, $\sec^2\theta = 1 + \tan^2\theta$. Therefore

$$
\sec^2\theta - \tan^2\theta = (1 + \tan^2\theta) - \tan^2\theta = 1.
$$

**Example 2.** Given that $\sin\theta = \dfrac{3}{5}$ and $\theta$ is acute,
find $\cos\theta$, $\sec\theta$, $\operatorname{cosec}\theta$ and
$\cot\theta$.

Use $\cos^2\theta = 1 - \sin^2\theta = 1 - \dfrac{9}{25} = \dfrac{16}{25}$. Since
$\theta$ is acute, $\cos\theta$ is positive:

$$
\cos\theta = \frac{4}{5}.
$$

Then

$$
\sec\theta = \frac{1}{\cos\theta} = \frac{5}{4}, \qquad
\operatorname{cosec}\theta = \frac{1}{\sin\theta} = \frac{5}{3}, \qquad
\cot\theta = \frac{\cos\theta}{\sin\theta} = \frac{4}{3}.
$$

## 3. Inverse trigonometric functions

The inverse function of sine is written $\arcsin$, or $\sin^{-1}$. It answers
the question "which angle has this sine?". The output is an angle.

$$
\arcsin(0.5) = \frac{\pi}{6}, \qquad
\arccos(0.5) = \frac{\pi}{3}, \qquad
\arctan(1) = \frac{\pi}{4}.
$$

Each inverse function has a **principal range**, the interval of angles it
returns:

| Function | Principal range |
|---|---|
| $\arcsin x$ | $-\dfrac{\pi}{2} \le \arcsin x \le \dfrac{\pi}{2}$ |
| $\arccos x$ | $0 \le \arccos x \le \pi$ |
| $\arctan x$ | $-\dfrac{\pi}{2} < \arctan x < \dfrac{\pi}{2}$ |

The principal range restricts the answer to one angle. Section 5.10 shows how to
find all the other angles that share the same value.

> **Watch out.** Three mistakes are common with these functions.
>
> **Reading $\sin^{-1}$ as a reciprocal.** The notation $\sin^{-1}\theta$ means
> $\arcsin\theta$, the inverse function, not $\dfrac{1}{\sin\theta}$. The
> reciprocal is $\operatorname{cosec}\theta$. Write $\arcsin$ when you mean the
> inverse, and the confusion disappears.
>
> **Forgetting the domain.** The cosecant, secant and cotangent have holes in
> their domains. At $\theta = 0$, for example, $\operatorname{cosec}\theta$ and
> $\cot\theta$ are both undefined, because $\sin\theta = 0$.
>
> **Losing the sign when you find cosine.** From $\sin^2\theta + \cos^2\theta = 1$
> you get $\cos\theta = \pm\sqrt{1 - \sin^2\theta}$. The quadrant decides the
> sign. **Re-check:** if the question says acute, take the positive root; if it
> names another quadrant, test the sign against the CAST table.

## You should now be able to

- define secant, cosecant and cotangent as reciprocals;
- state where each is undefined;
- use $\sec^2\theta = 1 + \tan^2\theta$ and
  $\operatorname{cosec}^2\theta = 1 + \cot^2\theta$;
- find the other ratios from one known ratio and the quadrant;
- use $\arcsin$, $\arccos$ and $\arctan$ and give the principal value;
- explain the difference between $\sin^{-1}\theta$ and
  $(\sin\theta)^{-1}$.
