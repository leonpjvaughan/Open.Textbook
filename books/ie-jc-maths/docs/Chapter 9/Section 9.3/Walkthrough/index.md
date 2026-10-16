---
title: 9.3 Quadratic patterns and their general term — Learn
chapter: 9
chapter_title: Patterns and sequences
section: '9.3'
section_title: Quadratic patterns and their general term
tier: O
refs:
- AF.1
kind: walkthrough
---

# 9.3 Quadratic patterns and their general term — Learn

**Prerequisites:** square numbers, and the general term of a linear pattern from
Section 9.2.

**Objectives:** work out first and second differences; recognise a quadratic pattern
from its constant second difference; find the general term of a quadratic pattern.

By the end of this section, you can write the rule for a pattern whose gaps grow.

## First and second differences

The **first differences** are the changes between neighbouring terms. The **second
differences** are the changes between neighbouring first differences.

For the pattern $2, 7, 16, 29, \ldots$:

| Term | 2 | 7 | 16 | 29 |
|---|---|---|---|---|
| First difference | | 5 | 9 | 13 |
| Second difference | | | 4 | 4 |

The first differences are $5, 9, 13$, and they grow by 4 each time. So the second
difference is constant, and it is $4$.

A pattern whose first differences grow by a fixed amount is a **quadratic pattern**.
Its general term contains $n^2$.

## Finding the general term

The constant second difference is twice the number that multiplies $n^2$. So halve
the second difference to start the rule.

**Example 1.** Find the general term of $2, 7, 16, 29, \ldots$.

The second difference is $4$, and half of 4 is $2$. So the general term starts with
$2n^2$.

Write out the $2n^2$ pattern and compare it with the given pattern.

| Position | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Pattern | 2 | 7 | 16 | 29 |
| $2n^2$ | 2 | 8 | 18 | 32 |
| Pattern minus $2n^2$ | 0 | $-1$ | $-2$ | $-3$ |

The bottom row is $0, -1, -2, -3$, which follows the linear rule $1-n$. So the general
term is

$$2n^2 - n + 1$$

Check position 4: $2(16)-4+1=32-4+1=29$. It matches.

**Example 2.** Find the general term of $3, 9, 19, 33, \ldots$.

The first differences are $6, 10, 14$, and the second difference is $4$. Half of 4 is
2, so start with $2n^2$.

| Position | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Pattern | 3 | 9 | 19 | 33 |
| $2n^2$ | 2 | 8 | 18 | 32 |
| Pattern minus $2n^2$ | 1 | 1 | 1 | 1 |

The bottom row is always $1$, so the general term is

$$2n^2 + 1$$

Check position 3: $2(9)+1=19$. It matches.

**Example 3.** Find the general term of $4, 11, 22, 37, \ldots$.

The first differences are $7, 11, 15$, and the second difference is $4$. So start with
$2n^2$.

| Position | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Pattern | 4 | 11 | 22 | 37 |
| $2n^2$ | 2 | 8 | 18 | 32 |
| Pattern minus $2n^2$ | 2 | 3 | 4 | 5 |

The bottom row follows $n+1$, so the general term is

$$2n^2 + n + 1$$

Check position 4: $2(16)+4+1=37$. It matches.

> **Watch out.** The constant second difference is not the number that multiplies
> $n^2$. For a second difference of 4, the rule starts with $2n^2$, not $4n^2$. Halve
> the second difference first.
>
> **Re-check:** work out the first three terms of your rule. If they match the pattern,
> the rule is right.

## Progress check

Return to the chapter problem. Ben saves $1, 4, 9, 16, \ldots$ euro.

1. Work out the first differences of Ben's plan.
2. Work out the second difference. What does it tell you about the pattern?
3. Write the general term for his saving in week $n$.
4. Use the rule to find how much he saves in week 10.

In Section 9.4 you will compare Ben's plan with the other two.

## You should now be able to

- work out first and second differences;
- recognise a quadratic pattern from its constant second difference;
- halve the second difference to find the number that multiplies $n^2$;
- find the rest of the rule by subtracting $n^2$ terms, and check it.
