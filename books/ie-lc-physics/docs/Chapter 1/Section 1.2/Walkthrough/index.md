---
title: 1.2 Measuring, accuracy and uncertainty — Learn
chapter: 1
chapter_title: Measuring, modelling and investigating
section: '1.2'
section_title: Measuring, accuracy and uncertainty
tier: O
refs:
- '1.1'
kind: walkthrough
---

# 1.2 Measuring, accuracy and uncertainty — Learn

**Prerequisites:** physical quantities, units and significant figures from Section 1.1.

**Objectives:** choose a suitable instrument; state the reading uncertainty of a
single measurement; calculate absolute and percentage uncertainty; combine
uncertainties for sums and for products; find the uncertainty in a mean; tell random
from systematic error, and precision from accuracy.

By the end of this section, you can put a range on a measurement and say how much the
range matters.

## Every measurement has a range

No measurement is exact. A metre stick marked in millimetres cannot tell you the
length to a millionth of a metre. A stopwatch started by hand cannot tell you the time
to a thousandth of a second. The honest way to report a measurement is as a value with
an **uncertainty**:

$$\text{length} = 0.250\,\text{m} \pm 0.001\,\text{m}$$

The $\pm$ part is the **absolute uncertainty**. It says how far the true value could
reasonably lie from your reading.

## The reading uncertainty

An instrument's **smallest division** is the gap between two marks on its scale. For
an analogue scale, we take the reading uncertainty of a single reading to be **half
the smallest division**.

A metre stick marked in millimetres has a smallest division of 1 mm, so the reading
uncertainty is $\pm 0.5\,\text{mm} = \pm 0.0005\,\text{m}$.

A digital instrument usually reads to the last digit on its display. Its reading
uncertainty is $\pm 1$ in that last digit.

## Absolute and percentage uncertainty

The **percentage uncertainty** compares the uncertainty with the reading itself.

$$\text{percentage uncertainty} = \frac{\text{absolute uncertainty}}{\text{reading}} \times 100\%$$

**Example 1.** An extension is measured as 0.040 m, with a reading uncertainty of
$\pm 0.001$ m. Calculate the percentage uncertainty.

$$\text{percentage uncertainty} = \frac{0.001}{0.040} \times 100\% = 2.5\%$$

> **Watch out.** The same $\pm 0.001$ m matters much more on a small reading. On an
> extension of 0.010 m it is 10%; on 0.100 m it is 1%. That is why a method asks you
> to make the readings as large as the apparatus allows. A tiny reading carries a
> huge percentage uncertainty even when the instrument is good.

## Combining uncertainties

When a result is calculated from several measurements, each uncertainty passes into
the result. The rule depends on the arithmetic.

- **Adding or subtracting** the measurements: add the **absolute** uncertainties.
- **Multiplying or dividing** the measurements: add the **percentage** uncertainties.
- **Raising to a power**: multiply the percentage uncertainty by the power.

**Example 2.** Two lengths are added: 0.120 m $\pm$ 0.001 m and 0.080 m $\pm$ 0.001 m.
Find the total and its uncertainty.

$$0.120 + 0.080 = 0.200\,\text{m} \qquad 0.001 + 0.001 = 0.002\,\text{m}$$

The total is $0.200\,\text{m} \pm 0.002\,\text{m}$.

**Example 3.** A force of 12.0 N $\pm$ 3% moves an object 0.50 m $\pm$ 2%. Calculate
the work and its uncertainty.

$$W = Fd = 12.0 \times 0.50 = 6.0\,\text{J}$$

The percentage uncertainties add: $3\% + 2\% = 5\%$. That is $0.30$ J of $6.0$ J, so

$$W = 6.0\,\text{J} \pm 0.30\,\text{J}$$

## The uncertainty in a mean

Repeating a measurement and taking the mean reduces the effect of random error. The
spread of the repeats gives the uncertainty.

The simplest rule is **half the range**: subtract the smallest reading from the
largest, then halve the answer.

**Example 4.** A ball is timed four times: 0.46 s, 0.44 s, 0.48 s and 0.46 s. Find the
mean and its uncertainty.

$$\text{mean} = \frac{0.46 + 0.44 + 0.48 + 0.46}{4} = 0.46\,\text{s}$$

$$\text{range} = 0.48 - 0.44 = 0.04\,\text{s} \qquad \text{uncertainty} = \frac{0.04}{2} = 0.02\,\text{s}$$

The result is $0.46\,\text{s} \pm 0.02\,\text{s}$.

## Accuracy, precision, random and systematic

Two words describe different things about a set of readings.

- **Precise** readings sit close together. They agree with one another.
- **Accurate** readings are close to the true value.

Readings can be precise and not accurate. That pattern is the signature of a
**systematic error**, which pushes every reading the same way. A **random error**
scatters the readings above and below the true value, so a mean reduces it.

> **Watch out.** A systematic error does not average out. Repeating a measurement
> forty times will not remove a zero error or a stopwatch started late. Look for the
> cause and correct it, rather than taking more readings of the same wrong number.

## Progress check

Back to the chapter problem. You are timing a ball as it falls about 1 m.

Write down two sources of uncertainty in your timing, and say whether each is random
or systematic. Then estimate the percentage uncertainty in a fall time of 0.45 s if
your reaction time is about 0.20 s. Keep the answer: it decides how much of any
difference between your measurement and the model is your fault.

## You should now be able to

- state the reading uncertainty of an analogue or digital instrument;
- convert an absolute uncertainty into a percentage uncertainty;
- combine absolute uncertainties for sums, and percentage uncertainties for products;
- find the mean of repeats and its uncertainty as half the range;
- tell precise from accurate, and random from systematic error;
- say why a systematic error does not average out.
