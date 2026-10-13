---
title: 14.2 Binomial tests for a proportion — Practise with help
chapter: 14
chapter_title: Statistical hypothesis testing
section: '14.2'
section_title: Binomial tests for a proportion, one- and two-tailed
refs:
- O1
- O2
kind: guided-problems
---

# 14.2 Binomial tests for a proportion — Practise with help

Attempt each question closed book first. Write the five steps down in order
before you calculate.

## Warm-up: remember

1. Write $H_0$ and $H_1$ for a claim that the proportion is $0.4$, when any
   difference from $0.4$ matters.
2. $X \sim \mathrm{B}(20, 0.25)$. Find $P(X \le 1)$ to 4 decimal places.
3. Explain, in one sentence, what the 5% significance level means.

<details markdown="1">
<summary>Answers</summary>

1. $H_0: p = 0.4$ and $H_1: p \ne 0.4$. The test has two tails.
2. $P(X \le 1) = 0.0032 + 0.0211 = 0.0243$ to 4 decimal places.
3. The 5% level is the probability of rejecting a true $H_0$ that you are willing
   to accept.

If question 1 mixed up the alternative, reread Section 14.1 before you start.
</details>

## Practise with help

**1.** A delivery company claims that 20% of parcels arrive late. A shop records
30 parcels and finds 2 that arrive late. Test at the 5% level whether the late
rate is lower than the claim.

<details markdown="1">
<summary>Hint</summary>

The claim gives $p_0 = 0.2$. The concern is "lower", so the alternative uses
$<$.
</details>

<details markdown="1">
<summary>Next step</summary>

Write $H_0$, $H_1$ and the model $X \sim \mathrm{B}(30, 0.2)$. Then find the
lower tail $P(X \le 2)$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
H_0: p = 0.2, \qquad H_1: p < 0.2, \qquad \alpha = 0.05.
$$

Under $H_0$, $X \sim \mathrm{B}(30, 0.2)$, and the sample gives $X = 2$. The
p-value is

$$
P(X \le 2) = 0.0442 \quad (4 \text{ d.p.}).
$$

Since $0.0442 < 0.05$, the test rejects $H_0$. There is sufficient evidence at
the 5% level that fewer than 20% of parcels arrive late.
</details>

**2.** A manufacturer claims that 20% of components are faulty. A sample of 25
components contains 2 faulty ones. Test at the 5% level whether the fault rate is
lower than the claim.

<details markdown="1">
<summary>Hint</summary>

The model is $X \sim \mathrm{B}(25, 0.2)$, not $\mathrm{B}(30, 0.2)$. The sample
size has changed.
</details>

<details markdown="1">
<summary>Next step</summary>

Find the lower tail $P(X \le 2)$ for 25 components, then compare the value with
$0.05$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
H_0: p = 0.2, \qquad H_1: p < 0.2, \qquad \alpha = 0.05.
$$

Under $H_0$, $X \sim \mathrm{B}(25, 0.2)$, and the sample gives $X = 2$. The
p-value is

$$
P(X \le 2) = 0.0982 \quad (4 \text{ d.p.}).
$$

Since $0.0982 > 0.05$, the test retains $H_0$. There is not sufficient evidence
at the 5% level that fewer than 20% of components are faulty.

The count is the same as question 1, but the sample is smaller, so a count of 2
is less surprising.
</details>

**3.** A survey claims that 40% of shoppers prefer brand A. In a sample of 30
shoppers, 16 prefer brand A. Test at the 5% level whether the proportion is
higher than the claim.

<details markdown="1">
<summary>Hint</summary>

"Higher" gives a one-tailed upper test. The sample proportion is
$\frac{16}{30} = 0.53$, which is above the claim.
</details>

<details markdown="1">
<summary>Next step</summary>

Under $H_0$, $X \sim \mathrm{B}(30, 0.4)$. Find the upper tail $P(X \ge 16)$ and
compare it with $0.05$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
H_0: p = 0.4, \qquad H_1: p > 0.4, \qquad \alpha = 0.05.
$$

Under $H_0$, $X \sim \mathrm{B}(30, 0.4)$, and the sample gives $X = 16$. The
p-value is

$$
P(X \ge 16) = 0.0971 \quad (4 \text{ d.p.}).
$$

Since $0.0971 > 0.05$, the test retains $H_0$. There is not sufficient evidence
at the 5% level that more than 40% of shoppers prefer brand A. The sample
proportion is above the claim, but the sample is too small for the gap to count.
</details>

**4.** A coin is tossed 16 times and shows 12 heads. Test at the 5% level whether
the coin is biased towards heads.

<details markdown="1">
<summary>Hint</summary>

The suspicion points one way, so this is a one-tailed upper test.
</details>

<details markdown="1">
<summary>Next step</summary>

Under $H_0$, $X \sim \mathrm{B}(16, 0.5)$. Find $P(X \ge 12)$ and compare with
$0.05$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
H_0: p = 0.5, \qquad H_1: p > 0.5, \qquad \alpha = 0.05.
$$

Under $H_0$, $X \sim \mathrm{B}(16, 0.5)$, and the sample gives $X = 12$. The
p-value is

$$
P(X \ge 12) = 0.0384 \quad (4 \text{ d.p.}).
$$

Since $0.0384 < 0.05$, the test rejects $H_0$. There is sufficient evidence at
the 5% level that the coin is biased towards heads.
</details>

**5.** A spinner is claimed to land on red 1 time in 4. In 30 spins, it lands on
red 13 times. Test at the 5% level whether the spinner is unfair.

<details markdown="1">
<summary>Hint</summary>

"Unfair" allows too many reds or too few, so the test has two tails.
</details>

<details markdown="1">
<summary>Next step</summary>

Under $H_0$, $X \sim \mathrm{B}(30, 0.25)$. The value 13 is above the centre, so
find $P(X \ge 13)$, then double it.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
H_0: p = 0.25, \qquad H_1: p \ne 0.25, \qquad \alpha = 0.05.
$$

Under $H_0$, $X \sim \mathrm{B}(30, 0.25)$, and the sample gives $X = 13$. The
value is above the centre, so the smaller tail is the upper one:

$$
P(X \ge 13) = 0.0216 \quad (4 \text{ d.p.}).
$$

The two-tailed p-value is

$$
2 \times 0.0216 = 0.0432.
$$

Since $0.0432 < 0.05$, the test rejects $H_0$. There is sufficient evidence at
the 5% level that the spinner is unfair.

Notice the two-stage decision. The one-sided tail of $0.0216$ and the
two-sided $0.0432$ fall on opposite sides of $0.05$ only when the tail is close
to the level. Always check which test the question asks for.
</details>

**6.** In question 1 the p-value was $0.0442$. The same test is repeated at the
1% level. State the new decision and explain the difference.

<details markdown="1">
<summary>Hint</summary>

The p-value has not changed, but the level has.
</details>

<details markdown="1">
<summary>Next step</summary>

Compare $0.0442$ with $0.01$. Then say what a smaller level does to the risk of
wrongly rejecting a true claim.
</details>

<details markdown="1">
<summary>Full working</summary>

At the 1% level, $0.0442 > 0.01$, so the test retains $H_0$. The evidence
produced a rejection at the 5% level and a retention at the 1% level.

The 1% level accepts a smaller risk of wrongly rejecting a true claim, so a
result must be more surprising before it counts. A conclusion must state the
level, because the same data can give two different decisions.
</details>
