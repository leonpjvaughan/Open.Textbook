---
title: 21.4 The complement of an event — Learn
chapter: 21
chapter_title: Probability
section: '21.4'
section_title: The complement of an event
tier: O
refs:
- SP.2
kind: walkthrough
---

# 21.4 The complement of an event — Learn

**Prerequisites:** probability from equally likely outcomes in Section 21.3, and
subtracting fractions and decimals.

**Objectives:** write down the complement of an event; use $P(\text{not }A)=1-P(A)$;
use the complement to find the probability of "at least one".

By the end of this section you can find the probability that an event does not
happen.

## The complement

The **complement** of an event is the event that does not happen. If the event is
"it rains", its complement is "it does not rain". If the event is "the die shows a
6", its complement is "the die does not show a 6".

An event and its complement between them cover every outcome. One of them must
happen, and they cannot both happen. So their probabilities add to 1.

$$P(\text{not }A)=1-P(A)$$

This one rule saves a lot of counting.

**Example 1.** The probability that it rains tomorrow is $0.3$. Find the
probability that it does not rain.

$$P(\text{no rain})=1-0.3=0.7$$

The two events cover every possibility, so the two probabilities add to 1.

**Example 2.** A bag holds some counters. The probability of taking a red counter
is $\frac25$. Find the probability of not taking a red counter.

$$P(\text{not red})=1-\frac25=\frac35$$

Write the 1 as $\frac55$ to subtract: $\frac55-\frac25=\frac35$. The answer and the
original probability add to 1.

## The complement of "at least one"

"At least one" is an event with many outcomes. Its complement is easier: **none**.
Finding the probability of none and subtracting from 1 is usually the quickest
route.

**Example 3.** A fair coin is tossed twice. Find the probability of at least one
head.

The complement of at least one head is no heads at all, which is the outcome $TT$.

$$P(TT)=\frac12\times\frac12=\frac14$$

$$P(\text{at least one head})=1-\frac14=\frac34$$

Counting the three outcomes $HH$, $HT$ and $TH$ one at a time also works. The
complement is shorter, and it has fewer chances to go wrong.

**Example 4.** A fair six-sided die is rolled twice. Find the probability of at
least one 6.

The complement is no 6 on either roll. The probability of no 6 on one roll is
$\frac56$.

$$P(\text{no 6 twice})=\frac56\times\frac56=\frac{25}{36}$$

$$P(\text{at least one 6})=1-\frac{25}{36}=\frac{11}{36}$$

## Watch out

> **Watch out.** "Not $A$" is a statement about the whole sample space, not about a
> single outcome.
>
> If $P(\text{red})=\frac25$, then $P(\text{not red})=\frac35$. That includes
> every other colour at once, not one particular colour.
>
> **Re-check:** the two probabilities must add to exactly 1. If they do not, one of
> them is wrong.

A second trap is the complement of "at least one". The complement is "none", not
"exactly one". For at least one 6 in two rolls, the complement is no 6 at all.

## Progress check

Return to the chapter problem, the open-day game. The probability of winning a
prize is $\frac38$.

1. Write down the complement of the event "wins a prize".
2. Use $P(\text{not }A)=1-P(A)$ to find the probability of winning no prize.
3. Which is more likely, a prize or no prize? Compare your answer with $\frac12$.

In Section 21.5 you will see where the $\frac38$ comes from, by adding two events.

## You should now be able to

- write down the complement of an event in words;
- use $P(\text{not }A)=1-P(A)$ with fractions and with decimals;
- use the complement to find the probability of at least one;
- check an answer by adding the event and its complement and getting 1.
