---
title: 9.4 Iterating and improving — Practise with help
chapter: 9
chapter_title: The modelling project
section: '9.4'
section_title: Iterating and improving
tier: O
refs:
- S1
kind: guided-problems
---

# 9.4 Iterating and improving — Practise with help

## Warm-up: remember

1. A model's residuals are all negative and they grow with time. Is the model
   too high or too low?
2. State one assumption of the phone battery model from Section 9.2, and say
   what it leaves out.

<details markdown="1">
<summary>Answers and feedback</summary>

1. Negative residuals mean the measurements are below the predictions, so the
   model is too high. A growing pattern suggests the model's rate is too small.
2. The charge falls at a steady 15 percent each hour. It leaves out a battery
   that falls faster when it is running a heavy app.

</details>

## Practise with help

**1.** A battery falls from 100% to 70% in 2.5 hours, not 2 hours. Find the new
rate of fall, in percent each hour.

<details markdown="1">
<summary>Hint</summary>

The fall is still 30 percent. Divide by the new time.

<details markdown="1">
<summary>Next step</summary>

$$\frac{100 - 70}{2.5}$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{30}{2.5} = 12\ \text{percent each hour}$$

The rate falls from 15 to 12 percent each hour. One assumption changed, and the
new model can now be tested against the same measurements.

</details>
</details>
</details>

**2.** Using the rate of 12 percent each hour, find the new time for the charge
to fall from 100% to 0%, in hours.

<details markdown="1">
<summary>Hint</summary>

Divide the total fall by the new rate.

<details markdown="1">
<summary>Next step</summary>

$$\frac{100}{12}$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{100}{12} = \frac{25}{3} \approx 8.33\ \text{hours}$$

The prediction moves from about 6.67 hours to about 8.33 hours. The report gives
both, so the reader can see what the change did.

</details>
</details>
</details>

**3.** A model's total squared error falls from 30 to 12. Find the percentage
reduction.

<details markdown="1">
<summary>Hint</summary>

Find the fall, then divide it by the original error.

<details markdown="1">
<summary>Next step</summary>

$$30 - 12 = 18$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{30 - 12}{30} \times 100 = \frac{18}{30} \times 100 = 60\%$$

The error falls by 60%. A large fall from one change is good evidence that the
assumption you changed was the one that mattered.

</details>
</details>
</details>

**4.** The room temperature could be 20 °C or 22 °C. With 20 °C the model
predicts a time of 8.0 minutes, and with 22 °C it predicts 9.5 minutes. Find how
far the prediction moves.

<details markdown="1">
<summary>Hint</summary>

Subtract the smaller prediction from the larger one.

<details markdown="1">
<summary>Next step</summary>

$$9.5 - 8.0$$

<details markdown="1">
<summary>Full working</summary>

$$9.5 - 8.0 = 1.5\ \text{minutes}$$

A 2 °C uncertainty in the room temperature moves the prediction by 1.5 minutes.
If a second assumption moves it by only 0.2 minutes, then the room temperature
is the one the answer depends on most.

</details>
</details>
</details>

**5.** Repeating a measurement changes it by 2 °C. A change to the model moves
the prediction by 0.4 °C. Explain whether the change is worth keeping.

<details markdown="1">
<summary>Hint</summary>

Compare the size of the change with the variation in the measurements.

<details markdown="1">
<summary>Next step</summary>

The change is 0.4 °C and the measurement varies by 2 °C, so the change is much
smaller than the noise.

<details markdown="1">
<summary>Full working</summary>

The change is not worth keeping. The data cannot see a difference of 0.4 °C when
repeating the measurement moves the value by 2 °C. The model is good enough, and
the report should say that the remaining error is smaller than the variation in
the data.

</details>
</details>
</details>

**6.** A student adds one new number to the model for each measurement, until
the curve passes through every point. Explain why this does not improve the
model.

<details markdown="1">
<summary>Hint</summary>

A model with as many numbers as measurements has no freedom left to be wrong.

<details markdown="1">
<summary>Next step</summary>

A curve that passes through every point tells you nothing about a point you have
not measured.

<details markdown="1">
<summary>Full working</summary>

The model now has as many numbers as measurements, so it can fit the data
perfectly and still predict nothing. This is overfitting. The model has learned
the measurements rather than the situation, and it will be wrong for the next
measurement. A useful model has fewer numbers than measurements, so the data can
disagree with it.

</details>
</details>
</details>

## A question from Chapter 7

**7.** A mass on a spring has period $T = 2\pi\sqrt{\dfrac{m}{k}}$. The mass is
0.5 kg and the stiffness is 50 N/m. Find the period, leaving $\pi$ in your
answer.

<details markdown="1">
<summary>Hint</summary>

Substitute the values, then simplify the square root.

<details markdown="1">
<summary>Next step</summary>

$$T = 2\pi\sqrt{\frac{0.5}{50}} = 2\pi\sqrt{\frac{1}{100}}$$

<details markdown="1">
<summary>Full working</summary>

$$T = 2\pi \times \frac{1}{10} = \frac{\pi}{5} \approx 0.63\ \text{s}$$

The period is $\dfrac{\pi}{5}$ seconds, about 0.63 s. This is a model too: it
assumes the spring obeys Hooke's law and that the mass of the spring itself can
be left out.

</details>
</details>
</details>
