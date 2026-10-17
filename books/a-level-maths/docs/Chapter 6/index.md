---
title: 'Chapter 6: Exponentials and logarithms'
chapter: 6
strand: pure
anchor: How long does the coffee take to cool, and when does the mould culture double?
---

# Chapter 6: Exponentials and logarithms

## The chapter problem: the cooling coffee and the growing culture

A cup of coffee is poured at $80^\circ$C in a room kept at $20^\circ$C. The
temperature above room temperature, $E = T - 20$, falls as the coffee cools:

$$
E = 60e^{-kt},
$$

where $E$ is in degrees Celsius and $t$ is in minutes. After $10$ minutes the
coffee is at $65^\circ$C, so the excess temperature is $45^\circ$C. The
coffee is ready to drink when its excess temperature is $15^\circ$C, that is,
when the coffee reaches $35^\circ$C. The cooling constant $k$ is not given, and
it has to be found from the one measurement.

A laboratory also grows a mould culture. The number of cells $N$ is measured
each hour:

| Time $t$ (hours) | $0$ | $1$ | $2$ | $3$ |
|---|---|---|---|---|
| Number $N$ | $200$ | $300$ | $450$ | $675$ |

The team believes the growth follows $N = kb^t$, where $b$ is the factor by
which the number multiplies each hour. They want to estimate $b$ from the data,
and then predict when the number will reach $2000$.

By the end of the chapter you will answer both parts. You will find the cooling
constant from the measurement, read the growth factor from the table, find the
time to cool and the time to double, and connect each model to its rate of
change.

> **First contact — no working needed yet.** Look at the coffee. It cools
> quickly while it is hot, then more slowly as it approaches room temperature.
> Predict how long the coffee takes to fall from $80^\circ$C to $65^\circ$C,
> compared with the time to fall from $65^\circ$C to $35^\circ$C. Write both
> guesses down.
>
> Then look at the table. Each number is bigger than the one before it. Work out
> the ratio between one count and the next, and use it to predict the count at
> $t = 4$ hours.

<details markdown="1">
<summary>If you are not sure where to start</summary>

For the coffee, the first $15$ degrees are lost while the coffee is hot, so they
are lost quickly. The next $30$ degrees are lost while the coffee is cooler, so
they take longer. The first stage is faster, but the second stage covers twice
as many degrees.

For the culture, divide each count by the one before it: $300 \div 200 = 1.5$,
and $450 \div 300 = 1.5$. The pattern is to multiply by $1.5$ each hour, so the
count at $t = 4$ is about $675 \times 1.5 = 1012.5$. Section 6.5 turns this
pattern into a straight-line estimate.
</details>

## By the end of this chapter you will be able to

- sketch the graphs of $a^x$ and $e^x$, and describe their shape, asymptote and
  range;
- explain why the number $e$ is the natural base for an exponential model;
- differentiate $e^{kx}$ and $a^{kx}$, and interpret the result as a rate of
  change;
- explain why a quantity whose rate of change is proportional to its size
  follows an exponential model;
- convert between exponential and logarithmic form, and use the laws of
  logarithms;
- solve an equation of the form $a^x = b$ by taking logarithms;
- solve quadratic equations in $e^x$ or $a^x$;
- use a logarithmic graph to estimate the parameters in $y = ax^n$ and
  $y = kb^x$;
- model growth and decay in context, including compound interest, radioactive
  decay and drug concentration;
- state the limitations of an exponential model.

## Where it is used

Exponentials describe anything that grows or shrinks by a fixed factor in equal
steps of time. Money in a savings account, a population of bacteria, a dose of
medicine, a radioactive sample and the charge in a capacitor all follow the
same curve. Logarithmic scales turn that curve into a straight line, which is
how scientists read a growth constant from a graph. The exponential function is
also the one function whose slope equals its value, so it sits at the heart of
calculus. The next chapter differentiates $e^{kx}$ and $\ln x$, and the chapter
after integrates them.

## Your turn to connect it

Think of something in your own life that grows or shrinks by a fixed factor.
It could be a savings balance, a rumour spreading, a phone battery draining, or
a cooling drink. Write down the quantity, the factor for each time step, and one
question about it that a graph could answer.

:::figure relevance-prompt

## Roadmap

1. [6.1 The functions a^x and e^x](Section 6.1/Walkthrough/index.md)
2. [6.2 The gradient of e^kx and the exponential model](Section 6.2/Walkthrough/index.md)
3. [6.3 Logarithms and the laws of logarithms](Section 6.3/Walkthrough/index.md)
4. [6.4 Solving equations of the form a^x = b](Section 6.4/Walkthrough/index.md)
5. [6.5 Logarithmic graphs and estimating parameters](Section 6.5/Walkthrough/index.md)
6. [6.6 Exponential growth and decay in modelling](Section 6.6/Walkthrough/index.md)
7. [Review](Review/index.md)
