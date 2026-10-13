---
title: 11.6 Outliers, data cleaning and critiquing presentation — Practise with help
chapter: 11
chapter_title: Statistical sampling and data presentation
section: '11.6'
section_title: Outliers, data cleaning and critiquing presentation
refs:
- L4
kind: guided-problems
---

# 11.6 Outliers, data cleaning and critiquing presentation — Practise with help

Work each question closed book first. For every unusual value, state whether you
keep it, correct it or remove it, and give a reason.

## Warm-up: remember

1. Find the median of $4, 9, 12, 15, 18$.
2. Work out $1.5 \times 8$.
3. Find the range of $7, 12, 15, 22$.

<details markdown="1">
<summary>Answers</summary>

1. There are 5 values, so the median is the 3rd: $12$.
2. $1.5 \times 8 = 12$.
3. $22 - 7 = 15$.

If question 2 was hard, revise multiplying decimals before you start.
</details>

## Practise with help

**1.** The data are $4, 6, 7, 8, 9, 10, 11, 12, 30$. Find the interquartile
range using the $(n + 1)$ positions.

<details markdown="1">
<summary>Hint</summary>

There are 9 values. Use position $\dfrac{n + 1}{4}$ for $Q_1$ and
$\dfrac{3(n + 1)}{4}$ for $Q_3$.
</details>

<details markdown="1">
<summary>Next step</summary>

The positions are $\dfrac{10}{4} = 2.5$ and $\dfrac{30}{4} = 7.5$. Interpolate
between the 2nd and 3rd values, and between the 7th and 8th.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
Q_1 = 6 + 0.5(7 - 6) = 6.5,
\qquad
Q_3 = 11 + 0.5(12 - 11) = 11.5.
$$

The interquartile range is

$$
\text{IQR} = 11.5 - 6.5 = 5.
$$
</details>

**2.** For the data in question 1, find the two fences and decide whether 30 is
a possible outlier.

<details markdown="1">
<summary>Hint</summary>

The fences are $Q_1 - 1.5 \times \text{IQR}$ and
$Q_3 + 1.5 \times \text{IQR}$.
</details>

<details markdown="1">
<summary>Next step</summary>

With $Q_1 = 6.5$, $Q_3 = 11.5$ and IQR $= 5$, the fences are $6.5 - 7.5$ and
$11.5 + 7.5$.
</details>

<details markdown="1">
<summary>Full working</summary>

The lower fence is

$$
6.5 - 1.5(5) = 6.5 - 7.5 = -1.
$$

The upper fence is

$$
11.5 + 1.5(5) = 11.5 + 7.5 = 19.
$$

The value 30 is above 19, so 30 is a possible outlier.
</details>

**3.** Every other value in a data set of adult heights is between 150 cm and
195 cm. One value is recorded as 18 cm. Decide what to do with it and give a
reason.

<details markdown="1">
<summary>Hint</summary>

Ask whether an adult height of 18 cm is possible.
</details>

<details markdown="1">
<summary>Next step</summary>

The value is about ten times too small. Consider whether a decimal point was
missed, and whether the true value can be recovered.
</details>

<details markdown="1">
<summary>Full working</summary>

An adult height of 18 cm is impossible, so the value is an error. If the
original record shows the true value, correct it. If the true value is lost,
remove the value, and state that one of the values was removed as an error. Do
not keep it in the data set.
</details>

**4.** A data set has 20 values and one is missing. The mean of the 19 known
values is 12. A value of 60 is found for the missing item. Explain why 60 may be
correct, and say what to do with it.

<details markdown="1">
<summary>Hint</summary>

The value 60 is larger than the other values, but that does not make it wrong.
</details>

<details markdown="1">
<summary>Next step</summary>

Decide whether 60 is possible in the context, and whether it is an outlier.
</details>

<details markdown="1">
<summary>Full working</summary>

A value of 60 is possible, so it is not automatically an error. It may be a
genuine extreme value, and the mean of the 19 known values does not rule it out.
Check the original record. If it is correct, keep it and report it as an
outlier. If it is an error and the true value is known, correct it. Only remove
it when it is wrong and cannot be corrected.
</details>

**5.** A chart shows the number of visitors to a website as 1020, 1040 and 1060,
with the vertical axis starting at 1000. Explain why the chart is misleading.

<details markdown="1">
<summary>Hint</summary>

Compare the actual change with the change the chart appears to show.
</details>

<details markdown="1">
<summary>Next step</summary>

Work out the increase from 1020 to 1060, both in numbers and as a percentage.
</details>

<details markdown="1">
<summary>Full working</summary>

The increase from 1020 to 1060 is 40 visitors, which is about $3.9\%$. Starting
the axis at 1000 makes the bars look very different in height, so the growth
looks large. Starting the axis at 0 would show three almost equal bars.
</details>

**6.** A data set of reaction times is in seconds, but 6 of the 40 values are in
milliseconds. Explain how to clean the data, and say one thing you must report.

<details markdown="1">
<summary>Hint</summary>

Decide which unit to keep, then convert the others.
</details>

<details markdown="1">
<summary>Next step</summary>

Divide each millisecond value by 1000 to change it to seconds, or multiply the
seconds by 1000 to change them to milliseconds.
</details>

<details markdown="1">
<summary>Full working</summary>

Keep one unit, for example seconds. Divide each of the 6 millisecond values by
1000 to convert them to seconds, then calculate. Report how many values were
converted, so a reader can see what was changed.
</details>
