---
title: 14.1 The language of hypothesis testing — Practise with help
chapter: 14
chapter_title: Statistical hypothesis testing
section: '14.1'
section_title: The language of hypothesis testing
refs:
- O1
kind: guided-problems
---

# 14.1 The language of hypothesis testing — Practise with help

Attempt each question closed book first. Write $H_0$, $H_1$ and the significance
level down before any calculation.

## Warm-up: remember

1. $X \sim \mathrm{B}(20, 0.25)$. Find $P(X = 0)$ and $P(X = 1)$.
2. A sample of 200 adults contains 30 who cycle to work. Write down the sample
   proportion as a decimal.
3. Write $0.05$ as a fraction in its simplest form.

<details markdown="1">
<summary>Answers</summary>

1. $P(X = 0) = 0.75^{20} = 0.0032$ and
   $P(X = 1) = \binom{20}{1}(0.25)(0.75)^{19} = 0.0211$, each to 4 decimal
   places.
2. $\dfrac{30}{200} = 0.15$.
3. $0.05 = \dfrac{5}{100} = \dfrac{1}{20}$.

If question 1 was hard, revise the binomial probability formula before you
start.
</details>

## Practise with help

**1.** A quality inspector claims that 5% of the bolts from a machine are faulty.
A sample of 40 bolts contains 5 faulty bolts. The inspector suspects that the
machine now produces faults at a higher rate than the claim. Write $H_0$ and
$H_1$, and name the tail.

<details markdown="1">
<summary>Hint</summary>

The claim supplies the value inside $H_0$. The suspicion supplies the direction
of $H_1$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $H_0: p = 0.05$. Ask which direction worries the inspector, then choose
$<$ or $>$ for $H_1$.
</details>

<details markdown="1">
<summary>Full working</summary>

The claim is that the fault rate is 5%, so

$$
H_0: p = 0.05.
$$

The inspector suspects a higher rate, so

$$
H_1: p > 0.05.
$$

This is a one-tailed test on the upper tail. Under $H_0$ the number of faulty
bolts in 40, written $X$, has the model $X \sim \mathrm{B}(40, 0.05)$.
</details>

**2.** For each situation, state whether a one-tailed or a two-tailed test is
appropriate, and give the direction of any one tail.
(a) A tester suspects a die shows six too often.
(b) A manager checks whether a machine has drifted away from its target in
either direction.
(c) A customer suspects that deliveries arrive on time less often than the
company claims.

<details markdown="1">
<summary>Hint</summary>

Ask whether one direction is the only concern, or whether both directions would
matter.
</details>

<details markdown="1">
<summary>Next step</summary>

For part (a), the words "too often" name one direction. For part (b), the words
"either direction" name two.
</details>

<details markdown="1">
<summary>Full working</summary>

(a) One-tailed, upper tail, because the suspicion points to too many sixes and
too few is not the concern.

(b) Two-tailed, because a drift up and a drift down are both problems.

(c) One-tailed, lower tail, because the customer suspects fewer on-time
deliveries than the claim.
</details>

**3.** $X \sim \mathrm{B}(20, 0.25)$. Work out $P(X \le 2)$. Decide the test at the
5% level and again at the 1% level.

<details markdown="1">
<summary>Hint</summary>

The lower tail is the sum of the probabilities for $X = 0$, $X = 1$ and $X = 2$.
</details>

<details markdown="1">
<summary>Next step</summary>

Use the binomial formula for each of the three values, then add the three
probabilities. Compare the total with $0.05$ and with $0.01$ in turn.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
P(X \le 2) = P(0) + P(1) + P(2) = 0.0032 + 0.0211 + 0.0670 = 0.0913
$$

to 4 decimal places. At the 5% level, $0.0913 > 0.05$, so the test retains
$H_0$. At the 1% level, $0.0913 > 0.01$, so the test also retains $H_0$. The same
data can retain the claim at both levels, because the evidence is not strong at
either one.
</details>

**4.** A test gives a p-value of $0.032$. State the decision at the 5% level and
at the 1% level, and explain why the two decisions differ.

<details markdown="1">
<summary>Hint</summary>

Compare the p-value with each significance level separately.
</details>

<details markdown="1">
<summary>Next step</summary>

Notice that $0.032$ is below $0.05$ but above $0.01$. Write one comparison for
each level.
</details>

<details markdown="1">
<summary>Full working</summary>

At the 5% level, $0.032 < 0.05$, so the test rejects $H_0$. At the 1% level,
$0.032 > 0.01$, so the test retains $H_0$.

The decisions differ because a smaller significance level demands stronger
evidence. The 1% level accepts a smaller risk of wrongly rejecting a true
$H_0$, so the result must be more extreme before it counts.
</details>

**5.** A coin is tossed 24 times and shows 7 heads. Test at the 5% level whether
the coin is fair. You are given $P(X \le 7) = 0.0320$ for
$X \sim \mathrm{B}(24, 0.5)$.

<details markdown="1">
<summary>Hint</summary>

A fair coin has $p = 0.5$, so the hypotheses use $\ne$ for $H_1$. The test has
two tails.
</details>

<details markdown="1">
<summary>Next step</summary>

Use symmetry: with $p = 0.5$, $P(X \ge 17)$ equals $P(X \le 7)$. Double the
smaller tail before comparing with $0.05$.
</details>

<details markdown="1">
<summary>Full working</summary>

The hypotheses are

$$
H_0: p = 0.5, \qquad H_1: p \ne 0.5.
$$

The value 7 is below the centre of the distribution, so the smaller tail is the
lower one:

$$
P(X \le 7) = 0.0320.
$$

The two-tailed p-value is

$$
2 \times 0.0320 = 0.0640.
$$

Since $0.0640 > 0.05$, the test retains $H_0$. There is not sufficient evidence
at the 5% level to suggest the coin is not fair.
</details>

**6.** A test of the claim $p = 0.4$ gives a p-value of $0.21$. Write the
conclusion in the context of the claim, and state one thing the conclusion does
not mean.

<details markdown="1">
<summary>Hint</summary>

A p-value above the significance level retains the claim. Then think about what
the evidence can and cannot show.
</details>

<details markdown="1">
<summary>Next step</summary>

Decide the test first. Then write a sentence that starts "There is not
sufficient evidence…" for the context.
</details>

<details markdown="1">
<summary>Full working</summary>

Since $0.21 > 0.05$, the test retains $H_0$ at the 5% level. There is not
sufficient evidence to suggest that the proportion differs from $0.4$.

The conclusion does not mean that the proportion is exactly $0.4$. It means that
this sample did not provide strong enough evidence against $0.4$. A larger
sample might give a different verdict.
</details>
