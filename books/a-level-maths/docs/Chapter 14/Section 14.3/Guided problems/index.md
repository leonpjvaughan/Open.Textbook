---
title: 14.3 Normal tests for a mean — Practise with help
chapter: 14
chapter_title: Statistical hypothesis testing
section: '14.3'
section_title: Normal tests for a mean and the significance level
refs:
- O3
kind: guided-problems
---

# 14.3 Normal tests for a mean — Practise with help

Attempt each question closed book first. Check that the standard deviation is
known before you standardise.

## Warm-up: remember

1. A standard Normal variable has $P(Z \le 1.96) = 0.975$. Write down
   $P(Z \ge 1.96)$.
2. A Normal distribution has mean 50 and standard deviation 10. Standardise the
   value $x = 45$.
3. A population has standard deviation 3. A sample of size 36 is taken. Find the
   standard error of the sample mean.

<details markdown="1">
<summary>Answers</summary>

1. $P(Z \ge 1.96) = 1 - 0.975 = 0.025$.
2. $z = \dfrac{45 - 50}{10} = -0.5$.
3. The standard error is $\dfrac{3}{\sqrt{36}} = \dfrac{3}{6} = 0.5$.

If question 3 was hard, revise the standard error before you start.
</details>

## Practise with help

**1.** A machine is set to a mean of 250 g. The standard deviation is known to
be 5 g. A sample of 25 packets has a mean of 248 g. Test at the 5% level whether
the machine is underfilling the packets.

<details markdown="1">
<summary>Hint</summary>

The word "underfilling" fixes the direction of the alternative.
</details>

<details markdown="1">
<summary>Next step</summary>

Find the standard error $\dfrac{5}{\sqrt{25}}$, then standardise the sample mean
to get $z$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
H_0: \mu = 250, \qquad H_1: \mu < 250, \qquad \alpha = 0.05.
$$

The standard error is

$$
\frac{5}{\sqrt{25}} = 1.
$$

The test statistic is

$$
z = \frac{248 - 250}{1} = -2.
$$

The lower-tail probability is

$$
P(Z \le -2) = 0.0228 \quad (3 \text{ s.f.}).
$$

Since $0.0228 < 0.05$, the test rejects $H_0$. There is sufficient evidence at
the 5% level that the mean mass is below 250 g.
</details>

**2.** A machine is set to a mean of 60 g. The standard deviation is known to be
12 g. A sample of 36 items has a mean of 62 g. Test at the 5% level whether the
mean has changed.

<details markdown="1">
<summary>Hint</summary>

"Changed" allows a rise or a fall, so the test has two tails.
</details>

<details markdown="1">
<summary>Next step</summary>

Find the standard error, standardise, then double the smaller tail.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
H_0: \mu = 60, \qquad H_1: \mu \ne 60, \qquad \alpha = 0.05.
$$

The standard error is

$$
\frac{12}{\sqrt{36}} = 2.
$$

The test statistic is

$$
z = \frac{62 - 60}{2} = 1.
$$

The smaller tail is

$$
P(Z \ge 1) = 0.1587,
$$

so the two-tailed p-value is

$$
2 \times 0.1587 = 0.3173.
$$

Since $0.3173 > 0.05$, the test retains $H_0$. There is not sufficient evidence
at the 5% level that the mean has changed.

Notice that the statistic $z = 1$ is small. A sample mean only 2 g above the
claim is well within ordinary variation when the standard error is 2 g.
</details>

**3.** A claim sets $\mu = 18$. The standard deviation is known to be 3. A
sample of 36 has mean 19.2. Test at the 5% level whether the mean is higher than
the claim.

<details markdown="1">
<summary>Hint</summary>

"Higher" points to the upper tail. Work out the standard error first.
</details>

<details markdown="1">
<summary>Next step</summary>

The standard error is $\dfrac{3}{\sqrt{36}} = 0.5$. Standardise 19.2, then find
the upper-tail probability.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
H_0: \mu = 18, \qquad H_1: \mu > 18, \qquad \alpha = 0.05.
$$

The standard error is

$$
\frac{3}{\sqrt{36}} = 0.5.
$$

The test statistic is

$$
z = \frac{19.2 - 18}{0.5} = 2.4.
$$

The upper-tail probability is

$$
P(Z \ge 2.4) = 0.0082 \quad (3 \text{ s.f.}).
$$

Since $0.0082 < 0.05$, the test rejects $H_0$. There is sufficient evidence at
the 5% level that the mean is above 18. The result also rejects at the 1% level,
because $0.0082 < 0.01$.
</details>

**4.** The claim in question 3 is tested with a sample of 9 instead of 36, and
the mean is again 19.2. Test at the 5% level whether the mean is higher than the
claim.

<details markdown="1">
<summary>Hint</summary>

Only the sample size has changed. The standard error grows when the sample is
smaller.
</details>

<details markdown="1">
<summary>Next step</summary>

The standard error is now $\dfrac{3}{\sqrt{9}} = 1$. Standardise 19.2 again and
find the new upper-tail probability.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
H_0: \mu = 18, \qquad H_1: \mu > 18, \qquad \alpha = 0.05.
$$

The standard error is

$$
\frac{3}{\sqrt{9}} = 1.
$$

The test statistic is

$$
z = \frac{19.2 - 18}{1} = 1.2.
$$

The upper-tail probability is

$$
P(Z \ge 1.2) = 0.1151 \quad (4 \text{ d.p.}).
$$

Since $0.1151 > 0.05$, the test retains $H_0$. The same gap of $1.2$ above the
claim is not convincing from a sample of 9, because the sample mean varies more
when the sample is small.
</details>

**5.** For question 1, the test statistic is $z = -2$, and the 5% one-tailed
critical value for a lower-tail test is $-1.645$. Decide the test by comparing
the two values, and check the decision against the p-value route.

<details markdown="1">
<summary>Hint</summary>

A lower-tail test rejects when the statistic lies below the critical value.
</details>

<details markdown="1">
<summary>Next step</summary>

Compare $-2$ with $-1.645$. Decide whether $-2$ lies to the left of $-1.645$ on
the number line.
</details>

<details markdown="1">
<summary>Full working</summary>

The critical value is $-1.645$. Since

$$
-2 < -1.645,
$$

the test statistic lies in the critical region, so the test rejects $H_0$. The
p-value route gave $0.0228 < 0.05$, which also rejects. The two routes agree,
because $z = -1.645$ is exactly the boundary where the lower tail equals $0.05$.
</details>

**6.** A two-tailed Normal test gives a p-value of $0.0455$. Decide the test at
the 5% level. Then explain what would happen to the decision if the same
statistic came from a one-tailed test.

<details markdown="1">
<summary>Hint</summary>

A two-tailed p-value doubles the smaller tail. A one-tailed p-value uses only
one tail.
</details>

<details markdown="1">
<summary>Next step</summary>

Compare $0.0455$ with $0.05$ for the two-tailed decision. Then halve the p-value
for the one-tailed case and compare again.
</details>

<details markdown="1">
<summary>Full working</summary>

At the 5% level, $0.0455 < 0.05$, so the two-tailed test rejects $H_0$.

If the same statistic came from a one-tailed test, the p-value would be
$\dfrac{0.0455}{2} = 0.0228$. This is also below $0.05$, so the one-tailed test
would also reject. Halving the p-value makes a rejection more likely, so a
result close to the level can move from retain to reject when the test becomes
one-tailed.
</details>
