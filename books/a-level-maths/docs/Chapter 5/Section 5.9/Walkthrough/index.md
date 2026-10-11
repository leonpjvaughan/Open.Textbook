---
title: 5.9 The forms r cos(theta +/- alpha) and r sin(theta +/- alpha) — Learn
chapter: 5
chapter_title: Trigonometry
section: '5.9'
section_title: The forms r cos(theta +/- alpha) and r sin(theta +/- alpha)
dfe:
- E6
kind: walkthrough
---

# 5.9 The forms r cos(theta +/- alpha) and r sin(theta +/- alpha) — Learn

**Prerequisites:** the addition formulae; exact values; solving a simple
trigonometric equation; Pythagoras' theorem.

**By the end of this section you can:** write $a\cos\theta + b\sin\theta$ as a
single cosine or sine; find its greatest and least values; use the form to solve
an equation.

## 1. One wave from two

A sum of a cosine and a sine of the same angle is itself a single wave. For
constants $a$ and $b$,

$$
a\cos\theta + b\sin\theta \equiv R\cos(\theta - \alpha),
$$

where

$$
R = \sqrt{a^2 + b^2}, \qquad \tan\alpha = \frac{b}{a}.
$$

The value of $R$ comes from expanding the right-hand side with the addition
formula:

$$
R\cos(\theta - \alpha) = R\cos\theta\cos\alpha + R\sin\theta\sin\alpha.
$$

Matching this with $a\cos\theta + b\sin\theta$ gives

$$
a = R\cos\alpha, \qquad b = R\sin\alpha.
$$

Squaring and adding these two equations gives $a^2 + b^2 = R^2$, so
$R = \sqrt{a^2 + b^2}$. Dividing the second by the first gives
$\tan\alpha = \dfrac{b}{a}$.

The angle $\alpha$ must lie in the quadrant where $\cos\alpha$ has the sign of
$a$ and $\sin\alpha$ has the sign of $b$. The single value returned by
$\arctan$ is not always the right one, so check the signs of $a$ and $b$.

You can also write the same sum as a shifted sine:

$$
a\cos\theta + b\sin\theta \equiv R\sin(\theta + \beta),
$$

where $R = \sqrt{a^2 + b^2}$ and $\sin\beta = \dfrac{a}{R}$,
$\cos\beta = \dfrac{b}{R}$.

## 2. The greatest and least values

Because a cosine lies between $-1$ and $1$,

$$
-R \le R\cos(\theta - \alpha) \le R.
$$

So the greatest value of $a\cos\theta + b\sin\theta$ is $R$, and the least value
is $-R$. This is useful in modelling: the single number $R$ gives the peak of
the quantity without drawing a graph.

**Example 1.** Write $3\cos\theta + 4\sin\theta$ in the form
$R\cos(\theta - \alpha)$, where $\alpha$ is an acute angle.

$$
R = \sqrt{3^2 + 4^2} = \sqrt{25} = 5.
$$

$$
\tan\alpha = \frac{4}{3}, \qquad \alpha \approx 0.9273 \text{ radians}.
$$

Both $3$ and $4$ are positive, so $\alpha$ is acute and the angle from the
calculator is correct. Therefore

$$
3\cos\theta + 4\sin\theta = 5\cos(\theta - 0.9273).
$$

The greatest value is $5$ and the least is $-5$.

**Example 2.** Write $-\cos\theta + \sqrt{3}\sin\theta$ in the form
$R\cos(\theta - \alpha)$.

$$
R = \sqrt{(-1)^2 + (\sqrt{3})^2} = \sqrt{4} = 2.
$$

Here $a = -1$ and $b = \sqrt{3}$. The angle $\alpha$ must have a negative cosine
and a positive sine, so it lies in the second quadrant. The related acute angle
is $\arctan(\sqrt{3}) = \dfrac{\pi}{3}$, so

$$
\alpha = \pi - \frac{\pi}{3} = \frac{2\pi}{3}.
$$

Therefore

$$
-\cos\theta + \sqrt{3}\sin\theta = 2\cos\left(\theta - \frac{2\pi}{3}\right).
$$

## 3. Solving an equation with the single-wave form

The single-wave form turns $a\cos\theta + b\sin\theta = c$ into one cosine
equation, which is much easier to solve.

**Example 3.** Solve $3\cos\theta + 4\sin\theta = 2$ for $0 \le \theta < 2\pi$.

From Example 1, the left-hand side is $5\cos(\theta - 0.9273)$. So

$$
5\cos(\theta - 0.9273) = 2, \qquad
\cos(\theta - 0.9273) = 0.4.
$$

The principal value is $\cos^{-1}(0.4) \approx 1.1593$ radians. Cosine is also
positive at the negative of this angle, so

$$
\theta - 0.9273 \approx 1.1593 \quad \text{or} \quad \theta - 0.9273 \approx -1.1593.
$$

$$
\theta \approx 2.0866 \quad \text{or} \quad \theta \approx -0.2320.
$$

Only the first lies in $0 \le \theta < 2\pi$. The second is negative, so add
$2\pi$:

$$
\theta \approx -0.2320 + 6.2832 = 6.0512.
$$

The solutions are $\theta \approx 2.087$ and $\theta \approx 6.051$.

## 4. Try it: the single-wave explorer

**Predict first.** You will change $a$ and $b$ in $a\cos\theta + b\sin\theta$.
Before you touch the controls, predict what the greatest value becomes when
$a = 3$ and $b = 4$, and whether changing the sign of $b$ moves the peak left or
right. Write both predictions down.

:::figure ch5-r-form

**Test.** Move the sliders and watch the sum wave. Compare the peak height with
the value of $R$ in the readout. Set $a = 0$ and check that the result is a pure
sine wave.

**Explain.** Write two sentences. The first explains why the peak height depends
on both $a$ and $b$ through $R = \sqrt{a^2 + b^2}$. The second explains why the
peak slides along the $\theta$-axis when $b$ changes.

> **Watch out.** Two mistakes are common with the single-wave form.
>
> **Using the wrong quadrant for $\alpha$.** The calculator gives one angle for
> $\tan\alpha = \dfrac{b}{a}$. If $a$ is negative, the true $\alpha$ is in the
> second or third quadrant, not the one a calculator returns by default. Check
> the signs of $a$ and $b$ and adjust $\alpha$ by $\pi$ when needed.
>
> **Mixing up the forms.** In $R\cos(\theta - \alpha)$, the matching gives
> $a = R\cos\alpha$ and $b = R\sin\alpha$. In $R\sin(\theta + \beta)$ the roles
> swap. Decide which form the question asks for before you match coefficients.
>
> **Re-check:** expand your answer with the addition formula and confirm that
> the coefficients of $\cos\theta$ and $\sin\theta$ match the original $a$ and
> $b$.

## Progress check

Return to the chapter problem. The tide height is
$h = 12\cos\theta + 5\sin\theta$ metres.

1. Write $h$ in the form $R\cos(\theta - \alpha)$.
2. State the greatest height the water reaches.
3. Explain why the greatest height is not $12 + 5 = 17$ m.

## You should now be able to

- write $a\cos\theta + b\sin\theta$ as $R\cos(\theta - \alpha)$ or
  $R\sin(\theta + \beta)$;
- find $R$ and $\alpha$, choosing the correct quadrant for $\alpha$;
- state the greatest and least values of the sum;
- solve an equation by reducing it to a single cosine or sine;
- check the form by expanding it again.
