---
title: 8.1 Antiderivatives — Learn
chapter: 8
chapter_title: Integration
section: '8.1'
section_title: Antiderivatives
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 8.1 Antiderivatives — Learn

**Prerequisites:** Section 7.2 — differentiating powers and polynomials; finding a value
from a formula.

**Objectives:** recognise integration as the reverse of differentiation; find an
antiderivative of a power; integrate a sum, a difference and a constant multiple; find the
constant of integration from one point.

By the end of this section you can undo a derivative, and say why the answer always carries
a constant.

## Integration reverses differentiation

Differentiation starts with a function and finds its gradient. Integration starts with a
gradient and finds a function that has it.

A function $F$ is an **antiderivative** of $f$ when

$$F'(x) = f(x).$$

For example, $x^2$ is an antiderivative of $2x$, because the derivative of $x^2$ is $2x$.
So is $x^2 + 7$, and so is $x^2 - 100$. Adding a constant does not change the gradient.
Every antiderivative of $2x$ therefore has the form $x^2 + C$, where $C$ is the **constant
of integration**.

We write

$$\int 2x\,dx = x^2 + C.$$

The symbol $\int$ is the integral sign. The $dx$ names the variable you are integrating
with respect to. The result is called an **indefinite integral**, because no values have
been fixed at the ends.

You can always check an integral by differentiating your answer. If the derivative is the
function you started with, the integral is right.

**Example 1.** Find $\displaystyle\int x^5\,dx$.

Raise the power by one and divide by the new power:

$$\int x^5\,dx = \frac{x^6}{6} + C.$$

Check by differentiating: the derivative of $\dfrac{x^6}{6}$ is $x^5$.

## The power rule for integration

For any power $n$ except $n = -1$,

$$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C.$$

The power goes **up** by one, and you divide by the new power. This is the rule for
differentiation read backwards. A constant multiple moves outside the integral, and a sum
or difference of terms integrates term by term.

**Example 2.** Find $\displaystyle\int 8x^3\,dx$.

$$\int 8x^3\,dx = 8 \times \frac{x^4}{4} + C = 2x^4 + C.$$

**Example 3.** Find $\displaystyle\int (6x^2 - 4x + 5)\,dx$.

Integrate each term:

$$\int (6x^2 - 4x + 5)\,dx = 6 \times \frac{x^3}{3} - 4 \times \frac{x^2}{2} + 5x + C
= 2x^3 - 2x^2 + 5x + C.$$

The constant $5$ integrates to $5x$, because the derivative of $5x$ is $5$.

## Negative and fractional powers

A fraction or a root can be written as a power, and then the same rule applies.

**Example 4.** Find $\displaystyle\int \frac{1}{x^2}\,dx$.

Write the fraction as a power first: $\dfrac{1}{x^2} = x^{-2}$. Then

$$\int x^{-2}\,dx = \frac{x^{-1}}{-1} + C = -\frac{1}{x} + C.$$

**Example 5.** Find $\displaystyle\int \sqrt{x}\,dx$.

Write the root as a power: $\sqrt{x} = x^{1/2}$. Then

$$\int x^{1/2}\,dx = \frac{x^{3/2}}{3/2} + C = \frac{2}{3}x^{3/2} + C.$$

Dividing by $\dfrac{3}{2}$ is the same as multiplying by $\dfrac{2}{3}$.

## Finding the constant from one point

An indefinite integral describes a whole family of curves, one for each value of $C$. One
extra piece of information picks out a single curve.

**Example 6.** The gradient of a curve is $\dfrac{dy}{dx} = 6x^2$, and the curve passes
through $(1, 5)$. Find the equation of the curve.

Integrate first:

$$y = \int 6x^2\,dx = 2x^3 + C.$$

The point $(1, 5)$ lies on the curve, so substitute $x = 1$ and $y = 5$:

$$5 = 2(1)^3 + C = 2 + C, \qquad C = 3.$$

The curve is $y = 2x^3 + 3$.

**Example 7.** The chapter problem's tank. Water enters at a rate
$\dfrac{dV}{dt} = 12t - 3t^2$ litres per minute, and the tank is empty at $t = 0$. Find
$V(t)$.

The volume is an antiderivative of the rate:

$$V(t) = \int (12t - 3t^2)\,dt = 6t^2 - t^3 + C.$$

The tank is empty at $t = 0$, so $V(0) = 0$:

$$0 = 0 - 0 + C, \qquad C = 0.$$

The volume after $t$ minutes is $V(t) = 6t^2 - t^3$ litres.

**Predict, then test.** Before you read on, predict the volume at $t = 4$ minutes. Write
your prediction down. Then substitute $t = 4$ into $V(t) = 6t^2 - t^3$ and compare. Finish
by explaining in one sentence why the rate being zero at $t = 0$ does not mean the volume
stays at zero.

> **Watch out.** Two mistakes are common.
>
> **Forgetting the constant of integration.** An indefinite integral is a family of
> functions, not one function. Writing $\int 2x\,dx = x^2$ is incomplete, because $x^2 - 6$
> is also an antiderivative. Always add $+ C$.
>
> **Using the power rule on $\dfrac{1}{x}$.** The rule needs $n \ne -1$, because dividing
> by $n + 1$ would divide by zero. A different rule covers $\dfrac{1}{x}$, and you meet it
> in Section 8.3.
>
> **Re-check:** after integrating, differentiate your answer and compare it with the
> function you started with.

## Progress check

Back to the chapter problem. The tank's rate is $r(t) = 12t - 3t^2$ litres per minute, and
the tank is empty at $t = 0$.

Find $V(t)$, then work out $V(4)$.

Keep your answer. Section 8.2 finds the same volume as an area, and Section 8.6 compares it
with the average rate of flow.

## You should now be able to

- explain what an antiderivative is and why the constant of integration appears;
- integrate $x^n$ for $n \ne -1$, including negative and fractional powers;
- integrate sums, differences and constant multiples term by term;
- find the constant of integration from one point on the curve;
- check an integral by differentiating the answer.
