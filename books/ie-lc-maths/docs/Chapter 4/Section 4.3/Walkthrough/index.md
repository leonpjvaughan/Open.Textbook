---
title: 4.3 Finding a formula from a pattern — Learn
chapter: 4
chapter_title: 'Algebra: expressions and equations'
section: '4.3'
section_title: Finding a formula from a pattern
tier: F
refs:
- '4.1'
kind: walkthrough
---

# 4.3 Finding a formula from a pattern — Learn

**Prerequisites:** Section 4.1 — expressions; Section 4.2 — tables.

**Objectives:** find the formula behind a table or a sequence; write the formula
in words and in symbols; use it to predict a value.

By the end of this section you can take a table of values and write down the rule
that produced it.

## The same method, from any starting point

A pattern can arrive as a sequence, as a table, or as a description in words.
The method for finding its formula is the same each time.

1. Find the **gap** between one output and the next. That gap is the coefficient
   of $n$.
2. **Step back** to $n = 0$ to find the constant.

**Example 1.** Find a formula for the sequence $5, 8, 11, 14, \dots$

The gap is $3$, so the formula starts with $3n$. Step back from the first term:
$5 - 3 = 2$. At $n = 0$ the value is $2$, so the constant is $2$.

$$3n + 2$$

Check: at $n = 4$ the formula gives $3(4) + 2 = 14$. Correct.

**Example 2.** A table gives the cost of making candles.

| $n$ | $0$ | $1$ | $2$ | $3$ |
|---|---|---|---|---|
| $C$ (€) | $240$ | $244$ | $248$ | $252$ |

The gap is $4$, so the formula starts with $4n$. The table already shows
$n = 0$, and the value there is $240$, so the constant is $240$.

$$C = 240 + 4n$$

The table makes the constant visible, because the $n = 0$ column is the starting
value.

## Writing a formula in words first

A formula in words is often easier to check against the situation.

**Example 3.** A taxi charges €5 to start the meter, then €2 for each kilometre.
Write the fare in words, then in symbols.

In words: **fare = €5 + €2 × number of kilometres**.

In symbols, with $n$ for the number of kilometres:

$$F = 5 + 2n$$

A journey of $12$ km costs $5 + 2(12) = €29$.

Writing the words first is a check on the symbols. If the words and the symbols
disagree, the symbols are wrong.

## Using the formula to predict

Once you have the formula, any value is a substitution.

**Example 4.** Use $C = 240 + 4n$ to predict the cost of $25$ candles, and the
number of candles that cost €300.

$$C = 240 + 4(25) = 240 + 100 = €340$$

For €300, solve $240 + 4n = 300$, so $4n = 60$ and $n = 15$ candles.

> **Watch out.** The first term is not the constant. For $5, 8, 11, \dots$ the
> first term is $5$, but the constant is $2$. Stepping back to $n = 0$ is what
> finds the constant, and it is the step most often skipped.

## Progress check

Back to the chapter problem. The income from selling candles follows the pattern
$0, 10, 20, 30, \dots$ euro for $0, 1, 2, 3, \dots$ candles.

Find the formula for the income, and write both formulae together:

- cost: $C = 240 + 4n$;
- income: $R = \dots$

Then use the two formulae to find the number of candles at which the cost and the
income are equal. Section 4.6 solves that equation in a formal way; here, try
values of $n$ until the two sides agree.

## You should now be able to

- find the gap and the constant from a sequence or a table;
- write a linear formula in words and in symbols;
- check a formula against the situation it came from;
- use a formula to predict a value, and to find the input that gives a chosen
  output.
