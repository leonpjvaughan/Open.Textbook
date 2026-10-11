---
title: 3.5 Circular motion — Learn
chapter: 3
chapter_title: Mechanics
section: '3.5'
section_title: Circular motion
dfe:
- AP3
kind: walkthrough
---

# 3.5 Circular motion — Learn

**Prerequisites:** Newton's second law from Section 3.2; resolving a vector into
components from Section 2.2; the ratio of an arc to a radius; rearranging a
formula.

**By the end of this section you can:** measure an angle in radians; find the
angular velocity of an object moving in a circle; use $v = \omega r$; and apply
the equations for centripetal acceleration and centripetal force.

## 1. Angles in radians

An angle can be measured in **radians** instead of degrees. One radian is the
angle at the centre of a circle that cuts off an arc equal in length to the
radius.

$$ \theta = \frac{s}{r} $$

Here $s$ is the arc length and $r$ is the radius. Because the ratio of two
lengths has no unit, an angle in radians is a pure number.

A full circle has an arc length of $2\pi r$, so

$$ 2\pi\ \text{rad} = 360^\circ $$

To change degrees to radians, multiply by $\dfrac{\pi}{180}$. To change radians
to degrees, multiply by $\dfrac{180}{\pi}$.

**Worked example 1.** Write $150^\circ$ in radians.

$$ 150 \times \frac{\pi}{180} = \frac{5\pi}{6} = 2.62\ \text{rad} $$

## 2. Angular velocity

**Angular velocity** $\omega$ is the rate of change of angle.

$$ \omega = \frac{\Delta\theta}{\Delta t} $$

It is measured in radians per second, $\text{rad}\,\text{s}^{-1}$. For an object
that goes round a circle once in a time $T$, the angle changes by $2\pi$ in one
period, so

$$ \omega = \frac{2\pi}{T} = 2\pi f $$

where $f = 1/T$ is the frequency of rotation.

The speed of the object along the circle is the arc length per unit time. Over
one period it travels $2\pi r$, so

$$ v = \frac{2\pi r}{T} = \omega r $$

The speed is larger for a point farther from the centre, because it travels a
larger circle in the same time.

**Worked example 2.** A wheel spins at 300 revolutions per minute. Find its
angular velocity in radians per second.

$$
300\,\text{rev}\,\text{min}^{-1} = \frac{300}{60} = 5.0\,\text{rev}\,\text{s}^{-1}
$$

so

$$ \omega = 2\pi f = 2\pi \times 5.0 = 31.4\,\text{rad}\,\text{s}^{-1} $$

## 3. Centripetal acceleration

An object moving in a circle at constant **speed** still has a changing
velocity, because its direction changes. A change in velocity means an
acceleration.

The acceleration points towards the centre of the circle. It is called the
**centripetal acceleration**, and its size is

$$ a = \frac{v^2}{r} = \omega^2 r $$

The direction is always towards the centre, even though the velocity is along
the tangent. If the string holding a ball breaks, the ball flies off along the
tangent, because that is the direction of the velocity at the instant the
centripetal force disappears.

**Worked example 3.** A car goes round a roundabout of radius 40 m at a constant
$12\,\text{m}\,\text{s}^{-1}$. Find its centripetal acceleration.

$$ a = \frac{v^2}{r} = \frac{12^2}{40} = \frac{144}{40} = 3.6\,\text{m}\,\text{s}^{-2} $$

The acceleration is $3.6\,\text{m}\,\text{s}^{-2}$ towards the centre of the
roundabout.

## 4. Centripetal force

Newton's second law says that a resultant force is needed to produce the
centripetal acceleration. That force points towards the centre and is called the
**centripetal force**.

$$ F = ma = \frac{mv^2}{r} = m\omega^2 r $$

The centripetal force is not a new kind of force. It is the name for whatever
resultant force happens to point towards the centre. It may be provided by
tension, friction, gravity, a normal reaction, or a combination.

| Situation | What provides the centripetal force |
|---|---|
| Ball on a string | tension in the string |
| Car on a roundabout | friction between the tyres and the road |
| Satellite in orbit | gravitational force |
| Conical pendulum | horizontal component of the tension |
| Car on a banked track | horizontal component of the normal reaction |

**Worked example 4.** A ball of mass 0.50 kg is whirled in a horizontal circle
of radius 0.80 m at $3.0\,\text{m}\,\text{s}^{-1}$. Find the tension in the
string.

$$ T = \frac{mv^2}{r} = \frac{0.50 \times 3.0^2}{0.80} = \frac{4.5}{0.80} = 5.6\,\text{N} $$

## 5. Motion in a vertical circle

In a vertical circle the speed changes, because gravity does work on the object.
At the **top** of the circle, both the weight and the force from the track or
string act downwards, towards the centre. Their sum provides the centripetal
force.

For a bucket of water swung in a vertical circle, the water stays in the bucket
at the top when its weight is no more than the centripetal force needed.

$$ mg = \frac{mv^2}{r} \quad\Rightarrow\quad v = \sqrt{gr} $$

This is the **minimum** speed at the top. Below it, the water would fall away
from the bucket.

**Worked example 5.** A bucket of water is swung in a vertical circle of radius
0.60 m. Find the minimum speed at the top for the water to stay in the bucket.

$$ v = \sqrt{gr} = \sqrt{9.81 \times 0.60} = 2.4\,\text{m}\,\text{s}^{-1} $$

**Worked example 6.** The roller-coaster car of mass 500 kg passes the top of
the 12 m loop at $20.3\,\text{m}\,\text{s}^{-1}$. Find the centripetal
acceleration and the force the track exerts on the car. Take
$g = 9.81\,\text{m}\,\text{s}^{-2}$.

$$
\begin{aligned}
a &= \frac{v^2}{r} = \frac{20.3^2}{12} = \frac{412}{12} = 34.3\,\text{m}\,\text{s}^{-2} \\
F &= ma = 500 \times 34.3 = 1.72 \times 10^4\,\text{N}
\end{aligned}
$$

At the top of the loop the weight also acts downwards, so the track force is
smaller than the total:

$$
\begin{aligned}
F_{\text{net}} &= mg + N \\
N &= F_{\text{net}} - mg \\
  &= 500(34.3 - 9.81) \\
  &= 1.23 \times 10^4\,\text{N}
\end{aligned}
$$

The track pushes down on the car with about $1.2 \times 10^4\,\text{N}$.

> **Watch out.** There is no outward **centrifugal force** acting on the object.
> It is tempting to invent an outward force to balance the inward one, because
> the object does not move towards the centre in the rotating frame of the
> object. But the acceleration is towards the centre, and Newton's second law
> needs a resultant force in that direction. If you add an outward force to make
> the forces balance, the resultant becomes zero and there is no reason for the
> object to move in a circle at all. Name the real force that provides the
> centripetal force, and check that it points towards the centre.

## 6. Try it: speed and radius

The figure shows a small object moving in a horizontal circle. Two sliders set
the speed and the radius.

**Predict first.** Do not move the sliders yet. Write down your answers.

1. If you double the speed and keep the radius the same, what happens to the
   centripetal acceleration?
2. If you double the radius and keep the speed the same, what happens to the
   centripetal acceleration?
3. What happens to the centripetal acceleration if you double both the speed and
   the radius?

**Test.** Set the radius to 2.0 m and increase the speed. Read the acceleration
and the force. Then keep the speed fixed and change the radius. Check each
prediction.

**Explain.** Why is the acceleration larger when the speed is larger, and
smaller when the radius is larger? Write two or three sentences. Use the ideas
that the direction of the velocity changes faster at a higher speed, and that a
larger circle bends the path more gently.

:::figure circular-motion

## Progress check

Return to the chapter problem. The car and riders have a mass of 500 kg and pass
the top of the 12 m loop at $20.3\,\text{m}\,\text{s}^{-1}$.

1. Find the centripetal acceleration at the top of the loop.
2. Find the minimum speed the car needs at the top to stay on the track.
3. Find the force the track exerts on the car at the top of the loop.

If question 1 goes wrong, use $a = \dfrac{v^2}{r}$ with $r = 12\,\text{m}$. If
question 2 goes wrong, the minimum speed satisfies $v^2 = gr$. If question 3
goes wrong, the track force plus the weight provide the centripetal force, so
$N + mg = \dfrac{mv^2}{r}$.

## You should now be able to

- measure an angle in radians and convert between radians and degrees;
- find the angular velocity of an object from its period or frequency;
- use $v = \omega r$ to relate speed to angular velocity;
- calculate the centripetal acceleration and state its direction;
- calculate the centripetal force and name the force that provides it;
- explain why there is no centrifugal force on the object;
- find the minimum speed at the top of a vertical circle.
