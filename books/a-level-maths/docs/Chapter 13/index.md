---
title: 'Chapter 13: Statistical distributions'
chapter: 13
strand: statistics
anchor: How likely is a poor germination, and how tall do the plants grow?
---

# Chapter 13: Statistical distributions

## The chapter problem: the seed packet and the plant heights

A gardener buys a packet of 20 sunflower seeds. The supplier makes two claims
on the packet.

- Each seed germinates with probability 0.8, and the seeds germinate
  independently.
- The height of a mature plant is normally distributed with mean 45 cm and
  standard deviation 6 cm.

The gardener plants all 20 seeds. Only 13 of them germinate. The plants that
grow then have a range of heights.

Two questions follow. How likely is it that 13 or fewer of the 20 seeds
germinate, if the first claim is true? And what proportion of mature plants
should be taller than 52 cm, if the second claim is true?

By the end of the chapter you will answer both questions. You will also decide
which of the two models fits which quantity, and why.

> **First contact — no working needed yet.** Read the two claims. Predict which
> of these quantities is a count that you can list, and which is a measurement
> that can take any value in a range. Write your answer down.
>
> Then predict whether 13 germinations out of 20 is unusual. Do not calculate
> anything yet. Keep both predictions for the Review.

<details markdown="1">
<summary>If you are not sure where to start</summary>

A count answers the question "how many". You can write down every possible
answer, such as 0, 1, 2, and so on up to 20.

A measurement answers the question "how much". Between 44 cm and 45 cm there
are many possible heights, and a plant height can fall anywhere in that
interval.

For the second prediction, compare 13 with the number you would expect from 20
seeds when 8 in every 10 germinate.
</details>

## By the end of this chapter you will be able to

- list the values and the probabilities of a discrete random variable, and
  check that the probabilities sum to 1;
- recognise the conditions for a binomial model and write $X \sim B(n, p)$;
- work out a binomial probability using
  $P(X = r) = \binom{n}{r} p^r (1-p)^{n-r}$;
- find at-most, at-least and between probabilities for a binomial variable;
- describe the Normal distribution and use it as a model for a measurement;
- standardise a value and read a probability from a standard Normal table;
- explain how a histogram of many values approaches the Normal curve, and why
  the curve changes from concave to convex at $\mu \pm \sigma$;
- use the Normal distribution to approximate a binomial variable when the
  conditions are met;
- choose between the binomial and the Normal model for a context, and give a
  reason for your choice.

## Where it is used

Manufacturers test samples to estimate how many items will fail. Doctors use
the Normal curve to describe measurements such as blood pressure and birth
weight. Insurers model the number of claims in a year. Weather forecasters
describe the spread of possible temperatures.

Whenever a number varies from one trial to the next, a distribution describes
how it varies. The two models in this chapter, the binomial and the Normal,
cover a very large share of those situations.

## Your turn to connect it

Think of one situation where you would count how many times something happens
in a fixed number of tries, and one situation where you would measure something
that varies around an average. Write both down. For each one, say whether the
value is a count or a measurement. Keep your answer for the Review.

:::figure relevance-prompt

## Roadmap

1. [13.1 Discrete probability distributions and the binomial distribution](Section 13.1/Walkthrough/index.md)
2. [13.2 Calculating binomial probabilities](Section 13.2/Walkthrough/index.md)
3. [13.3 The Normal distribution as a model](Section 13.3/Walkthrough/index.md)
4. [13.4 Links to the binomial, histograms and points of inflection](Section 13.4/Walkthrough/index.md)
5. [13.5 Selecting an appropriate distribution](Section 13.5/Walkthrough/index.md)
6. [Review](Review/index.md)
