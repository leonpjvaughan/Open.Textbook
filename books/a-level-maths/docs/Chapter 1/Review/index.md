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

1. Prove that the sum of two consecutive odd numbers is a multiple of $4$.

2. Show that $137$ is prime.

3. Disprove the claim "Every whole number of the form $n^2 + 1$ is prime."

4. Prove that $\sqrt{5}$ is irrational.

5. Show that the sum of three consecutive whole numbers is a multiple of $3$.

6. Disprove the claim "For all real numbers $x$ and $y$, if $x > y$ then
   $x^2 > y^2$."

7. Prove that there is no largest odd number.

8. Show that every even number from $4$ to $14$ is the sum of two prime numbers.

9. Prove that $n^2 - n$ is even for every whole number $n$.

10. Prove that the product of two rational numbers is rational.

<details markdown="1">
<summary>Answers</summary>

1. **Deduction.** Consecutive odd numbers are $2n + 1$ and $2n + 3$. Their sum is
   $4n + 4 = 4(n + 1)$, a multiple of $4$.

2. **Exhaustion.** Since $11^2 = 121 \leq 137$ and $13^2 = 169 > 137$, test the
   primes $2$, $3$, $5$, $7$ and $11$. The remainders are $1$, $2$, $2$, $4$ and
   $5$, so none divides $137$. Therefore $137$ is prime.

3. **Counter example.** Take $n = 7$. Then $n^2 + 1 = 50$, and
   $50 = 2 \times 25$, so the value is not prime.

4. **Contradiction.** Assume $\sqrt{5} = a/b$ in lowest terms. Then
   $a^2 = 5b^2$, so $5$ divides $a^2$ and therefore $5$ divides $a$. Write
   $a = 5k$. Then $25k^2 = 5b^2$, so $5k^2 = b^2$, and $5$ divides $b$. Both $a$
   and $b$ are multiples of $5$, contradicting lowest terms. Therefore $\sqrt{5}$
   is irrational.

5. **Deduction.** The numbers are $n$, $n + 1$ and $n + 2$. Their sum is
   $3n + 3 = 3(n + 1)$, a multiple of $3$.

6. **Counter example.** Take $x = 1$ and $y = -2$. Then $x > y$, but
   $x^2 = 1 < 4 = y^2$.

7. **Contradiction.** Assume $M$ is the largest odd number, so $M = 2k + 1$. Then
   $M + 2 = 2k + 3 = 2(k + 1) + 1$ is odd and greater than $M$. This contradicts
   the choice of $M$, so there is no largest odd number.

8. **Exhaustion.** $4 = 2 + 2$, $6 = 3 + 3$, $8 = 3 + 5$, $10 = 3 + 7$,
   $12 = 5 + 7$ and $14 = 3 + 11$. The list covers every even number from $4$ to
   $14$.

9. **Deduction.** Factorise: $n^2 - n = n(n - 1)$. The numbers $n - 1$ and $n$ are
   consecutive, so one is even, and the product is even.

10. **Deduction.** Let the rational numbers be $\frac{a}{b}$ and $\frac{c}{d}$,
   with $b \neq 0$ and $d \neq 0$. Their product is $\frac{ac}{bd}$, and $bd \neq
   0$, so the product is a fraction of whole numbers. Therefore it is rational.
</details>

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
