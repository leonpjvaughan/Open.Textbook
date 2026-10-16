---
title: 9.3 Testing the model against data — Learn
chapter: 9
chapter_title: The modelling project
section: '9.3'
section_title: Testing the model against data
tier: O
refs:
- S1
kind: walkthrough
---

# 9.3 Testing the model against data — Learn

**Prerequisites:** Section 9.2, a model with letters, units and assumptions.

**Objectives:** collect data that can test a model; compare a prediction with a
measurement; read the sign and the size of a residual; use the total squared
error to compare two versions of a model.

A model is not tested by repeating it. It is tested by measuring the real
situation, putting the measurements beside the model's predictions, and looking
at the differences. This section shows how to do that honestly.

## Collecting data that can test the model

A handful of measurements can test a model, if they are chosen well. Aim for at
least five, spread across the range the model covers.

- **Record the unit** beside every measurement, and the instrument you used.
- **Spread the points** across the range, rather than clustering them at one
  end.
- **Repeat a reading** where you can, so you know how much the measurement
  varies on its own.
- **Write the measurements down as you take them**, not afterwards.

The last point matters. A measurement written down from memory is a measurement
you cannot check.

## A table of predictions and measurements

Put the model's prediction beside each measurement. Then subtract.

$$\text{residual} = \text{measured} - \text{predicted}$$

The **residual** is the gap between what happened and what the model said. Its
sign and its size both carry information.

- A **positive residual** means the measurement is larger than the prediction,
  so the model is too low.
- A **negative residual** means the measurement is smaller, so the model is too
  high.
- A residual of zero means the model matched that measurement exactly.

Here is the cooling tea from Section 9.2. The measurements were taken each
2 minutes.

| Time / min | Measured / °C |
|---|---|
| 0 | 90 |
| 2 | 75 |
| 4 | 63 |
| 6 | 54 |
| 8 | 47 |
| 10 | 41 |

The model is $T = T_r + (T_0 - T_r)e^{-kt}$ with $T_r = 20$ and $T_0 = 90$. The
one number left to choose is the cooling rate $k$.

## Reading the residuals

Suppose you try $k = 0.10$ each minute. At 2 minutes the model gives about
$77.3$ °C, and the measurement is $75$ °C, so the residual is
$75 - 77.3 = -2.3$ °C. The model is too high.

At 10 minutes the model gives about $45.8$ °C and the measurement is $41$ °C, so
the residual is about $-4.8$ °C. Every residual is negative, and they grow with
time. That pattern is a message: the tea is cooling faster than $k = 0.10$
allows.

A single number summarises the whole table. Square each residual and add them
up. The result is the **total squared error**.

$$\text{total squared error} = \sum (\text{measured} - \text{predicted})^2$$

Squaring removes the sign, so a model that is too high and one that is too low
are treated the same way. The smaller the total, the better the model fits the
data.

## A guided investigation: which cooling rate fits?

:::figure model-fit

**Predict.** The measurements are in the table above. Choose the cooling rate
$k$ that you think fits them best, and write your choice down before you touch
the slider.

**Test.** Move the cooling rate slider. Watch the model curve move against the
measured points, and watch the total squared error in the readout. Find the
value of $k$ that makes the error as small as you can.

**Explain.** Write two sentences. Say which value of $k$ fits best, and say what
the residuals look like at that value: are they mostly positive, mostly
negative, or spread around zero?

## What a good fit does not prove

A small total squared error means the model fits the data you collected. It does
not mean the model is true. A model can fit six points well and still be wrong
for a seventh, or wrong outside the range you measured.

The test is still worth doing, because a model that fails it is certainly wrong.
A model that passes has earned the right to be used a little further, and no
more.

> **Watch out.** Three errors appear again and again in project reports.
>
> The first is testing against one point. One point can always be matched by
> adjusting the model, and it tells you nothing about the pattern.
>
> The second is fitting by eye and declaring success. A curve that looks close on
> a graph may be far out when you subtract the numbers, so write the residuals
> down.
>
> The third is ignoring the pattern of the residuals. Random residuals that
> scatter around zero suggest the model is capturing the behaviour. Residuals
> that all have the same sign, or that grow steadily, show that something in the
> situation is missing from the model.

## Progress check

Back to the chapter problem, **your own model**. Test your model now.

1. Collect at least five measurements, spread across the range, and record the
   unit and the instrument.
2. Put each measurement beside the model's prediction in a table.
3. Work out the residual for each row, and mark its sign.
4. Add the squared residuals to get the total squared error.
5. Write one sentence that says whether the residuals are spread around zero or
   show a pattern.

Keep the table. Section 9.4 uses the pattern in the residuals to decide which
assumption to change.

## You should now be able to

- collect at least five measurements that can test a model;
- put a prediction beside each measurement and work out the residual;
- read the sign of a residual and say whether the model is too high or too low;
- use the total squared error to compare two versions of a model;
- explain why a good fit does not prove that a model is true.
