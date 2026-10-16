---
title: 4.1 Generating expressions from patterns — Learn
chapter: 4
chapter_title: 'Algebra: expressions and equations'
section: '4.1'
section_title: Generating expressions from patterns
tier: F
refs:
- '4.1'
kind: walkthrough
---

# 4.1 Generating expressions from patterns — Learn

**Prerequisites:** arithmetic with whole numbers; the order of operations.

**Objectives:** use a letter for the term number; write an expression for the
$n$th term of a pattern; name the variable, the coefficient and the constant.

By the end of this section you can turn a growing pattern into one expression
that gives any term you ask for.

## A letter for the term number

A pattern grows in a regular way, and you can describe it without listing every
term. Suppose a row of squares is built from matchsticks.

- $1$ square uses $4$ matchsticks;
- $2$ squares use $7$ matchsticks;
- $3$ squares use $10$ matchsticks.

The numbers $4, 7, 10, \dots$ form a **sequence**, and each number in it is a
**term**. The first term is $4$, the second is $7$, and so on.

To talk about any term, give its position a name. Write $n$ for the position, so
$n = 1$ means the first term. Then write an **expression** for the value in terms
of $n$. For this pattern the expression is $3n + 1$.

$$n = 1:\; 3(1) + 1 = 4 \qquad n = 2:\; 3(2) + 1 = 7 \qquad n = 3:\; 3(3) + 1 = 10$$

The letter $n$ is the **variable**, because its value changes. The number $3$ in
$3n$ is the **coefficient**, because it multiplies the variable. The number $1$
is the **constant**, because it does not change.

## The difference method

Look at the gap between one term and the next.

$$4,\; 7,\; 10,\; 13, \dots \qquad \text{gaps: } 3,\; 3,\; 3$$

The gap is the same every time. That constant gap is the coefficient of $n$, so
the expression starts with $3n$.

To find the constant, work out what $3n$ gives at $n = 1$ and compare it with the
first term.

$$3(1) = 3, \quad \text{but the first term is } 4, \quad \text{so add } 1$$

The expression is $3n + 1$.

**Example 1.** Find an expression for the $n$th term of $5, 9, 13, 17, \dots$

The gaps are all $4$, so the coefficient is $4$ and the expression starts with
$4n$. At $n = 1$, $4n = 4$, but the first term is $5$, so add $1$.

$$4n + 1$$

Check at $n = 3$: $4(3) + 1 = 13$. Correct.

**Example 2.** A pattern has $8$ tiles in the first shape, $11$ in the second and
$14$ in the third. Find an expression for the number of tiles in the $n$th shape,
then find the number in the tenth shape.

The gaps are all $3$, so the expression starts with $3n$. At $n = 1$, $3n = 3$,
but the first shape has $8$ tiles, so add $5$.

$$3n + 5$$

The tenth shape has $3(10) + 5 = 35$ tiles.

## Expressions from a situation

A pattern does not have to be a picture. A cost that starts at a fixed amount and
grows by the same amount each time behaves in exactly the same way.

> **The fixed part becomes the constant, and the repeated part becomes the
> coefficient.**

**Example 3.** A market stall charges €240 to set up, plus €4 for each candle
made. Write an expression for the cost of $n$ candles.

The €240 is paid once, so it is the constant. The €4 is paid for every candle, so
it is the coefficient of $n$.

$$240 + 4n$$

For $10$ candles the cost is $240 + 4(10) = €280$.

**Predict, then test.** Draw the fourth shape and the fifth shape of the
matchstick row on paper. Before you count, predict how many matchsticks the fifth
shape needs, and write the prediction down. Then count and check. Next, use the
expression $3n + 1$ to predict the tenth shape without drawing it, and check your
answer by counting the new sticks each shape adds. Finish by explaining in one
sentence why the number of matchsticks is always three times the number of
squares, plus one.

> **Watch out.** The first term is not always the constant. For $5, 9, 13,
> \dots$ the first term is $5$, but the constant is $1$, because $4n$ already
> accounts for $4$ of it. Always work out what the coefficient alone gives at
> $n = 1$, then adjust.

## Progress check

Back to the chapter problem. The candles cost €240 to set up, plus €4 for each
candle.

Write an expression for the cost of $n$ candles, then use it to work out the cost
of $30$ candles. Keep both answers. Section 4.2 puts the expression into a table
and a graph, and Section 4.6 solves the equation that finds the break-even point.

## You should now be able to

- write an expression for the $n$th term of a pattern with a constant gap;
- find the coefficient from the gap and the constant by comparing at $n = 1$;
- name the variable, the coefficient and the constant in an expression;
- build an expression from a situation with a fixed part and a repeated part.
