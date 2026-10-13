---
title: 14.3 Normal tests for a mean — Learn
chapter: 14
chapter_title: Statistical hypothesis testing
section: '14.3'
section_title: Normal tests for a mean and the significance level
refs:
- O3
kind: walkthrough
---

# 14.3 Normal tests for a mean — Learn

**Prerequisites:** the Normal distribution and standardising from earlier in this
book, and the language of hypothesis testing from Section 14.1.

**By the end of this section you can:** carry out a hypothesis test for the mean
of a Normal distribution when the variance is known, given or assumed; interpret
the result in context; and explain how the significance level controls the risk
of a wrong decision.

## 1. Testing a mean instead of a proportion

The voucher test counted how many packets contained a voucher. A different kind
of claim is about an average. A machine is set to fill each packet with 500 g of
cereal. A sample of packets is weighed, and the sample mean is compared with 500.

The test statistic is now the sample mean $\bar{x}$. The claim gives a value for
the population mean, written $\mu_0$. The hypotheses are

$$
H_0: \mu = \mu_0
\qquad \text{and} \qquad
H_1: \mu < \mu_0, \quad \mu > \mu_0 \quad \text{or} \quad \mu \ne \mu_0.
$$

The alternative decides the tail, exactly as it did for a proportion.

## 2. The standard error

A sample mean varies from sample to sample. If the population has mean $\mu$ and
standard deviation $\sigma$, and the sample has size $n$, then the sample mean
has mean $\mu$ and standard deviation

$$
\frac{\sigma}{\sqrt{n}}.
$$

This quantity is called the **standard error** of the mean. It measures how far a
sample mean is likely to lie from the population mean.

A larger sample gives a smaller standard error, so a large sample mean is more
reliable than a small one.

To test the claim, standardise the sample mean:

$$
z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}.
$$

Under $H_0$, this value is a standard Normal variable:

$$
Z \sim \mathrm{N}(0, 1).
$$

The p-value is the area in the tail beyond $z$, read from the Normal
distribution.

## 3. The variance must be known

The test needs the population standard deviation $\sigma$. It must be known from
long records, given in the question, or assumed. This chapter never uses the
sample standard deviation $s$ in place of $\sigma$. If $\sigma$ is unknown, the
test in this book is not the right one.

The test also assumes that the sample mean is Normal. That holds if the
population is Normal. It also holds approximately if the sample is large, from
the result that a large sample mean is close to Normal whatever the population
shape.

## 4. The five steps for a mean

1. Write $H_0$, $H_1$ and the significance level $\alpha$.
2. Find the standard error $\dfrac{\sigma}{\sqrt{n}}$.
3. Calculate the test statistic $z = \dfrac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}$.
4. Find the p-value from the standard Normal distribution, or compare $z$ with
   the critical value.
5. Compare with $\alpha$, decide, and write the conclusion in context.

The critical values for a standard Normal test are worth remembering:

| Test | 5% level | 1% level |
|---|---|---|
| One-tailed | $1.645$ | $2.326$ |
| Two-tailed | $1.96$ | $2.576$ |

For a lower-tail test, reject $H_0$ when $z$ is below the negative of the value
in the table.

## 5. Worked examples

**Example 1 — a lower-tail test.** A machine fills packets with a mean of 500 g.
From long records the standard deviation is known to be 4 g. A sample of 16
packets has a mean mass of 497 g. Test at the 5% level whether the machine is
underfilling the packets.

The concern is underfilling, so the test is one-tailed:

$$
H_0: \mu = 500, \qquad H_1: \mu < 500, \qquad \alpha = 0.05.
$$

The standard error is

$$
\frac{\sigma}{\sqrt{n}} = \frac{4}{\sqrt{16}} = 1.
$$

The test statistic is

$$
z = \frac{497 - 500}{1} = -3.
$$

The lower-tail probability is

$$
P(Z \le -3) = 0.00135 \quad (3 \text{ s.f.}).
$$

Since $0.00135 < 0.05$, the test rejects $H_0$. There is sufficient evidence at
the 5% level that the mean mass is below 500 g. The same result rejects $H_0$ at
the 1% level, because $0.00135 < 0.01$.

**Example 2 — the same data, two tails.** Test the same machine at the 5% level
for any change in the mean, in either direction.

Now the hypotheses are

$$
H_0: \mu = 500, \qquad H_1: \mu \ne 500.
$$

The value of $z$ is still $-3$. The two-tailed p-value doubles the smaller tail:

$$
\text{p-value} = 2 \times 0.00135 = 0.0027.
$$

Since $0.0027 < 0.05$, the test again rejects $H_0$. The conclusion is now about
a change in either direction, not only a fall.

**Example 3 — a retained test.** A second machine is set to a mean of 100 ml. The
standard deviation is known to be 15 ml. A sample of 25 bottles has a mean of
104 ml. Test at the 5% level whether the mean has changed.

A change in either direction matters, so the test is two-tailed:

$$
H_0: \mu = 100, \qquad H_1: \mu \ne 100.
$$

The standard error is

$$
\frac{15}{\sqrt{25}} = 3.
$$

The test statistic is

$$
z = \frac{104 - 100}{3} = 1.33 \quad (3 \text{ s.f.}).
$$

The upper-tail probability is $P(Z \ge 1.33) = 0.0912$, so the two-tailed
p-value is

$$
2 \times 0.0912 = 0.1824.
$$

Since $0.1824 > 0.05$, the test retains $H_0$. There is not sufficient evidence
at the 5% level that the mean has changed.

**Example 4 — the effect of the sample size.** Suppose the bottle factory in
Example 3 takes a sample of 100 bottles instead of 25, and the mean is again
104 ml.

The standard error is now

$$
\frac{15}{\sqrt{100}} = 1.5.
$$

The test statistic is

$$
z = \frac{104 - 100}{1.5} = 2.67 \quad (3 \text{ s.f.}).
$$

The two-tailed p-value is

$$
2 \times P(Z \ge 2.67) = 2 \times 0.0038 = 0.0076.
$$

Now $0.0076 < 0.05$, so the test rejects $H_0$. The same sample mean gives a
different decision, because a larger sample makes the same gap more convincing.

## 6. The significance level as the probability of a wrong rejection

The significance level $\alpha$ is the probability of rejecting $H_0$ when
$H_0$ is true. For a Normal test the critical value is chosen so that the tail
area matches the level exactly.

At the 5% level, a two-tailed test rejects when $z < -1.96$ or $z > 1.96$. If
$H_0$ is true, the probability of a $z$ value beyond either boundary is
$0.05$. So a true claim is wrongly rejected in 5% of samples.

A smaller level lowers that risk. At the 1% level the boundaries move out to
$\pm 2.576$, so a sample mean must be more extreme before the test rejects. The
cost is a greater chance of missing a real change.

## 7. Try it: how far is far enough?

**Predict first.** The figure draws the sampling distribution of the sample mean
and shades the critical region for a 5% test. Before you move a control, predict
what happens to the shaded area when the sample size rises from 16 to 64. Write
down whether the shaded region grows, shrinks or stays the same, and why.

:::figure ch14-normal-test

**Test.** Set the sample mean to 497, the standard deviation to 4 and the sample
size to 16. Read the test statistic and the p-value. Now raise the sample size to
64 and watch both values. Then change the tail to "two tails" and compare the
p-value.

**Explain.** Write two sentences. The first explains why a larger sample makes
the same sample mean give a more extreme test statistic. The second explains why
the two-tailed p-value is twice the one-tailed value.

> **Watch out.** Four traps appear with a Normal test.
>
> **Using $\sigma$ where the standard error belongs.** The statistic divides by
> $\dfrac{\sigma}{\sqrt{n}}$, not by $\sigma$. Forgetting the square root
> understates the test statistic badly.
>
> **Using the sample standard deviation.** When $\sigma$ is not known, the
> standard Normal test is not the right tool. This chapter only tests a mean
> when $\sigma$ is known, given or assumed.
>
> **Doubling a one-tailed p-value.** Only a test with $H_1: \mu \ne \mu_0$ uses
> two tails. A test with $H_1: \mu < \mu_0$ or $H_1: \mu > \mu_0$ uses one.
>
> **Concluding about individual values.** The test is about the mean of the
> population. A rejection does not say that every packet is underweight. It says
> the average is not the claimed value.
>
> **Re-check:** after the decision, write $\mu$ in words. "The mean mass" is a
> different claim from "a packet's mass".

## Progress check

1. A machine is set to fill bottles with a mean of 330 ml. The standard
   deviation is known to be 6 ml. A sample of 36 bottles has a mean of 328 ml.
   Write $H_0$ and $H_1$ for a test of underfilling.
2. Find the standard error for question 1.
3. Find the test statistic $z$ for question 1, and the p-value.
4. Decide the test at the 5% level and write the conclusion in context.

## You should now be able to

- write a null hypothesis and an alternative hypothesis for a population mean;
- find the standard error of a sample mean;
- calculate the test statistic $z$ and read a p-value from the standard Normal
  distribution;
- use the critical values $1.645$ and $1.96$ at the 5% level;
- state the assumption that the population standard deviation is known, given or
  assumed;
- explain the significance level as the probability of wrongly rejecting a true
  $H_0$;
- write a conclusion about the mean that names the significance level.
