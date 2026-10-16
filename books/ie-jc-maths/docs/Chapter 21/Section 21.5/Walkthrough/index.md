---
title: 21.5 Two events and the addition rule — Learn
chapter: 21
chapter_title: Probability
section: '21.5'
section_title: Two events and the addition rule
tier: O
refs:
- SP.2
kind: walkthrough
---

# 21.5 Two events and the addition rule — Learn

**Prerequisites:** probability from equally likely outcomes in Section 21.3, and
the complement in Section 21.4.

**Objectives:** find the probability that one event or another happens; use the
addition rule; recognise events that cannot both happen.

By the end of this section you can combine two events that are joined by **or**.

## Two events joined by "or"

Two events can both be described in one experiment. For a die:

- event $A$ could be "the result is even";
- event $B$ could be "the result is greater than 4".

The event "$A$ or $B$" happens when at least one of them happens. It includes the
results that are in $A$, the results that are in $B$, and the results that are in
both.

The two events **overlap** when some outcome is in both. For the die, the result 6
is even and it is greater than 4, so 6 is in both events.

## The addition rule

If you add $P(A)$ and $P(B)$, the overlap is counted twice. So subtract it once.

$$P(A\text{ or }B)=P(A)+P(B)-P(A\text{ and }B)$$

**Example 1.** A fair six-sided die is rolled. Find the probability of an even
number or a number greater than 4.

The even results are 2, 4 and 6, so $P(\text{even})=\frac36$.

The results greater than 4 are 5 and 6, so $P(\text{greater than }4)=\frac26$.

The result 6 is in both, so $P(\text{both})=\frac16$.

$$P(\text{even or greater than }4)=\frac36+\frac26-\frac16=\frac46=\frac23$$

You can check by counting. The results that are even or greater than 4 are 2, 4, 5
and 6, which is 4 of the 6 outcomes.

## Events that cannot both happen

Two events are **mutually exclusive** when they cannot both happen. On one roll of
a die, "the result is 1" and "the result is 2" are mutually exclusive.

When the events are mutually exclusive, $P(A\text{ and }B)=0$, so the subtraction
disappears.

$$P(A\text{ or }B)=P(A)+P(B)$$

**Example 2.** A fair six-sided die is rolled. Find the probability of a 1 or a 2.

$$P(1\text{ or }2)=\frac16+\frac16=\frac26=\frac13$$

The results 1 and 2 cannot both happen on one roll, so there is no overlap to
subtract.

**Example 3.** The open-day game. Find the probability of a prize, which needs a 6
or an A.

$$P(6)=\frac16 \qquad P(A)=\frac14 \qquad P(6\text{ and }A)=\frac{1}{24}$$

$$P(6\text{ or }A)=\frac16+\frac14-\frac{1}{24}=\frac{4}{24}+\frac{6}{24}-\frac{1}{24}=\frac{9}{24}=\frac38$$

Write the fractions with the common denominator 24. The star prize outcome, a 6
with an A, is in both events, so it is subtracted once.

## Watch out

> **Watch out.** Do not forget the overlap. Adding $P(A)$ and $P(B)$ counts the
> outcomes in both events twice.
>
> For the die, $\frac36+\frac26=\frac56$, but the correct answer is $\frac46$.
> The difference is the $\frac16$ for the result 6, which was counted in both.
>
> **Re-check:** ask whether one outcome can be in both events. If it can, subtract
> its probability once.

A second trap is the meaning of **or**. In probability, "or" includes both events.
"A 6 or an A" is true for a 6 with an A.

## Progress check

Return to the chapter problem, the open-day game.

1. Write $P(6)$ and $P(A)$ as fractions with denominator 24.
2. Write $P(6\text{ and }A)$.
3. Use the addition rule to find the probability of a prize.

In Section 21.6 you will find the probability of both events happening, using the
multiplication rule.

## You should now be able to

- say when two events overlap and when they are mutually exclusive;
- use $P(A\text{ or }B)=P(A)+P(B)-P(A\text{ and }B)$;
- use the shorter form $P(A\text{ or }B)=P(A)+P(B)$ for mutually exclusive events;
- write the fractions with a common denominator before adding or subtracting;
- check an answer by counting the outcomes that match.
