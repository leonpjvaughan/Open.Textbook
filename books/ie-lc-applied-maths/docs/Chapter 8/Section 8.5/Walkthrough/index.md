---
title: 8.5 Feedback and limited growth — Learn
chapter: 8
chapter_title: Modelling a changing world
section: '8.5'
section_title: Feedback and limited growth
tier: O
refs:
- S4
kind: walkthrough
---

# 8.5 Feedback and limited growth — Learn

**Prerequisites:** Section 8.2, exponential growth and decay; Section 8.4, fixed
points.

**Objectives:** solve $\dfrac{dP}{dt} = kP + c$; find the equilibrium; say
whether the equilibrium is stable; solve the lake model.

By the end of this section you can model a quantity that is pushed by a constant
input at the same time as it changes in proportion to itself.

## Two effects at once

Many real quantities are pulled in two directions at once. A lake receives
pollutant every day and loses it every day. A population is fed by births and
reduced by deaths and by a constant harvest. A loan grows by interest and shrinks
by fixed repayments.

The simplest model of this kind is

$$\frac{dP}{dt} = kP + c,$$

where $c$ is a constant. A positive $c$ is a steady input or growth, and a
negative $c$ is a steady loss. The term $kP$ is the part that depends on how much
is there.

## The equilibrium

Setting the rate to zero gives the **equilibrium** $L$:

$$kL + c = 0, \qquad L = -\frac{c}{k} \qquad (k \neq 0).$$

At $P = L$ the two effects balance and the quantity stops changing.

Whether the quantity returns to the equilibrium depends on the sign of $k$. If
$k < 0$, the proportional term pulls the quantity back towards $L$, and the
equilibrium is **stable**. If $k > 0$, the proportional term pushes it away, and
the equilibrium is **unstable**.

## The solution

The solution is the equilibrium plus an exponential that fades:

$$P = L + (P_0 - L)e^{kt},$$

where $P_0$ is the value at $t = 0$. You can check it by differentiating: the
constant $L$ differentiates to zero, and the exponential differentiates to
$k(P_0 - L)e^{kt} = k(P - L) = kP + c$.

**Example 1.** A lake receives pollutant at $20$ kg per day and loses it at a
rate $0.05P$. The model is

$$\frac{dP}{dt} = 20 - 0.05P, \qquad P_0 = 0.$$

Find $P$ in terms of $t$.

The equilibrium is

$$L = -\frac{20}{-0.05} = 400.$$

Here $k = -0.05 < 0$, so the equilibrium is stable. The solution is

$$P = 400 + (0 - 400)e^{-0.05t} = 400\left(1 - e^{-0.05t}\right).$$

The amount rises from zero towards $400$ kg and levels off there.

**Example 2.** A tank is filled at $6$ litres per minute and drains at a rate
$0.3V$. The model is

$$\frac{dV}{dt} = 6 - 0.3V, \qquad V_0 = 0.$$

Find $V$ in terms of $t$.

The equilibrium is $L = \dfrac{6}{0.3} = 20$, and $k = -0.3$, so

$$V = 20\left(1 - e^{-0.3t}\right).$$

The volume rises towards $20$ litres.

**Example 3.** A body cools so that $\dfrac{dT}{dt} = -0.1(T - 15)$, with
$T_0 = 90$°C. Find $T$ in terms of $t$.

Write the equation as $\dfrac{dT}{dt} = -0.1T + 1.5$. The equilibrium is
$L = 15$ and $k = -0.1$, so

$$T = 15 + (90 - 15)e^{-0.1t} = 15 + 75e^{-0.1t}.$$

The temperature falls from $90$°C towards $15$°C.

## When the input stops

If the steady input is removed, the model becomes $\dfrac{dP}{dt} = kP$ with
$k < 0$, which is the pure decay of Section 8.2.

**Example 4.** The factory closes, so the lake model becomes
$\dfrac{dP}{dt} = -0.05P$ with $P_0 = 400$ kg. Find $P$ in terms of $t$.

$$P = 400e^{-0.05t}.$$

The amount now falls towards zero. To find when it reaches a chosen level, set
$P$ equal to that level and solve for $t$.

> **Watch out.** The equilibrium is not the same as the constant $c$. It is
> $\dfrac{-c}{k}$, and in the lake model that is $400$, not $20$. A second trap is
> the sign of $k$: a stable equilibrium needs $k < 0$, so that the exponential
> fades. If you write the equation as $\dfrac{dP}{dt} = k(L - P)$ instead, the
> roles reverse and $k$ is positive. **Re-check:** put $t = 0$ into the solution
> and confirm you get $P_0$.

## Progress check

Back to the chapter problem. The lake model is

$$\frac{dP}{dt} = -0.05P, \qquad P_0 = 400\ \text{kg},$$

once the factory has closed. The safe level is $50$ kg.

1. Write the solution for $P$ in terms of $t$.
2. Set $P = 50$ and solve for $t$. Give the answer in days, both exactly and to
   one decimal place.
3. The equilibrium while the factory was open was $400$ kg. Explain in one
   sentence why the lake was not safe while the factory operated.

You have now answered the chapter problem. The Review brings together the whole
model and asks what it assumes about the lake.

## You should now be able to

- recognise the model $\dfrac{dP}{dt} = kP + c$;
- find the equilibrium $L = -\dfrac{c}{k}$;
- decide whether the equilibrium is stable from the sign of $k$;
- write the solution $P = L + (P_0 - L)e^{kt}$;
- solve the lake model while the input runs and after it stops;
- find the time to reach a chosen level.
