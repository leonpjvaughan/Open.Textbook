---
title: "22.6 Measures of spread: range and interquartile range — Learn"
chapter: 22
chapter_title: Statistics
section: '22.6'
section_title: 'Measures of spread: range and interquartile range'
tier: O
refs:
- SP.3
kind: walkthrough
---

# 22.6 Measures of spread: range and interquartile range — Learn

**Prerequisites:** mean, median and mode from Section 22.5.

**Objectives:** work out the range of a set of data; work out the quartiles;
work out the interquartile range; compare two sets of data using a measure of
centre and a measure of spread.

By the end of this section you can say how spread out a set of data is, as well as
where its middle sits.

## Why spread matters

Two classes can have the same mean mark and still be very different. In one class
everyone scores near the middle. In the other, some score very low and some very
high. A measure of centre alone hides that difference.

A **measure of spread** says how far apart the values are. This section covers two
of them.

## The range

The **range** is the largest value minus the smallest value.

$$\text{range} = \text{largest} - \text{smallest}$$

**Example 1.** Find the range of $4, 7, 6, 9, 4$.

The largest value is 9 and the smallest is 4.

$$9-4=5$$

The range is 5.

The range is quick to work out, but it uses only two values. One extreme value
makes the range large, even if the rest of the data is close together.

## Quartiles

A **quartile** splits the ordered data into four parts. The three quartiles are
the lower quartile $Q_1$, the median $Q_2$ and the upper quartile $Q_3$.

- $Q_1$ is the median of the lower half of the data.
- $Q_2$ is the median of all the data.
- $Q_3$ is the median of the upper half of the data.

When the number of values is odd, the median itself is not used in either half.

## The interquartile range

The **interquartile range** is the upper quartile minus the lower quartile.

$$\text{IQR} = Q_3 - Q_1$$

The IQR is the spread of the middle half of the data. It ignores the lowest
quarter and the highest quarter, so an extreme value does not change it.

**Example 2.** Find the quartiles and the IQR of $3, 5, 6, 8, 9, 11, 14, 18$.

There are 8 values, so the median is the mean of the 4th and 5th.

$$\frac{8+9}{2}=8.5$$

The lower half is $3, 5, 6, 8$, whose median is

$$\frac{5+6}{2}=5.5$$

So $Q_1=5.5$. The upper half is $9, 11, 14, 18$, whose median is

$$\frac{11+14}{2}=12.5$$

So $Q_3=12.5$. The interquartile range is

$$12.5-5.5=7$$

## The chapter problem

The 20 sleep answers, in order, are

$$5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10$$

**The range.** The largest value is 10 and the smallest is 5.

$$10-5=5$$

The range is 5 hours.

**The quartiles.** There are 20 values, so each half has 10 values.

- The lower half is $5, 5, 5, 6, 6, 6, 7, 7, 7, 7$. Its median is the mean of the
  5th and 6th values: $\frac{6+6}{2}=6$. So $Q_1=6$.
- The upper half is $8, 8, 8, 8, 8, 9, 9, 9, 10, 10$. Its median is the mean of the
  5th and 6th values: $\frac{8+9}{2}=8.5$. So $Q_3=8.5$.

**The interquartile range.**

$$8.5-6=2.5$$

The IQR is 2.5 hours. The middle half of the students sleep between 6 and 8.5
hours.

## Comparing two sets of data

To compare two sets, use one measure of centre and one measure of spread.

- Compare the medians to say which set is higher on average.
- Compare the IQRs to say which set is more consistent.

A smaller IQR means the middle half of the values are closer together, so the data
is more consistent.

## Investigate the interquartile range

**Predict.** Before you drag anything, predict what happens to the interquartile range
when you move the lower quartile to the left.

:::figure boxplot-spread

**Test.** Drag the two round handles, or use the sliders. Watch the width of the box
and the interquartile range in the readout.

**Explain.** Write two or three sentences. Say what the box shows about the middle
half of the values, and what the whiskers show. Use the words "quartile",
"interquartile range" and "middle half".

## Watch out

> **Watch out.** Put the data in order before you find the quartiles, and do not
> use the median in either half when the number of values is odd.
>
> For $2, 4, 6, 8, 10$, the median is 6. The lower half is $2, 4$ and the upper
> half is $8, 10$. So $Q_1=3$ and $Q_3=9$. The value 6 belongs to neither half.
>
> **Re-check:** mark the median, then cover it. The values to the left are the
> lower half, and the values to the right are the upper half.

## Progress check

Return to the chapter problem. The ordered sleep values are

$$5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10$$

1. Work out the range.
2. Work out the lower quartile $Q_1$.
3. Work out the upper quartile $Q_3$.
4. Work out the interquartile range.
5. The IQR is 2.5 hours. What does this tell you about the middle half of the
   students?

Keep your answers. In Section 22.7 you will look for a link between two sets of
data.

## You should now be able to

- work out the range of a set of data;
- order the data and find the lower and upper quartiles;
- work out the interquartile range;
- explain why the IQR is not affected by an extreme value;
- compare two sets of data using a measure of centre and a measure of spread.
