---
title: 11.5 Measures of central tendency and variation, including standard deviation — Practise with help
chapter: 11
chapter_title: Statistical sampling and data presentation
section: '11.5'
section_title: 'Measures of central tendency and variation, including standard deviation'
refs:
- L3
kind: guided-problems
---

# 11.5 Measures of central tendency and variation, including standard deviation — Practise with help

Work each question closed book first. Say at the top whether your standard
deviation divides by $n$ or by $n - 1$.

## Warm-up: remember

1. Work out $7^2$ and $(-4)^2$.
2. Work out $\sqrt{49}$ and $\sqrt{\dfrac{100}{4}}$.
3. Find the mean of $12, 15, 18$.

<details markdown="1">
<summary>Answers</summary>

1. $7^2 = 49$ and $(-4)^2 = 16$.
2. $\sqrt{49} = 7$ and $\sqrt{25} = 5$.
3. $\dfrac{12 + 15 + 18}{3} = \dfrac{45}{3} = 15$.

If question 1 was hard, revise squaring negative numbers before you start.
</details>

:::figure warm-up-gate


## Practise with help

**1.** Find the mean, median and mode of $2, 3, 3, 5, 7, 10$.

<details markdown="1">
<summary>Hint</summary>

Put the values in order first. The mode is the value that occurs most often.
</details>

<details markdown="1">
<summary>Next step</summary>

The values are already in order. For the median, there are six values, so take
the mean of the 3rd and 4th.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\text{mean} = \frac{2 + 3 + 3 + 5 + 7 + 10}{6} = \frac{30}{6} = 5.
$$

The median is $\dfrac{3 + 5}{2} = 4$. The mode is 3, because 3 occurs twice and
no other value does.
</details>

**2.** Find $Q_1$, $Q_3$ and the interquartile range of $2, 4, 5, 7, 9, 10, 12$
using the $(n + 1)$ positions.

<details markdown="1">
<summary>Hint</summary>

There are 7 values. Use position $\dfrac{n + 1}{4}$ for $Q_1$ and
$\dfrac{3(n + 1)}{4}$ for $Q_3$.
</details>

<details markdown="1">
<summary>Next step</summary>

The positions are $\dfrac{8}{4} = 2$ and $\dfrac{24}{4} = 6$, so both are whole
numbers. Read the 2nd and 6th values.
</details>

<details markdown="1">
<summary>Full working</summary>

The 2nd value is 4, so $Q_1 = 4$. The 6th value is 10, so $Q_3 = 10$. The
interquartile range is

$$
\text{IQR} = 10 - 4 = 6.
$$

The middle half of the data spans 6 units.
</details>

**3.** Find the variance and the standard deviation of $1, 3, 5, 7, 9$, dividing
by $n$.

<details markdown="1">
<summary>Hint</summary>

Find the mean first. Then square each deviation from the mean.
</details>

<details markdown="1">
<summary>Next step</summary>

The mean is 5. The squared deviations are $16, 4, 0, 4, 16$.
</details>

<details markdown="1">
<summary>Full working</summary>

The sum of the squared deviations is 40, so

$$
\text{variance} = \frac{40}{5} = 8,
\qquad
\sigma = \sqrt{8} = 2.83 \ (3 \text{ s.f.}).
$$

The standard deviation is about 2.83.
</details>

**4.** A data set has $n = 20$, $\sum x = 500$ and $\sum x^2 = 13000$. Find the
mean and the standard deviation, dividing by $n$.

<details markdown="1">
<summary>Hint</summary>

Use $\bar{x} = \dfrac{\sum x}{n}$ and
$\sigma = \sqrt{\dfrac{\sum x^2}{n} - \bar{x}^2}$.
</details>

<details markdown="1">
<summary>Next step</summary>

The mean is $\dfrac{500}{20} = 25$. Then work out
$\sqrt{\dfrac{13000}{20} - 25^2}$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\bar{x} = \frac{500}{20} = 25,
\qquad
\sigma = \sqrt{\frac{13000}{20} - 25^2} = \sqrt{650 - 625} = \sqrt{25} = 5.
$$

The mean is 25 and the standard deviation is 5.
</details>

**5.** Two runners have the same mean lap time of 60 seconds. Runner A has a
standard deviation of 2 seconds and runner B has a standard deviation of 8
seconds. Compare the runners.

<details markdown="1">
<summary>Hint</summary>

The means agree, so compare the spreads.
</details>

<details markdown="1">
<summary>Next step</summary>

Decide which runner has lap times closer to the mean.
</details>

<details markdown="1">
<summary>Full working</summary>

Both runners have the same mean lap time, so their typical laps agree. Runner A
has the smaller standard deviation, so A's lap times are more consistent and
cluster closer to 60 seconds. Runner B's laps vary more, with more very fast and
very slow laps.
</details>

**6.** Every value in a data set is multiplied by 3. Explain what happens to the
mean and the standard deviation.

<details markdown="1">
<summary>Hint</summary>

Test it on a small set, such as $1, 2, 3$.
</details>

<details markdown="1">
<summary>Next step</summary>

The set $1, 2, 3$ becomes $3, 6, 9$. Compare the means and the spreads of the
two sets.
</details>

<details markdown="1">
<summary>Full working</summary>

The original set $1, 2, 3$ has mean 2 and standard deviation
$\sqrt{\dfrac{2}{3}} \approx 0.82$. The new set $3, 6, 9$ has mean 6 and
standard deviation $\sqrt{6} \approx 2.45$. Multiplying every value by 3
multiplies the mean by 3 and the standard deviation by 3. The spread scales with
the data.
</details>
