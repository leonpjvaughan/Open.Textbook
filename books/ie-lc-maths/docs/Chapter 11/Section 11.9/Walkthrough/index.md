---
title: 11.9 Hypothesis testing and confidence intervals — Learn
chapter: 11
chapter_title: Statistics
section: '11.9'
section_title: Hypothesis testing and confidence intervals
tier: H
refs:
- '1.7'
kind: walkthrough
---

# 11.9 Hypothesis testing and confidence intervals — Learn

**Prerequisites:** Section 11.6 — the normal distribution; Section 11.8 — the standard
error and the central limit theorem.

**Objectives:** write a null and an alternative hypothesis; carry out a two-tailed
large-sample test of a population mean; build a $95\%$ confidence interval for a mean and
for a proportion; interpret a $p$-value.

By the end of this section you can test a claim about a population, and you can state how
sure the answer is.

## Hypotheses

A **hypothesis test** starts with a claim about a population parameter. The claim that
nothing has changed is the **null hypothesis**, written $H_0$. The claim we are looking
for evidence of is the **alternative hypothesis**, written $H_1$.

**Example 1.** A company claims that the mean charging time of its new phone is $44$
minutes. A sample suggests it may be different. Write the hypotheses.

$$H_0: \mu = 44 \qquad H_1: \mu \neq 44$$

The symbol $\neq$ makes this a **two-tailed** test, because a difference in either
direction counts as evidence against $H_0$. A test that looks only for a difference in one
direction is **one-tailed**.

## The test statistic

For a large sample, the sample mean is approximately normal by the central limit theorem.
The test statistic counts how many standard errors the sample mean lies from the claimed
mean:

> **The one-sample $z$-test.**
>
>
> $$z = \frac{\bar{x} - \mu}{\sigma / \sqrt{n}}$$
>
>
> where $\bar{x}$ is the sample mean, $\mu$ the claimed mean, $\sigma$ the population
> standard deviation and $n$ the sample size.
> This is the formula in the formulae and tables booklet.

**Example 2.** A sample of $80$ new phones has mean charging time $45.4$ minutes. The
population standard deviation is $3.1$ minutes. Test the claim that the mean is $44$
minutes at the $5\%$ level.

The standard error is

$$\frac{3.1}{\sqrt{80}} \approx 0.3466$$

:::class averaging

The test statistic is

$$z = \frac{45.4 - 44}{0.3466} \approx 4.04$$

**Predict first.** The figure draws a normal curve and shades the critical
region for a $5\%$ test. Before you move a control, predict what happens to the
shaded area when the sample size rises from $16$ to $64$. Write down whether the
shaded region grows, shrinks or stays the same, and why.

:::figure ch14-normal-test

**Test.** Set the sample mean to $45.4$, the standard deviation to $3.1$ and the
sample size to $80$. Read the test statistic and the $p$-value. Now raise the
sample size and watch both values. Then change the tail to "two tails".

**Explain.** Write two sentences. The first explains why a larger sample makes
the same sample mean give a more extreme test statistic. The second explains why
the two-tailed $p$-value is twice the one-tailed value.

## The p-value and the decision

The **$p$-value** is the probability of getting a result at least as extreme as the one
observed, if $H_0$ is true. A small $p$-value means the observed result would be unlikely
under $H_0$, so it is evidence against $H_0$.

The **significance level** $\alpha$ is the risk we accept of rejecting $H_0$ when it is
true. The common choice is $\alpha = 0.05$, which is $5\%$. The rule is:

- if $p < \alpha$, reject $H_0$;
- if $p \ge \alpha$, retain $H_0$.

For Example 2, the two-tailed $p$-value is very small, about $0.00005$. Since
$0.00005 < 0.05$, reject $H_0$. There is strong evidence that the mean charging time is
not $44$ minutes.

Retaining $H_0$ does not prove that $H_0$ is true. It means the sample did not provide
enough evidence against it.

## Confidence intervals

A **confidence interval** gives a range of plausible values for the parameter. A $95\%$
confidence interval for the population mean is

$$\bar{x} \pm 1.96\frac{\sigma}{\sqrt{n}}$$

**Example 3.** For the phones, build the $95\%$ confidence interval for the mean.

$$45.4 \pm 1.96 \times 0.3466 = 45.4 \pm 0.68$$

$$(44.72, 46.08)$$

The interval does not contain $44$, so a two-tailed test at the $5\%$ level rejects the
claim that the mean is $44$. That link always holds: a $95\%$ confidence interval contains
exactly the values that a two-tailed test at the $5\%$ level would retain.

:::prove mean-minimises-squared-error

For a population proportion $p$ and a sample proportion $\hat{p}$ from a sample of
size $n$, the $95\%$ confidence interval is

$$\hat{p} \pm 1.96\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$$

**Example 4.** A poll of $1000$ voters gives $\hat{p} = 0.52$. Build the $95\%$ interval.

$$\sqrt{\frac{0.52 \times 0.48}{1000}} \approx 0.0158, \qquad 1.96 \times 0.0158 \approx 0.0310$$

$$0.52 \pm 0.0310 = (0.489, 0.551)$$

> **Watch out.** A $p$-value is not the probability that $H_0$ is true. It is the
> probability of the observed result, or something more extreme, **assuming** $H_0$ is
> true. A small $p$-value says the data are unlikely under $H_0$; it does not put a
> probability on $H_0$.

## Progress check

Back to the chapter problem. Test whether the poll's result is consistent with a $50$-$50$
split. Use $H_0: p = 0.5$, $H_1: p \neq 0.5$ and $\alpha = 0.05$.

The standard error under $H_0$ is

$$\sqrt{\frac{0.5 \times 0.5}{1000}} \approx 0.0158$$

The test statistic is

$$z = \frac{0.52 - 0.50}{0.0158} \approx 1.27$$

For a two-tailed test, the $p$-value is twice the area to the right of $1.27$:

$$p \approx 2(0.102) = 0.204$$

Since $0.204 > 0.05$, retain $H_0$. The poll's result is consistent with a $50$-$50$
split.

That is the resolution of the chapter problem. The poll did not show that Yes would win.
A lead of four points is about $1.27$ standard errors, which is a common distance from the
middle. The newspaper read a number inside the noise as if it were a signal.

## You should now be able to

- write a null and an alternative hypothesis;
- tell a one-tailed test from a two-tailed test;
- carry out a large-sample $z$-test of a population mean;
- interpret a $p$-value against a significance level;
- build a $95\%$ confidence interval for a mean and for a proportion;
- explain the link between a confidence interval and a two-tailed test.
