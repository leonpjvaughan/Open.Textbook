---
title: 'Chapter 8: Review'
chapter: 8
kind: review
---

# Chapter 8: Review

## The chapter problem, solved

**Will the lake ever clear?** A factory releases pollutant into a lake at
$20$ kg per day. The lake flushes pollutant out at a rate proportional to the
amount present, with flush constant $0.05$ per day. The safe level is $50$ kg.

**While the factory is open.** The model is

$$\frac{dP}{dt} = 20 - 0.05P, \qquad P = 0 \text{ when } t = 0.$$

The equilibrium is $L = \dfrac{20}{0.05} = 400$ kg, and it is stable. The
solution is

$$P = 400\left(1 - e^{-0.05t}\right).$$

The amount rises from zero and levels off at $400$ kg. It passes $50$ kg early
on and then stays well above it, so the lake is not safe while the factory
operates. The input keeps adding pollutant as fast as the lake removes it at that
level.

**After the factory closes.** The input stops, so the model becomes

$$\frac{dP}{dt} = -0.05P, \qquad P = 400 \text{ when } t = 0,$$

and the solution is

$$P = 400e^{-0.05t}.$$

**The time to a safe level.** Set $P = 50$:

$$400e^{-0.05t} = 50, \qquad e^{-0.05t} = \frac{1}{8}, \qquad -0.05t = -\ln 8.$$

$$t = \frac{\ln 8}{0.05} = 20\ln 8 \approx 41.6 \text{ days}.$$

The lake reaches the safe level after about $42$ days, or six weeks.

**The daily model agrees closely.** If the lake loses $5\%$ at the end of each
day, the model is $u_{n+1} = 0.95u_n$ with $u_0 = 400$. Setting $u_n = 50$ gives
$0.95^n = \dfrac{1}{8}$, so

$$n = \frac{\ln 8}{-\ln 0.95} \approx 40.5 \text{ days}.$$

The two models differ by about one day in forty. For this question the choice of
model does not change the practical answer: the lake is safe in about six weeks
either way.

**What the model assumes.** The model treats the lake as one well-mixed tank.
That means:

- the pollutant is spread evenly, so a sample from any point is typical;
- the flush constant $0.05$ per day stays the same as the level falls;
- nothing is added by rain, run-off or sediment, and nothing is stored in the
  mud at the bottom;
- the pollutant does not decay on its own, so removal is by water flow alone.

Each of these is a simplification. If the lake has stagnant corners, the real
clearing time is longer. If the pollutant settles into the sediment and is
released slowly, the tail of the decay is much longer than the model predicts.
The model gives a good first answer and a clear picture of the process, and the
list above is what a careful modeller reports alongside it.

## Mixed practice — choose the method first

Work through these without notes. For each one, decide **which model it is** and
say why, *before* you calculate anything. Some are continuous, some are discrete,
and one is neither.

:::problems chapter-08-review

:::answers chapter-08-review

## What you can now do

- read a rate of change and write the differential equation it describes;
- solve $\dfrac{dP}{dt} = kP$ and use it for growth, decay, doubling time and
  half-life;
- build a recurrence relation and find its fixed point;
- solve a first-order difference equation and write its closed form;
- model feedback and find the stable equilibrium;
- use the logistic model and explain the carrying capacity;
- separate a differential equation and find a general and a particular solution;
- compare a discrete model with a continuous one, including with Euler's method;
- state the assumptions a model makes and say which one matters most.

## Thinking back

Look back at the quantity you chose at the start of the chapter — something that
grows or shrinks faster when there is more of it.

You can now model it. Decide first whether the change is smooth or happens in
steps. A smooth change gives a differential equation; a change at fixed moments
gives a recurrence. Then decide what makes the quantity grow and what makes it
shrink. If the growth depends on how much is there, you have the term $kP$. If a
constant is added or removed at the same time, you have the feedback model of
Section 8.5. If the environment has a limit, you have the logistic model.

Write down your model and one assumption it makes. Then say what would change in
your answer if that assumption failed. That last sentence is the most valuable
part of a model, and it is exactly what the modelling project asks for.
