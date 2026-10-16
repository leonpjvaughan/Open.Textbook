---
title: 9.6 Proof by induction — Learn
chapter: 9
chapter_title: Sequences and series
section: '9.6'
section_title: Proof by induction
tier: H
refs:
- '4.1'
kind: walkthrough
---

# 9.6 Proof by induction — Learn

**Prerequisites:** Sections 9.1 to 9.2 — the sum formulas; algebraic manipulation.

**Objectives:** state the three parts of an induction proof; carry one out; explain why the
base case is needed.

By the end of this section you can prove that a formula holds for **every** whole number,
which checking individual cases can never do.

## Why checking is not enough

The sum of the first $n$ odd numbers is $1, 4, 9, 16, \dots$ — which looks like $n^2$.
Check $n = 1$: $1 = 1^2$. $n = 2$: $1 + 3 = 4 = 2^2$. $n = 3$: $9 = 3^2$. It certainly
looks true.

But checking is never a proof. No matter how many values you check, there are infinitely
many left. Induction is the method that proves a statement for all of them at once.

## The three parts

> **Proof by induction.**
> 1. **Base case.** Show the statement is true for the first value, usually $n = 1$.
> 2. **Inductive hypothesis.** Assume it is true for $n = k$, for some $k \ge 1$.
> 3. **Inductive step.** Using that assumption, prove it is true for $n = k + 1$.

Then the statement is true for every whole number from the base case onwards.

The idea is a row of dominoes. The base case knocks the first one over; the inductive step
says that each one knocks the next. Together, every domino falls.

## A full proof

**Theorem.** For every whole number $n \ge 1$,
$$\sum_{r=1}^{n} r = 1 + 2 + \dots + n = \frac{n(n+1)}{2}$$

**Base case ($n = 1$).** Left-hand side $= 1$. Right-hand side $= \dfrac{1 \times 2}{2} = 1$.
Both sides are $1$, so the statement holds.

**Inductive hypothesis.** Assume the statement is true for $n = k$:
$$1 + 2 + \dots + k = \frac{k(k+1)}{2}$$

**Inductive step.** Prove it for $n = k + 1$, that is, that
$$1 + 2 + \dots + k + (k+1) = \frac{(k+1)(k+2)}{2}$$

Start from the left and use the hypothesis:

$$1 + 2 + \dots + k + (k+1) = \frac{k(k+1)}{2} + (k+1)$$

Take out the common factor $(k+1)$:

$$= (k+1)\left(\frac{k}{2} + 1\right) = (k+1)\frac{k+2}{2} = \frac{(k+1)(k+2)}{2}$$

That is the formula with $n = k + 1$, so the step is proved.

**Conclusion.** True for $n = 1$, and true for $k+1$ whenever true for $k$. So it is true
for every $n \ge 1$ by induction.

## A second example

**Theorem.** The sum of the first $n$ odd numbers is $n^2$:
$$1 + 3 + 5 + \dots + (2n - 1) = n^2$$

**Base case ($n = 1$).** $1 = 1^2$. True.

**Hypothesis.** Assume $1 + 3 + \dots + (2k - 1) = k^2$.

**Step.** The next odd number is $2(k+1) - 1 = 2k + 1$, so

$$1 + 3 + \dots + (2k - 1) + (2k + 1) = k^2 + (2k + 1) = (k+1)^2$$

which is the formula with $n = k + 1$. The step is proved.

**Conclusion.** True for all $n \ge 1$.

> **Watch out.** The inductive step is **conditional**: "if true for $k$, then true for
> $k+1$". On its own it proves nothing. You must state and prove the base case, or the
> chain has nothing to start from. And when you do the step, you must **use** the
> hypothesis — if your working never uses the assumption, something is wrong.

## Progress check

Back to the chapter problem. Plan A is arithmetic: €50, €70, €90, … Its total after $n$
months is $S_n = \dfrac{n}{2}\left(2(50) + (n-1)20\right)$.

Instead of trusting the formula you used, prove a version of it by induction. Take the
simplest case you can: prove that $1 + 2 + \dots + n = \dfrac{n(n+1)}{2}$ for all
$n \ge 1$. The proof above is the model — write it out in your own words, with all three
parts labelled.

Then say, in one sentence, what the proof gives you that checking $n = 1, 2, 3$ does not.

## You should now be able to

- write down the three parts of an induction proof in order;
- carry out an induction proof for a sum formula, using the hypothesis in the step;
- explain why the base case is necessary;
- say what a proof by induction establishes that checking examples cannot.
