---
title: "9.4 Infinite geometric series — Practise with help"
chapter: 9
chapter_title: Sequences and series
section: "9.4"
section_title: Infinite geometric series
tier: H
refs:
- '4.1'
kind: guided-problems
---

# 9.4 Infinite geometric series — Practise with help

## Warm-up: remember

1. Find the sum of the first four terms of $12, 6, 3, \dots$
2. Is $|{-0.7}| < 1$?

<details markdown="1">
<summary>Answers and feedback</summary>

1. $12 + 6 + 3 + 1.5 = 22.5$.
2. Yes, $0.7 < 1$. The size matters, not the sign.

</details>

:::figure warm-up-gate


## Practise with help

**1.** Find the sum to infinity of $12 + 6 + 3 + \dots$

<details markdown="1">
<summary>Hint</summary>

Check $|r| < 1$ first.

<details markdown="1">
<summary>Next step</summary>

$r = \dfrac{1}{2}$, so the sum exists. $\dfrac{12}{1 - \frac{1}{2}}$.

<details markdown="1">
<summary>Full working</summary>

$$S_\infty = \frac{12}{\frac{1}{2}} = 24$$

The partial sums are $12, 18, 21, 22.5, \dots$ creeping towards $24$.

</details>
</details>
</details>

**2.** Find the sum to infinity of $9 - 3 + 1 - \dots$

<details markdown="1">
<summary>Hint</summary>

$r = -\dfrac{1}{3}$.

<details markdown="1">
<summary>Next step</summary>

$\left|-\frac{1}{3}\right| < 1$, so the sum exists: $\dfrac{9}{1 - \left(-\frac{1}{3}\right)}$.

<details markdown="1">
<summary>Full working</summary>

$$S_\infty = \frac{9}{\frac{4}{3}} = \frac{27}{4} = 6.75$$

The terms alternate in sign, but the sum still settles.

</details>
</details>
</details>

**3.** Which of these have a sum to infinity: $r = 0.5$, $r = -0.99$, $r = -1$, $r = 2$?

<details markdown="1">
<summary>Hint</summary>

Check $|r| < 1$ for each.

<details markdown="1">
<summary>Next step</summary>

$|{-0.99}| = 0.99 < 1$.

<details markdown="1">
<summary>Full working</summary>

- $r = 0.5$: yes.
- $r = -0.99$: yes, because $0.99 < 1$. The sign does not matter.
- $r = -1$: no, because $|-1| = 1$ is not less than $1$.
- $r = 2$: no.

</details>
</details>
</details>

**4.** A geometric series has first term $a$ and sum to infinity $30$. If $r = \dfrac{1}{3}$,
find $a$.

<details markdown="1">
<summary>Hint</summary>

$S_\infty = \dfrac{a}{1 - r} = 30$.

<details markdown="1">
<summary>Next step</summary>

$a = 30\left(1 - \frac{1}{3}\right)$.

<details markdown="1">
<summary>Full working</summary>

$$a = 30 \times \frac{2}{3} = 20$$

Check: $\dfrac{20}{1 - \frac{1}{3}} = \dfrac{20}{\frac{2}{3}} = 30$. Correct.

</details>
</details>
</details>

**5.** Write $0.444\dots$ as a fraction using a geometric series.

<details markdown="1">
<summary>Hint</summary>

$a = 0.4$, $r = 0.1$.

<details markdown="1">
<summary>Next step</summary>

$\dfrac{0.4}{1 - 0.1}$.

<details markdown="1">
<summary>Full working</summary>

$$\frac{0.4}{0.9} = \frac{4}{9}$$

So $0.444\dots = \dfrac{4}{9}$.

</details>
</details>
</details>

**6.** Explain why $1 + 1 + 1 + \dots$ has no sum to infinity.

<details markdown="1">
<summary>Hint</summary>

What is $r$, and what do the partial sums do?

<details markdown="1">
<summary>Next step</summary>

$r = 1$, and $|r| = 1$, which fails the condition.

<details markdown="1">
<summary>Full working</summary>

$r = 1$, so $|r| = 1$ is not less than $1$, and the condition fails. The partial sums are
$1, 2, 3, 4, \dots$, growing without bound.

The formula $\dfrac{a}{1-r}$ cannot be used, because it would contain a division by
$1 - 1 = 0$. Always check the condition first.

</details>
</details>
</details>

## A question from Section 9.3

**7.** The geometric series $8 + 4 + 2 + \dots$ has a sum to infinity of $16$. What is
the sum of the first five terms, and how far short of $16$ is it?

<details markdown="1">
<summary>Hint</summary>

$S_5$ from the formula, then subtract.

<details markdown="1">
<summary>Next step</summary>

$S_5 = \dfrac{8\left(1 - \frac{1}{32}\right)}{\frac{1}{2}} = 15.5$.

<details markdown="1">
<summary>Full working</summary>

$$S_5 = 8 + 4 + 2 + 1 + 0.5 = 15.5$$

It is $16 - 15.5 = 0.5$ short.

The shortfall is the sixth term, $0.25$, plus all the rest. This is the sense in which the
partial sums "creep towards" the sum to infinity: each new term closes part of the
remaining gap, and the gap halves each time.

</details>
</details>
</details>
