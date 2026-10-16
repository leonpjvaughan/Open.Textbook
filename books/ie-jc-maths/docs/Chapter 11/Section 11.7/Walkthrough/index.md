---
title: 11.7 Dividing a cubic or quadratic by a linear expression — Learn
chapter: 11
chapter_title: Expanding, factorising and simplifying
section: '11.7'
section_title: Dividing a cubic or quadratic by a linear expression
tier: H
refs:
- AF.3
kind: walkthrough
---

# 11.7 Dividing a cubic or quadratic by a linear expression — Learn

**Prerequisites:** factorising quadratics from Section 11.5, and simplifying
expressions from Section 11.1.

**Objectives:** divide an expression by a single term; divide a quadratic by a linear
expression; divide a cubic by a linear expression; use division to find a missing
factor.

By the end of this section, you can divide a quadratic or a cubic expression by a
linear expression.

## Dividing by a single term

To divide a sum by a single term, divide each term separately.

$$\frac{6x^3 + 9x^2}{3x} = \frac{6x^3}{3x} + \frac{9x^2}{3x} = 2x^2 + 3x$$

Check by multiplying back: $3x(2x^2+3x) = 6x^3+9x^2$.

## Dividing by a linear expression

A **linear expression** has $x$ to the first power, such as $x+2$ or $x-5$. To divide
by it, ask what multiplies it to give the original expression.

**Example 1.** Divide $x^2+7x+10$ by $x+2$.

You want a factor that multiplies $x+2$ to give $x^2+7x+10$. The $x^2$ term comes from
$x\times x$, so start with $x$. The constant 10 comes from $2\times5$, so try $x+5$.

$$(x+2)(x+5) = x^2 + 7x + 10$$

So

$$(x^2+7x+10) \div (x+2) = x+5$$

**Example 2.** Divide $x^2-3x-10$ by $x-5$.

The $x^2$ term gives $x$. The constant $-10$ comes from $-5\times2$, so try $x+2$.

$$(x-5)(x+2) = x^2 - 3x - 10$$

So the quotient is $x+2$.

## Dividing a cubic

The same idea works for a cubic, but there are two steps.

**Example 3.** Divide $x^3+7x^2+10x$ by $x+5$.

The $x^3$ term comes from $x\times x^2$, so the quotient starts with $x^2$. The last
term of the cubic is $10x$, and the last term of the divisor is 5, so the last term of
the quotient is $10x\div5=2x$.

$$(x+5)(x^2+2x) = x^3 + 2x^2 + 5x^2 + 10x = x^3 + 7x^2 + 10x$$

So

$$(x^3+7x^2+10x) \div (x+5) = x^2 + 2x$$

**Example 4.** Divide $x^3-8$ by $x-2$.

There is no $x^2$ term and no $x$ term, but the division still works. The quotient
starts with $x^2$, and its last term is $(-8)\div(-2)=4$. The middle term is $2x$.

$$(x-2)(x^2+2x+4) = x^3 + 2x^2 + 4x - 2x^2 - 4x - 8 = x^3 - 8$$

So the quotient is $x^2+2x+4$.

> **Watch out.** When a term is missing, keep its place. From $x^3-8$, the common
> error is to stop at $x^2$ and forget the $x$ term. The quotient is $x^2+2x+4$, and
> the middle term is needed for the $x^2$ and $x$ terms to cancel.
>
> **Re-check:** multiply the quotient by the divisor and collect the like terms. The
> answer must match the expression you started with.

## Progress check

Return to the chapter problem. The raised bed has volume $x^3+7x^2+10x$ cubic metres,
length $(x+5)$ metres and width $x$ metres.

1. Divide the volume by the length $x+5$.
2. Divide your answer by the width $x$ to find the height of the bed.
3. Write down the height when $x=5$.

In the Review you will use this to finish the garden problem.

## You should now be able to

- divide an expression by a single term;
- divide a quadratic by a linear expression;
- divide a cubic by a linear expression;
- check a division by multiplying back.
