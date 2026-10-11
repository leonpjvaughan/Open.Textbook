---
title: 'Chapter 13: Review'
chapter: 13
kind: review
---

# Chapter 13: Review

## The chapter problem, solved

The supplier makes two claims on the packet of 20 seeds.

- Each seed germinates with probability 0.8, and the seeds germinate
  independently.
- The height of a mature plant is normally distributed with mean 45 cm and
  standard deviation 6 cm.

The gardener planted all 20 seeds, and 13 of them germinated.

### Step 1. Identify the two quantities

The **number that germinate** is a count. It takes whole-number values from 0
to 20, and the gardener can list every possible value.

The **height of a plant** is a measurement. It can take any value in a range,
and the gardener cannot list every possible height.

The two quantities need different models.

### Step 2. The number that germinate

Let $X$ be the number that germinate. There are $n = 20$ independent trials,
each seed either germinates or does not, and the probability $p = 0.8$ is the
same for every seed. So

$$
X \sim B(20, 0.8).
$$

Find $P(X \le 13)$ using the complement and the upper tail:

$$
P(X \le 13) = 1 - P(X \ge 14)
= 1 - \left(P(X = 14) + \dots + P(X = 20)\right).
$$

The sum of the terms from 14 to 20 is $0.9133$ (4 d.p.), so

$$
P(X \le 13) = 1 - 0.9133 = 0.0867 \ (4 \text{ d.p.}).
$$

The expected number is $np = 16$, so 13 is below the centre. A result of 13 or
fewer germinations happens in about 8.7% of packets of this kind. It is unusual,
but it is not extremely rare. Deciding whether the result is strong evidence
against the claim needs the hypothesis-testing tools of the next chapter.

### Step 3. The height of a plant

Let $Y$ be the height of a mature plant. Then $Y \sim N(45, 6^2)$ cm. Find the
probability that a plant is taller than 52 cm. Standardise:

$$
z = \frac{52 - 45}{6} = 1.1667 \ (4 \text{ d.p.}).
$$

The table gives $\Phi(1.2) = 0.8849$ and $\Phi(1.1) = 0.8643$, so
$\Phi(1.1667) \approx 0.8783$. Then

$$
P(Y > 52) = 1 - \Phi(1.1667) \approx 1 - 0.8783 = 0.1217.
$$

About 12.2% of mature plants should be taller than 52 cm.

### Step 4. Answer the two questions

- About 8.7% of packets of 20 seeds produce 13 or fewer germinations when
  $p = 0.8$. The gardener's result is on the low side of the model, but it is
  not a rare event.
- About 12.2% of mature plants should be taller than 52 cm under the height
  model.

The answers use two different models, and each model rests on assumptions. The
germination claim assumes independence. If the seeds share a packet, then a
storage problem would affect them together, and the trials would not be
independent. The height claim assumes the heights are symmetric about 45 cm
with no outliers. The gardener should check both assumptions against the data
before trusting the models.

## Mixed practice — choose the method first

For each question, say which model or method you will use before you calculate:
the binomial formula, an at-most or at-least sum, the standard Normal table, the
Normal approximation with the continuity correction, a point of inflection, a
binomial coefficient, or the correlation and regression from Chapter 11.

:::problems chapter-13-review

:::answers chapter-13-review

## What you can now do

- list the values and probabilities of a discrete random variable and check
  that they sum to 1;
- test a context against the four binomial conditions and write $X \sim B(n,
  p)$;
- work out a binomial probability for one value, an at-most range, an at-least
  range and a between range;
- describe the Normal curve and its two parameters, and read the variance
  correctly in $N(\mu, \sigma^2)$;
- standardise a value and read a probability from a standard Normal table;
- find a value when you are given a probability;
- explain how a histogram approaches a probability density curve, and why the
  points of inflection of a Normal curve sit at $\mu \pm \sigma$;
- use the Normal approximation to the binomial with the continuity correction,
  and state when it is reasonable;
- choose between the binomial and the Normal model for a context, and give a
  reason.

## Your relevance reflection

Return to the prompt in the chapter opener: one situation where you would count
how many times something happens in a fixed number of tries, and one where you
would measure something that varies around an average.

Write both situations again. For each one, now add the model you would choose,
the two parameters you would need, and one assumption you would have to check.
Finish with one sentence about what you would do if the data did not match the
model.
