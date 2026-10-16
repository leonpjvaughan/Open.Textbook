---
title: 7.1 Angular velocity and period — Learn
chapter: 7
chapter_title: Circular motion
section: '7.1'
section_title: Angular velocity and period
tier: O
refs:
- '1.6'
kind: walkthrough
---

# 7.1 Angular velocity and period — Learn

**Prerequisites:** speed and acceleration from Chapter 2; units and prefixes from
Chapter 1.

**Objectives:** define the period and the frequency of a circular motion; define angular
velocity; use $\omega = \dfrac{2\pi}{T} = 2\pi f$ and $v = r\omega$.

By the end of this section, you can describe how fast something turns, and link that
turning to the speed of a point on it.

## One turn, and how long it takes

Some things turn rather than travel in a straight line. A wheel, a fan, a drum and a
planet all turn about an axis. Two numbers describe the turning.

- The **period** $T$ is the time for one complete turn. It is measured in seconds (s).
- The **frequency** $f$ is the number of complete turns in one second. It is measured in
  hertz (Hz).

The two are reciprocals of each other:

$$f = \frac{1}{T} \qquad T = \frac{1}{f}$$

A drum that turns once every 0.20 s has a frequency of 5.0 Hz. A frequency of 5.0 Hz
means five complete turns every second.

## Angular velocity

A wheel that turns faster covers a larger angle in the same time. The rate at which the
angle changes is the **angular velocity**.

> **Angular velocity.** The angular velocity is the angle turned through per unit time.
> It is measured in radians per second (rad/s).

The angle is measured in radians, not degrees. One complete turn is $2\pi$ radians,
which is about 6.28 radians. A radian is the angle that makes the arc of a circle equal
to its radius, and it makes the equation $v = r\omega$ true with no extra factor.

One complete turn is $2\pi$ radians and takes one period $T$, so

$$\omega = \frac{2\pi}{T}$$

Putting $T = \dfrac{1}{f}$ into that equation gives a second form:

$$\omega = 2\pi f$$

- $\omega$ is the angular velocity, in radians per second (rad/s);
- $T$ is the period, in seconds (s);
- $f$ is the frequency, in hertz (Hz).

## The speed of a point on the rim

A point on the rim of a turning wheel travels the circumference, $2\pi r$, in one
period. Its speed is therefore

$$v = \frac{2\pi r}{T} = r\omega$$

The farther a point is from the axis, the faster it moves for the same angular velocity.
Every point on a wheel has the same $\omega$, but the rim has the largest $v$.

**Example 1.** A ceiling fan turns 900 times in 60 s. Calculate its frequency and its
period.

$$
f = \frac{900}{60} = 15\,\text{Hz}
$$

$$
T = \frac{1}{f} = \frac{1}{15} = 0.067\,\text{s}
$$

**Example 2.** Calculate the angular velocity of the same fan.

$$
\omega = 2\pi f
$$

$$
\omega = 2\pi \times 15 = 94\,\text{rad/s}
$$

**Example 3.** A bicycle wheel has a radius of 0.34 m and turns at 2.0 revolutions per
second. Calculate its angular velocity and the speed of a point on the rim.

$$
\omega = 2\pi f = 2\pi \times 2.0 = 12.6\,\text{rad/s}
$$

$$
v = r\omega = 0.34 \times 12.6 = 4.3\,\text{m/s}
$$

**Example 4.** A wheel rolls so that a point on its rim moves at 3.0 m/s. Its radius is
0.30 m. Calculate the angular velocity.

$$
\omega = \frac{v}{r}
$$

$$
\omega = \frac{3.0}{0.30} = 10\,\text{rad/s}
$$

## Converting revolutions per minute

A washing machine and a car engine are often described in revolutions per minute, or
rpm. The formulas use revolutions per second, so divide by 60 to convert.

$$f = \frac{\text{rpm}}{60}$$

A drum at 1400 rpm has $f = \dfrac{1400}{60} = 23.3\,\text{Hz}$. Its period is
$T = \dfrac{1}{23.3} = 0.043\,\text{s}$, and its angular velocity is
$\omega = 2\pi \times 23.3 = 1.5 \times 10^{2}\,\text{rad/s}$.

> **Watch out.** The formulas use revolutions per **second**, not per minute.
> Forgetting to divide by 60 makes every answer 60 times too large. A drum at 1400 rpm is
> not turning 1400 times every second, which would be faster than any real machine.
> Check the units before you substitute.

## Progress check

Back to the chapter problem. The drum has a radius of 0.24 m and turns at 1400
revolutions per minute.

1. Calculate the frequency of the drum in hertz.
2. Calculate the period of one turn.
3. Calculate the angular velocity of the drum.
4. Calculate the speed of a point on the drum wall.

Keep your answers. Section 7.2 uses the angular velocity to find the centripetal
acceleration, and Section 7.3 uses the speed to find the force on the towel.

## You should now be able to

- define the period and the frequency of a circular motion, with the unit of each;
- convert a rate in revolutions per minute into hertz;
- define angular velocity and state its unit;
- use $\omega = \dfrac{2\pi}{T}$ and $\omega = 2\pi f$;
- use $v = r\omega$ to find the speed of a point on a turning body;
- explain why every point on a wheel has the same angular velocity but not the same
  speed.
