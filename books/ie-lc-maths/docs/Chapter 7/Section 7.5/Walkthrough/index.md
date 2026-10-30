---
title: 7.5 The chain rule — Learn
chapter: 7
chapter_title: Differentiation
section: '7.5'
section_title: The chain rule
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 7.5 The chain rule — Learn

**Prerequisites:** Section 7.2 — the power rule; Section 6.3 — composite functions.

**Objectives:** recognise a function of a function; state the chain rule; differentiate a
power of a linear expression and a power of a quadratic; use the chain rule on linked rates.

By the end of this section you can differentiate a function that is built inside another
one.

## A function of a function

Some expressions are made by putting one function inside another. In $y = (2x + 3)^5$ the
inner function is $2x + 3$, and the outer function raises its input to the fifth power. In
$y = \sqrt{3x + 1}$ the inner function is $3x + 1$ and the outer function is the square
root.

Expanding $(2x + 3)^5$ would give a long polynomial, and $\sqrt{3x + 1}$ cannot be expanded
at all. The chain rule handles both.

## The chain rule

Give the inner function a name, $u$. Then $y$ is a function of $u$, and $u$ is a function of
$x$. The chain rule links the three rates.

> **The chain rule.** If $y$ is a function of $u$, and $u$ is a function of $x$, then
>
>
> $$\frac{dy}{dx} = \frac{dy}{du} \times \frac{du}{dx}.$$

The rates multiply. If $y$ changes twice as fast as $u$, and $u$ changes three times as fast
as $x$, then $y$ changes six times as fast as $x$. That is the whole idea.

**Example 1.** Differentiate $y = (2x + 3)^5$.

Let $u = 2x + 3$, so $\dfrac{du}{dx} = 2$. Then $y = u^5$, so $\dfrac{dy}{du} = 5u^4$.
Multiplying:

$$\frac{dy}{dx} = 5u^4 \times 2 = 10(2x + 3)^4.$$

**Example 2.** Differentiate $y = (x^2 + 1)^3$.

Let $u = x^2 + 1$, so $\dfrac{du}{dx} = 2x$. Then $y = u^3$, so $\dfrac{dy}{du} = 3u^2$.
Multiplying:

$$\frac{dy}{dx} = 3(x^2 + 1)^2 \times 2x = 6x(x^2 + 1)^2.$$

**Example 3.** Differentiate $y = \sqrt{3x + 1}$.

Write $y = (3x + 1)^{1/2}$. The outer derivative is $\tfrac{1}{2}(3x + 1)^{-1/2}$, and the
inner derivative is $3$. Multiplying:

$$\frac{dy}{dx} = \frac{1}{2}(3x + 1)^{-1/2} \times 3 = \frac{3}{2\sqrt{3x + 1}}.$$

## Linked rates

The chain rule is also the tool for two rates that are linked by a third quantity. If the
volume $V$ depends on the height $h$, and the height depends on the time $t$, then

$$\frac{dV}{dt} = \frac{dV}{dh} \times \frac{dh}{dt}.$$

**Example 4.** A cylinder has volume $V = 4\pi h$, so $\dfrac{dV}{dh} = 4\pi$. If the volume
rises at $20$ units per minute, the height rises at

$$\frac{dh}{dt} = \frac{dV/dt}{dV/dh} = \frac{20}{4\pi} = \frac{5}{\pi}$$

units per minute. Dividing by the rate $\dfrac{dV}{dh}$ is the chain rule rearranged.

> **Watch out.** The inner derivative must be multiplied in, and forgetting it is the usual
> error. Differentiating $(2x + 3)^5$ as $5(2x + 3)^4$ misses the factor $2$. The chain rule
> always asks what the inside is doing, and the answer is $\dfrac{du}{dx}$. Write $u$ down
> and find $\dfrac{du}{dx}$ before you multiply.

## Progress check

Back to the chapter problem. The tank is a cylinder, so its volume and the height of the
water are linked by

$$V = 4\pi h.$$

At $t = 4$ minutes the volume is rising at $V'(4) = 48$ litres per minute. Use the chain
rule to work out $\dfrac{dh}{dt}$ at that instant.

Keep your answer. Section 7.7 puts the rate back into the context of the tank, and Section
7.8 asks when the volume is greatest.

## You should now be able to

- recognise a function of a function and name the inside part $u$;
- state and use the chain rule $\dfrac{dy}{dx} = \dfrac{dy}{du} \times \dfrac{du}{dx}$;
- differentiate a power of a linear expression without expanding it;
- link two rates through a third quantity and solve for the one you want.
