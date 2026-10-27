---
title: 1.3 Measurements and uncertainties — Practise with help
chapter: 1
chapter_title: Working scientifically and measurements
section: '1.3'
section_title: Measurements and uncertainties
refs:
- AP1
kind: guided-problems
---

# 1.3 Measurements and uncertainties — Practise with help

Work each problem first. Open a hint only if you are stuck, and the full working
only to check. State the uncertainty rule you use at each step.

## Warm-up: remember

1. Write $0.800\,\text{mm}$ in metres.
2. Find the mean of $12.4$, $12.6$ and $12.5$.
3. Work out the percentage $\dfrac{0.2}{8.0} \times 100\%$.

<details markdown="1">
<summary>Answers</summary>

1. $8.00 \times 10^{-4}\,\text{m}$.
2. $12.5$.
3. $2.5\%$.

If question 1 goes wrong, use the prefix table in Section 1.1: milli means
$10^{-3}$. If question 2 goes wrong, add the three values and divide by 3. If
question 3 goes wrong, divide first and then multiply by 100.
</details>

:::figure warm-up-gate


## Practise with help

**1.** A student measures the diameter of a wire four times and records
$0.542\,\text{mm}$, $0.540\,\text{mm}$, $0.544\,\text{mm}$ and
$0.538\,\text{mm}$. Find the mean and the uncertainty using the half-range
convention.

<details markdown="1">
<summary>Hint</summary>

Find the range first: the largest reading minus the smallest reading.
</details>

<details markdown="1">
<summary>Next step</summary>

The range is $0.544 - 0.538 = 0.006\,\text{mm}$. The uncertainty is half of that.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
\text{mean} &= \frac{0.542 + 0.540 + 0.544 + 0.538}{4} = 0.541\,\text{mm} \\
\text{uncertainty} &= \frac{0.006}{2} = 0.003\,\text{mm}
\end{aligned}
$$

The diameter is $0.541 \pm 0.003\,\text{mm}$.
</details>

**2.** A single length $L$ is read from a metre rule as $0.542\,\text{m}$. The
rule has a smallest division of 1 mm. Find the absolute uncertainty $\Delta L$
and the percentage uncertainty in the length.

<details markdown="1">
<summary>Hint</summary>

Start with the reading uncertainty of one reading, not the half-range of repeats.
</details>

<details markdown="1">
<summary>Next step</summary>

The absolute uncertainty is half the smallest division, $0.0005\,\text{m}$. Now
divide that by the value and multiply by 100.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
\Delta L &= 0.0005\,\text{m} \\
\text{percentage uncertainty} &= \frac{0.0005}{0.542} \times 100\% \\
                              &= 0.09\% \quad (2\ \text{s.f.})
\end{aligned}
$$

The length is $0.542 \pm 0.0005\,\text{m}$, and the percentage uncertainty is
0.09%.
</details>

**3.** A cylinder has radius $r = 1.25 \pm 0.05\,\text{cm}$ and height
$h = 8.00 \pm 0.05\,\text{cm}$. Find the volume and the percentage uncertainty
in the volume.

<details markdown="1">
<summary>Hint</summary>

The volume is $V = \pi r^2 h$. The radius is squared, so its percentage
uncertainty is multiplied by 2.
</details>

<details markdown="1">
<summary>Next step</summary>

Find the percentage uncertainty in $r$ and in $h$, double the radius value, then
add the two.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
\%r &= \frac{0.05}{1.25} \times 100\% = 4.0\% \\
\%r^2 &= 2 \times 4.0\% = 8.0\% \\
\%h &= \frac{0.05}{8.00} \times 100\% = 0.63\% \\
\%V &= 8.0\% + 0.63\% = 8.6\%
\end{aligned}
$$

The volume is

$$ V = \pi \times 1.25^2 \times 8.00 = 39.3\,\text{cm}^3 $$

and its absolute uncertainty is $39.3 \times 0.086 = 3.4\,\text{cm}^3$. The
volume is $39 \pm 3\,\text{cm}^3$ to one significant figure in the uncertainty.
</details>

**4.** Two lengths of a rod are measured as $12.4 \pm 0.1\,\text{cm}$ and
$8.6 \pm 0.1\,\text{cm}$. Find the total length $L$ and its absolute uncertainty
$\Delta L$.

<details markdown="1">
<summary>Hint</summary>

The two lengths are added, so their uncertainties are added too.
</details>

<details markdown="1">
<summary>Next step</summary>

Write the total as $12.4 + 8.6$ and the uncertainty as $0.1 + 0.1$.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
L &= 12.4 + 8.6 = 21.0\,\text{cm} \\
\Delta L &= 0.1 + 0.1 = 0.2\,\text{cm}
\end{aligned}
$$

The total length is $21.0 \pm 0.2\,\text{cm}$. Adding absolute uncertainties is
the rule for a sum and for a difference.
</details>

**5.** A timer gives a time $t = 4.567\,\text{s}$ with an uncertainty of
$0.1\,\text{s}$. Write the result in the correct form.

<details markdown="1">
<summary>Hint</summary>

The uncertainty is 0.1 s, which is in the first decimal place. The value must be
quoted to the same decimal place.
</details>

<details markdown="1">
<summary>Next step</summary>

Round $4.567$ to one decimal place and keep the uncertainty at 0.1 s.
</details>

<details markdown="1">
<summary>Full working</summary>

$$ t = 4.6 \pm 0.1\,\text{s} $$

Quoting $4.567\,\text{s}$ would suggest that the timer knows the value to the
third decimal place, which the uncertainty of 0.1 s does not support.
</details>

**6.** A student wants the percentage uncertainty in $g$, the acceleration due
to gravity, to be below 0.5% when using a pendulum. The timing uncertainty for
one measurement is about 0.2 s. Decide how many oscillations the student should
time. Use the period $T = 1.795\,\text{s}$.

<details markdown="1">
<summary>Hint</summary>

Write the percentage uncertainty in $g$ in terms of the number of oscillations
$N$, then make it less than 0.5.
</details>

<details markdown="1">
<summary>Next step</summary>

The percentage uncertainty in $T$ is $\dfrac{0.2}{1.795N} \times 100$. Doubling
it gives the percentage uncertainty in $g$. Set the result below 0.5.
</details>

<details markdown="1">
<summary>Full working</summary>

$$
\begin{aligned}
\%g &= 2 \times \frac{0.2}{1.795N} \times 100 \\
    &= \frac{40}{1.795N} \\
\frac{40}{1.795N} &< 0.5 \\
N &> \frac{40}{1.795 \times 0.5} \\
N &> 44.6
\end{aligned}
$$

The student should time at least 45 oscillations. Timing 20 gives about 0.56%
from the reaction time alone, a little above the target. Repeating the timing
also helps, because the half-range of several repeats is usually smaller than
the reaction-time estimate for a single timing.
</details>
