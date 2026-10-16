---
title: 7.3 The product rule — Learn
chapter: 7
chapter_title: Differentiation
section: '7.3'
section_title: The product rule
tier: O
refs:
- '5.2'
kind: walkthrough
---

# 7.3 The product rule — Learn

**Prerequisites:** Section 7.2 — the power rule and sums; expanding two brackets.

**Objectives:** state the product rule; use it on a product of two functions; check the
answer by expanding when that is possible.

By the end of this section you can differentiate a product without expanding it first.

## Why a product needs a rule

Some products can be expanded. You can expand $(x + 1)(x + 2)$ to $x^2 + 3x + 2$ and
differentiate term by term. But a product such as $x^2\sqrt{x + 1}$ cannot be expanded into a polynomial,
and a product of three functions is worse. The product rule handles all of them.

The rule is not "differentiate each factor and multiply". That shortcut is wrong, and it is
worth seeing why with a counterexample. Take $y = x \cdot x = x^2$. Each factor has
derivative $1$, and the product of the derivatives is $1$. The true derivative is $2x$. The
shortcut fails.

## The product rule

> **The product rule.** If $y = uv$, where $u$ and $v$ are functions of $x$, then
> $$\frac{dy}{dx} = u'v + uv'.$$

In words: the derivative of the first times the second, plus the first times the derivative
of the second. The rule has two terms, because a change in either factor changes the product.

**Why two terms?** Picture a rectangle with sides $u$ and $v$, so its area is $uv$. If $u$
grows a little and $v$ grows a little, the area gains a strip along one side, a strip along
the other, and a small corner. The two strips are $u'v$ and $uv'$. The corner is a product
of two small changes, and it vanishes in the limit.

**Example 1.** Differentiate $y = (x + 1)(x + 2)$.

Let $u = x + 1$, so $u' = 1$, and $v = x + 2$, so $v' = 1$. Then

$$y' = u'v + uv' = 1(x + 2) + (x + 1)(1) = 2x + 3.$$

Expanding first gives $x^2 + 3x + 2$, whose derivative is also $2x + 3$.

**Example 2.** Differentiate $y = (2x + 3)(x^2 - 1)$.

Let $u = 2x + 3$, so $u' = 2$, and $v = x^2 - 1$, so $v' = 2x$. Then

$$y' = 2(x^2 - 1) + (2x + 3)(2x) = 2x^2 - 2 + 4x^2 + 6x = 6x^2 + 6x - 2.$$

**Example 3.** Differentiate $y = x^2(3x - 5)$.

Let $u = x^2$, so $u' = 2x$, and $v = 3x - 5$, so $v' = 3$. Then

$$y' = 2x(3x - 5) + x^2(3) = 6x^2 - 10x + 3x^2 = 9x^2 - 10x.$$

> **Watch out.** The product rule is not $u'v'$. Test it on Example 3: the factors have
> derivatives $2x$ and $3$, and their product is $6x$, which is not $9x^2 - 10x$. There are
> two terms, and each one keeps one factor unchanged. Missing a term is the commonest error
> with this rule.

## Progress check

Back to the chapter problem. The tank volume can be written as a product:

$$V(t) = t^2(12 - t) \text{ litres}.$$

Use the product rule to find $V'(t)$, then work out $V'(4)$. Check that the answer matches
the rate you found in Section 7.2 from the expanded form.

Keep this form of the rule. Section 7.4 finds the same rate with a quotient, and Section 7.8
uses the rate to answer when the tank fills fastest.

## You should now be able to

- state the product rule $y' = u'v + uv'$;
- choose $u$ and $v$ and write down $u'$ and $v'$ before substituting;
- simplify the two terms into a single expression;
- explain why the derivative of a product is not the product of the derivatives.
