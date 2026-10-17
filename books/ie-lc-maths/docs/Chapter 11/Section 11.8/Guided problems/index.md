---
title: "11.8 The central limit theorem — Practise with help"
chapter: 11
chapter_title: Statistics
section: "11.8"
section_title: The central limit theorem
tier: H
refs:
- '1.7'
kind: guided-problems
---

# 11.8 The central limit theorem — Practise with help

## Warm-up: remember

1. Work out $\sqrt{36}$.
2. Work out $\dfrac{15}{5}$.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\sqrt{36} = 6$.
2. $\dfrac{15}{5} = 3$.

The standard error of the mean is $\dfrac{\sigma}{\sqrt{n}}$, so both skills return: a
square root of the sample size, and a division.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A population has standard deviation $12$. Samples of size $36$ are taken. Find the
standard error of the mean.

<details markdown="1">
<summary>Hint</summary>

Use $\sigma_{\bar{x}} = \dfrac{\sigma}{\sqrt{n}}$.

<details markdown="1">
<summary>Next step</summary>

$$\frac{12}{\sqrt{36}}$$

<details markdown="1">
<summary>Full working</summary>

$$\sigma_{\bar{x}} = \frac{12}{6} = 2$$

The standard error is $2$. It is smaller than the population standard deviation $12$,
because an average of $36$ values varies less than a single value.

</details>
</details>
</details>

**2.** The same population has standard deviation $12$. Samples of size $144$ are taken.
Find the standard error of the mean.

<details markdown="1">
<summary>Hint</summary>

$\sqrt{144} = 12$.

<details markdown="1">
<summary>Next step</summary>

$$\frac{12}{12}$$

<details markdown="1">
<summary>Full working</summary>

$$\sigma_{\bar{x}} = \frac{12}{12} = 1$$

The standard error fell from $2$ to $1$ when the sample grew from $36$ to $144$. The
sample was multiplied by $4$ and the standard error was divided by $2$.

</details>
</details>
</details>

**3.** A population has mean $100$ and standard deviation $15$. Samples of size $25$ are
taken. Find the $z$-score of a sample mean of $106$.

<details markdown="1">
<summary>Hint</summary>

The standard error is $\dfrac{15}{\sqrt{25}} = 3$.

<details markdown="1">
<summary>Next step</summary>

$$z = \frac{\bar{x} - \mu}{\sigma / \sqrt{n}}$$

<details markdown="1">
<summary>Full working</summary>

$$z = \frac{106 - 100}{3} = 2$$

The sample mean of $106$ lies two standard errors above the population mean.

</details>
</details>
</details>

**4.** For the same population, find the probability that a sample of $25$ has a mean
above $106$.

<details markdown="1">
<summary>Hint</summary>

You found $z = 2$. Use the standard normal table.

<details markdown="1">
<summary>Next step</summary>

$$P(\bar{x} > 106) = 1 - P(Z \le 2)$$

<details markdown="1">
<summary>Full working</summary>

$P(Z \le 2) = 0.9772$, so

$$P(\bar{x} > 106) = 1 - 0.9772 = 0.0228$$

About $2.3\%$ of samples would have a mean above $106$. A sample mean far from the
population mean is uncommon, and this is how uncommon.

</details>
</details>
</details>

**5.** State what the central limit theorem says about the sample mean when the sample
size is large.

<details markdown="1">
<summary>Hint</summary>

It is about the shape of the sampling distribution.

<details markdown="1">
<summary>Next step</summary>

The shape is approximately normal, and the spread is the standard error.

<details markdown="1">
<summary>Full working</summary>

For a large sample size $n$, the sample mean is approximately normally distributed with
mean $\mu$ and standard deviation $\dfrac{\sigma}{\sqrt{n}}$. The population does not
need to be normal. A sample size of about $30$ or more is often large enough.

</details>
</details>
</details>

**6.** A sample size is multiplied by $4$. By what factor does the standard error of the
mean change?

<details markdown="1">
<summary>Hint</summary>

The sample size is under a square root.

<details markdown="1">
<summary>Next step</summary>

$$\frac{\sigma}{\sqrt{4n}} = \frac{\sigma}{2\sqrt{n}}$$

<details markdown="1">
<summary>Full working</summary>

The standard error is divided by $\sqrt{4} = 2$. So multiplying the sample size by $4$
halves the standard error. To halve the standard error again, the sample must be
multiplied by $4$ once more.

</details>
</details>
</details>

**7.** Back to the chapter problem. The poll of $1000$ voters reported $\hat{p} = 0.52$.
Find the standard error of the proportion, and find how many standard errors $0.52$ lies
above $0.5$.

<details markdown="1">
<summary>Hint</summary>

$$\sigma_{\hat{p}} = \sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$$

<details markdown="1">
<summary>Next step</summary>

$$\sqrt{\frac{0.52 \times 0.48}{1000}}$$

<details markdown="1">
<summary>Full working</summary>

$$\sigma_{\hat{p}} = \sqrt{0.0002496} \approx 0.0158$$

$$z = \frac{0.52 - 0.50}{0.0158} \approx 1.27$$

The result is about $1.27$ standard errors above a $50$-$50$ split, which is a common
distance for random variation.

</details>
</details>
</details>

## A question from Chapter 7

**8.** Differentiate $y = x^3$.

<details markdown="1">
<summary>Hint</summary>

Use the power rule.

<details markdown="1">
<summary>Next step</summary>

Bring the power down and reduce it by one.

<details markdown="1">
<summary>Full working</summary>

$$\frac{dy}{dx} = 3x^2$$

The power rule is a rate of change. The standard error is also about how fast a quantity
changes, in this case how fast the sample mean settles as the sample grows.

</details>
</details>
</details>
