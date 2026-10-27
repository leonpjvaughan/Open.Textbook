---
title: 7.3 Differentiating x^n, e^kx, a^kx, sin kx, cos kx, tan kx and ln x — Learn
chapter: 7
chapter_title: Differentiation
section: '7.3'
section_title: Differentiating x^n, e^kx, a^kx, sin kx, cos kx, tan kx and ln x
refs:
- G2
kind: walkthrough
---

# 7.3 Differentiating powers, exponentials, trigonometric functions and logarithms — Learn

**Prerequisites:** the laws of indices for rational exponents; the derivative as a
limit from Section 7.2; the graphs of $e^x$ and $\ln x$ from Chapter 6; the
trigonometric functions from Chapter 5.

**By the end of this section you can:** differentiate $x^n$ for any rational $n$;
differentiate a constant multiple, a sum and a difference of such terms;
differentiate $e^{kx}$, $a^{kx}$, $\sin kx$, $\cos kx$, $\tan kx$ and
$\ln x$; and choose the right rule for a given expression.

## 1. The power rule

For any rational number $n$, the derivative of $x^n$ is

$$
\frac{d}{dx}\left(x^n\right) = n x^{n-1}.
$$

Multiply by the old power, then reduce the power by one. The rule holds for
whole numbers, fractions and negative numbers.

**Example 1.** Differentiate $y = x^4$.

Multiply by $4$ and reduce the power: $\dfrac{dy}{dx} = 4x^3$.

**Example 2.** Differentiate $y = \sqrt{x}$.

Write the root as a power: $y = x^{1/2}$. Then

$$
\frac{dy}{dx} = \tfrac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}.
$$

**Example 3.** Differentiate $y = \dfrac{1}{x}$.

Write the fraction as a power: $y = x^{-1}$. Then

$$
\frac{dy}{dx} = -1x^{-2} = -\frac{1}{x^2}.
$$

The derivative is negative everywhere, so the curve falls on each side of the
break at $x = 0$.

A constant multiple, a sum and a difference are differentiated term by term:

$$
\frac{d}{dx}\left(ax^n + bx^m\right) = anx^{n-1} + bmx^{m-1}.
$$

Here $\frac{d}{dx}$ means the derivative with respect to $x$, and $a$ and $b$
are constants with $m$ a rational power.

**Example 4.** Differentiate $y = 4x^3 - 6x + \dfrac{1}{x}$.

Rewrite $\dfrac{1}{x}$ as $x^{-1}$ and differentiate each term:

$$
\frac{dy}{dx} = 12x^2 - 6 - x^{-2} = 12x^2 - 6 - \frac{1}{x^2}.
$$

**Example 5.** Differentiate $y = 2x^{3/2} + \dfrac{3}{x^2}$.

Rewrite $\dfrac{3}{x^2}$ as $3x^{-2}$. Then

$$
\frac{dy}{dx} = 2 \times \tfrac{3}{2}x^{1/2} - 6x^{-3} = 3x^{1/2} - \frac{6}{x^3} = 3\sqrt{x} - \frac{6}{x^3}.
$$

## 2. Exponential functions

For a constant $k$,

$$
\frac{d}{dx}\left(e^{kx}\right) = k e^{kx}.
$$

The exponential function is special because its derivative has the same shape as
the function itself. The constant $k$ appears in front. When $k = 1$ the
derivative of $e^x$ is $e^x$.

For a positive base $a$,

$$
\frac{d}{dx}\left(a^{kx}\right) = k a^{kx}\ln a.
$$

The factor $\ln a$ appears because $a^{kx} = e^{kx\ln a}$.

**Example 6.** Differentiate $y = 5e^{3x} - 2e^{-x}$.

$$
\frac{dy}{dx} = 5 \times 3e^{3x} - 2 \times (-1)e^{-x} = 15e^{3x} + 2e^{-x}.
$$

**Example 7.** Differentiate $y = 2^x$.

Here $a = 2$ and $k = 1$, so

$$
\frac{dy}{dx} = 2^x \ln 2.
$$

## 3. Trigonometric functions

For a constant $k$,

$$
\frac{d}{dx}\left(\sin kx\right) = k\cos kx,
\qquad
\frac{d}{dx}\left(\cos kx\right) = -k\sin kx.
$$

The derivative of sine is cosine. The derivative of cosine is minus sine, so
the minus sign often goes missing.

The tangent has its own result:

$$
\frac{d}{dx}\left(\tan kx\right) = \frac{k}{\cos^2 kx} = k\sec^2 kx.
$$

**Example 8.** Differentiate $y = 3\sin 2x - 4\cos x$.

$$
\frac{dy}{dx} = 3 \times 2\cos 2x - 4 \times (-\sin x) = 6\cos 2x + 4\sin x.
$$

**Example 9.** Differentiate $y = \tan 3x$.

$$
\frac{dy}{dx} = 3\sec^2 3x = \frac{3}{\cos^2 3x}.
$$

## 4. The natural logarithm

For $x > 0$,

$$
\frac{d}{dx}\left(\ln x\right) = \frac{1}{x}.
$$

The rule also works for $\ln kx$ when $k > 0$, because
$\ln kx = \ln k + \ln x$ and $\ln k$ is a constant. So

$$
\frac{d}{dx}\left(\ln 5x\right) = \frac{1}{x}.
$$

**Example 10.** Differentiate $y = 4\ln x - \ln 3x$.

The first term gives $\dfrac{4}{x}$, and the second gives $\dfrac{1}{x}$:

$$
\frac{dy}{dx} = \frac{4}{x} - \frac{1}{x} = \frac{3}{x}.
$$

## 5. Try it: the power rule explorer

**Predict first.** The figure shows $y = x^n$ with a slider for $n$ and a point
you can move. Before you touch the controls, predict the gradient at $x = 1$ for
$n = 3$, and predict whether the gradient at $x = 1$ is larger or smaller when
$n = 5$. Write both predictions down.

:::figure ch7-power-rule

**Test.** Set $n = 3$ and move the point to $x = 1$. Read the gradient. Change
$n$ to $5$ and read it again. Then set $n = 0.5$ and check the gradient at
$x = 1$ and at $x = 4$.

**Explain.** Write two sentences. The first explains why the gradient at $x = 1$
equals $n$ for every curve $y = x^n$. The second explains why a curve with a
negative power $n$ has a negative gradient.

> **Watch out.** These mistakes are common.
>
> **Increasing the power instead of reducing it.** The power rule is
> $x^n \to n x^{n-1}$. The power goes down by one. Writing $n x^{n+1}$ is a
> different function.
>
> **Forgetting the constant in front of an exponential.** The derivative of
> $e^{3x}$ is $3e^{3x}$, not $e^{3x}$. The chain rule, met formally in Section
> 7.7, is what produces the $3$.
>
> **Dropping the minus sign on cosine.** The derivative of $\cos kx$ is
> $-k\sin kx$. Check the sign with $k = 1$ at $x = 0$: the curve $y = \cos x$ is
> falling there, so its gradient must be negative.
>
> **Treating $\ln x$ as a power.** The derivative of $\ln x$ is $\dfrac{1}{x}$,
> which is not $x^0$ or $0$. **Re-check:** differentiate $x$, $x^0$ and
> $\ln x$ separately and confirm that only the first gives $1$.

## Progress check

Return to the box in the chapter problem. Its volume is
$V = x(16 - 2x)(10 - 2x)$.

1. Expand the brackets to write $V$ as a cubic in $x$.
2. Differentiate $V$ with the power rule.
3. Setting $\dfrac{dV}{dx} = 0$ gives a quadratic. Write that quadratic down.

The next sections find the value of $x$ and prove that it gives the greatest
volume.

## You should now be able to

- differentiate $x^n$ for any rational $n$;
- differentiate a constant multiple, a sum and a difference;
- rewrite a root or a fraction as a power before differentiating;
- differentiate $e^{kx}$ and $a^{kx}$;
- differentiate $\sin kx$, $\cos kx$ and $\tan kx$, keeping the constant $k$ and
  the minus sign;
- differentiate $\ln x$ and $\ln kx$;
- choose the correct standard result for a given expression.
