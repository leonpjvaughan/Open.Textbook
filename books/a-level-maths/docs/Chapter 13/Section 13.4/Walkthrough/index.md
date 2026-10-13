---
title: 13.4 Links to the binomial, histograms and points of inflection — Learn
chapter: 13
chapter_title: Statistical distributions
section: '13.4'
section_title: Links to the binomial, histograms and points of inflection
refs:
- N2
kind: walkthrough
---

# 13.4 Links to the binomial, histograms and points of inflection — Learn

**Prerequisites:** the binomial model from Sections 13.1 and 13.2; the Normal
model from Section 13.3; points of inflection from Section 7.4; histograms and
the standard deviation from Sections 11.3 and 11.5.

**By the end of this section you can:** explain how the area of a histogram
approaches the area under a curve; describe the shape of the Normal curve and
its points of inflection; use the one-, two- and three-standard-deviation
bands; and approximate a binomial probability with a Normal variable when the
conditions are met.

## 1. From histogram to curve

In Section 11.3 you drew a histogram. The area of each bar is proportional to
the frequency of the class. When the sample is large and the classes are narrow,
the tops of the bars lie close to a smooth curve.

The total area of the histogram bars is the total frequency. Divide every
frequency by the total, and the area of each bar becomes a relative frequency.
The relative frequencies add to 1, just like probabilities. In the limit, the
histogram becomes a probability density curve, and the area under the curve is a
probability.

This is the link between the two halves of the chapter. The binomial bar chart
is a histogram of a count. The Normal curve is the smooth limit of a histogram
of a measurement.

## 2. Points of inflection

In Section 7.4 you met the second derivative. A curve is concave where
$f''(x) < 0$ and convex where $f''(x) > 0$. A **point of inflection** is where
the curve changes from concave to convex, or the other way.

The Normal curve is concave in the middle and convex in the two tails. The
change happens at exactly

$$
x = \mu - \sigma \qquad \text{and} \qquad x = \mu + \sigma.
$$

These are the points where the curve is steepest. The figure in Section 13.3
marks them. They are the reason $\sigma$ is the natural measure of spread for
this curve: it fixes where the curve turns.

## 3. The one-, two- and three-standard-deviation bands

The symmetry of the curve and the standard Normal table give three useful
probabilities.

$$
P(\mu - \sigma < X < \mu + \sigma) = \Phi(1) - \Phi(-1)
= 0.8413 - 0.1587 = 0.6827.
$$

$$
P(\mu - 2\sigma < X < \mu + 2\sigma) = \Phi(2) - \Phi(-2)
= 0.9772 - 0.0228 = 0.9545.
$$

$$
P(\mu - 3\sigma < X < \mu + 3\sigma) = \Phi(3) - \Phi(-3)
= 0.9987 - 0.0013 = 0.9974.
$$

So about 68% of a Normal variable lies within one standard deviation of the
mean, about 95% within two, and about 99.7% within three. These bands are a
quick check on any Normal calculation. If an answer says that 40% of a Normal
variable lies within one standard deviation, something is wrong.

## 4. The binomial link

The binomial bar chart has a centre and a spread. For $X \sim B(n, p)$, the
centre sits at

$$
\mu = np,
$$

and the spread is

$$
\sigma = \sqrt{np(1-p)}.
$$

When $n$ is large and $p$ is not close to 0 or 1, the bar chart is close to a
Normal curve with these two parameters. We write

$$
X \sim B(n, p) \quad \text{is approximately} \quad N(np, np(1-p)).
$$

The approximation turns a sum of many binomial terms into one normal
probability. Two conditions keep it honest.

- Both $np$ and $n(1-p)$ are greater than 5.
- The bars are not too far from the curve, so $p$ is not close to 0 or 1.

## 5. The continuity correction

A binomial variable takes whole-number values. A Normal variable is continuous.
To match the two, move each whole number to the interval of width 1 around it.

For an at-most probability, the bar for the value $r$ covers the interval
$[r - 0.5, r + 0.5)$. So

$$
P(X \le r) \approx P(Y \le r + 0.5),
$$

where $Y$ is the matching Normal variable. The $0.5$ is the **continuity
correction**. It moves the boundary to the right.

For an at-least probability,

$$
P(X \ge r) \approx P(Y \ge r - 0.5).
$$

**Example 1.** The random variable $X \sim B(50, 0.4)$. Use a Normal
approximation to estimate $P(X \le 15)$.

Check the conditions first:

$$
np = 50 \times 0.4 = 20 \qquad \text{and} \qquad
n(1-p) = 50 \times 0.6 = 30.
$$

Both are greater than 5, so the approximation is reasonable. The matching
Normal variable has

$$
\mu = 20, \qquad
\sigma = \sqrt{50 \times 0.4 \times 0.6} = \sqrt{12} \approx 3.464.
$$

Apply the continuity correction: $X \le 15$ becomes $Y \le 15.5$.
Standardise:

$$
z = \frac{15.5 - 20}{3.464} \approx -1.30.
$$

Then

$$
P(X \le 15) \approx \Phi(-1.30) = 1 - \Phi(1.30) = 1 - 0.9032 = 0.0968.
$$

The exact binomial probability is $0.0955$, so the approximation is close.

**Example 2.** The random variable $X \sim B(100, 0.5)$. Estimate $P(X \le 40)$.

Here $np = 50$ and $n(1-p) = 50$, so the conditions hold. The matching Normal
variable has

$$
\mu = 50, \qquad \sigma = \sqrt{100 \times 0.5 \times 0.5} = 5.
$$

Apply the continuity correction and standardise:

$$
z = \frac{40.5 - 50}{5} = -1.9.
$$

Then

$$
P(X \le 40) \approx \Phi(-1.9) = 1 - \Phi(1.9) = 1 - 0.9713 = 0.0287.
$$

## 6. Try it: binomial bars and the Normal curve

**Predict first.** The figure shows the bars of $X \sim B(n, p)$ with a Normal
curve drawn over them. The curve has mean $np$ and standard deviation
$\sqrt{np(1-p)}$.

Before you move anything, predict how the bars change shape when $n$ increases
while $p$ stays at 0.5. Write down whether the bars become closer to the curve
or further from it.

:::figure ch13-binomial-normal

**Test.** Set $p = 0.5$ and increase $n$ from 10 to 100. Watch how the bars move
towards the curve. Then set $p = 0.1$ and watch the curve again. Note where the
curve fits well and where it does not.

**Explain.** Write two sentences. The first explains why a larger $n$ makes the
curve fit the bars better. The second explains why a small $p$ makes the fit
worse, even when $n$ is large.

> **Watch out.** Three mistakes are common.
>
> **Approximating when the conditions fail.** If $n$ is small, or $p$ is close
> to 0 or 1, the bars are far from the curve. Check $np$ and $n(1-p)$ before you
> approximate.
>
> **Forgetting the continuity correction.** Use $r + 0.5$ for $P(X \le r)$ and
> $r - 0.5$ for $P(X \ge r)$. Rounding a whole number straight into a
> continuous curve shifts the boundary by half a unit.
>
> **Saying the count is Normal.** The count is binomial. It is *approximately*
> Normal when the conditions hold. The approximation is a modelling choice, not
> a fact about the variable.
>
> **Re-check:** state the matching $\mu$ and $\sigma$, apply the continuity
> correction, and check the answer against the size you expected.

## You should now be able to

- explain how a histogram approaches a probability density curve;
- locate the points of inflection of a Normal curve at $\mu \pm \sigma$;
- use the one-, two- and three-standard-deviation bands;
- find the matching Normal parameters $\mu = np$ and
  $\sigma = \sqrt{np(1-p)}$ for a binomial variable;
- apply the continuity correction and estimate a binomial probability;
- state when the Normal approximation to the binomial is reasonable.
