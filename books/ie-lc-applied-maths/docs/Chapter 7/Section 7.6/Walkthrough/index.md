---
title: 7.6 Simple harmonic motion — Learn
chapter: 7
chapter_title: Circular motion and oscillation
section: '7.6'
section_title: Simple harmonic motion
tier: H
refs:
- S3
kind: walkthrough
---

# 7.6 Simple harmonic motion — Learn

**Prerequisites:** Section 3.4, differentiation and the chain rule; Section 7.5,
Hooke's law and $T = kx$.

**Objectives:** define simple harmonic motion; show that a mass on a spring moves
with simple harmonic motion; use $a = -\omega^2 x$; find the period from
$T = 2\pi\sqrt{\dfrac{m}{k}}$; find the maximum speed and the maximum
acceleration.

A mass on a spring, pulled down and released, moves up and down for a while. A
pendulum swings, a guitar string vibrates, a car bounces on its suspension. These
are all the same kind of motion, and this section gives it a name and an
equation.

## What simple harmonic motion is

**Simple harmonic motion** (SHM) is motion in which the acceleration is
proportional to the displacement from a fixed point, and directed towards that
point:

$$a = -\omega^2 x$$

Here $x$ is the displacement from the **equilibrium position**, measured in
metres, and $\omega$ is a positive constant measured in rad/s. The minus sign
says the acceleration always points back towards the equilibrium position, which
is why this is called a restoring acceleration.

The **amplitude** $A$ is the greatest distance from the equilibrium position. The
mass moves back and forth between $x = A$ and $x = -A$.

## A mass on a spring moves with SHM

Take a mass $m$ on a spring of stiffness $k$, and measure the displacement from
the equilibrium position. When the mass is displaced by $x$, the spring pulls it
back with the force $-kx$. Newton's second law gives

$$ma = -kx, \qquad a = -\frac{k}{m}x$$

This has the form $a = -\omega^2 x$, so the motion is simple harmonic, with

$$\omega^2 = \frac{k}{m}, \qquad \omega = \sqrt{\frac{k}{m}}$$

The period follows from $T = \dfrac{2\pi}{\omega}$:

$$T = 2\pi\sqrt{\frac{m}{k}}$$

A stiffer spring gives a shorter period. A larger mass gives a longer period.
The period does not contain the amplitude, so a large swing and a small swing take
the same time.

**Example 1.** A mass of $0.5$ kg is attached to a spring of stiffness $8$ N/m.
Find the angular frequency and the period.

$$\omega = \sqrt{\frac{k}{m}} = \sqrt{\frac{8}{0.5}} = \sqrt{16}
= 4\ \text{rad/s}$$

$$T = \frac{2\pi}{\omega} = \frac{2\pi}{4} = \frac{\pi}{2} \approx 1.57\ \text{s}$$

## The displacement, the speed and the acceleration

If the mass is released from rest at $x = A$ at time $t = 0$, its displacement at
time $t$ is

$$x = A\cos\omega t$$

Differentiate once to find the speed, and again to find the acceleration:

$$v = \frac{dx}{dt} = -A\omega\sin\omega t$$

$$a = \frac{dv}{dt} = -A\omega^2\cos\omega t = -\omega^2 x$$

The last line confirms the definition, so the cosine really does describe simple
harmonic motion. Notice that the acceleration is a maximum when the displacement
is a maximum, and zero at the centre.

The speed is greatest when the mass passes through the equilibrium position. The
largest value of $\sin\omega t$ is $1$, so the **maximum speed** is

$$v_{\max} = A\omega$$

The **maximum acceleration** is at the extremes, where $\cos\omega t = \pm 1$:

$$a_{\max} = A\omega^2$$

**Example 2.** For the mass in Example 1, the amplitude is $0.1$ m. Find the
maximum speed and the maximum acceleration.

$$v_{\max} = A\omega = 0.1 \times 4 = 0.4\ \text{m/s}$$

$$a_{\max} = A\omega^2 = 0.1 \times 4^2 = 0.1 \times 16 = 1.6\ \text{m/s}^2$$

**Example 3.** The chapter-problem car of mass $1200$ kg rests on springs of
total stiffness $120000$ N/m. Find the angular frequency and the period of its
bounce.

$$\omega = \sqrt{\frac{k}{m}} = \sqrt{\frac{120000}{1200}} = \sqrt{100}
= 10\ \text{rad/s}$$

$$T = \frac{2\pi}{\omega} = \frac{2\pi}{10} = \frac{\pi}{5} \approx 0.628\ \text{s}$$

The car bounces about five times in three seconds. The period does not depend on
how far the car is pushed down.

> **Watch out.** The period of a simple harmonic motion does not depend on the
> amplitude. A common error is to expect a bigger push to take longer, or to put
> the amplitude into $T = 2\pi\sqrt{\dfrac{m}{k}}$; the amplitude is not in that
> formula. A second error is to use degrees in $x = A\cos\omega t$. The
> $\omega t$ inside a cosine is an angle in radians, because $\omega$ is measured
> in rad/s. A third error is to mix up the displacement and the amplitude: the
> displacement $x$ changes all the time, while the amplitude $A$ is its greatest
> value.

## Progress check

Back to the chapter problem. The car of mass $1200$ kg rests on springs of total
stiffness $120000$ N/m. You found the compression in Section 7.5.

Find the angular frequency:

$$\omega = \sqrt{\frac{k}{m}} = \sqrt{\frac{120000}{1200}}
= \underline{\hspace{2cm}}\ \text{rad/s}$$

Then find the period of the bounce:

$$T = \frac{2\pi}{\omega} = \underline{\hspace{2cm}}\ \text{s}$$

Give your answer to three significant figures. The Review brings together every
part of the chapter problem, from the roundabout to the bounce.

## You should now be able to

- define simple harmonic motion as $a = -\omega^2 x$;
- explain why the acceleration is called restoring;
- show that a mass on a spring moves with simple harmonic motion, and find
  $\omega = \sqrt{\dfrac{k}{m}}$;
- use $T = 2\pi\sqrt{\dfrac{m}{k}}$;
- explain why the period does not depend on the amplitude;
- write down $x = A\cos\omega t$ for a mass released from rest at $x = A$;
- differentiate to find the speed and the acceleration;
- find the maximum speed $A\omega$ and the maximum acceleration $A\omega^2$.
