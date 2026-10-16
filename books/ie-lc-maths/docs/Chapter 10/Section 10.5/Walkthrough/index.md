---
title: 10.5 Axioms of probability — Learn
chapter: 10
chapter_title: Counting and probability
section: '10.5'
section_title: Axioms of probability
tier: F
refs:
- '1.2'
kind: walkthrough
---

# 10.5 Axioms of probability — Learn

**Prerequisites:** Section 10.4 — sample spaces and set notation.

**Objectives:** use the two axioms of probability; use the complement rule and the addition
rule; find a probability by counting.

By the end of this section you can turn a count of outcomes into a probability, and use the
two rules that every probability obeys.

## From counting to probability

When every outcome in the sample space is equally likely, the probability of an event is

$$P(A) = \frac{n(A)}{n(\xi)} = \frac{\text{number of outcomes in } A}{\text{total number of outcomes}}$$

**Example 1.** A fair die is rolled. Find the probability of an even score.

The event is $A = \{2, 4, 6\}$, so $n(A) = 3$ and $n(\xi) = 6$. Then

$$P(A) = \frac{3}{6} = \frac{1}{2}$$

**Example 2.** A bag holds $4$ red and $6$ blue counters. One counter is drawn. Find the
probability that it is red.

There are $4$ red counters out of $10$ counters, so

$$P(\text{red}) = \frac{4}{10} = \frac{2}{5}$$

## The two axioms

> **The axioms of probability.**
> 1. For every event $A$, $0 \le P(A) \le 1$. A probability is never negative and never
>    greater than $1$.
> 2. The probabilities of all the outcomes in the sample space add up to $1$.

The second axiom gives the **complement rule**. Since $A$ and $A'$ together cover the whole
sample space,

$$P(A') = 1 - P(A)$$

**Example 3.** $P(A) = 0.4$. Find the probability that $A$ does not happen.

$$P(A') = 1 - 0.4 = 0.6$$

## Combining events

> **The addition rule.**
> $$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$
>
> When $A$ and $B$ are mutually exclusive, $P(A \cap B) = 0$, so
> $P(A \cup B) = P(A) + P(B)$.

**Example 4.** $P(A) = 0.5$, $P(B) = 0.4$ and $P(A \cap B) = 0.2$. Find $P(A \cup B)$.

$$P(A \cup B) = 0.5 + 0.4 - 0.2 = 0.7$$

> **Watch out.** The probabilities of all the outcomes must add to $1$. If a question gives
> you some of the probabilities and asks for the rest, subtract from $1$. And when you use
> the addition rule, always subtract $P(A \cap B)$; adding the two probabilities without
> subtracting counts the overlap twice.

## Progress check

Back to the chapter problem. The lucky dip has $28$ equally likely pairs. From Sections
10.3 and 10.4:

- both red: $10$ pairs;
- different colours: $15$ pairs;
- both blue: $3$ pairs.

Turn each count into a probability, using $P = \dfrac{\text{count}}{28}$:

$$P(\text{small}) = \frac{10}{28} = \frac{5}{14} \qquad
P(\text{star}) = \frac{15}{28} \qquad
P(\text{none}) = \frac{3}{28}$$

Check that the three probabilities add to $1$, and compare the small prize with the star
prize. Keep the comparison for the Review.

## You should now be able to

- find a probability by counting equally likely outcomes;
- state the two axioms of probability;
- use the complement rule $P(A') = 1 - P(A)$;
- use the addition rule, and simplify it for mutually exclusive events.
