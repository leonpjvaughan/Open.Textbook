---
title: 'Chapter 4: Review'
chapter: 4
kind: review
---

# Chapter 4: Review

## The chapter problem, solved

**The break-even point.** The candle business pays €240 for equipment and the
stall, and €4 for each candle. Each candle sells for €10. Above $40$ candles the
price falls by $10$ cent for each extra candle.

**The two expressions.** For $n$ candles, the cost $C$ and the income $R$, both
in euro, are

$$C = 240 + 4n \qquad R = 10n$$

The cost is linear with gradient $4$ and intercept $240$. The income is linear
with gradient $10$ and intercept $0$, so it is directly proportional to $n$ while
the price stays at €10.

**The first break-even point.** Set the cost equal to the income:

$$240 + 4n = 10n \quad\Rightarrow\quad 240 = 6n \quad\Rightarrow\quad n = 40$$

At $40$ candles the cost is $240 + 4(40) = 400$, which is €400, and the income is
$10(40) = 400$, which is €400. The two lines cross at $(40, 400)$.

Below $40$ candles the cost line is above the income line, so the business makes
a loss. Above $40$ candles the income line is above the cost line, so it makes a
profit of $6n - 240$ euro.

**The discount.** Above $40$ candles the price $p$, in euro, falls:

$$p = 10 - 0.1(n - 40)$$

The income becomes the price times the number sold, which is a quadratic:

$$R = n(14 - 0.1n) = 14n - 0.1n^2$$

**The second break-even point.** Set the income equal to the cost again:

$$14n - 0.1n^2 = 240 + 4n$$

Multiply by $-10$ and gather on one side:

$$n^2 - 100n + 2400 = 0 \quad\Rightarrow\quad (n - 40)(n - 60) = 0$$

So $n = 40$ or $n = 60$. There are two break-even points: one at $40$ candles,
where the discount has not yet started, and one at $60$ candles, where the price
has fallen to €8.

**The profit region.** The profit $P$ with the discount, in euro, is

$$P = 14n - 0.1n^2 - (240 + 4n) = -0.1n^2 + 10n - 240$$

Completing the square shows where the maximum is:

$$P = 10 - 0.1(n - 50)^2$$

So the profit is greatest at $n = 50$, and its greatest value is €10. The profit
is positive between the two break-even points, which the inequality
$-0.1n^2 + 10n - 240 > 0$ states exactly:

$$40 < n < 60$$

**The answer.** The business loses money below $40$ candles, breaks even at $40$,
makes a profit between $40$ and $60$, breaks even again at $60$, and loses money
above $60$. The best number to make and sell is $50$ candles, where the profit is
€10 and the price is €9.

The discount helps the business sell more, but it also cuts the price. Past $60$
candles the price has fallen so far that the extra sales no longer cover the cost
of making them.

## Mixed practice — choose the method first

Work through these without notes. For each one, say **which method you will use
and why** before you calculate. The questions mix every section of the chapter.

1. A pattern has $7$ tiles in the first shape, $11$ in the second and $15$ in the
   third. Write an expression for the number of tiles in the $n$th shape.
2. A rule is $y = 6x - 4$. Work out $y$ at $x = 5$, and say which variable is
   independent.
3. A table gives the values $3, 8, 13, 18$ at $n = 1, 2, 3, 4$. Find the formula.
4. State the gradient and the $y$-intercept of $C = 150 + 7n$, and say what each
   means if $n$ is the number of items.
5. Simplify $8x - 3 + 2x + 9$.
6. Expand and simplify $5(2x - 3) - 2(x - 4)$.
7. Solve $6x + 5 = 3x + 20$.
8. Solve $y = 3x + 2$ and $y = 7x - 10$.
9. Solve $x^2 - 9x + 20 = 0$.
10. Solve $3x - 7 \leq 8$ and show the solution on a number line.
11. Solve $|x - 4| < 3$.
12. The business changes its fixed cost to €300 and its materials to €5 a candle,
    keeping the price at €10. Find the new break-even point.
13. A student solves $x^2 = 5x$ by dividing both sides by $x$ and getting $x = 5$.
    Explain what went wrong.

## What you can now do

- write an expression for the $n$th term of a pattern;
- move between a formula, a table and a graph;
- find the formula behind a table of values;
- read a gradient and a $y$-intercept and explain them in context;
- evaluate and simplify an expression, with and without brackets;
- solve a linear equation and check the answer;
- solve two simultaneous linear equations;
- solve a quadratic by factorising or by formula, and keep both roots;
- solve a linear inequality, reversing the sign when you divide by a negative;
- solve a quadratic inequality and a modulus inequality, and give the answer as a
  range or a pair of ranges.

## Thinking back

Return to the relationship you chose at the start of the chapter — an hourly rate
with a bonus, a phone plan, or a recipe you scale up.

Now you can write it as a formula. Write down:

- the part that stays the same, which is the constant;
- the part that changes with the amount, which is the coefficient;
- the formula itself, and what each letter means;
- one question the formula answers that arithmetic alone did not.

If your relationship has a fixed charge and a cost per unit, it is linear, and
its graph is a straight line. If the charge per unit changes as the amount
changes, the formula has a squared term, and the graph is a curve. Knowing which
kind you have tells you which method to reach for.
