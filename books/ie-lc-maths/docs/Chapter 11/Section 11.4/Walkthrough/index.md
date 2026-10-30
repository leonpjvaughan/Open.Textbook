---
title: 11.4 Measures of centre and spread — Learn
chapter: 11
chapter_title: Statistics
section: '11.4'
section_title: Measures of centre and spread
tier: F
refs:
- '1.7'
kind: walkthrough
---

# 11.4 Measures of centre and spread — Learn

**Prerequisites:** adding and dividing; reading a frequency table.

**Objectives:** find the mean, median and mode of a data set; find the range; find the
mean from a frequency table; choose an average that suits the data.

By the end of this section you can describe a data set with one number for the middle and
one number for the spread.

## The three averages

An **average** is a single value that stands for the whole data set. Three are used.

- The **mean** adds every value and divides by how many there are. The mean of a list is
  written $\bar{x}$.
- The **median** is the middle value when the data are put in order. With an even number
  of values, it is the mean of the two middle values.
- The **mode** is the value that occurs most often.

> **The mean of a list.** For values $x_1, x_2, \dots, x_n$,
>
>
> $$\bar{x} = \frac{\sum x}{n}$$
>
>
> where $\sum x$ means the sum of all the values and $n$ is how many there are.

**Example 1.** Find the mean of $4$, $7$, $9$, $12$, $13$ and $15$.

The sum is $4 + 7 + 9 + 12 + 13 + 15 = 60$, and there are $6$ values:

$$\bar{x} = \frac{60}{6} = 10$$

**Example 2.** Find the median of $3$, $5$, $8$, $10$, $12$ and $14$.

The values are already in order. There are $6$ values, so the median is the mean of the
$3$rd and $4$th:

$$\frac{8 + 10}{2} = 9$$

## The range

The **range** is the largest value minus the smallest. It is the simplest measure of
**spread**, which says how spread out the data are.

**Example 3.** Find the range of $12$, $15$, $11$, $19$ and $14$.

The largest value is $19$ and the smallest is $11$:

$$19 - 11 = 8$$

The range is $8$. Two data sets can share a mean and still have very different spreads.

## The mean from a frequency table

When values repeat, a frequency table saves work. Multiply each value by its frequency,
add the results, and divide by the total frequency.

> **The mean from a frequency table.**
>
>
> $$\bar{x} = \frac{\sum fx}{\sum f}$$
>
>
> where $f$ is the frequency of the value $x$.

**Example 4.** Find the mean of the data in this table.

| Value $x$ | Frequency $f$ |
|---|---|
| $0$ | $4$ |
| $1$ | $7$ |
| $2$ | $6$ |
| $3$ | $3$ |

The total frequency is $4 + 7 + 6 + 3 = 20$. The sum $\sum fx$ is

$$0 \times 4 + 1 \times 7 + 2 \times 6 + 3 \times 3 = 0 + 7 + 12 + 9 = 28$$

So

$$\bar{x} = \frac{28}{20} = 1.4$$

## Which average to use

The mean uses every value, so it is the best average for data with no extreme values.
A single **outlier**, a value far from the rest, pulls the mean towards it. The median
does not move much when one value changes, so it describes a typical value better when
the data are skewed or contain an outlier. The mode is useful for categorical data, where
a mean makes no sense.

**Example 5.** The daily sales at a small shop are $5$, $6$, $6$, $7$ and $100$.

The mean is $\dfrac{124}{5} = 24.8$. The median is $6$. The value $100$ is an outlier, and
it pulls the mean far above every typical day. The median, $6$, describes a typical day
much better.

> **Watch out.** The median must be found from ordered data. For $3$, $8$, $5$, $10$ the
> middle of the list as written is $8$ and $5$, which is wrong. Put the values in order
> first: $3$, $5$, $8$, $10$, and the median is $\dfrac{5 + 8}{2} = 6.5$.

## Progress check

Back to the chapter problem. The polling company recorded the ages of a small sample of
$10$ voters it called: $18$, $22$, $25$, $31$, $34$, $41$, $47$, $53$, $61$ and $78$.

Find the mean and the median, and say which describes a typical voter better.

The sum is $410$, so the mean is $\dfrac{410}{10} = 41$. The median is the mean of the
$5$th and $6$th values:

$$\frac{34 + 41}{2} = 37.5$$

The value $78$ is an outlier and it pulls the mean above the median. The median, $37.5$,
describes a typical voter better here.

Keep both numbers. Section 11.5 measures the spread of the same sample.

## You should now be able to

- find the mean, median and mode of a data set;
- find the range;
- find the mean from a frequency table;
- explain how an outlier affects the mean and the median;
- choose an average that suits the data.
