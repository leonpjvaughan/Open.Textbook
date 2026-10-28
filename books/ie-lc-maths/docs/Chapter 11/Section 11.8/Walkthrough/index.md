---
title: 11.8 The central limit theorem — Learn
chapter: 11
chapter_title: Statistics
section: '11.8'
section_title: The central limit theorem
tier: H
refs:
- '1.7'
kind: walkthrough
---

# 11.8 The central limit theorem — Learn

**Prerequisites:** Section 11.5 — the standard deviation; Section 11.6 — the normal
distribution; Section 11.7 — the standard error.

**Objectives:** describe the sampling distribution of the mean; find its mean and its
standard error; use the normal distribution to find a probability about a sample mean;
state what the central limit theorem says.

By the end of this section you can say how a sample mean behaves, even when the
population it came from is not normal.

## The sampling distribution of the mean

Section 11.7 looked at the sample proportion. The same idea applies to the sample mean.
Take many samples of size $n$ from one population and work out the mean of each. Those
means do not all agree, and their distribution is the **sampling distribution of the
mean**.

Two facts describe it.

- The mean of the sampling distribution is the population mean $\mu$. On average, the
  sample mean hits the population mean. A statistic with this property is **unbiased**.
- The standard deviation of the sampling distribution is the **standard error of the
  mean**:

> **The standard error of the mean.**
> $$\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{n}}$$
> where $\sigma$ is the population standard deviation, $\sigma_{\bar{x}}$ the standard
> error of the mean and $n$ the sample size.
> This is the formula in the formulae and tables booklet.

The standard error gets smaller as $n$ grows. A larger sample gives a more precise
estimate, and the precision improves with the square root of the sample size.

## The central limit theorem

Here is the surprising part. When $n$ is large, the sampling distribution of the mean is
approximately normal, whatever shape the population has. This is the **central limit
theorem**. It is stated here and not proved: the proof is a limit argument beyond this
course, and the result is used rather than reproduced.

> **The central limit theorem (stated, not proved here).** For a large sample size $n$,
> the sample mean $\bar{x}$ is approximately normally distributed with mean $\mu$ and
> standard deviation $\dfrac{\sigma}{\sqrt{n}}$.

A population can be skewed, or flat, or have two peaks. Take enough samples and average
them, and the means pile up in a bell shape. A sample size of about $30$ or more is often
large enough, and a larger sample gives a better approximation.

**Example 1.** A population has mean $100$ and standard deviation $15$. Samples of size
$25$ are taken. Find the mean and the standard error of the sampling distribution of the
mean.

The mean of the sampling distribution is the population mean, $100$. The standard error is

$$\sigma_{\bar{x}} = \frac{15}{\sqrt{25}} = \frac{15}{5} = 3$$

**Predict first.** The figure draws a binomial distribution and shades a tail.
Before you move a control, predict what happens to the shape as the number of
trials grows. Write down whether it becomes more or less like a bell, and why.

:::figure ch14-binomial-tail

**Test.** Start with a small number of trials and increase it. Watch the shape
and the shaded tail. Then change the tail from "lower tail" to "two tails" and
compare the shaded area.

**Explain.** Write two sentences. The first explains why the binomial shape
becomes more symmetric as the number of trials grows. The second explains why the
central limit theorem lets a normal distribution stand in for it.

## Using the normal distribution

Because the sample mean is approximately normal for large $n$, the standardising formula
of Section 11.6 works with the standard error in place of $\sigma$:

$$z = \frac{\bar{x} - \mu}{\sigma / \sqrt{n}}$$

Here $z$ counts how many standard errors the sample mean lies from $\mu$.

**Example 2.** For the population above, find the probability that a sample of $25$ has a
mean above $106$.

$$z = \frac{106 - 100}{3} = 2$$

From the standard normal table, $P(Z \le 2) = 0.9772$, so

$$P(\bar{x} > 106) = 1 - 0.9772 = 0.0228$$

About $2.3\%$ of samples of $25$ would have a mean above $106$, even though the population
mean is $100$. That is sampling variability at work.

**Example 3.** Find the probability that the same sample mean lies between $97$ and $103$.

$$z = \frac{97 - 100}{3} = -1, \qquad z = \frac{103 - 100}{3} = 1$$

$$P(97 < \bar{x} < 103) = 0.8413 - 0.1587 = 0.6826$$

The answer is about $0.68$, the empirical rule's band applied to the sample mean.

> **Watch out.** The standard error is not the standard deviation of the data. The data
> have standard deviation $\sigma$, which does not change with the sample size. The
> sample mean has standard error $\dfrac{\sigma}{\sqrt{n}}$, which does. Dividing by
> $\sqrt{n}$ is what makes a larger sample more precise.

## Progress check

Back to the chapter problem. The poll used $1000$ voters and reported $\hat{p} = 0.52$.
The standard error of the proportion is

$$\sigma_{\hat{p}} = \sqrt{\frac{0.52 \times 0.48}{1000}} \approx 0.0158$$

The value $0.5$ is a $50$-$50$ split. How many standard errors is the poll's result from
$0.5$?

$$z = \frac{0.52 - 0.50}{0.0158} \approx 1.27$$

The poll's result is about $1.27$ standard errors above a $50$-$50$ split. That is a
common distance for a fair coin-like process, which suggests the poll is consistent with a
$50$-$50$ split. Section 11.9 turns that observation into a formal test.

## You should now be able to

- describe the sampling distribution of the mean;
- find the standard error of the mean;
- explain why the sample mean is an unbiased estimate of $\mu$;
- state what the central limit theorem says;
- find a probability about a sample mean using the normal distribution.
