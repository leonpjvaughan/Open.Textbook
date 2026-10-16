---
title: 9.5 Recurrence relations — Learn
chapter: 9
chapter_title: Sequences and series
section: '9.5'
section_title: Recurrence relations
tier: O
refs:
- '4.1'
kind: walkthrough
---

# 9.5 Recurrence relations — Learn

**Prerequisites:** Section 9.1 — arithmetic sequences; Section 9.3 — geometric sequences.

**Objectives:** use a recurrence relation to generate terms; find a fixed point.

By the end of this section you can define a sequence one term at a time, and find the value
it moves towards.

## Defining each term from the last

A **recurrence relation** defines each term from the one (or ones) before it. It needs a
starting value to get going.

**Example 1.** $T_1 = 2$ and $T_{n+1} = 3T_n - 1$.

$$T_1 = 2 \qquad T_2 = 3(2) - 1 = 5 \qquad T_3 = 3(5) - 1 = 14 \qquad T_4 = 3(14) - 1 = 41$$

The sequence is $2, 5, 14, 41, \dots$

The difference from a formula for $T_n$ is what you need to reach a far term. A formula
gives $T_{100}$ immediately; a recurrence makes you work up from $T_1$, one step at a
time.

## The two familiar recurrences

The sequences from the earlier sections are recurrences in disguise.

- **Arithmetic:** $T_{n+1} = T_n + d$ — add a constant each step.
- **Geometric:** $T_{n+1} = rT_n$ — multiply by a constant each step.

**Example 2.** $T_1 = 3$, $T_{n+1} = T_n + 7$.

This adds $7$ each step, so it is arithmetic with $a = 3$, $d = 7$, and
$T_5 = 3 + 4(7) = 31$.

## Fixed points

A **fixed point** of a recurrence is a value $L$ that would stay the same if the sequence
reached it.

$$L = f(L)$$

**Example 3.** Find the fixed point of $T_{n+1} = \dfrac{1}{2}T_n + 10$.

$$L = \frac{1}{2}L + 10 \quad\Rightarrow\quad \frac{1}{2}L = 10 \quad\Rightarrow\quad L = 20$$

Starting from $T_1 = 100$ the terms are $100, 60, 40, 30, \dots$ and they move towards
$20$ without ever reaching it.

> **Watch out.** A fixed point is not the same as a limit. The recurrence
> $T_{n+1} = 4T_n - 9$ has the fixed point $L = 3$, but unless the sequence starts exactly
> at $3$ it moves *away* from $3$ rather than towards it. Finding a fixed point always
> works; whether the sequence converges to it depends on the recurrence.

**Example 4.** Find the fixed point of $T_{n+1} = 4T_n - 9$.

$$L = 4L - 9 \quad\Rightarrow\quad 3L = 9 \quad\Rightarrow\quad L = 3$$

The terms move away from $3$ unless $T_1 = 3$ exactly, so $3$ is a fixed point but not a
limit.

## Progress check

Back to the chapter problem. Plan B increases by 10% each month, so it satisfies

$$T_{n+1} = 1.1\,T_n$$

Write that recurrence down, and say what kind of sequence it defines. Then find its fixed
point by solving $L = 1.1L$ — and notice what the only solution is. A fixed point of zero
means the sequence has nothing to settle on, which is another way of seeing why a 10%
increase cannot continue forever and must stop at 24 months.

## You should now be able to

- generate terms from a recurrence relation;
- recognise an arithmetic or geometric sequence given as a recurrence;
- find the fixed point of a recurrence by solving $L = f(L)$;
- say why a fixed point is not automatically a limit.
