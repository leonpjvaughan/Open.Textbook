---
title: 10.8 Bernoulli trials and the binomial distribution — Learn
chapter: 10
chapter_title: Counting and probability
section: '10.8'
section_title: Bernoulli trials and the binomial distribution
tier: H
refs:
- '1.3'
kind: walkthrough
---

# 10.8 Bernoulli trials and the binomial distribution — Learn

**Prerequisites:** Section 10.7 — independent events; Section 10.3 — combinations.

**Objectives:** state the conditions for a binomial distribution; use the binomial formula;
find a probability such as $P(X = r)$ or $P(X \ge 1)$.

By the end of this section you can find the probability of a given number of successes in a
fixed number of repeated trials.

## Repeated trials with two outcomes

A trial with only two outcomes is called a **Bernoulli trial**. One outcome is a
**success** and the other is a **failure**. Tossing a coin, rolling a die and drawing a
counter are all trials of this kind.

When a Bernoulli trial is repeated, and the trials are independent, the number of successes
has a **binomial distribution**.

> **The binomial distribution.** A random variable $X$ has the binomial distribution
> $B(n, p)$ when there are $n$ independent trials, each with the same probability $p$ of
> success. Then
>
>
> $$P(X = r) = \binom{n}{r} p^r (1-p)^{n-r}$$

The binomial coefficient $\dbinom{n}{r}$ counts the ways to choose which $r$ of the $n$
trials are the successes. The powers $p^r$ and $(1-p)^{n-r}$ give the probability of one
such arrangement.

## Using the formula

**Example 1.** $X \sim B(5, 0.3)$. Find $P(X = 2)$.

$$P(X = 2) = \binom{5}{2}(0.3)^2(0.7)^3 = 10 \times 0.09 \times 0.343 = 0.3087$$

The two powers add to $5$, which is $n$.

**Example 2.** $X \sim B\left(6, \tfrac14\right)$. Find $P(X = 2)$.

$$P(X = 2) = \binom{6}{2}\left(\frac14\right)^2\left(\frac34\right)^4
= 15 \times \frac{1}{16} \times \frac{81}{256} = \frac{1215}{4096}$$

## The complement shortcut

To find $P(X \ge 1)$, it is quicker to use the complement:

$$P(X \ge 1) = 1 - P(X = 0) = 1 - (1-p)^n$$

**Example 3.** $X \sim B\left(8, \tfrac14\right)$. Find $P(X \ge 1)$.

$$P(X \ge 1) = 1 - \left(\frac34\right)^8 = 1 - \frac{6561}{65536}
= \frac{58975}{65536} \approx 0.8999$$

Adding the eight separate probabilities would give the same answer, with much more work.

> **Watch out.** In the formula, the exponent of $p$ is the number of successes $r$, and
> the exponent of $(1-p)$ is the number of failures $n - r$. The two exponents add to $n$.
> A common error is to swap them, which gives the probability of $n - r$ successes instead.
> Also check the four conditions before using the formula: a fixed number of trials, two
> outcomes, the same $p$ each time, and independent trials.

## Progress check

Back to the chapter problem. The stallholder changes the game. The counter is now replaced
after each draw, so every draw is independent and the probability of red is $\dfrac{5}{8}$
each time. The game is played $6$ times.

The number of red counters is $X \sim B\left(6, \dfrac58\right)$. Find the probability of
exactly $4$ red counters:

$$P(X = 4) = \binom{6}{4}\left(\frac58\right)^4\left(\frac38\right)^2
= \frac{84375}{262144} \approx 0.3219$$

So exactly $4$ red counters is the single most likely result, but it still happens less
than a third of the time. The Review compares this with the without-replacement game.

## You should now be able to

- say what a Bernoulli trial is;
- state the conditions for a binomial distribution;
- use the formula $P(X = r) = \dbinom{n}{r}p^r(1-p)^{n-r}$;
- use the complement to find $P(X \ge 1)$ quickly.
