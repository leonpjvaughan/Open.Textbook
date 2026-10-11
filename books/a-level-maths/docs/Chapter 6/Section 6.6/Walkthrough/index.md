---
title: 6.6 Exponential growth and decay in modelling — Learn
chapter: 6
chapter_title: Exponentials and logarithms
section: '6.6'
section_title: Exponential growth and decay in modelling
dfe:
- F7
- OT3
kind: walkthrough
---

# 6.6 Exponential growth and decay in modelling — Learn

**Prerequisites:** the model $y = Ae^{kt}$ from Section 6.2; solving an
exponential equation from Section 6.4; substituting into a formula.

**By the end of this section you can:** build an exponential model from a
written description; use it to predict a value; find a doubling time or a
half-life; find the time for a quantity to reach a given level; and state the
limitations of an exponential model.

## 1. The growth and decay model

A quantity that changes at a rate proportional to its current size follows

$$
y = Ae^{kt},
$$

where $A = y(0)$ is the starting value and $k$ is the rate constant. The
context decides the meaning of each symbol:

| Context | $A$ | $k$ | Behaviour |
|---|---|---|---|
| Money, continuous interest | initial amount | interest rate per year | grows |
| Radioactive decay | initial mass | $-\,$decay constant | decays |
| Drug concentration | initial dose | $-\,$elimination rate | decays |
| Population growth | initial population | growth rate per year | grows |

A positive $k$ describes growth, and a negative $k$ describes decay. The same
mathematics covers every row of the table; only the story changes.

**Example 1.** £$2000$ is invested with continuous compounding at $3\%$ per
year, so $A = 2000e^{0.03t}$. Find the amount after $5$ years.

Substitute $t = 5$:

$$
A = 2000e^{0.15} = 2323.67\ldots,
$$

so the investment is worth £$2323.67$ to the nearest penny.

**Example 2.** A radioactive isotope has a half-life of $20$ years. Find the
decay constant $k$ in $m = m_0e^{-kt}$.

Half-life means $m = \dfrac{m_0}{2}$ when $t = 20$. Divide by $m_0$ and
substitute:

$$
e^{-20k} = \frac{1}{2}.
$$

Take logarithms: $-20k = -\ln 2$, so

$$
k = \frac{\ln 2}{20} \approx 0.0347.
$$

**Example 3.** A drug is modelled by $A = 80e^{-0.4t}$ mg, where $t$ is in
hours. Find the time for the amount to fall to $10$ mg.

Divide by $80$:

$$
e^{-0.4t} = \frac{10}{80} = 0.125.
$$

Take logarithms: $-0.4t = \ln 0.125$, so

$$
t = \frac{\ln 0.125}{-0.4} = 5.198\ldots \approx 5.2\text{ hours}.
$$

**Example 4.** A population grows as $P = 500e^{0.15t}$. Find its doubling
time.

Doubling means $P = 2 \times 500$, so $e^{0.15t} = 2$. Take logarithms:

$$
t = \frac{\ln 2}{0.15} \approx 4.62.
$$

The population doubles about every $4.6$ years. The starting value $500$
cancels, so the doubling time does not depend on it.

## 2. Limitations and refinements

A model is a simplification, and an exponential model has limits.

- **Growth cannot continue forever.** A population with unlimited food would
  follow $P = Ae^{kt}$, but in reality food, space and disease slow the growth.
  A model can be refined by adding a limit, or by using it only over the range
  where the data were collected.
- **Decay approaches zero but never reaches it.** Radioactive mass and drug
  concentration get closer and closer to zero. The model predicts a very small
  positive amount at any time, not an exact zero.
- **The constants must come from data.** The value of $k$ is estimated from
  measurements, and a different sample gives a different estimate. The estimate
  is only as reliable as the data.
- **The model is only valid over the observed range.** Predicting far beyond the
  data, called extrapolation, is risky. A model fitted over ten years may not
  describe the next fifty.
- **Units and time must match.** If $k$ is per year, then $t$ must be in years.
  Mixing units changes the prediction.

## Progress check

Return to the mould culture in the chapter problem. The fitted model was
$N = 200\left(1.5\right)^t$, and it predicted $N = 2000$ at about $5.7$ hours.

1. Write the model in the form $N = 200e^{kt}$, and find $k$.
2. Explain why the number $1.5$ becomes $k = \ln 1.5$.
3. Give one reason why the exponential model may fail after a long time.
4. Suggest one refinement that would make the prediction more realistic.

> **Watch out.** These mistakes are common.
>
> **Using a percentage as a decimal in the wrong place.** A growth rate of $3\%$
> per year is $k = 0.03$, not $k = 3$ and not $k = 0.3$. A rate of $3$ would
> multiply the amount by $e^{3} \approx 20$ each year.
>
> **Forgetting that a half-life gives a negative $k$.** Decay means the exponent
> is negative, so write $e^{-kt}$ with $k > 0$. If you use $e^{kt}$, the value
> of $k$ must itself be negative.
>
> **Doubling $A$ instead of setting $y = 2A$.** For a doubling time, substitute
> $2A$ for $y$ and let $A$ cancel. Do not change the value of $A$ itself.
>
> **Treating the model as exact.** The model predicts, it does not guarantee. A
> value from the model is an estimate, and it should be reported with sensible
> rounding.
>
> **Re-check:** substitute your value of $k$ back into the model and confirm one
> known data point. For the mould, $N(1) = 200e^{\ln 1.5} = 200 \times 1.5 =
> 300$, which matches the table.

## You should now be able to

- build a model $y = Ae^{kt}$ from a written description;
- decide the sign of $k$ from the context;
- find a value by substitution;
- find a half-life or a doubling time by solving an exponential equation;
- find the time for a quantity to reach a stated level;
- state the limitations of an exponential model and suggest a refinement.
