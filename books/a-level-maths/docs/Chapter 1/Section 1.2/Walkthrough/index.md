---
title: 1.2 Proof by deduction — Learn
chapter: 1
chapter_title: Proof and mathematical argument
section: '1.2'
section_title: Proof by deduction
refs:
- A1
kind: walkthrough
---

# 1.2 Proof by deduction — Learn

**Prerequisites:** expanding brackets; factorising; collecting like terms;
substituting values into an expression; the structure of an implication from 1.1.

**By the end of this section you can:** prove a general statement by working from
the assumption with algebra; choose a general letter for a number of a given
type; and write a conclusion that links the algebra back to the statement.

## 1. What deduction is

**Proof by deduction** starts from the assumption and moves forward one valid
step at a time until the conclusion is reached. Each step must follow from the
step before.

The key move is to work with a **general** representative. You do not test a few
numbers. You choose a letter for an unknown number and use facts that hold for
every value of that letter.

| Type of number | General form |
|---|---|
| Any whole number | $n$ |
| Any even number | $2n$ |
| Any odd number | $2n + 1$ |
| Two consecutive whole numbers | $n$, $n + 1$ |

The table is the whole tool kit. An even number is a multiple of $2$, so it can
always be written as $2n$. An odd number is one more than an even number, so it
can always be written as $2n + 1$.

## 2. A first deduction

**Example 1.** Prove that the sum of any two odd numbers is even.

Let the two odd numbers be $2m + 1$ and $2n + 1$, where $m$ and $n$ are whole
numbers.

Their sum is

$$
(2m + 1) + (2n + 1).
$$

Remove the brackets by collecting like terms:

$$
(2m + 1) + (2n + 1) = 2m + 2n + 2.
$$

Take out the common factor $2$:

$$
2m + 2n + 2 = 2(m + n + 1).
$$

The number $m + n + 1$ is a whole number, because $m$ and $n$ are. So the sum is
a multiple of $2$, and therefore even. This holds for every pair of odd numbers,
because $m$ and $n$ were never given particular values.

## 3. Using the assumption

A deduction starts from the assumption, so the first line is fixed for you. Read
the assumption, choose the general form that matches it, and write it down.

**Example 2.** Prove that $n^2 + n$ is even for every whole number $n$.

Factorise the expression:

$$
n^2 + n = n(n + 1).
$$

The numbers $n$ and $n + 1$ are consecutive, so one of them is even. A product
with an even factor is even, so $n(n + 1)$ is even, and $n^2 + n$ is even.

## 4. Clearing the algebra out of the way

Sometimes the statement is about the value of an expression for every $x$. Then
the deduction often starts by rewriting the expression into a shape whose sign
you can read.

**Example 3.** Prove that $x^2 - 4x + 7$ is positive for every real number $x$.

Complete the square:

$$
x^2 - 4x + 7 = (x - 2)^2 + 3.
$$

A square is never negative, so

$$
(x - 2)^2 \geq 0.
$$

Adding $3$ gives

$$
(x - 2)^2 + 3 \geq 3.
$$

Since $3 > 0$, the value of $x^2 - 4x + 7$ is at least $3$, so it is positive for
every $x$.

**Example 4.** Prove that $(n + 1)^2 - n^2 = 2n + 1$ for every whole number $n$.

Expand the bracket:

$$
(n + 1)^2 - n^2 = n^2 + 2n + 1 - n^2.
$$

The $n^2$ terms cancel:

$$
n^2 + 2n + 1 - n^2 = 2n + 1.
$$

So the difference is $2n + 1$, exactly as claimed.

> **Watch out.** Two traps sit in this section.
>
> **Testing a value instead of proving.** Writing "try $n = 3$ and it works"
> proves nothing about the other values of $n$. Use the general letter, and keep
> it instead of a number.
>
> **Starting from the thing you are asked to prove.** If you begin with
> $(n + 1)^2 - n^2 = 2n + 1$, you have assumed the result. Begin with the
> expression on its own, then simplify it.
>
> **Re-check:** does every line follow from the one above, and does the last line
> name the conclusion in words?

## Progress check

Claim A in the chapter problem says that $n^2 + n$ is even for every whole
number $n$.

1. What general form does an even number take? What general form does a whole
   number take?
2. Explain why $n(n + 1)$ must contain an even factor.
3. Write the final sentence of the proof in your own words.

## You should now be able to

- start a proof from the assumption, using a general letter;
- write an even number as $2n$ and an odd number as $2n + 1$;
- chain algebra steps, with a reason for each one;
- complete the square to prove that an expression is always positive;
- finish with a sentence that links the algebra to the original statement.
