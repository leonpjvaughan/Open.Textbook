---
title: 10.2 Permutations — Learn
chapter: 10
chapter_title: Counting and probability
section: '10.2'
section_title: Permutations
tier: O
refs:
- '1.1'
kind: walkthrough
---

# 10.2 Permutations — Learn

**Prerequisites:** Section 10.1 — the fundamental principle of counting.

**Objectives:** use factorial notation; count arrangements with ${}^{n}P_{r}$; decide when
order matters.

By the end of this section you can count the arrangements of a set of objects, and the
ordered selections of some of them.

## Arrangements where order matters

A **permutation** is an arrangement in which the order matters. Arranging four books on a
shelf is a permutation: the same four books in a different order is a different
arrangement.

For the first position there are $4$ choices. The book used cannot be used again, so the
second position has $3$ choices, the third has $2$, and the last has $1$. By the
fundamental principle, the number of arrangements is

$$4 \times 3 \times 2 \times 1 = 24$$

## Factorial notation

The product $4 \times 3 \times 2 \times 1$ is written $4!$ and read "four factorial".

> **Factorial.** $n! = n \times (n-1) \times \dots \times 2 \times 1$, and $0! = 1$.

So $5! = 120$ and $6! = 720$. The factorial grows quickly: $10! = 3628800$.

## Ordered selections of some of the objects

Sometimes you arrange only some of the objects. The number of ordered selections of $r$
objects from $n$ is written ${}^{n}P_{r}$.

> **Permutations.** ${}^{n}P_{r} = n \times (n-1) \times \dots \times (n-r+1)$, which is
> $r$ factors counting down from $n$.

For example, ${}^{7}P_{2} = 7 \times 6 = 42$.

**Example 1.** How many ways can $5$ runners fill first and second place?

$${}^{5}P_{2} = 5 \times 4 = 20 \text{ ways}$$

**Example 2.** A code uses $3$ different letters chosen from $5$, in order. How many codes
are possible?

$${}^{5}P_{3} = 5 \times 4 \times 3 = 60 \text{ codes}$$

**Example 3.** Find the value of ${}^{10}P_{3}$.

$${}^{10}P_{3} = 10 \times 9 \times 8 = 720$$

> **Watch out.** ${}^{n}P_{r}$ has **$r$ factors**, counting down from $n$, and it is not
> $n!$. For ${}^{10}P_{3}$ the factors are $10$, $9$ and $8$: three factors, because three
> positions are being filled. Writing $10!$ would count arrangements of all ten objects,
> not three of them.

## Progress check

Back to the chapter problem. The lucky dip draws two counters from $8$, one after the
other, without replacement, so the order matters. The number of ordered pairs is

$${}^{8}P_{2} = 8 \times 7 = 56$$

There are $5$ red counters. How many ordered pairs are **both red**? Count them with
${}^{5}P_{2}$. Keep the number for Section 10.3, which counts the same draws without
caring about order.

## You should now be able to

- say what a permutation is, and when order matters;
- use factorial notation;
- count arrangements of all $n$ objects with $n!$;
- count ordered selections of $r$ objects from $n$ with ${}^{n}P_{r}$.
