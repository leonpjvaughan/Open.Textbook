---
title: 11.7 Sampling variability and the margin of error — Learn
chapter: 11
chapter_title: Statistics
section: '11.7'
section_title: Sampling variability and the margin of error
tier: H
refs:
- '1.7'
kind: walkthrough
---

# 11.7 Sampling variability and the margin of error — Learn

**Prerequisites:** Section 11.2 — bias; Section 11.5 — the standard deviation; Section
11.6 — the normal distribution.

**Objectives:** explain why two samples give different statistics; work out the standard
error and the margin of error for a proportion; interpret a $95\%$ confidence interval;
find the sample size needed for a given margin of error.

By the end of this section you can say how far a sample result can be from the truth, and
you can say what that statement does and does not promise.

## Sampling variability

Take two different simple random samples from the same population and you get two
different sample proportions. This is **sampling variability**, and it is not a mistake
in either sample. It is the price of measuring only a part of the population.

A sample of $1000$ voters does not give exactly the population proportion $p$. It gives a
sample proportion $\hat{p}$ that is close to $p$, and how close depends on the sample
size. The collection of all the values $\hat{p}$ could take, with their probabilities, is
the **sampling distribution** of the proportion.

## The standard error

The sampling distribution of the proportion has a mean of $p$ and a standard deviation
called the **standard error**:

> **The standard error of the proportion.**
> $$\sigma_{\hat{p}} = \sqrt{\frac{p(1 - p)}{n}}$$
> where $\sigma_{\hat{p}}$ is the standard error of the sample proportion and $n$ is the
> sample size.
> This is the formula in the formulae and tables booklet.

The standard error measures how much $\hat{p}$ varies from sample to sample. It gets
smaller as $n$ grows, because dividing by a larger $n$ makes the fraction smaller. To
halve the standard error, you must quadruple the sample size.

## The margin of error

A $95\%$ confidence interval for $p$ is

$$\hat{p} \pm 1.96\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$$

The number after the $\pm$ is the **margin of error**. Because $\hat{p}(1 - \hat{p})$ is
never more than $\dfrac{1}{4}$, the largest possible margin of error is about
$\dfrac{1}{\sqrt{n}}$. The course uses this maximum as the margin of error for a
proportion:

> **The margin of error for a proportion.**
> $$\text{margin of error} = \frac{1}{\sqrt{n}}$$
> This is the maximum radius of the $95\%$ confidence interval.

**Example 1.** A poll asks $1000$ voters. Find the margin of error.

$$\frac{1}{\sqrt{1000}} = 0.0316 = 3.2\%$$

So the poll's estimate is within about $3.2$ percentage points of the truth, at $95\%$
confidence.

**Example 2.** Find the sample size needed for a margin of error of $2.5\%$.

Set $\dfrac{1}{\sqrt{n}} = 0.025$ and solve for $n$:

$$n = \frac{1}{0.025^2} = 1600$$

A sample of $1600$ is needed. The sample size grows quickly as the margin of error
shrinks: to halve the margin of error, the sample must be four times as large.

## What the confidence level means

A $95\%$ confidence interval is built by a method that captures the true $p$ in $95\%$ of
samples. It does not say that there is a $95\%$ chance that this particular interval
contains $p$. The value $p$ is fixed; the interval is what varies from sample to sample.

A higher confidence level needs a wider interval. A $99\%$ interval uses $z = 2.576$ in
place of $1.96$, so the interval is wider and the statement is safer but less precise.

> **Watch out.** A margin of error covers sampling variability only. It says nothing
> about bias. A biased sample can have a small margin of error and still be wrong,
> because the error it measures is not the only error present. A large voluntary survey
> has a tiny margin of error and a large bias.

## Progress check

Back to the chapter problem. The poll used $1000$ voters and reported $52\%$ Yes.

Work out the margin of error, then the $95\%$ confidence interval for the proportion of
Yes voters.

$$\frac{1}{\sqrt{1000}} = 0.0316$$

$$0.52 \pm 0.0316 = (0.488, 0.552)$$

So the method gives an interval from $48.8\%$ to $55.2\%$. On the day, $48\%$ voted Yes,
which is just outside the interval. An interval misses about $5\%$ of the time, and this
was one of those times.

The interval is wide: it runs from a clear No to a clear Yes. A lead of four points is
smaller than the margin of error, so the poll could not tell the two sides apart. That is
what "too close to call" means, and it is the answer to the newspaper's headline.

## You should now be able to

- explain why two samples give different statistics;
- find the standard error of a proportion;
- find the margin of error for a proportion;
- build and interpret a $95\%$ confidence interval;
- find the sample size needed for a given margin of error;
- explain why a margin of error does not cover bias.
