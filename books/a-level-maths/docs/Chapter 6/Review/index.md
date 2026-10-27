---
title: 'Chapter 6: Review'
chapter: 6
kind: review
---

# Chapter 6: Review

## The chapter problem, solved

### The cooling coffee

A cup of coffee is poured at $80^\circ$C in a room at $20^\circ$C, so the excess
temperature starts at $60^\circ$C. The model is

$$
E = 60e^{-kt}.
$$

Here $k$ is the decay constant and $t$ the time in minutes.

After $10$ minutes the coffee is at $65^\circ$C, so $E = 45$.

**Step 1. Find k.** Substitute $t = 10$ and $E = 45$:

$$
45 = 60e^{-10k}, \qquad e^{-10k} = \frac{45}{60} = 0.75.
$$

Take logarithms: $-10k = \ln 0.75$, so

$$
k = -\frac{\ln 0.75}{10} = \frac{\ln\left(4/3\right)}{10} \approx 0.0288.
$$

**Step 2. Find the initial rate of cooling.** Differentiate the model:

$$
\frac{dE}{dt} = -60k e^{-kt}.
$$

At $t = 0$,

$$
\frac{dE}{dt} = -60k \approx -60 \times 0.0288 = -1.73.
$$

The rate is about $-1.73^\circ$C per minute. The negative sign says the excess
temperature is falling. The rate itself shrinks as $E$ shrinks, so the coffee
cools quickly at first and more slowly later.

**Step 3. Find the time to reach 15.** Set $E = 15$:

$$
15 = 60e^{-kt}, \qquad e^{-kt} = \frac{15}{60} = 0.25.
$$

Take logarithms: $-kt = \ln 0.25 = -\ln 4$, so

$$
t = \frac{\ln 4}{k} = \frac{10\ln 4}{\ln\left(4/3\right)} \approx 48.2 \text{ minutes}.
$$

The coffee is ready to drink after about $48$ minutes. The second stage takes
longer than the first, because the cooling is slower at a lower temperature.

### The mould culture

The counts are $200$, $300$, $450$ and $675$ at times $0$, $1$, $2$ and $3$
hours.

**Step 1. Read the growth factor.** Divide each count by the one before it:

$$
\frac{300}{200} = 1.5, \qquad \frac{450}{300} = 1.5, \qquad \frac{675}{450} = 1.5.
$$

The number multiplies by $1.5$ each hour, so $b = 1.5$ and $k = 200$.

**Step 2. Read it from a log graph.** For the model $N = kb^t$, where $N$ is the
count after $t$ hours, $k$ the starting count and $b$ the growth factor,

$$
\ln N = \ln k + t\ln b.
$$

Using the first and last readings, the gradient is

$$
\frac{\ln 675 - \ln 200}{3 - 0} = \frac{\ln 3.375}{3} = \ln 1.5 \approx 0.405.
$$

So $\ln b = \ln 1.5$ and $b = 1.5$, which agrees with the ratio. The intercept is
$\ln 200$, so $k = 200$.

**Step 3. Predict the time to 2000.** Set $N = 2000$:

$$
2000 = 200\left(1.5\right)^t, \qquad \left(1.5\right)^t = 10.
$$

Take logarithms: $t\ln 1.5 = \ln 10$, so

$$
t = \frac{\ln 10}{\ln 1.5} \approx 5.68 \text{ hours}.
$$

**Step 4. State the limitation.** The exponential model describes the data
over the first few hours. It cannot hold forever, because the culture will run
out of food and space. Predicting far beyond $5.68$ hours is risky, and a better
model would include a maximum population.

## Mixed practice — choose the method first

For each question, say which method you will use before you calculate. The items
mix this chapter with Chapters 1 to 5 and 7.

:::problems chapter-06-review

:::answers chapter-06-review

## What you can now do

- sketch $y = a^x$ and $y = e^x$, and state their intercept, range and
  asymptote;
- explain why $e$ is the natural base;
- differentiate $e^{kx}$ and $a^{kx}$, and interpret the result as a rate;
- explain the link between a rate proportional to the amount and an exponential
  model;
- convert between exponential and logarithmic form, and use the laws of
  logarithms;
- solve $a^x = b$, including a quadratic in $a^x$;
- use a logarithmic graph to estimate the constants in $y = kb^x$ and
  $y = ax^n$;
- model growth and decay in context, and find a half-life or a doubling time;
- state the limitations of an exponential model.

## Your relevance reflection

Return to the prompt in the chapter opener: *something that grows or shrinks by
a fixed factor*. Write down the quantity again. Now add three things you could
not have said before this chapter: how to write the quantity as an exponential
model, how to find the time for it to double or halve, and how to read its
growth factor from a straight line. Finish with one sentence about a growth or
decay you would measure from now on.
