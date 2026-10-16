---
title: 9.6 Critical evaluation of models — Practise with help
chapter: 9
chapter_title: The modelling project
section: '9.6'
section_title: Critical evaluation of models
tier: O
refs:
- S1
kind: guided-problems
---

# 9.6 Critical evaluation of models — Practise with help

## Warm-up: remember

1. A model's residuals grow steadily with time. What does that suggest about the
   model?
2. A model is tested between 0 and 10 minutes. Explain why using it at 60 minutes
   is a guess.

<details markdown="1">
<summary>Answers and feedback</summary>

1. A growing pattern suggests the model's rate is wrong, or that something is
   missing from the model. The error is not random.
2. The model was checked only where the data lies. At 60 minutes there is no
   measurement to compare with, so the model's value is an extrapolation.

</details>

## Practise with help

**1.** A battery model predicts the charge $c = 100 - 15t$ after $t$ hours.
Find the predicted charge after 8 hours.

<details markdown="1">
<summary>Hint</summary>

Substitute $t = 8$.

<details markdown="1">
<summary>Next step</summary>

$$c = 100 - 15 \times 8$$

<details markdown="1">
<summary>Full working</summary>

$$c = 100 - 120 = -20$$

The model predicts $-20$ percent, which is impossible: a charge cannot be
negative. The model was built for the range where the charge falls to zero, and
it fails beyond that range. This is a limit of the model, and it belongs in the
report.

</details>
</details>
</details>

**2.** Two models predict a temperature of 61 °C and 68 °C. The measurement is
65 °C. Find the error of each model, and say which is closer.

<details markdown="1">
<summary>Hint</summary>

The error is the size of the difference, with no sign.

<details markdown="1">
<summary>Next step</summary>

$$|61 - 65| = 4, \qquad |68 - 65| = 3$$

<details markdown="1">
<summary>Full working</summary>

The first model is 4 °C out and the second is 3 °C out, so the second model is
closer. Comparing the sizes of the errors is how two models are judged against
the same measurement.

</details>
</details>
</details>

**3.** A model of a queue assumes the arrival rate is steady. A concert finishes
and 200 people arrive at once. Explain what happens to the model's answer.

<details markdown="1">
<summary>Hint</summary>

The assumption no longer holds, so the model no longer describes the queue.

<details markdown="1">
<summary>Next step</summary>

The real queue is much longer than a steady rate predicts.

<details markdown="1">
<summary>Full working</summary>

The assumption of a steady arrival rate breaks when a crowd arrives at once. The
real queue is much longer than the model predicts, so the answer is too low. The
model is not wrong about a steady queue; the situation changed, and the model no
longer applies.

</details>
</details>
</details>

**4.** A model says a new till would cut the queue from 8 minutes to 4 minutes.
Explain why the model does not decide whether to buy the till.

<details markdown="1">
<summary>Hint</summary>

The decision needs more than the queue time.

<details markdown="1">
<summary>Next step</summary>

Think about the cost of the till and what else the money could do.

<details markdown="1">
<summary>Full working</summary>

The model gives the change in the queue time, which is one fact among several.
Whether to buy the till also depends on its cost, the space it needs and what
else the money could do. Those are values and judgement. The model informs the
decision; a person makes it.

</details>
</details>
</details>

**5.** A newspaper reports that a model predicts "exactly 12 345 cases next
month". Write two questions you would ask before trusting the number.

<details markdown="1">
<summary>Hint</summary>

Ask about the assumptions and the data.

<details markdown="1">
<summary>Next step</summary>

Ask what the model assumes, and where its data came from.

<details markdown="1">
<summary>Full working</summary>

Two useful questions are: "What does the model assume about how the cases
spread?" and "Where did the data come from, and how old is it?" A number given to
five figures for a month that has not happened claims a precision no model can
support, so a third question is: "Why is the number not given as a range?"

</details>
</details>
</details>

**6.** A model was tested between 0 and 10 minutes and predicts 5 units at
60 minutes. Explain why the report should not present that value as a
prediction.

<details markdown="1">
<summary>Hint</summary>

The measurement range is the model's range of trust.

<details markdown="1">
<summary>Next step</summary>

At 60 minutes there is no data to check the model against.

<details markdown="1">
<summary>Full working</summary>

The model was tested only where the data lies, between 0 and 10 minutes. At
60 minutes there is nothing to check it against, so the value is an
extrapolation. The report may state it as a guess, and must say that it lies
outside the range where the model was tested.

</details>
</details>
</details>

## A question from Chapter 8

**7.** A population model predicts $P = 500 \times 1.2^t$ animals after $t$
years. Find the predicted population after 3 years.

<details markdown="1">
<summary>Hint</summary>

Substitute $t = 3$ and work out the power.

<details markdown="1">
<summary>Next step</summary>

$$P = 500 \times 1.2^3$$

<details markdown="1">
<summary>Full working</summary>

$$P = 500 \times 1.728 = 864$$

The model predicts 864 animals after 3 years. It is an exponential model, so it
assumes the population keeps growing at 20% each year. That assumption breaks
when food or space runs short, and saying so is part of evaluating the model.

</details>
</details>
</details>
