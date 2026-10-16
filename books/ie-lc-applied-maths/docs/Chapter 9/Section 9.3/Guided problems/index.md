---
title: 9.3 Testing the model against data — Practise with help
chapter: 9
chapter_title: The modelling project
section: '9.3'
section_title: Testing the model against data
tier: O
refs:
- S1
kind: guided-problems
---

# 9.3 Testing the model against data — Practise with help

## Warm-up: remember

1. A model predicts a wait of 4 minutes and the measurement is 6 minutes. Is the
   model too high or too low?
2. Write the rule for the residual of one measurement.

<details markdown="1">
<summary>Answers and feedback</summary>

1. The model is too low, because 4 is less than the measured 6.
2. The residual is measured minus predicted. A positive residual means the
   model is too low, and a negative residual means the model is too high.

</details>

## Practise with help

**1.** A model predicts a temperature of 62 °C and the measurement is 65 °C.
Find the residual.

<details markdown="1">
<summary>Hint</summary>

Subtract the prediction from the measurement.

<details markdown="1">
<summary>Next step</summary>

$$65 - 62$$

<details markdown="1">
<summary>Full working</summary>

$$65 - 62 = 3$$

The residual is $+3$ °C. The sign is positive, so the measurement is larger than
the prediction and the model is too low at this point.

</details>
</details>
</details>

**2.** Four residuals are $+3$, $-1$, $+2$ and $-4$. Find the mean residual.

<details markdown="1">
<summary>Hint</summary>

Add the four numbers, keeping the signs, then divide by four.

<details markdown="1">
<summary>Next step</summary>

$$3 - 1 + 2 - 4$$

<details markdown="1">
<summary>Full working</summary>

$$3 - 1 + 2 - 4 = 0, \qquad \frac{0}{4} = 0$$

The mean residual is zero. A mean of zero is a good sign, because the model is
not systematically too high or too low. It does not prove the model is right,
because the individual residuals are not zero.

</details>
</details>
</details>

**3.** The same four residuals are $+3$, $-1$, $+2$ and $-4$. Find the total
squared error.

<details markdown="1">
<summary>Hint</summary>

Square each residual, then add the four squares.

<details markdown="1">
<summary>Next step</summary>

$$3^2 + (-1)^2 + 2^2 + (-4)^2$$

<details markdown="1">
<summary>Full working</summary>

$$9 + 1 + 4 + 16 = 30$$

The total squared error is 30. Squaring removes the sign, so a residual of
$-4$ counts as much as one of $+4$.

</details>
</details>
</details>

**4.** A model predicts 50 °C and the measurement is 55 °C. Find the percentage
error, using the measurement as the base.

<details markdown="1">
<summary>Hint</summary>

Divide the residual by the measured value, then multiply by 100.

<details markdown="1">
<summary>Next step</summary>

$$\frac{55 - 50}{55} \times 100$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{5}{55} \times 100 = \frac{100}{11} \approx 9.09\%$$

The percentage error is about 9.1%. A percentage error has no unit, which makes
it useful for comparing the fit of models measured in different units.

</details>
</details>
</details>

**5.** Three readings of the same temperature are 62 °C, 65 °C and 63 °C. Find
their mean, correct to 3 significant figures.

<details markdown="1">
<summary>Hint</summary>

Add the three readings and divide by three. Round once, at the end.

<details markdown="1">
<summary>Next step</summary>

$$\frac{62 + 65 + 63}{3} = \frac{190}{3}$$

<details markdown="1">
<summary>Full working</summary>

$$\frac{190}{3} = 63.333\ldots \approx 63.3\ \text{°C}$$

The mean is 63.3 °C to 3 significant figures. Reporting 63.333 would claim more
precision than the readings have, because they were measured to the nearest
degree.

</details>
</details>
</details>

**6.** A student tests a model against one measurement and reports that the
model works. Explain why one measurement cannot test a model.

<details markdown="1">
<summary>Hint</summary>

Think about what a single point can and cannot show about a pattern.

<details markdown="1">
<summary>Next step</summary>

One point can be matched by many different models, because you can always
adjust a number to pass through it.

<details markdown="1">
<summary>Full working</summary>

One measurement can be matched by adjusting one number in the model, so it
cannot tell you whether the model works anywhere else. A model is a claim about
a pattern, and a pattern needs several points, spread across the range, before
it can be checked.

</details>
</details>
</details>

## A question from Chapter 8

**7.** A population model predicts 1200 animals after 5 years, and a survey
counts 1140. Find the residual, and say whether the model is too high or too
low.

<details markdown="1">
<summary>Hint</summary>

Residual is measured minus predicted.

<details markdown="1">
<summary>Next step</summary>

$$1140 - 1200$$

<details markdown="1">
<summary>Full working</summary>

$$1140 - 1200 = -60$$

The residual is $-60$ animals. The negative sign means the measurement is
smaller than the prediction, so the model is too high. In a changing-world
model, that often means the growth rate was set too large.

</details>
</details>
</details>
