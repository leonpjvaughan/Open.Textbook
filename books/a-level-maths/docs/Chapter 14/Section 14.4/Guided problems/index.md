---
title: 14.4 Interpreting correlation coefficients — Practise with help
chapter: 14
chapter_title: Statistical hypothesis testing
section: '14.4'
section_title: Interpreting correlation coefficients with p-values and critical values
refs:
- O1
kind: guided-problems
---

# 14.4 Interpreting correlation coefficients — Practise with help

Attempt each question closed book first. Write down whether the test is
one-tailed or two-tailed before you compare any numbers.

## Warm-up: remember

1. A scatter diagram shows points that rise from left to right and lie close to
   a straight line. Describe the correlation.
2. The correlation coefficient for a set of data is $r = -0.8$. State the
   direction and the strength of the correlation.
3. A two-tailed test uses the 5% significance level. Write down the probability
   in each tail.

<details markdown="1">
<summary>Answers</summary>

1. The correlation is positive and strong, because the points rise and lie close
   to a line.
2. The correlation is negative and strong, because the sign is negative and
   $-0.8$ is close to $-1$.
3. Each tail holds $2.5\%$, because the 5% is shared equally.

If question 3 was hard, revise Section 14.1 before you start.
</details>

:::figure warm-up-gate


## Practise with help

**1.** A study of 20 pairs gives $r = 0.48$. The test is one-tailed, with
$H_1: \rho > 0$ and a 5% significance level. The p-value is $0.017$. Decide the
test and interpret the result in context.

<details markdown="1">
<summary>Hint</summary>

A p-value is compared with the significance level, not with $r$.
</details>

<details markdown="1">
<summary>Next step</summary>

Compare $0.017$ with $0.05$. If the p-value is smaller, the test rejects
$H_0$.
</details>

<details markdown="1">
<summary>Full working</summary>

Since

$$
0.017 < 0.05,
$$

the test rejects $H_0$. There is sufficient evidence at the 5% level of a
positive linear correlation between the two variables. The phrase "positive
linear" keeps the conclusion to what the test measured.
</details>

**2.** A sample of 30 pairs gives $r = 0.35$. The test is two-tailed at the 5%
level, and the critical value for 30 pairs is $0.361$. Decide the test.

<details markdown="1">
<summary>Hint</summary>

A two-tailed test compares $|r|$ with the critical value.
</details>

<details markdown="1">
<summary>Next step</summary>

Compare $0.35$ with $0.361$. Decide whether the coefficient reaches the critical
value.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
|0.35| = 0.35 < 0.361.
$$

The coefficient is below the critical value, so the test retains $H_0$. There is
not sufficient evidence at the 5% level of a linear correlation.

This is close to the boundary. A small change in the data, or a slightly larger
sample, could move the coefficient past the critical value.
</details>

**3.** A sample of 20 pairs gives $r = 0.44$. The one-tailed 5% critical value for
20 pairs is $0.378$, and the two-tailed 5% critical value is $0.444$.
(a) Decide a one-tailed test with $H_1: \rho > 0$.
(b) Decide a two-tailed test.

<details markdown="1">
<summary>Hint</summary>

The two tests use different critical values. The tail must be chosen from the
question, before the data are used.
</details>

<details markdown="1">
<summary>Next step</summary>

For part (a), compare $0.44$ with $0.378$. For part (b), compare $0.44$ with
$0.444$. Notice how close part (b) is to the boundary.
</details>

<details markdown="1">
<summary>Full working</summary>

(a) For the one-tailed test, $0.44 > 0.378$, so the test rejects $H_0$. There is
sufficient evidence at the 5% level of a positive linear correlation.

(b) For the two-tailed test, $0.44 < 0.444$, so the test retains $H_0$. There is
not sufficient evidence at the 5% level of a linear correlation.

The same value of $r$ gives two decisions. The two-tailed critical value is
larger, because the 5% is shared between two tails, so each tail is harder to
reach.
</details>

**4.** A sample of 25 pairs gives $r = -0.52$ between the age of a machine and
its efficiency. The test is one-tailed at the 5% level with $H_1: \rho < 0$, and
the critical value for 25 pairs is $0.337$. Decide the test and interpret the
result.

<details markdown="1">
<summary>Hint</summary>

The alternative is negative, so the test rejects only when $r$ is below the
negative of the critical value.
</details>

<details markdown="1">
<summary>Next step</summary>

Compare $-0.52$ with $-0.337$. Decide which value is further from zero in the
negative direction.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
-0.52 < -0.337.
$$

The coefficient is below the critical value, so the test rejects $H_0$. There is
sufficient evidence at the 5% level of a negative linear correlation between the
age of the machine and its efficiency. Older machines in this sample tend to be
less efficient.

The conclusion is about an association, not a cause. A machine may lose
efficiency for a reason that also grows with its age, such as the number of
hours it has run.
</details>

**5.** A sample of 30 pairs gives $r = 0.35$. A second sample of 60 pairs gives
the same value $r = 0.35$. The two-tailed 5% critical value is $0.361$ for 30
pairs and $0.254$ for 60 pairs. Decide each test.

<details markdown="1">
<summary>Hint</summary>

The coefficient is the same in both samples. Only the critical value changes.
</details>

<details markdown="1">
<summary>Next step</summary>

Compare $0.35$ with each critical value in turn.
</details>

<details markdown="1">
<summary>Full working</summary>

For 30 pairs,

$$
0.35 < 0.361,
$$

so the test retains $H_0$.

For 60 pairs,

$$
0.35 > 0.254,
$$

so the test rejects $H_0$.

The larger sample gives a smaller critical value, so a moderate coefficient can
be significant when it is based on more pairs. A correlation must always be
reported with the number of pairs used.
</details>

**6.** A test gives a significant positive correlation between the number of
hours a student sleeps and their test score. Write a conclusion that is
supported by the test, and one sentence that goes too far.

<details markdown="1">
<summary>Hint</summary>

A supported conclusion uses words such as "associated with". An unsupported one
uses the word "causes".
</details>

<details markdown="1">
<summary>Next step</summary>

Write the association first, then write the causal claim that the test cannot
support.
</details>

<details markdown="1">
<summary>Full working</summary>

A supported conclusion: "There is evidence of a positive association between
hours of sleep and test score in this population."

Too far: "Sleeping more causes a higher test score." The correlation shows that
the two variables move together. A third factor, such as time available to
revise, could drive both.
</details>
