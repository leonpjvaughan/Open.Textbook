---
title: 11.5 The standard deviation — Learn
chapter: 11
chapter_title: Statistics
section: '11.5'
section_title: The standard deviation
tier: O
refs:
- '1.7'
kind: walkthrough
---

# 11.5 The standard deviation — Learn

**Prerequisites:** Section 11.4 — the mean, the median and the range; squaring a number
and taking a square root.

**Objectives:** find the standard deviation of a list and from a frequency table; find
quartiles and the interquartile range; choose the measure of spread that suits the data.

By the end of this section you can put a single number on how spread out a data set is,
and you can explain what that number means.

## Why the range is not enough

The range uses only two values, so one outlier can make it huge. Two data sets can share
a range and be spread out in completely different ways. The **standard deviation** uses
every value, so it measures the whole data set.

The standard deviation starts from the **deviation** of each value from the mean,
$x - \mu$. Some deviations are positive and some are negative, and they add to zero. To
stop them cancelling, we square each one. The mean of the squared deviations is the
**variance**, and its square root is the standard deviation.

> **The standard deviation of a list.** For values with mean $\mu$,
> $$\sigma = \sqrt{\frac{\sum (x - \mu)^2}{n}}$$
> where $n$ is how many values there are. This is the formula in the formulae and tables
> booklet. The Greek letter $\sigma$ is read "sigma".

The **variance** is $\sigma^2$. The standard deviation is in the same units as the data,
which is why it is usually reported instead of the variance.

**Example 1.** Find the standard deviation of $2$, $4$, $6$, $8$ and $10$.

The mean is $\mu = \dfrac{30}{5} = 6$. The deviations and their squares are:

| $x$ | $x - \mu$ | $(x - \mu)^2$ |
|---|---|---|
| $2$ | $-4$ | $16$ |
| $4$ | $-2$ | $4$ |
| $6$ | $0$ | $0$ |
| $8$ | $2$ | $4$ |
| $10$ | $4$ | $16$ |

The squared deviations add to $40$, so the variance is $\dfrac{40}{5} = 8$ and

$$\sigma = \sqrt{8} = 2\sqrt{2} \approx 2.83$$

## From a frequency table

When the data are in a frequency table, each squared deviation is multiplied by its
frequency.

> **The standard deviation from a frequency table.**
> $$\sigma = \sqrt{\frac{\sum f(x - \mu)^2}{\sum f}}$$

**Example 2.** Find the standard deviation of the data in this table.

| Value $x$ | Frequency $f$ |
|---|---|
| $1$ | $2$ |
| $2$ | $4$ |
| $3$ | $6$ |
| $4$ | $4$ |
| $5$ | $2$ |

The total frequency is $\sum f = 18$ and the mean is

$$\mu = \frac{1 \times 2 + 2 \times 4 + 3 \times 6 + 4 \times 4 + 5 \times 2}{18}
= \frac{54}{18} = 3$$

The squared deviations are $(1-3)^2 = 4$, $(2-3)^2 = 1$, $(3-3)^2 = 0$, $(4-3)^2 = 1$ and
$(5-3)^2 = 4$. Weighted by frequency:

$$\sum f(x - \mu)^2 = 2(4) + 4(1) + 6(0) + 4(1) + 2(4) = 24$$

$$\sigma = \sqrt{\frac{24}{18}} = \sqrt{\frac{4}{3}} = \frac{2\sqrt{3}}{3} \approx 1.15$$

## A sample and the population

The formula above divides by $n$, which describes a data set that is the whole
population. When the data are a sample used to estimate the spread of a larger
population, dividing by $n - 1$ gives a better estimate. The booklet prints this estimate
as $s = \sqrt{\dfrac{\sum (x - \bar{x})^2}{n - 1}}$.

**Example 3.** Find the sample standard deviation of $2$, $4$, $6$, $8$ and $10$.

The squared deviations still add to $40$, and $n - 1 = 4$:

$$s = \sqrt{\frac{40}{4}} = \sqrt{10} \approx 3.16$$

The sample estimate, $3.16$, is larger than the population value, $2.83$, because
dividing by the smaller number $4$ makes the result larger.

> **Watch out.** State which convention you are using. A standard deviation found by
> dividing by $n$ and one found by dividing by $n - 1$ are different numbers for the same
> data. The formula in the booklet for a list divides by $n$; the estimate from a sample
> divides by $n - 1$. A calculator has a setting for each, and the wrong setting gives a
> slightly wrong answer.

## Quartiles and the interquartile range

The **interquartile range**, or IQR, is the spread of the middle half of the data. It is
found from the quartiles. The **lower quartile** $Q_1$ is the value one quarter of the way
up the ordered list, and the **upper quartile** $Q_3$ is the value three quarters of the
way up.

> **The interquartile range.** $\text{IQR} = Q_3 - Q_1$.

The IQR ignores the lowest quarter and the highest quarter, so an outlier does not move
it. The standard deviation uses every value, so an outlier does move it. Use the IQR when
the data are skewed or contain outliers, and the standard deviation when they are fairly
symmetric.

**Example 4.** Find the IQR of $1$, $3$, $4$, $6$, $8$, $9$, $11$ and $14$, using the
$(n + 1)$ position method.

There are $n = 8$ values. The position of $Q_1$ is $\dfrac{n + 1}{4} = 2.25$, which lies
between the $2$nd value $3$ and the $3$rd value $4$:

$$Q_1 = 3 + 0.25(4 - 3) = 3.25$$

The position of $Q_3$ is $\dfrac{3(n + 1)}{4} = 6.75$, between $9$ and $11$:

$$Q_3 = 9 + 0.75(11 - 9) = 10.5$$

$$\text{IQR} = 10.5 - 3.25 = 7.25$$

## Progress check

Back to the chapter problem. The $10$ ages recorded by the polling company were $18$,
$22$, $25$, $31$, $34$, $41$, $47$, $53$, $61$ and $78$, with mean $41$.

Find the standard deviation, dividing by $n$.

The squared deviations add to $3244$, so the variance is

$$\frac{3244}{10} = 324.4$$

and

$$\sigma = \sqrt{324.4} \approx 18.0$$

The ages are spread about $18$ years either side of the mean. That is a wide spread, and
it is another reason a sample of $10$ tells us little about the country. Section 11.7
shows how the sample size, not the spread alone, sets the margin of error.

## You should now be able to

- explain what the standard deviation measures;
- find the standard deviation of a list;
- find the standard deviation from a frequency table;
- state whether you are dividing by $n$ or by $n - 1$;
- find the quartiles and the IQR;
- choose between the IQR and the standard deviation.
