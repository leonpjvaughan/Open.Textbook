---
title: 10.4 The nth term of a quadratic sequence — Learn
chapter: 10
chapter_title: Sequences
section: '10.4'
section_title: The nth term of a quadratic sequence
tier: H
dfe:
- A25
kind: walkthrough
---

# 10.4 The nth term of a quadratic sequence — Learn

**Prerequisites:** square numbers, linear sequences, and collecting like terms.

**Objectives:** use constant second differences to find a quadratic nth term.
This Higher-only section covers A25.

## First and second differences

The **first differences** are the changes between consecutive terms. The
**second differences** are the changes between consecutive first differences.

For a quadratic sequence, the second differences are constant. That constant
is twice the coefficient of $n^2$.

**Example 1.** Find the nth term of $2,7,16,29,\ldots$.

First differences are $5,9,13$. Second differences are $4,4$. So start with
$2n^2$.

$$
2n^2: 2,8,18,32,\ldots
$$

Subtract these terms from the given terms:

$$
2-2=0,\quad 7-8=-1,\quad 16-18=-2,\quad 29-32=-3
$$

The differences form $-n$, so this gives $2n^2-n$. Test position 1:
$2(1)^2-1=1$, but the first term is 2. Add 1.

$$
2n^2-n+1
$$

Check at position $4$:

$$
2(4)^2-4+1=32-4+1=29
$$

**Progress check.** Pattern A has constant first differences, so it is linear.
Pattern B doubles, so its terms do not have constant second differences.

> **Watch out.** The constant second difference is not the coefficient of
> $n^2$. Divide it by $2$, then check your rule against the original terms.

## You should now be able to

- calculate first and second differences;
- halve the constant second difference to find the $n^2$ coefficient;
- find the remaining linear and constant parts;
- verify a quadratic rule using the first terms.
