---
title: 25.1 Quartiles, interquartile range and box plots — Learn
chapter: 25
chapter_title: 'Statistics: spread, grouped data and correlation'
section: '25.1'
section_title: Quartiles, interquartile range and box plots
tier: H
dfe: [S4]
kind: walkthrough
---

# 25.1 Quartiles, interquartile range and box plots — Learn

**Prerequisites:** order data, find a median, and calculate a range.

**Objectives:** find quartiles and the interquartile range, draw a box plot, and
interpret these measures.

A **quartile** divides ordered data into four equal groups. The lower quartile
$Q_1$ is the median of the lower half. The upper quartile $Q_3$ is the median
of the upper half. The **interquartile range** (IQR) measures the spread of the
middle half: $\mathrm{IQR}=Q_3-Q_1$.

**Example 1.** Find the median, quartiles and IQR for the chapter travel times.

There are 20 values, so the median is the mean of positions 10 and 11:

$$
\mathrm{median}=\frac{21+22}{2}=21.5
$$

The lower half has positions 1 to 10, so $Q_1=(17+18)/2=17.5$.

The upper half has positions 11 to 20, so $Q_3=(26+27)/2=26.5$.

$$
\mathrm{IQR}=26.5-17.5=9
$$

**Example 2.** Draw a box plot from the five-number summary
$12,17.5,21.5,26.5,42$.

Draw a number line using a consistent scale. Mark the minimum and maximum with
whiskers, and draw a box from $Q_1$ to $Q_3$. Mark the median inside the box.

**Predict:** predict how the box changes if the upper quartile moves from $26.5$
to $30$ while the other values stay fixed. Write your prediction down first.

:::figure ch25-boxplot

**Test:** use the control to test your prediction.

**Explain:** which part represents the middle half of the data? Write your
explanation before reading on.

> **Watch out.** Do not calculate the IQR as $Q_1-Q_3$. The upper quartile is
> larger, so subtract $Q_1$ from $Q_3$; check that the spread is positive.

## Progress check

For the travel times, the middle half runs from 17.5 to 26.5 minutes. Does this
match your first prediction of a narrow or wide interval? Give a reason.

## You should now be able to

- find the median and quartiles of an ordered list;
- calculate and interpret the interquartile range;
- draw and read a box plot from a five-number summary.
