---
title: 14.4 Interpreting correlation coefficients — Learn
chapter: 14
chapter_title: Statistical hypothesis testing
section: '14.4'
section_title: Interpreting correlation coefficients with p-values and critical values
refs:
- O1
kind: walkthrough
---

# 14.4 Interpreting correlation coefficients — Learn

**Prerequisites:** scatter diagrams and correlation from Chapter 11, and the
language of hypothesis testing from Section 14.1.

**By the end of this section you can:** interpret a given correlation coefficient
using a given p-value or critical value; state the hypotheses for a test of no
linear correlation; and explain why a significant correlation is not a cause.

## 1. What a correlation coefficient measures

Two variables measured on the same items can be plotted on a scatter diagram.
The **product moment correlation coefficient**, written $r$, measures how close
the points lie to a straight line.

The value of $r$ always lies between $-1$ and $1$.

:::prove correlation-between-minus-one-and-one

- $r = 1$ means every point lies exactly on an upward-sloping line.
- $r = -1$ means every point lies exactly on a downward-sloping line.
- $r = 0$ means there is no linear pattern. The points may still curve.

The sign gives the direction and the size gives the strength. A value of $r$
close to $1$ or $-1$ is a strong linear relationship. A value close to $0$ is a
weak one.

In this section the value of $r$ is always given. The calculation of $r$ is not
required; the work is to interpret the value and to test it.

## 2. Testing for linear correlation

A sample of pairs is used to judge the whole population. The population
correlation coefficient is written $\rho$ (the Greek letter rho).

The null hypothesis is that there is no linear correlation in the population:

$$
H_0: \rho = 0.
$$

The alternative depends on the question:

$$
H_1: \rho > 0, \qquad H_1: \rho < 0, \qquad \text{or} \qquad H_1: \rho \ne 0.
$$

A positive alternative is used when the question asks whether the variables move
together. A negative alternative is used when one variable is thought to fall as
the other rises. A two-tailed alternative is used when a relationship in either
direction matters.

## 3. Deciding with a p-value

If a p-value is given, compare it with the significance level in the usual way.

- p-value $\le \alpha$: reject $H_0$. There is evidence of linear correlation.
- p-value $> \alpha$: retain $H_0$. There is not sufficient evidence of linear
  correlation.

The p-value means the same as before. It is the probability of a value of $r$ at
least as extreme as the one observed, if there were no correlation at all. A
small p-value says that a value of $r$ this far from zero is surprising under
$H_0$.

## 4. Deciding with a critical value

If a critical value is given, compare the coefficient with it.

- For a one-tailed test, compare $r$ with the critical value in the same
  direction. A positive critical value needs $r$ above it. A negative critical
  value needs $r$ below it.
- For a two-tailed test, compare $|r|$ with the critical value. The sign does not
  matter, because a strong relationship in either direction is interesting.

The critical value depends on the number of pairs. A larger sample needs a
smaller coefficient to be significant, because a large sample gives more
information about the population.

## 5. Worked examples

**Example 1 — a p-value.** A study of 15 students finds a correlation of
$r = 0.62$ between hours of revision and test score. The test is one-tailed, with
$H_1: \rho > 0$ and a significance level of 5%. The p-value is $0.007$. Decide
the test and interpret the result.

Compare the p-value with the level:

$$
0.007 < 0.05.
$$

The test rejects $H_0$. There is sufficient evidence at the 5% level of a
positive linear correlation between hours of revision and test score.

Notice what the conclusion does and does not say. It says that the two variables
move together in this population. It does not say that more revision causes a
higher score.

**Example 2 — a critical value that retains.** A sample of 30 pairs gives
$r = 0.35$. The test is two-tailed at the 5% level, and the critical value for
30 pairs is $0.361$. Decide the test.

The test is two-tailed, so compare $|r|$ with the critical value:

$$
|0.35| = 0.35 < 0.361.
$$

The coefficient is below the critical value, so the test retains $H_0$. There is
not sufficient evidence at the 5% level of a linear correlation.

The same value of $r$ would reject for a larger sample. With 60 pairs the
critical value at the 5% level is about $0.254$, and $0.35 > 0.254$. This is why
a correlation must always be reported with the sample size.

**Example 3 — a negative correlation.** A sample of 25 pairs gives $r = -0.52$
between the age of a machine and its efficiency. The test is one-tailed at the
5% level, with $H_1: \rho < 0$. The critical value for 25 pairs is $0.337$, and
the test is on the lower tail. Decide the test.

For a negative one-tailed test, compare $r$ with the negative of the critical
value:

$$
-0.52 < -0.337.
$$

The coefficient is more extreme than the critical value, so the test rejects
$H_0$. There is sufficient evidence at the 5% level of a negative linear
correlation between age and efficiency. Older machines in this sample tend to be
less efficient.

**Example 4 — a large p-value.** A sample of 20 pairs gives $r = 0.22$ and a
two-tailed p-value of $0.35$. Decide the test at the 5% level.

Since $0.35 > 0.05$, the test retains $H_0$. A value of $r$ this far from zero
would happen in about 35% of samples if there were no correlation, so it is not
surprising. There is not sufficient evidence of a linear correlation.

## 6. Correlation is not causation

A significant correlation says that two variables move together. It does not say
that one causes the other.

Three other explanations are common.

- **A third variable drives both.** Ice cream sales and drowning deaths rise
  together, because hot weather increases both. Neither causes the other.
- **The direction is reversed.** A correlation between exercise and health could
  mean that healthy people find exercise easier, not that exercise creates
  health.
- **The relationship is not linear.** A strong curve can give a value of $r$
  close to zero, because $r$ only measures straight-line closeness. Always look
  at the scatter diagram as well as the value of $r$.

> **Watch out.** Four traps appear when a correlation is tested.
>
> **Comparing $r$ with the significance level.** The coefficient and the level
> are different kinds of number. Compare a p-value with $\alpha$; compare $r$
> with a critical value.
>
> **Ignoring the sample size.** The critical value depends on the number of
> pairs. A moderate $r$ can be significant for a large sample and not
> significant for a small one.
>
> **Forgetting to take the absolute value for a two-tailed test.** A two-tailed
> test uses $|r|$, because $-0.6$ is as strong as $0.6$.
>
> **Reading a cause into a correlation.** The test measures closeness to a
> straight line, nothing more. Say "is associated with", not "causes", unless the
> study was designed to show cause.
>
> **Re-check:** state $H_0$, $H_1$, the number of pairs and the significance
> level before you compare anything.

## Progress check

1. Write $H_0$ and $H_1$ for a test of whether two variables have a positive
   linear correlation.
2. A sample of 30 pairs gives $r = 0.42$ and a two-tailed p-value of $0.021$.
   Decide the test at the 5% level.
3. A sample of 15 pairs gives $r = 0.42$. The two-tailed 5% critical value for 15
   pairs is $0.514$. Decide the test, and explain why the answer differs from
   question 2 even though $r$ is the same.
4. Write one sentence that interprets a significant negative correlation without
   claiming cause.

## You should now be able to

- explain what the correlation coefficient $r$ measures and what its sign means;
- write the hypotheses for a test of no linear correlation;
- decide a test from a given p-value;
- decide a test from a given critical value, using $r$ or $|r|$ as the tail
  requires;
- explain why the sample size changes the critical value;
- interpret a significant correlation in context without claiming cause.
