---
title: 9.2 Arithmetic series — Learn
chapter: 9
chapter_title: Sequences and series
section: '9.2'
section_title: Arithmetic series
tier: O
refs:
- '4.1'
kind: walkthrough
---

# 9.2 Arithmetic series — Learn

**Prerequisites:** Section 9.1 — arithmetic sequences.

**Objectives:** find the sum of an arithmetic series; use both forms of the sum formula;
find how many terms give a given sum.

By the end of this section you can add up an arithmetic series without adding every term.

## A series is a sum

A **series** is what you get when you add the terms of a sequence. The sequence
$3, 7, 11, \dots$ has the series

$$3 + 7 + 11 + \dots$$

The sum of the first $n$ terms is written $S_n$.

## The sum by pairing

Add $1 + 2 + 3 + \dots + 100$ by pairing from the ends:

$$(1 + 100) + (2 + 99) + (3 + 98) + \dots$$

Every pair adds to $101$, and there are $50$ pairs, so the sum is $50 \times 101 = 5050$.

That is the whole idea behind the formula. Pairing terms from the two ends always gives
the same total, because whatever you add at the start you take away at the end. So the
average term is the average of the first and last, and

> **The sum of an arithmetic series.** $S_n = \dfrac{n}{2}(a + l)$, where $l$ is the $n$th
> (last) term.

Substituting $l = a + (n-1)d$ gives the other form:

$$S_n = \frac{n}{2}\left(2a + (n-1)d\right)$$

Use the first when the last term is visible, and the second when only $a$ and $d$ are
known.

**Example 1.** Find $3 + 7 + 11 + \dots + 83$.

From Section 9.1 this series has $21$ terms, with $a = 3$ and $l = 83$.

$$S_{21} = \frac{21}{2}(3 + 83) = \frac{21 \times 86}{2} = 21 \times 43 = 903$$

**Example 2.** Find the sum of the first $20$ terms of $5, 8, 11, \dots$.

Here the last term is not given, so use the second form:

$$S_{20} = \frac{20}{2}\left(2(5) + 19(3)\right) = 10(10 + 57) = 670$$

## Finding how many terms

**Example 3.** How many terms of $4, 7, 10, \dots$ add to $175$?

$$S_n = \frac{n}{2}\left(8 + 3(n-1)\right) = 175$$

$$n(3n + 5) = 350 \quad\Rightarrow\quad 3n^2 + 5n - 350 = 0$$

Solving gives $n = 10$ (the other root is negative, and a term number cannot be negative).

Check: $S_{10} = \dfrac{10}{2}(8 + 27) = 5 \times 35 = 175$. Correct.

> **Watch out.** A quadratic in $n$ can have two roots, and only one is a sensible answer.
> A term number must be a **positive whole number**, so reject a negative root and reject
> a non-integer. Also check your answer by substituting it back into the sum formula — it
> is quick, and it catches arithmetic errors in the quadratic.

## Progress check

Back to the chapter problem. **Plan A** saves $50, 70, 90, \dots$ with $a = 50$ and
$d = 20$ each month.

Find the total saved over 24 months using $S_{24} = \dfrac{24}{2}\left(2(50) + 23(20)\right)$.
Work it out and keep it — it is Plan A's answer. Section 9.3 works out Plan B, and then
you can compare them.

## You should now be able to

- say what a series is and what $S_n$ means;
- find an arithmetic sum using whichever form of the formula suits the information given;
- find how many terms give a particular sum, and reject the impossible root;
- explain why the sum is "$n$ times the average of the first and last terms".
