---
title: 13.3 The Normal distribution as a model — Learn
chapter: 13
chapter_title: Statistical distributions
section: '13.3'
section_title: The Normal distribution as a model
refs:
- N2
kind: walkthrough
---

# 13.3 The Normal distribution as a model — Learn

**Prerequisites:** the mean and standard deviation from Section 11.5; the idea
of area under a curve from Section 8.2; the binomial model from Section 13.1.

**By the end of this section you can:** describe the Normal curve and its two
parameters; explain why a probability is an area for a continuous variable;
standardise a value; read a probability from a standard Normal table; and find
a value when you are given a probability.

## 1. Continuous random variables

A **continuous** random variable can take any value in a range. A height, a
mass and a time are continuous. You cannot list every possible value, so you
cannot give each one a probability.

For a continuous variable, a probability is an **area under a curve**. The curve
is called a probability density function. The total area under the curve is 1.

One consequence matters for every calculation. The area under a single point is
zero, so

$$
P(X = a) = 0, \qquad P(X \le a) = P(X < a).
$$

For a continuous variable, "less than" and "less than or equal to" give the
same probability. This is different from the discrete binomial variable, where
$P(X = r)$ can be large.

## 2. The Normal model

The **Normal distribution** is a continuous model with a symmetric,
bell-shaped curve. It has two parameters.

- The **mean** $\mu$ sets the centre of the curve.
- The **standard deviation** $\sigma$ sets the spread. A larger $\sigma$ gives a
  wider, flatter curve.

We write

$$
X \sim N(\mu, \sigma^2).
$$

The second number is the **variance**, $\sigma^2$, not the standard deviation.
So $X \sim N(20, 25)$ has mean 20 and standard deviation $\sqrt{25} = 5$. This
notation is a common trap. Read the second number as the variance every time.

The curve is symmetric about $\mu$. About 68% of the area lies within one
standard deviation of the mean, about 95% within two, and about 99.7% within
three. You will check these numbers in Section 13.4.

## 3. Standardising

Every Normal variable can be turned into the **standard Normal** variable
$Z \sim N(0, 1)$, which has mean 0 and standard deviation 1. The change of
variable is called **standardising**:

$$
z = \frac{x - \mu}{\sigma}.
$$

The value $z$ counts how many standard deviations $x$ lies from the mean. A
negative $z$ means $x$ is below the mean.

Standardising does not change a probability. It moves the question onto the
curve in every standard Normal table:

$$
P(X \le x) = P\left(Z \le \frac{x - \mu}{\sigma}\right) = \Phi(z).
$$

The symbol $\Phi$ (a capital Greek phi) is the area to the left of $z$ under the
standard Normal curve.

**Example 1.** The mass of a bag of flour is $X \sim N(20, 5^2)$ grams. Find
$P(X < 26)$.

Standardise $x = 26$:

$$
z = \frac{26 - 20}{5} = 1.2.
$$

From the table, $\Phi(1.2) = 0.8849$. So

$$
P(X < 26) = P(Z < 1.2) = 0.8849.
$$

## 4. A standard Normal table

The table gives $\Phi(z) = P(Z \le z)$ to four decimal places.

| $z$ | $\Phi(z)$ | $z$ | $\Phi(z)$ | $z$ | $\Phi(z)$ |
|---|---|---|---|---|---|
| 0.0 | 0.5000 | 1.0 | 0.8413 | 2.0 | 0.9772 |
| 0.1 | 0.5398 | 1.1 | 0.8643 | 2.1 | 0.9821 |
| 0.2 | 0.5793 | 1.2 | 0.8849 | 2.2 | 0.9861 |
| 0.3 | 0.6179 | 1.3 | 0.9032 | 2.3 | 0.9893 |
| 0.4 | 0.6554 | 1.4 | 0.9192 | 2.4 | 0.9918 |
| 0.5 | 0.6915 | 1.5 | 0.9332 | 2.5 | 0.9938 |
| 0.6 | 0.7257 | 1.6 | 0.9452 | 2.6 | 0.9953 |
| 0.7 | 0.7580 | 1.7 | 0.9554 | 2.7 | 0.9965 |
| 0.8 | 0.7881 | 1.8 | 0.9641 | 2.8 | 0.9974 |
| 0.9 | 0.8159 | 1.9 | 0.9713 | 2.9 | 0.9981 |
| 3.0 | 0.9987 |  |  |  |  |

For a negative $z$, use the symmetry of the curve:

$$
\Phi(-z) = 1 - \Phi(z).
$$

This table is an extract. In an examination, your calculator or the table you
are given provides more values. The method is the same.

**Example 2.** $Z \sim N(0, 1)$. Find $P(Z > 2)$.

The table gives the area to the **left**. The area to the right is the
complement:

$$
P(Z > 2) = 1 - \Phi(2) = 1 - 0.9772 = 0.0228.
$$

**Example 3.** $X \sim N(20, 5^2)$. Find $P(X > 12)$.

Standardise $x = 12$:

$$
z = \frac{12 - 20}{5} = -1.6.
$$

The area to the right of $-1.6$ equals the area to the left of $1.6$, by
symmetry:

$$
P(X > 12) = P(Z > -1.6) = P(Z < 1.6) = \Phi(1.6) = 0.9452.
$$

**Example 4.** $X \sim N(20, 5^2)$. Find $P(15 < X < 27)$.

Standardise both ends:

$$
z_1 = \frac{15 - 20}{5} = -1, \qquad z_2 = \frac{27 - 20}{5} = 1.4.
$$

Subtract the smaller area from the larger:

$$
P(15 < X < 27) = \Phi(1.4) - \Phi(-1) = 0.9192 - 0.1587 = 0.7605.
$$

## 5. Finding a value from a probability

Sometimes the probability is given and the value of $X$ is wanted. Work
backwards through the same steps.

**Example 5.** $X \sim N(50, 6^2)$. Find the value $a$ such that
$P(X < a) = 0.90$.

Read the table backwards. Find the value $z$ with $\Phi(z) = 0.90$. A full table
gives $z = 1.2816$. Then unstandardise:

$$
a = \mu + z\sigma = 50 + 1.2816 \times 6 = 57.69 \ (2 \text{ d.p.}).
$$

So 90% of the values lie below 57.69.

This small table gives the $z$-value for the probabilities used most often.

| $p$ | $z$ with $\Phi(z) = p$ |
|---|---|
| 0.90 | 1.2816 |
| 0.95 | 1.6449 |
| 0.975 | 1.9600 |
| 0.99 | 2.3263 |
| 0.995 | 2.5758 |

## 6. Progress check

Return to the chapter problem. The supplier claims that the height of a mature
sunflower is normally distributed with mean 45 cm and standard deviation 6 cm.
Let $X$ be the height of a mature plant. Find the probability that a plant is
taller than 52 cm.

<details markdown="1">
<summary>Answer</summary>

Standardise $x = 52$:

$$
z = \frac{52 - 45}{6} = 1.1667 \ (4 \text{ d.p.}).
$$

The table gives $\Phi(1.2) = 0.8849$ and $\Phi(1.1) = 0.8643$, so
$\Phi(1.1667)$ is about 0.8783. Then

$$
P(X > 52) = 1 - \Phi(1.1667) \approx 1 - 0.8783 = 0.1217.
$$

About 12.2% of mature plants should be taller than 52 cm. Keep this value for
the Review.

</details>

## 7. Try it: area under the Normal curve

**Predict first.** The figure shows a Normal curve with sliders for the mean
$\mu$ and the standard deviation $\sigma$, and a value $x$. The shaded area is
$P(X < x)$.

Before you move anything, predict what happens to the shaded area when you
increase $\sigma$ while keeping $\mu$ and $x$ fixed. Write down whether the area
rises, falls or stays the same.

:::figure ch13-normal-explorer

**Test.** Move the $\sigma$ slider. Watch the shaded area and the readout. Then
move $\mu$ and watch the shaded area. Note the two points marked at
$\mu - \sigma$ and $\mu + \sigma$.

**Explain.** Write two sentences. The first explains why increasing $\sigma$
changes the shaded area even though $\mu$ and $x$ are fixed. The second
explains what is special about the two marked points, where the curve is
steepest.

> **Watch out.** Four mistakes are common.
>
> **Reading the variance as the standard deviation.** In $X \sim N(20, 25)$,
> the standard deviation is 5, not 25. Standardise with
> $z = \dfrac{x - 20}{5}$.
>
> **Using the wrong tail.** The table gives the area to the left. For "greater
> than", subtract from 1. Sketch the curve and shade the region before you read
> the table.
>
> **Forgetting to standardise.** A value of 52 is not a $z$-value. Divide by
> $\sigma$ first.
>
> **Treating a continuous variable like a discrete one.** For a continuous
> variable, $P(X = 52) = 0$. Only ranges have a positive probability.
>
> **Re-check:** write the probability as an area, standardise, sketch, then read
> the table. Check that your answer lies between 0 and 1.

## You should now be able to

- describe the Normal curve and name its two parameters;
- explain why "less than" and "less than or equal to" agree for a continuous
  variable;
- standardise a value using $z = \dfrac{x - \mu}{\sigma}$;
- read $P(Z \le z)$ from a standard Normal table and use $\Phi(-z) = 1 -
  \Phi(z)$;
- find a probability for a general Normal variable;
- find a value when you are given a probability.
