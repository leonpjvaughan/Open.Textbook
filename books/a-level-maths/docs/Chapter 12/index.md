---
title: 'Chapter 12: Probability'
chapter: 12
strand: statistics
anchor: When the alarm sounds, is there a fire?
---

# Chapter 12: Probability

## The chapter problem: when the alarm sounds, is there a fire?

A warehouse has a fire-detection system. Tests give the manufacturer two
reliability figures:

- when there is a fire, the alarm sounds with probability $0.95$;
- when there is no fire, the alarm still sounds with probability $0.02$.

The second figure is the **false-alarm rate**. A detector that cries wolf is
annoying, but a detector that stays silent in a fire is dangerous.

Fires are rare. Records for this warehouse suggest that on any morning there is
a real fire with probability $0.001$. That is one morning in a thousand.

Early one morning the alarm sounds. The site manager must decide whether to call
the fire service. The manager knows the two reliability figures, and now needs
one more number:

$$
P(\text{fire} \mid \text{alarm}).
$$

This is the probability of a fire, given that the alarm has already sounded. By
the end of the chapter you will work it out. The answer surprises most people,
and the reason for the surprise is the heart of this chapter.

> **First contact — no working needed yet.** Before you calculate anything,
> predict the value of $P(\text{fire} \mid \text{alarm})$. Choose one:
>
> - above $0.5$;
> - between $0.1$ and $0.5$;
> - below $0.1$.
>
> Write your choice down, with one sentence that gives your reason. Keep the
> prediction for the Review.

<details markdown="1">
<summary>If you are not sure where to start</summary>

Think about how often the alarm sounds. Fires happen only one morning in a
thousand. The alarm also sounds on about 2 mornings in 100 when there is no
fire, and there are many more mornings with no fire. A detector can be reliable
and still sound far more often by mistake than by design.

You do not need the exact number yet. The prediction only has to be a first
judgement that you can test later.
</details>

## By the end of this chapter you will be able to

- use the addition rule for mutually exclusive events;
- use the general addition rule $P(A \text{ or } B) = P(A) + P(B) - P(A \text{ and } B)$;
- test whether two events are independent, using $P(A \text{ and } B) = P(A)P(B)$;
- explain the difference between mutually exclusive events and independent
  events;
- find a conditional probability from a two-way table, a Venn diagram or a tree
  diagram;
- use the formula $P(A \mid B) = \dfrac{P(A \text{ and } B)}{P(B)}$ and its
  rearrangement $P(A \text{ and } B) = P(A \mid B)P(B)$;
- find the probability of an event by adding the tree-diagram paths that lead to
  it;
- work backwards from a result to its cause, as the site manager must;
- build a probability model from a real situation, state its assumptions, and
  criticise them;
- refine a model when an assumption fails, and describe how the answer moves.

## Where it is used

Probability is how we reason when we cannot see the whole picture. A doctor
reads a screening test and must judge how much a positive result means. A bank
checks a payment against a model of fraud. A weather centre attaches a
percentage to rain. An insurance company sets a premium from the chance of a
claim. A manufacturer samples a batch instead of testing all of it.

In each case someone builds a model, states assumptions, and reads a number. The
reading is only as good as the assumptions, which is why this chapter ends with
criticism, not only calculation. The same ideas return in Chapter 13, where a
distribution is the model, and in Chapter 14, where a test turns a probability
into a decision.

## Your turn to connect it

Think of a test, an alarm or a check you have met that can be wrong. It could be
a smoke alarm, a phone that unlocks with your face, a security warning on a
website, or a screening test. Write down what a positive or alarmed result would
mean to you. Then write down one reason the result might be wrong. Keep your
answer for the Review.

## Roadmap

1. [12.1 Mutually exclusive and independent events](Section 12.1/Walkthrough/index.md)
2. [12.2 Conditional probability and the conditional probability formula](Section 12.2/Walkthrough/index.md)
3. [12.3 Modelling with probability and critiquing assumptions](Section 12.3/Walkthrough/index.md)
4. [Review](Review/index.md)
