---
title: 1.2 Proof by deduction — Practise with help
chapter: 1
chapter_title: Proof and mathematical argument
section: '1.2'
section_title: Proof by deduction
refs:
- A1
kind: guided-problems
---

# 1.2 Proof by deduction — Practise with help

Work each proof on paper first, closed book. Keep the general letter all the way
through, and write a sentence at the end.

## Warm-up: remember

1. Expand $(x + 3)(x - 2)$.
2. Factorise $n^2 + 3n$.
3. Write an odd whole number in the form $2n + 1$, and write an even whole
   number in the form $2m$.

<details markdown="1">
<summary>Answers</summary>

1. $x^2 + x - 6$.
2. $n(n + 3)$.
3. An odd number is $2n + 1$ and an even number is $2m$, for whole numbers $n$
   and $m$.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Prove that the sum of any two even numbers is even.

<details markdown="1">
<summary>Hint</summary>

Name the two numbers so that the factor $2$ is visible in each one. Call them
$2m$ and $2n$.
</details>

<details markdown="1">
<summary>Next step</summary>

Add the two expressions, then take out the common factor $2$.
</details>

<details markdown="1">
<summary>Full working</summary>

Let the two even numbers be $2m$ and $2n$, where $m$ and $n$ are whole numbers.
Their sum is

$$
2m + 2n = 2(m + n).
$$

The number $m + n$ is a whole number, so the sum is a multiple of $2$. Therefore
the sum of two even numbers is even.
</details>

**2.** Prove that the product of two consecutive whole numbers is even.

<details markdown="1">
<summary>Hint</summary>

Two consecutive whole numbers are $n$ and $n + 1$. One of any two consecutive
numbers is even.
</details>

<details markdown="1">
<summary>Next step</summary>

Split the proof into the two cases: $n$ even, and $n$ odd.
</details>

<details markdown="1">
<summary>Full working</summary>

Let the consecutive whole numbers be $n$ and $n + 1$.

If $n$ is even, it can be written as $2k$, so

$$
n(n + 1) = 2k(n + 1),
$$

which is a multiple of $2$.

If $n$ is odd, then $n + 1$ is even, so $n + 1 = 2k$ and

$$
n(n + 1) = 2kn,
$$

which is a multiple of $2$.

In both cases the product is even. The two cases cover every whole number $n$, so
the product of two consecutive whole numbers is even.
</details>

**3.** Prove that the square of an odd number is odd.

<details markdown="1">
<summary>Hint</summary>

Write the odd number as $2n + 1$ and square it. The result should be one more
than a multiple of $2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Expand $(2n + 1)^2$, then factor a $2$ out of the first two terms.
</details>

<details markdown="1">
<summary>Full working</summary>

Let the odd number be $2n + 1$. Its square is

$$
(2n + 1)^2 = 4n^2 + 4n + 1.
$$

Factorise the first two terms:

$$
4n^2 + 4n + 1 = 2(2n^2 + 2n) + 1.
$$

This is one more than a multiple of $2$, so it is odd. Therefore the square of an
odd number is odd.
</details>

**4.** Prove that the difference between the squares of two consecutive whole
numbers is odd.

<details markdown="1">
<summary>Hint</summary>

The two numbers are $n$ and $n + 1$. Write down the larger square first, so the
difference is positive.
</details>

<details markdown="1">
<summary>Next step</summary>

Expand $(n + 1)^2 - n^2$ and simplify.
</details>

<details markdown="1">
<summary>Full working</summary>

The two consecutive whole numbers are $n$ and $n + 1$. The difference of their
squares is

$$
(n + 1)^2 - n^2 = n^2 + 2n + 1 - n^2.
$$

The $n^2$ terms cancel:

$$
n^2 + 2n + 1 - n^2 = 2n + 1.
$$

The result $2n + 1$ is odd, so the difference between consecutive squares is odd.
</details>

**5.** Prove that $x^2 + 2x + 5$ is positive for every real number $x$.

<details markdown="1">
<summary>Hint</summary>

Complete the square. Half of $2$ is $1$, so start with $(x + 1)^2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $x^2 + 2x + 5 = (x + 1)^2 + c$ and find $c$ by comparing the constant
terms.
</details>

<details markdown="1">
<summary>Full working</summary>

Complete the square:

$$
x^2 + 2x + 5 = (x + 1)^2 + 4.
$$

A square is never negative, so $(x + 1)^2 \geq 0$. Therefore

$$
(x + 1)^2 + 4 \geq 4.
$$

Since $4 > 0$, the value is always positive.
</details>

**6.** Prove that the product of any three consecutive whole numbers is a
multiple of $3$.

<details markdown="1">
<summary>Hint</summary>

Three consecutive whole numbers contain exactly one multiple of $3$. Write them
as $n$, $n + 1$ and $n + 2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Consider the remainder when $n$ is divided by $3$. There are three cases:
remainder $0$, remainder $1$ and remainder $2$.
</details>

<details markdown="1">
<summary>Full working</summary>

Let the three consecutive whole numbers be $n$, $n + 1$ and $n + 2$. Every whole
number leaves remainder $0$, $1$ or $2$ on division by $3$.

- If $n = 3k$, then $n$ is a multiple of $3$.
- If $n = 3k + 1$, then $n + 2 = 3k + 3 = 3(k + 1)$ is a multiple of $3$.
- If $n = 3k + 2$, then $n + 1 = 3k + 3 = 3(k + 1)$ is a multiple of $3$.

In every case one of the three numbers is a multiple of $3$, so their product has
a factor $3$. Therefore the product is a multiple of $3$.
</details>
