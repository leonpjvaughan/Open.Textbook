---
title: 4.7 Sequences and series in modelling — Learn
chapter: 4
chapter_title: Sequences and series
section: '4.7'
section_title: Sequences and series in modelling
refs:
- D6
- OT3
kind: walkthrough
---

# 4.7 Sequences and series in modelling — Learn

**Prerequisites:** arithmetic sequences and series in Section 4.5; geometric
sequences and series in Section 4.6; recurrences in Section 4.3.

**By the end of this section you can:** choose between an arithmetic model and a
geometric model for a real quantity; write the model as a recurrence and solve
it; find when a model reaches a target value; state the assumptions of a model;
and refine a model when the answer needs it.

## 1. Choosing the model

The first decision in a modelling question is the shape of the change.

- Add the same amount each step: an **arithmetic** model, with
  $u_n = a + (n - 1)d$.
- Multiply by the same factor each step: a **geometric** model, with
  $u_n = a r^{n-1}$.

A table of values often makes the choice clear. Work out the differences between
consecutive terms. If the differences are constant, the model is arithmetic. If
the ratios are constant, it is geometric.

$$
500, \; 550, \; 600, \; 650, \; \dots \qquad \text{differences all } 50,
$$

$$
500, \; 550, \; 605, \; 665.5, \; \dots \qquad \text{ratios all } 1.1.
$$

The first list is arithmetic, the second geometric. After a few steps the two
lists look quite different, even though they start at the same value.

## 2. Writing the model as a recurrence

A recurrence often describes the rule of the real situation more directly than a
formula does.

**Example 1.** A village has 4000 people and grows by 2% each year. Write a
recurrence and a formula for the population after $n$ years.

The new population is the old population plus 2%:

$$
P_{n+1} = 1.02P_n, \qquad P_1 = 4000.
$$

This is geometric with $r = 1.02$, so

$$
P_n = 4000(1.02)^{n-1}.
$$

The value $1.02$ is the **growth factor**. A fall of 2% each year would give the
factor $0.98$.

**Example 2.** A patient takes 100 mg of a medicine at the same time each day.
The body removes half of the medicine in a day, and the new dose is added on top.
Write a recurrence for the amount just after each dose.

Each day the body keeps half of what was there, then the new dose is added:

$$
u_{n+1} = 0.5u_n + 100, \qquad u_1 = 100.
$$

The terms are $100, 150, 175, 187.5, \dots$, rising towards a limit. Section 4.3
called this a recurrence; here it is a model of a real process.

## 3. Finding a target value

A modelling question often asks when the quantity reaches a target. Without
logarithms, trial and improvement is the honest method. Work out the value on
each side of the target, and say between which two steps it is reached.

**Example 3.** For the village in Example 1, use trial and improvement to find
when the population first passes 4500.

The model is $P_n = 4000(1.02)^{n-1}$. Try some values:

$$
P_{6} = 4000(1.02)^5 = 4416.3, \qquad P_{7} = 4000(1.02)^6 = 4504.6.
$$

The population is below 4500 after 6 years and above it after 7. So the
population first passes 4500 during the 7th year. The answer names a year, not a
fraction of a person.

## 4. The limit of a recurrence

For a recurrence of the form $u_{n+1} = ru_n + c$ with $|r| < 1$, the terms
settle on a fixed value $L$. At that value the next term equals the current one,
so $L = rL + c$, which gives

$$
L = \frac{c}{1 - r}.
$$

**Example 4.** For the medicine in Example 2, find the level the amount settles
on.

Here $r = 0.5$ and $c = 100$:

$$
L = \frac{100}{1 - 0.5} = \frac{100}{0.5} = 200.
$$

The amount in the body settles at 200 mg just after a dose. The limit is a
useful answer: it tells the patient the long-term level the medicine reaches,
and it comes from one short equation.

## 5. The chapter problem reaches its target

The chapter problem has two streams and a gift.

- The quiz night raises $50n + 100$ pounds in month $n$, so its total after $n$
  months is $S_n = 25n^2 + 125n$.
- The appeal raises $600(0.8)^{n-1}$ pounds in month $n$, so its total after $n$
  months is $3000(1 - 0.8^n)$.

**Example 5.** Show that the fund passes £9,000 during month 14.

Work out the total at the end of month 13 and at the end of month 14.

At the end of month 13:

$$
\text{quiz} = 25(13)^2 + 125(13) = 4225 + 1625 = 5850,
$$

$$
\text{appeal} = 3000(1 - 0.8^{13}) = 2835.07 \text{ (to the nearest penny)}.
$$

The total is $5850 + 2835.07 = 8685.07$, which is below £9,000.

At the end of month 14:

$$
\text{quiz} = 25(14)^2 + 125(14) = 4900 + 1750 = 6650,
$$

$$
\text{appeal} = 3000(1 - 0.8^{14}) = 2868.06 \text{ (to the nearest penny)}.
$$

The total is $6650 + 2868.06 = 9518.06$, which is above £9,000. The fund passes
the target during month 14.

## 6. Try it: the model comparison

**Predict first.** The figure grows one quantity by adding a fixed amount and
another by multiplying by a fixed factor. Before you touch the controls, predict
which one is larger after 10 steps when the factor is $1.05$, and which is
larger when the factor is $1.2$. Write both predictions down.

:::figure ch4-model-explorer

**Test.** Move the sliders for the added amount and the factor, and watch the two
sets of bars over 10 steps. The readout gives both values at step 10 and names
the step where the geometric value passes the arithmetic one.

**Explain.** Write two sentences saying why a small factor can take many steps to
overtake a steady addition, and why a larger factor overtakes much sooner.

> **Watch out.** A model is a description, not a law.
>
> **Extending a model too far.** The appeal total settles at £3000, but the model
> treats a fraction of a pound as meaningful, which a real collection would not.
> The village population model gives $P_{200} = 4000(1.02)^{199}$, an absurd
> number, because a village cannot grow by 2% for ever on a fixed area of land.
> **Re-check:** say what the model assumes, and where those assumptions stop
> being sensible.
>
> **Mistaking a percentage for a fixed amount.** A rise of 2% each year is a
> geometric model, and the amount added grows each year. A rise of a fixed 80
> people each year is arithmetic. Reading "per year" is not enough; you must
> decide whether the change is a fixed amount or a fixed proportion.

## Progress check

Return to the chapter problem. The roof costs £9,000, and the two streams run
together.

1. Write the total after $n$ months as
   $25n^2 + 125n + 3000(1 - 0.8^n)$.
2. Work out the total at the end of month 13 and at the end of month 14.
3. State which month the fund passes £9,000.
4. The committee could also wait for the quiz night alone. Use
   $25n^2 + 125n \ge 9000$ to estimate the month, and explain which plan is
   quicker and why.

## You should now be able to

- choose an arithmetic or geometric model from a table of values;
- write a model as a recurrence and as a formula;
- find when a model reaches a target value by trial and improvement;
- find the limit of a recurrence of the form $u_{n+1} = ru_n + c$;
- state the assumptions of a model and say where they stop being sensible;
- refine a model when the answer needs a change.
