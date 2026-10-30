---
title: 7.2 Differentiating powers and polynomials — Learn
chapter: 7
chapter_title: Differentiation
section: '7.2'
section_title: Differentiating powers and polynomials
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 7.2 Differentiating powers and polynomials — Learn

**Prerequisites:** Section 7.1 — the derivative from first principles; the rules of indices.

**Objectives:** use the power rule for any power; differentiate a constant, a constant
multiple and a sum; rewrite roots and fractions as powers before differentiating.

By the end of this section you can differentiate any polynomial quickly, without going back
to first principles.

## The power rule

Differentiating $x^2$ and $x^3$ from first principles gave $2x$ and $3x^2$. The pattern is
clear: multiply by the old power, then reduce the power by one.

> **The power rule.** For any real number $n$,
>
>
> $$\frac{d}{dx}\left(x^n\right) = nx^{n-1}.$$

The symbol $\frac{d}{dx}$ means the derivative with respect to $x$: the instruction to
differentiate whatever follows it.

**Example 1.** Differentiate $y = x^7$.

$$\frac{dy}{dx} = 7x^{7 - 1} = 7x^6$$

**Example 2.** Differentiate $y = x$.

Here $n = 1$, so $\dfrac{dy}{dx} = 1x^0 = 1$. The gradient of the line $y = x$ is $1$.

## Constants and constant multiples

A constant function $c$ does not change, so its rate of change is zero.

$$\frac{d}{dx}(c) = 0$$

A constant multiplying a function $f(x)$ stays in front.

$$\frac{d}{dx}\left(c\,f(x)\right) = c\,f'(x)$$

**Example 3.** Differentiate $y = 5x^4$.

$$\frac{dy}{dx} = 5 \times 4x^3 = 20x^3$$

## Sums and differences

Differentiate a sum or difference of two functions $f(x)$ and $g(x)$ term by term. This is
the rule that makes polynomials quick.

$$\frac{d}{dx}\left(f(x) \pm g(x)\right) = f'(x) \pm g'(x)$$

**Example 4.** Differentiate $y = 3x^2 - 4x + 7$.

$$\frac{dy}{dx} = 6x - 4 + 0 = 6x - 4$$

The derivative of the constant $7$ is zero. The derivative of $-4x$ is $-4$, because
$\dfrac{d}{dx}(x) = 1$.

**Example 5.** Differentiate $y = 2x^3 + x$.

$$\frac{dy}{dx} = 6x^2 + 1$$

## Negative and fractional powers

The power rule works for every power, not only whole numbers. Rewrite a root or a fraction
as a power first.

**Example 6.** Differentiate $y = \dfrac{1}{x^2}$.

Write $y = x^{-2}$, then

$$\frac{dy}{dx} = -2x^{-2 - 1} = -2x^{-3} = -\frac{2}{x^3}.$$

**Example 7.** Differentiate $y = \sqrt{x}$.

Write $y = x^{1/2}$, then

$$\frac{dy}{dx} = \tfrac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}.$$

> **Watch out.** Two mistakes are common. First, the power rule reduces the power by one, so
> $x^7$ gives $7x^6$, not $7x^7$. Second, the derivative of a constant is zero, so the
> constant term disappears. Writing $7$ instead of $0$ is the most frequent slip on a
> polynomial. Differentiate the $x$-terms and drop the constant.

## Progress check

Back to the chapter problem. The tank volume is $V(t) = 12t^2 - t^3$ litres.

Differentiate term by term to find $V'(t)$, then work out $V'(4)$. Compare the exact value
with the estimate you made in Section 7.1.

Keep $V'(t) = 24t - 3t^2$. Sections 7.3 and 7.4 reach the same rate in other ways, and
Section 7.8 uses it to find when the tank fills fastest.

## You should now be able to

- state and use the power rule $\dfrac{d}{dx}\left(x^n\right) = nx^{n-1}$;
- differentiate a constant, a constant multiple, a sum and a difference;
- rewrite a root or a fraction as a power before differentiating;
- differentiate a polynomial term by term, and drop the constant term.
