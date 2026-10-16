---
title: 7.4 The quotient rule — Learn
chapter: 7
chapter_title: Differentiation
section: '7.4'
section_title: The quotient rule
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 7.4 The quotient rule — Learn

**Prerequisites:** Section 7.3 — the product rule; simplifying algebraic fractions.

**Objectives:** state the quotient rule; use it on a fraction of two functions; check the
sign of the numerator.

By the end of this section you can differentiate one function divided by another.

## Why a quotient needs a rule

Sometimes a fraction simplifies before you differentiate. The fraction
$\dfrac{x^2 + 1}{x}$ is $x + \dfrac{1}{x}$, which the power rule handles. But
$\dfrac{2x + 1}{x - 1}$ does not simplify, and neither does $\dfrac{x^2}{x + 1}$. For those
fractions the quotient rule is the tool.

## The quotient rule

> **The quotient rule.** If $y = \dfrac{u}{v}$, where $u$ and $v$ are functions of $x$ and
> $v \ne 0$, then
> $$y' = \frac{u'v - uv'}{v^2}.$$

In words: the derivative of the top times the bottom, minus the top times the derivative of
the bottom, all divided by the bottom squared.

The subtraction is the part to watch. It is not symmetric, so the order of the two terms
matters. Reversing them changes the sign of the whole answer.

**Example 1.** Differentiate $y = \dfrac{2x + 1}{x - 1}$.

Let $u = 2x + 1$, so $u' = 2$, and $v = x - 1$, so $v' = 1$. Then

$$y' = \frac{2(x - 1) - (2x + 1)(1)}{(x - 1)^2}
= \frac{2x - 2 - 2x - 1}{(x - 1)^2} = \frac{-3}{(x - 1)^2}.$$

The numerator is a constant, and it is negative. The curve falls on each branch.

**Example 2.** Differentiate $y = \dfrac{3x + 2}{x + 1}$.

Let $u = 3x + 2$, so $u' = 3$, and $v = x + 1$, so $v' = 1$. Then

$$y' = \frac{3(x + 1) - (3x + 2)(1)}{(x + 1)^2}
= \frac{3x + 3 - 3x - 2}{(x + 1)^2} = \frac{1}{(x + 1)^2}.$$

The derivative is positive for every $x$, so the curve rises on each branch.

**Example 3.** Differentiate $y = \dfrac{x^2}{x + 1}$.

Let $u = x^2$, so $u' = 2x$, and $v = x + 1$, so $v' = 1$. Then

$$y' = \frac{2x(x + 1) - x^2(1)}{(x + 1)^2} = \frac{2x^2 + 2x - x^2}{(x + 1)^2}
= \frac{x^2 + 2x}{(x + 1)^2}.$$

The numerator factorises as $x(x + 2)$, so the derivative is zero at $x = 0$ and at
$x = -2$.

> **Watch out.** Three mistakes are common. First, the denominator is $v^2$, not $v$.
> Second, the numerator subtracts $uv'$, so the order is fixed. Third, the derivative of
> the bottom is $v'$, not $v$. Writing $u'v - uv$ instead of $u'v - uv'$ is the error to
> check for, and it usually shows up as a missing term in the numerator.

## Progress check

Back to the chapter problem. The tank volume can be written as a fraction:

$$V(t) = \frac{12t^3 - t^4}{t} \text{ litres}.$$

Use the quotient rule to find $V'(t)$, then work out $V'(4)$. Confirm that it matches the
rate from Sections 7.2 and 7.3.

Keep the rate $V'(t) = 24t - 3t^2$. Section 7.7 uses it to compare the average rate with the
instantaneous rate, and Section 7.8 finds when it is greatest.

## You should now be able to

- state the quotient rule $y' = \dfrac{u'v - uv'}{v^2}$;
- identify $u$ and $v$ and write down $u'$ and $v'$ before substituting;
- simplify the numerator and factorise it when possible;
- explain why the order of the two terms in the numerator matters.
