---
title: 'Chapter 10: Review'
chapter: 10
kind: review
---

# Chapter 10: Review

## The chapter problem, solved

**The lucky dip.** The bag holds $5$ red and $3$ blue counters, so $8$ counters. Two are
drawn without replacement, and the order does not matter.

**Count the draws.** The number of pairs is

$$\binom{8}{2} = \frac{8 \times 7}{2} = 28$$

**Count each outcome.**

- Both red: $\dbinom{5}{2} = 10$ pairs.
- Different colours: $5 \times 3 = 15$ pairs.
- Both blue: $\dbinom{3}{2} = 3$ pairs.

The three counts add to $10 + 15 + 3 = 28$, which is every pair.

**The probabilities.**

$$P(\text{small prize}) = \frac{10}{28} = \frac{5}{14} \approx 0.357$$

$$P(\text{star prize}) = \frac{15}{28} \approx 0.536 \qquad
P(\text{no prize}) = \frac{3}{28} \approx 0.107$$

**The answer.** The **star prize** is the most likely single outcome, at $\dfrac{15}{28}$.
It is more likely than the small prize and the no-prize outcome combined, because there are
more red counters than blue and either colour order gives a star prize.

**The conditional check.** If the first counter is red, $4$ red and $3$ blue remain, so
$P(\text{second red} \mid \text{first red}) = \dfrac{4}{7}$. Multiplying the two stages
gives

$$P(\text{both red}) = \frac{5}{8} \times \frac{4}{7} = \frac{5}{14}$$

which matches the count above.

**Dependent, not independent.** The draws are without replacement, so the first draw
changes the second. If the counter were put back, the draws would be independent and
$P(\text{both red}) = \dfrac{5}{8} \times \dfrac{5}{8} = \dfrac{25}{64} \approx 0.391$,
a little higher than $\dfrac{5}{14}$. Replacing the counter keeps the chance of red at
$\dfrac{5}{8}$ every time.

**The stallholder's follow-up.** Suppose the counter is replaced after each draw, and the
game is played $6$ times. The number of red counters is then $X \sim B\left(6, \dfrac58\right)$,
and

$$P(X = 4) = \binom{6}{4}\left(\frac58\right)^4\left(\frac38\right)^2
= \frac{84375}{262144} \approx 0.3219$$

so exactly $4$ red counters is the single most likely result, but still under a third of
the time.

## Mixed practice — choose the method first

Work through these without notes. For each one, say **which method** you will use —
fundamental principle, permutation, combination, complement, conditional probability,
independence, or the binomial distribution — before you calculate. Three of them come from
earlier chapters.

:::problems chapter-10-review

:::answers chapter-10-review

## What you can now do

- count outcomes by multiplying the choices at each stage;
- count ordered arrangements with permutations;
- count unordered selections with combinations;
- describe a sample space and write events as sets;
- use the axioms, the complement rule and the addition rule;
- find a conditional probability, and use the multiplication rule;
- test two events for independence;
- use the binomial distribution for a fixed number of independent trials.

## Thinking back

Look at the chance you chose at the start of the chapter — a weather forecast, a game at a
fair, a team's chance of winning, or a guess on a quiz.

Decide how you would count it. If the outcomes are equally likely, count the outcomes that
favour the event and divide by the total, using permutations when order matters and
combinations when it does not. If you learn something new, use a conditional probability.
If the same trial repeats a fixed number of times, with two outcomes and a constant
probability, use the binomial distribution.

Then answer the question you started with. Write down the probability, and say whether
your original guess was close. Changing your mind when the count disagrees is the
mathematics working, not a mistake.
