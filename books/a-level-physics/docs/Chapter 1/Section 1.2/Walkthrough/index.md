---
title: 1.2 Estimation and the limitations of measurement — Learn
chapter: 1
chapter_title: Working scientifically and measurements
section: '1.2'
section_title: Estimation and the limitations of measurement
refs:
- AP1
kind: walkthrough
---

# 1.2 Estimation and the limitations of measurement — Learn

**Prerequisites:** SI units and prefixes from Section 1.1; standard form;
multiplying and dividing numbers in standard form; finding a mean.

**By the end of this section you can:** estimate a quantity to the nearest order
of magnitude; decide whether an answer is reasonable; describe the resolution of
an instrument; and explain the difference between accuracy, precision,
systematic error and random error.

## 1. Estimation checks an answer

An **estimate** is a value found from rounded numbers, not from a careful
measurement. Estimation has two uses.

- It tells you what answer to expect before you calculate. A final value far
  from the estimate is a signal to check the working.
- It tells you whether a measurement is plausible. If a bathroom scale reports
  that a person has a mass of 6 kg, the reading is wrong, whatever the display
  says.

To estimate, round every quantity to one significant figure and work with those
numbers. The result is good to the nearest **order of magnitude**, which is the
nearest power of ten. A value quoted to one significant figure, such as
$2 \times 10^2$, could stand for a wide range of values. An order-of-magnitude
estimate cares only that the power of ten is right.

**Worked example 1.** A classroom is 10 m long, 6.0 m wide and 2.5 m high. The
density of air is $1.2\,\text{kg}\,\text{m}^{-3}$. Estimate the volume $V$ of the
room, and then the mass of air in it.

$$
\begin{aligned}
V &= 10 \times 6.0 \times 2.5 = 150\,\text{m}^3 \\
m &= \rho V = 1.2 \times 150 = 180\,\text{kg} \\
  &= 2 \times 10^2\,\text{kg} \quad (1\ \text{significant figure})
\end{aligned}
$$

The estimate is $2 \times 10^2\,\text{kg}$. The exact value depends on the
temperature and the pressure of the air, so one significant figure is all the
data support.

## 2. Every instrument has a resolution

The **resolution** of an instrument is the smallest change it can show. A metre
rule marked in millimetres has a resolution of 1 mm. A digital balance that
reads to the nearest 0.01 g has a resolution of 0.01 g.

A reading can never be more precise than the resolution. The true value may lie
anywhere within half a division of the mark, so the **reading uncertainty** is
half the smallest division.

| Instrument | Smallest division | Uncertainty in one reading |
|---|---|---|
| Metre rule | 1 mm | 0.5 mm |
| Vernier caliper | 0.1 mm | 0.05 mm |
| Micrometer | 0.01 mm | 0.005 mm |
| Stopwatch | 0.01 s | 0.005 s from the display alone |

**Worked example 2.** A stack of 100 sheets of paper is 12 mm thick. Find the
thickness of one sheet.

$$
\text{thickness} = \frac{12\,\text{mm}}{100} = 0.12\,\text{mm}
$$

One sheet is thinner than the smallest division of the rule, so a direct reading
of one sheet is impossible. Measuring 100 sheets divides the reading uncertainty
by 100, and the same measurement on 10 000 sheets would divide it by 10 000. This
is why a book of known page count measures paper better than a rule.

For a hand-held timing, the limit is usually the reaction time, about 0.2 s, not
the resolution of the display. That limit is still divided when you time many
oscillations and divide by the number of oscillations.

**Worked example 3.** A student can start and stop a stopwatch with an
uncertainty of about 0.2 s. The student times 20 oscillations of a pendulum and
divides by 20. Find the uncertainty in the period.

$$
\text{uncertainty in } T = \frac{0.2\,\text{s}}{20} = 0.010\,\text{s}
$$

## 3. Accuracy and precision

Two words describe the quality of a set of readings, and they are not the same.

- **Accuracy** is how close a reading is to the true value.
- **Precision** is how close repeated readings are to each other.

A set of readings can be precise and inaccurate at the same time. If every
reading is 0.20 mm too large, the readings agree with each other but all sit away
from the true value. A set of readings can also be accurate on average but
imprecise, when the readings scatter widely around the true value.

## 4. Systematic and random error

The difference between a reading and the true value is an **error**. Errors come
in two kinds.

- A **random error** changes the reading in an unpredictable way. Judging the
  centre of a swing and pressing a stopwatch are random errors. Repeating the
  measurement and taking the mean reduces a random error.
- A **systematic error** shifts every reading in the same direction. A balance
  that reads 0.05 g with an empty pan, a thermometer with a calibration error,
  and a ruler with a worn end all give systematic errors. Repeating the
  measurement does not reduce a systematic error, because every reading carries
  the same shift. The error must be found and corrected, for example by zeroing
  the balance or checking the thermometer at a known fixed point.

**Worked example 4.** Classify each error and say how to reduce it.

| Error | Kind | How to reduce it |
|---|---|---|
| A balance reads 0.05 g when empty | Systematic | Zero the balance before use |
| Reaction time on a stopwatch | Random | Repeat the timing and take the mean |
| A thermometer reads 0.5 °C too high | Systematic | Check it at a known fixed point and correct |

> **Watch out.** A small resolution does not make a result accurate. A digital
> balance that reads to 0.01 g can still be 0.05 g wrong if it is not zeroed, and
> the display will look precise while every reading is shifted. Check by asking
> whether the *same* mistake could affect each reading.

## 5. The limits of a measurement

Three limits appear in every experiment.

1. **The resolution of the instrument.** A measurement cannot be finer than the
   instrument allows.
2. **The scatter of repeated readings.** Random errors spread the readings, and
   the spread is itself a measurement you can report.
3. **A systematic error that the method hides.** No number of repeats will
   remove it, and the readings will look precise while being wrong.

Repeating a measurement is the main tool against the second limit. Choosing a
better instrument is the main tool against the first.

## 6. Try it: which error does repeating remove?

Eight repeated readings of one length are plotted below. The mean is the result
that is quoted, and the uncertainty shown covers the range the readings span.

**Predict first.** Do not move either slider yet. Write down your answers.

1. If you increase the zero error, does the stated range get wider, narrower or
   stay the same width?
2. Does the zero error move the mean?
3. If the readings sit close together but all to one side of the true value, are
   they accurate?

**Test.** Move the zero-error slider first, then the spread slider. Watch the
group of readings, the stated range and the true length.

:::figure repeated-readings

**Explain.** Why does repeating a reading and taking the mean reduce a random
error but not a systematic error? Write two or three sentences. Use the idea
that a random error shifts each reading by a different amount, and a systematic
error shifts every reading by the same amount.

## Progress check

Return to the chapter problem. Before measuring, estimate the period of the
0.800 m pendulum. A 1.0 m pendulum has a period of about 2.0 s, and the period is
proportional to the square root of the length.

1. Is the period of the 0.800 m pendulum greater or less than 2.0 s?
2. Estimate the period, then estimate the time for 20 oscillations.
3. Compare your estimate with the recorded 35.90 s.

If question 2 goes wrong, remember that $\sqrt{0.800} = 0.894$. Multiply the
2.0 s period of the 1.0 m pendulum by 0.894.

## You should now be able to

- estimate a quantity to the nearest order of magnitude;
- state the resolution and the reading uncertainty of an instrument;
- explain why repeating a measurement, or measuring many at once, reduces the
  effect of the resolution;
- tell accuracy from precision;
- tell a systematic error from a random error, and say how to reduce each.
