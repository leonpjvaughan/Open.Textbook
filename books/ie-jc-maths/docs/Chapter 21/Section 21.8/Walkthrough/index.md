---
title: 21.8 Expected frequency — Learn
chapter: 21
chapter_title: Probability
section: '21.8'
section_title: Expected frequency
tier: H
refs:
- SP.2
kind: walkthrough
---

# 21.8 Expected frequency — Learn

**Prerequisites:** probability from equally likely outcomes in Section 21.3, and
relative frequency in Section 21.2.

**Objectives:** work out an expected frequency from a probability; compare the
expected number with what actually happens; use relative frequency as an estimate.

By the end of this section you can predict how often an event happens in many
trials, and judge whether an experimental result is ordinary.

## Expected frequency

An **expected frequency** is the number of times you predict an event will happen
in a given number of trials.

$$\text{expected frequency}=P(\text{event})\times\text{number of trials}$$

The word **expected** means the long-run average, not a promise. If you repeat the
experiment, the actual number usually differs from the expected number.

**Example 1.** A fair six-sided die is rolled 300 times. Work out the expected
number of 6s.

$$300\times\frac16=50$$

The expected number of 6s is 50. A run of 300 rolls that gives 44 sixes is
ordinary, and it does not on its own mean the die is unfair.

**Example 2.** A spinner lands on red with probability $\frac38$. It is spun 400
times. Work out the expected number of reds.

$$400\times\frac38=150$$

The expected number of reds is 150. The probability is less than one half, so
fewer than half of the spins are expected to be red.

## Comparing expected with observed

The number you actually see is the **observed frequency**. Compare it with the
expected frequency to judge the result.

**Example 3.** A die is rolled 300 times and shows a 6 on 44 of the rolls. Compare
this with the expected number.

The expected number is $300\times\frac16=50$, and the observed number is 44. The
difference is $50-44=6$.

A difference of 6 in 300 rolls is ordinary. The relative frequency is
$\frac{44}{300}=\frac{11}{75}$, which is about $0.147$, close to the theoretical
$\frac16$ of about $0.167$.

More trials usually bring the relative frequency closer to the theoretical
probability. That is why a small difference in 300 rolls is not evidence of a
faulty die, but a large difference in 3000 rolls would be worth checking.

## The open-day game

The chapter problem is a good place to use expected frequency. The probability of
a prize is $\frac38$, and the star prize has probability $\frac{1}{24}$.

If the game is played 240 times:

$$240\times\frac38=90 \qquad 240\times\frac{1}{24}=10$$

The organiser should expect about 90 prizes in total, of which about 10 are star
prizes. Buying a few more than 10 star prizes is sensible, because the actual
number varies.

## Watch out

> **Watch out.** An expected frequency is not a guarantee. It is the average over
> many repetitions.
>
> The expected number of 6s in 300 rolls is 50, but a run of 300 rolls will
> usually give a number near 50 rather than exactly 50.
>
> **Re-check:** if an observed number differs from the expected number, ask how
> large the difference is compared with the number of trials. A small difference
> is ordinary.

A second trap is a probability greater than one half. If $P(\text{event})>0.5$,
the expected frequency is more than half of the trials. If
$P(\text{event})<0.5$, it is less than half. That comparison is a quick check on
your answer.

## Progress check

Return to the chapter problem, the open-day game. The game is played 240 times.
The probability of a prize is $\frac38$ and the probability of the star prize is
$\frac{1}{24}$.

1. Work out the expected number of prizes.
2. Work out the expected number of star prizes.
3. The organiser buys exactly 10 star prizes. Is that a safe number? Say why.

In the Review you will bring together every part of the chapter problem.

## You should now be able to

- work out an expected frequency from a probability and a number of trials;
- compare an expected frequency with an observed frequency;
- work out a relative frequency and compare it with the theoretical probability;
- say why a small difference between expected and observed is ordinary;
- say why more trials usually improve the estimate.
