---
title: 'Chapter 8: Modelling a changing world'
chapter: 8
strand: changing-world
---

# Chapter 8: Modelling a changing world

Some quantities change in a way that depends on how much of them there already
is. Money in an account earns interest on the balance. A disease spreads faster
when more people are infected. A hot drink cools quickly at first, then slowly.
A pollutant leaves a lake at a rate set by how much is in the water.

Each of these is a model of **change**, and the mathematics that describes it is
the differential equation and the difference equation. This chapter builds those
models, solves them, and asks how far the answer can be trusted.

## The chapter problem

**Will the lake ever clear?** A factory releases a pollutant into a lake at a
constant rate of $20$ kg per day. The lake washes the pollutant out at a rate
proportional to how much is there, with a flush constant of $0.05$ per day.

While the factory is open, the amount $P$ changes as

$$\frac{dP}{dt} = 20 - 0.05P.$$

The lake settles at the level where the input and the output balance, which is
$P = 400$ kg. Then the factory closes and the input stops, so the model becomes

$$\frac{dP}{dt} = -0.05P.$$

The lake now clears. A safe level is $50$ kg, and the question is how long the
lake takes to reach it.

By the end of the chapter you can build the model, solve it, find that time, and
say what the model assumes about the lake that might not hold.

## By the end of this chapter you can

- read a rate of change and write down the differential equation it describes;
- solve $\dfrac{dP}{dt} = kP$ and use it for growth, decay, doubling time and
  half-life;
- build a recurrence relation for a quantity that changes in steps;
- solve a first-order difference equation and find its fixed point;
- model feedback, where a constant input is added to a rate proportional to the
  amount;
- use the logistic model and explain the carrying capacity;
- separate a differential equation and solve it, including with an initial
  condition;
- compare a discrete model with a continuous one, and explain why they need not
  agree.

## Where it is used

Population growth, the spread of disease, pollution and water quality,
radioactive decay, Newton's law of cooling, drug doses, loan repayments,
compound interest, and the logistic curve used for populations with limited
resources. Every one of these is the same piece of mathematics wearing different
clothes.

## Your turn to connect it

What changes in your life or your area at a rate set by how much of it there
already is?

Think of something that grows or shrinks faster when there is more of it. A
savings account, a rumour, a mobile phone battery, a queue at a busy time, the
number of people in a town. Choose one.

Write down what the quantity is, what makes it grow, and what makes it shrink.
You will be able to turn that description into an equation by the end of the
chapter. If you cannot yet see the equation, that is the point of starting here:
the modelling begins with the words.

:::figure relevance-prompt

## Sections

- **8.1 Rates of change and differential equations** — what a differential equation says
- **8.2 Exponential growth and decay** — the solution of $\dfrac{dP}{dt} = kP$
- **8.3 Recurrence relations as discrete models** — change that happens in steps
- **8.4 First-order difference equations** — solving a recurrence and finding its limit
- **8.5 Feedback and limited growth** — a constant input added to proportional change
- **8.6 The logistic model** — growth slowed by a carrying capacity
- **8.7 Solving separable differential equations** — separating the variables and integrating
- **8.8 Comparing a discrete and a continuous model** — when the two agree, and when they do not
