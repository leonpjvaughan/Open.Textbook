---
title: 10.6 Conditional probability — Learn
chapter: 10
chapter_title: Counting and probability
section: '10.6'
section_title: Conditional probability
tier: O
refs:
- '1.2'
kind: walkthrough
---

# 10.6 Conditional probability — Learn

**Prerequisites:** Section 10.5 — the axioms, the complement rule and the addition rule.

**Objectives:** use the formula for $P(A \mid B)$; use the multiplication rule; read a tree
diagram.

By the end of this section you can update a probability when you learn that something has
happened.

## Updating a probability

Sometimes you learn something that changes the chance of an event. The probability of $A$
**given** that $B$ has happened is written $P(A \mid B)$ and called a **conditional
probability**.

> **Conditional probability.**
>
>
> $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) \ne 0$$

The condition restricts attention to the outcomes where $B$ happens. The formula asks what
fraction of those outcomes also have $A$.

**Example 1.** $P(A \cap B) = 0.2$ and $P(B) = 0.5$. Find $P(A \mid B)$.

$$P(A \mid B) = \frac{0.2}{0.5} = 0.4$$

## Conditional probability by counting

When the outcomes are equally likely, you can find a conditional probability by counting
inside the restricted sample space.

**Example 2.** A bag holds $5$ red and $3$ blue counters. Two counters are drawn without
replacement. Given that the first counter is red, find the probability that the second is
red.

Once a red counter is drawn, $4$ red and $3$ blue remain, so $7$ counters are left. Then

$$P(\text{second red} \mid \text{first red}) = \frac{4}{7}$$

## The multiplication rule

Rearranging the formula gives a way to find the probability that both events happen:

> **The multiplication rule.**
>
>
> $$P(A \cap B) = P(A \mid B) \times P(B)$$

**Example 3.** In Example 2, $P(\text{first red}) = \dfrac{5}{8}$, so

$$P(\text{both red}) = \frac{4}{7} \times \frac{5}{8} = \frac{5}{14}$$

A **tree diagram** shows this: multiply along a branch to find the probability of the path.

**Example 4.** The probability that it rains is $0.3$. If it rains, the probability that a
student is late is $0.4$. Then

$$P(\text{rain and late}) = 0.4 \times 0.3 = 0.12$$

> **Watch out.** In $P(A \mid B)$ the denominator is $P(B)$, the probability of the
> **condition**, not $P(A)$. And $P(A \mid B)$ is not the same as $P(B \mid A)$. The
> probability that a student is late given that it rains is not the probability that it
> rains given that the student is late. Read the condition first, and put it underneath.

## Progress check

Back to the chapter problem. The lucky dip draws two counters without replacement. There
are $5$ red counters.

If the first counter is red, then $4$ red and $3$ blue remain, so

$$P(\text{second red} \mid \text{first red}) = \frac{4}{7}$$

Multiply by the first stage, $P(\text{first red}) = \dfrac{5}{8}$:

$$P(\text{both red}) = \frac{5}{8} \times \frac{4}{7} = \frac{5}{14}$$

This matches the count of $\dfrac{10}{28}$ from Section 10.5. Section 10.7 asks whether the
two draws are independent.

## You should now be able to

- write down and use the formula for $P(A \mid B)$;
- find a conditional probability by counting in the restricted sample space;
- use the multiplication rule to find $P(A \cap B)$;
- read a probability from a branch of a tree diagram.
