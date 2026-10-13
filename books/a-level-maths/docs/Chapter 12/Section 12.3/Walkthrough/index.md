---
title: 12.3 Modelling with probability and critiquing assumptions — Learn
chapter: 12
chapter_title: Probability
section: '12.3'
section_title: Modelling with probability and critiquing assumptions
refs:
- M3
- OT3
kind: walkthrough
---

# 12.3 Modelling with probability and critiquing assumptions — Learn

**Prerequisites:** the addition and multiplication rules from Section 12.1 and
conditional probability from Section 12.2.

**By the end of this section you can:** build a probability model from a real
situation; state the assumptions the model makes; work out expected counts from
a model; compare a model with observed data; criticise an assumption and
describe the effect on the answer; and refine a model and say how the answer
moves.

## 1. What a probability model is

A **probability model** is a mathematical description of a real situation. It
lists the possible outcomes and gives each one a probability.

A probability is rarely measured directly. It is built from assumptions. A model
is useful when the assumptions are clear, because a reader can then judge
whether to trust the answer.

The **modelling cycle** has four stages.

1. **Translate** the situation into a model, and write down the assumptions.
2. **Use** the model to calculate a probability or an expected count.
3. **Interpret** the answer and return it to the real situation.
4. **Refine** the model when an assumption fails, and compare the new answer.

The fourth stage is the one that separates a careful answer from a careless one.

## 2. Assumptions in a probability model

Three assumptions appear again and again.

**Equally likely outcomes.** A fair die or a fair coin is modelled by giving each
outcome the same probability. This is an assumption, not a fact. A real spinner
or die may be biased.

**Independence.** Two events are often modelled as independent, so the
multiplication rule applies. This is also an assumption. Two components that
share a power supply, or two draws without replacement, are not independent.

**A constant rate.** A model often assumes that a probability stays the same
from one trial to the next. A defect rate may change between shifts, and a fire
risk may change with the weather.

Write the assumptions down before you calculate. An answer without its
assumptions cannot be checked.

## 3. Expected counts

An **expected count** is the number of times an event is predicted to happen.
Multiply the probability by the number of trials:

$$
\text{expected count} = \text{probability} \times \text{number of trials}.
$$

**Example 1.** A model says that the probability a component is defective is
$0.03$. In a batch of 800 components, the expected number of defectives is

$$
0.03 \times 800 = 24.
$$

The expected count is a long-run average. A particular batch may contain a
different number.

Expected counts are useful because they can be compared with real data. If a
model predicts 24 defectives and 60 are found, the model is wrong or an
assumption has failed.

## 4. Building and reading a model

**Example 2.** Machine A makes 60% of a factory output and machine B makes 40%.
The defect rate is 2% for machine A and 5% for machine B. A defective item is
found. Estimate the probability that it came from machine B.

Start with the model assumptions: each item comes from exactly one machine, the
defect rates are constant, and the machine is the only cause of a defect.

A defective item can come from either machine. In a run of 1000 items, the
expected defectives are

$$
\text{machine A}: 0.6 \times 1000 \times 0.02 = 12,
$$

$$
\text{machine B}: 0.4 \times 1000 \times 0.05 = 20.
$$

So there are $12 + 20 = 32$ defectives in total, and 20 of them come from
machine B. Therefore

$$
P(\text{machine B} \mid \text{defective}) = \frac{20}{32} = \frac{5}{8}.
$$

Machine B makes fewer items but a higher share of the defects, because its
defect rate is higher.

## 5. Criticising an assumption

A model is only as good as its assumptions. To criticise one, name the
assumption, explain why it may fail, and say which way the answer moves.

**The independence assumption.** Two components fail independently. In reality
they may share a power supply or a cooling system. A shared cause makes them
fail together, so the chance that both fail is larger than the model says.

**The equally likely assumption.** A spinner is modelled as fair. In reality one
side may be favoured, so some outcomes are more likely than the model says.

**The constant-rate assumption.** A defect rate of 2% is used for a whole week.
A worn tool on Friday may raise the rate, so the model is too low for the later
days.

**The base rate.** The rare-disease calculation is very sensitive to the base
rate. Changing the base rate from 1 in 1000 to 5 in 100 moved the answer from
about $0.018$ to about $0.486$. A model built on a guessed base rate carries
that guess into the answer.

## 6. Refining a model

To refine a model, change the assumption that failed and recalculate. Then
compare the old answer and the new one.

**Example 3.** The warehouse fire model uses a false-alarm rate of $0.02$ and a
base rate of $0.001$. Suppose the detector is old and the false-alarm rate rises
to $0.05$. Find the new probability of a fire, given an alarm.

The two alarm paths are

$$
P(F \text{ and } A) = 0.001 \times 0.95 = 0.00095,
$$

$$
P(\text{no } F \text{ and } A) = 0.999 \times 0.05 = 0.04995.
$$

So

$$
P(A) = 0.00095 + 0.04995 = 0.0509,
$$

$$
P(F \mid A) = \frac{0.00095}{0.0509} = \frac{19}{1018} \approx 0.0187.
$$

The new answer is about $0.019$, down from about $0.045$. A worse false-alarm
rate makes the alarm less informative. The manager should still call the fire
service, because even a small chance of a fire matters, but the model now says
that most alarms are false.

## 7. Try it: what the base rate does to a positive result

**Predict first.** The figure shows 100000 people and a test. Before you move a
control, predict what happens to the share of positive results that are true
when the condition becomes rarer. Write down whether the share rises, falls or
stays the same.

:::figure ch12-model-sensitivity

**Test.** Set the false-positive rate to a small value, then move the prevalence
control from its highest value to its lowest. Watch the counts of true positives
and false positives, and watch the share of positive results that are true.

**Explain.** Write two sentences. The first explains why a lower prevalence
produces more false positives than true positives. The second explains why a
screening programme for a rare condition needs a very low false-positive rate.

> **Watch out.** Three mistakes are common.
>
> **Assuming independence with no evidence.** Two events are independent only if
> the model says so or the data support it. A shared cause or a draw without
> replacement breaks independence.
>
> **Using a probability outside the range of the data.** A defect rate measured
> on one production line may not apply to another, and a fire risk measured in
> summer may not apply in winter. State the range where the model was built.
>
> **Rounding in the middle of a calculation.** Keep the exact values in the
> model until the final line. Rounding $0.00095$ to $0.001$ too early changes the
> answer.
>
> **Re-check:** after any model, name one assumption and say what happens to the
> answer if the assumption is wrong.

## Progress check

Return to the chapter problem. The warehouse model uses a fire probability of
$0.001$, a detection probability of $0.95$ and a false-alarm rate of $0.02$.

1. In 100000 mornings, find the expected number of fires.
2. Find the expected number of false alarms.
3. Find the ratio of false alarms to real fires, to the nearest whole number.
4. Suppose the false-alarm rate rises to $0.05$. Find the expected number of
   false alarms, and the new ratio.
5. Write two sentences that a manager could use to explain the change to the
   staff.

## You should now be able to

- write down the assumptions behind a probability model;
- work out an expected count from a probability and a number of trials;
- build a model for a two-source problem and find a conditional probability;
- compare a model with observed data;
- criticise an assumption and say which way the answer moves;
- refine a model and report both the old and the new answer.
