---
title: 10.3 Combinations — Learn
chapter: 10
chapter_title: Counting and probability
section: '10.3'
section_title: Combinations
tier: O
refs:
- '1.1'
kind: walkthrough
---

# 10.3 Combinations — Learn

**Prerequisites:** Section 10.2 — permutations and factorial notation.

**Objectives:** use $\dbinom{n}{r}$; decide when order does not matter; count selections.

By the end of this section you can count how many ways a group can be chosen, when the
order of choosing does not matter.

## Selections where order does not matter

A **combination** is a selection in which the order does not matter. Choosing a committee
of three people from ten is a combination: choosing Ann, then Ben, then Cara gives the
same committee as choosing Cara, then Ben, then Ann.

The number of ways to choose $r$ objects from $n$, when order does not matter, is written
$\dbinom{n}{r}$ and read "$n$ choose $r$".

> **Combinations.** $\dbinom{n}{r} = \dfrac{n!}{r!(n-r)!}$, and
> $\dbinom{n}{r} = \dbinom{n}{n-r}$.

The second rule says that choosing which $r$ objects to keep is the same as choosing which
$n - r$ objects to leave out.

**Example 1.** Find $\dbinom{6}{2}$.

$$\binom{6}{2} = \frac{6 \times 5}{2 \times 1} = 15$$

**Example 2.** A committee of $3$ is chosen from $10$ people. How many committees are
possible?

$$\binom{10}{3} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = 120$$

**Example 3.** A group is chosen from $5$ boys and $6$ girls. How many ways can $2$ boys
and $2$ girls be chosen?

Choose the boys and the girls separately, then multiply:

$$\binom{5}{2} \times \binom{6}{2} = 10 \times 15 = 150$$

The two choices are independent, so the fundamental principle applies.

## Permutation or combination?

The test is one question: **does a different order give a different result?**

- If yes, it is a permutation. Counting ways to fill first and second place is a
  permutation, because first and second are different.
- If no, it is a combination. Counting a committee is a combination, because the committee
  is the same set whatever the order.

A combination is a permutation divided by the number of orders. Each set of $r$ objects
can be arranged in $r!$ orders, so

$$\binom{n}{r} = \frac{{}^{n}P_{r}}{r!}$$

> **Watch out.** Do not use a permutation when the order does not matter. Choosing $3$
> players from $8$ gives $\dbinom{8}{3} = 56$ teams, not ${}^{8}P_{3} = 336$. The
> permutation counts each team $3! = 6$ times, once for every order of the three players.
> Ask the order question first, every time.

## Progress check

Back to the chapter problem. The lucky dip draws two counters from the bag at once, so the
order does not matter. The number of pairs is

$$\binom{8}{2} = \frac{8 \times 7}{2} = 28$$

Now count each prize:

- both red: $\dbinom{5}{2} = 10$ pairs;
- different colours: $5 \times 3 = 15$ pairs;
- both blue: $\dbinom{3}{2} = 3$ pairs.

The counts add to $10 + 15 + 3 = 28$, which is every pair. Keep them for Section 10.5,
which turns the counts into probabilities.

## You should now be able to

- say what a combination is, and when order does not matter;
- use the formula for $\dbinom{n}{r}$;
- use $\dbinom{n}{r} = \dbinom{n}{n-r}$ to simplify a calculation;
- decide between a permutation and a combination, and say why.
