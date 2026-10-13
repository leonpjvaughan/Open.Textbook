---
title: 13.1 Discrete probability distributions and the binomial distribution — Learn
chapter: 13
chapter_title: Statistical distributions
section: '13.1'
section_title: Discrete probability distributions and the binomial distribution
refs:
- N1
kind: walkthrough
---

# 13.1 Discrete probability distributions and the binomial distribution — Learn

**Prerequisites:** the probability rules for independent and mutually exclusive
events from Section 12.1; the binomial coefficient $\binom{n}{r}$ from
Section 4.1.

**By the end of this section you can:** list the values and probabilities of a
discrete random variable; check that a set of probabilities is a valid
distribution; recognise the four conditions for a binomial model; write
$X \sim B(n, p)$; and work out a single binomial probability from the formula.

## 1. Discrete random variables

A **random variable** is a number whose value depends on the outcome of an
experiment. A **discrete** random variable takes values that you can list, one
by one. We usually name it with a capital letter, such as $X$.

**Example 1.** A fair four-sided spinner has faces numbered 1, 2, 3 and 4. The
score is a random variable $X$. List the possible values of $X$ and find the
probability of each one.

The spinner can land on 1, 2, 3 or 4. Each face is equally likely, so

$$
P(X = 1) = P(X = 2) = P(X = 3) = P(X = 4) = \tfrac{1}{4}.
$$

The values of $X$ are 1, 2, 3 and 4, and each has probability $\tfrac14$.

**Example 2.** A fair coin is tossed three times. Let $X$ be the number of
heads. List the values of $X$ and find the probability of each one.

The number of heads can be 0, 1, 2 or 3. There are eight equally likely
sequences:

$$
\text{HHH, HHT, HTH, THH, HTT, THT, TTH, TTT.}
$$

One sequence gives three heads, three sequences give two heads, three give one
head, and one gives no heads. So

$$
P(X = 0) = \tfrac18, \quad
P(X = 1) = \tfrac38, \quad
P(X = 2) = \tfrac38, \quad
P(X = 3) = \tfrac18.
$$

## 2. A probability distribution

The full list of values and their probabilities is the **probability
distribution** of $X$. It is often written as a table. Every probability
distribution obeys two rules.

- Each probability is between 0 and 1, because it is a probability.
- The probabilities add up to 1, because the list covers every possible
  outcome.

Check Example 2:

$$
\tfrac18 + \tfrac38 + \tfrac38 + \tfrac18 = 1.
$$

The same two rules let you find a missing probability. If the probabilities are
$0.1$, $0.3$, $k$ and $0.2$, then

$$
k = 1 - (0.1 + 0.3 + 0.2) = 1 - 0.6 = 0.4.
$$

## 3. The binomial model

Many experiments have the same shape. A seed either germinates or it does not.
A machine part either passes inspection or it fails. In each case we count the
number of times one outcome happens.

A **binomial** random variable counts the number of successes in a fixed number
of trials. Four conditions must all hold.

1. There is a **fixed number** $n$ of trials.
2. Each trial has **two outcomes**. We call one a success and the other a
   failure.
3. The probability of success, $p$, is the **same for every trial**.
4. The trials are **independent**. The result of one trial does not change the
   probability for the next.

When all four conditions hold, we write

$$
X \sim B(n, p).
$$

The symbol $\sim$ means "is distributed as". The $B$ stands for binomial.

The labelling is a choice. In a seed packet, "success" can be "the seed
germinates". Then $p = 0.8$. If you instead call "the seed does not germinate" a
success, then $p = 0.2$. State which outcome you call a success before you
calculate.

## 4. The binomial probability formula

For a binomial variable $X \sim B(n, p)$, the probability of exactly $r$
successes is

$$
P(X = r) = \binom{n}{r} p^r (1-p)^{n-r}.
$$

The three parts of the formula each have a job.

- $\binom{n}{r}$ counts the **positions** of the $r$ successes among the $n$
  trials.
- $p^r$ is the probability that those $r$ trials are successes.
- $(1-p)^{n-r}$ is the probability that the other $n-r$ trials are failures.

**Example 3.** The random variable $X$ counts the number of sixes in six rolls
of a fair die. Find $P(X = 2)$.

There are $n = 6$ rolls, and the probability of a six is $p = \tfrac16$. The
complement is $1 - p = \tfrac56$. So

$$
P(X = 2) = \binom{6}{2} \left(\tfrac16\right)^2 \left(\tfrac56\right)^4.
$$

Work out the binomial coefficient and the two powers:

$$
\binom{6}{2} = 15, \qquad
\left(\tfrac16\right)^2 = \tfrac{1}{36}, \qquad
\left(\tfrac56\right)^4 = \tfrac{625}{1296}.
$$

Multiply:

$$
P(X = 2) = 15 \times \tfrac{1}{36} \times \tfrac{625}{1296}
= \tfrac{9375}{46656} \approx 0.2009.
$$

**Example 4.** From the seed packet, $X \sim B(20, 0.8)$. Find
$P(X = 20)$, the probability that every seed germinates.

Every one of the 20 seeds must germinate. There is $\binom{20}{20} = 1$ way for
that to happen, and

$$
P(X = 20) = \binom{20}{20} (0.8)^{20} (0.2)^{0} = (0.8)^{20} \approx 0.0115.
$$

So all 20 seeds germinate in about 1.15% of packets of this kind.

## 5. Try it: the shape of a binomial distribution

**Predict first.** The figure shows the probability distribution of a binomial
variable $X \sim B(n, p)$ as a bar chart. One bar has height $P(X = r)$.

Before you move the sliders, predict what happens to the shape when $p$
increases from 0.5 to 0.9. Write down where you think the tallest bar will sit,
and whether the chart will stay symmetric.

:::figure ch13-binomial-explorer

**Test.** Move the $p$ slider and watch the bars. Then change $n$ and watch
again. Note where the tallest bar sits, and whether the bars are symmetric
about it.

**Explain.** Write two sentences. The first explains how the tallest bar moves
when $p$ changes. The second explains why the chart is symmetric when
$p = 0.5$ but not when $p = 0.9$.

> **Watch out.** Three mistakes are common.
>
> **Using the binomial when the trials are not independent.** A bag holds five
> red and three blue counters. Two counters are taken without replacement. The
> probability for the second counter depends on the first, so $p$ is not
> constant. The binomial model does not apply. It does apply when the
> population is large enough that removing one item changes $p$ very little.
>
> **Forgetting the binomial coefficient.** The successes can sit in several
> positions. For $X \sim B(6, \tfrac16)$, the term for two sixes is
> $15 \times (\tfrac16)^2 (\tfrac56)^4$, not $(\tfrac16)^2 (\tfrac56)^4$. The
> coefficient $15$ counts the positions.
>
> **Using the wrong power for the failure.** The powers must add to $n$. For
> two successes in six trials, the failure power is $6 - 2 = 4$.
>
> **Re-check:** before using $B(n, p)$, run through the four conditions. After
> using the formula, check that the two powers add to $n$.

## You should now be able to

- list the values of a discrete random variable and their probabilities;
- check that a set of probabilities sums to 1, and find a missing probability;
- test a context against the four binomial conditions;
- write a binomial model as $X \sim B(n, p)$ and define what a success means;
- work out $P(X = r)$ using the binomial formula.
