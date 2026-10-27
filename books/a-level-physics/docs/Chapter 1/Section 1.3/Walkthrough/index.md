---
title: 1.3 Measurements and uncertainties — Learn
chapter: 1
chapter_title: Working scientifically and measurements
section: '1.3'
section_title: Measurements and uncertainties
refs:
- AP1
kind: walkthrough
---

# 1.3 Measurements and uncertainties — Learn

**Prerequisites:** SI units and prefixes from Section 1.1; resolution, accuracy
and error from Section 1.2; rearranging a formula; calculating a percentage.

**By the end of this section you can:** state the uncertainty in a reading and in
a mean; convert between absolute and percentage uncertainty; combine
uncertainties through a sum, a product, a quotient and a power; quote a result
with its uncertainty; and decide whether a result agrees with an accepted value.

## 1. The uncertainty in a reading

A measurement is not a single number. It is a **value** with an
**uncertainty**: a statement of the range in which the true value is expected to
lie. A length written as $0.800 \pm 0.001\,\text{m}$ means that the true length
is believed to lie between 0.799 m and 0.801 m.

The uncertainty in a single reading is **half the smallest division** of the
instrument. A metre rule marked in millimetres gives a reading uncertainty of
0.5 mm.

When a quantity is found from two readings, the two reading uncertainties add.
The reading uncertainty is an **absolute uncertainty**, because it carries the
same unit as the quantity.

## 2. Repeated readings: the mean and the half-range

A measurement is usually repeated. The **mean** of the readings is the best
estimate of the true value.

The uncertainty is found from the spread of the readings. The **range** is the
largest reading minus the smallest reading, and the uncertainty is **half the
range**. This is called the half-range convention.

**Worked example 1.** The time for 20 oscillations is measured three times:
$35.90\,\text{s}$, $35.85\,\text{s}$ and $35.95\,\text{s}$. Find the mean and the
uncertainty.

$$
\begin{aligned}
\text{mean} &= \frac{35.90 + 35.85 + 35.95}{3} = 35.90\,\text{s} \\
\text{range} &= 35.95 - 35.85 = 0.10\,\text{s} \\
\text{uncertainty} &= \frac{0.10}{2} = 0.05\,\text{s}
\end{aligned}
$$

The time for 20 oscillations is $35.90 \pm 0.05\,\text{s}$.

**Worked example 2.** The pendulum length is found from two metre-rule readings:
$0.000\,\text{m}$ at the pivot and $0.800\,\text{m}$ at the centre of the bob.
Each reading has an uncertainty of 0.0005 m. Find the length $L$ and its
uncertainty $\Delta L$.

$$
\begin{aligned}
L &= 0.800 - 0.000 = 0.800\,\text{m} \\
\Delta L &= 0.0005 + 0.0005 = 0.001\,\text{m}
\end{aligned}
$$

The length is $0.800 \pm 0.001\,\text{m}$. A difference adds the absolute
uncertainties, exactly as a sum does.

## 3. Percentage uncertainty

An absolute uncertainty is hard to judge on its own. An uncertainty of 1 mm is
tiny on a pendulum and enormous on a wire. The **percentage uncertainty** puts
the uncertainty in proportion:

$$ \text{percentage uncertainty} = \frac{\text{absolute uncertainty}}{\text{value}} \times 100\% $$

**Worked example 3.** Find the percentage uncertainty in the time for 20
oscillations, $35.90 \pm 0.05\,\text{s}$.

$$ \text{percentage uncertainty} = \frac{0.05}{35.90} \times 100\% = 0.14\% $$

The pendulum period is $T = \dfrac{35.90}{20} = 1.795\,\text{s}$. Dividing by 20
divides the uncertainty by 20 as well, so $T = 1.795 \pm 0.0025\,\text{s}$. The
percentage uncertainty is unchanged, 0.14%. The percentage uncertainty in the
length is

$$ \frac{0.001}{0.800} \times 100\% = 0.125\% $$

## 4. Combining uncertainties

The rule depends on the arithmetic.

- **Adding or subtracting quantities:** add the absolute uncertainties. For
  masses of $52.4 \pm 0.1\,\text{g}$ and $128.7 \pm 0.1\,\text{g}$, a mass
  difference carries $0.1 + 0.1 = 0.2\,\text{g}$.
- **Multiplying or dividing quantities:** add the percentage uncertainties.
- **Raising a quantity to a power:** multiply the percentage uncertainty by the
  power.

**Worked example 4.** The acceleration due to gravity is found from

$$ g = \frac{4\pi^2 L}{T^2} $$

The length has a percentage uncertainty of 0.125% and the period has a
percentage uncertainty of 0.139%. Find the percentage uncertainty in $g$.

$$
\begin{aligned}
\text{percentage uncertainty in } T^2 &= 2 \times 0.139\% = 0.278\% \\
\text{percentage uncertainty in } g &= 0.125\% + 0.278\% \\
                                     &= 0.40\% \quad (2\ \text{s.f.})
\end{aligned}
$$

The constant $4\pi^2$ carries no uncertainty, so it adds nothing.

The value of $g$ is

$$ g = \frac{4\pi^2 \times 0.800}{1.795^2} = 9.802\,\text{m}\,\text{s}^{-2} $$

so the absolute uncertainty is $9.802 \times \dfrac{0.40}{100} = 0.04\,\text{m}\,\text{s}^{-2}$.

## 5. Quoting a result

The uncertainty is quoted to one significant figure. The value is quoted to the
same decimal place as the uncertainty. For the pendulum,

$$ g = 9.80 \pm 0.04\,\text{m}\,\text{s}^{-2} $$

The three figures in 9.80 matter, because the uncertainty is in the second
decimal place. Writing $g = 9.8021 \pm 0.04\,\text{m}\,\text{s}^{-2}$ would
overstate the precision of the measurement.

To decide whether a result agrees with an accepted value, compare the range with
the accepted value. Here the measured range is 9.76 to 9.84, and the accepted
value 9.81 lies inside it. The measurement agrees within its uncertainty.

> **Watch out.** A small percentage uncertainty does not prove an accurate
> result. A systematic error shifts every reading the same way, so the readings
> can be tightly grouped and still be wrong. The pendulum length, for example,
> is measured to the centre of the bob. A consistent mistake there would not show
> up in the uncertainty at all, but it would move $g$ away from 9.81 m s⁻².
> Re-check by asking what could be wrong in the *same way* every time.

### The conventions this book uses

- A single reading: uncertainty $=$ half the smallest division.
- A quantity from two readings: the absolute uncertainties add.
- Repeated readings: mean, and uncertainty $=$ half the range.
- Multiply or divide: add percentage uncertainties. A power multiplies the
  percentage uncertainty.
- Quote the uncertainty to one significant figure, and the value to the same
  decimal place.

The awarding bodies explain these rules in slightly different words, so always
state the rule you have used.

## 6. Try it: how many oscillations?

The uncertainty in a hand-timed measurement comes mostly from reaction time,
about 0.2 s. Timing many oscillations and dividing by the number shares that
uncertainty over more oscillations.

**Predict first.** Do not move the slider yet. Write down your answers.

1. If you time 50 oscillations instead of 1, what happens to the percentage
   uncertainty in the period?
2. If you time 50 oscillations instead of 20, does the period itself change?
3. The period is squared in the equation for $g$. What does that do to the
   percentage uncertainty in $g$?

**Test.** Set the slider to 1, then to 20, then to 50. Watch the percentage
uncertainty in the period and in $g$.

:::figure timing-uncertainty

**Explain.** Why does timing more oscillations reduce the percentage uncertainty
in the period, but not change the period? Write two or three sentences. Use the
idea that the uncertainty of 0.2 s is in the *total* time, and that the period is
the total time divided by the number of oscillations.

## Progress check

Return to the chapter problem.

1. The time for 20 oscillations is $35.90 \pm 0.05\,\text{s}$. Find the period
   $T$ and its absolute uncertainty.
2. Use $g = \dfrac{4\pi^2 L}{T^2}$ with $L = 0.800 \pm 0.001\,\text{m}$ to find
   $g$ and its percentage uncertainty.
3. Quote $g$ with its absolute uncertainty, and decide whether it agrees with
   $9.81\,\text{m}\,\text{s}^{-2}$.

If question 1 goes wrong, remember that dividing the time by 20 divides its
uncertainty by 20 as well. If question 2 goes wrong, find the percentage
uncertainty in the length and in the period first, then double the second one.

## You should now be able to

- state the reading uncertainty from the smallest division of an instrument;
- find the mean and the half-range uncertainty of repeated readings;
- convert an absolute uncertainty into a percentage, and back again;
- combine uncertainties through a sum, a difference, a product, a quotient and a
  power;
- quote a result with its uncertainty to the right number of significant
  figures;
- decide whether a measurement agrees with an accepted value, and explain why a
  small uncertainty does not prove accuracy.
