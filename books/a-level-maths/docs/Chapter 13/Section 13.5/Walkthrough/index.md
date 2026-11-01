---
title: 13.5 Selecting an appropriate distribution — Learn
chapter: 13
chapter_title: Statistical distributions
section: '13.5'
section_title: Selecting an appropriate distribution
refs:
- N3
- OT2
kind: walkthrough
---

# 13.5 Selecting an appropriate distribution — Learn

**Prerequisites:** the binomial model from Sections 13.1 and 13.2; the Normal
model from Section 13.3; the Normal approximation from Section 13.4; the
modelling ideas from Sections 2.12 and 6.6.

**By the end of this section you can:** decide whether a binomial or a Normal
model fits a context; give a reason for the choice; and recognise when neither
model is appropriate.

## 1. Two models, two kinds of quantity

The chapter has built two models. They answer different kinds of question.

| | Binomial $B(n, p)$ | Normal $N(\mu, \sigma^2)$ |
|---|---|---|
| Quantity | A **count** of successes | A **measurement** |
| Values | Whole numbers from 0 to $n$ | Any value in a range |
| Shape | Bars, possibly skewed | A symmetric bell curve |
| Parameters | Number of trials $n$, success probability $p$ | Mean $\mu$, standard deviation $\sigma$ |
| Typical use | How many pass, fail or recover | How long, how heavy, how far |

The first move in a modelling question is to decide whether the quantity is a
count or a measurement.

## 2. Choosing the binomial

Check the four conditions from Section 13.1.

1. A fixed number $n$ of trials.
2. Two outcomes on each trial.
3. A constant probability $p$ of success.
4. Independent trials.

If all four hold, the binomial model fits. Common examples are the number of
defective items in a fixed sample, the number of people in a fixed group who
respond, and the number of correct guesses on a fixed test.

## 3. Choosing the Normal

The Normal model fits a measurement that varies about a mean in a symmetric,
bell-shaped way. Common examples are heights, masses, times and errors.

The Normal model is also used as an approximation to a binomial count when $n$
is large and $p$ is not close to 0 or 1, as you saw in Section 13.4. In that
case the count is still a count, and the Normal curve only stands in for the
bars.

## 4. When the models do not fit

A model is a simplifying assumption, and some contexts break it.

**When the binomial model may not be appropriate:**

- the probability $p$ changes between trials, for example when items are taken
  without replacement from a small population;
- the trials are not independent;
- there are more than two outcomes on a trial;
- the number of trials is not fixed in advance.

**When the Normal model may not be appropriate:**

- the data are skewed, with a long tail on one side;
- the data are counts, which are whole numbers with a lower limit of 0;
- there are outliers, which pull the mean and inflate the standard deviation;
- the data is bounded close to the mean, so a symmetric curve would predict
  impossible values;
- the sample is small, so the shape is not clear.

**Example 1.** A factory makes 4 000 parts a day. A quality inspector checks 50
parts and counts the number that are faulty. Which model fits the count?

The number of trials is fixed at 50. Each part is either faulty or not, so there
are two outcomes. If the parts are checked in a random order, the trials are
independent. Then a binomial model fits, with $n = 50$ and $p$ the proportion
faulty.

**Example 2.** A machine fills bags of rice. The mass of a bag varies. Which
model fits the mass?

The mass is a measurement, not a count. Filling errors tend to be symmetric
about the target mass, with small errors more common than large ones. A Normal
model fits the mass.

**Example 3.** A bag holds 6 red and 4 blue counters. Three counters are taken
without replacement. Let $X$ be the number of red counters. Which model fits?

The probability of a red counter changes after each draw, so $p$ is not
constant. The binomial model does not fit. $X$ is a whole number from 0 to 3, so
a Normal model does not fit either. Neither model is appropriate. The exact
probabilities can be found by counting equally likely selections.

**Example 4.** The number of goals scored in a football match. Which model fits?

The number of goals is a count from 0 upwards. There is no fixed number of
trials, so the binomial model does not fit. The distribution is not symmetric,
so a Normal model does not fit either. A different model is needed, and it is
outside this chapter.

## 5. The modelling cycle

Choosing a model is a cycle, not a single decision.

1. **Choose** a model from the context.
2. **Calculate** the probability or the estimate.
3. **Check** the model against the data. Do the values look symmetric? Are the
   parameters plausible?
4. **Refine** the model if the check fails, and repeat.

Write down the assumptions you made. A conclusion is only as strong as its
assumptions, and stating them shows the reader what the answer depends on.

## 6. Progress check

Return to the chapter problem. The supplier claims that each of 20 seeds
germinates with probability 0.8, independently, and that the height of a mature
plant is normally distributed with mean 45 cm and standard deviation 6 cm.

Decide which model fits each quantity, and give a reason.

<details markdown="1">
<summary>Answer</summary>

The **number of seeds that germinate** is a count. There are 20 independent
trials, each seed either germinates or does not, and the probability 0.8 is the
same for every seed. So the number that germinate fits the binomial model,
$X \sim B(20, 0.8)$.

The **height of a plant** is a measurement. Heights vary about a mean in a
roughly symmetric way. A standard deviation of 6 cm about a mean of 45 cm is
consistent with the model, because 45 cm is several standard deviations above

0. So the height fits the Normal model, $X \sim N(45, 6^2)$.

</details>

> **Watch out.** Three mistakes are common.
>
> **Choosing a model from the average alone.** A question that mentions an
> average is not automatically Normal. Ask first whether the quantity is a count
> or a measurement.
>
> **Using the Normal model for a count.** A count takes whole-number values from
> 0 upwards. A Normal curve would give a positive probability to values between
> whole numbers and to negative values. Use the Normal curve only as an
> approximation, and only when $np > 5$ and $n(1-p) > 5$.
>
> **Ignoring dependence.** Taking items without replacement from a small group
> makes the trials dependent. The binomial model needs independence.
>
> **Re-check:** name the quantity, decide count or measurement, then test the
> model against its conditions.

## You should now be able to

- decide whether a quantity is a count or a measurement;
- test a context against the four binomial conditions;
- describe the shape a Normal model requires;
- recognise contexts where neither model fits;
- state the assumptions of a model and give a reason for your choice.
