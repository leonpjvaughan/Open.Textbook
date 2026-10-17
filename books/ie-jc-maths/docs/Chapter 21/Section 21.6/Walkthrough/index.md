---
title: 21.6 Independent events and the multiplication rule — Learn
chapter: 21
chapter_title: Probability
section: '21.6'
section_title: Independent events and the multiplication rule
tier: O
refs:
- SP.2
kind: walkthrough
---

# 21.6 Independent events and the multiplication rule — Learn

**Prerequisites:** multiplying fractions from Chapter 5, the sample space from
Section 21.1, and the addition rule in Section 21.5.

**Objectives:** say when two events are independent; use the multiplication rule
for two events joined by **and**; draw a tree diagram for two successive events.

By the end of this section you can combine two events that are joined by **and**.

## Independent events

Two events are **independent** when one of them does not change the chance of the
other. The result of a die roll does not change the spinner, so the die and the
spinner are independent. Tossing a coin twice gives independent events, because
the coin has no memory.

Two draws from a bag are independent only when the first counter is put back.
Putting it back restores the bag, so the second draw faces the same bag as the
first.

## The multiplication rule

When two events are independent, multiply their probabilities.

$$P(A\text{ and }B)=P(A)\times P(B)$$

**Example 1.** A fair coin is tossed twice. Find the probability of two heads.

$$P(H\text{ and }H)=\frac12\times\frac12=\frac14$$

One of the four outcomes, $HH$, is two heads. The multiplication rule and the
count agree.

**Example 2.** The open-day game. The die and the spinner are independent. Find
the probability of the star prize, a 6 and an A.

$$P(6\text{ and }A)=\frac16\times\frac14=\frac{1}{24}$$

The same answer came from counting in Section 21.3: 1 of the 24 outcomes is a 6
with an A. Two methods, one answer, which is a useful check.

**Example 3.** A bag holds 2 red and 3 blue counters. A counter is taken, put
back, and a second counter is taken. Find the probability that both are red.

The bag is restored after the first draw, so the draws are independent.

$$P(\text{red and red})=\frac25\times\frac25=\frac{4}{25}$$

## A tree diagram

A **tree diagram** shows two successive events. Each branch carries a probability.
To find the probability of a path, multiply along the branches. To find the
probability of two or more paths, add their results.

For two coin tosses, the first branch splits into $H$ and $T$ with probability
$\frac12$ each, and each of those splits again the same way.

$$P(H\text{ then }T)=\frac12\times\frac12=\frac14$$

$$P(\text{exactly one head})=P(HT)+P(TH)=\frac14+\frac14=\frac12$$

## Investigate with and without replacement

**Predict.** Before you change anything, predict whether the fractions on the second set
of branches will change when the counter is not put back.

:::figure probability-tree

**Test.** Leave the bag at 2 red and 3 blue with the counter put back, and read the
fractions on both sets of branches. Then untick the box and watch the second set change.
Try a bag with 1 red and 1 blue as well.

**Explain.** Write two or three sentences. Say why the two draws are independent when
the counter goes back, and why they are not independent when it does not.

## Watch out

> **Watch out.** Multiply only when the events are independent. Drawing two
> counters **without** replacement does not give independent events.
>
> From a bag with 2 red and 3 blue, the first red has probability $\frac25$. After
> a red is taken, 1 red and 3 blue remain, so the second red has probability
> $\frac14$, not $\frac25$.
>
> **Re-check:** ask whether the first event changes the second. If the bag or the
> deck has changed, the events are not independent.

A second trap is **and** against **or**. "A 6 and an A" multiplies, and gives
$\frac{1}{24}$. "A 6 or an A" adds, with the overlap subtracted, and gives
$\frac38$. The two answers are different.

## Progress check

Return to the chapter problem, the open-day game. The die and the spinner are
independent.

1. Write $P(6)$ and $P(A)$.
2. Multiply them to find the probability of the star prize.
3. Check your answer against the count from the sample space.

In Section 21.7 you will read probabilities from tables and tree diagrams.

## You should now be able to

- say whether two events are independent;
- use $P(A\text{ and }B)=P(A)\times P(B)$ for independent events;
- multiply fractions, simplifying the answer;
- draw a tree diagram for two successive events;
- multiply along a branch and add across branches;
- tell the multiplication rule for **and** from the addition rule for **or**.
