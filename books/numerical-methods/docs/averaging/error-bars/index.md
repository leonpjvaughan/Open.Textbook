---
title: An average, and its error bar
---

# An average, and its error bar

## What this page answers

The class page says an average is the answer when the answer is a distribution,
and that the error falls as $1/\sqrt N$. This page derives that rate, says what
the constant is, and shows what an error bar means when the samples are the only
thing you have.

It settles the first row of the measured gaps: a reader can compute the bar, and
can say why more samples help by the square root rather than in proportion.

## The mathematics

Let $X_1, \dots, X_N$ be independent samples from a distribution with mean $\mu$
and variance $\sigma^2$. The sample mean is

$$ \bar X = \frac{1}{N}\sum_{i=1}^N X_i. $$

Its expectation is $\mu$, because expectation is linear. Its variance is

$$ \operatorname{Var}(\bar X) = \frac{1}{N^2}\sum_{i=1}^N
\operatorname{Var}(X_i) = \frac{\sigma^2}{N}, $$

where the cross terms vanish because the samples are independent. The **standard
error** is the square root:

$$ \operatorname{SE}(\bar X) = \frac{\sigma}{\sqrt N}. $$

That is the whole $1/\sqrt N$ rate. Four times the samples halve the bar; a
hundred times the samples divide it by ten. The variance is what adds when
independent errors combine, not the standard deviation, and that is why the
square root appears.

In practice $\sigma$ is unknown too. The sample variance

$$ s^2 = \frac{1}{N-1}\sum_{i=1}^N (X_i - \bar X)^2 $$

is unbiased for $\sigma^2$, and $s/\sqrt N$ is the estimated standard error. The
$N-1$ is there because the deviations are measured from $\bar X$ rather than
from $\mu$, which costs one degree of freedom.

A **two-standard-error bar** is $\bar X \pm 2 s/\sqrt N$. For a normal
distribution it covers about 95% of the sampling variation. For other
distributions it is an approximation that improves with $N$, by the central
limit theorem. The theorem is stated here, not proved; it is not a small piece
of arithmetic.

**The check.** With $\sigma=1$ and $N=1000$, the standard error is
$1/\sqrt{1000} = 0.0316$, so the two-standard-error bar is $0.0632$. At $N=2000$
it is $0.0447$. Doubling the samples divides the bar by $\sqrt2 = 1.414$, and
$0.0632/1.414 = 0.0447$.

## The code

The program draws samples from a fixed seed, so the numbers below are the
numbers a reader gets. It prints the mean and the two-standard-error bar at four
sample sizes.

<details markdown="1">
<summary>The sampler and the four error bars</summary>

```python
import random

random.seed(20261028)
sigma = 1.0
for n in (250, 500, 1000, 2000):
    total = 0.0
    for _ in range(n):
        total += random.gauss(0.0, sigma)
    mean = total / n
    se = sigma / n**0.5
    print(f"N={n:>4}  mean={mean:+.4f}  2se={2 * se:.4f}")
```

```text
N= 250  mean=-0.0383  2se=0.1265
N= 500  mean=+0.0269  2se=0.0894
N=1000  mean=+0.0190  2se=0.0632
N=2000  mean=-0.0094  2se=0.0447
```

</details>
The bar halves when the sample size quadruples. The mean moves inside the bar
from row to row, which is what a sampling fluctuation looks like: the estimate
is not converging monotonically, because each row is a different sample.

## The theory

The derivation uses only linearity of expectation and independence. It does not
need normality, which is why the standard error is the first thing to compute
even when the distribution is unknown. What normality adds is the shape of the
sampling distribution, and that is what makes $2$ the right multiplier for 95%.

The rate has a price. To gain one more decimal digit of accuracy you need one
hundred times the samples, because $10^{-d}$ requires $N \propto 10^{2d}$. That
is the reason Monte Carlo is used for integrals in many dimensions and not for
one-dimensional ones: the rate is slow, but it does not depend on the dimension.

What breaks the rate:

- **Dependence.** If the samples are correlated, the variance of the mean is not
  $\sigma^2/N$. The next page derives the correction.
- **A heavy tail.** If the variance is infinite, the standard error is infinite
  and the bar is not a bar. The mean may still converge, but not at this rate.
- **A biased sampler.** If the samples do not come from the target distribution,
  the bar describes the wrong quantity. No sample size fixes that.

The sources are in `sources.yaml`: Robert and Casella for the Monte Carlo
argument, and the standard error as the square root of the variance of the
estimator.

## What this cost

One pass over the samples, so $O(N)$ time and $O(1)$ memory if the sums are
accumulated. The sample variance needs a second pass, or a numerically stable
one-pass update; the two-pass form is clearer and costs one more pass.

The accuracy improves as $1/\sqrt N$: a hundredfold cost for one more digit. The
bar itself is an estimate, and at small $N$ the estimate of $\sigma$ is as noisy
as the mean it is describing.

What it will not do: it will not correct a biased sample, and it will not tell
you that the samples are independent. That assumption is yours to defend.

## Back to the map

[Averaging](../index.md) is the class page this works under.
[When the samples are not independent](../correlated/index.md) is the correction
when the independence assumption fails. [Home](../../index.md) is the summary.
