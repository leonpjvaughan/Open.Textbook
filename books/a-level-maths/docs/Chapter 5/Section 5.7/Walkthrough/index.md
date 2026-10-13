---
title: 5.7 Trigonometric identities — Learn
chapter: 5
chapter_title: Trigonometry
section: '5.7'
section_title: Trigonometric identities
refs:
- E5
kind: walkthrough
---

# 5.7 Trigonometric identities — Learn

**Prerequisites:** the definitions of sine, cosine and tangent; the exact values;
the reciprocal functions.

**By the end of this section you can:** state the two basic trigonometric
identities; derive the two reciprocal identities from them; prove a simple
identity by working on one side.

## 1. The two basic identities

Two statements are true for every angle. They are **identities**, not equations,
and the identity sign is often written $\equiv$ to make that clear.

$$
\sin^2\theta + \cos^2\theta \equiv 1
$$

This is Pythagoras' theorem on the unit circle: the point $(\cos\theta,
\sin\theta)$ is always distance $1$ from the origin.

$$
\tan\theta \equiv \frac{\sin\theta}{\cos\theta}
$$

This is the definition of tangent as opposite over adjacent.

The notation $\sin^2\theta$ means $(\sin\theta)^2$. It is the square of the
sine, not the sine of a square.

## 2. The reciprocal identities

Divide the first identity by $\cos^2\theta$:

$$
\frac{\sin^2\theta}{\cos^2\theta} + 1 = \frac{1}{\cos^2\theta},
$$

which is

$$
\tan^2\theta + 1 \equiv \sec^2\theta.
$$

Divide the first identity by $\sin^2\theta$ instead:

$$
1 + \frac{\cos^2\theta}{\sin^2\theta} = \frac{1}{\sin^2\theta},
$$

which is

$$
1 + \cot^2\theta \equiv \operatorname{cosec}^2\theta.
$$

## 3. Proving an identity

To prove an identity, start with one side and change it, step by step, until it
looks like the other side. Keep a chain of equals signs down the page. Do not
move terms from one side to the other, because that assumes the result you are
trying to prove.

A useful order of attack:

1. Write everything in terms of sine and cosine.
2. Combine fractions over a common denominator.
3. Use $\sin^2\theta + \cos^2\theta = 1$ to simplify.
4. Factorise if a common factor appears.

**Example 1.** Prove that
$\dfrac{1 - \cos^2\theta}{\sin\theta} \equiv \sin\theta$ for
$\sin\theta \neq 0$.

Start with the left-hand side and replace $1 - \cos^2\theta$ using
$\sin^2\theta + \cos^2\theta = 1$:

$$
\frac{1 - \cos^2\theta}{\sin\theta}
= \frac{\sin^2\theta}{\sin\theta}
= \sin\theta.
$$

The left-hand side becomes the right-hand side, so the identity is proved.

**Example 2.** Prove that $\tan\theta\cos\theta \equiv \sin\theta$ for
$\cos\theta \neq 0$.

Replace tangent with sine over cosine:

$$
\tan\theta\cos\theta
= \frac{\sin\theta}{\cos\theta} \times \cos\theta
= \sin\theta.
$$

**Example 3.** Prove that
$(\sin\theta + \cos\theta)^2 \equiv 1 + 2\sin\theta\cos\theta$.

Expand the square:

$$
(\sin\theta + \cos\theta)^2
= \sin^2\theta + 2\sin\theta\cos\theta + \cos^2\theta.
$$

Group the two squares and use the first identity:

$$
= (\sin^2\theta + \cos^2\theta) + 2\sin\theta\cos\theta
= 1 + 2\sin\theta\cos\theta.
$$

> **Watch out.** Two mistakes are common when proving identities.
>
> **Working on both sides at once.** Moving terms across the equals sign assumes
> the identity is already true. Start from one side, usually the more
> complicated one, and keep the other side untouched until the last line.
>
> **Cross-multiplying to "simplify".** Multiplying both sides by a factor that
> could be zero is not allowed. An identity such as
> $\dfrac{\sin\theta}{\cos\theta} \equiv \tan\theta$ is defined only where
> $\cos\theta \neq 0$. **Re-check:** finish with the left-hand side exactly equal
> to the right-hand side, and note any value of $\theta$ where a denominator
> vanishes.

## You should now be able to

- state $\sin^2\theta + \cos^2\theta \equiv 1$ and
  $\tan\theta \equiv \dfrac{\sin\theta}{\cos\theta}$;
- derive $\sec^2\theta \equiv 1 + \tan^2\theta$ and
  $\operatorname{cosec}^2\theta \equiv 1 + \cot^2\theta$;
- prove a simple identity by changing one side only;
- convert a mixed expression into sines and cosines as a first move;
- note where a denominator vanishes.
