---
title: 8.8 Interpreting differential-equation solutions in context — Learn
chapter: 8
chapter_title: Integration
section: '8.8'
section_title: Interpreting differential-equation solutions in context
dfe:
- H8
- OT3
kind: walkthrough
---

# 8.8 Interpreting differential-equation solutions in context — Learn

**Prerequisites:** solving separable differential equations from Section 8.7;
the exponential model and logarithms from Chapter 6.

**By the end of this section you can:** build a differential equation from a
written description; solve it; find a required value or time from the solution;
describe the long-term behaviour; and name the limitations of the model.

## 1. From words to an equation

A rate proportional to a quantity becomes a differential equation. The words
tell you the sign and the constant.

- "grows at a rate proportional to the amount present" gives
  $\dfrac{dP}{dt} = kP$ with $k > 0$.
- "decays at a rate proportional to the amount present" gives
  $\dfrac{dm}{dt} = -km$ with $k > 0$.
- "cools at a rate proportional to the difference from the room" gives
  $\dfrac{dT}{dt} = -k(T - T_s)$, where $T_s$ is the surrounding temperature.

**Example 1.** A cup of tea cools according to $\dfrac{dT}{dt} = -0.1(T - 20)$,
with $T = 90$ when $t = 0$ and $t$ in minutes. Find $T$ in terms of $t$, and
describe the temperature in the long run.

Separate the variables:

$$
\int \frac{1}{T - 20}dT = \int -0.1dt.
$$

Integrate:

$$
\ln|T - 20| = -0.1t + C.
$$

Exponentiate, with $A = e^C$:

$$
T - 20 = Ae^{-0.1t},
\qquad
T = 20 + Ae^{-0.1t}.
$$

Substitute $t = 0$, $T = 90$: $90 = 20 + A$, so $A = 70$. Therefore

$$
T = 20 + 70e^{-0.1t}.
$$

In the long run the term $70e^{-0.1t}$ tends to zero, so the temperature
approaches the room temperature of $20$°C. This is the **limiting value**, or
steady state.

## 2. Finding a value or a time

The solution gives the quantity at any time. To find when the quantity reaches a
given value, substitute the value and solve for the time.

**Example 2.** A population satisfies $\dfrac{dP}{dt} = 0.02P$ with $P = 5000$
when $t = 0$ and $t$ in years. Find the population after $10$ years, and find
the time for the population to double.

Separate and integrate:

$$
\ln P = 0.02t + C,
\qquad
P = 5000e^{0.02t}.
$$

After $10$ years:

$$
P = 5000e^{0.2} \approx 6107 \text{ to the nearest whole number}.
$$

To double, set $P = 10000$:

$$
10000 = 5000e^{0.02t},
\qquad
2 = e^{0.02t},
\qquad
0.02t = \ln 2,
\qquad
t = \frac{\ln 2}{0.02} \approx 34.7 \text{ years}.
$$

The doubling time is about $34.7$ years. It does not depend on the starting
population, because every value doubles in the same time.

## 3. Links to kinematics

In kinematics the rate of change of velocity is acceleration, and the rate of
change of displacement is velocity. A separable equation gives the velocity as a
function of time.

**Example 3.** A small ball is dropped in a thick fluid. Its velocity $v$
satisfies $\dfrac{dv}{dt} = 9.8 - 2v$ with $v = 0$ when $t = 0$, and $t$ in
seconds. Find $v$ in terms of $t$ and describe the motion.

Separate:

$$
\int \frac{1}{9.8 - 2v}dv = \int 1dt.
$$

Integrate the left side. The derivative of $\ln|9.8 - 2v|$ is
$\dfrac{-2}{9.8 - 2v}$, so a factor of $-\dfrac{1}{2}$ is needed:

$$
-\frac{1}{2}\ln|9.8 - 2v| = t + C.
$$

Rearrange and exponentiate:

$$
9.8 - 2v = Ae^{-2t}.
$$

Substitute $t = 0$, $v = 0$: $9.8 = A$. Therefore

$$
v = \frac{9.8 - 9.8e^{-2t}}{2} = 4.9\left(1 - e^{-2t}\right).
$$

As $t$ grows, $e^{-2t} \to 0$ and $v \to 4.9$ m/s. This is the **terminal
velocity**, where the drag balances gravity and the acceleration is zero.

## 4. Limitations of a model

A solution describes the model, not the world. The model has limits, and a good
answer names them.

- The rate constant is assumed constant. It may change as conditions change.
- The model is assumed valid for the whole range of the variable. A population
  model may fail once food or space runs out.
- A limiting value may only be approached. The cooling model predicts that the
  temperature equals room temperature only after infinite time.
- Real data has variation. A smooth solution is an idealised curve through
  noisy measurements.

> **Watch out.** Three mistakes are common.
>
> **Putting the sign in the wrong place.** Growth has a positive constant and
> decay has a negative one. Decide from the words whether the quantity rises or
> falls before you write the equation.
>
> **Ignoring the surroundings in a cooling model.** The rate depends on
> $T - T_s$, not on $T$ alone. Using $\dfrac{dT}{dt} = -kT$ gives a limiting
> temperature of $0$°C, not the room temperature.
>
> **Reporting the limiting value as reached.** The model approaches the limiting
> value but never attains it in finite time. **Re-check:** after solving,
> identify the initial value, the direction of change, and the limiting value,
> and check that all three match the context.

## Progress check

Return to the cooling drink in the chapter problem. The coffee starts at $90$°C
in a room at $20$°C, and after $20$ minutes it is $55$°C.

1. Write the differential equation for the temperature $T$ at time $t$.
2. Solve it to show that $T = 20 + 70e^{-kt}$.
3. Use the temperature at $20$ minutes to find $k$.
4. Find the temperature after $40$ minutes.
5. Explain what happens to the temperature in the long run, and give one
   limitation of the model.

## You should now be able to

- translate a proportional rate into a differential equation with the correct
  sign;
- solve the equation and apply an initial condition;
- find a quantity at a given time, or the time for a given value;
- describe the limiting value and the long-term behaviour;
- use a differential equation in a kinematics context;
- state the limitations of a model.
