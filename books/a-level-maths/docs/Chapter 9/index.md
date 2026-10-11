---
title: 'Chapter 9: Numerical methods'
chapter: 9
strand: pure
anchor: When does the drone land, and how much water flows down the channel?
---

# Chapter 9: Numerical methods

## The chapter problem: the landing drone and the river survey

A delivery drone starts its descent $40$ metres above a landing pad. Its height
$h$ metres, $t$ seconds after the descent begins, is modelled by

$$
h(t) = 40e^{-t/4} - 2t.
$$

The drone lands when $h = 0$. No rearrangement or standard function solves
$40e^{-t/4} - 2t = 0$ exactly, so the landing time has to be found by a numerical
method. The model is not perfect, but it answers the question the operator
needs: how long until the rotors stop?

The second question comes from a river survey. An engineer measures the water
depth every $2$ metres across a $12$ metre channel:

| Distance across (m) | $0$ | $2$ | $4$ | $6$ | $8$ | $10$ | $12$ |
|---|---|---|---|---|---|---|---|
| Depth (m) | $0$ | $1.2$ | $2.5$ | $3.1$ | $2.4$ | $0.9$ | $0$ |

The cross-sectional area of the water is needed to find the flow rate. The
survey gives a table of heights, not a formula, so the area is estimated from
the readings rather than integrated exactly.

By the end of the chapter you will answer both parts. You will show that the
landing time lies between two whole seconds, then narrow the interval and use a
recurrence relation to reach an answer correct to three decimal places. You will
also estimate the channel's cross-sectional area from the table, and explain why
the answer is an estimate rather than an exact value.

> **First contact — no working needed yet.** Look at the height model. At
> $t = 0$ the drone is $40$ m up. Predict whether the drone lands before or after
> $6$ seconds, and write down one reason for your prediction.
>
> Then look at the depth table. The depths do not follow a straight line. Predict
> whether the cross-sectional area is larger or smaller than the rectangle
> $12 \times 2 = 24$ square metres. Write your prediction down before you read
> on.

<details markdown="1">
<summary>If you are not sure where to start</summary>

For the drone, work out the height at $5$ seconds and at $6$ seconds by
substituting into the model. If the height changes sign between the two times,
the drone lands somewhere in between.

For the channel, add up the six depths and divide by $6$ to estimate the mean
depth. Multiply the mean depth by the width of the channel.
</details>

## By the end of this chapter you will be able to

- explain what a root of an equation is and how it appears on a graph;
- use a change of sign to show that a root lies in an interval;
- narrow an interval to locate a root to a required accuracy;
- explain how a change-of-sign search can fail;
- solve an equation approximately with a recurrence relation $x_{n+1} = g(x_n)$;
- draw and interpret cobweb and staircase diagrams, and explain why an iteration
  converges or diverges;
- use the Newton–Raphson formula and explain where it comes from;
- explain why a chosen starting value or rearrangement can make a method fail;
- use the trapezium rule to estimate the area under a curve or from a table;
- decide whether a trapezium-rule estimate is an overestimate or an
  underestimate, and state limits it must lie between;
- choose a numerical method for a problem in context and explain the choice.

## Where it is used

Most equations that describe the real world have no exact solution. An engineer
sizing a beam, a pharmacist computing a dose or a pilot finding a flight path
meets equations such as $x + \ln x = 3$ or $e^x = 3x$, and there is no formula
for the answer. Numerical methods turn those equations into arithmetic a
computer can repeat until the answer is close enough.

The same idea runs the other way. When a quantity is measured rather than
described by a formula, the readings come as a table, and the area or volume
between them is estimated from the points that were recorded. Weather data,
vehicle speed traces and medical scans are all handled this way.

Numerical methods also connect to calculus. Chapter 7 measured a gradient from a
shrinking chord, and Chapter 8 measured an area from thin strips. Both are
numerical ideas at heart, and the trapezium rule is the next step on from the
strip sums of Section 8.4.

## Your turn to connect it

Think of a time you had to measure or work out something that had no simple
formula. It could be the amount of paint for a curved wall, the time a journey
will take, or the number of people at a festival. Write down the quantity, why
an exact method is hard, and whether you would need a very close answer or a
rough one. Keep your answer for the Review.

## Roadmap

1. [9.1 Locating roots by change of sign](Section 9.1/Walkthrough/index.md)
2. [9.2 Simple iterative methods, cobweb and staircase diagrams](Section 9.2/Walkthrough/index.md)
3. [9.3 Newton–Raphson and other recurrence relations](Section 9.3/Walkthrough/index.md)
4. [9.4 The trapezium rule and limits on the estimate](Section 9.4/Walkthrough/index.md)
5. [9.5 Numerical methods in context](Section 9.5/Walkthrough/index.md)
6. [Review](Review/index.md)
