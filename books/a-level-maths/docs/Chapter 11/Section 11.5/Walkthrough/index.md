---
title: 11.5 Measures of central tendency and variation, including standard deviation — Learn
chapter: 11
chapter_title: Statistical sampling and data presentation
section: '11.5'
section_title: 'Measures of central tendency and variation, including standard deviation'
dfe:
- L3
kind: walkthrough
---

# 11.5 Measures of central tendency and variation, including standard deviation — Learn

**Prerequisites:** the mean, median and mode from GCSE; using a formula, and
squaring and square-rooting with a calculator.

**By the end of this section you can:** choose and calculate an average; find
quartiles and the interquartile range; calculate the standard deviation from a
list and from summary statistics; and use the mean and standard deviation to
compare two distributions.

## 1. Measures of central tendency

An average is a single value that stands for the centre of a data set. The three
averages are the mean, the median and the mode.

- The **mean** adds all the values and divides by how many there are. It uses
  every value, so an outlier pulls it.
- The **median** is the middle value when the data are in order. It is not
  pulled much by an outlier.
- The **mode** is the value that occurs most often. It is the only average that
  works for a category, such as a favourite colour.

Use the mean for symmetric data with no outliers. Use the median when the data
are skewed or contain an outlier. Use the mode for the most common category.

**Example 1.** Find the mean, median and mode of
$3, 4, 4, 6, 8, 9, 11$.

$$
\text{mean} = \frac{3 + 4 + 4 + 6 + 8 + 9 + 11}{7} = \frac{45}{7} = 6.43.
$$

The middle value is the fourth, so the median is 6. The value 4 occurs twice,
and no other value occurs more than once, so the mode is 4.

## 2. Measures of variation

A measure of variation says how spread out the data are. Two data sets can have
the same mean and very different spreads.

- The **range** is the largest value minus the smallest. It is quick to
  calculate, but one outlier controls it.
- The **interquartile range** is the upper quartile minus the lower quartile.
  It measures the spread of the middle half of the data and ignores the
  extremes.
- The **standard deviation** measures the typical distance of a value from the
  mean. It uses every value.

## 3. Quartiles and the interquartile range

Put the data in order. A quartile position uses

$$
\text{position of } Q_1 = \frac{n + 1}{4},
\qquad
\text{position of } Q_3 = \frac{3(n + 1)}{4}.
$$

If the position is not a whole number, **interpolate** between the two values on
either side. The interquartile range is

$$
\text{IQR} = Q_3 - Q_1.
$$

**Example 2.** Find $Q_1$, $Q_3$ and the IQR of
$3, 5, 8, 10, 12, 14$.

There are $n = 6$ values. The position of $Q_1$ is

$$
\frac{6 + 1}{4} = 1.75,
$$

which is three-quarters of the way from the 1st value to the 2nd:

$$
Q_1 = 3 + 0.75(5 - 3) = 4.5.
$$

The position of $Q_3$ is

$$
\frac{3(6 + 1)}{4} = 5.25,
$$

so

$$
Q_3 = 12 + 0.25(14 - 12) = 12.5.
$$

The interquartile range is

$$
\text{IQR} = 12.5 - 4.5 = 8.
$$

## 4. The standard deviation

The **standard deviation** is the root mean square deviation from the mean. It
measures how far, on average, the values sit from the mean.

For a data set $x_1, x_2, \ldots, x_n$ with mean $\bar{x}$,

$$
\sigma = \sqrt{\frac{\sum (x - \bar{x})^2}{n}}.
$$

A useful calculating form is

$$
\sigma = \sqrt{\frac{\sum x^2}{n} - \bar{x}^2}.
$$

The standard deviation has the same units as the data. A large standard
deviation means the values are spread widely around the mean. A small standard
deviation means they cluster near the mean.

Some calculators and spreadsheets divide by $n - 1$ instead of $n$, and call the
result the sample standard deviation. Both are accepted at A-level, but you must
say which one you used. The method above divides by $n$.

**Example 3.** Find the standard deviation of
$2, 4, 6, 8, 10$.

The mean is

$$
\bar{x} = \frac{2 + 4 + 6 + 8 + 10}{5} = 6.
$$

The squared deviations from the mean are

$$
16,\ 4,\ 0,\ 4,\ 16.
$$

Their sum is 40, so

$$
\sigma = \sqrt{\frac{40}{5}} = \sqrt{8} = 2.83 \ (3 \text{ s.f.}).
$$

## 5. Standard deviation from summary statistics

Sometimes you are given the totals rather than the list. Use the calculating
form.

**Example 4.** A data set has $n = 10$, $\sum x = 60$ and $\sum x^2 = 800$.
Find the mean and the standard deviation.

The mean is

$$
\bar{x} = \frac{60}{10} = 6.
$$

Then

$$
\sigma = \sqrt{\frac{800}{10} - 6^2} = \sqrt{80 - 36} = \sqrt{44} = 6.63 \ (3 \text{ s.f.}).
$$

## 6. Using the mean and standard deviation to compare

Two distributions are often compared with the mean and the standard deviation
together. The mean describes the centre, and the standard deviation describes
the spread.

**Example 5.** Two classes sit the same test. Class A has mean 60 and standard
deviation 4. Class B has mean 60 and standard deviation 12. Compare the classes.

Both classes have the same mean, so their typical scores agree. Class B has the
larger standard deviation, so its scores are more spread out. Class B contains
more very high and very low scores, and Class A is more consistent.

**Example 6.** Every value in a data set is increased by 10. Explain what
happens to the mean and the standard deviation.

Adding 10 moves every value up by 10, so the mean rises by 10. The distances from
the mean do not change, so the standard deviation is unchanged.

> **Watch out.** Three mistakes are common.
>
> **Forgetting to square the deviations.** The formula uses $\sum(x - \bar{x})^2$,
> not $\sum(x - \bar{x})$. The unsquared deviations add to zero for any data set,
> so the squares are essential.
>
> **Dividing by $n - 1$ without saying so.** If your calculator uses $n - 1$,
> state it. The two values are close for a large sample, but they differ for a
> small one.
>
> **Comparing means without comparing spreads.** Two data sets can share a mean
> and have very different spreads. Always report a measure of variation as well.
>
> **Re-check:** the standard deviation cannot be negative, and it is zero only
> when every value is the same.

## You should now be able to

- choose the mean, median or mode for a data set and say why;
- find the range and the interquartile range, using the $(n + 1)$ positions;
- calculate the standard deviation from a list;
- calculate the standard deviation from summary statistics;
- compare two distributions using the mean and the standard deviation;
- describe the effect of adding a constant to every value.
