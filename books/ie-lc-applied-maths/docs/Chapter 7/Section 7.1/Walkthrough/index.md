---
title: 7.1 Angular velocity and period — Learn
chapter: 7
chapter_title: Circular motion and oscillation
section: '7.1'
section_title: Angular velocity and period
tier: O
refs:
- S3
kind: walkthrough
---

# 7.1 Angular velocity and period — Learn

**Prerequisites:** Section 3.1, displacement, velocity and acceleration; radians
from your mathematics course.

**Objectives:** define angular velocity and period; convert revolutions to
radians; use $\omega = \dfrac{2\pi}{T}$ and $v = \omega r$; find a period from an
angular velocity.

A body moving in a circle turns through the same angle in equal times. Two
numbers describe that motion: how fast the angle turns, and how long one
complete turn takes. Together they connect the angle to the distance travelled.

## Measuring an angle in radians

An angle can be measured in degrees or in radians. A full turn is $360^\circ$ or
$2\pi$ radians. So

$$180^\circ = \pi\ \text{rad}, \qquad 90^\circ = \frac{\pi}{2}\ \text{rad}$$

One complete revolution is an angle of $2\pi$ radians. A quarter turn is
$\dfrac{\pi}{2}$ radians. Radians are the natural unit for this chapter, because
the arc travelled is the angle times the radius.

## Period and frequency

The **period** $T$ is the time for one complete revolution, measured in seconds.
The **frequency** $f$ is the number of revolutions each second:

$$f = \frac{1}{T}$$

Frequency is measured in hertz, written Hz. A wheel with period $0.5$ s has a
frequency of $2$ Hz, because it turns twice each second.

## Angular velocity

The **angular velocity** $\omega$ (the Greek letter omega) is the angle turned
each second:

$$\omega = \frac{\text{angle turned}}{\text{time taken}}$$

In one complete revolution the angle is $2\pi$ radians and the time is the period
$T$. So

$$\omega = \frac{2\pi}{T}$$

The unit of angular velocity is the radian per second, rad/s. Since
$f = \dfrac{1}{T}$, the same definition gives

$$\omega = 2\pi f$$

**Example 1.** A wheel turns $300$ times each minute. Find its angular velocity.

A rate of $300$ revolutions each minute is $300 \div 60 = 5$ revolutions each
second. So $f = 5$ Hz and

$$\omega = 2\pi f = 2\pi \times 5 = 10\pi \approx 31.4\ \text{rad/s}$$

The same answer comes from $\omega = \dfrac{2\pi}{T}$ with $T = 0.2$ s.

**Example 2.** A bicycle wheel has period $0.5$ s. Find its frequency and its
angular velocity.

$$f = \frac{1}{T} = \frac{1}{0.5} = 2\ \text{Hz}$$

$$\omega = \frac{2\pi}{T} = \frac{2\pi}{0.5} = 4\pi \approx 12.6\ \text{rad/s}$$

## Linking the angle to the distance

A point at distance $r$ from the centre travels all the way round the circle in
one period. The distance around the circle is the circumference, $2\pi r$, so its
speed along the circle is

$$v = \frac{2\pi r}{T} = \left(\frac{2\pi}{T}\right) r = \omega r$$

This gives the link between the two measures of rotation:

$$v = \omega r$$

Here $v$ is the **linear speed** along the circle, measured in m/s. On a rigid
body the angular velocity is the same for every point, but the linear speed grows
with the distance from the centre. A point on the rim of a wheel moves faster
than a point near the hub.

**Example 3.** A point on the rim of a wheel of radius $0.4$ m has angular
velocity $10\pi$ rad/s. Find its linear speed.

$$v = \omega r = 10\pi \times 0.4 = 4\pi \approx 12.6\ \text{m/s}$$

**Example 4.** A car goes round a roundabout of radius $20$ m at $10$ m/s. Find
its angular velocity and its period.

$$\omega = \frac{v}{r} = \frac{10}{20} = 0.5\ \text{rad/s}$$

$$T = \frac{2\pi}{\omega} = \frac{2\pi}{0.5} = 4\pi \approx 12.6\ \text{s}$$

> **Watch out.** The two measures of rotation describe different things. Angular
> velocity is measured in rad/s, and it is the same for every point on a rigid
> body. Linear speed is measured in m/s, and it depends on the radius. One
> common error is to use degrees inside $\omega = \dfrac{2\pi}{T}$; the formula
> already contains $2\pi$, so the angle must be in radians. A second error is to
> confuse the period with the frequency. The period is a time in seconds and the
> frequency is a count each second, and one is the reciprocal of the other.

## A guided investigation: how the linear speed depends on r and T

:::figure circular-motion

**Predict.** A point moves in a circle. If you double the radius but keep the
period the same, what happens to the linear speed? Write your prediction down.

**Test.** Move the radius slider and the period slider. Watch the readout for
$\omega$ and $v$, and watch how far the dot travels in one second.

**Explain.** Write two sentences that explain the pattern you found. Use
$v = \omega r$ in your explanation, and say which quantity stayed the same when
you changed the radius.

## Progress check

Back to the chapter problem. The car of mass $1200$ kg goes round the roundabout
of radius $20$ m at $10$ m/s.

Find the angular velocity:

$$\omega = \frac{v}{r} = \frac{10}{20} = \underline{\hspace{2cm}}\ \text{rad/s}$$

Then find the period:

$$T = \frac{2\pi}{\omega} = \underline{\hspace{2cm}}\ \text{s}$$

Keep both numbers. Section 7.2 uses the linear speed to find the centripetal
acceleration, and Section 7.4 uses the same geometry on a banked bend.

## You should now be able to

- define the period as the time for one revolution and the frequency as the
  number of revolutions each second;
- convert a rate in revolutions each minute to revolutions each second;
- define angular velocity and use $\omega = \dfrac{2\pi}{T}$ and
  $\omega = 2\pi f$;
- find a period from an angular velocity;
- use $v = \omega r$ to link the angular velocity to the linear speed;
- explain why the angular velocity is the same for every point on a rigid body
  but the linear speed is not.
