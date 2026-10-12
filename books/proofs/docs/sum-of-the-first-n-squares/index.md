---
title: The sum of the first n squares
---

# The sum of the first $n$ squares

Add up the square numbers:

$$1^2 + 2^2 + 3^2 + \dots + n^2 = \frac{n(n + 1)(2n + 1)}{6}$$

Check it with $n = 4$. The left side is $1 + 4 + 9 + 16 = 30$, and the right side
is $\dfrac{4 \times 5 \times 9}{6} = 30$. It works.

This page proves it for every $n$ at once. The method is **proof by induction**,
which is how a statement about *all* the counting numbers is usually proved.

## The shape of an induction proof

Induction has two steps, and you need both:

1. **Show it works for the first case.** Here, $n = 1$.
2. **Show that if it works for one case, it must work for the next.** That is: if
   the formula is true for some $n$, then it is true for $n + 1$.

Together those cover everything. Step 1 gets you to $n = 1$. Step 2 then carries
you from 1 to 2, from 2 to 3, from 3 to 4, and onward without end. It is worth
seeing why one step without the other proves nothing: a formula that is true only
for $n = 1$ passes step 1 and fails step 2, and a formula that is always one step
behind passes step 2 and fails step 1.

## Step 1: the first case

We need

$$1^2 = \frac{1 \times 2 \times 3}{6}$$

The right side is $\dfrac{6}{6} = 1$. So the statement is true when $n = 1$.

## Step 2: the inductive step

Now suppose the formula is true for some particular $n$. That is our **assumption**:

$$1^2 + 2^2 + \dots + n^2 = \frac{n(n + 1)(2n + 1)}{6}$$

We have to show the formula holds for $n + 1$, which means showing

$$1^2 + 2^2 + \dots + n^2 + (n + 1)^2 = \frac{(n + 1)(n + 2)(2n + 3)}{6}$$

Start with the left side and use the assumption to replace the long sum:

$$1^2 + \dots + n^2 + (n + 1)^2 = \frac{n(n + 1)(2n + 1)}{6} + (n + 1)^2$$

Now take out the common factor $(n + 1)$ from both terms:

$$= (n + 1)\left[\frac{n(2n + 1)}{6} + (n + 1)\right]$$

Put the second term over $6$ so the bracket is a single fraction:

$$= (n + 1)\left[\frac{n(2n + 1) + 6(n + 1)}{6}\right]$$

Expand the top:

$$= (n + 1)\left[\frac{2n^2 + n + 6n + 6}{6}\right] = (n + 1)\left[\frac{2n^2 + 7n + 6}{6}\right]$$

The quadratic on top factorises, because $2n^2 + 7n + 6 = (2n + 3)(n + 2)$:

$$= \frac{(n + 1)(n + 2)(2n + 3)}{6}$$

That is exactly the formula with $n + 1$ in place of $n$, because $2(n + 1) + 1 = 2n + 3$.

**Both steps are done.** The statement is true for $n = 1$, and true for $n+1$
whenever it is true for $n$. So it is true for every counting number.

## What each step is doing, and what it is not

The inductive step does **not** prove the formula for any particular number. It
proves a link between one case and the next. On its own it would be satisfied by a
formula that is wrong everywhere, as long as the wrongness matched up.

That is why step 1 is not a formality. It is the anchor: it is the one place the
formula is checked against reality, and the link in step 2 carries that check
onward through every number.

## A common error

Watch for this one, because it is easy to do in an exam and it costs the mark.

When you write "suppose the statement is true for $n$", you must then **use** that
supposition. A proof that subtracts the two sides and gets zero has usually assumed
the very thing it was asked to prove.

The safe structure is the one above: start from the left side, put the assumption
in, and arrive at the right side of the $n+1$ statement. The direction of the work
is what makes it a proof rather than a check.

## Check your understanding

1. Use the formula to work out $1^2 + 2^2 + \dots + 10^2$.
2. In step 1, why is it enough to check $n = 1$ rather than $n = 0$?
3. Show that if $\dfrac{n(n+1)(2n+1)}{6}$ is a whole number, then so is
   $\dfrac{(n+1)(n+2)(2n+3)}{6}$. What does that tell you about every value of this
   sum?

<details markdown="1">
<summary>Answers</summary>

1. $\dfrac{10 \times 11 \times 21}{6} = \dfrac{2310}{6} = 385$.
2. The statement is about $1^2 + 2^2 + \dots + n^2$, which begins at $1$ and has no
   $0^2$ term, so $n = 1$ is its first case. Starting at $0$ would prove something
   slightly different.
3. From step 2 the two fractions are equal, so the second is a whole number exactly
   when the first is. Starting from $n = 1$, which is a whole number, the step
   carries that along: the sum of the first $n$ squares is always a whole number.
</details>
