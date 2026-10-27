---
title: 4.8 Solving quadratic equations — Learn
chapter: 4
chapter_title: 'Algebra: expressions and equations'
section: '4.8'
section_title: Solving quadratic equations
tier: O
refs:
- '4.2'
kind: walkthrough
---

# 4.8 Solving quadratic equations — Learn

**Prerequisites:** Section 4.5 — expanding brackets; Section 4.6 — linear
equations.

**Objectives:** solve a quadratic equation by factorising; solve one with the
quadratic formula; explain why a quadratic can have two solutions.

By the end of this section you can solve a quadratic equation, and you can read
the two break-even points of the candle business off a single equation.

## A quadratic equation

A **quadratic equation** has the unknown raised to the power $2$ and no higher
power. Its standard form is

$$ax^2 + bx + c = 0 \qquad (a \neq 0)$$

where $a$ is the coefficient of $x^2$, $b$ is the coefficient of $x$ and $c$ is
the constant.

The graph of a quadratic is a curve called a parabola. A curve can cross a
horizontal line twice, once or not at all, so a quadratic equation can have two
solutions, one solution, or none.

## Solving by factorising

If the left side factorises, the **zero product rule** finishes the job: if two
numbers multiply to zero, at least one of them is zero.

**Example 1.** Solve $x^2 - 5x + 6 = 0$.

The factors of $6$ that add to $-5$ are $-2$ and $-3$:

$$(x - 2)(x - 3) = 0$$

So $x - 2 = 0$ or $x - 3 = 0$:

$$x = 2 \quad\text{or}\quad x = 3$$

Both values are solutions. Substituting either one makes the left side zero.

## Solving with the formula

Not every quadratic factorises with whole numbers. The **quadratic formula**
solves any of them:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

The formula comes from completing the square on $ax^2 + bx + c = 0$. Divide by
$a$, add the square of half the coefficient of $x$ to both sides, and solve for
$x$. The square root in the answer is what produces the two signs.

**Example 2.** Solve $2x^2 - 7x + 3 = 0$ with the formula, where $a = 2$, $b = -7$
and $c = 3$.

$$x = \frac{7 \pm \sqrt{49 - 24}}{4} = \frac{7 \pm \sqrt{25}}{4} = \frac{7 \pm 5}{4}$$

So $x = 3$ or $x = \frac{1}{2}$.

**Example 3.** Solve $x^2 - 4x + 1 = 0$.

$$x = \frac{4 \pm \sqrt{16 - 4}}{2} = \frac{4 \pm \sqrt{12}}{2} = \frac{4 \pm 2\sqrt{3}}{2} = 2 \pm \sqrt{3}$$

This one does not factorise with whole numbers, so the formula is the only exact
route. Leave the answer as $2 + \sqrt{3}$ and $2 - \sqrt{3}$ unless a decimal is
asked for.

<!-- tier:h -->

The expression under the square root, $b^2 - 4ac$, is the **discriminant**. Its
sign tells you how many solutions there are before you solve:

- positive: two different real solutions;
- zero: one repeated solution;
- negative: no real solutions.

For $x^2 - 4x + 1$ the discriminant is $16 - 4 = 12$, which is positive, so two
real solutions was the only possibility.

<!-- /tier:h -->

## The discount that changes the income

The candle business finds that €10 is too high a price once it wants to sell
large numbers. Above $40$ candles it lowers the price by $10$ cent for every
extra candle:

$$p = 10 - 0.1(n - 40)$$

where $n$ is the number of candles sold and $p$ is the price in euro of one
candle.

The income is now the price multiplied by the number sold, and the price depends
on $n$, so the income is a quadratic:

$$R = n\left(10 - 0.1(n - 40)\right) = n(14 - 0.1n) = 14n - 0.1n^2$$

Here $R$ is the income in euro.

Break-even is still where the income equals the cost:

$$14n - 0.1n^2 = 240 + 4n$$

Gather everything on one side and multiply by $-10$ to clear the decimal:

$$n^2 - 100n + 2400 = 0$$

Factorise:

$$(n - 40)(n - 60) = 0 \qquad n = 40 \quad\text{or}\quad n = 60$$

There are now **two** break-even points. The business breaks even at $40$ candles
and again at $60$ candles. Between them it makes a profit; beyond $60$ the
discount has cut the price too far and it makes a loss again.

> **Watch out.** A quadratic has two solutions, and both must be reported. Do not
> divide an equation through by $n$ either: dividing by $n$ throws away the
> solution $n = 0$. Factorise instead, and keep both roots.

## Progress check

Back to the chapter problem. Solve

$$n^2 - 100n + 2400 = 0$$

by factorising. Then say what each answer means for the business, and work out
the profit at $n = 50$ to show that the middle of the two points is the profitable
region.

## You should now be able to

- write a quadratic equation in the form $ax^2 + bx + c = 0$;
- solve one by factorising, using the zero product rule;
- solve one with the quadratic formula, leaving surds exact;
- explain why a quadratic can have two solutions, and what the two break-even
  points mean.
