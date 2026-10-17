---
title: "11.7 Sampling variability and the margin of error — Practise with help"
chapter: 11
chapter_title: Statistics
section: "11.7"
section_title: Sampling variability and the margin of error
tier: H
refs:
- '1.7'
kind: guided-problems
---

# 11.7 Sampling variability and the margin of error — Practise with help

## Warm-up: remember

1. Work out $\sqrt{400}$.
2. Write $\dfrac{1}{20}$ as a percentage.

<details markdown="1">
<summary>Answers and feedback</summary>

1. $\sqrt{400} = 20$, because $20 \times 20 = 400$.
2. $\dfrac{1}{20} = 0.05 = 5\%$.

The margin of error is $\dfrac{1}{\sqrt{n}}$, so both skills return: a square root of the
sample size, and a decimal turned into a percentage.

</details>

:::figure warm-up-gate


## Practise with help

**1.** A poll asks $400$ people. Find the margin of error, as a decimal.

<details markdown="1">
<summary>Hint</summary>

Use $\dfrac{1}{\sqrt{n}}$.

<details markdown="1">
<summary>Next step</summary>

$$\frac{1}{\sqrt{400}}$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{1}{\sqrt{400}} = \frac{1}{20} = 0.05$$

The margin of error is $5\%$. A sample of $400$ gives an answer within about five
percentage points of the truth.

</details>
</details>
</details>

**2.** A poll asks $1000$ people. Find the margin of error, correct to three decimal
places.

<details markdown="1">
<summary>Hint</summary>

$\sqrt{1000} = 10\sqrt{10}$.

<details markdown="1">
<summary>Next step</summary>

$$\frac{1}{10\sqrt{10}}$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{1}{\sqrt{1000}} = \frac{1}{10\sqrt{10}} = \frac{\sqrt{10}}{100} \approx 0.032$$

The margin of error is about $3.2\%$. Increasing the sample from $400$ to $1000$ shrinks
the margin of error from $5\%$ to $3.2\%$.

</details>
</details>
</details>

**3.** Find the sample size needed for a margin of error of $2.5\%$.

<details markdown="1">
<summary>Hint</summary>

Set $\dfrac{1}{\sqrt{n}} = 0.025$.

<details markdown="1">
<summary>Next step</summary>

Square both sides: $n = \dfrac{1}{0.025^2}$.

<details markdown="1">
<summary>Full working</summary>

$$n = \frac{1}{0.025^2} = \frac{1}{0.000625} = 1600$$

A sample of $1600$ is needed. Halving the margin of error takes four times the sample,
because the sample size sits under a square root.

</details>
</details>
</details>

**4.** A sample of $800\) people contains $320$ who support a plan. Find the sample
proportion $\hat{p}$.

<details markdown="1">
<summary>Hint</summary>

Divide the count by the sample size.

<details markdown="1">
<summary>Next step</summary>

$$\hat{p} = \frac{320}{800}$$

<details markdown="1">
<summary>Full working</summary>

$$\hat{p} = \frac{320}{800} = 0.4$$

The sample proportion is $0.4$, or $40\%$. It is the statistic used to estimate the
population proportion $p$.

</details>
</details>
</details>

**5.** A poll of $1000$ voters reports $\hat{p} = 0.52$ for Yes. Build the $95\%$
confidence interval, using the margin of error $\dfrac{1}{\sqrt{1000}} \approx 0.0316$.

<details markdown="1">
<summary>Hint</summary>

The interval is $\hat{p} \pm$ margin of error.

<details markdown="1">
<summary>Next step</summary>

$$0.52 \pm 0.0316$$

<details markdown="1">
<summary>Full working</summary>

$$0.52 - 0.0316 = 0.4884, \qquad 0.52 + 0.0316 = 0.5516$$

The interval is $(0.488, 0.552)$, or $48.8\%$ to $55.2\%$. It runs from a clear No to a
clear Yes, so the poll does not separate the two sides.

</details>
</details>
</details>

**6.** Explain why a $99\%$ confidence interval is wider than a $95\%$ interval for the
same sample.

<details markdown="1">
<summary>Hint</summary>

A higher confidence level asks for a safer statement.

<details markdown="1">
<summary>Next step</summary>

The $99\%$ interval uses $z = 2.576$ instead of $1.96$.

<details markdown="1">
<summary>Full working</summary>

To be more confident of covering the true value, the interval must reach further on each
side. The $99\%$ interval uses $z = 2.576$ in place of $1.96$, so the radius is larger and
the interval is wider. The statement is safer and less precise.

</details>
</details>
</details>

**7.** Back to the chapter problem. The poll of $1000$ voters reported $52\%$ Yes, and the
margin of error is $3.2\%$. On the day, $48\%$ voted Yes. Was $48\%$ inside or outside the
$95\%$ interval, and what does that tell you about the method?

<details markdown="1">
<summary>Hint</summary>

The interval is $0.52 \pm 0.032$.

<details markdown="1">
<summary>Next step</summary>

$$0.52 - 0.032 = 0.488$$

<details markdown="1">
<summary>Full working</summary>

The interval is $(0.488, 0.552)$. The value $0.48$ is below $0.488$, so it lies outside
the interval. A $95\%$ method misses about $5\%$ of the time, and this was one of
those occasions. The interval describes the method's reliability on average, and it does
not guarantee that every single interval contains the truth.

</details>
</details>
</details>

## A question from Chapter 1

**8.** Write $\sqrt{1000}$ in its simplest surd form.

<details markdown="1">
<summary>Hint</summary>

Look for a square factor of $1000$.

<details markdown="1">
<summary>Next step</summary>

$$1000 = 100 \times 10$$

<details markdown="1">
<summary>Full working</summary>

$$\sqrt{1000} = \sqrt{100 \times 10} = 10\sqrt{10}$$

The margin of error for $n = 1000$ is $\dfrac{1}{10\sqrt{10}}$, so this surd appears in
the answer.

</details>
</details>
</details>
