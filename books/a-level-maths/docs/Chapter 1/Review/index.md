---
title: 'Chapter 1: Review'
chapter: 1
kind: review
---

# Chapter 1: Review

## The chapter problem, solved

**Claim A. For every whole number $n$, the value of $n^2 + n$ is even.**

Factorise the expression:

$$
n^2 + n = n(n + 1).
$$

The numbers $n$ and $n + 1$ are consecutive, so one of them is even. The product
of a whole number and an even number is even, so $n(n + 1)$ is even. Claim A is
**true**.

**Claim B. For every whole number $n$, the value of $n^2 + n + 41$ is prime.**

Take $n = 40$. Then

$$
n^2 + n + 41 = 1600 + 40 + 41 = 1681.
$$

But

$$
1681 = 41 \times 41,
$$

so the value is not prime. A single counter example disproves the claim. Claim B
is **false**. The formula works for the values $n = 0$ to $39$, and that long run
of successes is exactly the trap: evidence is not proof.

**Claim C. There is a largest prime number.**

Assume, for contradiction, that the primes can all be listed:

$$
p_1, p_2, p_3, \ldots, p_n.
$$

Form $N = p_1 p_2 \cdots p_n + 1$. Each prime $p_i$ divides the product, so $N$
leaves remainder $1$ when divided by each $p_i$. No prime in the list divides
$N$. But
$N > 1$, so $N$ has a prime factor, and that factor must be in the complete list
of primes. This is a contradiction. Claim C is **false**: there is no largest
prime.

Three claims, three different methods: deduction proved a "for all" statement,
one counter example disproved another, and contradiction settled the third.

## Mixed practice — choose the method first

For each question, say which method you will use — deduction, exhaustion,
counter example, or contradiction — and why. Only then calculate.

:::problems chapter-01-review

:::answers chapter-01-review

## What you can now do

- read a mathematical statement and name its assumption and conclusion;
- tell "for all" from "there is", and use "converse", "necessary" and
  "sufficient";
- prove a general statement by deduction, using the general forms $2n$ and
  $2n + 1$;
- prove a statement about a finite set by exhaustion, and say when a list of
  cases is complete;
- disprove a "for all" statement with one counter example;
- prove a statement by contradiction, including the irrationality of $\sqrt{2}$
  and the infinity of the primes;
- choose a method for a new claim and say why it fits.

## Your relevance reflection

Return to the prompt in the chapter opener: *a rule that seemed true in every
example you tried, but turned out to have an exception*. Write one more example
now that you have finished the chapter. Has the chapter changed what you notice
about a claim such as "this always works"? Write a sentence saying which kind of
evidence would make you trust such a claim, and which kind would make you doubt
it.
