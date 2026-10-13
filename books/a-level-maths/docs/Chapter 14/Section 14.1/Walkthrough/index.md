---
title: 14.1 The language of hypothesis testing — Learn
chapter: 14
chapter_title: Statistical hypothesis testing
section: '14.1'
section_title: The language of hypothesis testing
refs:
- O1
kind: walkthrough
---

# 14.1 The language of hypothesis testing — Learn

**Prerequisites:** the binomial distribution and how to find a binomial
probability, from earlier in this book; the words population, sample and
proportion from Chapter 11.

**By the end of this section you can:** write a null hypothesis and an
alternative hypothesis; decide whether a test is one-tailed or two-tailed;
explain the significance level; and name the test statistic, the critical value,
the critical region, the acceptance region and the p-value.

## 1. A claim and the evidence against it

The snack company claims that one packet in four contains a voucher. Written as a
proportion, the claim is

$$
p = 0.25.
$$

The customer opens 20 packets and finds 1 voucher. The claim is about every
packet the company makes. The 20 packets are a sample, and the sample
proportion is

$$
\frac{1}{20} = 0.05.
$$

The sample proportion is much lower than the claim. The question is whether the
difference is real, or whether a sample of 20 can fall this far below the
claim by chance.

A **hypothesis test** answers that question with a probability.

## 2. The null hypothesis and the alternative hypothesis

A hypothesis test has two hypotheses.

The **null hypothesis**, written $H_0$, is the claim you assume at the start. You
assume it until the evidence is strong enough to doubt it. For the vouchers,

$$
H_0: p = 0.25.
$$

The **alternative hypothesis**, written $H_1$, is the claim you suspect instead.
The customer suspects that fewer than one packet in four contains a voucher, so

$$
H_1: p < 0.25.
$$

The alternative can also point the other way, $H_1: p > 0.25$, or in both
directions at once, $H_1: p \ne 0.25$.

> **Watch out.** $H_0$ always uses an equals sign. The test measures how well the
> data fit one exact value of $p$, so the null model must name that value. If you
> write $H_0: p \le 0.25$ you have not given the model a single value to work
> with, and no probability can be calculated.

## 3. One tail or two tails?

The alternative decides how many tails the test has.

- If you only care about a departure in one direction, the test is
  **one-tailed**. The customer only minds if the number of vouchers is *low*, so
  $H_1: p < 0.25$ gives a one-tailed test on the lower tail.
- If a departure in either direction would matter, the test is **two-tailed**.
  A test of whether a coin is fair gives $H_1: p \ne 0.5$, because a coin that
  lands heads too often and a coin that lands heads too rarely are both
  interesting.

Choose the tail before you look at the data. Choosing the tail after you see the
data is a way of making any result look significant, and it is not honest.

## 4. The test statistic and the model

The **test statistic** is the value you calculate from the sample and compare
with the hypothesis. For the vouchers, the test statistic is the number of
vouchers in the 20 packets:

$$
X = 1.
$$

To find the probability of a result like this one, you need a model for $X$ when
$H_0$ is true. Under the null hypothesis, each packet contains a voucher with
probability $0.25$, so

$$
X \sim \mathrm{B}(20,\ 0.25).
$$

Two conditions matter. The packets are assumed to be independent, and the
probability is assumed to be the same for every packet. Section 14.2 returns to
these assumptions.

## 5. The significance level

The **significance level** is a small probability, written $\alpha$ (the Greek
letter alpha). You choose it before the test. Common choices are

$$
\alpha = 0.05 \quad \text{(5\%)} \qquad \text{and} \qquad \alpha = 0.01 \quad \text{(1\%)}.
$$

The significance level has one exact meaning:

> $\alpha$ is the probability of rejecting $H_0$ when $H_0$ is in fact true.

A rejection based on a sample can always be a mistake. The sample is unusual by
chance, and the test wrongly rejects a true claim. The significance level is the
risk of that mistake that you are willing to accept. A small $\alpha$ makes the
test harder to pass and lowers the risk of a false alarm.

## 6. The p-value

The **p-value** is the probability of a result at least as extreme as the one you
observed, assuming $H_0$ is true.

The observed count is 1. The lower tail contains 0 and 1, and results more
extreme than the observed one are the smaller counts. So

$$
\text{p-value} = P(X \le 1) = 0.0243 \quad (4 \text{ d.p.}).
$$

Read the p-value as a measure of surprise. A small p-value says the data would be
surprising if $H_0$ were true. A large p-value says the data are ordinary under
$H_0$.

Compare the p-value with $\alpha$:

- if $p \le \alpha$, reject $H_0$;
- if $p > \alpha$, retain $H_0$.

Here $0.0243 < 0.05$, so the test rejects $H_0$ at the 5% level.

## 7. The critical value, the critical region and the acceptance region

A test can also be described before any data are seen.

The **critical region** is the set of test statistic values that lead to
rejecting $H_0$. The **acceptance region** is every other value. The **critical
value** separates them.

For the vouchers, work from the extreme end of the lower tail:

$$
P(X \le 1) = 0.0243 \le 0.05, \qquad P(X \le 2) = 0.0913 > 0.05.
$$

The largest rejection region whose probability is at most $0.05$ is $X \le 1$,
so the critical value is 1. The test rejects $H_0$ when $X \le 1$, and retains
$H_0$ when $X \ge 2$.

The probability of the critical region, $0.0243$, is the actual risk of wrongly
rejecting $H_0$. It is at most the chosen level $0.05$, and it is often smaller,
because a count can only move in whole steps.

## 8. Worked examples

**Example 1 — writing the hypotheses.** A student suspects that a coin lands
heads more often than it should. Write $H_0$ and $H_1$, and state the tail.

The claim being tested is that the coin is fair, so

$$
H_0: p = 0.5.
$$

The student suspects too many heads, so

$$
H_1: p > 0.5.
$$

This is a one-tailed test on the upper tail.

**Example 2 — a p-value and a decision.** $X \sim \mathrm{B}(20, 0.25)$. A test at
the 5% level gives $X = 2$. Find the p-value and decide.

The observed count is 2, so the p-value is the lower tail $P(X \le 2)$:

$$
P(X \le 2) = 0.0913 \quad (4 \text{ d.p.}).
$$

Compare with the significance level:

$$
0.0913 > 0.05.
$$

The p-value is larger than $\alpha$, so the test retains $H_0$. Two vouchers in
20 is low, but a result this low happens often enough by chance when $p = 0.25$.

**Example 3 — from the critical region.** Continue with
$X \sim \mathrm{B}(20, 0.25)$ and the 5% level. Decide the test when $X = 1$,
working from the critical region instead of the p-value.

The critical region at the 5% level is $X \le 1$. The value $X = 1$ lies in the
critical region, so the test rejects $H_0$. The two routes always agree: the
critical region is exactly the set of results whose p-value is at most $\alpha$.

**Example 4 — a two-tailed test.** A coin is tossed 20 times and shows 15 heads.
Test at the 5% level whether the coin is fair.

The hypotheses are

$$
H_0: p = 0.5, \qquad H_1: p \ne 0.5.
$$

Under $H_0$, $X \sim \mathrm{B}(20, 0.5)$. The value 15 is above the centre, so
find the upper tail:

$$
P(X \ge 15) = 0.0207 \quad (4 \text{ d.p.}).
$$

A two-tailed test doubles the smaller tail, because a result 15 heads *or more*
and a result 5 heads *or fewer* are both evidence of bias:

$$
\text{p-value} = 2 \times 0.0207 = 0.0414.
$$

Since $0.0414 < 0.05$, the test rejects $H_0$ at the 5% level. There is sufficient
evidence to suggest the coin is not fair.

## 9. Try it: where does the tail start?

**Predict first.** The figure draws a binomial distribution and shades the
critical region. Before you touch a control, predict what happens to the shaded
region when you change the tail from "lower tail" to "two tails". Write down
whether the shaded area grows, shrinks or moves, and why.

:::figure ch14-binomial-tail

**Test.** Set the observed count to 2, then to 1, and watch the p-value. Change
the significance level from 5% to 1% and watch the shaded region. Finally change
the tail to "two tails".

**Explain.** Write two sentences. The first explains why a two-tailed test
doubles the tail. The second explains why a smaller significance level leaves a
smaller critical region.

> **Watch out.** Four traps appear in this section.
>
> **The p-value is not the probability that $H_0$ is true.** It is the
> probability of the observed result, or something more extreme, *given* that
> $H_0$ is true. Keep the direction of the condition clear.
>
> **"Retain $H_0$" does not mean "$H_0$ is true".** It means the evidence is not
> strong enough to doubt the claim. "Reject $H_0$" does not prove $H_1$ either.
>
> **One tail becomes two by mistake.** If $H_1$ uses $\ne$, the p-value doubles.
> If $H_1$ uses $<$ or $>$, it does not. Read the alternative before you finish.
>
> **The tail is chosen after the data are seen.** That is a way of mining the
> data for a result. Decide one-tailed or two-tailed first.
>
> **Re-check:** write $H_0$, $H_1$ and $\alpha$ down before any calculation.

## Progress check

1. A company claims that 30% of customers use a loyalty card. A sample is taken
   because the manager suspects the proportion is lower. Write $H_0$ and $H_1$,
   and name the tail.
2. Write down the meaning of the 5% significance level in one sentence.
3. $X$ is the number of vouchers in 20 packets, with $X \sim \mathrm{B}(20, 0.25)$.
   Work out $P(X \le 1)$ and decide the test at the 5% level.
4. Explain why the critical region stops at $X \le 1$ and does not include
   $X \le 2$.

## You should now be able to

- write a null hypothesis and an alternative hypothesis for a claim about a
  proportion;
- choose a one-tailed or a two-tailed test, and give a reason for the choice;
- explain the significance level as the probability of rejecting $H_0$ when
  $H_0$ is true;
- work out a p-value from a binomial distribution;
- find a critical value and state the critical region and the acceptance region;
- decide a test from either the p-value or the critical region.
