---
title: 10.7 Independent events — Learn
chapter: 10
chapter_title: Counting and probability
section: '10.7'
section_title: Independent events
tier: F
refs:
- '1.3'
kind: walkthrough
---

# 10.7 Independent events — Learn

**Prerequisites:** Section 10.6 — conditional probability and the multiplication rule.

**Objectives:** state the test for independence; use it to find probabilities; tell
independence apart from mutual exclusivity.

By the end of this section you can decide whether two events affect each other, and use the
answer to find probabilities.

## When one event does not change another

Two events are **independent** when the outcome of one does not change the probability of
the other. If $A$ and $B$ are independent, then

$$P(A \mid B) = P(A)$$

Learning that $B$ happened tells you nothing about $A$. Substituting into the conditional
formula gives the test:

> **Independence.** $A$ and $B$ are independent when
> $$P(A \cap B) = P(A) \times P(B)$$
>
> For several independent events, multiply all the probabilities together.

**Example 1.** A fair coin is tossed twice. Find the probability of two heads.

The tosses are independent, so

$$P(\text{HH}) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$$

**Example 2.** $P(A) = 0.5$, $P(B) = 0.4$ and $P(A \cap B) = 0.25$. Are $A$ and $B$
independent?

$$P(A) \times P(B) = 0.5 \times 0.4 = 0.2$$

This is not equal to $P(A \cap B) = 0.25$, so the events are **not** independent.

**Example 3.** Three independent events each have probability $0.5$. The probability that
all three happen is

$$0.5 \times 0.5 \times 0.5 = \frac{1}{8}$$

## Independent or mutually exclusive?

These are different ideas, and mixing them up is a common error.

- **Independent** means one happening does not change the chance of the other. They can
  happen together, and often do.
- **Mutually exclusive** means they cannot happen together, so $P(A \cap B) = 0$.

In fact, two mutually exclusive events with non-zero probability are **not** independent:
if one happens, the other cannot, so the first event changes the chance of the second from
its original value to $0$.

> **Watch out.** Use $P(A \cap B) = P(A) \times P(B)$ only when you know the events are
> independent. Do not assume independence from the wording of a question. Two draws
> without replacement are **not** independent, because the first draw changes the bag.

## With and without replacement

A draw with replacement returns the object, so the probabilities stay the same and the
draws are independent. A draw without replacement removes the object, so the second
probability changes and the draws are not independent.

**Example 4.** A bag holds $5$ red and $3$ blue counters.

- With replacement: $P(\text{both red}) = \dfrac{5}{8} \times \dfrac{5}{8} = \dfrac{25}{64}$.
- Without replacement: $P(\text{both red}) = \dfrac{5}{8} \times \dfrac{4}{7} = \dfrac{5}{14}$.

The two answers differ, which shows that the without-replacement draws are not independent.

## Progress check

Back to the chapter problem. The lucky dip draws two counters **without** replacement, so
the draws are not independent. From Section 10.6,

$$P(\text{both red}) = \frac{5}{8} \times \frac{4}{7} = \frac{5}{14} \approx 0.357$$

If the counter were replaced, the draws would be independent and

$$P(\text{both red}) = \frac{5}{8} \times \frac{5}{8} = \frac{25}{64} \approx 0.391$$

The replacement raises the chance, because the first red counter stays in the bag. Say
which game gives the better chance of the small prize, and why.

## You should now be able to

- state the test for two events being independent;
- decide whether two events are independent from their probabilities;
- multiply probabilities for independent events;
- explain the difference between independent and mutually exclusive events.
