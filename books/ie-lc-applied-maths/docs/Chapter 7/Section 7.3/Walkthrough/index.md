---
title: 7.3 Circular motion in context — Learn
chapter: 7
chapter_title: Circular motion and oscillation
section: '7.3'
section_title: Circular motion in context
tier: O
refs:
- S3
kind: walkthrough
---

# 7.3 Circular motion in context — Learn

**Prerequisites:** Section 5.1, friction and the normal reaction; Section 5.2,
the coefficient of friction; Section 7.2, centripetal acceleration and force.

**Objectives:** find the friction force that holds a car on a flat bend; find the
greatest speed before the car slides; analyse a body at the top of a vertical
circle; find the condition to stay in contact.

A centripetal force must come from somewhere. On a flat bend it comes from
friction. In a vertical circle the weight takes a share, and the contact force
changes. This section works out how much force is available and what happens
when it runs out.

## A flat bend: friction supplies the force

A car of mass $m$ going round a flat bend of radius $r$ at speed $v$ needs a
force

$$F = \frac{mv^2}{r}$$

towards the centre. On a level road the only horizontal force is friction, so
friction must supply all of it.

The greatest friction the road can give is the limiting value $F_{\max} = \mu R$,
where $\mu$ is the coefficient of friction and $R$ is the normal reaction. On a
level road the normal reaction balances the weight, so $R = mg$. The car stays on
the bend while

$$\frac{mv^2}{r} \le \mu mg$$

The mass cancels, which gives the greatest speed:

$$v_{\max} = \sqrt{\mu g r}$$

**Example 1.** The chapter-problem roundabout has radius $20$ m. The coefficient
of friction between the tyres and the dry road is $0.8$. Find the greatest speed
at which the car can take the roundabout.

$$v_{\max} = \sqrt{\mu g r} = \sqrt{0.8 \times 9.8 \times 20} = \sqrt{156.8}
\approx 12.5\ \text{m/s}$$

The car's speed of $10$ m/s is below this, so the friction available is enough.

**Example 2.** The same roundabout on a wet day has $\mu = 0.4$. Find the
greatest speed.

$$v_{\max} = \sqrt{0.4 \times 9.8 \times 20} = \sqrt{78.4} \approx 8.85\ \text{m/s}$$

At $10$ m/s the car would slide. A lower coefficient of friction means a lower
greatest speed, so the driver must slow down.

## A vertical circle: the top of a loop

A body moving in a vertical circle has the same rule, but the forces are not all
horizontal. At the **top** of the circle the centre is directly below the body.
The weight points downwards, towards the centre, and so does the tension in a
string or the push from a track.

For a ball on a string at the top, the resultant towards the centre is
$T + mg$, so

$$T + mg = \frac{mv^2}{r}$$

and the tension is

$$T = \frac{mv^2}{r} - mg$$

The string stays taut only while $T \ge 0$. Setting $T = 0$ gives the least speed
at the top:

$$v_{\min} = \sqrt{gr}$$

Below that speed the string goes slack, or the ball leaves the track.

**Example 3.** A ball of mass $0.3$ kg moves in a vertical circle of radius
$0.8$ m. At the top of the circle its speed is $4$ m/s. Find the tension in the
string.

$$T = \frac{mv^2}{r} - mg = \frac{0.3 \times 4^2}{0.8} - 0.3 \times 9.8$$

$$T = \frac{4.8}{0.8} - 2.94 = 6 - 2.94 = 3.06\ \text{N}$$

The tension is positive, so the string is taut and the ball stays on its circle.
The least speed at the top is

$$v_{\min} = \sqrt{gr} = \sqrt{9.8 \times 0.8} = \sqrt{7.84} = 2.8\ \text{m/s}$$

**Example 4.** A car crosses a hump-back bridge whose top is an arc of a circle
of radius $40$ m. The car has mass $1200$ kg and speed $15$ m/s. Find the normal
reaction on the car at the top.

At the top the centre of the arc is below the car. The weight acts towards the
centre and the normal reaction acts away from it, so the resultant towards the
centre is $mg - R$:

$$mg - R = \frac{mv^2}{r}$$

$$R = mg - \frac{mv^2}{r} = 1200 \times 9.8 - \frac{1200 \times 15^2}{40}$$

$$R = 11760 - 6750 = 5010\ \text{N}$$

The reaction is smaller than the weight, because the car is accelerating
downwards. The car loses contact when $R = 0$, which happens at

$$v = \sqrt{gr} = \sqrt{9.8 \times 40} = \sqrt{392} \approx 19.8\ \text{m/s}$$

> **Watch out.** At the top of a vertical circle the weight acts towards the
> centre, not away from it. A common error is to write $mg = \dfrac{mv^2}{r}$ and
> forget the contact force. On a hump-back bridge the two forces point in
> opposite directions, so the resultant towards the centre is $mg - R$. At the
> top of a loop with a ball on a string they point the same way, so the resultant
> is $T + mg$. Draw the arrows before you write the equation. A second error is
> to use the speed at the top as the speed all the way round; in a vertical
> circle the speed changes as the body rises and falls.

## Progress check

Back to the chapter problem. The car of mass $1200$ kg is on the roundabout of
radius $20$ m. The coefficient of friction on the dry road is $0.8$.

Find the greatest speed at which the car can take the roundabout:

$$v_{\max} = \sqrt{\mu g r} = \sqrt{0.8 \times 9.8 \times 20}
= \underline{\hspace{2cm}}\ \text{m/s}$$

Compare this with the car's speed of $10$ m/s. Section 7.4 asks how a banked
bend changes the answer.

## You should now be able to

- explain that friction supplies the centripetal force on a flat bend;
- use $\dfrac{mv^2}{r} \le \mu mg$ and find $v_{\max} = \sqrt{\mu g r}$;
- explain why a lower coefficient of friction lowers the greatest speed;
- draw the forces on a body at the top of a vertical circle;
- use $T + mg = \dfrac{mv^2}{r}$ for a ball on a string at the top;
- use $mg - R = \dfrac{mv^2}{r}$ for a car on a hump-back bridge;
- find the least speed to stay in contact, $v_{\min} = \sqrt{gr}$.
