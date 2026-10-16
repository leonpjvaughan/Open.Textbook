---
title: "11.9 Hypothesis testing and confidence intervals — Practise with help"
chapter: 11
chapter_title: Statistics
section: "11.9"
section_title: Hypothesis testing and confidence intervals
tier: H
refs:
- '1.7'
kind: guided-problems
---

# 11.9 Hypothesis testing and confidence intervals — Practise with help

## Warm-up: remember

1. Work out $\sqrt{80}$, correct to three decimal places.
2. Work out $1.96 \times 0.3466$, correct to three decimal places.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\sqrt{80} = 8.944$ (3 d.p.).
2. $1.96 \times 0.3466 = 0.679$ (3 d.p.).

Both steps appear in the confidence interval: divide by the square root of $n$, then
multiply by $1.96$.

</details>

## Practise with help

**1.** A sample of $80$ new phones has mean charging time $45.4$ minutes. The population
standard deviation is $3.1$ minutes. Find the standard error.

<details markdown="1">
<summary>Hint</summary>

$$\frac{\sigma}{\sqrt{n}}$$

<details markdown="1">
<summary>Next step</summary>

$$\frac{3.1}{\sqrt{80}}$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{3.1}{\sqrt{80}} \approx 0.3466$$

The standard error is about $0.347$ minutes, in the same units as the times.

</details>
</details>
</details>

**2.** Test the claim that the mean charging time is $44$ minutes, using the sample mean
$45.4$ and the standard error $0.3466$. Find the test statistic $z$.

<details markdown="1">
<summary>Hint</summary>

$$z = \frac{\bar{x} - \mu}{\sigma / \sqrt{n}}$$

<details markdown="1">
<summary>Next step</summary>

$$z = \frac{45.4 - 44}{0.3466}$$

<details markdown="1">
<summary>Full working</summary>

$$z = \frac{1.4}{0.3466} \approx 4.04$$

The sample mean lies about four standard errors above the claimed mean. A distance that
large is very unusual under the claim.

</details>
</details>
</details>

**3.** Build the $95\%$ confidence interval for the mean charging time, using the sample
mean $45.4$ and the standard error $0.3466$.

<details markdown="1">
<summary>Hint</summary>

The interval is $\bar{x} \pm 1.96 \times$ standard error.

<details markdown="1">
<summary>Next step</summary>

$$45.4 \pm 1.96 \times 0.3466$$

<details markdown="1">
<summary>Full working</summary>

$$1.96 \times 0.3466 \approx 0.679$$

$$45.4 \pm 0.679 = (44.72, 46.08)$$

The interval runs from about $44.72$ to $46.08$ minutes. It does not contain $44$.

</details>
</details>
</details>

**4.** The two-tailed $p$-value for the test in question 2 is about $0.00005$. State the
decision at the $5\%$ level, and the reason.

<details markdown="1">
<summary>Hint</summary>

Compare the $p$-value with $\alpha = 0.05$.

<details markdown="1">
<summary>Next step</summary>

Is $0.00005$ less than $0.05$?

<details markdown="1">
<summary>Full working</summary>

Since $0.00005 < 0.05$, reject $H_0$. There is strong evidence that the mean charging
time is not $44$ minutes. The confidence interval in question 3 agrees, because it does
not contain $44$.

</details>
</details>
</details>

**5.** A poll of $1000$ voters gives $\hat{p} = 0.52$. The standard error is about
$0.0158$. Build the $95\%$ confidence interval for the proportion.

<details markdown="1">
<summary>Hint</summary>

The interval is $\hat{p} \pm 1.96 \times$ standard error.

<details markdown="1">
<summary>Next step</summary>

$$0.52 \pm 1.96 \times 0.0158$$

<details markdown="1">
<summary>Full working</summary>

$$1.96 \times 0.0158 \approx 0.0310$$

$$0.52 \pm 0.0310 = (0.489, 0.551)$$

The interval contains $0.5$, so it is consistent with a $50$-$50$ split.

</details>
</details>
</details>

**6.** Back to the chapter problem. Test $H_0: p = 0.5$ against $H_1: p \neq 0.5$ at the
$5\%$ level, using $\hat{p} = 0.52$ and $n = 1000$. Find $z$, then the decision.

<details markdown="1">
<summary>Hint</summary>

Under $H_0$, the standard error is $\sqrt{\dfrac{0.5 \times 0.5}{1000}}$.

<details markdown="1">
<summary>Next step</summary>

$$z = \frac{0.52 - 0.50}{0.0158}$$

<details markdown="1">
<summary>Full working</summary>

$$z \approx 1.27$$

The two-tailed $p$-value is about $2(0.102) = 0.204$. Since $0.204 > 0.05$, retain $H_0$.
The poll is consistent with a $50$-$50$ split, and the newspaper's headline read noise as
if it were a signal.

</details>
</details>
</details>

## A question from Chapter 10

**7.** A fair die is rolled once. Find the probability of rolling a number greater than
$4$.

<details markdown="1">
<summary>Hint</summary>

The outcomes greater than $4$ are $5$ and $6$.

<details markdown="1">
<summary>Next step</summary>

$$\frac{2}{6}$$

<details markdown="1">
<summary>Full working</summary>

$$P(\text{greater than } 4) = \frac{2}{6} = \frac{1}{3}$$

A $p$-value is also a probability, and it is read the same way: a number between $0$ and
$1$ that says how often something happens.

</details>
</details>
</details>
